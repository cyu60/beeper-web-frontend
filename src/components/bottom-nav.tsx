"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "HOME", icon: "home" },
  { href: "/inbox", label: "INBOX", icon: "inbox" },
  { href: "/sent", label: "SENT", icon: "send" },
  { href: "/access", label: "ACCESS", icon: "vpn_key" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-12 bg-surface-container-lowest border-t border-outline-variant z-50">
      {NAV.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              active
                ? "flex flex-col items-center justify-center text-primary px-2 py-1 w-full h-full transition-colors duration-150 ease-out"
                : "flex flex-col items-center justify-center text-on-surface-variant px-2 py-1 w-full h-full hover:bg-surface-container transition-colors duration-150 ease-out"
            }
          >
            <span
              className={
                active
                  ? "material-symbols-outlined filled text-[20px]"
                  : "material-symbols-outlined text-[20px]"
              }
              aria-hidden
            >
              {item.icon}
            </span>
            <span className="font-label-caps text-label-caps mt-0.5">
              {item.label}
            </span>
            {active && (
              <span
                className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full"
                style={{ borderRadius: "var(--radius-pill)" }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
