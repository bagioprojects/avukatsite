import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'http://localhost:3000'
    const currentDate = new Date()

    // Static pages
    const staticPages = [
        '',
        '/ekibimiz',
        '/makaleler',
        '/iletisim',
        '/online-randevu',
    ]

    // Service pages
    const services = [
        'ceza-hukuku',
        'borclar-hukuku',
        'ticaret-hukuku',
        'aile-hukuku',
        'icra-hukuku',
        'is-hukuku',
    ]

    // Article slugs
    const articles = [
        'ceza-hukukunda-savunma-haklari',
        'borclar-hukukunda-sozlesme-ozgurlugu',
        'sirket-birlesmeleri-hukuki-surec',
        'bosanma-davalarinda-mal-paylasimi',
        'icra-hukukunda-haciz-ve-tahliye',
        'is-kazalarinda-isci-haklari',
    ]

    const sitemap: MetadataRoute.Sitemap = [
        // Static pages
        ...staticPages.map((page) => ({
            url: `${baseUrl}${page}`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: page === '' ? 1 : 0.8,
        })),

        // Service pages
        ...services.map((service) => ({
            url: `${baseUrl}/${service}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        })),

        // Article pages
        ...articles.map((article) => ({
            url: `${baseUrl}/makaleler/${article}`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ]

    return sitemap
}
