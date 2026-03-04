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
        await expect(page.getByText('Buy groceries')).toBeVisible();
        await expect(page.getByText('Write tests')).toBeVisible();
    });

    test('API returns correct data', async ({ request }) => {
        const response = await request.get('/api/todos');
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toHaveProperty('title');
    });

});
