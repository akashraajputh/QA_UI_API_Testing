 
export const TEST_CONFIG = {
   
  DEMOQA: {
    BASE_URL: 'https://demoqa.com',
    BOOKS_STORE_URL: 'https://demoqa.com/books',
    TIMEOUT: 30000,
  },

   
  REQRES: {
    BASE_URL: 'https://reqres.in/api',
    TIMEOUT: 10000,
  },

   
  USER: {
    username: 'Akashraajputh',  
    password: '@@Akash350#',  
  },

  
  SELECTORS: {
     
    loginButton: 'button:has-text("Login")',
    usernameInput: 'input[id="userName"]',
    passwordInput: 'input[id="password"]',
    loginSubmitButton: 'button:has-text("Login")',
    logoutButton: 'button:has-text("Logout")',

   
    bookStoreLink: 'text=Book Store Application',
    searchBox: 'input[id="searchBox"]',
    bookTitle: '//span[@role="button"]//a[@href]',
    bookResultTitle: '//a[@href]//span',

   
    pageTitle: '//h1',
    loadingSpinner: '.loading',
  },

 
  TIMEOUTS: {
    SHORT: 5000,
    MEDIUM: 10000,
    LONG: 30000,
    NAVIGATION: 15000,
  },

   
  TEST_BOOK: {
    title: 'Learning JavaScript Design Patterns',
    searchTerm: 'Learning JavaScript Design Patterns',
  },

   
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

   
  REPORT: {
    OUTPUT_DIR: './test-output',
    REPORT_DIR: './playwright-report',
    BOOK_DETAILS_FILE: 'book-details.txt',
    API_REPORT_FILE: 'api-test-report.txt',
  },
};

 
export function formatTestReport(testName, status, details) {
  return `
Test: ${testName}
Status: ${status}
Details: ${JSON.stringify(details, null, 2)}
Timestamp: ${new Date().toISOString()}
`;
}

 
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

 
export function formatAPITestResult(testName, statusCode, data) {
  return {
    testName,
    statusCode,
    data,
    timestamp: new Date().toISOString(),
  };
}

 
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

 
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


export async function getElementText(page, selector) {
  try {
    const element = page.locator(selector);
    return await element.textContent();
  } catch (error) {
    console.error(`Error getting text from ${selector}:`, error);
    return null;
  }
}

 
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

 
export function logProgress(stepNumber, stepName, status = 'SUCCESS') {
  const timestamp = new Date().toLocaleTimeString();
  const statusSymbol = status === 'SUCCESS' ? '✓' : '✗';
  console.log(`[${timestamp}] ${statusSymbol} Step ${stepNumber}: ${stepName}`);
}

export default TEST_CONFIG;
