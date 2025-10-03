const { expect } = require("@playwright/test");

class RegisterPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.genderMale = page.locator("#gender-male");
    this.firstName = page.locator("#FirstName");
    this.lastName = page.locator("#LastName");
    this.email = page.locator("#Email");
    this.password = page.locator("#Password");
    this.confirmPassword = page.locator("#ConfirmPassword");
    this.registerBtn = page.locator("#register-button");
    this.logoutLink = page.locator('a[href="/logout"]');
    this.loginLink = page.locator('a[href="/login"]');
  }

  async register({ firstName, lastName, email, password }) {
    await this.genderMale.check();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
    await this.registerBtn.click();
    await expect(this.logoutLink).toBeVisible();
  }

  async logout() {
    await this.logoutLink.click();
    await expect(this.loginLink).toBeVisible();
  }
}

module.exports = { RegisterPage };
