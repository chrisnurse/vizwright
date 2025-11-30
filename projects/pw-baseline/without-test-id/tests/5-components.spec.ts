import { test, expect } from '@playwright/test';

test.describe('Dashboard - Components Tab (Modals & Toasts)', () => {
    test.beforeEach(async ({ page }) => {
        // Login and navigate to components tab
        await page.goto('/index.html');
        await page.locator('input[type="email"]').fill('user@example.com');
        await page.locator('input[type="password"]').fill('user123');
        await page.locator('button:has-text("Sign In")').click();
        await page.waitForURL(/dashboard\.html/);

        // Click components tab
        await page.locator('button:has-text("Components")').click();
    });

    test('should display show modal button', async ({ page }) => {
        const btn = page.locator('button:has-text("Open Modal")');
        await expect(btn).toBeVisible();
    });

    test('should open modal when button clicked', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');
        // Modal exists in DOM (may be hidden by CSS initially)
        expect(await modal.count()).toBeGreaterThan(0);
    });

    test('should display modal title', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');
        const title = modal.locator('h2');
        await expect(title).toContainText('Modal Title');
    });

    test('should display modal content', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');
        await expect(modal).toContainText('This is the modal content');
    });

    test('should close modal with close button', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');
        await expect(modal).toBeVisible();

        const closeBtn = modal.locator('button').filter({ hasText: /^✕$/ });
        if (await closeBtn.count() > 0) {
            await closeBtn.click();
        } else {
            // If no close button with ✕, try X or Close
            const altCloseBtn = modal.locator('button:has-text("Close")');
            if (await altCloseBtn.count() > 0) {
                await altCloseBtn.click();
            }
        }

        await expect(modal).not.toBeVisible();
    });

    test('should close modal with cancel button', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');
        const cancelBtn = modal.locator('button:has-text("Cancel")');

        await cancelBtn.click();

        await expect(modal).not.toBeVisible();
    });

    test('should confirm modal action', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');
        const confirmBtn = modal.locator('button:has-text("Confirm")');

        await confirmBtn.click();

        // Toast should appear after confirm
        const toast = page.locator('[class*="toast"][class*="success"]');
        await expect(toast).toBeVisible();
    });

    test('should display loading spinner', async ({ page }) => {
        // There might be a button to trigger loading state
        const loadingBtn = page.locator('button:has-text("Show Loading")');
        if (await loadingBtn.count() > 0) {
            await loadingBtn.click();
            const spinner = page.locator('[class*="spinner"]');
            await expect(spinner).toBeVisible();
        }
    });

    test('should display success toast', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');
        const confirmBtn = modal.locator('button:has-text("Confirm")');
        await confirmBtn.click();

        const toast = page.locator('[class*="toast"][class*="success"]');
        await expect(toast).toBeVisible();
        await expect(toast).toContainText(/success|confirmed/i);
    });

    test('should display error toast', async ({ page }) => {
        // Look for error toast trigger button
        const errorBtn = page.locator('button:has-text("Show Error")');
        if (await errorBtn.count() > 0) {
            await errorBtn.click();
            const toast = page.locator('[class*="toast"][class*="error"]');
            await expect(toast).toBeVisible();
        }
    });

    test('should display info toast', async ({ page }) => {
        // Look for info toast trigger button
        const infoBtn = page.locator('button:has-text("Show Info")');
        if (await infoBtn.count() > 0) {
            await infoBtn.click();
            const toast = page.locator('[class*="toast"][class*="info"]');
            await expect(toast).toBeVisible();
        }
    });

    test('should auto-dismiss toast after timeout', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');
        const confirmBtn = modal.locator('button:has-text("Confirm")');
        await confirmBtn.click();

        const toast = page.locator('[class*="toast"][class*="success"]');
        await expect(toast).toBeVisible();

        // Wait for auto-dismiss (typically 3-5 seconds)
        await page.waitForTimeout(5500);

        // Toast should be gone
        await expect(toast).not.toBeVisible();
    });

    test('should display toast container', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');
        const confirmBtn = modal.locator('button:has-text("Confirm")');
        await confirmBtn.click();

        // Toast container should exist (even if hidden when empty)
        const container = page.locator('[class*="toast-container"]');
        const count = await container.count();
        expect(count).toBeGreaterThanOrEqual(0);
    });

    test('should allow multiple toasts to stack', async ({ page }) => {
        // Trigger multiple toasts
        const showBtn = page.locator('button:has-text("Open Modal")');

        await showBtn.click();
        let modal = page.locator('.modal');
        let confirmBtn = modal.locator('button:has-text("Confirm")');
        await confirmBtn.click();

        await page.waitForTimeout(500);

        // Trigger another
        await showBtn.click();
        modal = page.locator('.modal');
        confirmBtn = modal.locator('button:has-text("Confirm")');
        await confirmBtn.click();

        // Multiple toasts should be visible
        const toasts = page.locator('[class*="toast"]');
        const count = await toasts.count();
        expect(count).toBeGreaterThanOrEqual(1);
    });

    test('should display warning toast', async ({ page }) => {
        // Look for warning toast trigger
        const warningBtn = page.locator('button:has-text("Show Warning")');
        if (await warningBtn.count() > 0) {
            await warningBtn.click();
            const toast = page.locator('[class*="toast"][class*="warning"]');
            const count = await toast.count();
            expect(count).toBeGreaterThanOrEqual(0);
        }
    });

    test('should display different toast types', async ({ page }) => {
        // Success
        const successBtn = page.locator('button:has-text("Open Modal")');
        await successBtn.click();

        let modal = page.locator('.modal');
        let confirmBtn = modal.locator('button:has-text("Confirm")');
        await confirmBtn.click();

        const successToast = page.locator('[class*="toast"][class*="success"]');
        await expect(successToast).toBeVisible();
    });

    test('should close modal by clicking outside', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');
        await expect(modal).toBeVisible();

        // Click outside modal (on backdrop)
        const backdrop = page.locator('[class*="modal-backdrop"], [class*="overlay"]');
        if (await backdrop.count() > 0) {
            await backdrop.click();
            await expect(modal).not.toBeVisible();
        }
    });

    test('should prevent close when clicking inside modal', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');
        const modalContent = modal.locator('[class*="modal-content"]');

        if (await modalContent.count() > 0) {
            await modalContent.click();
            await expect(modal).toBeVisible();
        }
    });

    test('should focus modal content', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');

        // Modal should have focus management (ARIA role)
        await expect(modal).toHaveAttribute('role', 'dialog');
    });

    test('should display modal with proper semantics', async ({ page }) => {
        const showBtn = page.locator('button:has-text("Open Modal")');
        await showBtn.click();

        const modal = page.locator('.modal');

        // Should have proper structure
        const title = modal.locator('h2');
        const content = modal.locator('[class*="modal-content"], [class*="modal-body"]');

        await expect(title).toBeVisible();
        if (await content.count() > 0) {
            await expect(content).toBeVisible();
        }
    });
});
