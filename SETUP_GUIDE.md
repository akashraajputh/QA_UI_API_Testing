# Setup Instructions

## Step 1: Manual User Creation on DemoQA

Before running the UI tests, you must manually create a user account on DemoQA Books Store:

### Steps to Create User:

1. Open your browser and go to: https://demoqa.com/
2. Look for "Books Store Application" in the left navigation menu
3. Click on "Books Store Application"
4. On the Books Store page, click the "Login" button (top right corner)
5. You'll see a login form with options to register
6. Look for a "New User" or "Register" button and click it
7. Fill in the registration form with:
   - Username: `testuser` (or any username you prefer)
   - Password: `Password@123` (must be strong password - use uppercase, numbers, special chars)
   - Confirm Password: `Password@123`
8. Complete the registration
9. Make note of your username and password

### Update Test Credentials:

Once you've created the user, open `tests/ui.books.spec.js` and update:

```javascript
const TEST_USER = {
  username: 'testuser', // CHANGE THIS to your username
  password: 'Password@123', // CHANGE THIS to your password
};
```

## Step 2: Install Dependencies

```bash
# Navigate to project directory
cd e:\Playwright_UI_API_assignment

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Step 3: Run Tests

### To run ALL tests:
```bash
npm test
```

### To run only UI tests:
```bash
npm run test:ui
```

### To run only API tests:
```bash
npm run test:api
```

### To run tests in headed mode (see browser):
```bash
npm run test:headed
```

## Step 4: View Test Results

After tests complete, view the HTML report:

```bash
npm run test:report
```

The report will open in your default browser showing:
- Test execution summary
- Pass/Fail status
- Screenshots and videos of failures
- Detailed test logs

## Expected Output Files

The tests will create these files in the `test-output/` directory:

1. **book-details.txt** - Contains:
   - Book Title
   - Author
   - Publisher
   - Search Date

2. **api-test-report.txt** - Contains:
   - All API test results
   - Status codes
   - Test summary

## Important Notes

⚠️ **Manual User Creation**: The UI tests require a manually created user. The test will NOT create a new user automatically - you must do this first!

⚠️ **Update Credentials**: Make sure to update the TEST_USER object in ui.books.spec.js with your actual credentials

⚠️ **Website Changes**: If DemoQA website structure changes, you may need to update element selectors in the test file

⚠️ **Internet Connection**: Both UI and API tests require internet connection

## Troubleshooting

### Issue: "Element not found" errors

**Solution**: 
- Wait a few seconds and re-run the tests
- Website may have temporarily changed structure
- Try running with `npm run test:headed` to see what's happening

### Issue: Login fails

**Solution**:
- Verify your username and password in the TEST_USER object
- Check that your password meets DemoQA requirements (uppercase, numbers, special chars)
- Try logging in manually first to ensure the account works

### Issue: No output files created

**Solution**:
- Check that tests passed (look for checkmarks in HTML report)
- Ensure `test-output` directory has write permissions
- Run tests with: `npm run test:api` to verify they execute

### Issue: Browser won't open

**Solution**:
```bash
# Reinstall Playwright browsers
npx playwright install
```

## Test Execution Flow

```
Start Tests
    ↓
Navigate to DemoQA ✓
    ↓
Navigate to Books Store ✓
    ↓
Login with created user ✓
    ↓
Validate username & logout button ✓
    ↓
Search for "Learning JavaScript Design Patterns" ✓
    ↓
Extract & save Title, Author, Publisher to file ✓
    ↓
Logout ✓
    ↓
API Tests (Create, Read, Update, Delete) ✓
    ↓
Generate reports ✓
    ↓
Complete ✓
```

## Next Steps

1. Create user on DemoQA (see Step 1)
2. Update credentials in ui.books.spec.js
3. Install dependencies (see Step 2)
4. Run tests (see Step 3)
5. View results (see Step 4)

For more information, see README.md
