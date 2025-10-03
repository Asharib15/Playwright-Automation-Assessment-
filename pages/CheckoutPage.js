const { expect } = require('@playwright/test');

class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async fillBilling(address) {
    await this.page.selectOption('#BillingNewAddress_CountryId', { label: address.country });
    await this.page.fill('#BillingNewAddress_City', address.city);
    await this.page.fill('#BillingNewAddress_Address1', address.address1);
    await this.page.fill('#BillingNewAddress_ZipPostalCode', address.zip);
    await this.page.fill('#BillingNewAddress_PhoneNumber', address.phone);
    await this.page.getByRole('button', { name: 'Continue' }).first().click();
  }

  async chooseShipping(methodLabel) {
    await this.page.getByLabel(methodLabel).check();
    await this.page.getByRole('button', { name: 'Continue' }).nth(1).click();
  }

  async choosePayment(methodLabel) {
    await this.page.getByLabel(methodLabel).check();
    await this.page.getByRole('button', { name: 'Continue' }).nth(2).click();
  }

  async confirmPaymentInfo() {
    await this.page.getByRole('button', { name: 'Continue' }).nth(3).click();
  }

  async assertReview(name, price) {
    const reviewName = this.page.locator('.cart-item-row .product .product-name a');
    const reviewPrice = this.page.locator('.cart-item-row .product-unit-price');
    await expect(reviewName).toHaveText(name);
    await expect(reviewPrice).toContainText(price);
  }

  async confirmOrder() {
    await this.page.getByRole('button', { name: 'Confirm' }).click();
  }
}

module.exports = { CheckoutPage };
