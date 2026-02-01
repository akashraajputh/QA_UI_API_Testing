# Test Execution Summary & Instructions

## 🚀 Quick Start

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Manual User Creation (REQUIRED)**
- Go to: https://demoqa.com/
- Navigate to "Books Store Application"
- Click "Login" → "New User" / "Register"
- Create account:
  - Username: `testuser`
  - Password: `Password@123` (or strong password of your choice)
- Remember your credentials

### 3. **Update Credentials**
Edit `tests/ui.books.spec.js` - Update TEST_USER:
```javascript
const TEST_USER = {
  username: 'testuser', // Your created username
  password: 'Password@123', // Your created password
};
```

### 4. **Run Tests**
```bash
# All tests
npm test

# UI tests only
npm run test:ui

# API tests only
npm run test:api

# With visible browser
npm run test:headed

# View results
npm run test:report
```

---

## 📋 Test Suite Details

### **UI Tests (tests/ui.books.spec.js)**

#### Test 1: Navigate to DemoQA and Books Store
- ✅ Navigates to https://demoqa.com/
- ✅ Verifies DemoQA title
- ✅ Opens Books Store Application
- ✅ Validates page load

**Expected Result**: Books Store page loads successfully

#### Test 2: Login with Created User
- ✅ Opens login page
- ✅ Enters username and password
- ✅ Clicks Login button
- ✅ Validates username is displayed
- ✅ Validates logout button exists

**Expected Result**: User logged in successfully with username visible

#### Test 3: Search and Validate Book
- ✅ Searches for "Learning JavaScript Design Patterns"
- ✅ Waits for results
- ✅ Validates book appears in results
- ✅ Clicks book to view details
- ✅ Extracts: Title, Author, Publisher
- ✅ Saves to `test-output/book-details.txt`

**Expected Result**: Book details successfully saved to file

#### Test 4: Logout
- ✅ Clicks logout button
- ✅ Validates login button reappears
- ✅ Confirms session terminated

**Expected Result**: User logged out successfully

### **API Tests (tests/api.reqres.spec.js)**

#### Test 1: Create User (POST)
- ✅ Sends POST request to `/api/users`
- ✅ Validates status code: **201**
- ✅ Validates response structure
- ✅ Stores user ID

**Expected Result**: HTTP 201 with valid user data

#### Test 2: Fetch User Details (GET)
- ✅ Sends GET request to `/api/users/2`
- ✅ Validates status code: **200**
- ✅ Validates response structure
- ✅ Confirms data integrity

**Expected Result**: HTTP 200 with user data

#### Test 3: Update User (PUT)
- ✅ Sends PUT request to `/api/users/2`
- ✅ Updates name to "Jane Doe"
- ✅ Updates job to "QA Engineer"
- ✅ Validates status code: **200**
- ✅ Confirms updatedAt timestamp

**Expected Result**: HTTP 200 with updated data and timestamp

#### Test 4: Complete Workflow Report
- ✅ Performs all CRUD operations
- ✅ Generates comprehensive report
- ✅ Saves to `test-output/api-test-report.txt`
- ✅ Validates all tests passed

**Expected Result**: Complete test report generated

---

## 📊 Test Output Files

### 1. **test-output/book-details.txt**
```
=== BOOK DETAILS ===
Title: Learning JavaScript Design Patterns
Author: Addy Osmani
Publisher: O'Reilly Media
Search Date: 2026-02-01T10:30:45.123Z
================================
```

### 2. **test-output/api-test-report.txt**
```
================================
API TEST REPORT - REQRES.IN
================================
Execution Time: 2026-02-01T10:30:50.456Z

TEST RESULTS:

1. Create User
   Status: PASSED
   Status Code: 201
   ...

2. Get User
   Status: PASSED
   Status Code: 200
   ...

SUMMARY:
Total Tests: 4
Passed: 4
Failed: 0

================================
```

### 3. **playwright-report/** (HTML Report)
- Visual test results
- Screenshots of failed tests
- Videos of test execution
- Detailed execution timeline
- Browser compatibility results

---

## ✅ Test Validation Checklist

### Before Running Tests:
- [ ] Dependencies installed (`npm install`)
- [ ] User manually created on DemoQA
- [ ] Credentials updated in `ui.books.spec.js`
- [ ] Internet connection available
- [ ] Node.js v14+ installed

### After Running Tests:
- [ ] All tests show ✓ PASSED
- [ ] `test-output/book-details.txt` exists
- [ ] `test-output/api-test-report.txt` exists
- [ ] `playwright-report/index.html` generated
- [ ] No browser errors in console

---

## 🔍 Detailed Test Scenarios

### Scenario 1: Complete UI Workflow
```
1. Open DemoQA → 2. Go to Books Store → 3. Login
   ↓
4. Verify Login → 5. Search Book → 6. View Details
   ↓
7. Extract Data → 8. Save to File → 9. Logout
   ↓
✓ COMPLETE
```

### Scenario 2: Complete API Workflow
```
1. Create User (POST) → 2. Get User (GET) → 3. Update User (PUT)
   ↓
4. Validate Responses → 5. Check Status Codes → 6. Verify Data
   ↓
7. Generate Report → 8. Save Results
   ↓
✓ COMPLETE
```

---

## 🐛 Troubleshooting

### Issue: "Element not found" Error

**Solution**:
```bash
# Run with visible browser to debug
npm run test:headed

# Or run in debug mode
npm run test:debug
```

### Issue: Login Fails

**Solution**:
1. Verify credentials are correct in `ui.books.spec.js`
2. Check password meets requirements: uppercase, numbers, special chars
3. Test login manually on https://demoqa.com/books first

### Issue: No Output Files

**Solution**:
1. Verify tests passed in HTML report: `npm run test:report`
2. Check file permissions on `test-output` directory
3. Run individual tests: `npm run test:ui` or `npm run test:api`

### Issue: Timeout Errors

**Solution**:
```bash
# Increase timeout in playwright.config.js
timeout: 60000 // 60 seconds

# Then re-run tests
npm test
```

### Issue: Network Errors

**Solution**:
- Check internet connection
- Verify websites are accessible:
  - https://demoqa.com/
  - https://reqres.in/
- Try again after a few seconds

---

## 📈 Performance Benchmarks

| Operation | Expected Time | Actual Time |
|-----------|---------------|------------|
| Navigate to DemoQA | < 3s | _______ |
| Login Process | < 5s | _______ |
| Search Book | < 2s | _______ |
| API Create User | < 1s | _______ |
| API Get User | < 1s | _______ |
| API Update User | < 1s | _______ |
| Generate Report | < 5s | _______ |

---

## 🎯 Test Coverage Summary

### UI Testing:
- ✅ Navigation
- ✅ Login/Logout
- ✅ Search functionality
- ✅ Data extraction
- ✅ File I/O operations
- ✅ Element validation

### API Testing:
- ✅ POST requests (Create)
- ✅ GET requests (Read)
- ✅ PUT requests (Update)
- ✅ Status code validation
- ✅ Response structure validation
- ✅ Data integrity checks

### Advanced Features:
- ✅ HTML test reports
- ✅ Screenshot capture
- ✅ Video recording
- ✅ Trace files
- ✅ Multiple browser support

---

## 🔐 Security Notes

⚠️ **Important**: 
- Keep credentials secure
- Don't commit real passwords to git
- Use environment variables for sensitive data
- Test accounts should be separate from production

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [DemoQA Website](https://demoqa.com/)
- [ReqRes API](https://reqres.in/)
- [Playwright Selectors Guide](https://playwright.dev/docs/selectors)
- [Assertion Reference](https://playwright.dev/docs/test-assertions)

---

## ✨ Summary

This test suite provides:
- ✅ Complete UI automation for Books Store
- ✅ Comprehensive API testing
- ✅ Detailed test reports
- ✅ File output for book details
- ✅ Error handling and retries
- ✅ Multiple browser support
- ✅ Best practices implementation

**Ready to run!** Follow the Quick Start section above.

---

**Last Updated**: February 1, 2026  
**Status**: Ready for Execution
