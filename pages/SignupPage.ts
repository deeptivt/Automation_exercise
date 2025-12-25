import { Page, Locator } from '@playwright/test';

export class SignupPage {
  page: Page;
  signupLoginLink: Locator;
  nameInput: Locator;
  emailInput: Locator;
  signupButton: Locator;
  passwordInput: Locator;
  createAccountButton: Locator;
  continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.nameInput = page.locator('input[data-qa="signup-name"]');
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.passwordInput = page.locator('#password');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async navigateToSignup() {
    await this.page.goto('/');
    await this.signupLoginLink.click();
  }

  async enterSignupDetails(name: string, email: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
  }

  async fillAccountInformation(password: string) {
    await this.page.locator('#id_gender1').check();
    await this.passwordInput.fill(password);
    await this.page.selectOption('#days', '10');
    await this.page.selectOption('#months', '5');
    await this.page.selectOption('#years', '1998');

    await this.page.locator('#first_name').fill('Test');
    await this.page.locator('#last_name').fill('User');
    await this.page.locator('#address1').fill('Test Address');
    await this.page.selectOption('#country', 'India');
    await this.page.locator('#state').fill('Delhi');
    await this.page.locator('#city').fill('Delhi');
    await this.page.locator('#zipcode').fill('110001');
    await this.page.locator('#mobile_number').fill('9999999999');

    await this.createAccountButton.click();
    await this.continueButton.click();
  }
}
