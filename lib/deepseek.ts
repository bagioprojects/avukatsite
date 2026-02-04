
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

export interface DeepSeekRequest {
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[]
    model?: string
    temperature?: number
}

export async function generateDeepSeekResponse(prompt: string, systemPrompt: string = 'You are a helpful legal assistant.') {
    if (!DEEPSEEK_API_KEY) {
        throw new Error('DEEPSEEK_API_KEY is not defined')
    }

    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.7
            })
        })

        if (!response.ok) {
            const error = await response.text()
            throw new Error(`DeepSeek API Error: ${response.status} - ${error}`)
        }

        const data = await response.json()
        return data.choices[0].message.content
    } catch (error) {
        console.error('DeepSeek AI Request Failed:', error)
        throw error
    }
}
