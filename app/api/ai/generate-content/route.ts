import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: Request) {
    try {
        const { topic, language = 'tr' } = await request.json()

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            )
        }

        const prompt = `Write a professional legal blog article in ${language} about: ${topic}

Requirements:
- Length: 800-1000 words
- SEO optimized
- Professional legal tone
- Include H2 and H3 headings
- Include bullet points
- Format in HTML

Title should be catchy and SEO-friendly.`

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional legal content writer who specializes in creating SEO-optimized articles for law firms.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 2000,
        })

        const content = completion.choices[0]?.message?.content

        return NextResponse.json({ content })
    } catch (error) {
        console.error('AI Content Generation Error:', error)
        return NextResponse.json(
            { error: 'Failed to generate content' },
            { status: 500 }
        )
    }
}
