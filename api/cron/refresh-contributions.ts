import type { VercelRequest, VercelResponse } from "@vercel/node";

// Vercel Cron hits this at 2am UTC daily to warm the contributions API cache
// The actual client-side fetches use a date-based cache-buster, so fresh data
// loads for visitors automatically each new day.

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const username = "vraj00222";

  try {
    // Ping the contributions API to warm its cache for the new day
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
    );
    const data = await response.json();
    const total = data.contributions?.length ?? 0;

    return res.status(200).json({
      ok: true,
      message: `Refreshed ${total} contribution days`,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
