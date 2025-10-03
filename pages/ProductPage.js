const { expect } = require('@playwright/test');

class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.productName = page.locator('div.product-name h1');
    this.price = page.locator('div.product-price span');
    this.addToCartBtn = page.locator('input[value="Add to cart"]');
    this.successBar = page.locator('#bar-notification .content');
    this.cartLink = page.locator('a[href="/cart"]');
  }

  async getNameAndPrice() {
    const name = (await this.productName.textContent())?.trim() || '';
    const price = (await this.price.first().textContent())?.trim() || '';
    return { name, price };
  }

  async addToCart() {
    await this.addToCartBtn.click();
    await expect(this.successBar).toHaveText(/The product has been added to your shopping cart/);
  }

  async openCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/\/cart$/);
  }
}

module.exports = { ProductPage };
