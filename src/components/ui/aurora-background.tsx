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
//
// Performance notes (this used to drop frames badly on retina laptops):
//  · The layer is `fixed`, not `absolute`, so scrolling never moves it and the
//    blurred + blended pixels are not repainted on every scroll frame. That
//    also makes the original `background-attachment: fixed` redundant — and
//    that property was the single worst offender, forcing a full-page repaint
//    per scroll tick.
//  · `contain: strict` + `isolation: isolate` keep the blend group to these two
//    layers instead of the whole page.
//  · Nothing above it uses `backdrop-filter`; a backdrop blur reading from an
//    animating background re-blurs its whole box every frame.
export function AuroraBackground({
  children,
  className = "",
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={`relative flex flex-col min-h-screen bg-bg dark:bg-dark-bg text-text dark:text-dark-text ${className}`}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 overflow-hidden [contain:strict] [isolation:isolate]"
      >
        <div
          className={[
            "pointer-events-none absolute -inset-[10px] opacity-60 blur-[10px] invert dark:invert-0",
            "[transform:translateZ(0)]",
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
            "after:animate-aurora after:mix-blend-difference",
            "motion-reduce:after:animate-none",
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
