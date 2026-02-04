import { Hero } from '@/components/site/Hero'
import { Goal } from '@/components/site/Goal'
import { Services } from '@/components/site/Services'
import { Team } from '@/components/site/Team'
import { Articles } from '@/components/site/Articles'
import { HowWeWork } from '@/components/site/HowWeWork'
import { Contact } from '@/components/site/Contact'

// Services
import { PageService } from '@/services/page.service'
import { ArticleService } from '@/services/article.service'
import { UserService } from '@/services/user.service'

export default async function HomePage() {
    // 1. Fetch Services (Pages with template service)
    const allPages = await PageService.getAllPages()
    const servicesData = allPages
        .filter(p => p.template === 'service' && p.status === 'PUBLISHED')
        .map(p => ({
            title: (p.title as any).tr || (p.title as any).en || '',
            description: (p.content as any).tr?.substring(0, 150) + '...' || '',
            link: `/hizmetler/${p.slug}`
        }))

    // 2. Fetch Team Members
    const allUsers = await UserService.getAllUsers()
    const teamData = allUsers.map(u => ({
        id: u.id,
        name: u.name,
        role: (u.title as any)?.tr || u.role,
        image: u.avatar || 'lawyer_portrait_1_1769942223705.png'
    }))

    // 3. Fetch Articles
    const articles = await ArticleService.getPublishedArticles()
    const articlesData = articles.map(a => ({
        id: a.id,
        title: (a.title as any).tr || (a.title as any).en || '',
        author: a.author.name,
        date: new Date(a.publishedAt || a.createdAt).toLocaleDateString('tr-TR'),
        href: `/makaleler/${a.slug}`
    }))

    return (
        <div className="min-h-screen">
            <Hero />
            <Goal />
            <Services items={servicesData.length > 0 ? servicesData : undefined} />
            <Team members={teamData.length > 0 ? teamData : undefined} />
            <HowWeWork />
            <Articles items={articlesData.length > 0 ? articlesData : undefined} />
            <Contact />
        </div>
    )
}
