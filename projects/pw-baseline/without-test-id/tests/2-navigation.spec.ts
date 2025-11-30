import { test, expect } from '@playwright/test';

test.describe('Dashboard - Navigation & Logout', () => {
    test.beforeEach(async ({ page }) => {
        // Login first
        await page.goto('/index.html');
        await page.locator('input[type="email"]').fill('user@example.com');
        await page.locator('input[type="password"]').fill('user123');
        await page.locator('button:has-text("Sign In")').click();
        await page.waitForURL(/dashboard\.html/);
    });

    test('should display user name after login', async ({ page }) => {
        // Look for user name in header area - use ID to avoid strict mode with multiple matches
        const userName = page.locator('#userName');
        await expect(userName).toBeVisible();
    });

    test('should display logout button', async ({ page }) => {
        const logoutBtn = page.locator('button:has-text("Logout")');
        await expect(logoutBtn).toBeVisible();
    });

    test('should logout and redirect to login page', async ({ page }) => {
        const logoutBtn = page.locator('button:has-text("Logout")');
        await logoutBtn.click();

        // Verify redirect to login
        await expect(page).toHaveURL(/index\.html/);
    });

    test('should display all tabs', async ({ page }) => {
        await expect(page.locator('button:has-text("Overview")')).toBeVisible();
        await expect(page.locator('button:has-text("Forms")')).toBeVisible();
        await expect(page.locator('button:has-text("Table")')).toBeVisible();
        await expect(page.locator('button:has-text("Components")')).toBeVisible();
        await expect(page.locator('button:has-text("Advanced")')).toBeVisible();
    });

    test('should switch to forms tab', async ({ page }) => {
        const formsTab = page.locator('button:has-text("Forms")');
        await formsTab.click();

        await expect(formsTab).toHaveClass(/active/);
        await expect(page.locator('#profileForm')).toBeVisible();
    });

    test('should switch to table tab', async ({ page }) => {
        const tableTab = page.locator('button:has-text("Table")');
        await tableTab.click();

        await expect(tableTab).toHaveClass(/active/);
        await expect(page.locator('table')).toBeVisible();
    });

    test('should switch to components tab', async ({ page }) => {
        const componentsTab = page.locator('button:has-text("Components")');
        await componentsTab.click();

        await expect(componentsTab).toHaveClass(/active/);
        // Check for modal button (text is "Open Modal", not "Show Modal")
        await expect(page.locator('button:has-text("Open Modal")')).toBeVisible();
    });

    test('should switch to advanced tab', async ({ page }) => {
        const advancedTab = page.locator('button:has-text("Advanced")');
        await advancedTab.click();

        await expect(advancedTab).toHaveClass(/active/);
        // Drag items have class "draggable-item" in advanced tab
        await expect(page.locator('[class*="draggable-item"]').first()).toBeVisible();
    });

    test('should display welcome message with user name', async ({ page }) => {
        const welcomeMsg = page.locator('#welcomeMessage');
        await expect(welcomeMsg).toContainText('Welcome back, Regular User!');
    });
});

test.describe('Dashboard - Overview Tab', () => {
    test.beforeEach(async ({ page }) => {
        // Login and go to dashboard
        await page.goto('/index.html');
        await page.locator('input[type="email"]').fill('user@example.com');
        await page.locator('input[type="password"]').fill('user123');
        await page.locator('button:has-text("Sign In")').click();
        await page.waitForURL(/dashboard\.html/);
    });

    test('should display overview tab as active by default', async ({ page }) => {
        const overviewTab = page.locator('button:has-text("Overview")');
        await expect(overviewTab).toHaveClass(/active/);
    });

    test('should display projects stat card with value 12', async ({ page }) => {
        const statCard = page.locator('[class*="stat-card"]').filter({ hasText: 'Projects' });
        await expect(statCard).toBeVisible();
        await expect(statCard).toContainText('12');
    });

    test('should display tasks stat card with value 48', async ({ page }) => {
        const statCard = page.locator('[class*="stat-card"]').filter({ hasText: 'Tasks' });
        await expect(statCard).toBeVisible();
        await expect(statCard).toContainText('48');
    });

    test('should display completed stat card with value 89%', async ({ page }) => {
        const statCard = page.locator('[class*="stat-card"]').filter({ hasText: 'Completed' });
        await expect(statCard).toBeVisible();
        await expect(statCard).toContainText('89%');
    });

    test('should display team members stat card with value 8', async ({ page }) => {
        const statCard = page.locator('[class*="stat-card"]').filter({ hasText: 'Team Members' });
        await expect(statCard).toBeVisible();
        await expect(statCard).toContainText('8');
    });
});
