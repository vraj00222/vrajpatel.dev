import { EXPERIENCE } from "../data/content";
import { FadeIn } from "./FadeIn";

export function Experience() {
  return (
    <section id="experience" className="py-14 px-6" data-section="experience">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <h2 className="font-display text-sm font-semibold text-text dark:text-dark-text uppercase tracking-widest mb-8">
            Work
          </h2>
        </FadeIn>

        <div className="space-y-10">
          {EXPERIENCE.map((job, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="group">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-text dark:text-dark-text">
                      {job.title}
                    </p>
                    <p className="text-[13px] text-text-muted dark:text-dark-text-muted mt-0.5">
                      {job.company}
                    </p>
                  </div>
                  <span className="text-[13px] text-text-muted dark:text-dark-text-muted shrink-0 tabular-nums">
                    {job.period}
                  </span>
                </div>
                <p className="text-[14px] text-text-secondary dark:text-dark-text-secondary mt-3 leading-[1.7]">
                  {job.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
