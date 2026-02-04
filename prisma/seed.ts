import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding data...')

    // 1. Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@sevinc.com' },
        update: {},
        create: {
            email: 'admin@sevinc.com',
            name: 'Vladimir Sevinç',
            password: hashedPassword,
            role: 'SUPER_ADMIN',
            title: { tr: 'Yönetici Ortak, Avukat', en: 'Managing Partner, Lawyer' },
            bio: { tr: '25 yılı aşkın tecrübesiyle hukuk alanında uzman.', en: 'Expert in law with over 25 years of experience.' }
        }
    })

    // 2. Create Site Settings
    await prisma.siteSettings.upsert({
        where: { id: 'default' },
        update: {},
        create: {
            id: 'default',
            siteName: { tr: 'Sevinç Hukuk', en: 'Sevinc Law' },
            contact: {
                email: 'info@sevinc.com',
                phone: '+90 555 123 45 67',
                address: 'Merkez Mah. Şişli, İstanbul'
            },
            social: {
                facebook: 'https://facebook.com/sevinc',
                linkedin: 'https://linkedin.com/company/sevinc'
            }
        }
    })

    // 3. Create Service Pages
    const services = [
        { slug: 'ceza-hukuku', title: 'Ceza Hukuku', content: 'Müvekkillerimizin soruşturma ve kovuşturma aşamalarında savunmalarını üstleniyoruz.' },
        { slug: 'ticaret-hukuku', title: 'Ticaret Hukuku', content: 'Şirketler hukuku, sözleşmeler ve ticari uyuşmazlıklarda uzman danışmanlık.' },
        { slug: 'aile-hukuku', title: 'Aile Hukuku', content: 'Boşanma, velayet ve miras davalarında hassas yaklaşımlar.' }
    ]

    for (const s of services) {
        await prisma.page.upsert({
            where: { slug: s.slug },
            update: { status: 'PUBLISHED' },
            create: {
                slug: s.slug,
                title: { tr: s.title, en: s.title },
                content: { tr: s.content, en: s.content },
                template: 'service',
                status: 'PUBLISHED',
                metaTitle: { tr: s.title, en: s.title },
                metaDesc: { tr: s.title, en: s.title }
            }
        })
    }

    // 4. Create Category and Article
    const category = await prisma.category.upsert({
        where: { slug: 'hukuk-haberleri' },
        update: {},
        create: {
            name: { tr: 'Hukuk Haberleri', en: 'Law News' },
            slug: 'hukuk-haberleri'
        }
    })

    await prisma.article.upsert({
        where: { slug: 'yeni-is-kanunu-duzenlemeleri' },
        update: { status: 'PUBLISHED' },
        create: {
            slug: 'yeni-is-kanunu-duzenlemeleri',
            title: { tr: 'Yeni İş Kanunu Düzenlemeleri', en: 'New Labor Law Regulations' },
            excerpt: { tr: '2024 yılı itibariyle yürürlüğe giren yeni iş kanunu maddeleri.', en: 'New labor law articles effective from 2024.' },
            content: { tr: '<p>İş hukuku alanında yapılan son değişiklikler işçi ve işveren haklarını yeniden düzenliyor...</p>', en: '<p>Recent changes in labor law restructure worker and employer rights...</p>' },
            authorId: admin.id,
            categoryId: category.id,
            status: 'PUBLISHED',
            publishedAt: new Date()
        }
    })

    console.log('Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
