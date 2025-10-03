const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');
const { RegisterPage } = require('../../pages/RegisterPage');
const { NotebooksPage } = require('../../pages/NotebooksPage');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { ConfirmationPage } = require('../../pages/ConfirmationPage');
const { datasets } = require('../../fixtures/testData');
const { uniqueEmail } = require('../../utils/random');

test.describe('E2E Purchase Flow - 14.1-inch Laptop (JS)', () => {
  for (const data of datasets) {
    test(`Order via ${data.billing.country} | Ship: ${data.shippingMethod} | Pay: ${data.paymentMethod}`, async ({ page }) => {
      const home = new HomePage(page);
      const register = new RegisterPage(page);
      const notebooks = new NotebooksPage(page);
      const product = new ProductPage(page);
      const cart = new CartPage(page);
      const checkout = new CheckoutPage(page);
      const confirm = new ConfirmationPage(page);

      await home.goto();

      // Register
      await home.openRegistration();
      const email = uniqueEmail('demowebshop');
      await register.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email,
        password: data.password
      });

      // Navigate to product
      await home.openNotebooksViaMenu();
      await notebooks.openProduct();

      // Capture PDP info
      const { name: pdpName, price: pdpPrice } = await product.getNameAndPrice();

      // Add to cart
      const beforeCount = await home.getCartCount();
      await product.addToCart();
      await product.openCart();
      const afterCount = await home.getCartCount();
      expect(afterCount).toBe(beforeCount + 1);

      // Assertions
      await cart.assertProduct(pdpName, pdpPrice);
      await cart.assertCartMath();

      // Checkout
      await cart.proceedToCheckout();
      await checkout.fillBilling({
        firstName: data.firstName,
        lastName: data.lastName,
        email,
        country: data.billing.country,
        city: data.billing.city,
        address1: data.billing.address1,
        zip: data.billing.zip,
        phone: data.billing.phone
      });
      await checkout.chooseShipping(data.shippingMethod);
      await checkout.choosePayment(data.paymentMethod);
      await checkout.confirmPaymentInfo();
      await checkout.assertReview(pdpName, pdpPrice);
      await checkout.confirmOrder();

      // Confirmation
      await confirm.assertThankYou();
      const orderNo = await confirm.getOrderNumber();
      test.info().annotations.push({ type: 'order', description: orderNo });
      console.log('Order Number:', orderNo);
      expect(orderNo).toMatch(/\d+/);
    });
  }
});
