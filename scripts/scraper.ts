import { chromium, Browser, Page } from 'playwright'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://sadekov.ee'
const OUTPUT_DIR = './scripts/output'

interface PageContent {
    url: string
    title: string
    h1: string
    content: string[]
    images: Array<{ src: string; alt: string }>
    meta: {
        title?: string
        description?: string
        ogImage?: string
    }
}

async function ensureOutputDir() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    }
}

async function scrapeSitemap(browser: Browser): Promise<string[]> {
    console.log('🗺️  Fetching sitemap...')
    const page = await browser.newPage()

    try {
        // Try sitemap.xml first
        await page.goto(`${BASE_URL}/sitemap.xml`, { waitUntil: 'networkidle' })
        const urls = await page.$$eval('url > loc', (els) =>
            els.map((el) => el.textContent || '')
        )

        console.log(`✅ Found ${urls.length} URLs in sitemap`)
        return urls.filter(Boolean)
    } catch (error) {
        console.log('⚠️  No sitemap.xml found, crawling manually...')

        // Fallback: crawl from homepage
        await page.goto(BASE_URL, { waitUntil: 'networkidle' })
        const links = await page.$$eval('a[href]', (els) =>
            els
                .map((el) => (el as HTMLAnchorElement).href)
                .filter((href) => href.startsWith(BASE_URL))
        )

        const uniqueLinks = [...new Set(links)]
        console.log(`✅ Found ${uniqueLinks.length} URLs from homepage`)
        return uniqueLinks
    } finally {
        await page.close()
    }
}

async function scrapePage(
    browser: Browser,
    url: string
): Promise<PageContent> {
    console.log(`📄 Scraping: ${url}`)
    const page = await browser.newPage()

    try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })

        const content = await page.evaluate(() => {
            const getTextContent = (selector: string) => {
                const el = document.querySelector(selector)
                return el?.textContent?.trim() || ''
            }

            const getAllText = (selector: string) => {
                return Array.from(document.querySelectorAll(selector))
                    .map((el) => el.textContent?.trim())
                    .filter(Boolean) as string[]
            }

            return {
                title: document.title,
                h1: getTextContent('h1'),
                content: getAllText('p, h2, h3, h4, li').slice(0, 50), // Limit to 50 items
                images: Array.from(document.querySelectorAll('img')).map((img) => ({
                    src: img.src,
                    alt: img.alt || '',
                })),
                meta: {
                    title:
                        document
                            .querySelector('meta[property="og:title"]')
                            ?.getAttribute('content') || undefined,
                    description:
                        document
                            .querySelector('meta[name="description"]')
                            ?.getAttribute('content') || undefined,
                    ogImage:
                        document
                            .querySelector('meta[property="og:image"]')
                            ?.getAttribute('content') || undefined,
                },
            }
        })

        return {
            url,
            ...content,
        }
    } catch (error) {
        console.error(`❌ Failed to scrape ${url}:`, error)
        return {
            url,
            title: '',
            h1: '',
            content: [],
            images: [],
            meta: {},
        }
    } finally {
        await page.close()
    }
}

async function downloadImage(
    browser: Browser,
    imageUrl: string,
    filename: string
): Promise<void> {
    const page = await browser.newPage()

    try {
        const response = await page.goto(imageUrl)
        if (response && response.ok()) {
            const buffer = await response.body()
            const imagesDir = path.join(OUTPUT_DIR, 'images')

            if (!fs.existsSync(imagesDir)) {
                fs.mkdirSync(imagesDir, { recursive: true })
            }

            fs.writeFileSync(path.join(imagesDir, filename), buffer)
            console.log(`✅ Downloaded: ${filename}`)
        }
    } catch (error) {
        console.error(`❌ Failed to download ${imageUrl}:`, error)
    } finally {
        await page.close()
    }
}

async function main() {
    console.log('🚀 Starting Sadekov.ee scraper...\n')
    await ensureOutputDir()

    const browser = await chromium.launch({ headless: true })

    try {
        // Step 1: Get all URLs
        const urls = await scrapeSitemap(browser)
        fs.writeFileSync(
            path.join(OUTPUT_DIR, 'sitemap.json'),
            JSON.stringify(urls, null, 2)
        )
        console.log(`\n📝 Saved sitemap to ${OUTPUT_DIR}/sitemap.json\n`)

        // Step 2: Scrape each page (limit to 10 for testing)
        const pagesToScrape = urls.slice(0, 10)
        const allContent: PageContent[] = []

        for (const url of pagesToScrape) {
            const content = await scrapePage(browser, url)
            allContent.push(content)

            // Small delay to avoid rate limiting
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }

        fs.writeFileSync(
            path.join(OUTPUT_DIR, 'pages-content.json'),
            JSON.stringify(allContent, null, 2)
        )
        console.log(`\n✅ Scraped ${allContent.length} pages`)
        console.log(`📝 Saved content to ${OUTPUT_DIR}/pages-content.json\n`)

        // Step 3: Download unique images (limit to 20)
        const allImages = allContent.flatMap((page) => page.images)
        const uniqueImages = [
            ...new Map(allImages.map((img) => [img.src, img])).values(),
        ].slice(0, 20)

        console.log(`\n📸 Downloading ${uniqueImages.length} images...\n`)

        for (let i = 0; i < uniqueImages.length; i++) {
            const img = uniqueImages[i]
            const ext = path.extname(new URL(img.src).pathname) || '.jpg'
            const filename = `image-${i + 1}${ext}`
            await downloadImage(browser, img.src, filename)
        }

        console.log('\n🎉 Scraping completed successfully!')
    } catch (error) {
        console.error('❌ Scraping failed:', error)
        process.exit(1)
    } finally {
        await browser.close()
    }
}

main()
