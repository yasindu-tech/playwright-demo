const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');

let browser, page;

Before(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
});

After(async () => {
    await browser.close();
});

Given('I open the Todo application', async () => {
    await page.goto('http://localhost:3000');
});

When('I type {string} in the input field', async (text) => {
    await page.getByPlaceholder('Enter a todo').fill(text);
});

When('I click the Add button', async () => {
    await page.getByText('Add').click();
});

Then('I should see todo items listed on the page', async () => {
    const items = page.getByTestId('todo-item');
    await expect(items.first()).toBeVisible();
});

Then('I should see {string} in the list', async (text) => {
    await expect(page.getByText(text)).toBeVisible();
});
