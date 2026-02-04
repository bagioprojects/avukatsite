
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ArticleService } from '@/services/article.service'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { title, content, status, slug, categoryId, keyword, coverImage } = body

        // Basic validation
        if (!title || !content) {
            return NextResponse.json({ error: 'Başlık ve içerik zorunludur.' }, { status: 400 })
        }

        // Generate slug if not provided
        const finalSlug = slug || title.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')

        // Create Article
        // Note: Schema expects JSON for title/content/excerpt. We wrap inputs in { tr: ... }
        // We also need an authorId. For now, we'll pick the first user or a hardcoded ID if auth isn't fully ready.
        // Ideally, get session.user.id

        // Mock Author ID for development (Ensure at least one user exists in DB or handle error)
        // Check for existing user
        let author = await prisma.user.findFirst()
        if (!author) {
            // Create a dummy admin if none exists
            author = await prisma.user.create({
                data: {
                    email: 'admin@avukat.com',
                    name: 'Admin Avukat',
                    password: 'hash', // dummy
                    role: 'ADMIN'
                }
            })
        }

        // Check category
        let category = null
        if (categoryId) {
            category = await prisma.category.findUnique({ where: { id: categoryId } })
        }
        if (!category) {
            // Fallback to a default category or create one
            category = await prisma.category.findFirst()
            if (!category) {
                category = await prisma.category.create({
                    data: {
                        name: { tr: 'Genel' },
                        slug: 'genel-hukuk'
                    }
                })
            }
        }

        // Create using Service
        const article = await ArticleService.createArticle({
            title: { tr: title },
            content: { tr: content },
            excerpt: { tr: content.substring(0, 150) + '...' },
            slug: finalSlug + '-' + Date.now(), // Ensure uniqueness
            status: status || 'DRAFT',
            author: { connect: { id: author.id } },
            category: { connect: { id: categoryId || category.id } }, // Fallback to existing category.id if categoryId is null
            coverImage: coverImage || null,
            publishedAt: status === 'PUBLISHED' ? new Date() : null,
            seo: {
                create: {
                    metaTitle: { tr: title },
                    metaDesc: { tr: content.substring(0, 160) },
                    keywords: { tr: keyword ? [keyword] : [] } // Retained keywords from original
                }
            }
        })

        return NextResponse.json(article)
    } catch (error) {
        console.error('Error creating article:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
