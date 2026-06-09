import Link from 'next/link'
import type { ReactNode } from 'react'

export type LegalSection = {
  heading: string
  body: ReactNode
}

/**
 * Shared shell for the public legal pages (Privacy, Terms). Reuses the
 * landing page's dark CRT aesthetic so the signed-out experience stays
 * consistent. Wrapped in `.landing` so the dark color defaults apply.
 */
export function LegalShell({
  kicker,
  title,
  updated,
  intro,
  sections,
}: {
  kicker: string
  title: string
  updated: string
  intro: ReactNode
  sections: LegalSection[]
}) {
  return (
    <div className="landing fixed inset-0 z-50 overflow-y-auto overflow-x-hidden">
      <main className="crt-surface min-h-screen w-full flex flex-col items-center px-6 py-16 md:py-24">
        <article className="max-w-[680px] w-full flex flex-col gap-10">
          <header className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-[12px] text-[#7a7a7a] hover:text-white transition-colors w-fit"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              ← back to beeper
            </Link>
            <div
              className="text-[11px] tracking-[0.2em] font-bold lcd-glow"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              {'// '}
              {kicker}
            </div>
            <h1
              className="text-white"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 5vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </h1>
            <p
              className="text-[11px] tracking-widest text-[#5a5a5a]"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              LAST UPDATED · {updated}
            </p>
          </header>

          <div className="text-[14px] md:text-[15px] text-[#a3a3a3] leading-relaxed">
            {intro}
          </div>

          <div className="flex flex-col divide-y divide-[#1f1f1f]">
            {sections.map((s, i) => (
              <section key={i} className="py-7 first:pt-0 flex flex-col gap-3">
                <h2
                  className="text-white text-[17px] md:text-[19px] font-medium"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {s.heading}
                </h2>
                <div className="text-[14px] md:text-[15px] text-[#a3a3a3] leading-relaxed flex flex-col gap-3">
                  {s.body}
                </div>
              </section>
            ))}
          </div>

          <footer className="mt-4 pt-8 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span
              className="text-[11px] tracking-widest text-[#5a5a5a]"
              style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
            >
              {'// BEEPER · v2 · ASYNC CLAUDE DELEGATION'}
            </span>
            <div className="flex items-center gap-5 text-[12px] text-[#7a7a7a]">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <a
                href="mailto:chinatchinat123@gmail.com"
                className="hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}
