
import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export class MenuService {

    static async getMenus(location: 'HEADER' | 'FOOTER' = 'HEADER') {
        return await prisma.menu.findMany({
            where: { location },
            orderBy: { order: 'asc' },
            include: { children: true }
        })
    }

    static async createMenu(data: any) {
        // Get max order
        const maxOrder = await prisma.menu.aggregate({
            where: { location: data.location },
            _max: { order: true }
        })

        const newOrder = (maxOrder._max.order || 0) + 1

        return await prisma.menu.create({
            data: { ...data, order: newOrder }
        })
    }

    static async deleteMenu(id: string) {
        return await prisma.menu.delete({ where: { id } })
    }

    static async updateMenu(id: string, data: any) {
        return await prisma.menu.update({
            where: { id },
            data
        })
    }

    // Simple reorder: Swap orders
    static async reorderMenu(id: string, direction: 'up' | 'down') {
        const menu = await prisma.menu.findUnique({ where: { id } })
        if (!menu) return null

        const currentOrder = menu.order
        const swapOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1

        const neighbor = await prisma.menu.findFirst({
            where: {
                location: menu.location,
                order: swapOrder
            }
        })

        if (neighbor) {
            // Swap
            await prisma.$transaction([
                prisma.menu.update({ where: { id: menu.id }, data: { order: swapOrder } }),
                prisma.menu.update({ where: { id: neighbor.id }, data: { order: currentOrder } })
            ])
        }
        return true
    }
}
