"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./sidebar";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus first link when panel opens
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const firstLink = panelRef.current.querySelector<HTMLElement>("a");
      if (firstLink) {
        firstLink.focus();
      }
    }
  }, [isOpen]);

  // Prevent body scroll when nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    toggleButtonRef.current?.focus();
  }, []);

  return (
    <div className="md:hidden">
      {/* Hamburger toggle button */}
      <button
        ref={toggleButtonRef}
        onClick={toggle}
        className="fixed top-4 left-4 z-50 flex items-center justify-center w-11 h-11 rounded-lg bg-surface border border-border shadow-sm transition-colors hover:bg-surface-warm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset focus-visible:outline-none"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
      >
        {isOpen ? (
          <svg
            className="w-6 h-6 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Navigation panel */}
      {isOpen && (
        <div
          ref={panelRef}
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-surface shadow-lg flex flex-col overscroll-contain overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary-dark flex items-center gap-2">
                <span aria-hidden="true">🌱</span>
                ReFrame
              </h2>
              <p className="text-sm text-muted mt-0.5">
                Your reentry companion
              </p>
            </div>
            <button
              onClick={close}
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-warm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset focus-visible:outline-none"
              aria-label="Close navigation"
            >
              <svg
                className="w-5 h-5 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 p-4" aria-label="Main navigation">
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
                      onClick={close}
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

          {/* Crisis resources link */}
          <div className="p-4 border-t border-border">
            <Link
              href="/coping-plan"
              onClick={close}
              className="flex items-center gap-2 text-xs text-muted hover:text-primary-dark transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset focus-visible:outline-none rounded px-2 py-2"
            >
              <span aria-hidden="true">🆘</span>
              Need help? Crisis resources
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
