import type { VercelRequest, VercelResponse } from "@vercel/node";

type SearchIssueItem = {
  repository_url: string;
  title: string;
  html_url: string;
};

type RepoResponse = {
  stargazers_count?: number;
  description?: string | null;
};

type MergedPRItem = {
  title: string;
  repo: string;
  repoDescription: string;
  url: string;
  stars: number | null;
};

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;

function githubHeaders() {
  return {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "vrajpatel.dev",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function fetchGitHubJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: githubHeaders() });
  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  if (!GITHUB_TOKEN) {
    return res.status(500).json({
      error: "GITHUB_TOKEN not configured. Set it in Vercel env vars.",
    });
  }

  const username = (req.query.username as string) || "vraj00222";

  try {
    const query = encodeURIComponent(
      `author:${username} type:pr is:merged -user:${username} created:>2024-01-01`
    );
    const searchUrl =
      `https://api.github.com/search/issues?q=${query}` +
      "&sort=updated&order=desc&per_page=10";

    const search = await fetchGitHubJson<{ items?: SearchIssueItem[] }>(searchUrl);
    const items = Array.isArray(search.items) ? search.items : [];

    const repoPaths = [
      ...new Set(
        items.map((pr) => pr.repository_url.split("/").slice(-2).join("/"))
      ),
    ];

    const repoMeta: Record<string, { stars: number | null; description: string }> =
      {};

    await Promise.all(
      repoPaths.map(async (repoPath) => {
        try {
          const repo = await fetchGitHubJson<RepoResponse>(
            `https://api.github.com/repos/${repoPath}`
          );
          repoMeta[repoPath] = {
            stars:
              typeof repo.stargazers_count === "number"
                ? repo.stargazers_count
                : null,
            description: repo.description || "",
          };
        } catch {
          repoMeta[repoPath] = { stars: null, description: "" };
        }
      })
    );

    const merged: MergedPRItem[] = items.map((pr) => {
      const repoPath = pr.repository_url.split("/").slice(-2).join("/");
      return {
        title: pr.title,
        url: pr.html_url,
        repo: repoPath,
        repoDescription: repoMeta[repoPath]?.description || "",
        stars: repoMeta[repoPath]?.stars ?? null,
      };
    });

    res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=1800");
    return res.status(200).json({ items: merged });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
