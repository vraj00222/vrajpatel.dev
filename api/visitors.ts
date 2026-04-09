import type { VercelRequest, VercelResponse } from "@vercel/node";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function redis(cmd: string[]) {
  const res = await fetch(`${UPSTASH_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmd),
  });
  return res.json();
}

function hash(str: string): string {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "unknown";

    const fingerprint = hash(ip);
    const isNew = await redis(["SADD", "visitors:ips", fingerprint]);
    if (isNew?.result === 1) {
      await redis(["INCR", "visitors:count"]);
    }
    const count = await redis(["GET", "visitors:count"]);
    const total = parseInt(count?.result || "0", 10);

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ count: total });
  } catch {
    return res.status(200).json({ count: null });
  }
}
