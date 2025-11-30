# Dashboard Sample App

A comprehensive dashboard application with login flow, perfect for building and testing complex UI
scenarios with Vizwright. This sample app demonstrates typical web application patterns and provides
a rich testing environment with multiple interactive components, forms, tables, and advanced UI
elements.

## Test Coverage Overview

This app provides **117+ distinct test scenarios** across 5 major tabs, covering everything from
basic interactions to advanced browser capabilities.

---

## 🔐 Login Page (`index.html`)

### Authentication Test Cases

| Test Case             | Selector                         | Action                   | Expected Result                  |
| --------------------- | -------------------------------- | ------------------------ | -------------------------------- |
| Valid login (user)    | `[data-testid="email-input"]`    | Type `user@example.com`  | Input accepts email              |
| Valid login (user)    | `[data-testid="password-input"]` | Type `user123`           | Input accepts password           |
| Valid login (user)    | `[data-testid="login-button"]`   | Click                    | Redirects to dashboard.html      |
| Valid login (admin)   | `[data-testid="email-input"]`    | Type `admin@example.com` | Input accepts email              |
| Valid login (admin)   | `[data-testid="password-input"]` | Type `admin123`          | Input accepts password           |
| Invalid credentials   | `[data-testid="login-button"]`   | Click with wrong creds   | Shows error message              |
| Empty form submission | `[data-testid="login-button"]`   | Click without input      | HTML5 validation triggers        |
| Remember me checkbox  | `[data-testid="remember-me"]`    | Toggle                   | Checkbox state changes           |
| Password visibility   | Form interaction                 | Type in password field   | Input type="password" masks text |

**Session Management**: Login creates `sessionStorage.currentUser` with user data.

---

## 📊 Overview Tab

### Statistics Display Test Cases

| Test Case         | Selector                         | Verification | Expected Value                     |
| ----------------- | -------------------------------- | ------------ | ---------------------------------- |
| Projects stat     | `[data-testid="stat-projects"]`  | Text content | Contains "12"                      |
| Tasks stat        | `[data-testid="stat-tasks"]`     | Text content | Contains "48"                      |
| Completed stat    | `[data-testid="stat-completed"]` | Text content | Contains "89%"                     |
| Team stat         | `[data-testid="stat-team"]`      | Text content | Contains "8"                       |
| User name display | `[data-testid="user-name"]`      | Text content | Shows logged-in user name          |
| Welcome message   | `#welcomeMessage`                | Text content | "Welcome back, {name}!"            |
| Logout button     | `[data-testid="logout-button"]`  | Click        | Clears session, redirects to login |

---

## 📝 Forms Tab

### Form Input Test Cases

| Test Case              | Selector                                 | Input Type | Test Action                   |
| ---------------------- | ---------------------------------------- | ---------- | ----------------------------- |
| Full name input        | `[data-testid="input-fullname"]`         | text       | Type "John Doe"               |
| Email input            | `[data-testid="input-email"]`            | email      | Type "john\@example.com"      |
| Role dropdown          | `[data-testid="select-role"]`            | select     | Select "Developer"            |
| Department dropdown    | `[data-testid="select-department"]`      | select     | Select "Engineering"          |
| Bio textarea           | `[data-testid="textarea-bio"]`           | textarea   | Type multi-line text          |
| Notifications checkbox | `[data-testid="checkbox-notifications"]` | checkbox   | Toggle on/off                 |
| Newsletter checkbox    | `[data-testid="checkbox-newsletter"]`    | checkbox   | Toggle on/off                 |
| Save button            | `[data-testid="btn-save-profile"]`       | submit     | Shows success toast           |
| Cancel button          | `[data-testid="btn-cancel-profile"]`     | click      | Resets form, shows info toast |

### Dependent Dropdown Test Cases

| Test Case           | Selector                         | Action                 | Expected Result       |
| ------------------- | -------------------------------- | ---------------------- | --------------------- |
| Country selection   | `[data-testid="select-country"]` | Select "United States" | City dropdown enables |
| City population     | `[data-testid="select-city"]`    | Check options          | Shows US cities only  |
| Country change      | `[data-testid="select-country"]` | Change to "Canada"     | City dropdown updates |
| No country selected | `[data-testid="select-city"]`    | Verify state           | Dropdown is disabled  |

**Countries Available**: USA, UK, Canada, Australia (each with 4 cities)

---

## 📋 Data Table Tab

### Table Interaction Test Cases

| Test Case            | Selector                        | Action       | Expected Result                  |
| -------------------- | ------------------------------- | ------------ | -------------------------------- |
| Search functionality | `[data-testid="search-tasks"]`  | Type "login" | Filters to matching rows         |
| Sort by ID           | `[data-testid="sort-id"]`       | Click        | Sorts ascending                  |
| Sort by ID (toggle)  | `[data-testid="sort-id"]`       | Click again  | Sorts descending                 |
| Sort by task name    | `[data-testid="sort-task"]`     | Click        | Alphabetical sort                |
| Sort by assignee     | `[data-testid="sort-assignee"]` | Click        | Sorts by assignee name           |
| Sort by status       | `[data-testid="sort-status"]`   | Click        | Groups by status                 |
| Edit button          | `[data-testid="btn-edit-1"]`    | Click        | Shows info toast                 |
| Delete button        | `[data-testid="btn-delete-1"]`  | Click        | Shows error toast                |
| Row hover            | `[data-testid="task-row-1"]`    | Hover        | Background color changes         |
| Status badge         | `[data-testid="status-1"]`      | Verify       | Shows "active/pending/completed" |

**Table Data**: 8 tasks with varying statuses (active, pending, completed)

---

## 🎨 Components Tab

### Modal Test Cases

| Test Case           | Selector                         | Action        | Expected Result                   |
| ------------------- | -------------------------------- | ------------- | --------------------------------- |
| Open modal          | `[data-testid="btn-show-modal"]` | Click         | Modal overlay shows               |
| Modal confirm       | `[data-testid="modal-confirm"]`  | Click         | Closes modal, shows success toast |
| Modal cancel        | `[data-testid="modal-cancel"]`   | Click         | Closes modal, shows info toast    |
| Click outside modal | `[data-testid="modal-overlay"]`  | Click overlay | Modal closes                      |
| Modal visibility    | `[data-testid="modal"]`          | Check         | Modal content visible when open   |

### Loading State Test Cases

| Test Case        | Selector                           | Action         | Expected Result       |
| ---------------- | ---------------------------------- | -------------- | --------------------- |
| Trigger loading  | `[data-testid="btn-show-loading"]` | Click          | Loading overlay shows |
| Loading duration | `[data-testid="loading-overlay"]`  | Wait 3 seconds | Overlay auto-hides    |
| Loading complete | After loading                      | Verify         | Success toast appears |

### Toast Notification Test Cases

| Test Case          | Selector                            | Action  | Expected Result          |
| ------------------ | ----------------------------------- | ------- | ------------------------ |
| Success toast      | `[data-testid="btn-toast-success"]` | Click   | Green toast appears      |
| Error toast        | `[data-testid="btn-toast-error"]`   | Click   | Red toast appears        |
| Info toast         | `[data-testid="btn-toast-info"]`    | Click   | Blue toast appears       |
| Toast auto-dismiss | `[data-testid="toast-success"]`     | Wait 5s | Toast disappears         |
| Toast close button | `[data-testid="toast-close"]`       | Click   | Toast closes immediately |
| Multiple toasts    | Click multiple buttons              | Verify  | Toasts stack vertically  |

---

## 🚀 Advanced Tab

### Drag and Drop Test Cases

| Test Case           | Selector                      | Action              | Expected Result         |
| ------------------- | ----------------------------- | ------------------- | ----------------------- |
| Drag item 1         | `[data-testid="drag-item-1"]` | Drag to target zone | Item moves              |
| Drag item 2         | `[data-testid="drag-item-2"]` | Drag to target zone | Item moves              |
| Drag item 3         | `[data-testid="drag-item-3"]` | Drag to target zone | Item moves              |
| Drag back           | Any item                      | Drag back to source | Item returns            |
| Drop zone highlight | Drag over zone                | Observe             | Zone background changes |
| Success feedback    | After drop                    | Verify              | Success toast shows     |

### File Upload Test Cases

| Test Case         | Selector                            | Action          | Expected Result        |
| ----------------- | ----------------------------------- | --------------- | ---------------------- |
| Click to upload   | `[data-testid="file-upload-zone"]`  | Click           | File picker opens      |
| Select file       | `[data-testid="file-input"]`        | Choose file     | File added to list     |
| Multiple files    | `[data-testid="file-input"]`        | Select multiple | All files listed       |
| Drag file         | Drag file to zone                   | Drop            | File added to list     |
| File item display | `[data-testid="file-item-0"]`       | Verify          | Shows name and size    |
| Remove file       | `[data-testid="btn-remove-file-0"]` | Click           | File removed from list |
| Drag over effect  | Drag file over zone                 | Observe         | Zone highlights        |

### Canvas Drawing Test Cases

| Test Case          | Selector                           | Action           | Expected Result           |
| ------------------ | ---------------------------------- | ---------------- | ------------------------- |
| Draw with mouse    | `[data-testid="draw-canvas"]`      | Click and drag   | Line appears              |
| Black color        | `[data-testid="color-black"]`      | Click, then draw | Black line                |
| Blue color         | `[data-testid="color-blue"]`       | Click, then draw | Blue line                 |
| Red color          | `[data-testid="color-red"]`        | Click, then draw | Red line                  |
| Green color        | `[data-testid="color-green"]`      | Click, then draw | Green line                |
| Orange color       | `[data-testid="color-orange"]`     | Click, then draw | Orange line               |
| Clear canvas       | `[data-testid="btn-clear-canvas"]` | Click            | Canvas clears, info toast |
| Continuous drawing | Multiple strokes                   | Draw             | Each stroke persists      |

### Iframe Test Cases

| Test Case          | Selector                      | Action    | Expected Result         |
| ------------------ | ----------------------------- | --------- | ----------------------- |
| Iframe loaded      | `[data-testid="test-iframe"]` | Verify    | Content visible         |
| Iframe button      | Button inside iframe          | Click     | Alert appears           |
| Iframe content     | Inside iframe                 | Read text | "Iframe Content" header |
| Cross-frame access | Navigate iframe               | Test      | Content accessible      |

### Shadow DOM Test Cases

| Test Case            | Selector                         | Action                 | Expected Result                 |
| -------------------- | -------------------------------- | ---------------------- | ------------------------------- |
| Shadow host exists   | `[data-testid="shadow-host"]`    | Verify                 | Element present                 |
| Shadow button        | `[data-testid="shadow-button"]`  | Click (in shadow root) | Message updates                 |
| Shadow message       | `[data-testid="shadow-message"]` | Read (in shadow root)  | "Shadow DOM button clicked!"    |
| Shadow encapsulation | Query from outside               | Test                   | Shadow content not in light DOM |

**Note**: Requires Playwright's `pierceSelector` or shadow DOM navigation.

### WebSocket Simulation Test Cases

| Test Case          | Selector                                | Action      | Expected Result             |
| ------------------ | --------------------------------------- | ----------- | --------------------------- |
| Initial connection | `[data-testid="status-indicator"]`      | Verify      | Green dot, "Connected"      |
| Message feed       | `[data-testid="message-feed"]`          | Wait 3s     | New message appears         |
| Disconnect         | `[data-testid="btn-toggle-connection"]` | Click       | Red dot, "Disconnected"     |
| No messages        | After disconnect                        | Wait 3s     | No new messages             |
| Reconnect          | `[data-testid="btn-toggle-connection"]` | Click again | Green dot, messages resume  |
| Message format     | `[data-testid="message-item"]`          | Read        | Contains timestamp and text |
| Message limit      | Wait for 15+ messages                   | Verify      | Only last 10 shown          |

### Keyboard Shortcut Test Cases

| Test Case         | Keyboard                            | Action | Expected Result                  |
| ----------------- | ----------------------------------- | ------ | -------------------------------- |
| Save shortcut     | `Ctrl+S`                            | Press  | Info toast, feedback updates     |
| New item shortcut | `Ctrl+N`                            | Press  | Info toast, feedback updates     |
| Search shortcut   | `Ctrl+F`                            | Press  | Info toast, feedback updates     |
| Delete shortcut   | `Ctrl+D`                            | Press  | Info toast, feedback updates     |
| Shortcut feedback | `[data-testid="shortcut-feedback"]` | Verify | Shows last shortcut name         |
| Prevent default   | `Ctrl+S`                            | Press  | Browser save dialog doesn't open |

### Multi-window/Popup Test Cases

| Test Case     | Selector                         | Action         | Expected Result            |
| ------------- | -------------------------------- | -------------- | -------------------------- |
| Open popup    | `[data-testid="btn-open-popup"]` | Click          | New window opens           |
| Popup content | In popup window                  | Verify         | "Popup Window" header      |
| Popup button  | `[data-testid="popup-button"]`   | Click in popup | Message updates            |
| Popup message | `[data-testid="popup-message"]`  | Read in popup  | "Button clicked in popup!" |
| PostMessage   | Popup button click               | Verify         | Parent receives message    |
| Close popup   | `[data-testid="popup-close"]`    | Click in popup | Window closes              |
| Parent toast  | After popup button               | Verify         | Toast in parent window     |

**Note**: Requires Playwright multi-page/context handling.

### Infinite Scroll Test Cases

| Test Case        | Selector                           | Action      | Expected Result       |
| ---------------- | ---------------------------------- | ----------- | --------------------- |
| Initial load     | `[data-testid="scroll-item-1"]`    | Verify      | First 10 items loaded |
| Scroll to bottom | `[data-testid="scroll-container"]` | Scroll down | Loading spinner shows |
| Load more        | After scroll                       | Wait 1s     | Next 10 items appear  |
| Item numbering   | `[data-testid="scroll-item-15"]`   | Verify      | Sequential numbering  |
| Max pages        | Scroll to 50 items                 | Verify      | Stops at 5 pages      |
| Scroll position  | After loading                      | Check       | Stays near bottom     |

### Animation Test Cases

| Test Case          | Selector                                | Action  | Expected Result             |
| ------------------ | --------------------------------------- | ------- | --------------------------- |
| Trigger animation  | `[data-testid="btn-trigger-animation"]` | Click   | Box moves right and rotates |
| Animation duration | `[data-testid="animated-box"]`          | Measure | Completes in 0.5s           |
| Animation toast    | After animation                         | Verify  | Success toast appears       |
| Toggle animation   | Click button again                      | Verify  | Box returns to start        |
| Animation class    | During animation                        | Check   | Has "animate" class         |

### Context Menu Test Cases

| Test Case             | Selector                          | Action      | Expected Result                       |
| --------------------- | --------------------------------- | ----------- | ------------------------------------- |
| Show context menu     | `[data-testid="context-area"]`    | Right-click | Context menu appears                  |
| Context menu position | After right-click                 | Verify      | At cursor position                    |
| Copy action           | `[data-testid="context-copy"]`    | Click       | Toast: "Context menu action: copy"    |
| Paste action          | `[data-testid="context-paste"]`   | Click       | Toast: "Context menu action: paste"   |
| Delete action         | `[data-testid="context-delete"]`  | Click       | Toast: "Context menu action: delete"  |
| Refresh action        | `[data-testid="context-refresh"]` | Click       | Toast: "Context menu action: refresh" |
| Hide menu             | Click elsewhere                   | Click       | Menu disappears                       |

---

## 🎯 Tab Navigation Test Cases

| Test Case            | Selector                         | Action | Expected Result         |
| -------------------- | -------------------------------- | ------ | ----------------------- |
| Switch to Overview   | `[data-testid="tab-overview"]`   | Click  | Overview panel shows    |
| Switch to Forms      | `[data-testid="tab-forms"]`      | Click  | Forms panel shows       |
| Switch to Table      | `[data-testid="tab-table"]`      | Click  | Table panel shows       |
| Switch to Components | `[data-testid="tab-components"]` | Click  | Components panel shows  |
| Switch to Advanced   | `[data-testid="tab-advanced"]`   | Click  | Advanced panel shows    |
| Active tab state     | Any tab                          | Click  | Tab gets "active" class |
| Panel visibility     | Switch tabs                      | Verify | Only one panel visible  |

---

## 📝 Test Credentials

```text
User Account:
Email: user@example.com
Password: user123

Admin Account:
Email: admin@example.com
Password: admin123
```

---

## 🚀 Running the App

```bash
cd /workspaces/vizwright/sample-apps
./serve.sh dashboard
```

Access at: `http://localhost:8080`

---

## 💡 Test Strategy Recommendations

### Beginner Tests (Start Here)

1. Login flow (basic form interaction)
2. Tab navigation (simple clicks)
3. Button clicks with toast feedback
4. Form inputs and dropdowns

### Intermediate Tests

1. Table sorting and filtering
2. Modal interactions
3. Form validation
4. Drag and drop

### Advanced Tests

1. Shadow DOM navigation
2. Iframe interactions
3. Multi-window handling
4. Canvas drawing verification
5. Infinite scroll with waits
6. WebSocket state management
7. Keyboard event handling
8. Context menu (right-click)

### Challenging Edge Cases

- File upload with drag-and-drop
- Animation completion detection
- PostMessage between windows
- Shadow DOM element interaction
- Context menu positioning
- Lazy loading race conditions

---

## 🔍 Playwright-Specific Notes

**Shadow DOM**: Use
`page.locator('[data-testid="shadow-host"]').locator('>> [data-testid="shadow-button"]')` or
equivalent.

**Iframes**: Use `page.frameLocator('[data-testid="test-iframe"]')` to access iframe content.

**Popups**: Listen for `page.context().on('page', ...)` to handle new windows.

**File Upload**: Use `await fileInput.setInputFiles(['path/to/file'])`.

**Context Menu**: Use `await element.click({ button: 'right' })`.

**Canvas**: Verify drawing with `await canvas.screenshot()` or pixel comparisons.

**Keyboard**: Use `await page.keyboard.press('Control+S')`.

---

## 📊 Test Coverage Summary

| Category        | Test Cases | Complexity         |
| --------------- | ---------- | ------------------ |
| Authentication  | 9          | Basic              |
| Navigation      | 7          | Basic              |
| Forms           | 13         | Basic-Intermediate |
| Tables          | 10         | Intermediate       |
| Modals          | 5          | Intermediate       |
| Toasts          | 6          | Intermediate       |
| Drag & Drop     | 6          | Advanced           |
| File Upload     | 7          | Advanced           |
| Canvas          | 8          | Advanced           |
| Iframe          | 4          | Advanced           |
| Shadow DOM      | 4          | Advanced           |
| WebSocket       | 7          | Advanced           |
| Keyboard        | 6          | Advanced           |
| Popups          | 7          | Advanced           |
| Infinite Scroll | 6          | Advanced           |
| Animations      | 5          | Advanced           |
| Context Menu    | 7          | Advanced           |
| **TOTAL**       | **117+**   | **All Levels**     |

This dashboard provides comprehensive coverage of real-world UI testing scenarios from basic to
expert level.
