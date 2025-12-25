import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly continueShoppingButton: Locator;
  readonly viewCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.viewCartButton = page.locator('a:has-text("View Cart")');
  }

  async scrollDown(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.page.keyboard.press('PageDown');
      await this.page.waitForTimeout(300);
    }
  }

  async addFirstProductToCart() {
    const firstProduct = this.page.locator('.product-image-wrapper').first();

    
    await firstProduct.scrollIntoViewIfNeeded();

    await this.scrollDown(2);
    await firstProduct.hover();
    await firstProduct.locator('a.btn.add-to-cart').first().click();

    await this.continueShoppingButton.waitFor({ state: 'visible' });
   // await this.continueShoppingButton.click();
  }

  // ✅ ADD THIS
  async viewCart() {
    //await this.viewCartButton.scrollIntoViewIfNeeded();
    await this.viewCartButton.click();
  }
}
