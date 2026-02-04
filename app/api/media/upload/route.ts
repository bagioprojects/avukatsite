
import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { MediaService } from '@/services/media.service'

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json({ error: 'No file received' }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.]/g, '')
        const uploadDir = path.join(process.cwd(), 'public/uploads')

        // Ensure dir exists
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (e) {
            // Ignore if exists
        }

        const filepath = path.join(uploadDir, filename)
        await writeFile(filepath, buffer)

        // Save to DB
        const media = await MediaService.createMedia({
            filename: file.name,
            url: `/uploads/${filename}`,
            type: file.type.startsWith('image/') ? 'IMAGE' : 'DOCUMENT',
            size: file.size
        })

        return NextResponse.json(media)
    } catch (error) {
        console.error('Upload Error:', error)
        return NextResponse.json({ error: 'Upload Failed' }, { status: 500 })
    }
}
