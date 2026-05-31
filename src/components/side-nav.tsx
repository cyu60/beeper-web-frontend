"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "HOME", icon: "home" },
  { href: "/inbox", label: "INBOX", icon: "inbox" },
  { href: "/sent", label: "SENT", icon: "send" },
  { href: "/access", label: "ACCESS", icon: "vpn_key" },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-10 bottom-0 w-60 border-r border-outline-variant bg-surface-container-lowest flex-col py-stack-md z-30">
      <div className="px-container-margin pb-stack-sm flex flex-col gap-unit">
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
                  ? "flex items-center gap-stack-sm px-2 py-2 bg-surface-container text-primary"
                  : "flex items-center gap-stack-sm px-2 py-2 text-on-surface-variant hover:bg-surface-container-low"
              }
            >
              <span
                className={
                  active
                    ? "material-symbols-outlined filled text-[18px]"
                    : "material-symbols-outlined text-[18px]"
                }
                aria-hidden
              >
                {item.icon}
              </span>
              <span className="font-label-caps text-label-caps">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto px-container-margin pb-stack-sm">
        <Link
          href="/compose"
          className="flex items-center justify-center gap-stack-sm bg-primary text-on-primary font-label-caps text-label-caps py-2 hover:bg-inverse-surface"
        >
          <span className="material-symbols-outlined text-[16px]" aria-hidden>
            edit_square
          </span>
          NEW BEEP
        </Link>
      </div>
    </aside>
  );
}
