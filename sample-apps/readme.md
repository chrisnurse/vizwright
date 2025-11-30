# Sample Apps

Technically simple but visually complex sample applications for testing Vizwright's visual-first
test automation.

---

## Available Sample Apps

### Dashboard

**Path:** `dashboard/`\
**Description:** Comprehensive testing playground with 117+ test scenarios covering login, forms,
tables, drag-and-drop, file uploads, canvas drawing, modals, toasts, infinite scroll, keyboard
shortcuts, context menus, iframes, shadow DOM, WebSocket simulation, multi-window popups, and
animations.

**Quick Start:**

```bash
./serve.sh dashboard
# Opens at http://localhost:8080
```

**Test Credentials:**

- User: `user@example.com` / `user123`
- Admin: `admin@example.com` / `admin123`

**Documentation:** See `dashboard/README.md` for comprehensive test case guide

---

## Serving Sample Apps

### Basic Usage

```bash
./serve.sh [app-name] [port]
```

**Examples:**

```bash
./serve.sh dashboard          # Serves on default port 8080
./serve.sh dashboard 3000     # Serves on custom port 3000
```

### Testing Modes

#### Easy Mode (With Test IDs)

Default mode includes `data-testid` attributes on all interactive elements for quick test
development:

```bash
./serve.sh dashboard 8080
```

**Use this when:**

- Developing tests quickly
- Learning Vizwright's DDL/DSL syntax
- Validating test logic before hardening selectors
- Creating reference implementations

#### Hard Mode (Without Test IDs)

Strips all `data-testid` attributes to test with natural selectors (roles, labels, text content):

```bash
./serve.sh dashboard 8080 --notest
```

**Use this when:**

- Testing visual element discovery
- Validating accessibility-based selectors
- Simulating real-world apps without test attributes
- Demonstrating robust test automation

**How it works:**

- Creates temporary `cleaned/` folder inside the app directory
- Strips all `data-testid` attributes from HTML files
- Serves from the cleaned version
- Automatically removes `cleaned/` folder when server stops
- Original files remain untouched

---

## Creating New Sample Apps

1. Create a new directory under `sample-apps/`
2. Add your HTML/CSS/JS files (vanilla, no build step required)
3. Add a `README.md` with test scenarios
4. Serve with `./serve.sh [your-app-name]`

**Guidelines:**

- Keep code simple (vanilla HTML/CSS/JS)
- Add `data-testid` attributes to interactive elements
- Focus on visual complexity, not technical complexity
- Document test scenarios in README.md
- Use realistic UI patterns from production apps

---

## Sample App Structure

```text
sample-apps/
├── readme.md           # This file
├── serve.sh           # Serving script
├── .gitignore         # Ignores cleaned/ folders
└── dashboard/
    ├── index.html     # Login page
    ├── dashboard.html # Main app page
    ├── README.md      # Test case guide
    └── cleaned/       # (Auto-generated in --notest mode, gitignored)
```

---

## Tips

- **View available apps:** Just run `./serve.sh` with an invalid name to see the list
- **Port conflicts:** Change the port number if 8080 is already in use
- **Stop server:** Press `Ctrl+C`
- **Multiple instances:** Run on different ports to test multiple apps simultaneously
- **Playwright testing:** Apps are designed to work with Playwright's accessibility tree and visual
  selectors
