
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { unstable_cache } from 'next/cache'

export class PageService {

    // Public fetch for rendering (Cached)
    static getPageBySlug = unstable_cache(
        async (slug: string) => {
            return await prisma.page.findUnique({
                where: { slug },
                include: { seo: true }
            })
        },
        ['page-by-slug'],
        { revalidate: 60, tags: ['pages'] }
    )

    static async getAllPages() {
        return await prisma.page.findMany({
            orderBy: { updatedAt: 'desc' }
        })
    }

    static async getPageById(id: string) {
        return await prisma.page.findUnique({
            where: { id },
            include: { seo: true }
        })
    }

    static async createPage(data: any) {
        return await prisma.page.create({ data })
    }

    static async updatePage(id: string, data: any) {
        return await prisma.page.update({
            where: { id },
            data
        })
    }

    static async deletePage(id: string) {
        return await prisma.page.delete({
            where: { id }
        })
    }
}
