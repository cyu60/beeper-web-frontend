import Link from "next/link";
import { INBOX_BEEPS, formatTime, type Urgency } from "@/lib/mock-beeps";

const URGENCY_STYLES: Record<Urgency, string> = {
  high: "bg-error-container text-on-error-container border-error",
  normal: "bg-surface-variant text-on-surface-variant border-outline",
  low: "bg-surface-container-low text-on-surface-variant border-outline-variant",
};

export default function InboxPage() {
  const total = INBOX_BEEPS.length;

  return (
    <main className="flex-grow px-container-margin md:px-8 max-w-5xl mx-auto w-full pt-4 md:pt-8">
      <header className="mb-stack-md flex items-center justify-between">
        <h1 className="font-display text-display uppercase tracking-tight text-primary">
          📟 INBOX
        </h1>
        <span className="font-code-sm text-code-sm text-outline px-2 py-1 bg-surface-container-low border border-outline-variant">
          {total} TASKS
        </span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter md:gap-stack-md">
        {INBOX_BEEPS.map((beep) => (
          <article
            key={beep.id}
            className="border border-outline-variant bg-surface-container-lowest p-stack-sm flex flex-col gap-stack-xs hover:bg-surface-bright"
          >
            <div className="flex justify-between items-start w-full">
              <div className="font-code-md text-code-md font-bold text-primary uppercase">
                FROM: {beep.from}
              </div>
              <div className="font-code-sm text-code-sm text-on-surface-variant">
                {formatTime(beep.createdAt)}
              </div>
            </div>
            <div className="bg-surface-container-low border border-outline-variant p-stack-sm font-code-sm text-code-sm text-on-surface line-clamp-2 min-h-10 w-full">
              {beep.task}
            </div>
            <div className="mt-unit flex items-center justify-between">
              <div
                className={`font-label-caps text-label-caps px-2 py-0.5 border-l-2 ${URGENCY_STYLES[beep.urgency]}`}
              >
                {beep.urgency.toUpperCase()}
              </div>
              <div className="flex items-center gap-2">
                {beep.transcriptRequested && (
                  <span className="font-label-caps text-label-caps text-on-surface-variant inline-flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      aria-hidden
                    >
                      description
                    </span>
                    TRANSCRIPT
                  </span>
                )}
                <span className="font-code-sm text-code-sm text-outline">
                  {beep.id}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Link
        href="/compose"
        aria-label="New beep"
        className="fixed bottom-16 md:bottom-8 right-container-margin w-12 h-12 bg-primary text-on-primary flex items-center justify-center border border-primary hover:bg-inverse-surface z-40"
      >
        <span className="material-symbols-outlined text-2xl" aria-hidden>
          add
        </span>
      </Link>
    </main>
  );
}
