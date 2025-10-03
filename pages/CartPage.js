const { expect } = require('@playwright/test');
const { currencyToNumber } = require('../utils/random');

class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.productName = page.locator('td.product a');
    this.unitPrice = page.locator('td.unit-price span');
    this.quantityInput = page.locator('input.qty-input');
    this.subTotal = page.locator('td.subtotal span');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutBtn = page.locator('#checkout');
  }

  async assertProduct(name, price) {
    await expect(this.productName).toHaveText(name);
    await expect(this.unitPrice).toHaveText(price);
  }

  async assertCartMath() {
    const unit = currencyToNumber(await this.unitPrice.first().textContent());
    const qtyStr = await this.quantityInput.inputValue();
    const qty = parseInt(qtyStr || '1', 10);
    const expected = unit * qty;
    const actual = currencyToNumber(await this.subTotal.first().textContent());
    expect(Math.abs(actual - expected) < 0.01).toBeTruthy();
  }

  async proceedToCheckout() {
    await this.termsCheckbox.check();
    await this.checkoutBtn.click();
    await expect(this.page).toHaveURL(/onepagecheckout/);
  }
}

module.exports = { CartPage };
