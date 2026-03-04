const { test, expect } = require('@playwright/test');

test.describe('Mocking Demo', () => {

    test('intercept API and return mocked todos', async ({ page }) => {

        // MOCK the API response before navigation
        await page.route('**/api/todos', route => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([
                    { id: 99, title: 'Mocked Todo One', completed: false },
                    { id: 100, title: 'Mocked Todo Two', completed: false },
                    { id: 101, title: 'Mocked Todo Three', completed: false },
                ])
            });
        });

        await page.goto('/');

        // These come from the mock, not the real server
        await expect(page.getByText('Mocked Todo One')).toBeVisible();
        await expect(page.getByText('Mocked Todo Two')).toBeVisible();
        const items = page.getByTestId('todo-item');
        await expect(items).toHaveCount(3);
    });

    test('simulate API failure with stub', async ({ page }) => {
        await page.route('**/api/todos', route => {
            route.fulfill({
                status: 500,
                body: 'Internal Server Error'
            });
        });

        await page.goto('/');
        // App should still load even if API fails
        await expect(page.getByText('Todo App')).toBeVisible();
    });

});
