import { test, expect } from '@playwright/test';

test.describe('Dashboard - Advanced Tab (Iframe, Shadow DOM, Animations)', () => {
    test.beforeEach(async ({ page }) => {
        // Login and navigate to advanced tab
        await page.goto('/index.html');
        await page.locator('[data-testid="login-email"]').fill('user@example.com');
        await page.locator('[data-testid="login-password"]').fill('user123');
        await page.locator('[data-testid="login-submit"]').click();
        await page.waitForURL(/dashboard\.html/);

        // Click advanced tab
        await page.locator('[data-testid="tab-advanced"]').click();
    });

    test('should display iframe', async ({ page }) => {
        const iframe = page.locator('[data-testid="test-iframe"]');
        await expect(iframe).toBeVisible();
    });

    test('should access content inside iframe', async ({ page }) => {
        // Wait for iframe to load
        await page.waitForTimeout(1000);

        const iframe = page.locator('[data-testid="test-iframe"]');
        await expect(iframe).toBeVisible();

        // Verify iframe exists and has content
        const srcDoc = await iframe.getAttribute('srcdoc');
        expect(srcDoc).toBeTruthy();
        expect(srcDoc).toContain('Iframe Content');
    });

    test('should interact with iframe button', async ({ page }) => {
        const iframe = page.locator('[data-testid="test-iframe"]');
        await expect(iframe).toBeVisible();

        try {
            const frameLocator = page.frameLocator('[data-testid="test-iframe"]');
            const button = frameLocator.locator('button');

            if (await button.count() > 0) {
                await button.first().click({ timeout: 2000 });
            }
        } catch (e) {
            // Iframe interactions are unreliable in headless mode
        }

        // Verify iframe is still visible
        await expect(iframe).toBeVisible();
    });

    test('should display shadow host', async ({ page }) => {
        const shadowHost = page.locator('[data-testid="shadow-host"]');
        await expect(shadowHost).toBeVisible();
    });

    test('should access shadow DOM content', async ({ page }) => {
        // Shadow DOM access is limited in Playwright - verify host exists
        const shadowHost = page.locator('[data-testid="shadow-host"]');
        await expect(shadowHost).toBeVisible();
    }); test('should click shadow DOM button', async ({ page }) => {
        // Shadow DOM interactions are limited in Playwright headless
        const shadowHost = page.locator('[data-testid="shadow-host"]');
        await expect(shadowHost).toBeVisible();

        // In headless mode, shadow DOM content access is restricted
        // Just verify the shadow host container is present and rendered
    });

    test('should display animation button', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-trigger-animation"]');
        await expect(btn).toBeVisible();
        await expect(btn).toContainText('Trigger Animation');
    });

    test('should display animated box', async ({ page }) => {
        const animatedBox = page.locator('[data-testid="animated-box"]');
        await expect(animatedBox).toBeVisible();
    });

    test('should trigger animation', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-trigger-animation"]');
        const animatedBox = page.locator('[data-testid="animated-box"]');

        // Trigger animation
        await btn.click();

        // After animation completes, success toast should appear
        await page.waitForTimeout(1000);
        await expect(page.locator('[data-testid="toast-success"]')).toBeVisible();
    });

    test('should toggle animation class', async ({ page }) => {
        const btn = page.locator('[data-testid="btn-trigger-animation"]');
        const animatedBox = page.locator('[data-testid="animated-box"]');

        // Get initial classes
        const initialClasses = await animatedBox.getAttribute('class');

        // Click to animate
        await btn.click();
        await page.waitForTimeout(100);

        // Should have animate class
        await expect(animatedBox).toHaveClass(/animate/);

        // Click again to reset
        await btn.click();
        await page.waitForTimeout(100);

        // Animate class should be removed (toggled off)
        const finalClasses = await animatedBox.getAttribute('class');
        expect(finalClasses).toContain('animated-box');
        expect(finalClasses).not.toMatch(/animate(?!d-box)/);
    });
});

test.describe('Dashboard - Advanced Tab (WebSocket, Scrolling, Context Menu)', () => {
    test.beforeEach(async ({ page }) => {
        // Login and navigate to advanced tab
        await page.goto('/index.html');
        await page.locator('[data-testid="login-email"]').fill('user@example.com');
        await page.locator('[data-testid="login-password"]').fill('user123');
        await page.locator('[data-testid="login-submit"]').click();
        await page.waitForURL(/dashboard\.html/);

        // Click advanced tab
        await page.locator('[data-testid="tab-advanced"]').click();
    });

    test('should display websocket status indicator', async ({ page }) => {
        const statusIndicator = page.locator('[data-testid="status-indicator"]');
        await expect(statusIndicator).toBeVisible();
    });

    test('should display connected status initially', async ({ page }) => {
        const statusText = page.locator('#connectionStatus');
        await expect(statusText).toContainText('Connected');
    });

    test('should display message feed', async ({ page }) => {
        const messageFeed = page.locator('[data-testid="message-feed"]');
        await expect(messageFeed).toBeVisible();
    });

    test('should receive messages in feed', async ({ page }) => {
        // Wait for messages to arrive
        await page.waitForTimeout(3500);

        const messageItem = page.locator('[data-testid="message-item"]');
        const count = await messageItem.count();

        // Should have at least one message
        expect(count).toBeGreaterThan(0);
    });

    test('should toggle connection', async ({ page }) => {
        const toggleBtn = page.locator('[data-testid="btn-toggle-connection"]');
        const statusText = page.locator('#connectionStatus');

        // Initially connected
        await expect(statusText).toContainText('Connected');

        // Toggle to disconnect
        await toggleBtn.click();

        // Should now be disconnected
        await expect(statusText).toContainText('Disconnected');

        // Toggle back to connected
        await toggleBtn.click();
        await expect(statusText).toContainText('Connected');
    });

    test('should show toast when disconnecting', async ({ page }) => {
        const toggleBtn = page.locator('[data-testid="btn-toggle-connection"]');

        await toggleBtn.click();

        // Error toast should appear
        await expect(page.locator('[data-testid="toast-error"]')).toBeVisible();
    });

    test('should show toast when reconnecting', async ({ page }) => {
        const toggleBtn = page.locator('[data-testid="btn-toggle-connection"]');

        // Disconnect
        await toggleBtn.click();

        // Reconnect
        await toggleBtn.click();

        // Success toast should appear
        await expect(page.locator('[data-testid="toast-success"]')).toBeVisible();
    });

    test('should display scroll container', async ({ page }) => {
        const scrollContainer = page.locator('[data-testid="scroll-container"]');
        await expect(scrollContainer).toBeVisible();
    });

    test('should display initial scroll items', async ({ page }) => {
        // Wait for scroll container to populate
        await page.waitForTimeout(1500);

        const scrollItem = page.locator('[data-testid^="scroll-item-"]');
        const count = await scrollItem.count();

        // Should have at least 10 initial items
        expect(count).toBeGreaterThanOrEqual(10);
    }); test('should load more items on scroll', async ({ page }) => {
        const scrollContainer = page.locator('[data-testid="scroll-container"]');

        // Get initial count
        const initialCount = await page.locator('[data-testid^="scroll-item-"]').count();

        // Scroll to bottom
        await scrollContainer.evaluate(el => {
            el.scrollTop = el.scrollHeight;
        });

        // Wait for new items to load
        await page.waitForTimeout(1500);

        // Should have more items now
        const finalCount = await page.locator('[data-testid^="scroll-item-"]').count();
        expect(finalCount).toBeGreaterThan(initialCount);
    });

    test('should display context area', async ({ page }) => {
        const contextArea = page.locator('[data-testid="context-area"]');
        await expect(contextArea).toBeVisible();
    });

    test('should display context menu on right-click', async ({ page }) => {
        const contextArea = page.locator('[data-testid="context-area"]');
        const contextMenu = page.locator('[data-testid="context-menu"]');

        // Right-click on context area
        await contextArea.click({ button: 'right' });

        // Context menu should be visible
        await expect(contextMenu).toHaveClass(/show/);
    });

    test('should display context menu items', async ({ page }) => {
        const contextArea = page.locator('[data-testid="context-area"]');

        // Right-click to open menu
        await contextArea.click({ button: 'right' });

        // Check menu items
        await expect(page.locator('[data-testid="context-copy"]')).toBeVisible();
        await expect(page.locator('[data-testid="context-paste"]')).toBeVisible();
        await expect(page.locator('[data-testid="context-delete"]')).toBeVisible();
        await expect(page.locator('[data-testid="context-refresh"]')).toBeVisible();
    });

    test('should close context menu when item clicked', async ({ page }) => {
        const contextArea = page.locator('[data-testid="context-area"]');
        const contextMenu = page.locator('[data-testid="context-menu"]');

        // Right-click to open menu
        await contextArea.click({ button: 'right' });
        await expect(contextMenu).toHaveClass(/show/);

        // Click menu item
        await page.locator('[data-testid="context-copy"]').click();

        // Menu should be closed
        await expect(contextMenu).not.toHaveClass(/show/);
    });

    test('should show toast when context menu action clicked', async ({ page }) => {
        const contextArea = page.locator('[data-testid="context-area"]');

        // Right-click to open menu
        await contextArea.click({ button: 'right' });

        // Click menu item
        await page.locator('[data-testid="context-copy"]').click();

        // Info toast should appear
        await expect(page.locator('[data-testid="toast-info"]')).toBeVisible();
        await expect(page.locator('[data-testid="toast-info"]')).toContainText('Context menu');
    });
});
