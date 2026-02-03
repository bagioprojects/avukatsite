import { test, expect } from '@playwright/test'

test.describe('Homepage Tests', () => {
    test('should load homepage successfully', async ({ page }) => {
        await page.goto('http://localhost:3000')

        // Check header
        await expect(page.locator('text=SEVİNÇ')).toBeVisible()

        // Check hero section
        await expect(page.locator('h1')).toContainText('Ceza, aile, ticaret')

        // Check CTA button
        await expect(page.locator('text=İletişime Geçin')).toBeVisible()
    })

    test('should navigate to services', async ({ page }) => {
        await page.goto('http://localhost:3000')

        // Click on a service card
        await page.click('text=Ceza Hukuku')

        // Should navigate to service page
        await expect(page).toHaveURL(/.*ceza-hukuku/)
        await expect(page.locator('h1')).toContainText('Ceza Hukuku')
    })

    test('should show team members', async ({ page }) => {
        await page.goto('http://localhost:3000/ekibimiz')

        // Check team page loaded
        await expect(page.locator('h1')).toContainText('Ekibimiz')

        // Check team member cards
        const teamCards = page.locator('[class*="cursor-pointer"]')
        await expect(teamCards).toHaveCount(6)
    })

    test('should submit contact form', async ({ page }) => {
        await page.goto('http://localhost:3000/iletisim')

        // Fill the form
        await page.fill('input[type="text"]', 'Test User')
        await page.fill('input[type="email"]', 'test@example.com')
        await page.fill('input[type="tel"]', '+905551234567')
        await page.fill('input[placeholder*="konu"]', 'Test Subject')
        await page.fill('textarea', 'This is a test message')

        // Submit
        await page.click('button[type="submit"]')

        // Check success message
        await expect(page.locator('text=Mesajınız başarıyla gönderildi')).toBeVisible({ timeout: 3000 })
    })
})

test.describe('Multi-language Tests', () => {
    test('should detect and save language preference', async ({ page }) => {
        await page.goto('http://localhost:3000')

        // Check if language is saved in cookie
        const cookies = await page.context().cookies()
        const langCookie = cookies.find(c => c.name === 'user-language')

        expect(langCookie).toBeDefined()
    })
})

test.describe('Performance Tests', () => {
    test('should have good performance metrics', async ({ page }) => {
        await page.goto('http://localhost:3000')

        // Wait for page to fully load
        await page.waitForLoadState('networkidle')

        // Check performance
        const performanceMetrics = await page.evaluate(() => {
            const perf = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
            return {
                domContentLoaded: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
                loadComplete: perf.loadEventEnd - perf.loadEventStart,
            }
        })

        // Assert performance is good (< 2000ms for DOM content loaded)
        expect(performanceMetrics.domContentLoaded).toBeLessThan(2000)
    })
})
