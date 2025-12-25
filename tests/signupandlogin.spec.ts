import { test, expect, chromium, Page, Browser, BrowserContext } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();

  const signupPage = new SignupPage(page);
  const loginPage = new LoginPage(page);

  const email = `user${Date.now()}@mail.com`;
  const password = 'Test@1234';

  // 🔹 Signup (once)
  await signupPage.navigateToSignup();
  await signupPage.enterSignupDetails('Test User', email);
  await signupPage.fillAccountInformation(password);
  await expect(page.locator('text=Logged in as')).toBeVisible();

  // 🔹 Logout
  await page.locator('a[href="/logout"]').click();

  // 🔹 Login (once)
  await loginPage.navigateToLogin();
  await loginPage.login(email, password);
  await expect(page.locator('text=Logged in as')).toBeVisible();
});

test.afterAll(async () => {
   if (browser) {
    await browser.close();
  }
});


// ===================================
// ✅ TESTS THAT RUN AFTER LOGIN
// ===================================

test('Search and add product to cart (after login)', async () => {
  const home = new HomePage(page);
  const product = new ProductPage(page);

  await home.navigate();
  await home.goToProductsPage();
  await home.searchProduct('Blue Top');

  // Assert search results
  const count = await home.productResults.count();
  expect(count).toBeGreaterThan(0);

  // Add product
  await product.addFirstProductToCart();
  //await page.pause()
  // View cart
  await product.viewCart();

  // ======================
  // ✅ CART ASSERTIONS
  // ======================
  await expect(page).toHaveURL(/\/view_cart/);

  const cartProduct = page.locator('.cart_info tbody tr');
  await expect(cartProduct).toHaveCount(1);

  await expect(
    cartProduct.locator('.cart_description a')
  ).toHaveText('Blue Top');

  await expect(
    cartProduct.locator('.cart_quantity button')
  ).toHaveText('1');
});
