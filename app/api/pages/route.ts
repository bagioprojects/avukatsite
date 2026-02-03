import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

// GET all pages
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')

        const pages = await prisma.page.findMany({
            where: status ? { status: status as any } : undefined,
            orderBy: { createdAt: 'desc' },
            include: {
                seo: true,
            },
        })

        return NextResponse.json({ success: true, data: pages })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch pages' },
            { status: 500 }
        )
    }
}

// POST create new page
export async function POST(request: Request) {
    try {
        const body = await request.json()

        const page = await prisma.page.create({
            data: {
                slug: body.slug,
                title: body.title,
                content: body.content,
                metaTitle: body.metaTitle,
                metaDesc: body.metaDesc,
                status: body.status || 'DRAFT',
                template: body.template || 'default',
            },
        })

        return NextResponse.json({ success: true, data: page }, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to create page' },
            { status: 500 }
        )
    }
}
