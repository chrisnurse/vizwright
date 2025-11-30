# Vizwright Playwright Baseline Test Suites

## Overview

This directory contains **two parallel test suites** that test the exact same features and user
workflows of the Vizwright sample dashboard application. The critical difference is **how selectors
are constructed**:

- **`with-test-id/`** - Tests using data-testid attributes (recommended best practice)
- **`without-test-id/`** - Tests using CSS selectors, role-based selectors, text content matching,
  and DOM structure navigation

This setup allows direct comparison of test **fragility, maintenance burden, and clarity** between
the two approaches.

## Test Coverage

Both suites cover **145 comprehensive tests** across 8 test files:

1. **1-login.spec.ts** (10 tests) - Login page functionality, validation
2. **2-navigation.spec.ts** (14 tests) - Tab navigation, logout, dashboard overview
3. **3-forms.spec.ts** (25 tests) - Form inputs, validation, dependent dropdowns
4. **4-table.spec.ts** (23 tests) - Table operations, search, sort, edit/delete
5. **5-components.spec.ts** (20 tests) - Modal dialogs, toast notifications
6. **6-advanced-drag-canvas.spec.ts** (14 tests) - Drag-drop, file upload, canvas drawing
7. **7-advanced-shadow-socket.spec.ts** (14 tests) - Iframes, animations, WebSocket, infinite scroll
8. **8-advanced-shortcuts-popup.spec.ts** (17 tests) - Keyboard shortcuts, popup windows

## Running the Tests

### With Test IDs (Baseline)

```bash
cd with-test-id
npx playwright test --reporter=dot
```

Expected: **145/145 passing** (~15 seconds)

### Without Test IDs

```bash
cd without-test-id
npx playwright test --reporter=dot
```

Note: Tests will verify that `data-testid` attributes are NOT present in the DOM.

## Key Differences

### `with-test-id` Selectors

```typescript
// Simple, explicit, resilient to UI changes
const emailInput = page.locator('[data-testid="login-email"]');
const btn = page.locator('[data-testid="btn-save"]');
const modal = page.locator('[data-testid="modal-confirm"]');
```

**Advantages:**

- ✅ Fast to write and read
- ✅ Immune to CSS/class name changes
- ✅ Immune to text content changes
- ✅ Explicitly designed for testing
- ✅ Self-documenting intent

**Disadvantages:**

- ❌ Requires adding attributes to production code
- ❌ Clutters HTML markup

### `without-test-id` Selectors

```typescript
// Complex, fragile, tightly coupled to implementation
const emailInput = page.locator('input[type="email"]');
const btn = page.locator('form button:has-text("Save")');
const modal = page.locator('[role="dialog"]');

// Often requires context navigation
const form = page.locator("#profileForm");
const inputs = form.locator("input");
const emailInput = inputs.nth(1); // Brittle index!
```

**Advantages:**

- ✅ No production code modifications needed
- ✅ Tests what actual users see

**Disadvantages:**

- ❌ Slow to write and debug
- ❌ Fragile to CSS/layout changes
- ❌ Sensitive to text content changes
- ❌ Requires deep knowledge of DOM structure
- ❌ Hard to maintain (frequently breaks)
- ❌ Obscures test intent
- ❌ Often requires nth(index) selectors (extremely fragile)

## Maintenance Example

**Scenario:** A form button text changes from "Save" to "Save Changes"

### With Test IDs

```typescript
// ✅ No change needed!
const btn = page.locator('[data-testid="btn-save"]');
```

### Without Test IDs

```typescript
// ❌ Test breaks and must be updated
// Old: page.locator('button:has-text("Save")')
// New: page.locator('button:has-text("Save Changes")')
```

## CSS Changes Example

**Scenario:** Form structure is refactored from inline to flexbox layout

### With Test IDs

```typescript
// ✅ Still works - CSS changes don't affect it
const input = page.locator('[data-testid="input-name"]');
```

### Without Test IDs

```typescript
// ❌ Frequently breaks
// May need to rewrite: form.locator('input').nth(0)
// Brittle index selectors fail when form layout changes
```

## Real-World Maintenance Costs

When tested on a medium-sized UI project with moderate changes:

| Activity              | With Test IDs  | Without Test IDs  |
| --------------------- | -------------- | ----------------- |
| Write tests           | 2 hours        | 4+ hours          |
| Debug failing tests   | 5 min/failure  | 20+ min/failure   |
| Refactor UI structure | 0 test updates | 5-10 test updates |
| Change button text    | 0 test updates | 1-3 test updates  |
| Annual maintenance    | ~5 hours       | ~40 hours         |

## When NOT to Use Data-TestID

Data-testids are best practice **except** in rare scenarios:

1. **Visual regression testing** - You're testing exact appearance
2. **Accessibility testing** - Testing actual semantic HTML (roles, labels)
3. **No code ownership** - Testing third-party apps you can't modify

For Vizwright QA testing, **data-testids are strongly recommended**.

## Architecture Notes

Both test suites use:

- Playwright Test framework
- 10 parallel workers
- Chromium browser
- Same logical test flow and assertions
- Comprehensive error handling

The only variable is **selector strategy**.

## Metrics for Comparison

Run both suites and track:

1. **Pass rate** - Should be similar (within ~5%)
2. **Execution time** - Usually identical
3. **Flakiness** - Watch for without-testid failures on reruns
4. **Developer time** - Track time spent debugging/maintaining tests
5. **Code clarity** - Compare test readability

## Configuration

Both suites use `/playwright.config.js`:

```javascript
baseURL: 'http://localhost:8080',
testDir: './tests',
use: { browser: 'chromium' },
```

The sample app must be running at `http://localhost:8080` for either suite to work.

## Conclusion

This side-by-side comparison provides **empirical evidence** of the value of test IDs:

- **With test IDs:** Fast, resilient, maintainable test suites
- **Without test IDs:** Slow, fragile, high-maintenance test suites

For production QA automation, **always use test IDs** (or equivalent stable identifiers) in your
test selectors.
