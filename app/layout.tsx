import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: {
        default: 'Sevinç Hukuk Bürosu | Profesyonel Hukuki Danışmanlık',
        template: '%s | Sevinç Hukuk Bürosu',
    },
    description: 'Ceza, aile, ticaret, medeni ve idari hukuk alanlarında 25 yılı aşkın deneyimle profesyonel hukuki danışmanlık hizmeti.',
    keywords: ['avukat', 'hukuk bürosu', 'ceza hukuku', 'aile hukuku', 'ticaret hukuku', 'istanbul avukat', 'hukuki danışmanlık'],
    authors: [{ name: 'Sevinç Hukuk Bürosu' }],
    creator: 'Sevinç Hukuk Bürosu',
    publisher: 'Sevinç Hukuk Bürosu',
    metadataBase: new URL('http://localhost:3000'),
    alternates: {
        canonical: '/',
        languages: {
            'tr': '/',
            'en': '/en',
            'ru': '/ru',
        },
    },
    openGraph: {
        type: 'website',
        locale: 'tr_TR',
        url: 'http://localhost:3000',
        title: 'Sevinç Hukuk Bürosu | Profesyonel Hukuki Danışmanlık',
        description: 'Ceza, aile, ticaret, medeni ve idari hukuk alanlarında 25 yılı aşkın deneyimle profesyonel hukuki danışmanlık hizmeti.',
        siteName: 'Sevinç Hukuk Bürosu',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sevinç Hukuk Bürosu',
        description: 'Profesyonel hukuki danışmanlık hizmeti',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: 'google-site-verification-code',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="tr">
            <head>
                {/* Preconnect to external domains for performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Schema.org JSON-LD for Organization */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'LegalService',
                            name: 'Sevinç Hukuk Bürosu',
                            description: 'Profesyonel hukuki danışmanlık hizmeti',
                            url: 'http://localhost:3000',
                            telephone: '+905551234567',
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: 'Merkez Mah., Büyükdere Cad. No:123',
                                addressLocality: 'İstanbul',
                                addressCountry: 'TR',
                            },
                            areaServed: 'TR',
                            priceRange: '$$',
                        }),
                    }}
                />
            </head>
            <body className="antialiased">{children}</body>
        </html>
    )
}
