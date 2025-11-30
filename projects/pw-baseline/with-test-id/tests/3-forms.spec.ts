import { test, expect } from '@playwright/test';

test.describe('Dashboard - Forms Tab', () => {
    test.beforeEach(async ({ page }) => {
        // Login and navigate to forms tab
        await page.goto('/index.html');
        await page.locator('[data-testid="login-email"]').fill('user@example.com');
        await page.locator('[data-testid="login-password"]').fill('user123');
        await page.locator('[data-testid="login-submit"]').click();
        await page.waitForURL(/dashboard\.html/);

        // Click forms tab
        await page.locator('[data-testid="tab-forms"]').click();
    });

    test('should display profile form', async ({ page }) => {
        const form = page.locator('#profileForm');
        await expect(form).toBeVisible();
    });

    test('should fill full name input', async ({ page }) => {
        const input = page.locator('[data-testid="input-fullname"]');
        await input.fill('John Doe');
        await expect(input).toHaveValue('John Doe');
    });

    test('should fill email input', async ({ page }) => {
        const input = page.locator('[data-testid="input-email"]');
        await input.fill('john@example.com');
        await expect(input).toHaveValue('john@example.com');
    });

    test('should select role dropdown option', async ({ page }) => {
        const select = page.locator('[data-testid="select-role"]');
        await select.selectOption('developer');
        await expect(select).toHaveValue('developer');
    });

    test('should display all role options', async ({ page }) => {
        const select = page.locator('[data-testid="select-role"]');
        const options = select.locator('option');

        await expect(options).toHaveCount(5); // empty + 4 options
        await expect(select.locator('option[value="developer"]')).toContainText('Developer');
        await expect(select.locator('option[value="designer"]')).toContainText('Designer');
        await expect(select.locator('option[value="manager"]')).toContainText('Manager');
        await expect(select.locator('option[value="analyst"]')).toContainText('Analyst');
    });

    test('should select department dropdown option', async ({ page }) => {
        const select = page.locator('[data-testid="select-department"]');
        await select.selectOption('engineering');
        await expect(select).toHaveValue('engineering');
    });

    test('should display all department options', async ({ page }) => {
        const select = page.locator('[data-testid="select-department"]');
        const options = select.locator('option');

        await expect(options).toHaveCount(5); // empty + 4 options
        await expect(select.locator('option[value="engineering"]')).toContainText('Engineering');
        await expect(select.locator('option[value="design"]')).toContainText('Design');
        await expect(select.locator('option[value="product"]')).toContainText('Product');
        await expect(select.locator('option[value="sales"]')).toContainText('Sales');
    });

    test('should fill bio textarea', async ({ page }) => {
        const textarea = page.locator('[data-testid="textarea-bio"]');
        const bioText = 'I am a software developer with 5 years of experience.';
        await textarea.fill(bioText);
        await expect(textarea).toHaveValue(bioText);
    });

    test('should check notifications checkbox', async ({ page }) => {
        const checkbox = page.locator('[data-testid="checkbox-notifications"]');
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    });

    test('should uncheck notifications checkbox', async ({ page }) => {
        const checkbox = page.locator('[data-testid="checkbox-notifications"]');
        await checkbox.check();
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    });

    test('should check newsletter checkbox', async ({ page }) => {
        const checkbox = page.locator('[data-testid="checkbox-newsletter"]');
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    });

    test('should uncheck newsletter checkbox', async ({ page }) => {
        const checkbox = page.locator('[data-testid="checkbox-newsletter"]');
        await checkbox.check();
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    });

    test('should display save profile button', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-save-profile"]');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Save Profile');
    });

    test('should display cancel button', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-cancel-profile"]');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Cancel');
    });

    test('should submit profile form successfully', async ({ page }) => {
        // Fill form
        await page.locator('[data-testid="input-fullname"]').fill('John Doe');
        await page.locator('[data-testid="input-email"]').fill('john@example.com');
        await page.locator('[data-testid="select-role"]').selectOption('developer');
        await page.locator('[data-testid="select-department"]').selectOption('engineering');
        await page.locator('[data-testid="textarea-bio"]').fill('Software engineer');

        // Submit form
        await page.locator('[data-testid="btn-save-profile"]').click();

        // Check for success toast
        await expect(page.locator('[data-testid="toast-success"]')).toBeVisible();
        await expect(page.locator('[data-testid="toast-success"]')).toContainText('saved successfully');
    });

    test('should cancel form and show info toast', async ({ page }) => {
        // Fill form
        await page.locator('[data-testid="input-fullname"]').fill('John Doe');

        // Click cancel
        await page.locator('[data-testid="btn-cancel-profile"]').click();

        // Check for info toast
        await expect(page.locator('[data-testid="toast-info"]')).toBeVisible();

        // Form should be cleared
        await expect(page.locator('[data-testid="input-fullname"]')).toHaveValue('');
    });

    test('should select country and populate cities', async ({ page }) => {
        // Click components tab to access dependent dropdowns
        await page.locator('[data-testid="tab-components"]').click();

        const countrySelect = page.locator('[data-testid="select-country"]');
        const citySelect = page.locator('[data-testid="select-city"]');

        // City should be disabled initially
        await expect(citySelect).toBeDisabled();

        // Select USA
        await countrySelect.selectOption('usa');

        // City should now be enabled
        await expect(citySelect).toBeEnabled();

        // Should have city options
        const options = citySelect.locator('option');
        await expect(options).toHaveCount(5); // empty + 4 cities
    });

    test('should load US cities when USA selected', async ({ page }) => {
        // Click components tab
        await page.locator('[data-testid="tab-components"]').click();

        const countrySelect = page.locator('[data-testid="select-country"]');
        const citySelect = page.locator('[data-testid="select-city"]');

        await countrySelect.selectOption('usa');

        // Verify US cities are present
        await expect(citySelect.locator('option[value="new-york"]')).toContainText('New York');
        await expect(citySelect.locator('option[value="los-angeles"]')).toContainText('Los Angeles');
        await expect(citySelect.locator('option[value="chicago"]')).toContainText('Chicago');
        await expect(citySelect.locator('option[value="houston"]')).toContainText('Houston');
    });

    test('should load UK cities when UK selected', async ({ page }) => {
        // Click components tab
        await page.locator('[data-testid="tab-components"]').click();

        const countrySelect = page.locator('[data-testid="select-country"]');
        const citySelect = page.locator('[data-testid="select-city"]');

        await countrySelect.selectOption('uk');

        // Verify UK cities are present
        await expect(citySelect.locator('option[value="london"]')).toContainText('London');
        await expect(citySelect.locator('option[value="manchester"]')).toContainText('Manchester');
        await expect(citySelect.locator('option[value="birmingham"]')).toContainText('Birmingham');
        await expect(citySelect.locator('option[value="edinburgh"]')).toContainText('Edinburgh');
    });

    test('should select city option', async ({ page }) => {
        // Click components tab
        await page.locator('[data-testid="tab-components"]').click();

        const countrySelect = page.locator('[data-testid="select-country"]');
        const citySelect = page.locator('[data-testid="select-city"]');

        await countrySelect.selectOption('usa');
        await citySelect.selectOption('new-york');

        await expect(citySelect).toHaveValue('new-york');
    });
});
