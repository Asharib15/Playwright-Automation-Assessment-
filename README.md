# Jr. SQA Assessment — Playwright + JavaScript

End-to-end purchase flow automation + manual cases + regression strategy for **Demo Web Shop**.

## Stack
- Playwright `@playwright/test` (JavaScript)
- Page Object Model (POM)
- Data-driven testing (2 datasets)

## Setup
```bash
npm ci
npm run install:browsers
```

## Run
```bash
# All tests (headless)
npm test

# Headed mode (debug)
npm run test:headed

# Specific spec
npx playwright test tests/e2e/purchase.spec.js

# Show HTML report
npm run report
```

## Scenario (Automated)
- Register a new user (unique email at runtime)
- Navigate: Computers → Notebooks → **14.1-inch Laptop**
- Add to cart; verify cart badge
- Checkout with dataset-driven Billing, Shipping, Payment
- Assertions:
  - Product name & price consistency PDP → Cart → Review
  - Cart math (subtotal = unit × qty)
  - Address info on Confirm page
  - **Order number** present (regex)

## Project Layout
```
/pages                # POM classes
/tests/e2e            # Specs
/fixtures             # JS datasets
/utils                # Helpers (unique email, currency parser)
/manual-test-cases    # 20+ cases
/regression-strategy  # Strategy doc
```

## Notes
- Payment uses **Check / Money Order** for reliability
- Traces/videos/screenshots retained on failure
- Base URL configured in `playwright.config.js`
