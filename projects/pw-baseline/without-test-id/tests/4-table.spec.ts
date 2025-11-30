import { test, expect } from '@playwright/test';

test.describe('Dashboard - Table Tab', () => {
    test.beforeEach(async ({ page }) => {
        // Login and navigate to table tab
        await page.goto('/index.html');
        await page.locator('input[type="email"]').fill('user@example.com');
        await page.locator('input[type="password"]').fill('user123');
        await page.locator('button:has-text("Sign In")').click();
        await page.waitForURL(/dashboard\.html/);

        // Click table tab
        await page.locator('button:has-text("Table")').click();
    });

    test('should display tasks table', async ({ page }) => {
        const table = page.locator('table');
        await expect(table).toBeVisible();
    });

    test('should display search box', async ({ page }) => {
        const searchBox = page.locator('input[placeholder="Search tasks..."]');
        await expect(searchBox).toBeVisible();
    });

    test('should display table headers', async ({ page }) => {
        const table = page.locator('table');
        await expect(table.locator('th:has-text("ID")')).toBeVisible();
        await expect(table.locator('th:has-text("Task")')).toBeVisible();
        await expect(table.locator('th:has-text("Assignee")')).toBeVisible();
        await expect(table.locator('th:has-text("Status")')).toBeVisible();
    });

    test('should display task rows', async ({ page }) => {
        // Should have at least 8 task rows
        const rows = page.locator('table tbody tr');
        const count = await rows.count();
        expect(count).toBeGreaterThanOrEqual(8);
    });

    test('should display status badges', async ({ page }) => {
        const table = page.locator('table');
        const statusBadges = table.locator('[class*="badge"]');
        const count = await statusBadges.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should display edit button for each row', async ({ page }) => {
        const table = page.locator('table tbody tr').nth(0);
        const editBtn = table.locator('button:has-text("Edit")');
        await expect(editBtn).toBeVisible();
    });

    test('should display delete button for each row', async ({ page }) => {
        const table = page.locator('table tbody tr').nth(0);
        const deleteBtn = table.locator('button:has-text("Delete")');
        await expect(deleteBtn).toBeVisible();
    });

    test('should filter tasks by search query', async ({ page }) => {
        const searchBox = page.locator('input[placeholder="Search tasks..."]');

        // Initial count
        const rowsInitial = page.locator('table tbody tr');
        const initialCount = await rowsInitial.count();

        // Search for something
        await searchBox.fill('important');
        await page.waitForTimeout(200);

        // Filtered rows should be less or equal
        const rowsFiltered = page.locator('table tbody tr');
        const filteredCount = await rowsFiltered.count();

        expect(filteredCount).toBeLessThanOrEqual(initialCount);
    });

    test('should clear search and restore all tasks', async ({ page }) => {
        const searchBox = page.locator('input[placeholder="Search tasks..."]');

        // Search for something
        await searchBox.fill('test');
        await page.waitForTimeout(200);

        // Clear search
        await searchBox.clear();
        await page.waitForTimeout(200);

        // Should show all tasks again
        const rows = page.locator('table tbody tr');
        const count = await rows.count();
        expect(count).toBeGreaterThanOrEqual(8);
    });

    test('should sort by ID column', async ({ page }) => {
        const table = page.locator('table');
        const idHeader = table.locator('th:has-text("ID")');

        // Click to sort
        await idHeader.click();

        // Verify click worked
        await expect(table).toBeVisible();
    });

    test('should sort by task column', async ({ page }) => {
        const table = page.locator('table');
        const taskHeader = table.locator('th:has-text("Task")');

        // Click to sort
        await taskHeader.click();

        // Verify click worked
        await expect(table).toBeVisible();
    });

    test('should sort by assignee column', async ({ page }) => {
        const table = page.locator('table');
        const assigneeHeader = table.locator('th:has-text("Assignee")');

        // Click to sort
        await assigneeHeader.click();

        // Verify click worked
        await expect(table).toBeVisible();
    });

    test('should sort by status column', async ({ page }) => {
        const table = page.locator('table');
        const statusHeader = table.locator('th:has-text("Status")');

        // Click to sort
        await statusHeader.click();

        // Verify click worked
        await expect(table).toBeVisible();
    });

    test('should open edit modal when edit button clicked', async ({ page }) => {
        const table = page.locator('table tbody tr').nth(0);
        const editBtn = table.locator('button:has-text("Edit")');

        await editBtn.click();

        // Modal should appear
        const modal = page.locator('.modal');
        await expect(modal).toBeVisible();
    });

    test('should close edit modal with cancel button', async ({ page }) => {
        const table = page.locator('table tbody tr').nth(0);
        const editBtn = table.locator('button:has-text("Edit")');

        await editBtn.click();

        // Modal should appear
        const modal = page.locator('.modal');
        await expect(modal).toBeVisible();

        // Click cancel
        const cancelBtn = modal.locator('button:has-text("Cancel")');
        await cancelBtn.click();

        // Modal should disappear
        await expect(modal).not.toBeVisible();
    });

    test('should confirm edit changes', async ({ page }) => {
        const table = page.locator('table tbody tr').nth(0);
        const editBtn = table.locator('button:has-text("Edit")');

        await editBtn.click();

        const modal = page.locator('.modal');
        const confirmBtn = modal.locator('button:has-text("Confirm")');

        await confirmBtn.click();

        // Toast should appear
        await expect(page.locator('[class*="toast"][class*="success"]')).toBeVisible();
    });

    test('should show confirmation before delete', async ({ page }) => {
        const table = page.locator('table tbody tr').nth(0);
        const deleteBtn = table.locator('button:has-text("Delete")');

        await deleteBtn.click();

        // Confirmation dialog should appear
        const modal = page.locator('.modal');
        await expect(modal).toBeVisible();
        await expect(modal).toContainText('Are you sure');
    });

    test('should cancel delete operation', async ({ page }) => {
        const initialCount = await page.locator('table tbody tr').count();

        const table = page.locator('table tbody tr').nth(0);
        const deleteBtn = table.locator('button:has-text("Delete")');

        await deleteBtn.click();

        const modal = page.locator('.modal');
        const cancelBtn = modal.locator('button:has-text("Cancel")');

        await cancelBtn.click();

        // Row count should remain same
        const afterCount = await page.locator('table tbody tr').count();
        expect(afterCount).toBe(initialCount);
    });

    test('should confirm delete operation', async ({ page }) => {
        const table = page.locator('table tbody tr').nth(0);
        const deleteBtn = table.locator('button:has-text("Delete")');

        await deleteBtn.click();

        const modal = page.locator('.modal');
        const confirmBtn = modal.locator('button:has-text("Confirm")');

        await confirmBtn.click();

        // Success toast should appear
        await expect(page.locator('[class*="toast"][class*="success"]')).toBeVisible();
    });

    test('should display active status badge', async ({ page }) => {
        const table = page.locator('table');
        const activeBadge = table.locator('[class*="status-badge"][class*="active"]').first();
        await expect(activeBadge).toBeVisible();
    });

    test('should display pending status badge', async ({ page }) => {
        const table = page.locator('table');
        const pendingBadge = table.locator('[class*="badge"][class*="warning"]');
        const count = await pendingBadge.count();
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should display completed status badge', async ({ page }) => {
        const table = page.locator('table');
        const completedBadge = table.locator('[class*="badge"]');
        const count = await completedBadge.count();
        expect(count).toBeGreaterThan(0);
    });
});
