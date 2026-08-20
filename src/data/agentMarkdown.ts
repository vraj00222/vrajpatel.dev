import {
  PERSONAL,
  STATS,
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  SKILL_GROUPS,
  HACKATHONS,
  PUBLICATION,
} from "./content";

/** Plain-markdown rendering of the whole site — the "agent view". */
export function buildAgentMarkdown(): string {
  const lines: string[] = [];

  lines.push(`# ${PERSONAL.name}`, "", PERSONAL.bio, "");

  lines.push("## Quick facts", "");
  for (const s of STATS) {
    const link = s.href ? ` — ${s.href}` : "";
    lines.push(`- ${s.value} — ${s.label}${link}`);
  }
  lines.push("");
  lines.push(
    `- Location: ${PERSONAL.location}`,
    `- Email: ${PERSONAL.email}`,
    `- GitHub: ${PERSONAL.github}`,
    `- LinkedIn: ${PERSONAL.linkedin}`,
    `- X: ${PERSONAL.x}`,
    ""
  );

  lines.push("## Education", "");
  for (const e of EDUCATION) {
    lines.push(`- **${e.degree}**, ${e.school} (${e.period}) — GPA ${e.gpa}`);
  }
  lines.push("");

  lines.push("## Experience", "");
  for (const e of EXPERIENCE) {
    lines.push(`### ${e.title} — ${e.company}`, `*${e.period} · ${e.location}*`, "");
    for (const b of e.bullets) lines.push(`- ${b}`);
    lines.push(`Tech: ${e.tech.join(", ")}`, "");
  }

  lines.push("## Projects", "");
  for (const p of PROJECTS) {
    const tag = "hackathon" in p && p.hackathon ? ` (${p.hackathon})` : "";
    lines.push(`### ${p.name}${tag}`, p.description, `Tech: ${p.tech.join(", ")}`);
    lines.push(`GitHub: ${p.github}`);
    if ("live" in p && p.live) lines.push(`Live: ${p.live}`);
    if ("award" in p && p.award) lines.push(`Award: ${p.award}`);
    lines.push("");
  }

  lines.push("## Hackathons", "");
  for (const h of HACKATHONS) {
    const result = h.won ? ` — 🏆 ${h.result}` : h.result ? ` — ${h.result}` : "";
    lines.push(`- ${h.name}${result}${h.project ? ` (${h.project})` : ""}`);
  }
  lines.push("");

  lines.push("## Publication", "");
  lines.push(
    `**${PUBLICATION.title}**`,
    PUBLICATION.authors,
    `${PUBLICATION.venue} — ${PUBLICATION.link}`,
    ""
  );

  lines.push("## Skills", "");
  for (const g of SKILL_GROUPS) {
    lines.push(`- **${g.label}**: ${g.items.join(", ")}`);
  }
  lines.push("");

  return lines.join("\n");
}
