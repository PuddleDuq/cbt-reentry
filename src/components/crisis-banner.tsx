/**
 * CrisisBanner — Server Component (zero JS shipped to client)
 *
 * Displays 988 Lifeline, Crisis Text Line (741741), and 911 with tappable tel:/sms: links.
 * Non-editable, non-removable by user. Persistent and visible without scrolling
 * on the coping plan page.
 *
 * Validates: Requirements 5.6, 12.1
 */
export default function CrisisBanner() {
  return (
    <section
      aria-label="Crisis resources — always available"
      className="bg-surface-warm border-2 border-danger/30 rounded-xl p-5"
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-2xl leading-none mt-0.5">
          🤝
        </span>
        <div className="space-y-3 flex-1">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Need help right now?
            </h3>
            <p className="text-sm text-muted mt-1">
              You&apos;re not alone. Help is available 24/7, free and confidential.
            </p>
          </div>

          <ul className="space-y-2" role="list">
            <li>
              <a
                href="tel:988"
                className="inline-flex items-center gap-2 min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
              >
                <span aria-hidden="true">📞</span>
                988 Suicide &amp; Crisis Lifeline
              </a>
            </li>
            <li>
              <a
                href="sms:741741&body=HOME"
                className="inline-flex items-center gap-2 min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
              >
                <span aria-hidden="true">💬</span>
                Crisis Text Line — text HOME to 741741
              </a>
            </li>
            <li>
              <a
                href="tel:911"
                className="inline-flex items-center gap-2 min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg bg-danger/10 text-danger font-medium text-sm hover:bg-danger/20 transition-colors"
              >
                <span aria-hidden="true">🚨</span>
                911 Emergency
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
