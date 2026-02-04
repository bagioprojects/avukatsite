
import { NextResponse } from 'next/server'
import { MediaService } from '@/services/media.service'
import { unlink } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        // Get media info to delete file
        const media = await prisma.media.findUnique({ where: { id } })

        if (media && media.url.startsWith('/uploads/')) {
            const filepath = path.join(process.cwd(), 'public', media.url)
            try {
                await unlink(filepath)
            } catch (e) {
                console.error("File delete failed (might be missing)", e)
            }
        }

        await MediaService.deleteMedia(id)
        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ error: 'Delete Failed' }, { status: 500 })
    }
}
