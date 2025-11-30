# Dashboard Sample App - Quick Reference

A comprehensive testing playground with **117+ test scenarios** organized by interaction type.

**Start:** `./serve.sh dashboard` → `http://localhost:8080`\
**Credentials:** `user@example.com / user123` or `admin@example.com / admin123`

---

## Test Scenarios by Interaction Type

| Interaction Type  | Count | Examples                                            | Complexity   | Location            |
| ----------------- | ----- | --------------------------------------------------- | ------------ | ------------------- |
| **Click**         | 25+   | Buttons, tabs, table actions, logout                | Basic        | All tabs            |
| **Type**          | 15+   | Text inputs, email, password, textarea, search      | Basic        | Login, Forms, Table |
| **Select**        | 8+    | Dropdowns (role, department, country, city)         | Basic        | Forms, Components   |
| **Check/Uncheck** | 4+    | Checkboxes (remember me, notifications, newsletter) | Basic        | Login, Forms        |
| **Drag & Drop**   | 6+    | Move items between zones, file upload               | Advanced     | Advanced tab        |
| **Right-click**   | 7+    | Context menu (copy, paste, delete, refresh)         | Advanced     | Advanced tab        |
| **Hover**         | 5+    | Table rows, buttons, drag items                     | Intermediate | Table, Advanced     |
| **Scroll**        | 6+    | Infinite scroll, lazy loading                       | Advanced     | Advanced tab        |
| **Draw**          | 8+    | Canvas with color picker                            | Advanced     | Advanced tab        |
| **File Upload**   | 7+    | Drag-and-drop files, browse button                  | Advanced     | Advanced tab        |
| **Keyboard**      | 6+    | Shortcuts (Ctrl+S, Ctrl+N, Ctrl+F, Ctrl+D)          | Advanced     | Advanced tab        |
| **Modal**         | 5+    | Open, confirm, cancel, click outside                | Intermediate | Components tab      |
| **Toast**         | 6+    | Success, error, info notifications                  | Intermediate | All tabs            |
| **Multi-window**  | 7+    | Popup window, postMessage                           | Advanced     | Advanced tab        |
| **Iframe**        | 4+    | Cross-frame interactions                            | Advanced     | Advanced tab        |
| **Shadow DOM**    | 4+    | Encapsulated component                              | Advanced     | Advanced tab        |
| **Animation**     | 5+    | Trigger, wait for completion                        | Advanced     | Advanced tab        |
| **WebSocket**     | 7+    | Connect/disconnect, real-time messages              | Advanced     | Advanced tab        |

---

## By User Intent

| User Intent        | Test Scenario         | Tab              | Selector                                                           |
| ------------------ | --------------------- | ---------------- | ------------------------------------------------------------------ |
| **Login**          | Valid user login      | Login            | `[data-testid="email-input"]` → `[data-testid="login-button"]`     |
| **Login**          | Invalid credentials   | Login            | `[data-testid="login-button"]` → error message appears             |
| **Navigate**       | Switch between tabs   | All              | `[data-testid="tab-overview"]` ... `[data-testid="tab-advanced"]`  |
| **View Data**      | Check statistics      | Overview         | `[data-testid="stat-projects"]` shows "12"                         |
| **Fill Form**      | Complete profile form | Forms            | All form inputs → `[data-testid="btn-save-profile"]`               |
| **Validate**       | Dependent dropdowns   | Forms/Components | Select country → city dropdown enables                             |
| **Search**         | Filter table data     | Table            | `[data-testid="search-tasks"]` → matching rows shown               |
| **Sort**           | Sort table columns    | Table            | `[data-testid="sort-id"]` → ascending/descending                   |
| **Edit**           | Edit table row        | Table            | `[data-testid="btn-edit-1"]` → toast appears                       |
| **Delete**         | Delete table row      | Table            | `[data-testid="btn-delete-1"]` → toast appears                     |
| **Confirm**        | Modal confirmation    | Components       | `[data-testid="btn-show-modal"]` → `[data-testid="modal-confirm"]` |
| **Upload**         | Add files             | Advanced         | `[data-testid="file-upload-zone"]` → drop files                    |
| **Draw**           | Create drawing        | Advanced         | `[data-testid="draw-canvas"]` + color picker                       |
| **Move**           | Drag and drop items   | Advanced         | `[data-testid="drag-item-1"]` → `[data-testid="drag-target"]`      |
| **Access Context** | Right-click menu      | Advanced         | Right-click `[data-testid="context-area"]` → select action         |
| **Load More**      | Infinite scroll       | Advanced         | Scroll `[data-testid="scroll-container"]` → new items appear       |
| **Animate**        | Trigger animation     | Advanced         | `[data-testid="btn-trigger-animation"]` → box moves                |
| **Shortcut**       | Keyboard command      | Advanced         | Press `Ctrl+S` → toast appears                                     |
| **New Window**     | Open popup            | Advanced         | `[data-testid="btn-open-popup"]` → new window                      |
| **Iframe**         | Interact with iframe  | Advanced         | Access `[data-testid="test-iframe"]` content                       |
| **Shadow DOM**     | Access shadow root    | Advanced         | Navigate to shadow button in `[data-testid="shadow-host"]`         |
| **Real-time**      | WebSocket updates     | Advanced         | `[data-testid="btn-toggle-connection"]` → messages start/stop      |

---

## Complexity Breakdown

### 🟢 Basic (40+ tests)

- **What**: Clicks, typing, selects, checkboxes
- **Where**: Login, Overview, Forms, Table tabs
- **Why Start Here**: Standard Playwright operations, instant feedback
- **Example**: Login → Fill form → Click button → Toast appears

### 🟡 Intermediate (30+ tests)

- **What**: Table sorting/filtering, modals, toasts, hover states
- **Where**: Forms, Table, Components tabs
- **Why**: Multiple steps, state changes, element discovery
- **Example**: Search table → Sort column → Edit row → Verify toast

### 🔴 Advanced (47+ tests)

- **What**: Drag-and-drop, file upload, canvas, iframes, shadow DOM, popups, WebSocket, infinite
  scroll, keyboard shortcuts, context menus, animations
- **Where**: Advanced tab
- **Why**: Browser APIs, multi-context, timing-sensitive, complex selectors
- **Example**: Right-click → Select menu item → Verify toast → Menu closes

---

## Quick Test Patterns

### Pattern: Form Validation

```
1. Navigate to Forms tab
2. Fill all inputs
3. Click Save
4. Toast appears with success message
```

### Pattern: Table Operations

```
1. Navigate to Table tab
2. Type in search box
3. Click column header to sort
4. Click Edit button on row
5. Toast appears
```

### Pattern: Drag and Drop

```
1. Navigate to Advanced tab
2. Scroll to drag section
3. Drag item from source to target
4. Item moves
5. Toast confirms success
```

### Pattern: Context Menu

```
1. Navigate to Advanced tab
2. Scroll to context menu section
3. Right-click in designated area
4. Menu appears at cursor
5. Click menu item
6. Toast appears, menu closes
```

### Pattern: Multi-window

```
1. Navigate to Advanced tab
2. Click "Open Popup Window"
3. New window opens
4. Switch context to popup
5. Click button in popup
6. Parent receives postMessage
7. Toast appears in parent
```

---

## All Data-testid Selectors

### Login Page

- `email-input`, `password-input`, `remember-me`, `login-button`

### Navigation

- `tab-overview`, `tab-forms`, `tab-table`, `tab-components`, `tab-advanced`
- `user-name`, `logout-button`

### Overview Tab

- `stat-projects`, `stat-tasks`, `stat-completed`, `stat-team`

### Forms Tab

- `input-fullname`, `input-email`, `select-role`, `select-department`
- `textarea-bio`, `checkbox-notifications`, `checkbox-newsletter`
- `btn-save-profile`, `btn-cancel-profile`
- `select-country`, `select-city`

### Table Tab

- `search-tasks`, `tasks-table`
- `sort-id`, `sort-task`, `sort-assignee`, `sort-status`
- `task-row-{id}`, `status-{id}`, `btn-edit-{id}`, `btn-delete-{id}`

### Components Tab

- `btn-show-modal`, `btn-show-loading`
- `btn-toast-success`, `btn-toast-error`, `btn-toast-info`
- `modal-overlay`, `modal`, `modal-confirm`, `modal-cancel`
- `loading-overlay`, `toast-container`, `toast-close`

### Advanced Tab

- `drag-source`, `drag-target`, `drag-item-{id}`
- `file-upload-zone`, `file-input`, `file-list`, `file-item-{index}`
- `draw-canvas`, `color-black`, `color-blue`, `color-red`, `color-green`, `color-orange`,
  `btn-clear-canvas`
- `test-iframe`
- `shadow-host`, `shadow-button`, `shadow-message` (in shadow root)
- `websocket-status`, `status-indicator`, `message-feed`, `message-item`, `btn-toggle-connection`
- `shortcuts-panel`, `shortcut-feedback`
- `btn-open-popup`, `popup-button`, `popup-message`, `popup-close` (in popup window)
- `scroll-container`, `scroll-item-{number}`
- `btn-trigger-animation`, `animated-box`
- `context-area`, `context-menu`, `context-copy`, `context-paste`, `context-delete`,
  `context-refresh`

---

## Testing Tips

**For Vizwright DDL/DSL:**

- Use tab navigation to organize test phases
- Each tab represents a different UI state/context
- All interactive elements have data-testid attributes
- Toast notifications provide instant feedback
- Real-time updates demonstrate async handling

**For Playwright:**

- Shadow DOM:
  `page.locator('[data-testid="shadow-host"]').locator('>> [data-testid="shadow-button"]')`
- Iframes: `page.frameLocator('[data-testid="test-iframe"]').getByRole('button')`
- Popups: `const popup = await context.waitForEvent('page');`
- File upload: `await fileInput.setInputFiles(['path/to/file'])`
- Right-click: `await element.click({ button: 'right' })`
- Canvas: Verify with screenshots or pixel data

**Common Patterns:**

- Action → Wait → Verify feedback (toast/modal/state change)
- Multi-step flows (login → navigate → interact → verify)
- State management (WebSocket connected/disconnected)
- Progressive enhancement (scroll → load → scroll → load)
