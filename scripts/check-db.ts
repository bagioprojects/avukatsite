
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        console.log('Testing DB connection...')
        const userCount = await prisma.user.count()
        console.log('✅ Connection Successful! User count:', userCount)

        const users = await prisma.user.findMany()
        console.log('Users:', users)
    } catch (e) {
        console.error('❌ DB Connection Failed:', e)
    } finally {
        await prisma.$disconnect()
    }
}

main()
