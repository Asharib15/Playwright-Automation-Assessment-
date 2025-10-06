const { expect } = require("@playwright/test");

class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.registerLink = page.locator('a[href="/register"]');
    this.computersLink = page
      .locator("ul.top-menu a", { hasText: "Computers" })
      .first();
    this.notebooksLink = page
      .locator("ul.top-menu a", { hasText: "Notebooks" })
      .first();
    this.cartQty = page.locator("span.cart-qty");
  }

  async goto() {
    await this.page.goto("/");
    await expect(this.page).toHaveTitle(/Demo Web Shop/i);
  }

  async openRegistration() {
    await this.registerLink.click();
  }

  async openNotebooksViaMenu() {
    await this.computersLink.hover();
    await this.notebooksLink.click();
  }

  async getCartCount() {
    const txt = await this.cartQty.textContent();
    const match = txt && txt.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}

module.exports = { HomePage };
