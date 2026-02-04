
import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export class UserService {

    // Cached team fetch
    static getTeamMembers = unstable_cache(
        async () => {
            return await prisma.user.findMany({
                where: { role: { not: 'VIEWER' } }, // Assuming VIEWERs are not displayed or tailored logic
                orderBy: { createdAt: 'desc' }
            })
        },
        ['team-members'],
        { revalidate: 3600, tags: ['users'] }
    )

    static async getAllUsers() {
        return await prisma.user.findMany({
            orderBy: { createdAt: 'desc' }
        })
    }

    static async createUser(data: any) {
        return await prisma.user.create({ data })
    }

    static async updateUser(id: string, data: any) {
        return await prisma.user.update({
            where: { id },
            data
        })
    }

    static async deleteUser(id: string) {
        return await prisma.user.delete({
            where: { id }
        })
    }
}
