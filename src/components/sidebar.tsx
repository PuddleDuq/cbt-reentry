"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/check-in", label: "Daily Check-in", icon: "📋" },
  { href: "/thought-record", label: "Thought Records", icon: "💭" },
  { href: "/skills", label: "CBT Skills", icon: "🧠" },
  { href: "/goals", label: "Goals", icon: "🎯" },
  { href: "/coping-plan", label: "Coping Plan", icon: "🛡️" },
];

export { navItems };

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-60 bg-surface border-r border-border flex-col z-30">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-semibold text-primary-dark tracking-tight flex items-center gap-2">
          <span aria-hidden="true">🌱</span>
          ReFrame
        </h1>
        <p className="text-sm text-muted mt-1">Your reentry companion</p>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto" aria-label="Main navigation">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset focus-visible:outline-none ${
                    isActive
                      ? "bg-primary/10 text-primary-dark font-medium border-l-4 border-primary"
                      : "text-foreground hover:bg-surface-warm"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/coping-plan"
          className="flex items-center gap-2 text-xs text-muted hover:text-primary-dark transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset focus-visible:outline-none rounded px-2 py-2"
        >
          <span aria-hidden="true">🆘</span>
          Need help? Crisis resources
        </Link>
        <div className="mt-3 bg-surface-warm rounded-lg p-3">
          <p className="text-xs text-muted">
            Progress is not a straight line. Every step forward counts.
          </p>
        </div>
      </div>
    </aside>
  );
}
