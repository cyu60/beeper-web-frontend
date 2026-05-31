import { SENT_BEEPS, type BeepStatus } from "@/lib/mock-beeps";

const STATUS_STYLES: Record<BeepStatus, string> = {
  replied: "text-primary border-primary",
  queued: "text-on-surface-variant border-outline-variant",
  declined: "text-error border-error bg-error-container/20",
};

const STATUS_LABEL: Record<BeepStatus, string> = {
  replied: "REPLIED",
  queued: "QUEUED",
  declined: "DECLINED",
};

export default function SentPage() {
  return (
    <main className="flex-grow px-container-margin max-w-screen-md mx-auto w-full pt-4 md:pt-8">
      <div className="mb-stack-md flex items-baseline gap-2">
        <h1 className="font-display text-display tracking-tight text-primary">
          📟 SENT
        </h1>
        <span className="font-code-sm text-code-sm text-outline ml-auto px-2 py-1 bg-surface-container-low border border-outline-variant">
          {SENT_BEEPS.length} SENT
        </span>
      </div>

      <div className="flex flex-col gap-unit">
        {SENT_BEEPS.map((beep) => (
          <article
            key={beep.id}
            className={`group bg-surface-container-lowest border border-outline-variant p-stack-sm flex flex-col md:flex-row md:items-start justify-between gap-stack-sm hover:bg-surface-container-low ${
              beep.status === "queued" ? "opacity-80" : ""
            }`}
          >
            <div className="flex flex-col gap-stack-xs flex-grow">
              <div className="font-code-sm text-code-sm text-on-surface-variant uppercase">
                TO: {beep.to}
              </div>
              <div className="font-body-sm text-body-sm text-primary max-w-prose">
                &ldquo;{beep.task}&rdquo;
              </div>
              {beep.reply && (
                <div className="font-code-sm text-code-sm text-on-surface-variant max-w-prose border-l-2 border-outline-variant pl-2 mt-1">
                  ↳ {beep.reply}
                </div>
              )}
            </div>
            <div className="shrink-0 flex items-center">
              <div
                className={`font-label-caps text-label-caps border-l-[2px] pl-[6px] py-[2px] ${STATUS_STYLES[beep.status]}`}
              >
                {STATUS_LABEL[beep.status]}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
