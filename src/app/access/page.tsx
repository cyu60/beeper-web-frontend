const ALLOWLIST = [
  { name: "jeffrey", github: "iGotsIt", since: "2026-05-12" },
  { name: "edward", github: "ezhu15", since: "2026-05-18" },
  { name: "kaan", github: "kaan7305", since: "2026-05-22" },
];

const GATE_PORTS = [
  { port: 3000, label: "beeper-web (this app, dev)", state: "exposed" },
  { port: 8787, label: "dispatch demo proxy", state: "exposed" },
  { port: 5432, label: "postgres (local)", state: "closed" },
];

export default function AccessPage() {
  return (
    <main className="flex-grow px-container-margin max-w-3xl mx-auto w-full pt-4 md:pt-8">
      <header className="mb-stack-md flex items-center justify-between border-b border-outline-variant pb-4">
        <h1 className="font-display text-display tracking-tight text-primary">
          🔑 ACCESS
        </h1>
        <span className="font-code-sm text-code-sm text-on-surface-variant">
          gate + allowlist
        </span>
      </header>

      <section className="mb-8">
        <h2 className="font-label-caps text-label-caps text-secondary mb-stack-sm">
          ALLOWLIST — WHO CAN BEEP YOU
        </h2>
        <div className="border border-outline-variant">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-stack-sm px-stack-sm py-2 bg-surface-container-low border-b border-outline-variant">
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              NAME
            </span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              GITHUB
            </span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              SINCE
            </span>
          </div>
          {ALLOWLIST.map((u) => (
            <div
              key={u.name}
              className="grid grid-cols-[1fr_1fr_auto] gap-stack-sm px-stack-sm py-2 border-b border-outline-variant last:border-b-0 font-data-value text-data-value text-on-surface"
            >
              <span className="uppercase">{u.name}</span>
              <span className="text-secondary">@{u.github}</span>
              <span className="text-on-surface-variant">{u.since}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-label-caps text-label-caps text-secondary mb-stack-sm">
          GATE — EXPOSED PORTS ON TAILNET
        </h2>
        <div className="border border-outline-variant">
          {GATE_PORTS.map((p) => (
            <div
              key={p.port}
              className="grid grid-cols-[80px_1fr_auto] gap-stack-sm px-stack-sm py-2 border-b border-outline-variant last:border-b-0 items-center"
            >
              <span className="font-data-value text-data-value">:{p.port}</span>
              <span className="font-body-sm text-body-sm text-on-surface">
                {p.label}
              </span>
              <span
                className={
                  p.state === "exposed"
                    ? "font-label-caps text-label-caps text-primary border-l-2 border-primary pl-2"
                    : "font-label-caps text-label-caps text-on-surface-variant border-l-2 border-outline-variant pl-2"
                }
              >
                {p.state.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
