
/**
 * SEO Analysis Utility
 * Handles local text analysis for readability and keyword optimization.
 */

export interface SeoMetrics {
    wordCount: number
    sentenceCount: number
    paragraphCount: number
    fleschScore: number
    readingTime: number // minutes
    keywordDensity: number
    keywordInTitle: boolean
    keywordInFirstPara: boolean
    passiveVoicePercentage: number
    transitionWordsPercentage: number
    consecutiveSentencesIssues: number
}

export function analyzeContent(
    content: string,
    title: string,
    keyword: string
): SeoMetrics {
    // Strip HTML tags for text analysis
    const text = content.replace(/<[^>]*>/g, ' ')
    const words = text.match(/\b\S+\b/g) || []
    const sentences = text.match(/[.!?]+/g) || []
    const paragraphCount = content.split('</p>').length - 1

    // 1. Word Count
    const wordCount = words.length

    // 2. Sentence Count
    const sentenceCount = sentences.length || 1

    // 3. Flesch Reading Ease (Adapted for Turkish roughly/universal)
    // Formula: 206.835 - 1.015(total words/total sentences) - 84.6(total syllables/total words)
    // Syllable estimation: vowels count
    const syllables = (text.match(/[aeıioöuüAEIİOÖUÜ]/g) || []).length
    const fleschScore = Math.max(0, Math.min(100,
        206.835 - (1.015 * (wordCount / sentenceCount)) - (84.6 * (syllables / wordCount))
    ))

    // 4. Reading Time (Average 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200)

    // 5. Keyword Density
    const keywordLower = keyword.toLowerCase()
    const contentLower = text.toLowerCase()
    const keywordCount = keyword
        ? (contentLower.match(new RegExp(keywordLower, 'g')) || []).length
        : 0
    const keywordDensity = wordCount > 0 && keyword
        ? (keywordCount / wordCount) * 100
        : 0

    // 6. Keyword checks
    const keywordInTitle = keyword ? title.toLowerCase().includes(keywordLower) : false
    // Simple check for first paragraph (first 300 chars)
    const keywordInFirstPara = keyword ? contentLower.slice(0, 300).includes(keywordLower) : false

    // 7. Passive Voice (Basic Turkish detections - "edildi", "yapıldı", "görüldü")
    // This is a naive implementation, a real NLP library would be better but expensive/heavy
    const passiveMatches = text.match(/\b\w+(ildi|ıldı|üldü|uldu|edildi|yapıldı|alındı)\b/g) || []
    const passiveVoicePercentage = (passiveMatches.length / sentenceCount) * 100

    // 8. Transition Words (Example list)
    const transitions = ['ama', 'fakat', 'lakin', 'ancak', 'buna rağmen', 'bununla birlikte', 'örneğin', 'mesela', 'sonuç olarak', 'özetle', 'dolayısıyla', 'bu nedenle', 'çünkü', 'zira', 'böylece', 'ayrıca', 'dahası']
    const transitionMatches = words.filter(w => transitions.includes(w.toLowerCase())).length
    const transitionWordsPercentage = (transitionMatches / sentenceCount) * 100

    return {
        wordCount,
        sentenceCount,
        paragraphCount,
        fleschScore,
        readingTime,
        keywordDensity,
        keywordInTitle,
        keywordInFirstPara,
        passiveVoicePercentage,
        transitionWordsPercentage,
        consecutiveSentencesIssues: 0 // Placeholder for complex logic
    }
}
