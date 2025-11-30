# Vizwright

Imagine a single executable, running on your computer, that raises Playwright to a whole new level
of Visual First Test Automation (VFTA).

In Playwright, your tests are code, technical debt, constantly struggling to keep up with
ever-changing UIs. Even the most simple task if building a test is frustrated by not being able to
quickly "point at elements" and say, "input this, and click that", because you have to navigate a
complex DOM structure of divs, within divs, with arrays of divs....

Vizwright changes all that. It scans your UI, identifies the Elements of Interest (EOI), and allows
you to visually build tests by pointing and clicking on the actual elements you want to interact
with. No more hunting through code for selectors, no more brittle tests that break with every UI
change. Then Vizwright helps you map test data into your tests, so inputs and assertions are
flawlessly connected.

An intuitive scripting language lets you interact with and transform data, such as complex JSON
structures, to be used in UI testing. Imagine having multiple JSON (data) structures that map out
the journies of multiple customers using your portal. You can inherit from the other, and override
specific fields, so you can start with a happy path, and prepare data for edge cases to test
validation.

DRY - Don't Repeat Yourself. Vizwright encourages modular test design, allowing you to create
reusable flows and actions. Build once, use everywhere. Build a login flow, password reset flow,
login as a user, or platform admin, all modular, all reusable.

## Development Philosophy: Emergent Architecture

Vizwright is built using **Emergent Architecture**—we don't design abstractions upfront. Instead,
structure emerges from validated needs:

1. **Need surfaces** → A concrete requirement appears (e.g., "find and click buttons")
2. **Experiment** → Prove it works with minimal code
3. **Validate** → Confirm the approach in practice
4. **Stabilize** → Refactor into emerging patterns (primitives, processes, tools)
5. **Test** → Add tests only after patterns stabilize

This means the codebase evolves organically. If you don't see an abstraction, it's because we
haven't needed it yet. When we do, we build just enough to solve the problem at hand.

**For AI agents**: Don't create speculative abstractions. Follow existing patterns, and propose new
structure only when a validated need emerges. See `.github/copilot-instructions.md` for detailed
guidance.
