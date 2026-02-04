
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Search, Newspaper, Filter, ArrowUpRight } from 'lucide-react'
import { ArticleActions } from '@/components/admin/ArticleActions'
import { ArticleImage } from '@/components/admin/ArticleImage'
import { FileText } from 'lucide-react'
import { ArticleService } from '@/services/article.service'

export default async function ArticlesManagementPage() {
    const articles = await ArticleService.getAllArticles()

    return (
        <div className="space-y-8">
            {/* Ambient Background for Page (Local) */}
            <div className="fixed top-0 left-64 w-[500px] h-[500px] bg-[#c9a961]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#2d3e50]/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Header Section */}
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-[#2d3e50] rounded-lg text-white">
                            <Newspaper className="w-6 h-6" />
                        </div>
                        Makale Yönetimi
                    </h1>
                    <p className="text-gray-500 mt-2 pl-1">Blog yazılarını yönetin, analiz edin ve yayınlayın.</p>
                </div>

                <Link
                    href="/admin/makaleler/new"
                    className="group relative flex items-center gap-2 bg-gradient-to-r from-[#c9a961] to-[#b08a5d] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#c9a961]/20 hover:shadow-xl hover:scale-105 transition-all"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    Yeni Makale Yaz
                </Link>
            </div>

            {/* Stats/Filter Bar */}
            <div className="relative z-10 bg-white/60 backdrop-blur-xl border border-white/50 p-4 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium px-2">
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        Yayında ({articles.filter((a: any) => a.status === 'PUBLISHED').length})
                    </span>
                    <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-yellow-500" />
                        Taslak ({articles.filter((a: any) => a.status === 'DRAFT').length})
                    </span>
                </div>

                <div className="relative flex-grow max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Makale başlıklarında ara..."
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border-none bg-white shadow-sm focus:ring-2 focus:ring-[#c9a961]/20 placeholder-gray-400 text-sm"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Articles List (Premium Cards/Table Hybrid) */}
            <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">İçerik</th>
                            <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori</th>
                            <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Durum</th>
                            <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Tarih</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {articles.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-12 text-center text-gray-500">
                                    Henüz hiç makale bulunmuyor. Yeni bir tane yazmaya ne dersiniz?
                                </td>
                            </tr>
                        ) : articles.map((article: any) => (
                            <tr key={article.id} className="group hover:bg-blue-50/30 transition-colors">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden shadow-sm group-hover:scale-105 transition-transform border border-gray-200">
                                            <ArticleImage src={article.coverImage} alt={(article.title as any).tr} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 line-clamp-1 max-w-md text-base group-hover:text-blue-700 transition-colors">
                                                {(article.title as any).tr}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-400 font-medium">{(article.author as any)?.name || 'Admin'}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                <span className="text-xs text-gray-400">Okuma Süresi: 5 dk</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 shadow-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a961]" />
                                        {(article.category as any)?.name?.tr || 'Genel'}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${article.status === 'PUBLISHED'
                                        ? 'bg-green-50 border-green-200 text-green-700'
                                        : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                                        }`}>
                                        <span className={`w-2 h-2 rounded-full ${article.status === 'PUBLISHED' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                                        {article.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-sm text-gray-500 font-medium tabular-nums">
                                    {new Date(article.updatedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <ArticleActions id={article.id} slug={article.slug} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
