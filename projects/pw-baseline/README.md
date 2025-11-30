# Vizwright Playwright Baseline Test Suites

## Overview

This directory contains **two parallel Playwright test suites** that test the exact same Vizwright
dashboard application using two fundamentally different selector strategies:

| Approach             | Directory          | Strategy                                                              |
| -------------------- | ------------------ | --------------------------------------------------------------------- |
| **With Test IDs**    | `with-test-id/`    | Uses `data-testid` attributes exclusively                             |
| **Without Test IDs** | `without-test-id/` | Uses semantic selectors, CSS classes, text content, and DOM structure |

Both suites achieve **145 passing tests** covering identical functionality, providing a direct
comparison of maintainability, resilience, and developer experience between the two approaches.

---

## Test Suites

### `with-test-id/` — Data-TestID Approach

Tests use explicit `data-testid` attributes added to HTML elements:

```typescript
// Direct, unambiguous targeting
await page.locator('[data-testid="btn-save-profile"]').click();
await page.locator('[data-testid="login-email"]').fill("user@example.com");
await expect(page.locator('[data-testid="toast-success"]')).toBeVisible();
```

### `without-test-id/` — Semantic Selector Approach

Tests use a combination of strategies to locate elements without test IDs:

```typescript
// Multiple techniques combined
await page.locator('button:has-text("Save Profile")').click();
await page.locator('input[type="email"]').fill("user@example.com");
await expect(page.locator('[class*="toast"][class*="success"]')).toBeVisible();
```

---

## Running the Tests

### Prerequisites

```bash
# Start the sample dashboard server
cd /workspaces/vizwright/sample-apps
./serve.sh dashboard              # WITH data-testid attributes
./serve.sh dashboard --notest     # WITHOUT data-testid attributes (stripped)
```

### Execute Tests

```bash
# With Test IDs
cd projects/pw-baseline/with-test-id
npm install && npm test

# Without Test IDs  
cd projects/pw-baseline/without-test-id
npm install && npm test
```

### Convenience Scripts

```bash
# From projects/ directory
./run-baseline-with-test-id.sh      # Runs with-test-id suite
./run-baseline-without-test-id.sh   # Runs without-test-id suite
```

---

## Test Coverage (Both Suites)

| Test File                            | Area           | Tests   | Functionality                                |
| ------------------------------------ | -------------- | ------- | -------------------------------------------- |
| `1-login.spec.ts`                    | Authentication | 10      | User/admin login, validation, errors         |
| `2-navigation.spec.ts`               | Navigation     | 14      | Tab switching, dashboard state, stat cards   |
| `3-forms.spec.ts`                    | Forms & Inputs | 20      | Text, email, selects, checkboxes, cascading  |
| `4-table.spec.ts`                    | Data Tables    | 22      | Search, sort, edit/delete, modals, badges    |
| `5-components.spec.ts`               | UI Components  | 24      | Modals, loading, toasts, backdrop clicks     |
| `6-advanced-drag-canvas.spec.ts`     | Drag & Canvas  | 20      | Drag-drop, file upload, canvas, color picker |
| `7-advanced-shadow-socket.spec.ts`   | Advanced DOM   | 18      | Iframe, Shadow DOM, WebSocket, context menu  |
| `8-advanced-shortcuts-popup.spec.ts` | Shortcuts      | 17      | Keyboard shortcuts, popups, postMessage      |
| **TOTAL**                            |                | **145** | **All dashboard features**                   |

---

## Code Metrics

### Lines of Code Comparison

| Test File                            | With Test-ID | Without Test-ID | Difference       |
| ------------------------------------ | ------------ | --------------- | ---------------- |
| `1-login.spec.ts`                    | 96           | 103             | +7 (+7%)         |
| `2-navigation.spec.ts`               | 120          | 118             | -2 (-2%)         |
| `3-forms.spec.ts`                    | 207          | 230             | +23 (+11%)       |
| `4-table.spec.ts`                    | 219          | 247             | +28 (+13%)       |
| `5-components.spec.ts`               | 242          | 274             | +32 (+13%)       |
| `6-advanced-drag-canvas.spec.ts`     | 235          | 215             | -20 (-9%)        |
| `7-advanced-shadow-socket.spec.ts`   | 288          | 264             | -24 (-8%)        |
| `8-advanced-shortcuts-popup.spec.ts` | 287          | 351             | +64 (+22%)       |
| **TOTAL**                            | **1,694**    | **1,802**       | **+108 (+6.4%)** |

### Selector Patterns Used

**With Test-ID:**

```typescript
page.locator('[data-testid="exact-identifier"]'); // 100% of selectors
```

**Without Test-ID:**

```typescript
page.locator('button:has-text("Button Text")'); // ~40% - Text content
page.locator('input[type="email"]'); // ~20% - Semantic attributes
page.locator('[class*="partial-class"]'); // ~15% - CSS class patterns
page.locator("table tbody tr").nth(0); // ~10% - DOM structure
page.locator("#elementId"); // ~10% - HTML IDs
page.locator("select#country"); // ~5%  - Combined selectors
```

---

## Comparative Analysis

### Complexity Comparison

| Dimension              | With Test-ID         | Without Test-ID            |
| ---------------------- | -------------------- | -------------------------- |
| **Selector Pattern**   | Single, consistent   | Multiple patterns required |
| **Selector Length**    | Short (avg 35 chars) | Variable (25-80 chars)     |
| **Mental Model**       | "Find the test ID"   | "What makes this unique?"  |
| **Fallback Logic**     | Never needed         | Often required             |
| **Code Volume**        | Baseline             | +6.4% more code            |
| **Conditional Checks** | Rare                 | Common (`if (count > 0)`)  |

### Selector Examples Side-by-Side

| Element      | With Test-ID                       | Without Test-ID                            |
| ------------ | ---------------------------------- | ------------------------------------------ |
| Save Button  | `[data-testid="btn-save-profile"]` | `button:has-text("Save Profile")`          |
| Email Input  | `[data-testid="login-email"]`      | `input[type="email"]`                      |
| Table Row 1  | `[data-testid="task-row-1"]`       | `table tbody tr:nth-child(1)`              |
| Active Badge | `[data-testid="status-active"]`    | `[class*="status-badge"][class*="active"]` |
| Modal Cancel | `[data-testid="modal-cancel"]`     | `.modal button:has-text("Cancel")`         |
| Color Option | `[data-testid="color-red"]`        | `[data-color="#f56565"]`                   |

---

## Deep Analysis: Which Approach is Better?

### 1. Simplicity vs Complexity

| Aspect                 | With Test-ID          | Without Test-ID              | Winner     |
| ---------------------- | --------------------- | ---------------------------- | ---------- |
| **Learning Curve**     | Low — one pattern     | Medium — multiple techniques | ✅ Test-ID |
| **Writing New Tests**  | Fast — copy pattern   | Slower — investigate DOM     | ✅ Test-ID |
| **Reading Tests**      | Clear intent          | Requires DOM knowledge       | ✅ Test-ID |
| **Debugging Failures** | "Element X not found" | "Which of 5 elements?"       | ✅ Test-ID |
| **Selector Stability** | Very stable           | Depends on implementation    | ✅ Test-ID |

**Verdict:** Test-ID approach is **objectively simpler** for test authors.

---

### 2. Best Practice Recommendations

| Scenario                          | Recommended Approach         | Rationale                                   |
| --------------------------------- | ---------------------------- | ------------------------------------------- |
| **New projects (greenfield)**     | ✅ With Test-ID              | Add test-IDs from day one — near-zero cost  |
| **Existing app with no test IDs** | ⚠️ Without Test-ID initially | Add test-IDs incrementally where tests fail |
| **Third-party/vendor apps**       | ✅ Without Test-ID           | Cannot modify source HTML                   |
| **Design system components**      | ✅ With Test-ID              | Build testing into component contracts      |
| **E2E critical paths**            | ✅ With Test-ID              | Maximum stability for CI/CD gates           |
| **Exploratory testing**           | ⚠️ Without Test-ID           | Faster to write disposable tests            |

---

### 3. Risk Analysis

#### Risks of Test-ID Approach

| Risk                              | Severity | Likelihood | Mitigation                      |
| --------------------------------- | -------- | ---------- | ------------------------------- |
| **Test IDs removed accidentally** | High     | Low        | Code review, linting rules      |
| **Test IDs become stale**         | Medium   | Medium     | Include in component contracts  |
| **Over-reliance on test IDs**     | Low      | Medium     | Balance with semantic selectors |
| **HTML bloat**                    | Low      | Low        | Stripped in production builds   |
| **Dev team resistance**           | Medium   | Medium     | Demonstrate maintenance savings |

#### Risks of Without Test-ID Approach

| Risk                          | Severity | Likelihood | Mitigation                        |
| ----------------------------- | -------- | ---------- | --------------------------------- |
| **CSS class renamed**         | High     | High       | Use partial matches `[class*=""]` |
| **Text content changed**      | High     | High       | Internationalization breaks tests |
| **DOM structure changed**     | High     | Medium     | Avoid positional selectors        |
| **Ambiguous selectors**       | Medium   | High       | Add `.first()` or specificity     |
| **Slower test authoring**     | Medium   | High       | Accept as trade-off               |
| **Higher maintenance burden** | High     | High       | Budget more time for test fixes   |

---

### 4. Benefits Analysis

#### Benefits of Test-ID Approach

| Benefit                    | Impact | Evidence from This Project                   |
| -------------------------- | ------ | -------------------------------------------- |
| **Predictable selectors**  | High   | 100% consistent pattern                      |
| **Immune to UI redesign**  | High   | CSS changes don't break tests                |
| **Self-documenting**       | Medium | `data-testid="btn-save-profile"` is readable |
| **Fast test authoring**    | High   | Copy-paste pattern works                     |
| **Low maintenance**        | High   | Rarely need to update selectors              |
| **Clear failure messages** | Medium | "testid not found" is actionable             |

#### Benefits of Without Test-ID Approach

| Benefit                           | Impact | Evidence from This Project         |
| --------------------------------- | ------ | ---------------------------------- |
| **No app modifications**          | High   | Works with any existing app        |
| **Tests verify user perspective** | Medium | Uses same labels users see         |
| **Catches accessibility issues**  | Medium | Semantic selectors expose problems |
| **Works with third-party apps**   | High   | Only option for vendor software    |
| **Forces DOM understanding**      | Low    | Developers learn structure         |
| **No build-time overhead**        | Low    | No test-ID stripping needed        |

---

## Key Insights

### The 6.4% Code Increase is Misleading

The without-test-ID suite has 108 more lines of code, but this understates the true complexity:

1. **Conditional logic** — Many without-test-ID tests include `if (await element.count() > 0)`
   fallbacks
2. **Multiple selector attempts** — Tests try several patterns before finding elements
3. **Position dependencies** — `.nth(0)`, `.first()` calls add fragility
4. **Maintenance debt** — Each UI change may require selector updates

### The Real Cost is Maintenance

During development of the without-test-ID suite:

- **11 tests failed** on first run due to selector mismatches
- Required **browser inspection** to discover actual DOM structure
- Needed **fallback strategies** for elements that varied

The with-test-ID suite achieved **145/145 pass rate on first run** with no debugging.

### When Without-Test-ID Makes Sense

Despite the challenges, the without-test-ID approach is valuable when:

1. **You can't modify the app** — Testing third-party software
2. **Testing legacy systems** — Adding test-IDs requires refactoring
3. **Accessibility validation** — Semantic selectors verify ARIA compliance
4. **Quick prototyping** — Disposable tests don't need stability

---

## Conclusion

| Question                              | Answer                                             |
| ------------------------------------- | -------------------------------------------------- |
| **Which is simpler?**                 | Test-ID — single pattern, no investigation needed  |
| **Which is more stable?**             | Test-ID — immune to CSS/structure changes          |
| **Which requires less maintenance?**  | Test-ID — selectors rarely break                   |
| **Which tests the user perspective?** | Without-Test-ID — uses visible text/labels         |
| **Which works everywhere?**           | Without-Test-ID — no app modifications needed      |
| **Which should you choose?**          | **Test-ID when possible, semantic when necessary** |

### The Golden Rule

> **Add `data-testid` attributes to your applications from day one.**
>
> The ~5 minutes spent adding test IDs during development saves hours of debugging broken selectors
> later. For apps you can't modify, the semantic selector approach is a viable fallback, but expect
> higher maintenance costs.

---

## File Structure

pw-baseline/
├── README.md                         # This document
├── run-baseline-with-test-id.sh
├── run-baseline-without-test-id.sh
├── with-test-id/
│   ├── package.json
│   ├── playwright.config.js
│   ├── README.md
│   ├── QUICK_START.md
│   ├── BASELINE_SUMMARY.md
│   └── tests/
│       ├── 1-login.spec.ts           # 96 lines
│       ├── 2-navigation.spec.ts      # 120 lines
│       ├── 3-forms.spec.ts           # 207 lines
│       ├── 4-table.spec.ts           # 219 lines
│       ├── 5-components.spec.ts      # 242 lines
│       ├── 6-advanced-drag-canvas.spec.ts      # 235 lines
│       ├── 7-advanced-shadow-socket.spec.ts    # 288 lines
│       └── 8-advanced-shortcuts-popup.spec.ts  # 287 lines
└── without-test-id/
    ├── package.json
    ├── playwright.config.js
    └── tests/
        ├── 1-login.spec.ts           # 103 lines (+7%)
        ├── 2-navigation.spec.ts      # 118 lines (-2%)
        ├── 3-forms.spec.ts           # 230 lines (+11%)
        ├── 4-table.spec.ts           # 247 lines (+13%)
        ├── 5-components.spec.ts      # 274 lines (+13%)
        ├── 6-advanced-drag-canvas.spec.ts      # 215 lines (-9%)
        ├── 7-advanced-shadow-socket.spec.ts    # 264 lines (-8%)
        └── 8-advanced-shortcuts-popup.spec.ts  # 351 lines (+22%)

---

_Generated from comparative analysis of both test suites. All 145 tests pass in both approaches._
