const { test, expect } = require('@playwright/test');

// Custom fixture that provides a pre-loaded page
const myTest = test.extend({
    todoPage: async ({ page }, use) => {
        // SETUP — runs before each test
        await page.goto('/');
        await expect(page.getByTestId('todo-item').first()).toBeVisible();
        console.log('Setup: Page loaded with todos');

        // Hand the page to the test
        await use(page);

        // TEARDOWN — runs after each test
        console.log('Teardown: Test completed');
    }
});

myTest.describe('Fixtures Demo', () => {

    myTest('can see existing todos using fixture', async ({ todoPage }) => {
        const items = todoPage.getByTestId('todo-item');
        await expect(items).toHaveCount(2);
    });

    myTest('can add a new todo using fixture', async ({ todoPage }) => {
        await todoPage.getByPlaceholder('Enter a todo').fill('Learn Playwright');
        await todoPage.getByText('Add').click();
        await expect(todoPage.getByText('Learn Playwright')).toBeVisible();
    });

});
