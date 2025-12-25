import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  page: Page;
  productsLink: Locator;
  searchInput: Locator;
  searchButton: Locator;
  productResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsLink = page.locator('a:has-text("Products")');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productResults = page.locator('.product-overlay');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/');
  }

  async goToProductsPage() {
    await this.productsLink.click();
    await expect(this.searchInput).toBeVisible({ timeout: 10000 });
  }

  async searchProduct(productName: string) {
    //await this.searchInput.scrollIntoViewIfNeeded();
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }
}
