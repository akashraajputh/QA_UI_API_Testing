import { test, expect } from '@playwright/test';

test.describe('DemoQA Books Store - Advanced Scenarios', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://demoqa.com/');
  });

  test('Navigate to Books Store and verify UI elements', async ({ page }) => {

    const booksStoreLink = page.locator('text=Book Store Application');
    await booksStoreLink.click();


    await page.waitForLoadState('networkidle');

   
    const pageTitle = page.locator('//h1[contains(text(), "Book Store")]');
    await expect(pageTitle).toBeVisible();
  });

  test('Verify Books Store has search functionality', async ({ page }) => {
    await page.goto('https://demoqa.com/books');

    
    const searchBox = page.locator('input[id="searchBox"]');
    await expect(searchBox).toBeVisible();

    
    await expect(searchBox).toBeEnabled();
  });

  test('Verify login form elements', async ({ page }) => {
    await page.goto('https://demoqa.com/books');

     
    await page.locator('button:has-text("Login")').click();

     
    await page.waitForSelector('input[id="userName"]');

     
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

     
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.status()).toBe(200);
  });

  test('Verify API error handling with invalid user', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users/99999`, {
      
    });
   
    expect(response.status()).toBe(404);
  });

  test('Test API pagination', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users?page=2`);

    expect(response.status()).toBe(200);
    const data = await response.json();

    
    expect(data).toHaveProperty('page');
    expect(data).toHaveProperty('per_page');
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('data');
    expect(Array.isArray(data.data)).toBe(true);
  });

  test('Test concurrent API requests', async ({ request }) => {
     
    const requests = [
      request.get(`${API_BASE_URL}/users/1`),
      request.get(`${API_BASE_URL}/users/2`),
      request.get(`${API_BASE_URL}/users/3`),
    ];

    const responses = await Promise.all(requests);

     
    responses.forEach((response) => {
      expect(response.status()).toBe(200);
    });
  });

  test('Validate user data structure', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users/1`);
    const data = await response.json();

    
    expect(data.data).toHaveProperty('id');
    expect(data.data).toHaveProperty('email');
    expect(data.data).toHaveProperty('first_name');
    expect(data.data).toHaveProperty('last_name');
    expect(data.data).toHaveProperty('avatar');

  
    expect(typeof data.data.id).toBe('number');
    expect(typeof data.data.email).toBe('string');
    expect(typeof data.data.first_name).toBe('string');
    expect(typeof data.data.last_name).toBe('string');
    expect(typeof data.data.avatar).toBe('string');
  });

  test('Verify email format in API response', async ({ request }) => {
    const response = await request.get(`${API_BASE_URL}/users/1`);
    const data = await response.json();

     
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

     
    expect(loadTime).toBeLessThan(5000);
    console.log(`Books Store page loaded in ${loadTime}ms`);
  });

  test('Measure API response time', async ({ request }) => {
    const startTime = Date.now();

    await request.get('https://reqres.in/api/users?page=1');

    const responseTime = Date.now() - startTime;

     
    expect(responseTime).toBeLessThan(2000);
    console.log(`API response time: ${responseTime}ms`);
  });
});
