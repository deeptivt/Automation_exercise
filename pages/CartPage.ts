import { Page, Locator } from '@playwright/test';

export class CartPage {
  page: Page;
  checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('a:has-text("Proceed To Checkout")');
  }

  async proceedToCheckout() {
    await this.checkoutButton.scrollIntoViewIfNeeded();
    await this.checkoutButton.click();
  }
}
