"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIdentity } from "@/lib/identity";

const NAV = [
  { href: "/", label: "HOME" },
  { href: "/inbox", label: "INBOX" },
  { href: "/sent", label: "SENT" },
  { href: "/access", label: "ACCESS" },
];

function IdentityBadge() {
  const [me, setMe, loaded] = useIdentity();
  if (!loaded || !me) return null;
  return (
    <button
      onClick={() => {
        if (confirm("Switch identity?")) setMe(null);
      }}
      className="ml-4 flex items-center gap-1.5 font-label-caps text-label-caps text-on-surface-variant border border-outline-variant px-3 py-1 rounded-full hover:bg-surface-container transition-colors duration-150 ease-out"
      title="Click to switch identity"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <span className="status-dot" aria-hidden />
      ME: {me.toUpperCase()}
    </button>
  );
}

export function TopAppBar() {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 left-0 w-full z-40 border-b border-outline-variant bg-surface-container-lowest flex items-center px-container-margin h-10"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <Link href="/" className="flex items-center gap-unit group">
        <span className="text-lg leading-none" aria-hidden>
          📟
        </span>
        <span className="font-code-md text-code-md tracking-tighter text-primary uppercase group-hover:text-on-primary-fixed-variant transition-colors duration-150 ease-out">
          BEEPER
        </span>
        <span
          className="ml-1 font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-full"
          style={{ fontSize: "10px" }}
        >
          v2
        </span>
      </Link>

      <nav className="hidden md:flex ml-auto items-center gap-1 h-full">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                active
                  ? "font-label-caps text-label-caps text-primary border-b-2 border-primary h-full flex items-center px-3 transition-colors duration-150 ease-out"
                  : "font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-container hover:text-on-surface px-3 rounded-md h-full flex items-center transition-colors duration-150 ease-out"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <IdentityBadge />
    </header>
  );
}
