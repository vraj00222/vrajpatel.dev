import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { PERSONAL } from "../data/content";
import { FadeIn } from "./FadeIn";
import { GithubIcon } from "./Icons";

interface GitHubProfile {
  public_repos: number;
  followers: number;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface MergedPR {
  title: string;
  repo: string;
  url: string;
  stars: number;
}

const GH_GREENS_DARK = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const GH_GREENS_LIGHT = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const DAY_LABELS = ["Mon", "Wed", "Fri"]; // GitHub only labels Mon/Wed/Fri

function getApiBaseUrl() {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  // Vite dev server does not serve /api/* serverless routes.
  if (host === "localhost" || host === "127.0.0.1") {
    return "https://vrajpatel.xyz";
  }
  return "";
}

async function fetchContributions(username: string, year: string) {
  const apiBase = getApiBaseUrl();
  const url = `${apiBase}/api/contributions?username=${encodeURIComponent(username)}&year=${encodeURIComponent(year)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Contributions API ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data?.contributions)) {
    throw new Error("Invalid contributions payload");
  }

  return data;
}

// Tracks the `dark` class on <html> so the SVG palette can swap with the
// navbar theme toggle. Returns true when dark mode is active.
function useIsDark() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : true
  );
  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

function ContributionGraph({
  contributions,
  isDark,
}: {
  contributions: ContributionDay[][];
  isDark: boolean;
}) {
  const colors = isDark ? GH_GREENS_DARK : GH_GREENS_LIGHT;
  const labelClass = isDark ? "text-dark-text-muted" : "text-text-muted";
  const size = 11;
  const gap = 3;
  const cell = size + gap;
  const labelGutter = 26; // left gutter for day-of-week labels
  const monthBand = 16; // top band for month labels
  const gridWidth = contributions.length * cell;
  const gridHeight = 7 * cell - gap;

  // Month labels — match GitHub exactly: place a label at the first week
  // whose Sunday (row 0) falls in a new month. Sundays change month exactly
  // once per ~4 weeks, so labels are naturally spaced 4–5 columns apart.
  // Skip week 0 if the data starts mid-week (its Sunday is padding) — the
  // next week will carry the label instead.
  const monthLabels: { x: number; label: string }[] = [];
  let lastMonth = -1;
  contributions.forEach((week, wi) => {
    const sunday = week[0];
    if (!sunday?.date) return; // padding cell, skip
    const m = new Date(sunday.date).getUTCMonth();
    if (m !== lastMonth) {
      monthLabels.push({ x: wi * cell, label: MONTH_NAMES[m] });
      lastMonth = m;
    }
  });
  // If the very first label is too close to column 0 (would clip the text
  // visually) or if its anchor week is also the first week of the data,
  // GitHub typically still shows it — leave as-is.

  return (
    <div className="overflow-x-auto pb-1">
      <svg
        width={gridWidth + labelGutter}
        height={gridHeight + monthBand}
        className="block"
        role="img"
        aria-label="GitHub contribution graph"
      >
        {/* Month labels */}
        <g
          fill="currentColor"
          className={labelClass}
          fontSize="10"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {monthLabels.map((m, i) => (
            <text key={i} x={labelGutter + m.x} y={11}>
              {m.label}
            </text>
          ))}
        </g>

        {/* Day-of-week labels (Mon, Wed, Fri) */}
        <g
          fill="currentColor"
          className={labelClass}
          fontSize="9"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {DAY_LABELS.map((d, i) => {
            // rows: 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
            const row = i === 0 ? 1 : i === 1 ? 3 : 5;
            return (
              <text
                key={d}
                x={0}
                y={monthBand + row * cell + size - 1}
              >
                {d}
              </text>
            );
          })}
        </g>

        {/* Contribution cells */}
        <g transform={`translate(${labelGutter}, ${monthBand})`}>
          {contributions.map((week, wi) =>
            week.map((day, di) => (
              <motion.rect
                key={`${wi}-${di}`}
                x={wi * cell}
                y={di * cell}
                width={size}
                height={size}
                rx={2}
                fill={colors[day.level]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: wi * 0.003, duration: 0.12 }}
              >
                <title>
                  {day.date
                    ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`
                    : ""}
                </title>
              </motion.rect>
            ))
          )}
        </g>
      </svg>
    </div>
  );
}

function groupIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];
  const firstDay = new Date(days[0]?.date || "");
  const startPad = firstDay.getDay();
  for (let i = 0; i < startPad; i++) {
    currentWeek.push({ date: "", count: 0, level: 0 });
  }
  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);
  return weeks;
}

export function GitHubActivity() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [allContributions, setAllContributions] = useState<
    Record<string, ContributionDay[]>
  >({});
  const [selectedYear, setSelectedYear] = useState("last");
  const [availableYears, setAvailableYears] = useState<string[]>(["last"]);
  const [mergedPRs, setMergedPRs] = useState<MergedPR[]>([]);
  const [loading, setLoading] = useState(true);

  const username = PERSONAL.githubUsername;

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (
          data &&
          typeof data.public_repos === "number" &&
          typeof data.followers === "number"
        ) {
          setProfile(data);
        } else {
          setProfile(null);
        }
      })
      .catch(() => {});

    fetchContributions(username, "last")
      .then((data) => {
        if (data.contributions) {
          setAllContributions((prev) => ({
            ...prev,
            last: data.contributions,
          }));
          const years = new Set<string>();
          years.add("last");
          for (const c of data.contributions) {
            years.add(c.date.split("-")[0]);
          }
          const filtered = Array.from(years)
            .filter((y) => y === "last" || parseInt(y) >= 2024)
            .sort()
            .reverse();
          setAvailableYears(["last", ...filtered.filter((y) => y !== "last")]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch(
      `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged+-user:${username}+created:>2024-01-01&sort=updated&per_page=10`
    )
      .then((r) => r.json())
      .then(async (data) => {
        if (!data.items) return;

        // Deduplicate repos and fetch stars in parallel
        const repoPaths = [
          ...new Set(
            data.items.map((pr: { repository_url: string }) =>
              pr.repository_url.split("/").slice(-2).join("/")
            )
          ),
        ] as string[];

        const starMap: Record<string, number> = {};
        const repoResults = await Promise.allSettled(
          repoPaths.map(async (repoPath) => {
            const res = await fetch(
              `https://api.github.com/repos/${repoPath}`
            );
            if (res.ok) {
              const repoData = await res.json();
              starMap[repoPath] = repoData.stargazers_count || 0;
            }
          })
        );
        // Ensure all settled before building PR list
        void repoResults;

        const prs: MergedPR[] = data.items.map(
          (pr: {
            repository_url: string;
            title: string;
            html_url: string;
          }) => {
            const repoPath = pr.repository_url
              .split("/")
              .slice(-2)
              .join("/");
            return {
              title: pr.title,
              url: pr.html_url,
              repo: repoPath,
              stars: starMap[repoPath] || 0,
            };
          }
        );
        setMergedPRs(prs);
      })
      .catch(() => {});
  }, [username]);

  useEffect(() => {
    if (selectedYear === "last" || allContributions[selectedYear]) return;
    fetchContributions(username, selectedYear)
      .then((data) => {
        if (data.contributions) {
          setAllContributions((prev) => ({
            ...prev,
            [selectedYear]: data.contributions,
          }));
        }
      })
      .catch(() => {});
  }, [selectedYear, allContributions, username]);

  const isDark = useIsDark();
  const currentDays = allContributions[selectedYear];
  const weeks = currentDays ? groupIntoWeeks(currentDays) : null;
  const totalContributions =
    currentDays?.reduce((sum, d) => sum + d.count, 0) || 0;
  const greens = isDark ? GH_GREENS_DARK : GH_GREENS_LIGHT;

  return (
    <section id="github" className="py-14 px-6" data-section="github">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest">
              GitHub
            </h2>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text transition-colors duration-200"
            >
              <GithubIcon size={13} />
              {username}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.06}>
          <div className="rounded-lg border border-border dark:border-dark-border bg-surface dark:bg-dark-surface p-5">
            {/* Year tabs + count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[13px] text-text-muted dark:text-dark-text-muted">
                <span className="text-text dark:text-dark-text font-semibold tabular-nums">
                  {totalContributions.toLocaleString()}
                </span>{" "}
                contributions
                {selectedYear === "last"
                  ? " in the last year"
                  : ` in ${selectedYear}`}
              </p>
              <div className="flex items-center gap-0.5 bg-hover-bg dark:bg-dark-hover-bg rounded-md p-0.5">
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-2.5 py-1 text-[11px] rounded-md font-medium transition-all duration-200 ${
                      selectedYear === year
                        ? "bg-text text-bg dark:bg-dark-text dark:text-dark-bg shadow-sm"
                        : "text-text-muted dark:text-dark-text-muted hover:text-text dark:hover:text-dark-text"
                    }`}
                  >
                    {year === "last" ? "Year" : year}
                  </button>
                ))}
              </div>
            </div>

            {/* Graph */}
            {loading ? (
              <div className="h-28 flex items-center justify-center text-[13px] text-text-muted dark:text-dark-text-muted animate-pulse">
                Loading contributions...
              </div>
            ) : weeks ? (
              <>
                <ContributionGraph contributions={weeks} isDark={isDark} />
                <div className="flex items-center justify-end gap-1.5 mt-2 text-[10px] text-text-muted dark:text-dark-text-muted">
                  <span>Less</span>
                  {greens.map((c) => (
                    <span
                      key={c}
                      className="inline-block w-2.5 h-2.5 rounded-xs"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <span>More</span>
                </div>
              </>
            ) : (
              <div className="h-28 flex items-center justify-center text-[13px] text-text-muted dark:text-dark-text-muted">
                Could not load contributions
              </div>
            )}

            {/* Stats */}
            {profile && (
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border dark:border-dark-border">
                {[
                  { label: "repositories", value: profile.public_repos },
                  { label: "followers", value: profile.followers },
                ].map((stat) => (
                  <p
                    key={stat.label}
                    className="text-[13px] text-text-muted dark:text-dark-text-muted"
                  >
                    <span className="text-text dark:text-dark-text font-semibold tabular-nums">
                      {stat.value}
                    </span>{" "}
                    {stat.label}
                  </p>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Merged PRs */}
        {mergedPRs.length > 0 && (
          <FadeIn delay={0.12}>
            <h3 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest mt-14 mb-5">
              Contributions
            </h3>
            <div className="space-y-0.5">
              {mergedPRs.map((pr, i) => (
                <a
                  key={i}
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 -mx-3 px-3 py-2.5 rounded-lg hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-colors duration-200"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] text-text-secondary dark:text-dark-text-secondary group-hover:text-text dark:group-hover:text-dark-text transition-colors duration-200 truncate">
                      {pr.title}
                    </p>
                    <p className="text-[12px] text-text-muted dark:text-dark-text-muted mt-0.5">
                      {pr.repo}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {pr.stars > 0 && (
                      <span className="inline-flex items-center gap-1 text-[12px] text-text-muted dark:text-dark-text-muted tabular-nums">
                        <Star size={11} className="text-amber-500" />
                        {pr.stars >= 1000
                          ? `${(pr.stars / 1000).toFixed(1)}k`
                          : pr.stars.toLocaleString()}
                      </span>
                    )}
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      merged
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
