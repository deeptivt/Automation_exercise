import { Page, Locator } from '@playwright/test';

export class LoginPage {
  page: Page;
  emailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  loggedInText: Locator;
  logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loggedInText = page.locator('text=Logged in as');
    this.logoutButton = page.locator('a[href="/logout"]');
  }

  async navigateToLogin() {
    await this.page.goto('https://automationexercise.com/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
