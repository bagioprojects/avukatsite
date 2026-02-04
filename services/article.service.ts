
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export class ArticleService {

    // Cached fetch for public facing pages (High Performance)
    static getPublishedArticles = unstable_cache(
        async () => {
            return await prisma.article.findMany({
                where: { status: 'PUBLISHED' },
                orderBy: { publishedAt: 'desc' },
                include: { author: true, category: true }
            })
        },
        ['published-articles'],
        { revalidate: 60, tags: ['articles'] }
    )

    // Admin fetch (Real-time)
    static async getAllArticles() {
        return await prisma.article.findMany({
            orderBy: { updatedAt: 'desc' },
            include: { author: true, category: true }
        })
    }

    static async getArticleBySlug(slug: string) {
        return await prisma.article.findUnique({
            where: { slug },
            include: { author: true, category: true, seo: true }
        })
    }

    static async createArticle(data: any) {
        return await prisma.article.create({
            data
        })
    }

    static async updateArticle(id: string, data: any) {
        return await prisma.article.update({
            where: { id },
            data
        })
    }

    static async deleteArticle(id: string) {
        return await prisma.article.delete({
            where: { id }
        })
    }
}
