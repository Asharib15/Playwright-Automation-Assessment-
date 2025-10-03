const { expect } = require("@playwright/test");

class NotebooksPage {
  constructor(page) {
    this.page = page;
    // Use exact: true so only the text link is matched, not the image link
    this.productLink = page.getByRole("link", {
      name: "14.1-inch Laptop",
      exact: true,
    });
  }

  async openProduct() {
    await this.productLink.click();

    // Verify correct product page
    await expect(this.page.locator("h1")).toHaveText("14.1-inch Laptop");
    await expect(this.page).toHaveURL(/141-inch-laptop/);
  }
}

module.exports = { NotebooksPage };
