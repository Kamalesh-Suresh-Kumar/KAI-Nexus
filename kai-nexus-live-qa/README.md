# KAI-NEXUS Live Site QA

This suite tests the **deployed GitHub Pages website**, not a localhost server.

Production URL:
`https://kamalesh-suresh-kumar.github.io/KAI-NEXUS/`

## Requirements

- Node.js 20+
- npm
- Internet connection
- Supported browsers installed by Playwright

## Install

```powershell
npm install
npx playwright install
```

## Run against the live site

```powershell
npm test
```

Run one browser at a time:

```powershell
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

Run with visible browser windows:

```powershell
npm run test:headed
```

Override the target only when intentionally testing another deployed environment:

```powershell
$env:BASE_URL = "https://kamalesh-suresh-kumar.github.io/KAI-NEXUS/"
npm test
```

## Reports

After the run:

```powershell
npm run report
```

Artifacts:

- `playwright-report/` — interactive HTML report
- `test-results/` — JUnit output, traces, screenshots and videos for failures

## Coverage

- Production response and page rendering
- Nine platform nodes and SVG icon loading
- Network lines and particles
- Platform selection and profile content
- Active-node state and rapid switching
- Keyboard activation and basic semantics
- Empty/profile state visibility
- Dynamic copyright year
- Network node bounds
- Six responsive viewport sizes
- Connection status behavior
- Uncaught JavaScript errors and failed same-origin requests
- axe-core WCAG 2.1 A/AA checks
- External destination configuration for web profiles
- Phone link readiness without opening the device dialler

## Important limitations

- External destinations are checked for the URL opened by the site. Their account availability, login state, and service uptime are outside this site's control.
- Phone dialling is intentionally not triggered by automation.
- A browser automation test is not a substitute for real-device testing on every operating system.
- GitHub Pages deployment changes are tested only after they are published.

## Current known issue to investigate

In the current `app.js`, the `keydown` listener is registered in a separate `forEach((node) => ...)` loop but calls `activatePlatform(index)`. The `index` variable belongs to a different callback and is not in scope here. The keyboard test is expected to expose this. Fix by using a single indexed loop, or read the node's `data-index` in the key handler.
