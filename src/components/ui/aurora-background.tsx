import type { ReactNode, HTMLAttributes } from "react";

interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

// Monochrome adaptation of Aceternity's AuroraBackground. The aurora is built
// from two layered repeating-linear-gradients: a "plate" (white in light mode,
// black in dark) with transparent gaps, sitting on top of a grayscale "aurora"
// gradient. The :after layer animates and `mix-blend-difference` produces the
// shimmer. Keeps the portfolio's strict B&W palette — no colored bands.
export function AuroraBackground({
  children,
  className = "",
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={`relative flex flex-col min-h-screen overflow-hidden bg-bg dark:bg-dark-bg text-text dark:text-dark-text ${className}`}
      {...props}
    >
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div
          className={[
            "pointer-events-none absolute -inset-[10px] opacity-60 will-change-transform blur-[10px] invert dark:invert-0",
            "[--white-gradient:repeating-linear-gradient(100deg,#ffffff_0%,#ffffff_7%,transparent_10%,transparent_12%,#ffffff_16%)]",
            "[--dark-gradient:repeating-linear-gradient(100deg,#000000_0%,#000000_7%,transparent_10%,transparent_12%,#000000_16%)]",
            "[--aurora:repeating-linear-gradient(100deg,#1a1a1a_10%,#555555_15%,#a0a0a0_20%,#666666_25%,#222222_30%)]",
            "[background-image:var(--white-gradient),var(--aurora)]",
            "dark:[background-image:var(--dark-gradient),var(--aurora)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "after:content-[''] after:absolute after:inset-0",
            "after:[background-image:var(--white-gradient),var(--aurora)]",
            "dark:after:[background-image:var(--dark-gradient),var(--aurora)]",
            "after:[background-size:200%,_100%]",
            "after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference",
            showRadialGradient
              ? "[mask-image:radial-gradient(ellipse_at_50%_0%,black_25%,transparent_75%)]"
              : "",
          ].join(" ")}
        />
      </div>
      {children}
    </div>
  );
}
