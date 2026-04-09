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
  const currentYear = new Date().getUTCFullYear();

  try {
    // Warm both ranges used by the UI: "last" and selected calendar year.
    const [lastResponse, yearResponse] = await Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
      fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=${currentYear}`
      ),
    ]);

    const [lastData, yearData] = await Promise.all([
      lastResponse.json(),
      yearResponse.json(),
    ]);
    const lastTotal = lastData.contributions?.length ?? 0;
    const yearTotal = yearData.contributions?.length ?? 0;

    return res.status(200).json({
      ok: true,
      message: "Refreshed contribution cache",
      lastDays: lastTotal,
      currentYear,
      currentYearDays: yearTotal,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}
