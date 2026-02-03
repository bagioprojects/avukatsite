'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface LanguageDetectorProps {
    onLanguageDetected?: (lang: string) => void
}

export default function LanguageDetector({ onLanguageDetected }: LanguageDetectorProps) {
    const pathname = usePathname()
    const [detectedLanguage, setDetectedLanguage] = useState<string>('tr')

    useEffect(() => {
        // Check if language is already set in cookie
        const savedLang = getCookie('user-language')
        if (savedLang) {
            setDetectedLanguage(savedLang)
            onLanguageDetected?.(savedLang)
            return
        }

        // Detect browser language
        const browserLang = navigator.language.split('-')[0]
        const supportedLangs = ['tr', 'en', 'ru', 'de', 'es', 'ar']
        const detectedLang = supportedLangs.includes(browserLang) ? browserLang : 'tr'

        // Save to cookie
        setCookie('user-language', detectedLang, 365)
        setDetectedLanguage(detectedLang)
        onLanguageDetected?.(detectedLang)

        // Optionally redirect to language-specific route
        if (!pathname.startsWith(`/${detectedLang}`) && detectedLang !== 'tr') {
            // For non-Turkish users, could redirect to /en, /ru, etc.
            // window.location.href = `/${detectedLang}${pathname}`
        }
    }, [pathname, onLanguageDetected])

    return null
}

function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
}

function setCookie(name: string, value: string, days: number) {
    if (typeof document === 'undefined') return
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}
