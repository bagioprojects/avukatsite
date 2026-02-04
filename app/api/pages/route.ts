
import { NextResponse } from 'next/server'
import { PageService } from '@/services/page.service'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { title, content, slug, status, template } = body

        // i18n structure placeholder (saving TR by default)
        const page = await PageService.createPage({
            title: { tr: title },
            content: { tr: content },
            slug: slug || 'page-' + Date.now(),
            status: status || 'DRAFT',
            template: template || 'default',
            metaTitle: { tr: title },
            metaDesc: { tr: '' }
        })

        return NextResponse.json(page)
    } catch (error) {
        console.error('Page Create Error', error)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
