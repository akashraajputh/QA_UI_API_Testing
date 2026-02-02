# Playwright UI & API Test Assignment

This project contains automated tests for both UI and API using Playwright.

## Project Structure

```
├── tests/
│   ├── ui.books.spec.js       - DemoQA Books Store UI Tests
│   ├── api.reqres.spec.js     - ReqRes API Tests
│   └── example.spec.js        - Example test file
├── playwright.config.js       - Playwright configuration
├── package.json              - Project dependencies
└── README.md                 - This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

```bash
npm install
# or
npx playwright install
```

## Test Credentials

### DemoQA Books Store (UI Tests)

Before running UI tests, you need to manually create a user on DemoQA:

1. Go to https://demoqa.com/
2. Navigate to Books Store Application
3. Click on Register
4. Create a new user with:
   - Username: `testuser` (or change in ui.books.spec.js)
   - Password: `Password@123` (or change in ui.books.spec.js)

**Update the TEST_USER credentials in `tests/ui.books.spec.js` with your created user details.**

## Running Tests

### Run all tests
```bash
npm test
```

### Run UI tests only
```bash
npm run test:ui
```

### Run API tests only
```bash
npm run test:api
```

### Run tests with browser visible
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### View test report
```bash
npm run test:report
```

## Test Coverage

### UI Tests (DemoQA Books Store)

1. **Navigate to DemoQA and Books Store**
   - Navigates to https://demoqa.com/
   - Opens Books Store Application

2. **Login with created user and validate**
   - Logs in with manually created user
   - Validates username is displayed
   - Validates logout button is visible

3. **Search for book and validate result**
   - Searches for "Learning JavaScript Design Patterns"
   - Validates search result contains the book
   - Extracts and writes Title, Author, Publisher to file

4. **Logout from Books Store**
   - Clicks logout button
   - Validates successful logout

### API Tests (ReqRes - https://reqres.in/)

1. **Create a new user and validate response**
   - POST request to create user
   - Validates HTTP status code (201)
   - Validates response structure

2. **Fetch and validate created user details**
   - GET request to retrieve user
   - Validates HTTP status code (200)
   - Validates data structure

3. **Update user name and validate response**
   - PUT request to update user
   - Validates HTTP status code (200)
   - Validates updated data

4. **Complete API test workflow with report**
   - Creates, reads, updates, and deletes user
   - Generates comprehensive test report

## Output Files

After running tests, the following files are generated:

- `test-output/book-details.txt` - Contains book details (Title, Author, Publisher)
- `test-output/api-test-report.txt` - Contains API test results
- `playwright-report/` - HTML test report (open with `npm run test:report`)

## Key Features

✅ Complete UI automation for Books Store  
✅ API testing with validation  
✅ Automatic file generation for test results  
✅ HTML test report generation  
✅ Support for multiple browsers (Chromium, Firefox, WebKit)  
✅ Detailed logging and assertions  

## Troubleshooting

### Tests fail to run

1. Ensure Playwright is installed: `npx playwright install`
2. Check internet connection for website tests
3. Update user credentials in ui.books.spec.js

### No results in output files

1. Check that `test-output` directory has write permissions
2. Verify tests ran successfully by checking console output
3. View detailed report: `npm run test:report`

### Browser-related errors

1. Try running with `npm run test:headed` to see browser window
2. Add delays if elements load slowly: `page.waitForTimeout(2000)`
3. Update selectors if website structure changed

## Configuration

Edit `playwright.config.js` to customize:
- Browser types and configurations
- Test timeout
- Retry behavior
- Reporter options
- Base URL (if needed)

## Notes

- UI tests require manual user creation on DemoQA
- API tests use ReqRes public API (no real users created)
- All test output is written to `test-output/` directory
- HTML reports are generated automatically in `playwright-report/`

## Author

Playwright Test Suite - Akash Kumar Singh
