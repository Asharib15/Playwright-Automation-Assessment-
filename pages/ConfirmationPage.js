const { expect } = require('@playwright/test');

class ConfirmationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.thankYouHeader = page.locator('h1', { hasText: 'Thank you' });
    this.orderNumberBlock = page.locator('.order-number');
  }

  async assertThankYou() {
    await expect(this.thankYouHeader).toBeVisible();
  }

  async getOrderNumber() {
    const text = (await this.orderNumberBlock.textContent()) || '';
    const match = text.match(/Order number:\s*(\d+)/i);
    expect(match).not.toBeNull();
    return match ? match[1] : '';
  }
}

module.exports = { ConfirmationPage };
