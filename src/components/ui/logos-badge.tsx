import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface BadgeLogo {
  src: string;
  alt: string;
}

interface LogosBadgeProps {
  text: string;
  logos: BadgeLogo[];
  href?: string;
  className?: string;
}

const SIZE = 24; // logo diameter
const STACKED_STEP = 20; // < SIZE, so the logos overlap at rest
const SPREAD_STEP = 30; // > SIZE, so they separate on hover
const FAN = 5; // degrees of tilt at the outer edges

/**
 * Monochrome take on Aceternity's ImagesBadge: a pill that keeps the logos
 * stacked like a deck at rest and fans them apart on hover. No amber folder —
 * the portfolio is strictly black and white, so the chrome is a hairline pill
 * and the only colour on screen is the logos themselves.
 */
export function LogosBadge({ text, logos, href, className = "" }: LogosBadgeProps) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const spread = open && !reduce;

  const step = spread ? SPREAD_STEP : STACKED_STEP;
  const width = (logos.length - 1) * step + SIZE;
  const mid = (logos.length - 1) / 2;

  const Tag = href ? motion.a : motion.div;

  return (
    <Tag
      {...(href
        ? href.startsWith("http")
          ? { href, target: "_blank", rel: "noopener noreferrer" }
          : { href }
        : {})}
      className={`group inline-flex items-center gap-2.5 rounded-full border border-border dark:border-dark-border bg-surface/70 dark:bg-dark-surface/70 py-1.5 pl-2 pr-3.5 transition-colors duration-200 hover:border-border-hover dark:hover:border-dark-border-hover ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <motion.span
        className="relative block shrink-0"
        style={{ height: SIZE }}
        animate={{ width }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {logos.map((logo, i) => (
          <motion.img
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={SIZE}
            height={SIZE}
            loading="lazy"
            decoding="async"
            className="absolute left-0 top-0 rounded-[7px] object-cover ring-1 ring-border dark:ring-dark-border bg-bg dark:bg-dark-bg"
            style={{ width: SIZE, height: SIZE, zIndex: logos.length - i }}
            animate={{
              x: i * step,
              rotate: spread ? (i - mid) * FAN : 0,
              y: spread ? -1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: reduce ? 0 : i * 0.02,
            }}
          />
        ))}
      </motion.span>

      <span className="text-[12.5px] font-medium text-text-secondary dark:text-dark-text-secondary transition-colors duration-200 group-hover:text-text dark:group-hover:text-dark-text">
        {text}
      </span>
    </Tag>
  );
}
