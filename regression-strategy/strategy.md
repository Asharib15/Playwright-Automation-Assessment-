# Regression Testing Strategy — Demo E-commerce (Playwright JS)

## Risk Assessment Matrix

| Area | Criticality | Change Freq | Risk | Notes |
|------|-------------|-------------|------|------|
| Auth/Registration | High | Medium | High | Blocks all purchases |
| Catalog Navigation | High | Medium | High | Affects discoverability |
| Cart & Pricing Math | Critical | Medium | Critical | Revenue & trust |
| Checkout (Billing/Shipping) | Critical | Medium | Critical | Blocks conversion |
| Payment Integration | Critical | Low–Med | Critical | External deps |
| Order Confirmation | High | Low | High | Proof of purchase |
| A11y/UI Responsiveness | Medium | Medium | Medium | Usability & compliance |

**Critical Journey:** Register → Browse → PDP → Cart → Checkout → Confirm.

## Test Selection Strategy

- **Smoke (every PR):**
  - Load homepage
  - Register & sign in
  - Add product to cart
  - Cart math check
  - Checkout (Check/Money Order)
  - Confirm order & capture order #
- **Targeted Regression:** Run area-specific suites based on diff (e.g., payment, cart).
- **Full Regression:** Pre-release/major refactor. Include cross-browser & responsive.
- **Automation vs Manual:** Automate deterministic flows; keep external/3DS/email partially manual.

## Execution Framework

- **Prioritization:** P0/P1 first, then P2/P3
- **CI:** PR smoke (Chromium); nightly full (Chromium/Firefox/WebKit)
- **Artifacts:** Trace/video/screenshots on failure
- **Maintenance:** POM, data-driven tests, tag/skip flaky, periodic selector audit
- **Timing:** PR ~3–5 min; nightly ~15–25 min
