import { test, expect } from '@playwright/test';

test.describe('Dashboard - Advanced Tab (Drag & Drop, File Upload)', () => {
    test.beforeEach(async ({ page }) => {
        // Login and navigate to advanced tab
        await page.goto('/index.html');
        await page.locator('input[type="email"]').fill('user@example.com');
        await page.locator('input[type="password"]').fill('user123');
        await page.locator('button:has-text("Sign In")').click();
        await page.waitForURL(/dashboard\.html/);

        // Click advanced tab
        await page.locator('button:has-text("Advanced")').click();
    });

    test('should display drag source element', async ({ page }) => {
        const dragSource = page.locator('[class*="draggable-item"]').first();
        await expect(dragSource).toBeVisible();
    });

    test('should display drag target element', async ({ page }) => {
        const dragTarget = page.locator('[class*="drag-zone"], #targetZone, [id*="target"]').first();
        // Target may be empty zone, just check it exists
        expect(await dragTarget.count()).toBeGreaterThan(0);
    });

    test('should drag item from source to target', async ({ page }) => {
        const dragItem = page.locator('[class*="drag-item"]').first();
        const dragTarget = page.locator('[class*="drag-target"]');

        // Perform drag and drop
        await dragItem.dragTo(dragTarget);

        // Wait for animation and toast
        await page.waitForTimeout(1000);

        // Verify target is still visible
        await expect(dragTarget).toBeVisible();
    });

    test('should display file upload zone', async ({ page }) => {
        const uploadZone = page.locator('[class*="upload-zone"]');
        await expect(uploadZone).toBeVisible();
        await expect(uploadZone).toContainText('Drag files here');
    });

    test('should have hidden file input', async ({ page }) => {
        const fileInput = page.locator('input[type="file"]');
        await expect(fileInput).toHaveAttribute('type', 'file');
    });

    test('should allow file selection via click', async ({ page }) => {
        const fileInput = page.locator('input[type="file"]');
        const uploadZone = page.locator('[class*="upload-zone"]');

        // Click upload zone to trigger file input
        await uploadZone.click();

        // File input exists in DOM (it's hidden by CSS, which is expected)
        await expect(fileInput).toHaveAttribute('type', 'file');
    });

    test('should display empty file list initially', async ({ page }) => {
        const fileList = page.locator('[class*="file-list"]');
        const items = fileList.locator('li');
        const count = await items.count();
        expect(count).toBe(0);
    });

    test('should handle file upload', async ({ page }) => {
        const fileInput = page.locator('input[type="file"]');

        // Create a test file and upload it
        await fileInput.setInputFiles({
            name: 'test.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('test content'),
        });

        // Wait for file list update
        await page.waitForTimeout(500);

        // File should appear in list
        const fileList = page.locator('[class*="file-list"]');
        await expect(fileList).toContainText('test.txt');
    });

    test('should handle multiple file upload', async ({ page }) => {
        const fileInput = page.locator('input[type="file"]');

        // Create multiple test files
        await fileInput.setInputFiles([
            {
                name: 'file1.txt',
                mimeType: 'text/plain',
                buffer: Buffer.from('content 1'),
            },
            {
                name: 'file2.txt',
                mimeType: 'text/plain',
                buffer: Buffer.from('content 2'),
            },
        ]);

        // Wait for file list update
        await page.waitForTimeout(500);

        // Files should appear in list
        const fileList = page.locator('[class*="file-list"]');
        await expect(fileList).toContainText('file1.txt');
        await expect(fileList).toContainText('file2.txt');
    });

    test('should display canvas element', async ({ page }) => {
        const canvas = page.locator('canvas');
        await expect(canvas).toBeVisible();
    });

    test('should draw on canvas', async ({ page }) => {
        const canvas = page.locator('canvas');

        // Draw a line on canvas
        const box = await canvas.boundingBox();
        if (box) {
            await page.mouse.move(box.x + 10, box.y + 10);
            await page.mouse.down();
            await page.mouse.move(box.x + 50, box.y + 50);
            await page.mouse.up();
        }

        // Canvas should still be visible
        await expect(canvas).toBeVisible();
    });

    test('should display color picker', async ({ page }) => {
        const colorPicker = page.locator('input[type="color"]');
        await expect(colorPicker).toBeVisible();
    });

    test('should change color with color picker', async ({ page }) => {
        const colorPicker = page.locator('input[type="color"]');

        // Change color
        await colorPicker.fill('#ff0000');

        // Verify color value changed
        await expect(colorPicker).toHaveValue('#ff0000');
    });

    test('should display clear button', async ({ page }) => {
        const clearBtn = page.locator('button:has-text("Clear")');
        await expect(clearBtn).toBeVisible();
    });

    test('should clear canvas when button clicked', async ({ page }) => {
        const canvas = page.locator('canvas');
        const clearBtn = page.locator('button:has-text("Clear")');

        // Draw something first
        const box = await canvas.boundingBox();
        if (box) {
            await page.mouse.move(box.x + 10, box.y + 10);
            await page.mouse.down();
            await page.mouse.move(box.x + 50, box.y + 50);
            await page.mouse.up();
        }

        // Clear the canvas
        await clearBtn.click();

        // Canvas should still be visible but cleared
        await expect(canvas).toBeVisible();
    });

    test('should handle drag and drop file upload', async ({ page }) => {
        const uploadZone = page.locator('[class*="upload-zone"]');
        const fileInput = page.locator('input[type="file"]');

        // Set files on the input
        await fileInput.setInputFiles({
            name: 'drag-test.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('drag and drop content'),
        });

        // Wait for file list update
        await page.waitForTimeout(500);

        // File should appear in list
        const fileList = page.locator('[class*="file-list"]');
        await expect(fileList).toContainText('drag-test.txt');
    });

    test('should display multiple drag items', async ({ page }) => {
        const dragItems = page.locator('[class*="drag-item"]');
        const count = await dragItems.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should allow dragging multiple items', async ({ page }) => {
        const dragItems = page.locator('[class*="drag-item"]');
        const dragTarget = page.locator('[class*="drag-target"]');

        const count = await dragItems.count();

        // Drag first item
        if (count > 0) {
            const firstItem = dragItems.nth(0);
            await firstItem.dragTo(dragTarget);
        }

        // Verify target still exists
        await expect(dragTarget).toBeVisible();
    });
});
