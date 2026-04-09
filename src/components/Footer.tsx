export function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border dark:border-dark-border">
      <div className="mx-auto max-w-2xl flex items-center justify-between text-[12px] text-text-muted dark:text-dark-text-muted">
        <span>&copy; {new Date().getFullYear()} Vraj Patel</span>
        <span className="hidden sm:inline">Built with React &middot; Tailwind &middot; Framer Motion</span>
      </div>
    </footer>
  );
}
