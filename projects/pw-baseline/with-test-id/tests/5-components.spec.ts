import { test, expect } from '@playwright/test';

test.describe('Dashboard - Components Tab (Modals & Toasts)', () => {
    test.beforeEach(async ({ page }) => {
        // Login and navigate to components tab
        await page.goto('/index.html');
        await page.locator('[data-testid="login-email"]').fill('user@example.com');
        await page.locator('[data-testid="login-password"]').fill('user123');
        await page.locator('[data-testid="login-submit"]').click();
        await page.waitForURL(/dashboard\.html/);

        // Click components tab
        await page.locator('[data-testid="tab-components"]').click();
    });

    test('should display show modal button', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-modal"]');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Open Modal');
    });

    test('should display show loading button', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-loading"]');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Show Loading');
    });

    test('should display success toast button', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-toast-success"]');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Success Toast');
    });

    test('should display error toast button', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-toast-error"]');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Error Toast');
    });

    test('should display info toast button', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-toast-info"]');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Info Toast');
    });

    test('should open modal when button clicked', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-modal"]');
        await btn.click();

        // Modal overlay should be visible
        const overlay = page.locator('[data-testid="modal-overlay"]');
        await expect(overlay).toHaveClass(/show/);

        // Modal should be visible
        const modal = page.locator('[data-testid="modal"]');
        await expect(modal).toBeVisible();
    });

    test('should display modal with title and message', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-modal"]');
        await btn.click();

        const modal = page.locator('[data-testid="modal"]');
        await expect(modal).toContainText('Confirm Action');
        await expect(modal).toContainText('Are you sure you want to proceed');
    });

    test('should display cancel button in modal', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-modal"]');
        await btn.click();

        const cancelBtn = page.locator('[data-testid="modal-cancel"]');
        await expect(cancelBtn).toBeVisible();
        await expect(cancelBtn).toContainText('Cancel');
    });

    test('should display confirm button in modal', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-modal"]');
        await btn.click();

        const confirmBtn = page.locator('[data-testid="modal-confirm"]');
        await expect(confirmBtn).toBeVisible();
        await expect(confirmBtn).toContainText('Confirm');
    });

    test('should close modal when cancel button clicked', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-modal"]');
        await btn.click();

        const cancelBtn = page.locator('[data-testid="modal-cancel"]');
        await cancelBtn.click();

        // Modal overlay should be hidden
        const overlay = page.locator('[data-testid="modal-overlay"]');
        await expect(overlay).not.toHaveClass(/show/);
    });

    test('should show info toast when modal cancelled', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-modal"]');
        await btn.click();

        const cancelBtn = page.locator('[data-testid="modal-cancel"]');
        await cancelBtn.click();

        // Info toast should appear
        await expect(page.locator('[data-testid="toast-info"]')).toBeVisible();
        await expect(page.locator('[data-testid="toast-info"]')).toContainText('cancelled');
    });

    test('should close modal when confirm button clicked', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-modal"]');
        await btn.click();

        const confirmBtn = page.locator('[data-testid="modal-confirm"]');
        await confirmBtn.click();

        // Modal overlay should be hidden
        const overlay = page.locator('[data-testid="modal-overlay"]');
        await expect(overlay).not.toHaveClass(/show/);
    });

    test('should show success toast when modal confirmed', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-modal"]');
        await btn.click();

        const confirmBtn = page.locator('[data-testid="modal-confirm"]');
        await confirmBtn.click();

        // Success toast should appear
        await expect(page.locator('[data-testid="toast-success"]')).toBeVisible();
        await expect(page.locator('[data-testid="toast-success"]')).toContainText('confirmed');
    });

    test('should close modal when clicking outside', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-modal"]');
        await btn.click();

        // Click outside modal (on the overlay background)
        const overlay = page.locator('[data-testid="modal-overlay"]');
        const modal = page.locator('[data-testid="modal"]');

        // Get modal position and click outside it
        await overlay.click({ position: { x: 10, y: 10 } });

        // Modal overlay should be hidden
        await expect(overlay).not.toHaveClass(/show/);
    });

    test('should show loading overlay when button clicked', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-loading"]');
        await btn.click();

        // Loading overlay should be visible
        const loadingOverlay = page.locator('[data-testid="loading-overlay"]');
        await expect(loadingOverlay).toHaveClass(/show/);
    });

    test('should hide loading overlay after 3 seconds', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-loading"]');
        await btn.click();

        // Wait for loading to complete
        await page.waitForTimeout(3500);

        // Loading overlay should be hidden
        const loadingOverlay = page.locator('[data-testid="loading-overlay"]');
        await expect(loadingOverlay).not.toHaveClass(/show/);
    });

    test('should show success toast after loading completes', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-show-loading"]');
        await btn.click();

        // Wait for loading to complete
        await page.waitForTimeout(3500);

        // Success toast should appear
        await expect(page.locator('[data-testid="toast-success"]')).toBeVisible();
        await expect(page.locator('[data-testid="toast-success"]')).toContainText('Loading complete');
    });

    test('should show success toast when button clicked', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-toast-success"]');
        await btn.click();

        const toast = page.locator('[data-testid="toast-success"]');
        await expect(toast).toBeVisible();
        await expect(toast).toContainText('successfully');
    });

    test('should show error toast when button clicked', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-toast-error"]');
        await btn.click();

        const toast = page.locator('[data-testid="toast-error"]');
        await expect(toast).toBeVisible();
        await expect(toast).toContainText('error');
    });

    test('should show info toast when button clicked', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-toast-info"]');
        await btn.click();

        const toast = page.locator('[data-testid="toast-info"]');
        await expect(toast).toBeVisible();
        await expect(toast).toContainText('informational');
    });

    test('should display toast container', async ({ page }) => {
        const container = page.locator('[data-testid="toast-container"]');
        // Toast container exists but may be hidden (display: none when empty)
        // Verify it exists in DOM
        const count = await container.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should auto-dismiss toast after 5 seconds', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-toast-info"]');
        await btn.click();

        const toast = page.locator('[data-testid="toast-info"]');
        await expect(toast).toBeVisible();

        // Wait for auto-dismiss
        await page.waitForTimeout(5500);

        await expect(toast).not.toBeVisible();
    });

    test('should close toast when close button clicked', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-toast-success"]');
        await btn.click();

        const toast = page.locator('[data-testid="toast-success"]');
        await expect(toast).toBeVisible();

        // Click close button
        await toast.locator('[data-testid="toast-close"]').click();

        await expect(toast).not.toBeVisible();
    });
});
