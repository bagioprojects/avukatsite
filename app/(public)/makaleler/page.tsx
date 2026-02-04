
import { PrismaClient } from '@prisma/client'
import { Header, Footer } from '@/components/site'
import Link from 'next/link'
import { Search, Calendar, User, ChevronRight } from 'lucide-react'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export const metadata = {
    title: 'Makaleler - Hukuki Bilgi Bankası | Sevinç Hukuk Bürosu',
    description: 'Ceza, Aile, Ticaret ve İş hukuku alanlarında uzman avukatlarımız tarafından hazırlanan güncel hukuki makaleler ve rehberler.',
}

export default async function ArticlesPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; cat?: string; q?: string }>
}) {
    const resolvedSearchParams = await searchParams
    const page = Number(resolvedSearchParams.page) || 1
    const categorySlug = resolvedSearchParams.cat || 'all'
    const searchTerm = resolvedSearchParams.q || ''
    const pageSize = 9

    // Build Where Clause
    const where: any = {
        status: 'PUBLISHED',
    }

    if (categorySlug !== 'all') {
        where.category = { slug: categorySlug }
    }

    if (searchTerm) {
        where.OR = [
            { title: { path: ['tr'], string_contains: searchTerm, mode: 'insensitive' } },
            { excerpt: { path: ['tr'], string_contains: searchTerm, mode: 'insensitive' } },
        ]
    }

    // Fetch Data
    const [articles, totalCount, categories] = await Promise.all([
        prisma.article.findMany({
            where,
            include: {
                category: true,
                author: true,
            },
            take: pageSize,
            skip: (page - 1) * pageSize,
            orderBy: { publishedAt: 'desc' },
        }),
        prisma.article.count({ where }),
        prisma.category.findMany(),
    ])

    const totalPages = Math.ceil(totalCount / pageSize)

    // Helper for generating URL
    // We'll use a simple form for search and links for categories

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="bg-[#182141] py-20 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="absolute right-0 top-0 h-full w-[40%] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <span className="text-[#c09767] font-semibold tracking-[0.2em] text-xs uppercase mb-3 block">Hukuki Kütüphane</span>
                        <h1 className="mb-4 text-4xl font-bold lg:text-5xl font-serif">Makaleler</h1>
                        <p className="text-xl text-gray-300 max-w-2xl">
                            Hukukun karmaşık dünyasında yolunuzu aydınlatacak güncel bilgiler, uzman görüşleri ve emsal karar incelemeleri.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {/* Filter Section */}
                    <div className="mb-12 space-y-6">
                        {/* Search Form */}
                        <form className="relative max-w-2xl mx-auto">
                            <input type="hidden" name="category" value={categorySlug} />
                            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="q"
                                defaultValue={searchTerm}
                                placeholder="Makale, konu veya anahtar kelime ara..."
                                className="w-full rounded-full border-0 bg-white py-4 pl-14 pr-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] focus:ring-2 focus:ring-[#c09767]/20 placeholder-gray-400 text-gray-700"
                            />
                        </form>

                        {/* Category Cloud */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link
                                href="/makaleler?category=all"
                                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${categorySlug === 'all'
                                    ? 'bg-[#182141] text-white shadow-lg transform -translate-y-0.5'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                Tümü
                            </Link>
                            {categories.map((cat: any) => (
                                <Link
                                    key={cat.id}
                                    href={`/makaleler?category=${cat.slug}&q=${searchTerm}`}
                                    className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${categorySlug === cat.slug
                                        ? 'bg-[#182141] text-white shadow-lg transform -translate-y-0.5'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {(cat.name as any).tr}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-6 text-gray-500 text-sm font-medium">
                        Toplam {totalCount} makale bulundu
                    </div>

                    {/* Articles Grid */}
                    {articles.length > 0 ? (
                        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article: any) => (
                                <Link
                                    key={article.id}
                                    href={`/makaleler/${article.slug}`}
                                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-2 border border-gray-100"
                                >
                                    {/* Abstract Image Pattern */}
                                    <div className="h-48 w-full bg-[#182141] relative overflow-hidden group-hover:bg-[#c09767] transition-colors duration-500">
                                        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
                                        <div className="absolute bottom-0 left-0 p-6">
                                            <div className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg px-3 py-1 text-xs font-bold inline-block">
                                                {(article.category.name as any)?.tr}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 flex-grow flex flex-col">
                                        <h3 className="mb-4 text-xl font-bold font-serif text-[#182141] leading-snug group-hover:text-[#c09767] transition-colors">
                                            {(article.title as any).tr}
                                        </h3>

                                        <p className="mb-6 text-gray-600 line-clamp-3 text-sm leading-relaxed flex-grow">
                                            {(article.excerpt as any).tr}
                                        </p>

                                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#182141]">
                                                    {article.author.name.charAt(0)}
                                                </div>
                                                <span className="font-medium">{article.author.name}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 opacity-70">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{new Date(article.publishedAt || new Date()).toLocaleDateString('tr-TR')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-300">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Makale Bulunamadı</h3>
                            <p className="text-gray-500">Arama kriterlerinize uygun içerik bulunamadı.</p>
                            <Link href="/makaleler" className="text-[#c09767] font-semibold mt-4 inline-block hover:underline">
                                Tüm Makaleleri Gör
                            </Link>
                        </div>
                    )}

                    {/* Simple Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2">
                            {page > 1 && (
                                <Link
                                    href={`/makaleler?page=${page - 1}&category=${categorySlug}&q=${searchTerm}`}
                                    className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Önceki
                                </Link>
                            )}
                            <span className="px-6 py-3 rounded-full bg-[#182141] text-white font-medium">
                                {page} / {totalPages}
                            </span>
                            {page < totalPages && (
                                <Link
                                    href={`/makaleler?page=${page + 1}&category=${categorySlug}&q=${searchTerm}`}
                                    className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Sonraki
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
