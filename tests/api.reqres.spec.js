import { test, expect, APIRequestContext } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const API_BASE_URL = 'https://reqres.in/api';

test.describe('ReqRes API Tests', () => {
  let userId;
  let createdUser;

  test('Create a new user and validate response', async ({ playwright }) => {
    // Create a new request context with proper headers
    const context = await playwright.request.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    try {
      const newUser = {
        name: 'John Doe',
        job: 'Software Engineer',
      };

      const response = await context.post('/users', {
        data: newUser,
      });

      // Validate response status code
      expect(response.status()).toBe(201);

      const responseBody = await response.json();
      console.log('Create User Response:', responseBody);

      // Validate response structure
      expect(responseBody).toHaveProperty('name', newUser.name);
      expect(responseBody).toHaveProperty('job', newUser.job);
      expect(responseBody).toHaveProperty('id');
      expect(responseBody).toHaveProperty('createdAt');

      // Store userId for next test
      userId = responseBody.id;
      createdUser = responseBody;

      console.log(`User created successfully with ID: ${userId}`);
    } finally {
      await context.dispose();
    }
  });

  test('Fetch and validate created user details', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    try {
      // Fetch user from the list (using ReqRes predefined users since POST creates local data)
      const response = await context.get('/users/2');

      // Validate response status code
      expect(response.status()).toBe(200);

      const responseBody = await response.json();
      console.log('Fetch User Response:', responseBody);

      // Validate response structure
      expect(responseBody.data).toHaveProperty('id');
      expect(responseBody.data).toHaveProperty('email');
      expect(responseBody.data).toHaveProperty('first_name');
      expect(responseBody.data).toHaveProperty('last_name');
      expect(responseBody.data).toHaveProperty('avatar');

      // Validate data integrity
      expect(responseBody.data.id).toEqual(2);
      expect(responseBody.data).toBeTruthy();
    } finally {
      await context.dispose();
    }
  });

  test('Update user name and validate response', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    try {
      const targetUserId = 2; // Using a predefined user for update
      const updatedData = {
        name: 'Jane Doe',
      job: 'QA Engineer',
      };

      const response = await context.put(`/users/${targetUserId}`, {
        data: updatedData,
      });

      // Validate response status code
      expect(response.status()).toBe(200);

      const responseBody = await response.json();
      console.log('Update User Response:', responseBody);

      // Validate the updated data
      expect(responseBody).toHaveProperty('name', updatedData.name);
      expect(responseBody).toHaveProperty('job', updatedData.job);
      expect(responseBody).toHaveProperty('updatedAt');

      // Validate that updatedAt field exists and is a valid timestamp
      const updatedAtDate = new Date(responseBody.updatedAt);
      expect(updatedAtDate.getTime()).toBeGreaterThan(0);

      console.log('User updated successfully');
    } finally {
      await context.dispose();
    }
  });

  test('Complete API test workflow with report generation', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: API_BASE_URL,
      extraHTTPHeaders: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    try {
      const testResults = {
        timestamp: new Date().toISOString(),
        tests: [],
      };

      // Test 1: Create User
      try {
        const newUser = {
          name: 'Test User',
          job: 'Test Engineer',
        };

        const createResponse = await context.post('/users', {
          data: newUser,
        });

        const createStatus = createResponse.status();
        const createData = await createResponse.json();

        testResults.tests.push({
          testName: 'Create User',
          status: createStatus === 201 ? 'PASSED' : 'FAILED',
          statusCode: createStatus,
          userId: createData.id,
          details: createData,
        });

        // Test 2: Get User
        const getResponse = await context.get('/users/1');
        const getStatus = getResponse.status();
        const getData = await getResponse.json();

        testResults.tests.push({
          testName: 'Get User',
          status: getStatus === 200 ? 'PASSED' : 'FAILED',
          statusCode: getStatus,
          details: getData,
        });

        // Test 3: Update User
        const updateResponse = await context.put('/users/1', {
          data: {
            name: 'Updated Test User',
            job: 'Senior Engineer',
          },
        });

        const updateStatus = updateResponse.status();
        const updateData = await updateResponse.json();

        testResults.tests.push({
          testName: 'Update User',
          status: updateStatus === 200 ? 'PASSED' : 'FAILED',
          statusCode: updateStatus,
          details: updateData,
        });

        // Test 4: Delete User
        const deleteResponse = await context.delete('/users/1');
        const deleteStatus = deleteResponse.status();

        testResults.tests.push({
          testName: 'Delete User',
          status: deleteStatus === 204 ? 'PASSED' : 'FAILED',
          statusCode: deleteStatus,
        });
      } catch (error) {
        testResults.tests.push({
          testName: 'Complete Workflow',
          status: 'FAILED',
          error: error.message,
        });
      }

      // Write test report to file
      const outputDir = join(process.cwd(), 'test-output');
      mkdirSync(outputDir, { recursive: true });

      const reportContent = `
================================
API TEST REPORT - REQRES.IN
================================
Execution Time: ${testResults.timestamp}

TEST RESULTS:
${testResults.tests
  .map(
    (test, index) => `
${index + 1}. ${test.testName}
   Status: ${test.status}
   Status Code: ${test.statusCode || 'N/A'}
   ${test.userId ? `User ID: ${test.userId}` : ''}
   ${test.details ? `Details: ${JSON.stringify(test.details, null, 2)}` : ''}
   ${test.error ? `Error: ${test.error}` : ''}
`
  )
  .join('\n')}

SUMMARY:
Total Tests: ${testResults.tests.length}
Passed: ${testResults.tests.filter((t) => t.status === 'PASSED').length}
Failed: ${testResults.tests.filter((t) => t.status === 'FAILED').length}

================================
`;

      writeFileSync(join(outputDir, 'api-test-report.txt'), reportContent, 'utf-8');
      console.log('API test report written to test-output/api-test-report.txt');

      // Verify all tests passed
      const allPassed = testResults.tests.every((t) => t.status === 'PASSED');
      expect(allPassed).toBe(true);
    } finally {
      await context.dispose();
    }
  });
});
