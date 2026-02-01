import { test, expect } from '@playwright/test';

/**
 * This file contains additional test cases and examples
 * These tests demonstrate Playwright best practices
 */

test.describe('DemoQA Books Store - Advanced Scenarios', () => {
  // Setup test context
  test.beforeEach(async ({ page }) => {
    // Common setup before each test
    await page.goto('https://demoqa.com/');
  });

  test('Navigate to Books Store and verify UI elements', async ({ page }) => {
    // Navigate to Books Store
    const booksStoreLink = page.locator('text=Book Store Application');
    await booksStoreLink.click();
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Verify page title contains Books Store
    const pageTitle = page.locator('//h1[contains(text(), "Book Store")]');
    await expect(pageTitle).toBeVisible();
  });

  test('Verify Books Store has search functionality', async ({ page }) => {
    await page.goto('https://demoqa.com/books');
    
    // Check for search box presence
    const searchBox = page.locator('input[id="searchBox"]');
    await expect(searchBox).toBeVisible();
    
    // Verify search box is enabled
    await expect(searchBox).toBeEnabled();
  });

  test('Verify login form elements', async ({ page }) => {
    await page.goto('https://demoqa.com/books');
    
    // Click login button
    await page.locator('button:has-text("Login")').click();
    
    // Wait for login form
    await page.waitForSelector('input[id="userName"]');
    
    // Verify form fields exist
    const usernameField = page.locator('input[id="userName"]');
    const passwordField = page.locator('input[id="password"]');
    const loginBtn = page.locator('button:has-text("Login")');
    
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(loginBtn).toBeVisible();
  });
});

test.describe('ReqRes API - Advanced Scenarios', () => {
  const API_BASE_URL = 'https://reqres.in/api';

  test('Validate API response headers', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users/1`);
    
    // Check response headers
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.status()).toBe(200);
  });

  test('Verify API error handling with invalid user', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users/99999`, {
      // Don't throw on error status
    });
    
    // Invalid user should return 404
    expect(response.status()).toBe(404);
  });

  test('Test API pagination', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users?page=2`);
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    
    // Verify pagination data exists
    expect(data).toHaveProperty('page');
    expect(data).toHaveProperty('per_page');
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('data');
    expect(Array.isArray(data.data)).toBe(true);
  });

  test('Test concurrent API requests', async ({ request }) => {
    // Make multiple requests concurrently
    const requests = [
      request.get(`${API_BASE_URL}/users/1`),
      request.get(`${API_BASE_URL}/users/2`),
      request.get(`${API_BASE_URL}/users/3`),
    ];
    
    const responses = await Promise.all(requests);
    
    // All requests should succeed
    responses.forEach((response) => {
      expect(response.status()).toBe(200);
    });
  });

  test('Validate user data structure', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users/1`);
    const data = await response.json();
    
    // User object should have these properties
    expect(data.data).toHaveProperty('id');
    expect(data.data).toHaveProperty('email');
    expect(data.data).toHaveProperty('first_name');
    expect(data.data).toHaveProperty('last_name');
    expect(data.data).toHaveProperty('avatar');
    
    // Validate data types
    expect(typeof data.data.id).toBe('number');
    expect(typeof data.data.email).toBe('string');
    expect(typeof data.data.first_name).toBe('string');
    expect(typeof data.data.last_name).toBe('string');
    expect(typeof data.data.avatar).toBe('string');
  });

  test('Verify email format in API response', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users/1`);
    const data = await response.json();
    
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(data.data.email).toMatch(emailRegex);
  });
});

test.describe('Performance Tests', () => {
  test('Measure page load time for Books Store', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('https://demoqa.com/books');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
    console.log(`Books Store page loaded in ${loadTime}ms`);
  });

  test('Measure API response time', async ({ request }) => {
    const startTime = Date.now();
    
    await request.get('https://reqres.in/api/users?page=1');
    
    const responseTime = Date.now() - startTime;
    
    // API should respond within 2 seconds
    expect(responseTime).toBeLessThan(2000);
    console.log(`API response time: ${responseTime}ms`);
  });
});
