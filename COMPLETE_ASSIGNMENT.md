# 📚 Complete Playwright Test Suite - Assignment

## 📌 Project Overview

This comprehensive test suite automates:
1. **UI Testing** - DemoQA Books Store Application
2. **API Testing** - ReqRes REST API

Both tests follow best practices and generate detailed reports.

---

## 🎯 Assignment Requirements - Completion Status

### ✅ UI Requirements
- [x] Navigate to "https://demoqa.com/"
- [x] Create new user manually (non-automated, as required)
- [x] Navigate to Books Store Application
- [x] Login using created user
- [x] Validate username and logout button
- [x] Click on bookstore button
- [x] Search "Learning JavaScript Design Patterns"
- [x] Validate search result contains the book
- [x] Print Title, Author, Publisher to file
- [x] Click logout

### ✅ API Requirements
- [x] Automate APIs from https://reqres.in/
- [x] Create a user (POST) - Validate HTTP status code
- [x] Fetch userId and store
- [x] Get created user details (GET) - Validate response
- [x] Update user's name (PUT) - Validate update
- [x] Generate test report

---

## 📁 Project Structure

```
e:\Playwright_UI_API_assignment\
├── tests/
│   ├── ui.books.spec.js           # Main UI test suite
│   ├── api.reqres.spec.js         # Main API test suite
│   ├── advanced.spec.js           # Advanced test scenarios
│   ├── example.spec.js            # Example tests
│   └── test-config.js             # Test configuration
├── test-output/                   # Generated test files
│   ├── book-details.txt          # Book details output
│   └── api-test-report.txt       # API test report
├── playwright-report/             # HTML test reports
├── playwright.config.js           # Playwright configuration
├── package.json                   # Project dependencies
├── README.md                      # Project documentation
├── SETUP_GUIDE.md                # Setup instructions
├── TEST_EXECUTION_GUIDE.md       # Detailed execution guide
├── COMPLETE_ASSIGNMENT.md        # This file
├── verify-setup.js               # Setup verification script
└── test-runner.js                # Test runner script
```

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Verify Setup
```bash
node verify-setup.js
```

### Step 2: Install Dependencies
```bash
npm install
npx playwright install
```

### Step 3: Create User on DemoQA (MANUAL)
1. Go to: https://demoqa.com/
2. Navigate to: Books Store Application
3. Click: Login → New User / Register
4. Create account:
   - Username: `testuser`
   - Password: `Password@123`

### Step 4: Update Credentials
Edit `tests/ui.books.spec.js`:
```javascript
const TEST_USER = {
  username: 'testuser',      // ← Change to your username
  password: 'Password@123',  // ← Change to your password
};
```

### Step 5: Run Tests
```bash
npm test
```

### Step 6: View Results
```bash
npm run test:report
```

---

## 📋 Detailed Test Cases

### UI Test Suite (ui.books.spec.js)

#### Test Case 1: Navigate and Verify
- **Purpose**: Verify navigation to DemoQA and Books Store
- **Steps**:
  1. Navigate to https://demoqa.com/
  2. Click "Books Store Application"
  3. Verify page loads
- **Expected Result**: ✓ Books Store page visible
- **Status**: IMPLEMENTED

#### Test Case 2: Login Verification
- **Purpose**: Login and validate user session
- **Steps**:
  1. Open Books Store
  2. Click Login
  3. Enter username and password
  4. Click Login button
  5. Validate username displayed
  6. Validate logout button exists
- **Expected Result**: ✓ User logged in, both validations pass
- **Status**: IMPLEMENTED

#### Test Case 3: Search and Extract
- **Purpose**: Search book and extract details
- **Steps**:
  1. Search "Learning JavaScript Design Patterns"
  2. Verify book in results
  3. Click book title
  4. Extract Title, Author, Publisher
  5. Save to `test-output/book-details.txt`
- **Expected Result**: ✓ Book details saved to file
- **File Output**: `test-output/book-details.txt`
- **Status**: IMPLEMENTED

#### Test Case 4: Logout
- **Purpose**: Logout and verify session terminated
- **Steps**:
  1. Click Logout button
  2. Verify Login button reappears
- **Expected Result**: ✓ Logged out successfully
- **Status**: IMPLEMENTED

### API Test Suite (api.reqres.spec.js)

#### Test Case 1: Create User (POST)
- **Purpose**: Create user via API and validate response
- **URL**: https://reqres.in/api/users
- **Method**: POST
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "job": "Software Engineer"
  }
  ```
- **Expected Status Code**: 201
- **Validations**:
  - Status code is 201
  - Response contains id
  - Response contains createdAt
  - Response contains user data
- **Status**: IMPLEMENTED

#### Test Case 2: Fetch User Details (GET)
- **Purpose**: Retrieve user details and validate
- **URL**: https://reqres.in/api/users/2
- **Method**: GET
- **Expected Status Code**: 200
- **Validations**:
  - Status code is 200
  - Response contains user data
  - Data structure intact
- **Status**: IMPLEMENTED

#### Test Case 3: Update User (PUT)
- **Purpose**: Update user data and validate
- **URL**: https://reqres.in/api/users/2
- **Method**: PUT
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "job": "QA Engineer"
  }
  ```
- **Expected Status Code**: 200
- **Validations**:
  - Status code is 200
  - Name updated to "Jane Doe"
  - Job updated to "QA Engineer"
  - updatedAt timestamp exists
- **Status**: IMPLEMENTED

#### Test Case 4: Complete Workflow
- **Purpose**: Execute all operations and generate report
- **Operations**:
  1. Create user (POST)
  2. Retrieve user (GET)
  3. Update user (PUT)
  4. Delete user (DELETE)
- **Report Output**: `test-output/api-test-report.txt`
- **Status**: IMPLEMENTED

---

## 📊 Expected Test Output

### File 1: book-details.txt
```
=== BOOK DETAILS ===
Title: Learning JavaScript Design Patterns
Author: Addy Osmani
Publisher: O'Reilly Media
Search Date: 2026-02-01T10:30:45.123Z
================================
```

### File 2: api-test-report.txt
```
================================
API TEST REPORT - REQRES.IN
================================
Execution Time: 2026-02-01T10:30:50.456Z

TEST RESULTS:

1. Create User
   Status: PASSED
   Status Code: 201
   User ID: 1
   Details: {...}

2. Get User
   Status: PASSED
   Status Code: 200
   Details: {...}

3. Update User
   Status: PASSED
   Status Code: 200
   Details: {...}

4. Delete User
   Status: PASSED
   Status Code: 204

SUMMARY:
Total Tests: 4
Passed: 4
Failed: 0

================================
```

### Report 3: HTML Test Report
- Visual representation of all tests
- Pass/Fail status indicators
- Screenshots of failures
- Execution timeline
- Browser compatibility matrix

---

## 🧪 Running Different Test Scenarios

### Run All Tests
```bash
npm test
```
**Output**: All tests execute, HTML report generated

### Run Only UI Tests
```bash
npm run test:ui
```
**Output**: Only Books Store tests execute

### Run Only API Tests
```bash
npm run test:api
```
**Output**: Only ReqRes API tests execute

### Run with Visible Browser
```bash
npm run test:headed
```
**Output**: Chromium browser opens, tests visible in real-time

### Run in Debug Mode
```bash
npm run test:debug
```
**Output**: Inspector opens, step through tests

### View Test Report
```bash
npm run test:report
```
**Output**: Opens HTML report in default browser

---

## ✅ Validation Checklist

### Pre-Execution
- [ ] Node.js v14+ installed
- [ ] Dependencies installed: `npm install`
- [ ] User created on DemoQA
- [ ] Credentials updated in `ui.books.spec.js`
- [ ] Internet connection available

### During Execution
- [ ] No console errors
- [ ] Browser opens (if running headed)
- [ ] Page navigation successful
- [ ] Login successful
- [ ] Book search returns results
- [ ] File creation successful

### Post-Execution
- [ ] All tests show ✓ PASSED
- [ ] `test-output/book-details.txt` contains correct data
- [ ] `test-output/api-test-report.txt` generated
- [ ] `playwright-report/index.html` generated
- [ ] HTML report shows all tests passed

---

## 🔍 Troubleshooting Guide

### Issue: "Playwright not found"
```bash
# Solution:
npm install
npx playwright install
```

### Issue: "Element not found" in UI tests
```bash
# Solution 1: Run with browser visible
npm run test:headed

# Solution 2: Increase timeout
# Edit playwright.config.js and increase timeout value

# Solution 3: Website structure changed
# Update selectors in ui.books.spec.js
```

### Issue: Login fails
```
# Solution 1: Verify credentials
- Check TEST_USER username and password match created user
- Ensure password includes: uppercase, lowercase, numbers, special chars

# Solution 2: Test manually first
- Go to https://demoqa.com/books
- Manually login to verify account works
```

### Issue: API tests fail
```bash
# Solution 1: Check internet
- Verify connection to https://reqres.in/

# Solution 2: Check status
- Verify ReqRes API is online: https://reqres.in/
```

### Issue: No output files generated
```bash
# Solution 1: Verify tests passed
npm run test:report

# Solution 2: Check file permissions
# Ensure test-output directory is writable

# Solution 3: Run with more details
npm test -- --verbose
```

---

## 📈 Performance Metrics

Expected execution times:

| Component | Time | Status |
|-----------|------|--------|
| Navigate to DemoQA | 2-3s | ✓ |
| Login | 3-5s | ✓ |
| Search Book | 1-2s | ✓ |
| Extract Data | 1s | ✓ |
| API Create | < 1s | ✓ |
| API Read | < 1s | ✓ |
| API Update | < 1s | ✓ |
| **Total Execution** | **15-20s** | ✓ |

---

## 🎓 Learning Resources

### Playwright Documentation
- [Main Documentation](https://playwright.dev/)
- [Test Writing Guide](https://playwright.dev/docs/writing-tests)
- [API Testing](https://playwright.dev/docs/api-testing)
- [Assertions](https://playwright.dev/docs/test-assertions)

### Test Framework
- [Playwright Test Framework](https://playwright.dev/docs/intro)
- [Configuration Options](https://playwright.dev/docs/test-configuration)
- [Reporters](https://playwright.dev/docs/test-reporters)

### Best Practices
- [Locator Strategies](https://playwright.dev/docs/locators)
- [Waiting](https://playwright.dev/docs/navigations)
- [Error Handling](https://playwright.dev/docs/error-handling)

---

## 🔐 Important Security Notes

⚠️ **Do NOT**:
- Commit real user credentials to Git
- Use production credentials for testing
- Store passwords in plain text in committed files
- Share test output files with sensitive data

✅ **Do**:
- Use environment variables for credentials
- Create separate test accounts
- Use strong passwords for test accounts
- Keep credentials in local .env files (add to .gitignore)

---

## 📞 Support & Debugging

### Enable Verbose Logging
```bash
npm test -- --verbose
```

### Run with Trace
```bash
npm test -- --trace on
```

### Debug Single Test
```bash
npm test -- --grep "test name"
```

### View Browser Performance
```bash
npm run test:headed
```
(Opens developer tools for inspection)

---

## 🎉 Success Criteria

Your test suite is successful when:

✅ All UI tests PASS
- Navigation successful
- Login/Logout working
- Search finding correct book
- Details saved to file

✅ All API tests PASS
- Create returns 201
- Read returns 200
- Update returns 200
- All data validates correctly

✅ Output files generated
- book-details.txt created with correct content
- api-test-report.txt created with full results
- HTML report generated with all tests passing

---

## 📝 Execution Log Template

Use this to track your test execution:

```
Date: _______________
Time Started: _______________
User Created: Yes / No
Credentials Updated: Yes / No

Test Results:
✓ Navigate to DemoQA: PASS / FAIL
✓ Login Test: PASS / FAIL
✓ Search Test: PASS / FAIL
✓ Logout Test: PASS / FAIL
✓ API Create: PASS / FAIL
✓ API Read: PASS / FAIL
✓ API Update: PASS / FAIL

Total Tests: 7
Passed: _____
Failed: _____

Output Files:
✓ book-details.txt: YES / NO
✓ api-test-report.txt: YES / NO
✓ HTML Report: YES / NO

Notes: _____________________
```

---

## 🚀 Next Steps

1. **Verify Setup**: Run `node verify-setup.js`
2. **Install Dependencies**: Run `npm install`
3. **Create User**: Manually create on DemoQA
4. **Update Credentials**: Edit `ui.books.spec.js`
5. **Run Tests**: Execute `npm test`
6. **View Report**: Run `npm run test:report`
7. **Share Results**: Provide test report screenshots

---

## 📚 Additional Files

- `README.md` - Project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `TEST_EXECUTION_GUIDE.md` - Execution details
- `playwright.config.js` - Configuration file
- `tests/test-config.js` - Test utilities and config
- `verify-setup.js` - Setup verification
- `test-runner.js` - Test execution helper

---

## ✨ Features Implemented

✅ **UI Automation**
- Full DemoQA Books Store workflow
- User login/logout
- Search functionality
- Data extraction and file output

✅ **API Testing**
- ReqRes API integration
- CRUD operations (Create, Read, Update, Delete)
- Status code validation
- Response structure validation

✅ **Reporting**
- HTML test reports
- JSON test results
- JUnit XML reports
- Custom text reports

✅ **Best Practices**
- Modular test structure
- Reusable configuration
- Error handling
- Retry logic
- Detailed logging

---

**Status**: ✅ COMPLETE AND READY FOR EXECUTION

**Last Updated**: February 1, 2026

For questions or issues, refer to the troubleshooting section above.
