#!/usr/bin/env node

/**
 * Test Runner Script
 * This script helps run Playwright tests with proper configuration
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function ensureOutputDirectory() {
  const outputDir = path.join(process.cwd(), 'test-output');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
    console.log(`✓ Created output directory: ${outputDir}`);
  }
}

function runTests(testType) {
  console.log('\n========================================');
  console.log(`Running ${testType} Tests`);
  console.log('========================================\n');

  try {
    let command = 'playwright test';

    switch (testType.toLowerCase()) {
      case 'ui':
        command += ' tests/ui.books.spec.js';
        break;
      case 'api':
        command += ' tests/api.reqres.spec.js';
        break;
      case 'all':
        command += '';
        break;
      default:
        console.error(`Unknown test type: ${testType}`);
        process.exit(1);
    }

    if (process.env.HEADED === 'true') {
      command += ' --headed';
    }

    if (process.env.DEBUG === 'true') {
      command += ' --debug';
    }

    execSync(command, { stdio: 'inherit' });
    console.log(`\n✓ ${testType} tests completed successfully!`);
  } catch (error) {
    console.error(`✗ ${testType} tests failed!`);
    console.error(error.message);
    process.exit(1);
  }
}

function showReport() {
  console.log('\nOpening test report...');
  try {
    execSync('playwright show-report', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to open report:', error.message);
  }
}

function printHelp() {
  console.log(`
Playwright Test Runner

Usage: node test-runner.js [command] [options]

Commands:
  ui              Run UI tests only
  api             Run API tests only
  all             Run all tests (default)
  report          Open test report
  help            Show this help message

Options:
  HEADED=true     Run tests with browser visible
  DEBUG=true      Run in debug mode

Examples:
  npm test                     # Run all tests
  npm run test:ui             # Run UI tests
  npm run test:api            # Run API tests
  npm run test:headed         # Run with visible browser
  npm run test:debug          # Run in debug mode
  npm run test:report         # View test report

Before running UI tests:
  1. Create a user manually on https://demoqa.com/
  2. Update TEST_USER credentials in tests/ui.books.spec.js
  3. Run tests
  `);
}

// Main execution
const args = process.argv.slice(2);
const command = args[0]?.toLowerCase() || 'all';

ensureOutputDirectory();

switch (command) {
  case 'ui':
    runTests('UI');
    break;
  case 'api':
    runTests('API');
    break;
  case 'all':
    runTests('ALL');
    break;
  case 'report':
    showReport();
    break;
  case 'help':
  case '-h':
  case '--help':
    printHelp();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}
