# KAI-NEXUS

## Digital Identity Network

> **One identity. Every digital presence.**

KAI-NEXUS is a personal digital identity platform that brings multiple online profiles and communication channels together in one interactive digital network.

Instead of sharing separate links for different platforms, KAI-NEXUS provides a centralized interface through which visitors can discover and access professional profiles, development platforms, coding profiles, competition platforms, and communication channels.

The project uses a futuristic digital-network concept, representing each online presence as an interconnected node surrounding a central KAI core.

---

## 🌐 Live Website

**KAI-NEXUS:**  
[Open KAI-NEXUS](https://kamalesh-suresh-kumar.github.io/KAI-Nexus/)

**GitHub Repository:**  
[View Source Code](https://github.com/Kamalesh-Suresh-Kumar/KAI-Nexus)

---

## 📌 Overview

KAI-NEXUS is designed as a centralized digital identity hub that connects multiple online platforms through a single interactive interface.

The project focuses on:

- Personal digital identity
- Professional profile discovery
- Centralized online presence
- Interactive platform navigation
- Visual representation of digital connections
- Responsive web design
- Lightweight frontend architecture
- GitHub Pages deployment

The central KAI node represents the core identity, while individual platform nodes represent different aspects of the user's digital presence.

---

## 🎯 Objectives

The main objectives of KAI-NEXUS are:

1. Create a unified digital identity for multiple online platforms.
2. Provide quick access to professional and technical profiles.
3. Build a distinctive and interactive personal digital presence.
4. Replace scattered profile links with one centralized network.
5. Represent digital connections through an interactive node-based interface.
6. Develop a lightweight application using standard web technologies.
7. Deploy the website using GitHub Pages.
8. Maintain a simple and easily maintainable project architecture.

---

## ✨ Key Features

### 1. Digital Identity Network

KAI-NEXUS presents the user's digital presence as an interconnected network.

- A central KAI core represents the primary identity.
- Individual nodes represent different online platforms.
- Connection lines visually link each platform to the central node.
- Animated particles create a dynamic network appearance.
- Platform nodes provide interactive navigation.

### 2. Multi-Platform Profile Hub

The network connects nine digital platforms and communication channels.

| Platform | Purpose |
| --- | --- |
| GitHub | Software Development |
| LinkedIn | Professional Networking |
| Kaggle | AI / Data Science |
| HackerRank | Coding |
| LeetCode | Algorithms & Problem Solving |
| Unstop | Competitions & Career Opportunities |
| Phone | Voice Communication |
| WhatsApp | Messaging |
| Discord | Community & Communication |

Each platform is represented by an individual node with its own icon, category, and destination.

### 3. Interactive Platform Selection

Visitors can select a platform node to inspect its corresponding profile information.

The profile panel dynamically displays:

- Platform name
- Platform category
- Platform description
- Platform-related information
- Connection status
- External platform navigation

The **OPEN PLATFORM** action provides access to the selected destination.

### 4. Animated Network Interface

The digital network includes visual elements that enhance the interactive experience:

- Central KAI core
- Circular animated rings
- Connecting network lines
- Animated connection particles
- Interactive platform nodes
- Platform selection highlighting
- Dark futuristic interface
- Neon-green visual accents

### 5. Responsive Interface

The website uses responsive CSS layouts to support different screen sizes.

The interface is designed to maintain its visual structure and usability across desktop and smaller devices.

### 6. Dynamic Footer

The footer displays the KAI-NEXUS identity, digital network description, and copyright year.

The year is dynamically updated through JavaScript.

---

## 🏗️ Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- SVG Graphics
- Responsive Web Design

### Deployment

- Git
- GitHub
- GitHub Pages

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Browser Developer Tools

---

## 📁 Project Structure

KAI-NEXUS follows a lightweight static-web architecture without requiring a frontend build system or a dedicated backend server.

```text
KAI-NEXUS/
│
├── index.html
├── style.css
├── app.js
├── README.md
│
├── data/
│   └── platforms.js
│
└── assets/
    ├── kai.svg
    ├── kai-wordmark.svg
    ├── github.svg
    ├── linkedin.svg
    ├── kaggle.svg
    ├── hackerrank.svg
    ├── leetcode.svg
    ├── unstop.svg
    ├── discord.svg
    ├── phone.svg
    └── whatsapp.svg
```

*Note: The structure above represents the main static website. Additional SVG assets can be added as the platform network evolves. The `kai-nexus-live-qa/` directory contains the Playwright-based live-site test harness.*

```text
kai-nexus-live-qa/
├── package.json
├── playwright.config.js
├── tests/
│   └── live-site.spec.js
└── playwright-report/       # Generated HTML report (CI artifact)
```

### `index.html`

Contains the main structure of the KAI-NEXUS application.

It defines:

- Header
- Hero section
- Digital network section
- Platform intelligence panel
- Footer
- JavaScript file references

### `style.css`

Contains the visual design and layout of the application.

It controls:

- Typography
- Color system
- Spacing
- Responsive layouts
- Animations
- Network appearance
- Platform nodes
- Connection lines
- Profile panel
- Buttons
- Visual effects

### `app.js`

Contains the client-side application logic.

Responsibilities include:

- Application initialization
- Platform node generation
- Network positioning
- Connection line rendering
- Platform selection
- Dynamic profile information
- Connection status handling
- Platform navigation
- Footer year initialization
- Frontend event handling

### `data/platforms.js`

Contains the configuration and information for the platforms connected to KAI-NEXUS.

Keeping platform information separate from the main application logic makes the project easier to maintain and extend.

Platform configuration includes:

- Platform name
- Platform category
- Platform description
- Platform URL
- Platform icon
- Platform-related labels

### `assets/`

Contains the SVG resources used throughout the application.

These include:

- KAI identity logo
- KAI wordmark
- Platform logos
- Communication icons

---

## ⚙️ Application Architecture

KAI-NEXUS uses a client-side architecture.

The application is divided into three primary layers:

### 1. Presentation Layer

Responsible for displaying the website interface.

Technologies:

- HTML
- CSS
- SVG

### 2. Application Logic Layer

Responsible for handling application behavior and user interactions.

Technology:

- JavaScript

### 3. Data Configuration Layer

Responsible for maintaining platform-specific information separately from the application logic.

Technology:

- JavaScript (`platforms.js`)

### Architecture Diagram

```text
                 KAI-NEXUS
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
       HTML         CSS     JavaScript
          │          │          │
          │          │          ▼
          │          │     Application Logic
          │          │          │
          │          │          ▼
          │          │     Platform Data
          │          │     platforms.js
          │          │          │
          └──────────┴──────────┘
                     │
                     ▼
              Interactive UI
                     │
                     ▼
             GitHub Pages
```

---

## 🔄 Application Flow

When a visitor opens KAI-NEXUS:

```text
1. Website loads
        ↓
2. HTML structure is rendered
        ↓
3. CSS styles are applied
        ↓
4. JavaScript initializes
        ↓
5. Platform configuration is loaded
        ↓
6. Platform nodes are generated
        ↓
7. Network connections are rendered
        ↓
8. Visitor selects a platform
        ↓
9. Profile information is displayed
        ↓
10. Visitor can open the selected platform
```

---

## ☁️ Deployment

KAI-NEXUS is deployed using GitHub Pages.

The deployment architecture is:

```text
          GitHub Repository
                  │
                  ▼
             Main Branch
                  │
                  ▼
             GitHub Pages
                  │
                  ▼
           Public Website
```

GitHub Pages hosts the static application files, including HTML, CSS, JavaScript, and SVG assets.

No continuously running backend server is required for the current implementation.

---

## 🔐 Security Considerations

KAI-NEXUS uses a static frontend architecture.

Important considerations:

- Avoid placing private credentials in client-side JavaScript.
- Do not expose passwords, private API keys, or confidential information in the repository.
- Use HTTPS for external destinations wherever supported.
- Validate external URLs before using them for navigation.
- Keep platform configuration organized and maintainable.

---

## 🧪 Testing & Quality Assurance

KAI-NEXUS is tested against the **deployed GitHub Pages website**, rather than a local development server, using Playwright.

### Automated cross-browser testing

The live-site QA suite runs against:

- Chromium
- Firefox
- WebKit

The suite covers:

- Production URL availability and main document rendering.
- Generation of all nine configured platform nodes.
- Platform icon loading and network connection rendering.
- Platform selection, profile updates, and active-state behavior.
- Keyboard interaction using Enter and Space.
- Accessible button semantics and accessible labels.
- Initial profile visibility and empty-state behavior.
- Footer year and network layout boundaries.
- Responsive layouts at 320, 375, 430, 768, 1366, and 1920 pixels.
- Profile status settling and rapid platform switching.
- Uncaught browser errors and failed same-origin assets.
- Automated accessibility checks using axe-core.
- Configured external destinations and phone-profile call-ready behavior.

### Latest verified QA run

| Metric | Result |
| --- | ---: |
| Total tests | 69 |
| Passed | 69 |
| Failed | 0 |
| Flaky | 0 |
| Skipped | 0 |
| Browsers | Chromium, Firefox, WebKit |
| Execution time | Approximately 1.3 minutes |
| CI workers | 2 |

The latest verified GitHub Actions run completed all 69 tests successfully: 23 tests in each browser project.

### Running the live-site tests locally

From the `kai-nexus-live-qa/` directory:

```bash
npm install
npx playwright install
```

Set the production URL and run the suite.

**Windows PowerShell:**

```powershell
$env:BASE_URL = "https://kamalesh-suresh-kumar.github.io/KAI-Nexus/"
npx playwright test
```

**macOS / Linux:**

```bash
BASE_URL="https://kamalesh-suresh-kumar.github.io/KAI-Nexus/" npx playwright test
```

The Playwright configuration uses the production URL as its default base URL. The environment variable can override it when required.

### Viewing the HTML report

After a local test run:

```bash
npx playwright show-report
```

The GitHub Actions workflow also uploads the generated Playwright report as an artifact named `kai-nexus-live-qa-report`. The verified run retained the artifact for 14 days.

### Deployment and CI verification

The verified workflow:

1. Waits for the GitHub Pages production URL to respond.
2. Runs the Playwright suite against the live production website.
3. Executes the suite in Chromium, Firefox, and WebKit.
4. Uploads the generated Playwright report and test-results output as a workflow artifact.

### QA status and maintenance

- [x] Production website responds.
- [x] All nine platform nodes are generated.
- [x] Platform icons and network connections render.
- [x] Platform selection and profile updates work.
- [x] Keyboard interaction is tested.
- [x] Accessible labels and button semantics are tested.
- [x] Responsive layouts are tested at six viewport widths.
- [x] Browser errors and same-origin asset failures are checked.
- [x] axe-core accessibility audit passes the configured checks.
- [x] Configured platform destinations are verified by the test suite.
- [x] Chromium, Firefox, and WebKit test runs pass.
- [x] Playwright HTML report is uploaded by GitHub Actions.

*The results above describe the latest verified automated run. They do not imply that every possible external service, device, or manual user scenario has been exhaustively tested.*

---

## 🌍 Project Highlights

KAI-NEXUS combines personal branding, profile discovery, and interactive web design into a single application.

Its primary design concept is to represent an individual's digital presence as a connected network rather than a conventional list of social media links.

The project demonstrates:

- Frontend development
- JavaScript-based UI interactions
- SVG asset integration
- Dynamic DOM manipulation
- Responsive web design
- Data-driven application structure
- GitHub Pages deployment

---

## 👨‍💻 Author

### Kamalesh Suresh Kumar

Computer Science & Engineering

> KAI-NEXUS — One identity. Every digital presence.
