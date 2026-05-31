import Link from "next/link";

const TILES = [
  { href: "/compose", icon: "receipt_long", label: "TASK" },
  { href: "/access", icon: "security", label: "PRIVACY" },
  { href: "/sent", icon: "terminal", label: "LOGS" },
];

export default function HomePage() {
  return (
    <main className="flex-grow flex flex-col justify-center px-container-margin w-full max-w-lg mx-auto">
      <div className="flex flex-col gap-stack-md mb-8">
        <h1 className="font-display text-display text-primary uppercase tracking-tight leading-none w-3/4">
          Async Claude delegation.
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
          Async, allowlisted, Claude-to-Claude task delegation between two
          humans. iMessage is the wake signal — slash commands are the inbox.
        </p>
        <Link
          href="/inbox"
          className="self-start bg-primary text-on-primary font-label-caps text-label-caps px-4 py-2 border border-primary hover:bg-on-surface-variant focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface-container-lowest"
        >
          ENTER
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-unit w-full">
        {TILES.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="border border-outline-variant bg-surface-container-lowest p-stack-sm flex flex-col items-start justify-center gap-unit hover:bg-surface-container-low cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-on-surface-variant text-[18px]"
              aria-hidden
            >
              {t.icon}
            </span>
            <span className="font-label-caps text-label-caps text-primary">
              {t.label}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
