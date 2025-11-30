import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/index.html');
    });

    test('should display login form with all required elements', async ({ page }) => {
        // Verify form elements exist
        await expect(page.locator('[data-testid="login-email"]')).toBeVisible();
        await expect(page.locator('[data-testid="login-password"]')).toBeVisible();
        await expect(page.locator('[data-testid="login-submit"]')).toBeVisible();
    });

    test('should successfully login with valid user credentials', async ({ page }) => {
        // Fill email
        await page.locator('[data-testid="login-email"]').fill('user@example.com');

        // Fill password
        await page.locator('[data-testid="login-password"]').fill('user123');

        // Submit form
        await page.locator('[data-testid="login-submit"]').click();

        // Verify navigation to dashboard
        await expect(page).toHaveURL(/dashboard\.html/);
    });

    test('should successfully login with valid admin credentials', async ({ page }) => {
        // Fill email
        await page.locator('[data-testid="login-email"]').fill('admin@example.com');

        // Fill password
        await page.locator('[data-testid="login-password"]').fill('admin123');

        // Submit form
        await page.locator('[data-testid="login-submit"]').click();

        // Verify navigation to dashboard
        await expect(page).toHaveURL(/dashboard\.html/);
    });

    test('should show error message with invalid credentials', async ({ page }) => {
        // Fill with invalid credentials
        await page.locator('[data-testid="login-email"]').fill('wrong@example.com');
        await page.locator('[data-testid="login-password"]').fill('wrongpassword');

        // Submit form
        await page.locator('[data-testid="login-submit"]').click();

        // Wait for error message to appear
        const errorDiv = page.locator('#error');
        await expect(errorDiv).toHaveClass(/show/);
        await expect(errorDiv).toContainText('Invalid email or password');
    });

    test('should clear email field when focused and typed', async ({ page }) => {
        const emailInput = page.locator('[data-testid="login-email"]');

        await emailInput.fill('test@example.com');
        await expect(emailInput).toHaveValue('test@example.com');

        await emailInput.clear();
        await expect(emailInput).toHaveValue('');
    });

    test('should clear password field when focused and typed', async ({ page }) => {
        const passwordInput = page.locator('[data-testid="login-password"]');

        await passwordInput.fill('password123');
        await expect(passwordInput).toHaveValue('password123');

        await passwordInput.clear();
        await expect(passwordInput).toHaveValue('');
    });

    test('should require email field', async ({ page }) => {
        const emailInput = page.locator('[data-testid="login-email"]');
        await expect(emailInput).toHaveAttribute('required', '');
    });

    test('should require password field', async ({ page }) => {
        const passwordInput = page.locator('[data-testid="login-password"]');
        await expect(passwordInput).toHaveAttribute('required', '');
    });

    test('should have email input type', async ({ page }) => {
        const emailInput = page.locator('[data-testid="login-email"]');
        await expect(emailInput).toHaveAttribute('type', 'email');
    });

    test('should have password input type', async ({ page }) => {
        const passwordInput = page.locator('[data-testid="login-password"]');
        await expect(passwordInput).toHaveAttribute('type', 'password');
    });
});
