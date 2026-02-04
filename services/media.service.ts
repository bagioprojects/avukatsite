
import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export class MediaService {

    static async getAllMedia() {
        return await prisma.media.findMany({
            orderBy: { createdAt: 'desc' }
        })
    }

    static async createMedia(data: any) {
        return await prisma.media.create({ data })
    }

    static async deleteMedia(id: string) {
        return await prisma.media.delete({
            where: { id }
        })
    }
}
