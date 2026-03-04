const { test, expect } = require('@playwright/test');

test.describe('Assertions Demo', () => {

    test('page has correct title', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle('Todo App');
    });

    test('input field is visible', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByPlaceholder('Enter a todo')).toBeVisible();
    });

    test('todo items are displayed on load', async ({ page }) => {
        await page.goto('/');
        const items = page.getByTestId('todo-item');
        await expect(items).toHaveCount(2);
    });

    test('API returns correct data', async ({ request }) => {
        const response = await request.get('/api/todos');
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toHaveProperty('title');
    });

});
