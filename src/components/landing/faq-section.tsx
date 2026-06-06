const FAQS = [
  {
    q: 'What is Beeper?',
    a: 'Beeper is an async, allowlisted queue that lets one human delegate a task to another human\'s Claude session. The sender runs /beeper-v2 send (or just asks Claude in plain English), the recipient gets a real SMS, and their Claude picks up the task next time they run /beeper-v2.',
  },
  {
    q: 'Why text?',
    a: 'Because it\'s the one notification channel that already wakes the right people on the right device, regardless of which phone they carry. We treat the SMS as the wake signal — the actual task payload and audit log live in our backend.',
  },
  {
    q: 'How does the allowlist work?',
    a: 'You can only beep someone whose host admin has added you to their allowlist. Strangers get a 403 not_allowed response. Nothing is forwarded, nothing is silently queued.',
  },
  {
    q: 'What does the Claude side look like?',
    a: 'On the recipient\'s machine, Beeper installs as a Claude Code plugin (or via the CLI). /beeper-v2 with no args shows the inbox; /beeper-v2 reply <id> "<text>" and /beeper-v2 decline <id> "<reason>" drive the queue from inside any Claude session.',
  },
  {
    q: 'What does it cost?',
    a: 'Beeper is free during the closed beta. Pricing for general availability hasn\'t been announced yet.',
  },
  {
    q: 'What about privacy?',
    a: 'Every beep is signed by sender, scoped to recipient, and audited. We never share queue contents with anyone outside the two-party allowlist edge. Identity is stored locally on your device (plus a server-side mapping for SMS routing).',
  },
  {
    q: 'How do I get added?',
    a: 'Email chinat at chinatchinat123@gmail.com with the phone number you want to use and a one-line note on who you want to beep. We add manually for now.',
  },
]

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="min-h-screen w-full snap-start snap-always relative flex flex-col items-center px-6 py-24 crt-surface"
    >
      <div className="max-w-[620px] w-full flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3">
          <div
            className="text-[11px] tracking-[0.2em] font-bold lcd-glow"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            // FAQ
          </div>
          <h2
            id="faq-heading"
            className="text-white text-center"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 5vw, 40px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Things people ask
          </h2>
        </div>
        <div className="flex flex-col divide-y divide-[#1f1f1f]">
          {FAQS.map((item, i) => (
            <details key={i} className="group py-5 px-1">
              <summary
                className="flex items-center justify-between gap-4 cursor-pointer list-none text-left text-[15px] md:text-[17px] font-medium text-white"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                <span>{item.q}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#07c04e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 transition-transform duration-300 ease-in-out group-open:rotate-180"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p
                className="mt-3 text-[14px] md:text-[15px] text-[#a3a3a3] leading-relaxed"
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-4 pt-8 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-[11px] tracking-widest text-[#5a5a5a]" style={{ fontFamily: 'var(--font-jetbrains-mono)' }}>
            // BEEPER · v2 · ASYNC CLAUDE DELEGATION
          </span>
          <div className="flex items-center gap-5 text-[12px] text-[#7a7a7a]">
            <a
              href="https://github.com/iGotsIt/beeper"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              CLI on GitHub
            </a>
            <a
              href="mailto:chinatchinat123@gmail.com"
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
