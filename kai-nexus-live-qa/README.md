# KAI-NEXUS Live Site QA

This suite tests the **deployed GitHub Pages website**, not a localhost server.

**Production URL:**

[https://kamalesh-suresh-kumar.github.io/KAI-Nexus/](https://kamalesh-suresh-kumar.github.io/KAI-Nexus/)

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
$env:BASE_URL = "https://kamalesh-suresh-kumar.github.io/KAI-Nexus/"
npm test
```

## Reports

After the run:

```powershell
npm run report
```

Artifacts:

- `playwright-report/` — interactive HTML report.
- `test-results/` — test results and diagnostic files, including traces, screenshots, and videos when generated.

## Coverage

- Production response and page rendering
- All nine configured platform nodes
- SVG icon loading
- Network lines and particles
- Platform selection and profile content
- Active-node state and rapid switching
- Keyboard activation using Enter and Space
- Accessible platform labels and button semantics
- Empty and selected profile state visibility
- Dynamic copyright year
- Network node bounds
- Six responsive viewport sizes: 320, 375, 430, 768, 1366, and 1920 pixels
- Connection status behavior
- Uncaught JavaScript errors and failed same-origin requests
- axe-core WCAG 2.1 A/AA accessibility checks
- Configured external destination URLs for web profiles
- Phone link readiness without opening the device dialler

## Latest Verified CI Run

The latest verified GitHub Actions production QA run completed successfully.

|Metric|Result|
|---|---:|
|Total tests|69|
|Passed|69|
|Failed|0|
|Flaky|0|
|Skipped|0|
|Chromium|23 passed|
|Firefox|23 passed|
|WebKit|23 passed|
|CI workers|2|
|Execution time|Approximately 1.3 minutes|

All 69 tests passed across Chromium, Firefox, and WebKit.

The GitHub Actions workflow also successfully uploaded the `kai-nexus-live-qa-report` artifact.

## Important Limitations

- External destination tests verify the URL configured by the website using a stubbed `window.open`. They do not validate third-party account availability, authentication, redirects, or service uptime.
- Phone dialling is intentionally not triggered by automation.
- Browser automation is not a substitute for real-device testing on every operating system.
- GitHub Pages deployment changes are tested only after they are published.
- The latest successful CI run validates the tested production state; future deployments should be tested again.

## CI Workflow

The GitHub Actions workflow:

1. Checks whether the production website is responding.
2. Installs project dependencies.
3. Installs the required Playwright browsers.
4. Runs the production QA suite across Chromium, Firefox, and WebKit.
5. Uploads the Playwright HTML report and test results as a GitHub Actions artifact.
