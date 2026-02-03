interface HreflangLink {
    lang: string
    url: string
}

interface HreflangProps {
    currentPath: string
    languages?: string[]
}

export function generateHreflangLinks({ currentPath, languages = ['tr', 'en', 'ru', 'de', 'es', 'ar'] }: HreflangProps): HreflangLink[] {
    const baseUrl = 'http://localhost:3000'

    const links: HreflangLink[] = languages.map(lang => ({
        lang,
        url: lang === 'tr' ? `${baseUrl}${currentPath}` : `${baseUrl}/${lang}${currentPath}`,
    }))

    // Add x-default (Turkish as default)
    links.push({
        lang: 'x-default',
        url: `${baseUrl}${currentPath}`,
    })

    return links
}

export function HreflangTags({ currentPath, languages }: HreflangProps) {
    const links = generateHreflangLinks({ currentPath, languages })

    return (
        <>
            {links.map(({ lang, url }) => (
                <link key={lang} rel="alternate" hrefLang={lang} href={url} />
            ))}
        </>
    )
}
