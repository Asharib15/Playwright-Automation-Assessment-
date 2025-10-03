# Manual Test Cases — E-commerce E2E Purchase Flow (JS)

> Format: `Test ID | Objective | Priority | Type | Prerequisites | Test Data | Steps | Expected Results | Acceptance Criteria`

---
**TC_001_Register_HappyPath**  
**Objective:** Verify new user can register successfully.  
**Priority:** P0 | **Type:** Functional  
**Prerequisites:** Access to site.  
**Test Data:** Unique email, valid password.  
**Steps:**  
1. Open site > Register.  
2. Fill required fields and submit.  
**Expected:** Registration succeeds; user is logged in; Logout link visible.  
**Acceptance:** Pass if success message shows and account appears logged in.

**TC_002_Login_InvalidPassword**  
Objective: Error shown for wrong password.  
Priority: P1 | Type: Negative  
Prereq: Existing account.  
Data: Valid email + wrong password.  
Steps: Open Login, submit.  
Expected: Validation error.  
Acceptance: Error text clearly indicates invalid credentials.

**TC_003_Register_DuplicateEmail**  
Objective: Duplicate email registration blocked.  
Priority: P1 | Type: Negative  
Prereq: Existing account.  
Data: Same email as existing.  
Steps: Register again with same email.  
Expected: Error about email already exists.  
Acceptance: Registration prevented, helpful error shown.

**TC_004_Nav_Computers_Notebooks**  
Objective: Category navigation works.  
Priority: P2 | Type: UI/Functional  
Prereq: N/A  
Data: N/A  
Steps: Hover Computers > click Notebooks.  
Expected: Notebooks page loads, correct breadcrumb.  
Acceptance: Category list and products visible.

**TC_005_PDP_Details_PriceName**  
Objective: Verify PDP shows name/price for 14.1-inch Laptop.  
Priority: P0 | Type: Functional/UI  
Steps: Open product.  
Expected: Name "14.1-inch Laptop"; price visible; Add to cart enabled.  
Acceptance: Matches expected copy and price format.

**TC_006_Cart_Add_QuantityBadge**  
Objective: Adding to cart updates cart badge.  
Priority: P0 | Type: Functional  
Steps: Add once.  
Expected: Cart qty increments by 1.  
Acceptance: Badge count accurate.

**TC_007_Cart_LineMath_Subtotal**  
Objective: Subtotal = unit price * qty.  
Priority: P0 | Type: Functional  
Steps: View cart; adjust qty where applicable.  
Expected: Correct math recalculated.  
Acceptance: Tolerance ±0.01.

**TC_008_Checkout_Billing_Mandatory**  
Objective: Required billing fields enforced.  
Priority: P0 | Type: Functional/Validation  
Steps: Leave mandatory field blank, continue.  
Expected: Inline validation errors.  
Acceptance: Cannot proceed until valid.

**TC_009_Checkout_ShippingMethod_Ground**  
Objective: Ground shipping selectable.  
Priority: P1 | Type: Functional  
Steps: Choose "Ground".  
Expected: Selection persists; continue enabled.  
Acceptance: Moves to payment step.

**TC_010_Checkout_ShippingMethod_NextDay**  
Objective: Next Day Air selectable.  
Priority: P1 | Type: Functional  
Steps: Choose "Next Day Air".  
Expected: Selection persists.  
Acceptance: Moves to payment step.

**TC_011_Payment_CheckMoneyOrder**  
Objective: Check/Money Order flow.  
Priority: P0 | Type: Functional  
Steps: Select method; continue.  
Expected: No extra fields; proceed to Confirm.  
Acceptance: Confirmation page reachable.

**TC_012_Payment_InvalidCard**  
Objective: Invalid card rejected (if CC path used).  
Priority: P2 | Type: Negative  
Steps: Choose Credit Card; enter invalid number.  
Expected: Card validation error.  
Acceptance: Cannot confirm.

**TC_013_Review_PriceConsistency**  
Objective: Price consistent PDP→Cart→Review.  
Priority: P0 | Type: Functional  
Steps: Compare values.  
Expected: Identical values/format.  
Acceptance: All match within ±0.01.

**TC_014_Confirm_ThankYou_OrderNo**  
Objective: Thank you page and Order number present.  
Priority: P0 | Type: Functional  
Steps: Place order.  
Expected: "Thank you" and "Order number: ####".  
Acceptance: Regex `/\d+/` matches order number.

**TC_015_Address_On_Confirm**  
Objective: Confirm page shows entered address.  
Priority: P1 | Type: Functional/UI  
Steps: Complete order.  
Expected: Billing & shipping details match inputs.  
Acceptance: Country/City/Address appear correctly.

**TC_016_Cart_TermsRequired**  
Objective: Must accept terms before checkout.  
Priority: P2 | Type: Functional/Validation  
Steps: Try checkout without checking terms.  
Expected: Validation prompt.  
Acceptance: Cannot proceed until checked.

**TC_017_CrossBrowser**  
Objective: Smoke on three browsers.  
Priority: P1 | Type: Compatibility  
Steps: Run core purchase flow in each.  
Expected: Identical behavior.  
Acceptance: No browser-specific failures.

**TC_018_Responsive_MobileHeaderCart**  
Objective: Cart badge visible on mobile widths.  
Priority: P3 | Type: UI/Responsive  
Steps: View 375x812; add to cart.  
Expected: Badge visible/readable.  
Acceptance: No overlap or truncation.

**TC_019_A11y_Forms_Labels**  
Objective: Inputs have labels/name/role.  
Priority: P2 | Type: Accessibility  
Steps: Inspect with axe/keyboard.  
Expected: Labels or aria attributes present.  
Acceptance: No critical a11y violations.

**TC_020_A11y_KeyboardOnly_Checkout**  
Objective: Checkout keyboard-navigable.  
Priority: P2 | Type: Accessibility  
Steps: Tab/Shift+Tab through.  
Expected: Visible focus; operable without mouse.  
Acceptance: No traps; buttons reachable.

**TC_021_Negative_Zip_InvalidFormat**  
Objective: Reject invalid ZIP/postcode.  
Priority: P3 | Type: Negative/Validation  
Steps: Enter non-numeric (for US) and continue.  
Expected: Validation error.  
Acceptance: Cannot proceed.

**TC_022_Session_PersistCartAfterRefresh**  
Objective: Refresh does not lose cart.  
Priority: P2 | Type: Functional  
Steps: Add item, refresh cart page.  
Expected: Item persists.  
Acceptance: Cart unchanged.

**TC_023_Logout_Login_PersistAccount**  
Objective: Re-login shows previous orders.  
Priority: P3 | Type: Functional  
Steps: Place order, logout, login.  
Expected: Order history accessible.  
Acceptance: Order listed with number/date.
