import { test, expect } from '@playwright/test';

test.describe('Dashboard - Table Tab', () => {
    test.beforeEach(async ({ page }) => {
        // Login and navigate to table tab
        await page.goto('/index.html');
        await page.locator('[data-testid="login-email"]').fill('user@example.com');
        await page.locator('[data-testid="login-password"]').fill('user123');
        await page.locator('[data-testid="login-submit"]').click();
        await page.waitForURL(/dashboard\.html/);

        // Click table tab
        await page.locator('[data-testid="tab-table"]').click();
    });

    test('should display tasks table', async ({ page }) => {
        const table = page.locator('[data-testid="tasks-table"]');
        await expect(table).toBeVisible();
    });

    test('should display search box', async ({ page }) => {
        const searchBox = page.locator('[data-testid="search-tasks"]');
        await expect(searchBox).toBeVisible();
        await expect(searchBox).toHaveAttribute('placeholder', 'Search tasks...');
    });

    test('should display table headers', async ({ page }) => {
        await expect(page.locator('[data-testid="sort-id"]')).toBeVisible();
        await expect(page.locator('[data-testid="sort-task"]')).toBeVisible();
        await expect(page.locator('[data-testid="sort-assignee"]')).toBeVisible();
        await expect(page.locator('[data-testid="sort-status"]')).toBeVisible();
    });

    test('should display task rows', async ({ page }) => {
        // Should have at least 8 task rows
        const rows = page.locator('[data-testid^="task-row-"]');
        const count = await rows.count();
        expect(count).toBeGreaterThanOrEqual(8);
    });

    test('should display status badges', async ({ page }) => {
        await expect(page.locator('[data-testid="status-1"]')).toBeVisible();
        const statusText = await page.locator('[data-testid="status-1"]').textContent();
        expect(['active', 'completed', 'pending'].includes(statusText!.trim())).toBeTruthy();
    });

    test('should display edit button for each row', async ({ page }) => {
        await expect(page.locator('[data-testid="btn-edit-1"]')).toBeVisible();
        await expect(page.locator('[data-testid="btn-edit-2"]')).toBeVisible();
        await expect(page.locator('[data-testid="btn-edit-3"]')).toBeVisible();
    });

    test('should display delete button for each row', async ({ page }) => {
        await expect(page.locator('[data-testid="btn-delete-1"]')).toBeVisible();
        await expect(page.locator('[data-testid="btn-delete-2"]')).toBeVisible();
        await expect(page.locator('[data-testid="btn-delete-3"]')).toBeVisible();
    });

    test('should filter tasks by search query', async ({ page }) => {
        const searchBox = page.locator('[data-testid="search-tasks"]');

        // Search for "login"
        await searchBox.fill('login');

        // Wait for table to update
        await page.waitForTimeout(300);

        // Should show task containing "login"
        const rows = page.locator('[data-testid^="task-row-"]');
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should show all tasks when search is cleared', async ({ page }) => {
        const searchBox = page.locator('[data-testid="search-tasks"]');

        // Search for something
        await searchBox.fill('login');
        await page.waitForTimeout(300);

        // Clear search
        await searchBox.clear();
        await page.waitForTimeout(300);

        // Should show all tasks again (8 rows)
        const rows = page.locator('[data-testid^="task-row-"]');
        const count = await rows.count();
        expect(count).toBeGreaterThanOrEqual(8);
    });

    test('should sort by ID ascending', async ({ page }) => {
        const sortIdBtn = page.locator('[data-testid="sort-id"]');

        // Click to sort
        await sortIdBtn.click();
        await page.waitForTimeout(300);

        // Should have sort indicator
        await expect(sortIdBtn).toHaveClass(/sort-asc/);
    });

    test('should sort by ID descending', async ({ page }) => {
        const sortIdBtn = page.locator('[data-testid="sort-id"]');

        // Click twice to sort descending
        await sortIdBtn.click();
        await page.waitForTimeout(300);
        await sortIdBtn.click();
        await page.waitForTimeout(300);

        // Should have desc sort indicator
        await expect(sortIdBtn).toHaveClass(/sort-desc/);
    });

    test('should sort by task name', async ({ page }) => {
        const sortTaskBtn = page.locator('[data-testid="sort-task"]');

        // Click to sort
        await sortTaskBtn.click();
        await page.waitForTimeout(300);

        // Should have sort indicator
        await expect(sortTaskBtn).toHaveClass(/sort-asc/);
    });

    test('should sort by assignee', async ({ page }) => {
        const sortAssigneeBtn = page.locator('[data-testid="sort-assignee"]');

        // Click to sort
        await sortAssigneeBtn.click();
        await page.waitForTimeout(300);

        // Should have sort indicator
        await expect(sortAssigneeBtn).toHaveClass(/sort-asc/);
    });

    test('should sort by status', async ({ page }) => {
        const sortStatusBtn = page.locator('[data-testid="sort-status"]');

        // Click to sort
        await sortStatusBtn.click();
        await page.waitForTimeout(300);

        // Should have sort indicator
        await expect(sortStatusBtn).toHaveClass(/sort-asc/);
    });

    test('should show edit toast when edit button clicked', async ({ page }) => {
        const editBtn = page.locator('[data-testid="btn-edit-1"]');
        await editBtn.click();

        // Check for info toast
        await expect(page.locator('[data-testid="toast-info"]')).toBeVisible();
        await expect(page.locator('[data-testid="toast-info"]')).toContainText('Editing task');
    });

    test('should show delete toast when delete button clicked', async ({ page }) => {
        const deleteBtn = page.locator('[data-testid="btn-delete-1"]');
        await deleteBtn.click();

        // Check for error toast (delete shows as error)
        await expect(page.locator('[data-testid="toast-error"]')).toBeVisible();
        await expect(page.locator('[data-testid="toast-error"]')).toContainText('Deleted task');
    });

    test('should close toast when close button clicked', async ({ page }) => {
        const editBtn = page.locator('[data-testid="btn-edit-1"]');
        await editBtn.click();

        // Wait for toast to appear
        const toast = page.locator('[data-testid="toast-info"]');
        await expect(toast).toBeVisible();

        // Click close button
        await toast.locator('[data-testid="toast-close"]').click();

        // Toast should disappear
        await expect(toast).not.toBeVisible();
    });

    test('should search tasks by assignee', async ({ page }) => {
        const searchBox = page.locator('[data-testid="search-tasks"]');

        // Search for "John Doe"
        await searchBox.fill('John Doe');
        await page.waitForTimeout(300);

        // Should show matching tasks
        const rows = page.locator('[data-testid^="task-row-"]');
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should search tasks by status', async ({ page }) => {
        const searchBox = page.locator('[data-testid="search-tasks"]');

        // Search for "active"
        await searchBox.fill('active');
        await page.waitForTimeout(300);

        // Should show matching tasks
        const rows = page.locator('[data-testid^="task-row-"]');
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should show no results message on empty search', async ({ page }) => {
        const searchBox = page.locator('[data-testid="search-tasks"]');

        // Search for non-existent text
        await searchBox.fill('xxxnonexistent123xxx');
        await page.waitForTimeout(300);

        // Should show no rows
        const rows = page.locator('[data-testid^="task-row-"]');
        const count = await rows.count();
        expect(count).toBe(0);
    });
});
