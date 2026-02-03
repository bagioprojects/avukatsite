
import { PrismaClient } from '@prisma/client'
import { Header, Footer } from '@/components/site'
import { notFound } from 'next/navigation'
import { Calendar, User, Tag, Clock, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

const prisma = new PrismaClient()

type Props = {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const article = await prisma.article.findUnique({
        where: { slug: params.slug },
        include: { seo: true }
    })

    if (!article) return { title: 'Makale Bulunamadı' }

    const title = ((article.seo?.metaTitle as any)?.tr) || ((article.title as any)?.tr)
    const desc = ((article.seo?.metaDesc as any)?.tr) || ((article.excerpt as any)?.tr)

    return {
        title: `${title} | Sevinç Hukuk Bürosu`,
        description: desc,
        openGraph: {
            images: [article.coverImage || '/images/og-default.jpg']
        }
    }
}

export default async function ArticleDetailPage({ params }: Props) {
    const article = await prisma.article.findUnique({
        where: { slug: params.slug },
        include: {
            author: true,
            category: true,
            seo: true
        }
    })

    if (!article) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Article Head */}
            <div className="bg-[#182141] text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>

                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <Link href="/makaleler" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#c09767] transition-colors mb-8 text-sm font-medium">
                        <ChevronLeft className="w-4 h-4" />
                        Makalelere Dön
                    </Link>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <span className="bg-[#c09767] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
                            {(article.category.name as any).tr}
                        </span>
                        {(article.seo?.keywords as any)?.slice(0, 2).map((kw: string, i: number) => (
                            <span key={i} className="bg-white/10 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                                #{kw}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-8">
                        {(article.title as any).tr}
                    </h1>

                    <div className="flex flex-wrap items-center gap-8 text-gray-300 text-sm font-medium border-t border-white/10 pt-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white text-[#182141] flex items-center justify-center font-bold text-lg">
                                {article.author.name.charAt(0)}
                            </div>
                            <div>
                                <span className="block text-white">{article.author.name}</span>
                                <span className="text-gray-400 text-xs">Yazar</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#c09767]" />
                            <span>{new Date(article.publishedAt || new Date()).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[#c09767]" />
                            <span>5 dk okuma</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-4 py-16">
                <article className="max-w-4xl mx-auto">
                    <div
                        className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-serif prose-headings:font-bold prose-headings:text-[#182141] 
                        prose-a:text-[#c09767] prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-[#182141]
                        prose-li:marker:text-[#c09767]"
                        dangerouslySetInnerHTML={{ __html: (article.content as any).tr }}
                    />

                    {/* Tags Footer */}
                    <div className="mt-16 pt-8 border-t border-gray-100">
                        <h4 className="font-bold text-[#182141] mb-4 flex items-center gap-2">
                            <Tag className="w-5 h-5 text-[#c09767]" />
                            Konuyla İlgili Etiketler
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {(article.seo?.keywords as any)?.map((kw: string, i: number) => (
                                <Link
                                    href={`/makaleler?q=${kw}`}
                                    key={i}
                                    className="bg-gray-100 hover:bg-[#c09767] hover:text-white px-4 py-2 rounded-lg text-sm text-gray-600 transition-colors"
                                >
                                    {kw}
                                </Link>
                            ))}
                        </div>
                    </div>
                </article>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-50 py-16 border-t border-gray-200">
                <div className="container mx-auto px-4 text-center max-w-2xl">
                    <h3 className="text-2xl font-bold font-serif text-[#182141] mb-4">Hukuki Desteğe mi İhtiyacınız Var?</h3>
                    <p className="text-gray-600 mb-8">
                        Uzman ekibimizle davanız hakkında görüşmek için hemen randevu alın.
                    </p>
                    <Link
                        href="/iletisim"
                        className="inline-flex items-center gap-2 bg-[#c9a961] hover:bg-[#b08a5d] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        İletişime Geçin
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}
