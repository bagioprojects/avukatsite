
import { NextResponse } from 'next/server'
import { PageService } from '@/services/page.service'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const body = await req.json()
        const { title, content, slug, status, template } = body

        const updated = await PageService.updatePage(id, {
            title: { tr: title },
            content: { tr: content },
            slug,
            status,
            template
        })

        return NextResponse.json(updated)
    } catch (e) {
        return NextResponse.json({ error: 'Update Failed' }, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await PageService.deletePage(id)
        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ error: 'Delete Failed' }, { status: 500 })
    }
}
