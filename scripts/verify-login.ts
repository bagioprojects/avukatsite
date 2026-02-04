
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🔍 Admin hesabı doğrulanıyor...')

    // 1. Kullanıcıyı bul
    const user = await prisma.user.findUnique({
        where: { email: 'admin@avukat.com' }
    })

    if (!user) {
        console.error('❌ Admin kullanıcısı veritabanında bulunamadı!')
        return
    }

    console.log(`✅ Kullanıcı bulundu: ${user.name} (${user.email})`)
    console.log(`🔑 Mevcut Hash: ${user.password.substring(0, 10)}...`)

    // 2. Şifreyi test et
    const passwordToTest = 'admin123'
    const isValid = await bcrypt.compare(passwordToTest, user.password)

    if (isValid) {
        console.log('✅ Şifre doğrulama BAŞARILI! "admin123" şifresi ile giriş yapılabilir.')
        console.log('🚀 Login Sayfası: http://localhost:3000/admin/login')
    } else {
        console.error('❌ Şifre doğrulama BAŞARISIZ! Hash uyumsuz.')
    }
}

main()
    .finally(() => prisma.$disconnect())
