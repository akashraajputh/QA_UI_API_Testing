#!/usr/bin/env node

/**
 * Setup Verification Script
 * Verifies that the Playwright test suite is properly configured
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const checks = [];

function addCheck(name, condition, message) {
  checks.push({
    name,
    status: condition ? '✓' : '✗',
    message,
    passed: condition,
  });
}

function runChecks() {
  console.log('🔍 Performing Setup Verification...\n');

  // Check 1: Node.js version
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf-8' }).trim();
    const isValidVersion = parseInt(nodeVersion.slice(1).split('.')[0]) >= 14;
    addCheck('Node.js Version', isValidVersion, `Found: ${nodeVersion}`);
  } catch (error) {
    addCheck('Node.js Version', false, 'Node.js not found');
  }

  // Check 2: npm installed
  try {
    execSync('npm --version', { encoding: 'utf-8' });
    addCheck('npm', true, 'npm is installed');
  } catch (error) {
    addCheck('npm', false, 'npm not found');
  }

  // Check 3: package.json exists
  const packageJsonExists = existsSync('package.json');
  addCheck('package.json', packageJsonExists, packageJsonExists ? 'Found' : 'Not found');

  // Check 4: Playwright installed
  try {
    require.resolve('@playwright/test');
    addCheck('Playwright', true, '@playwright/test installed');
  } catch (error) {
    addCheck(
      'Playwright',
      false,
      '@playwright/test not installed - run: npm install'
    );
  }

  // Check 5: playwright.config.js exists
  const configExists = existsSync('playwright.config.js');
  addCheck('playwright.config.js', configExists, configExists ? 'Found' : 'Not found');

  // Check 6: Test files exist
  const uiTestExists = existsSync('tests/ui.books.spec.js');
  const apiTestExists = existsSync('tests/api.reqres.spec.js');
  addCheck('UI Tests', uiTestExists, uiTestExists ? 'tests/ui.books.spec.js found' : 'Not found');
  addCheck('API Tests', apiTestExists, apiTestExists ? 'tests/api.reqres.spec.js found' : 'Not found');

  // Check 7: Test credentials configured
  if (uiTestExists) {
    try {
      const uiTestContent = readFileSync('tests/ui.books.spec.js', 'utf-8');
      const hasTestUser = uiTestContent.includes('TEST_USER');
      addCheck(
        'Test User Configuration',
        hasTestUser,
        hasTestUser ? 'TEST_USER found in ui.books.spec.js' : 'TEST_USER not configured'
      );
    } catch (error) {
      addCheck('Test User Configuration', false, 'Error reading test file');
    }
  }

  // Check 8: Documentation files exist
  const readmeExists = existsSync('README.md');
  const setupGuideExists = existsSync('SETUP_GUIDE.md');
  addCheck('README.md', readmeExists, readmeExists ? 'Found' : 'Not found');
  addCheck('SETUP_GUIDE.md', setupGuideExists, setupGuideExists ? 'Found' : 'Not found');

  // Check 9: Test scripts configured
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
    const hasTestScripts =
      packageJson.scripts && packageJson.scripts.test && packageJson.scripts['test:ui'];
    addCheck('Test Scripts', hasTestScripts, hasTestScripts ? 'npm test scripts configured' : 'Scripts not configured');
  } catch (error) {
    addCheck('Test Scripts', false, 'Error reading package.json');
  }

  // Display results
  console.log('📋 Verification Results:\n');

  let passedCount = 0;
  checks.forEach((check) => {
    console.log(`${check.status} ${check.name.padEnd(25)} - ${check.message}`);
    if (check.passed) passedCount++;
  });

  console.log(`\n📊 Summary: ${passedCount}/${checks.length} checks passed\n`);

  // Overall status
  const allPassed = checks.every((c) => c.passed);

  if (allPassed) {
    console.log('✅ All checks passed! Ready to run tests.\n');
    console.log('Next steps:');
    console.log('1. Create a user manually on https://demoqa.com/');
    console.log('2. Update TEST_USER credentials in tests/ui.books.spec.js');
    console.log('3. Run: npm test\n');
  } else {
    console.log('⚠️  Some checks failed. Please fix the issues above.\n');
    console.log('Common fixes:');
    console.log('- Install Node.js v14+: https://nodejs.org/');
    console.log('- Install dependencies: npm install');
    console.log('- Install Playwright browsers: npx playwright install\n');
  }

  return allPassed;
}

function printHelp() {
  console.log(`
Playwright Setup Verification

This script checks if your Playwright environment is properly configured.

Usage: node verify-setup.js

Checks performed:
✓ Node.js version (v14+)
✓ npm installation
✓ package.json configuration
✓ Playwright installation
✓ Test files existence
✓ Configuration files
✓ Documentation files
✓ Test scripts setup

If all checks pass, you're ready to run the tests!
  `);
}

// Main execution
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  printHelp();
} else {
  const success = runChecks();
  process.exit(success ? 0 : 1);
}
