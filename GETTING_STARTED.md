# 🚀 GETTING STARTED - Quick Reference

**⏱️ Total Setup Time: ~30 minutes**

---

## 📋 Step-by-Step Instructions

### STEP 1️⃣: VERIFY YOUR SYSTEM (2 minutes)

Open PowerShell and run:

```powershell
cd e:\Playwright_UI_API_assignment
node verify-setup.js
```

**Expected output**: ✓ All checks passed!

If checks fail, install:
- Node.js from https://nodejs.org/ (v14+)
- npm comes with Node.js

---

### STEP 2️⃣: INSTALL DEPENDENCIES (5 minutes)

```powershell
npm install
npx playwright install
```

**Wait for completion** - this downloads Playwright browsers (~300MB)

✅ When done, you'll see:
```
added X packages in Xms
```

---

### STEP 3️⃣: CREATE USER ON DEMOQA (5 minutes) ⚠️ MANUAL STEP

**IMPORTANT**: This cannot be automated - you must do this manually!

1. **Open browser** → Go to: https://demoqa.com/
2. **Click** "Books Store Application" (left menu)
3. **Click** "Login" button (top right)
4. **Look for** "New User" or "Register" link
5. **Fill form**:
   - Username: `testuser`
   - Password: `Password@123`
   - Confirm Password: `Password@123`
6. **Complete registration**
7. **Note your credentials** - you'll need them next

---

### STEP 4️⃣: UPDATE TEST CREDENTIALS (3 minutes)

**Open file**: `tests/ui.books.spec.js`

**Find this line** (around line 3-7):
```javascript
const TEST_USER = {
  username: 'testuser',      // ← Change if needed
  password: 'Password@123',  // ← Change if needed
};
```

**Update with YOUR credentials from Step 3:**
- If you used `testuser` and `Password@123`, no changes needed ✓
- Otherwise, replace with your actual credentials

**Save file** (Ctrl+S)

---

### STEP 5️⃣: RUN THE TESTS (20 seconds)

```powershell
npm test
```

**Expected output**:
```
✓ 4 tests in ui.books.spec.js
✓ 4 tests in api.reqres.spec.js

8 passed (15-20s)
```

---

### STEP 6️⃣: VIEW RESULTS (1 minute)

```powershell
npm run test:report
```

**This opens an HTML report in your browser** showing:
- ✓ All tests passed
- Screenshots of each step
- Execution timeline
- Detailed logs

---

### STEP 7️⃣: CHECK OUTPUT FILES (1 minute)

Two files created in `test-output/` folder:

#### File 1: book-details.txt
```
=== BOOK DETAILS ===
Title: Learning JavaScript Design Patterns
Author: Addy Osmani
Publisher: O'Reilly Media
Search Date: 2026-02-01T...
```

#### File 2: api-test-report.txt
```
================================
API TEST REPORT - REQRES.IN
================================
...full API test results...
```

---

## ✅ Verification Checklist

Run through this checklist to verify everything works:

- [ ] `node verify-setup.js` shows all ✓
- [ ] `npm install` completed successfully
- [ ] User created on DemoQA
- [ ] TEST_USER updated in ui.books.spec.js
- [ ] `npm test` shows: `8 passed`
- [ ] `npm run test:report` opens browser
- [ ] `test-output/book-details.txt` contains book data
- [ ] `test-output/api-test-report.txt` contains API results

**All checked?** ✅ You're done!

---

## 🔍 Quick Troubleshooting

### ❌ Error: "node: command not found"
**Fix**: Install Node.js from https://nodejs.org/

### ❌ Error: "Element not found"
**Fix**: Run with browser visible:
```powershell
npm run test:headed
```

### ❌ Error: "Login failed"
**Fix**: Verify credentials:
1. Check TEST_USER in `ui.books.spec.js`
2. Test login manually on https://demoqa.com/books

### ❌ Error: "No output files"
**Fix**: Check that tests passed:
```powershell
npm run test:report
```

### ❌ Error: Tests timeout
**Fix**: Increase timeout in `playwright.config.js`:
```javascript
timeout: 60000  // 60 seconds
```

---

## 📊 What Gets Tested

### UI Tests (DemoQA Books Store)
✅ Navigation  
✅ User Login  
✅ Book Search  
✅ Data Extraction  
✅ User Logout  

### API Tests (ReqRes API)
✅ Create User (POST)  
✅ Read User (GET)  
✅ Update User (PUT)  
✅ Delete User (DELETE)  

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `tests/ui.books.spec.js` | UI test code |
| `tests/api.reqres.spec.js` | API test code |
| `playwright.config.js` | Test configuration |
| `package.json` | Dependencies & scripts |
| `test-output/book-details.txt` | Book details output |
| `test-output/api-test-report.txt` | API test report |

---

## 📖 Read These Files for More Details

| File | When to Read |
|------|--------------|
| README.md | Project overview |
| SETUP_GUIDE.md | Detailed setup help |
| TEST_EXECUTION_GUIDE.md | Advanced execution options |
| COMPLETE_ASSIGNMENT.md | Full requirements checklist |
| PROJECT_INDEX.md | Complete file listing |

---

## 🎮 Common Commands

```powershell
# Run all tests
npm test

# Run only UI tests
npm run test:ui

# Run only API tests
npm run test:api

# Run with browser visible
npm run test:headed

# Run in debug mode (step through tests)
npm run test:debug

# View test report
npm run test:report

# Verify setup
node verify-setup.js
```

---

## ⏰ Time Estimates

| Task | Time |
|------|------|
| Step 1: Verify system | 2 min |
| Step 2: Install dependencies | 5 min |
| Step 3: Create user on DemoQA | 5 min |
| Step 4: Update credentials | 3 min |
| Step 5: Run tests | < 1 min |
| Step 6: View results | 1 min |
| Step 7: Check output files | 1 min |
| **Total** | **~20 min** |

---

## 🎯 Success Criteria

✅ **You succeeded when:**

1. All tests show `✓ PASSED`
2. Both output files exist:
   - `test-output/book-details.txt`
   - `test-output/api-test-report.txt`
3. HTML report opens in browser
4. Book details contain:
   - Title: Learning JavaScript Design Patterns
   - Author name
   - Publisher name
5. API report shows 4 tests passed

---

## 📞 If You Get Stuck

1. **Check:** [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. **Check:** [TEST_EXECUTION_GUIDE.md](TEST_EXECUTION_GUIDE.md) - Troubleshooting section
3. **Run:** `npm run test:headed` - to see browser window
4. **Run:** `npm run test:debug` - to step through tests
5. **Check:** HTML report - `npm run test:report`

---

## ✨ Final Notes

- 🔒 **Security**: Don't share your test credentials
- 📝 **Credentials**: Update TEST_USER with YOUR actual username/password
- 🌐 **Internet**: Required for DemoQA and ReqRes tests
- ⏱️ **Timing**: Tests take 15-20 seconds to run
- 📊 **Reports**: HTML report is most detailed

---

## 🚀 Ready?

**Run this command to start:**

```powershell
cd e:\Playwright_UI_API_assignment
npm test
```

**Then run this to see results:**

```powershell
npm run test:report
```

---

**Last Updated**: February 1, 2026  
**Status**: ✅ READY TO RUN

Good luck! 🎉
