import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    });
  });

  test('should login and logout successfully', async ({ page }) => {
    await page.route('**/api/auth/login', async route => {
      const request = await route.request().postDataJSON();
      
      if (request.username === 'admin' && request.password === 'admiin') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            token: 'mock-auth-token-12345',
            user: {
              id: 1,
              username: 'admin',
              email: 'admin@test.com'
            }
          })
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({
            error: 'Invalid credentials'
          })
        });
      }
    });

    await page.route('**/api/forms', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.goto('/login');

    await expect(page).toHaveURL('/login');
    await expect(page.locator('h2:has-text("Admin Login")')).toBeVisible();

    await page.fill('#username', 'admin');
    await page.fill('#password', 'admiin');

    await page.click('button[type="submit"]:has-text("Login")');

    await expect(page).toHaveURL('/forms', { timeout: 10000 });

    await page.goto('/');

    await expect(page.locator('text=Welcome, admin!')).toBeVisible();
    await expect(page.locator('button:has-text("Logout")')).toBeVisible();

    await page.click('button:has-text("Logout")');

    await page.waitForTimeout(500);

    await expect(page.locator('a:has-text("Log in")')).toBeVisible();
    await expect(page.locator('text=Welcome, admin!')).not.toBeVisible();
    await expect(page.locator('button:has-text("Logout")')).not.toBeVisible();

    await page.goto('/forms');
    
    await expect(page).toHaveURL('/unauthorized');
    await expect(page.locator('h1:has-text("Access Denied")')).toBeVisible();
  });

  test('should handle invalid login credentials', async ({ page }) => {
    await page.route('**/api/auth/login', async route => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Invalid username or password'
        })
      });
    });

    await page.goto('/login');

    await page.fill('#username', 'admin');
    await page.fill('#password', 'wrongpassword');

    await page.click('button[type="submit"]:has-text("Login")');

    await expect(page).toHaveURL('/login');
  });

  test('should redirect authenticated users away from login page', async ({ page }) => {
    await page.route('**/api/forms', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      });
    });

    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('userData', JSON.stringify({ 
        id: 1, 
        username: 'admin',
        email: 'admin@test.com' 
      }));
    });

    await page.waitForTimeout(1000);

    await page.goto('/login');

    await expect(page).toHaveURL('/forms', { timeout: 10000 });
  });
}); 