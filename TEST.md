# Cypress Testing Setup

This document explains how to install, configure, run, and write Cypress E2E tests for the Next.js application.

## 1. Prerequisites

Make sure the Next.js application works first:

```bash
npm install
npm run dev
```

The application should be available at:

```text
http://localhost:3000
```

Keep the Next.js development server running in Terminal 1.

---

## 2. Install Cypress

From the project root:

```bash
npm install --save-dev cypress
```

Initialize/open Cypress:

```bash
npx cypress open
```

Select:

```text
E2E Testing
```

Then select a browser such as Chrome or Firefox.

Cypress will create the required configuration/support files.

---

## 3. Recommended Project Structure

After Cypress setup, the structure should look approximately like this:

```text
project/
├── cypress/
│   ├── e2e/
│   │   └── home.cy.ts
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│       ├── commands.ts
│       └── e2e.ts
│
├── cypress.config.ts
├── src/
├── public/
├── package.json
└── ...
```

Important:

```text
cypress/support/e2e.ts
```

is the global E2E support file.

```text
cypress/e2e/
```

is where the actual E2E test files go.

---

## 4. Cypress Configuration

Use this in `cypress.config.ts`:

```ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
```

This allows tests to use:

```ts
cy.visit("/");
```

instead of:

```ts
cy.visit("http://localhost:3000/");
```

---

## 5. E2E Support File

`cypress/support/e2e.ts` can contain:

```ts
import "./commands";
```

Keep this file for global E2E configuration, hooks, and Cypress-wide behavior.

Do not put normal test cases here.

---

## 6. Create the First Test

Create:

```text
cypress/e2e/home.cy.ts
```

Example for an application where `/` redirects unauthenticated users to `/login`:

```ts
describe("Home Page", () => {
  it("should redirect unauthenticated user to login", () => {
    cy.visit("/");

    cy.url().should("eq", "http://localhost:3000/login");

    cy.get("body").should("be.visible");
  });
});
```

If `/` is supposed to directly show the homepage instead, use:

```ts
describe("Home Page", () => {
  it("should load the home page", () => {
    cy.visit("/");

    cy.url().should("eq", "http://localhost:3000/");

    cy.get("body").should("be.visible");
  });
});
```

Choose the assertion that matches the application's actual behavior.

---

## 7. Useful Cypress Commands

### Visit a page

```ts
cy.visit("/");
```

```ts
cy.visit("/login");
```

### Find an element

```ts
cy.get("button");
```

```ts
cy.get("#email");
```

```ts
cy.get('[data-testid="login-button"]');
```

### Click

```ts
cy.get("button").click();
```

### Enter text

```ts
cy.get("#email").type("test@example.com");
```

### Clear an input

```ts
cy.get("#email").clear();
```

### Check visibility

```ts
cy.get("button").should("be.visible");
```

### Check text

```ts
cy.get("h1").should("contain", "Dashboard");
```

### Check URL

```ts
cy.url().should("include", "/dashboard");
```

### Check element exists

```ts
cy.get('[data-testid="dashboard"]').should("exist");
```

---

## 8. Recommended Selectors

For stable tests, prefer dedicated `data-testid` attributes.

Next.js component:

```tsx
<button data-testid="login-button">
  Login
</button>
```

Cypress:

```ts
cy.get('[data-testid="login-button"]').click();
```

This is generally more stable than relying on CSS classes.

---

## 9. Run Cypress in Interactive Mode

Start Next.js:

```bash
npm run dev
```

In another terminal:

```bash
npm run cypress:open
```

Then select:

```text
E2E Testing
```

Choose Chrome or Firefox and select the test file.

---

## 10. Run All Tests from Terminal

```bash
npm run cypress:run
```

This runs Cypress in headless mode.

---

## 11. Run Tests in Chrome

Add this to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress:chrome": "cypress run --browser chrome",
    "cypress:firefox": "cypress run --browser firefox"
  }
}
```

Run:

```bash
npm run cypress:chrome
```

---

## 12. Run Tests in Firefox

```bash
npm run cypress:firefox
```

Or directly:

```bash
npx cypress run --browser firefox
```

---

## 13. Open Cypress Directly in Chrome

```bash
npx cypress open --browser chrome
```

For Firefox:

```bash
npx cypress open --browser firefox
```

---

## 14. Recommended npm Scripts

Final `package.json` scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "cypress:open": "cypress open",
  "cypress:run": "cypress run",
  "cypress:chrome": "cypress run --browser chrome",
  "cypress:firefox": "cypress run --browser firefox"
}
```

---

## 15. Complete Daily Workflow

### Terminal 1: Next.js

```bash
npm run dev
```

### Terminal 2: Cypress UI

```bash
npm run cypress:open
```

### Or run Chrome directly

```bash
npm run cypress:chrome
```

### Or run Firefox directly

```bash
npm run cypress:firefox
```

### Or run all tests without specifying a browser

```bash
npm run cypress:run
```

---

## 16. Complete Fresh Setup

If Cypress is not installed yet, copy and run:

```bash
npm install --save-dev cypress
npx cypress open
```

Select:

```text
E2E Testing
```

Then select Chrome or Firefox.

After setup, create the test directory/file if it does not exist:

```bash
mkdir -p cypress/e2e
touch cypress/e2e/home.cy.ts
```

Then start Next.js:

```bash
npm run dev
```

In another terminal:

```bash
npm run cypress:open
```

---

## 17. Example Login Test

For a login page:

```ts
describe("Login", () => {
  it("should display the login page", () => {
    cy.visit("/login");

    cy.get("body").should("be.visible");
  });
});
```

If the page has a GitHub login button:

```ts
describe("Login", () => {
  it("should display GitHub login", () => {
    cy.visit("/login");

    cy.contains("Continue with GitHub")
      .should("be.visible");
  });
});
```

Avoid automating a real third-party OAuth account directly in basic E2E tests. For authentication tests, use a test account, test environment, or a controlled authentication/session strategy.

---

## 18. E2E vs Component Testing

### E2E Testing

Tests the complete application flow:

```text
Browser
  ↓
Next.js
  ↓
API
  ↓
Database
```

Example:

```text
Login
  ↓
Dashboard
  ↓
Create record
  ↓
Save
  ↓
Verify result
```

### Component Testing

Tests an individual UI component in isolation:

```text
<LoginForm />
<Button />
<UserTable />
<Modal />
```

For application-level workflows, start with E2E testing.

---

## 19. Useful Test Naming

Use descriptive test names:

```ts
describe("Login", () => {
  it("should display the login page", () => {});

  it("should show validation for an invalid email", () => {});

  it("should redirect an authenticated user to the dashboard", () => {});
});
```

Avoid vague names like:

```ts
it("test 1", () => {});
```

---

## 20. Basic Cypress Test Pattern

Remember this pattern:

```text
Visit
  ↓
Find
  ↓
Interact
  ↓
Assert
```

Example:

```ts
cy.visit("/login");

cy.get("#email")
  .type("test@example.com");

cy.get("#password")
  .type("password123");

cy.get('[data-testid="login-button"]')
  .click();

cy.url()
  .should("include", "/dashboard");
```

---

## 21. Quick Command Reference

```bash
# Install
npm install --save-dev cypress

# Open Cypress UI
npm run cypress:open

# Run all tests
npm run cypress:run

# Run Chrome
npm run cypress:chrome

# Run Firefox
npm run cypress:firefox

# Open directly in Chrome
npx cypress open --browser chrome

# Open directly in Firefox
npx cypress open --browser firefox

# Run directly in Chrome
npx cypress run --browser chrome

# Run directly in Firefox
npx cypress run --browser firefox
```

## 22. Recommended Order for Learning

```text
1. cy.visit()
2. cy.get()
3. cy.contains()
4. .click()
5. .type()
6. .should()
7. URL assertions
8. Forms
9. Navigation
10. Authentication/session handling
11. API interception
12. Fixtures
13. Custom commands
14. Component testing
15. CI/CD
```
