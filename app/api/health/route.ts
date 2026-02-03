import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
    try {
        // Test database connection
        const userCount = await prisma.user.count()
        const pageCount = await prisma.page.count()
        const articleCount = await prisma.article.count()

        return NextResponse.json({
            success: true,
            message: 'Database connected successfully',
            stats: {
                users: userCount,
                pages: pageCount,
                articles: articleCount,
            },
        })
    } catch (error) {
        console.error('Database connection error:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'Database connection failed',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}
