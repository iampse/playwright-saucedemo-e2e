Playwright E2E Test Automation – Sauce Demo


1. Overview

This project is an end-to-end (E2E) test automation suite built with Playwright and TypeScript, designed to demonstrate a practical, maintainable, and risk-based QA automation approach.

Rather than maximizing test coverage, this project focuses on validating critical user journeys commonly found in real-world web applications, following principles used in enterprise QA environments.



System Under Test (SUT)

Application: Sauce Demo

URL: https://www.saucedemo.com

Type: Web-based e-commerce demo application

Sauce Demo is used as a representative system to validate authentication, inventory management, cart behavior, and checkout flows.
This project does not aim to test Sauce Demo as a production system.


2. Test Scope
In Scope

User authentication (login success and failure)

Product inventory sorting

Cart add/remove behavior

Checkout flow (happy path)

Smoke and regression-level E2E scenarios

Out of Scope

Visual regression testing

Performance, load, or stress testing

Security or penetration testing

Mobile or cross-browser matrix testing

The scope is intentionally limited to keep the test suite focused, stable, and easy to maintain.



3. Test Strategy (Summary)

Risk-based prioritization:
Authentication and checkout flows are tested first due to high business impact.

Maintainability-first design:
Common logic (e.g. login) is abstracted into reusable utilities.

Stability over quantity:
Tests avoid brittle selectors and rely on observable user behavior.

Evidence-driven testing:
HTML reports, screenshots, videos, and traces are collected for failed runs.

For more details, see TEST_STRATEGY.md




4. Project Structure

playwright-saucedemo-e2e/
├─ tests/
│  ├─ auth/
│  │  └─ login.spec.ts
│  ├─ inventory/
│  │  └─ sort.spec.ts
│  ├─ cart/
│  │  └─ add-remove.spec.ts
│  └─ checkout/
│     └─ complete-order.spec.ts
├─ utils/
│  └─ auth.ts
├─ playwright.config.ts
├─ TEST_STRATEGY.md
├─ package.json
└─ README.md




5. How to Run Tests
5-1. Install dependencies
bash

npm install

5-2. Install Playwright browsers
bash

npx playwright install

5-3. Run all tests
bash

npx playwright test

5-4. View HTML report
bash

npx playwright show-report




6. Test Evidence & Reporting

HTML reports are generated for every test run

Screenshots, videos, and execution traces are retained only on failure

Reports are designed to be shared with both technical and non-technical stakeholders




7. Why This Project

This project demonstrates:

A realistic QA automation structure aligned with modern Playwright practices

Clear separation between test scenarios and reusable utilities

Risk-based decision making rather than excessive test coverage

Practical E2E testing suitable for long-term maintenance




8. Technology Stack

Language: TypeScript

Test Framework: Playwright Test

Runtime: Node.js

Reporting: Playwright HTML Reporter