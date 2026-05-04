import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, Moon, Shield, Sun } from "lucide-react";
import { AuroraBackground } from "./ui/aurora-background";

const articleSections = [
  { id: "intro", title: "Introduction To DRM" },
  { id: "what-is-drm", title: "What Is DRM" },
  { id: "types", title: "Types Of DRM" },
  { id: "clear-key", title: "Clear Key Encryption Explained" },
  { id: "widevine", title: "DRM Widevine" },
  { id: "tee-levels", title: "TEE Security Levels" },
  { id: "conclusion", title: "Conclusion" },
];

const cardFade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, amount: 0.2 },
};

function ArticleFigure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="mt-4 overflow-hidden rounded-xl border border-border dark:border-dark-border bg-bg/60 dark:bg-dark-bg/60">
      <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
      <figcaption className="border-t border-border dark:border-dark-border px-4 py-2.5 text-[12px] text-text-muted dark:text-dark-text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}

function getInitialTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function BlogPage() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <AuroraBackground>
      <header className="relative z-10 mx-auto max-w-2xl w-full flex-none flex items-center justify-between px-6 h-12">
        <a
          href="/"
          className="font-display text-sm font-semibold text-text dark:text-dark-text tracking-tight"
        >
          vraj.
        </a>
        <div className="flex items-center gap-1">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-2 py-1.5 text-[13px] text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text transition-colors duration-200"
          >
            <ArrowLeft size={13} />
            Back
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-text-muted hover:text-text dark:text-dark-text-muted dark:hover:text-dark-text hover:bg-hover-bg dark:hover:bg-dark-hover-bg transition-all duration-200"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                className="inline-flex"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-8 pb-16 sm:pt-12">
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="rounded-2xl border border-border/80 dark:border-dark-border/80 bg-surface/90 dark:bg-dark-surface/90 backdrop-blur-xl p-6 sm:p-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border dark:border-dark-border bg-hover-bg/80 dark:bg-dark-hover-bg/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-text-secondary dark:text-dark-text-secondary">
            <Shield size={12} />
            Security
          </div>

          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight text-text dark:text-dark-text">
            DRM Explained
          </h1>

          <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
            A practical walkthrough of how streaming platforms protect premium
            content from unauthorized recording and downloads.
          </p>

          <motion.section
            {...cardFade}
            className="mt-8 rounded-xl border border-border dark:border-dark-border bg-bg/70 dark:bg-dark-bg/70 p-5"
          >
            <h2 className="font-display text-[13px] font-semibold uppercase tracking-widest text-text dark:text-dark-text">
              Table Of Contents
            </h2>
            <ul className="mt-3 space-y-1.5">
              {articleSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex items-center gap-2 text-[14px] text-text-secondary dark:text-dark-text-secondary hover:text-text dark:hover:text-dark-text transition-colors duration-200"
                  >
                    <ChevronRight size={13} className="opacity-70" />
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section {...cardFade} id="intro" className="mt-10 scroll-mt-20">
            <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
              Introduction To DRM
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              Ever wondered how platforms like Netflix prevent users from
              downloading or screen recording their content? When you try to
              record your screen while playing a video, the screen often appears
              black. This is due to Digital Rights Management (DRM) technologies
              that enforce content protection. DRM works by restricting how the
              video is rendered on your device, ensuring that it cannot be
              captured or downloaded through traditional screen recording or
              downloading methods.
            </p>
          </motion.section>

          <motion.section {...cardFade} id="what-is-drm" className="mt-8 scroll-mt-20">
            <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
              What Is DRM
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              Streaming companies use Digital Rights Management (DRM) to prevent
              users from recording or downloading content from their platforms.
              DRM ensures that copyrighted material is protected by controlling
              how the content is accessed, rendered, and shared, blocking
              unauthorized downloads or screen recordings while you stream.
            </p>
          </motion.section>

          <motion.section {...cardFade} id="types" className="mt-8 scroll-mt-20">
            <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
              Types Of DRM
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              There are 2 types of DRM
            </p>
            <ol className="mt-3 list-decimal pl-5 space-y-1 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              <li>DRM Clear key encryption or the basic DRM</li>
              <li>DRM WIDEVINE</li>
            </ol>
          </motion.section>

          <motion.section {...cardFade} id="clear-key" className="mt-8 scroll-mt-20">
            <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
              Clear Key Encryption Explained
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              Clear Key encryption is a method where the encryption key is
              transmitted in an open or visible environment. This means the key
              can be easily inspected by the user, such as by viewing the network
              requests in the browser&apos;s developer tools (e.g., the Netflix tab).
              While the content itself is encrypted, the key is not hidden,
              making it accessible to user.
            </p>
            <ArticleFigure
              src="/blog/drm-clear-key.png"
              alt="Clear Key DRM system diagram showing encrypted media, cloud storage, database, and key exchange"
              caption="Clear Key flow: encrypted media plus key and IV delivery from a server-controlled path."
            />
          </motion.section>

          <motion.section {...cardFade} id="widevine" className="mt-8 scroll-mt-20">
            <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
              DRM Widevine
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              Companies decided they do not want users to access the encryption
              key in plain text.
            </p>
            <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              WIDEVINE was developed by company WIDEVINE but owned by Google now
            </p>
            <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              With this encryption, companies can control the quality of streams
              on specific devices and browsers. For example, Google Chrome only
              allows 720p quality for Netflix, while Safari supports streaming in
              4K.
            </p>
            <ArticleFigure
              src="/blog/drm-widevine-flow.png"
              alt="Widevine registration diagram showing encrypted content and API call to Google licensing server"
              caption="Widevine registration model: encrypted content is associated with metadata and licensed through Google services."
            />
            <p className="mt-4 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              The content is encrypted and associated with a unique content ID,
              along with various metadata. This information is registered with
              Google through an API call, which facilitates the retrieval of a
              license. It&apos;s important to note that Google does not store copies
              of the media files; instead, it functions solely as a license
              server. This means that access to the content is controlled via
              licenses issued by Google, ensuring that only authorized users can
              view or stream the content.
            </p>
            <ArticleFigure
              src="/blog/drm-tee-architecture.png"
              alt="TEE architecture diagram showing user, app server, trusted execution environment, and Google licensing server"
              caption="TEE-centered playback path: key exchange and decryption are handled through trusted components."
            />
            <ArticleFigure
              src="/blog/drm-excalidraw-system.svg"
              alt="System explanation diagram for playback, TEE, EC2, and Google licensing server"
              caption="System explanation diagram."
            />
            <p className="mt-4 text-[14px] leading-6">
              <a
                href="https://excalidraw.com/#json=jZFTNoXa17lmX6rasTcE2,2MCwROrV1nmCOlhIfQF-Ag"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary dark:text-dark-text-secondary underline underline-offset-2 hover:text-text dark:hover:text-dark-text transition-colors duration-200"
              >
                https://excalidraw.com/#json=jZFTNoXa17lmX6rasTcE2,2MCwROrV1nmCOlhIfQF-Ag
              </a>
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              <li>
                Whenever a user plays content, a request is sent to the storage
                server, which responds with the encrypted file. Simultaneously,
                the license server is contacted to obtain the necessary decryption
                keys. The Trusted Execution Environment (TEE) plays a crucial role
                in securely transmitting these keys.
              </li>
              <li>
                The TEE is also the reason you cannot inspect and see the key
                exchange; this process does not happen at the JavaScript level but
                rather at the browser level. This is why, in Google Chrome, the
                highest quality Netflix provides is 720p. The decryption and
                playback processes occur at the software level, which is deemed
                less secure.
              </li>
              <li>
                In contrast, when using Safari, users can stream up to 4K
                resolution because the decryption process of the TEE occurs on the
                hardware side of the device. This is more secure, as reverse
                engineering software is relatively easier than accessing a trusted
                execution environment that operates as a hardware chip on a
                device.
              </li>
            </ul>
          </motion.section>

          <motion.section {...cardFade} id="tee-levels" className="mt-8 scroll-mt-20">
            <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
              TEE Security Levels
            </h2>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              <li>
                <strong>Level 1 (L1)</strong>: The most secure level, where both
                decryption and playback occur within the TEE, ensuring a high
                level of protection for sensitive content, such as 4K streams.
              </li>
              <li>
                <strong>Level 2 (L2)</strong>: Decryption takes place within the
                TEE, but playback occurs outside it, providing a moderate level of
                security.
              </li>
              <li>
                <strong>Level 3 (L3)</strong>: The least secure level, where both
                decryption and playback happen outside the TEE. This level is
                suitable for lower-quality content and poses a higher risk of
                unauthorized access.
              </li>
            </ul>
            <p className="mt-4 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              Each level defines the security of the environment and the
              trustworthiness of key transmission, allowing content providers to
              manage how their media is accessed based on the capabilities of the
              user&apos;s device.
            </p>
            <p className="mt-4 rounded-lg border border-border dark:border-dark-border bg-hover-bg dark:bg-dark-hover-bg px-4 py-3 text-[14px] text-text-secondary dark:text-dark-text-secondary">
              <span className="mr-1">💡</span>
              <em>
                <strong>DRM is security by obfuscation</strong>
              </em>
            </p>
          </motion.section>

          <motion.section {...cardFade} id="conclusion" className="mt-8 scroll-mt-20">
            <h2 className="font-display text-xl font-semibold text-text dark:text-dark-text">
              Conclusion
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-text-secondary dark:text-dark-text-secondary">
              Digital Rights Management (DRM) protects streaming content from
              unauthorized access and piracy. Key types include Clear Key
              Encryption, which is less secure due to visible key transmission,
              and Widevine DRM, which uses a Trusted Execution Environment (TEE)
              for better security. The TEE keeps decryption keys safe and
              prevents unauthorized access. Widevine has three security levels:
              Level 1 (L1) offers the highest protection with everything
              happening inside the TEE; Level 2 (L2) has decryption in the TEE
              and playback outside; and Level 3 (L3) is the least secure, with
              both processes outside the TEE, suitable for lower-quality content.
              Understanding these aspects shows how digital media is kept safe
              across platforms.
            </p>
          </motion.section>
        </motion.article>
      </main>
    </AuroraBackground>
  );
}
