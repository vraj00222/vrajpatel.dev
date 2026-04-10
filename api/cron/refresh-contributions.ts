import type { VercelRequest, VercelResponse } from "@vercel/node";

// Vercel Cron hits this once daily (10:00 UTC) to force-refresh both ranges
// used by the GitHub graph. The API still auto-refreshes for users whenever
// the 30-minute cache key expires.

type ContributionsResponse = {
  total?: number;
  contributions?: Array<{ date: string; count: number; level: number }>;
  error?: string;
};

async function jsonOrThrow(
  response: Response,
  label: string
): Promise<ContributionsResponse> {
  if (!response.ok) {
    throw new Error(`${label} refresh failed: ${response.status} ${await response.text()}`);
  }
  return response.json() as Promise<ContributionsResponse>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const username = "vraj00222";
  const currentYear = new Date().getUTCFullYear();

  // Build absolute URL to our own /api/contributions
  const host = req.headers.host || "vrajpatel.dev";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const base = `${protocol}://${host}/api/contributions`;

  try {
    const [lastRes, yearRes] = await Promise.all([
      fetch(`${base}?username=${username}&year=last&refresh=1`),
      fetch(`${base}?username=${username}&year=${currentYear}&refresh=1`),
    ]);
    const [lastData, yearData] = await Promise.all([
      jsonOrThrow(lastRes, "last-year"),
      jsonOrThrow(yearRes, "current-year"),
    ]);

    return res.status(200).json({
      ok: true,
      message: "Refreshed contribution cache from GitHub GraphQL",
      lastTotal: lastData.total ?? null,
      currentYear,
      currentYearTotal: yearData.total ?? null,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
