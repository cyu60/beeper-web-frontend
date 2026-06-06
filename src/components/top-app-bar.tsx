"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useIdentity } from "@/lib/identity";

const NAV = [
  { href: "/", label: "HOME" },
  { href: "/inbox", label: "INBOX" },
  { href: "/sent", label: "SENT" },
  { href: "/access", label: "ACCESS" },
];

function IdentityBadge() {
  const [me, setMe, loaded] = useIdentity();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  if (!loaded || !me) return null;

  return (
    <div ref={ref} className="ml-4 relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 font-label-caps text-label-caps text-on-surface-variant border border-outline-variant px-3 py-1 rounded-full hover:bg-surface-container transition-colors duration-150 ease-out"
        title="Account"
        style={{ boxShadow: "var(--shadow-sm)" }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="status-dot" aria-hidden />
        ME: {me.toUpperCase()}
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden className="opacity-60">
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-44 bg-surface-container-lowest border border-outline-variant rounded-md py-1 z-50"
          style={{ boxShadow: "var(--shadow-md)" }}
        >
          <div className="px-3 py-2 border-b border-outline-variant">
            <div className="font-label-caps text-label-caps text-on-surface-variant">
              Signed in as
            </div>
            <div className="font-data-value text-data-value text-on-surface mt-0.5">
              {me}
            </div>
          </div>
          <button
            onClick={() => {
              setMe(null);
              setOpen(false);
            }}
            role="menuitem"
            className="w-full text-left px-3 py-2 font-label-caps text-label-caps text-error hover:bg-surface-container transition-colors duration-150 ease-out"
          >
            SIGN OUT
          </button>
        </div>
      )}
    </div>
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
