/**
 * Test Configuration and Utilities
 * Centralized configuration for all tests
 */

export const TEST_CONFIG = {
  // DemoQA Configuration
  DEMOQA: {
    BASE_URL: 'https://demoqa.com',
    BOOKS_STORE_URL: 'https://demoqa.com/books',
    TIMEOUT: 30000,
  },

  // ReqRes API Configuration
  REQRES: {
    BASE_URL: 'https://reqres.in/api',
    TIMEOUT: 10000,
  },

  // Test User - UPDATE THESE WITH YOUR ACTUAL CREDENTIALS
  USER: {
    username: 'Akashraajputh', // Change to your created username
    password: '@@Akash350#', // Change to your created password
  },

  // Selectors for DemoQA Books Store
  SELECTORS: {
    // Login
    loginButton: 'button:has-text("Login")',
    usernameInput: 'input[id="userName"]',
    passwordInput: 'input[id="password"]',
    loginSubmitButton: 'button:has-text("Login")',
    logoutButton: 'button:has-text("Logout")',

    // Books Store
    bookStoreLink: 'text=Book Store Application',
    searchBox: 'input[id="searchBox"]',
    bookTitle: '//span[@role="button"]//a[@href]',
    bookResultTitle: '//a[@href]//span',

    // Generic
    pageTitle: '//h1',
    loadingSpinner: '.loading',
  },

  // Timeouts
  TIMEOUTS: {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
    NAVIGATION: 15000,
  },

  // Test Data
  TEST_BOOK: {
    title: 'Learning JavaScript Design Patterns',
    searchTerm: 'Learning JavaScript Design Patterns',
  },

  // API Test Data
  API_TEST_DATA: {
    newUser: {
      name: 'John Doe',
      job: 'Software Engineer',
    },
    updatedUser: {
      name: 'Jane Doe',
      job: 'QA Engineer',
    },
  },

  // Report Configuration
  REPORT: {
    OUTPUT_DIR: './test-output',
    REPORT_DIR: './playwright-report',
    BOOK_DETAILS_FILE: 'book-details.txt',
    API_REPORT_FILE: 'api-test-report.txt',
  },
};

/**
 * Utility function to format test report
 */
export function formatTestReport(testName, status, details) {
  return `
Test: ${testName}
Status: ${status}
Details: ${JSON.stringify(details, null, 2)}
Timestamp: ${new Date().toISOString()}
`;
}

/**
 * Utility function to format book details
 */
export function formatBookDetails(title, author, publisher) {
  return `
=== BOOK DETAILS ===
Title: ${title}
Author: ${author}
Publisher: ${publisher}
Retrieved: ${new Date().toISOString()}
================================
`;
}

/**
 * Utility function to format API test result
 */
export function formatAPITestResult(testName, statusCode, data) {
  return {
    testName,
    statusCode,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Utility function to validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Utility function to wait for element with retry
 */
export async function waitForElementWithRetry(
  page,
  selector,
  maxRetries = 3,
  delay = 1000
) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const element = page.locator(selector);
      await element.waitFor({ timeout: delay });
      return element;
    } catch (error) {
      if (i === maxRetries - 1) {
        throw new Error(`Element ${selector} not found after ${maxRetries} retries`);
      }
      await page.waitForTimeout(delay);
    }
  }
}

/**
 * Utility function to extract text from element
 */
export async function getElementText(page, selector) {
  try {
    const element = page.locator(selector);
    return await element.textContent();
  } catch (error) {
    console.error(`Error getting text from ${selector}:`, error);
    return null;
  }
}

/**
 * Utility function for safe API request
 */
export async function safeAPIRequest(requestFn, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

/**
 * Utility function to log test progress
 */
export function logProgress(stepNumber, stepName, status = 'SUCCESS') {
  const timestamp = new Date().toLocaleTimeString();
  const statusSymbol = status === 'SUCCESS' ? '✓' : '✗';
  console.log(`[${timestamp}] ${statusSymbol} Step ${stepNumber}: ${stepName}`);
}

export default TEST_CONFIG;
