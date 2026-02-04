
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await prisma.article.delete({
            where: { id }
        })
        return NextResponse.json({ success: true })
    } catch (e: any) {
        console.error('Delete Error:', e)
        return NextResponse.json({ error: 'Silme işlemi başarısız' }, { status: 500 })
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const body = await req.json()
        const { title, content, status, keyword } = body

        const updateData: any = {}
        if (title) updateData.title = { tr: title }
        if (content) updateData.content = { tr: content }
        if (status) updateData.status = status
        if (status === 'PUBLISHED') updateData.publishedAt = new Date()

        const article = await prisma.article.update({
            where: { id },
            data: updateData
        })

        return NextResponse.json({ success: true, article })
    } catch (e: any) {
        console.error('Update Error:', e)
        return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 })
    }
}
