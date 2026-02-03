export type SupportedLanguage = 'tr' | 'en' | 'de' | 'es' | 'ru' | 'ar'

export interface MultiLangField {
    tr: string
    en: string
    de: string
    es: string
    ru: string
    ar: string
}

export interface PageData {
    id: string
    slug: string
    title: MultiLangField
    content: MultiLangField
    metaTitle: MultiLangField
    metaDesc: MultiLangField
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
    template: string
    createdAt: Date
    updatedAt: Date
}

export interface ArticleData {
    id: string
    slug: string
    title: MultiLangField
    content: MultiLangField
    excerpt: MultiLangField
    coverImage?: string
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
    publishedAt?: Date
    createdAt: Date
}

export interface SEOData {
    metaTitle: MultiLangField
    metaDesc: MultiLangField
    keywords: MultiLangField
    ogImage?: string
    schema?: Record<string, any>
}
