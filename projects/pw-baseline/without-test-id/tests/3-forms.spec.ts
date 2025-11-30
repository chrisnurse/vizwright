import { test, expect } from '@playwright/test';

test.describe('Dashboard - Forms Tab', () => {
    test.beforeEach(async ({ page }) => {
        // Login and navigate to forms tab
        await page.goto('/index.html');
        await page.locator('input[type="email"]').fill('user@example.com');
        await page.locator('input[type="password"]').fill('user123');
        await page.locator('button:has-text("Sign In")').click();
        await page.waitForURL(/dashboard\.html/);

        // Click forms tab
        await page.locator('button:has-text("Forms")').click();
    });

    test('should display profile form', async ({ page }) => {
        const form = page.locator('#profileForm');
        await expect(form).toBeVisible();
    });

    test('should fill full name input', async ({ page }) => {
        const form = page.locator('#profileForm');
        const input = form.locator('input').first();
        await input.fill('John Doe');
        await expect(input).toHaveValue('John Doe');
    });

    test('should fill email input', async ({ page }) => {
        const form = page.locator('#profileForm');
        const inputs = form.locator('input');
        const emailInput = inputs.nth(1);
        await emailInput.fill('john@example.com');
        await expect(emailInput).toHaveValue('john@example.com');
    });

    test('should select role dropdown option', async ({ page }) => {
        const form = page.locator('#profileForm');
        const selects = form.locator('select');
        const roleSelect = selects.nth(0);
        await roleSelect.selectOption('developer');
        await expect(roleSelect).toHaveValue('developer');
    });

    test('should display all role options', async ({ page }) => {
        const form = page.locator('#profileForm');
        const roleSelect = form.locator('select').nth(0);
        const options = roleSelect.locator('option');

        await expect(options).toHaveCount(5); // empty + 4 options
        await expect(roleSelect.locator('option[value="developer"]')).toContainText('Developer');
        await expect(roleSelect.locator('option[value="designer"]')).toContainText('Designer');
        await expect(roleSelect.locator('option[value="manager"]')).toContainText('Manager');
        await expect(roleSelect.locator('option[value="analyst"]')).toContainText('Analyst');
    });

    test('should select department dropdown option', async ({ page }) => {
        const form = page.locator('#profileForm');
        const selects = form.locator('select');
        const deptSelect = selects.nth(1);
        await deptSelect.selectOption('engineering');
        await expect(deptSelect).toHaveValue('engineering');
    });

    test('should display all department options', async ({ page }) => {
        const form = page.locator('#profileForm');
        const deptSelect = form.locator('select').nth(1);
        const options = deptSelect.locator('option');

        await expect(options).toHaveCount(5); // empty + 4 options
        await expect(deptSelect.locator('option[value="engineering"]')).toContainText('Engineering');
        await expect(deptSelect.locator('option[value="design"]')).toContainText('Design');
        await expect(deptSelect.locator('option[value="product"]')).toContainText('Product');
        await expect(deptSelect.locator('option[value="sales"]')).toContainText('Sales');
    });

    test('should fill bio textarea', async ({ page }) => {
        const form = page.locator('#profileForm');
        const textarea = form.locator('textarea');
        const bioText = 'I am a software developer with 5 years of experience.';
        await textarea.fill(bioText);
        await expect(textarea).toHaveValue(bioText);
    });

    test('should check notifications checkbox', async ({ page }) => {
        const form = page.locator('#profileForm');
        const checkboxes = form.locator('input[type="checkbox"]');
        const notifCheckbox = checkboxes.nth(0);
        await notifCheckbox.check();
        await expect(notifCheckbox).toBeChecked();
    });

    test('should uncheck notifications checkbox', async ({ page }) => {
        const form = page.locator('#profileForm');
        const checkboxes = form.locator('input[type="checkbox"]');
        const notifCheckbox = checkboxes.nth(0);
        await notifCheckbox.check();
        await notifCheckbox.uncheck();
        await expect(notifCheckbox).not.toBeChecked();
    });

    test('should check newsletter checkbox', async ({ page }) => {
        const form = page.locator('#profileForm');
        const checkboxes = form.locator('input[type="checkbox"]');
        const newsCheckbox = checkboxes.nth(1);
        await newsCheckbox.check();
        await expect(newsCheckbox).toBeChecked();
    });

    test('should uncheck newsletter checkbox', async ({ page }) => {
        const form = page.locator('#profileForm');
        const checkboxes = form.locator('input[type="checkbox"]');
        const newsCheckbox = checkboxes.nth(1);
        await newsCheckbox.check();
        await newsCheckbox.uncheck();
        await expect(newsCheckbox).not.toBeChecked();
    });

    test('should display save profile button', async ({ page }) => {
        const form = page.locator('#profileForm');
        const btn = form.locator('button').filter({ hasText: 'Save' });
        await expect(btn).toBeVisible();
    });

    test('should display cancel button', async ({ page }) => {
        const form = page.locator('#profileForm');
        const btn = form.locator('button').filter({ hasText: 'Cancel' });
        await expect(btn).toBeVisible();
    });

    test('should submit profile form successfully', async ({ page }) => {
        const form = page.locator('#profileForm');

        // Fill form
        const inputs = form.locator('input');
        inputs.nth(0).fill('John Doe');
        inputs.nth(1).fill('john@example.com');
        form.locator('select').nth(0).selectOption('developer');
        form.locator('select').nth(1).selectOption('engineering');
        form.locator('textarea').fill('Software engineer');

        // Submit form
        form.locator('button').filter({ hasText: 'Save' }).click();

        // Check for success toast
        await expect(page.locator('[class*="toast"][class*="success"]')).toBeVisible();
    });

    test('should cancel form and show info toast', async ({ page }) => {
        const form = page.locator('#profileForm');

        // Fill form
        form.locator('input').nth(0).fill('John Doe');

        // Click cancel
        form.locator('button').filter({ hasText: 'Cancel' }).click();

        // Check for info toast
        await expect(page.locator('[class*="toast"][class*="info"]')).toBeVisible();

        // Form should be cleared
        await expect(form.locator('input').nth(0)).toHaveValue('');
    });

    test('should select country and populate cities', async ({ page }) => {
        // Click components tab to access dependent dropdowns
        await page.locator('button:has-text("Components")').click();

        const selects = page.locator('select');
        const countrySelect = selects.nth(0);
        const citySelect = selects.nth(1);

        // City should be disabled initially
        await expect(citySelect).toBeDisabled();

        // Select USA
        await countrySelect.selectOption('usa');

        // City should now be enabled
        await expect(citySelect).toBeEnabled();

        // Should have city options
        const options = citySelect.locator('option');
        await expect(options.count()).resolves.toBeGreaterThan(1);
    });

    test('should load US cities when USA selected', async ({ page }) => {
        // Click components tab
        await page.locator('button:has-text("Components")').click();

        const selects = page.locator('select');
        const countrySelect = selects.nth(0);
        const citySelect = selects.nth(1);

        await countrySelect.selectOption('usa');

        // Verify US cities are present
        await expect(citySelect.locator('option[value="new-york"]')).toContainText('New York');
        await expect(citySelect.locator('option[value="los-angeles"]')).toContainText('Los Angeles');
        await expect(citySelect.locator('option[value="chicago"]')).toContainText('Chicago');
        await expect(citySelect.locator('option[value="houston"]')).toContainText('Houston');
    });

    test('should load UK cities when UK selected', async ({ page }) => {
        // Click components tab
        await page.locator('button:has-text("Components")').click();

        const selects = page.locator('select');
        const countrySelect = selects.nth(0);
        const citySelect = selects.nth(1);

        await countrySelect.selectOption('uk');

        // Verify UK cities are present
        await expect(citySelect.locator('option[value="london"]')).toContainText('London');
        await expect(citySelect.locator('option[value="manchester"]')).toContainText('Manchester');
        await expect(citySelect.locator('option[value="birmingham"]')).toContainText('Birmingham');
        await expect(citySelect.locator('option[value="edinburgh"]')).toContainText('Edinburgh');
    });

    test('should select city option', async ({ page }) => {
        // Click components tab
        await page.locator('button:has-text("Components")').click();

        const selects = page.locator('select');
        const countrySelect = selects.nth(0);
        const citySelect = selects.nth(1);

        await countrySelect.selectOption('usa');
        await citySelect.selectOption('new-york');

        await expect(citySelect).toHaveValue('new-york');
    });
});
