import { test, expect } from '@playwright/test';

test.describe('Form Creation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('userData', JSON.stringify({ 
        id: 1, 
        username: 'admin',
        email: 'admin@test.com' 
      }));
    });
  });

  test('should create a form successfully', async ({ page }) => {
    await page.route('**/api/forms', async route => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              id: 1,
              title: 'Test Form Title',
              description: 'This is a test form description',
              token: 'test-token-123',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z'
            }
          })
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        });
      }
    });

    await page.goto('/forms');
    
    await page.click('text=Create New Form');
    
    await expect(page).toHaveURL('/new-form');
    
    await page.fill('#title', 'Test Form Title');
    
    await page.fill('#description', 'This is a test form description');
    
    await page.click('button:has-text("Add Section")');
    
    await page.fill('input[placeholder="Enter section title"]', 'Test Section');
    
    await page.fill('textarea[placeholder*="section description"]', 'Test section description');
    
    await page.click('button:has-text("Add Field")');
    
    await page.fill('input[placeholder="Field label"]', 'Test Field');
    
    await expect(page.locator('select').first()).toHaveValue('TEXT');
    
    await page.check('input[type="checkbox"]');
    
    await page.click('button[type="submit"]:has-text("Create Form")');
    
    await expect(page.locator('text=Form created successfully!')).toBeVisible();
    
    await expect(page).toHaveURL('/forms');
  });
}); 