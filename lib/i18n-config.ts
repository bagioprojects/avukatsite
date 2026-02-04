
export const i18n = {
    defaultLocale: 'tr',
    locales: ['tr', 'en', 'de', 'ru', 'ar'],
} as const

export type Locale = (typeof i18n)['locales'][number]
