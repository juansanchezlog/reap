import { test, expect } from '@playwright/test';

test.describe('Forms List Display', () => {
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

  test('should display forms list correctly', async ({ page }) => {
    const mockForms = [
      {
        id: 1,
        title: 'Contact Form',
        description: 'A simple contact form for customers',
        token: 'abc123',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        sections: [
          {
            id: 1,
            title: 'Contact Information',
            fields: [
              { id: 1, label: 'Name', type: 'TEXT', required: true },
              { id: 2, label: 'Email', type: 'TEXT', required: true }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Survey Form',
        description: 'Customer satisfaction survey',
        token: 'def456',
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
        sections: [
          {
            id: 2,
            title: 'Survey Questions',
            fields: [
              { id: 3, label: 'Rating', type: 'NUMBER', required: true }
            ]
          }
        ]
      },
      {
        id: 3,
        title: 'Registration Form',
        description: 'Event registration form',
        token: 'ghi789',
        created_at: '2024-01-03T00:00:00Z',
        updated_at: '2024-01-03T00:00:00Z',
        sections: [
          {
            id: 3,
            title: 'Registration Details',
            fields: [
              { id: 4, label: 'Full Name', type: 'TEXT', required: true },
              { id: 5, label: 'Phone', type: 'TEXT', required: false }
            ]
          }
        ]
      }
    ];

    await page.route('**/api/forms', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockForms)
      });
    });

    await page.goto('/forms');
    
    await expect(page.locator('h1:has-text("Available Forms")')).toBeVisible();
    
    await expect(page.locator('a:has-text("Create New Form")')).toBeVisible();
    
    await page.waitForTimeout(1000);
    
    await expect(page.getByRole('heading', { name: 'Contact Form' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Survey Form' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Registration Form' })).toBeVisible();
    
    await expect(page.locator('text=A simple contact form for customers')).toBeVisible();
    await expect(page.locator('text=Customer satisfaction survey')).toBeVisible();
    await expect(page.locator('text=Event registration form')).toBeVisible();
    
    await page.click('a:has-text("Create New Form")');
    await expect(page).toHaveURL('/new-form');
  });
}); 