import { test, expect } from '@playwright/test';

test.describe('Dashboard - Navigation & Logout', () => {
    test.beforeEach(async ({ page }) => {
        // Login first
        await page.goto('/index.html');
        await page.locator('[data-testid="login-email"]').fill('user@example.com');
        await page.locator('[data-testid="login-password"]').fill('user123');
        await page.locator('[data-testid="login-submit"]').click();
        await page.waitForURL(/dashboard\.html/);
    });

    test('should display user name after login', async ({ page }) => {
        const userName = page.locator('[data-testid="user-name"]');
        await expect(userName).toContainText('Regular User');
    });

    test('should display logout button', async ({ page }) => {
        const logoutBtn = page.locator('[data-testid="logout-button"]');
        await expect(logoutBtn).toBeVisible();
        await expect(logoutBtn).toContainText('Logout');
    });

    test('should logout and redirect to login page', async ({ page }) => {
        const logoutBtn = page.locator('[data-testid="logout-button"]');
        await logoutBtn.click();

        // Verify redirect to login
        await expect(page).toHaveURL(/index\.html/);
    });

    test('should display all tabs', async ({ page }) => {
        await expect(page.locator('[data-testid="tab-overview"]')).toBeVisible();
        await expect(page.locator('[data-testid="tab-forms"]')).toBeVisible();
        await expect(page.locator('[data-testid="tab-table"]')).toBeVisible();
        await expect(page.locator('[data-testid="tab-components"]')).toBeVisible();
        await expect(page.locator('[data-testid="tab-advanced"]')).toBeVisible();
    });

    test('should switch to forms tab', async ({ page }) => {
        const formsTab = page.locator('[data-testid="tab-forms"]');
        await formsTab.click();

        await expect(formsTab).toHaveClass(/active/);
        await expect(page.locator('#profileForm')).toBeVisible();
    });

    test('should switch to table tab', async ({ page }) => {
        const tableTab = page.locator('[data-testid="tab-table"]');
        await tableTab.click();

        await expect(tableTab).toHaveClass(/active/);
        await expect(page.locator('[data-testid="tasks-table"]')).toBeVisible();
    });

    test('should switch to components tab', async ({ page }) => {
        const componentsTab = page.locator('[data-testid="tab-components"]');
        await componentsTab.click();

        await expect(componentsTab).toHaveClass(/active/);
        await expect(page.locator('[data-testid="btn-show-modal"]')).toBeVisible();
    });

    test('should switch to advanced tab', async ({ page }) => {
        const advancedTab = page.locator('[data-testid="tab-advanced"]');
        await advancedTab.click();

        await expect(advancedTab).toHaveClass(/active/);
        await expect(page.locator('[data-testid="drag-source"]')).toBeVisible();
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
        await page.locator('[data-testid="login-email"]').fill('user@example.com');
        await page.locator('[data-testid="login-password"]').fill('user123');
        await page.locator('[data-testid="login-submit"]').click();
        await page.waitForURL(/dashboard\.html/);
    });

    test('should display overview tab as active by default', async ({ page }) => {
        const overviewTab = page.locator('[data-testid="tab-overview"]');
        await expect(overviewTab).toHaveClass(/active/);
    });

    test('should display projects stat card with value 12', async ({ page }) => {
        const statCard = page.locator('[data-testid="stat-projects"]');
        await expect(statCard).toBeVisible();
        await expect(statCard).toContainText('Projects');
        await expect(statCard).toContainText('12');
    });

    test('should display tasks stat card with value 48', async ({ page }) => {
        const statCard = page.locator('[data-testid="stat-tasks"]');
        await expect(statCard).toBeVisible();
        await expect(statCard).toContainText('Tasks');
        await expect(statCard).toContainText('48');
    });

    test('should display completed stat card with value 89%', async ({ page }) => {
        const statCard = page.locator('[data-testid="stat-completed"]');
        await expect(statCard).toBeVisible();
        await expect(statCard).toContainText('Completed');
        await expect(statCard).toContainText('89%');
    });

    test('should display team members stat card with value 8', async ({ page }) => {
        const statCard = page.locator('[data-testid="stat-team"]');
        await expect(statCard).toBeVisible();
        await expect(statCard).toContainText('Team Members');
        await expect(statCard).toContainText('8');
    });
});
