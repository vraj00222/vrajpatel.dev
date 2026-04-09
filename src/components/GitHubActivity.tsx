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

const GH_GREENS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

function ContributionGraph({
  contributions,
}: {
  contributions: ContributionDay[][];
}) {
  const colors = GH_GREENS;
  const size = 10;
  const gap = 3;

  return (
    <div className="overflow-x-auto pb-1">
      <svg
        width={contributions.length * (size + gap)}
        height={7 * (size + gap) - gap}
        className="block"
      >
        {contributions.map((week, wi) =>
          week.map((day, di) => (
            <motion.rect
              key={`${wi}-${di}`}
              x={wi * (size + gap)}
              y={di * (size + gap)}
              width={size}
              height={size}
              rx={2}
              fill={colors[day.level]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: wi * 0.004, duration: 0.15 }}
            >
              <title>
                {day.date
                  ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`
                  : ""}
              </title>
            </motion.rect>
          ))
        )}
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
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});

    fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    )
      .then((r) => r.json())
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
        const prs: MergedPR[] = [];
        for (const pr of data.items) {
          const repoPath = pr.repository_url.split("/").slice(-2).join("/");
          let stars = 0;
          try {
            const repoRes = await fetch(
              `https://api.github.com/repos/${repoPath}`
            );
            if (repoRes.ok) {
              const repoData = await repoRes.json();
              stars = repoData.stargazers_count || 0;
            }
          } catch {
            /* ignore */
          }
          prs.push({
            title: pr.title,
            url: pr.html_url,
            repo: repoPath,
            stars,
          });
        }
        setMergedPRs(prs);
      })
      .catch(() => {});
  }, [username]);

  useEffect(() => {
    if (selectedYear === "last" || allContributions[selectedYear]) return;
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=${selectedYear}`
    )
      .then((r) => r.json())
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

  const currentDays = allContributions[selectedYear];
  const weeks = currentDays ? groupIntoWeeks(currentDays) : null;
  const totalContributions =
    currentDays?.reduce((sum, d) => sum + d.count, 0) || 0;

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
              <div className="h-22 flex items-center justify-center text-[13px] text-text-muted dark:text-dark-text-muted animate-pulse">
                Loading contributions...
              </div>
            ) : weeks ? (
              <ContributionGraph contributions={weeks} />
            ) : (
              <div className="h-22 flex items-center justify-center text-[13px] text-text-muted dark:text-dark-text-muted">
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
