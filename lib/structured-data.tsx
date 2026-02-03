interface StructuredDataProps {
    type: 'article' | 'attorney' | 'service' | 'organization'
    data: any
}

export function generateStructuredData({ type, data }: StructuredDataProps) {
    switch (type) {
        case 'article':
            return {
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: data.title,
                description: data.description,
                author: {
                    '@type': 'Person',
                    name: data.author,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Sevinç Hukuk Bürosu',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'http://localhost:3000/logo.png',
                    },
                },
                datePublished: data.publishedDate,
                dateModified: data.modifiedDate,
                image: data.image,
            }

        case 'attorney':
            return {
                '@context': 'https://schema.org',
                '@type': 'Attorney',
                name: data.name,
                jobTitle: data.title,
                description: data.bio,
                telephone: data.phone,
                email: data.email,
                worksFor: {
                    '@type': 'LegalService',
                    name: 'Sevinç Hukuk Bürosu',
                },
                areaOfLaw: data.specialty,
            }

        case 'service':
            return {
                '@context': 'https://schema.org',
                '@type': 'Service',
                serviceType: data.name,
                provider: {
                    '@type': 'LegalService',
                    name: 'Sevinç Hukuk Bürosu',
                },
                description: data.description,
                areaServed: 'TR',
            }

        case 'organization':
            return {
                '@context': 'https://schema.org',
                '@type': 'LegalService',
                name: 'Sevinç Hukuk Bürosu',
                description: 'Profesyonel hukuki danışmanlık hizmeti',
                url: 'http://localhost:3000',
                telephone: '+905551234567',
                email: 'info@sevinclaw.com',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Merkez Mah., Büyükdere Cad. No:123',
                    addressLocality: 'İstanbul',
                    addressRegion: 'İstanbul',
                    postalCode: '34000',
                    addressCountry: 'TR',
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 41.0082,
                    longitude: 28.9784,
                },
                openingHours: 'Mo-Fr 09:00-18:00, Sa 09:00-13:00',
                priceRange: '$$',
                areaServed: {
                    '@type': 'Country',
                    name: 'Turkey',
                },
            }

        default:
            return {}
    }
}

export function StructuredDataScript({ type, data }: StructuredDataProps) {
    const structuredData = generateStructuredData({ type, data })

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}
