import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: Request) {
    try {
        const { title, content, language = 'tr' } = await request.json()

        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            )
        }

        const prompt = `Generate SEO metadata in ${language} for this legal article:

Title: ${title}
Content: ${content.substring(0, 500)}...

Generate:
1. SEO Title (50-60 characters)
2. Meta Description (150-160 characters)
3. Keywords (5-7 relevant keywords)
4. Open Graph Title
5. Open Graph Description

Format as JSON.`

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an SEO expert specializing in legal services. Generate metadata that is optimized for search engines and culturally appropriate.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.5,
            response_format: { type: 'json_object' },
        })

        const metadata = JSON.parse(completion.choices[0]?.message?.content || '{}')

        return NextResponse.json(metadata)
    } catch (error) {
        console.error('AI SEO Generation Error:', error)
        return NextResponse.json(
            { error: 'Failed to generate SEO metadata' },
            { status: 500 }
        )
    }
}
