import type { VercelRequest, VercelResponse } from "@vercel/node";

// Direct GitHub GraphQL proxy with Upstash cache.
// Replaces the third-party github-contributions-api.jogruber.de proxy, which
// has its own ~12h server-side cache that ignored our cache-busters.
//
// Cache strategy:
//   - Upstash key per (username, range)
//   - Live ranges (`last` + current year): max 5 min old before refresh
//   - Historical years: 30 min TTL
//   - The Vercel cron warms both ranges daily
//   - The browser also serves a stale-while-revalidate header for 60s
//
// Required env vars:
//   GITHUB_TOKEN              — classic PAT with `read:user` scope (or fine-grained with public read)
//   UPSTASH_REDIS_REST_URL    — already set
//   UPSTASH_REDIS_REST_TOKEN  — already set

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const DEFAULT_CACHE_TTL_SECONDS = 30 * 60; // 30 minutes
const LIVE_RANGE_CACHE_TTL_SECONDS = 5 * 60; // 5 minutes for `last` and current year
const LIVE_RANGE_MAX_AGE_MS = 5 * 60 * 1000;

type Day = { date: string; count: number; level: number };
type Payload = {
  total: number;
  contributions: Day[];
  fetchedAt?: string;
};

function fillCalendarYear(year: number, days: Day[]): Day[] {
  const byDate = new Map(days.map((d) => [d.date, d]));
  const result: Day[] = [];
  const cursor = new Date(Date.UTC(year, 0, 1));
  const end = new Date(Date.UTC(year, 11, 31));

  while (cursor <= end) {
    const iso = cursor.toISOString().slice(0, 10);
    const existing = byDate.get(iso);
    result.push(existing ?? { date: iso, count: 0, level: 0 });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return result;
}

async function redisGet(key: string): Promise<string | null> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null;
  try {
    const res = await fetch(UPSTASH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["GET", key]),
    });
    const json = await res.json();
    return json?.result ?? null;
  } catch {
    return null;
  }
}

async function redisSetEx(key: string, value: string, ttl: number) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return;
  try {
    await fetch(UPSTASH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["SET", key, value, "EX", ttl.toString()]),
    });
  } catch {
    /* ignore */
  }
}

async function redisSet(key: string, value: string) {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return;
  try {
    await fetch(UPSTASH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["SET", key, value]),
    });
  } catch {
    /* ignore */
  }
}

function parseCachedPayload(raw: string | null): Payload | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.total === "number" &&
      Array.isArray(parsed?.contributions) &&
      (parsed?.fetchedAt === undefined || typeof parsed?.fetchedAt === "string")
    ) {
      return parsed as Payload;
    }
    return null;
  } catch {
    return null;
  }
}

// GitHub GraphQL returns 4 levels: NONE, FIRST_QUARTILE, SECOND_QUARTILE,
// THIRD_QUARTILE, FOURTH_QUARTILE. Map to the 0–4 ints the UI already uses.
const LEVEL_MAP: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function getDateRange(year: string): { from: string; to: string } {
  if (year === "last") {
    const to = new Date();
    const from = new Date(to);
    from.setUTCFullYear(to.getUTCFullYear() - 1);
    from.setUTCDate(from.getUTCDate() + 1); // exclusive lower bound → 365 days
    return { from: from.toISOString(), to: to.toISOString() };
  }
  // Calendar year
  const y = parseInt(year, 10);
  const from = new Date(Date.UTC(y, 0, 1, 0, 0, 0));
  const now = new Date();
  // For the current year, cap "to" at now so GitHub doesn't error on a future date.
  const isCurrent = y === now.getUTCFullYear();
  const to = isCurrent ? now : new Date(Date.UTC(y, 11, 31, 23, 59, 59));
  return { from: from.toISOString(), to: to.toISOString() };
}

async function fetchFromGitHub(
  username: string,
  range: { from: string; to: string }
): Promise<Payload> {
  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "vrajpatel.dev",
    },
    body: JSON.stringify({
      query,
      variables: { login: username, from: range.from, to: range.to },
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(`GitHub GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error("No calendar data in GitHub response");

  const days: Day[] = [];
  for (const week of calendar.weeks) {
    for (const day of week.contributionDays) {
      days.push({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_MAP[day.contributionLevel] ?? 0,
      });
    }
  }
  return { total: calendar.totalContributions, contributions: days };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const username = (req.query.username as string) || "vraj00222";
  const year = (req.query.year as string) || "last";
  const refresh = req.query.refresh === "1";

  if (year !== "last" && !/^\d{4}$/.test(year)) {
    return res.status(400).json({ error: "Invalid year. Use 'last' or YYYY." });
  }

  const nowYear = new Date().getUTCFullYear();
  const parsedYear = year === "last" ? null : parseInt(year, 10);
  const isLiveRange = year === "last" || parsedYear === nowYear;
  const cacheTtlSeconds = isLiveRange
    ? LIVE_RANGE_CACHE_TTL_SECONDS
    : DEFAULT_CACHE_TTL_SECONDS;

  const cacheKey = `gh:contrib:${username}:${year}`;
  const staleKey = `gh:contrib:lastgood:${username}:${year}`;

  // Try cache first (unless explicit refresh)
  if (!refresh) {
    const cached = parseCachedPayload(await redisGet(cacheKey));
    const cachedAgeMs = cached?.fetchedAt
      ? Date.now() - Date.parse(cached.fetchedAt)
      : Number.POSITIVE_INFINITY;
    const cachedIsFresh = !isLiveRange || cachedAgeMs <= LIVE_RANGE_MAX_AGE_MS;

    if (cached && cachedIsFresh) {
      res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=600");
      res.setHeader("X-Cache", "HIT");
      return res.status(200).json(cached);
    }
  }

  if (!GITHUB_TOKEN) {
    return res.status(500).json({
      error: "GITHUB_TOKEN not configured. Set it in Vercel env vars.",
    });
  }

  try {
    const range = getDateRange(year);
    const fetched = await fetchFromGitHub(username, range);
    const yearInt = year === "last" ? null : parseInt(year, 10);
    const contributions = yearInt
      ? fillCalendarYear(yearInt, fetched.contributions)
      : fetched.contributions;

    const payload = {
      total: fetched.total,
      contributions,
      fetchedAt: new Date().toISOString(),
    };
    const serialized = JSON.stringify(payload);
    await Promise.all([
      redisSetEx(cacheKey, serialized, cacheTtlSeconds),
      redisSet(staleKey, serialized),
    ]);
    res.setHeader("Cache-Control", "public, max-age=60, stale-while-revalidate=600");
    res.setHeader("X-Cache", "MISS");
    return res.status(200).json(payload);
  } catch (err) {
    const stale = parseCachedPayload(await redisGet(staleKey));
    if (stale) {
      res.setHeader("Cache-Control", "public, max-age=30, stale-while-revalidate=600");
      res.setHeader("X-Cache", "STALE");
      return res.status(200).json(stale);
    }
    return res.status(500).json({ error: String(err) });
  }
}
