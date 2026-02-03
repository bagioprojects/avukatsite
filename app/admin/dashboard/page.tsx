import { prisma } from '@/lib/prisma'
import { FileText, Users, Newspaper, Calendar, TrendingUp, Eye } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    // Fetch real stats
    const [articleCount, userCount, categoryCount] = await Promise.all([
        prisma.article.count(),
        prisma.user.count(),
        prisma.category.count(),
    ])

    const stats = [
        { icon: Newspaper, label: 'Makaleler', value: articleCount.toString(), change: 'Aktif', color: 'from-blue-500 to-blue-600' },
        { icon: Users, label: 'Kullanıcılar', value: userCount.toString(), change: 'Yönetici', color: 'from-purple-500 to-purple-600' },
        { icon: FileText, label: 'Kategoriler', value: categoryCount.toString(), change: 'Toplam', color: 'from-green-500 to-green-600' },
        { icon: Calendar, label: 'Randevular', value: '15', change: '+3 bu hafta', color: 'from-orange-500 to-orange-600' },
    ]

    const recentArticles = await prisma.article.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: { author: true }
    })

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="rounded-xl bg-gradient-to-br from-[#2d3e50] to-[#3d4e60] p-8 text-white shadow-lg">
                <h1 className="mb-2 text-3xl font-bold">Hoş Geldiniz!</h1>
                <p className="text-gray-300">
                    Sistem yönetimi ve içerik güncelleme paneli.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={index}
                            className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="mb-1 text-sm font-medium text-gray-600">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="mt-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                            {stat.change}
                                        </p>
                                    </div>
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color} shadow-md group-hover:scale-110 transition-transform`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Articles */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Son Güncellenen Makaleler</h2>
                        <Link href="/admin/makaleler" className="text-sm font-semibold text-[#c9a961] hover:text-[#b89851]">Tümünü Gör</Link>
                    </div>

                    <div className="space-y-4">
                        {recentArticles.map((article: any) => (
                            <div key={article.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                <div>
                                    <p className="font-medium text-gray-900 line-clamp-1">{(article.title as any).tr}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${article.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                            {article.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(article.updatedAt).toLocaleDateString('tr-TR')}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href={`/admin/makaleler/${article.id}`}
                                    className="p-2 text-gray-400 hover:text-[#c9a961] transition-colors"
                                >
                                    <FileText className="w-5 h-5" />
                                </Link>
                            </div>
                        ))}
                        {recentArticles.length === 0 && (
                            <p className="text-gray-500 text-center py-4">Henüz makale bulunmuyor.</p>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-lg font-bold text-gray-900">Hızlı İşlemler</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/makaleler/new" className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-all hover:border-[#c9a961] hover:bg-[#c9a961]/5 group">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-[#c9a961] transition-colors">
                                <Newspaper className="h-6 w-6 text-gray-500 group-hover:text-white" />
                            </div>
                            <p className="font-bold text-gray-700 group-hover:text-[#c9a961]">Yeni Makale Yaz</p>
                            <span className="text-xs text-gray-400 mt-1">AI Destekli Editör</span>
                        </Link>

                        <button className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-all hover:border-[#c9a961] hover:bg-[#c9a961]/5 group">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-[#c9a961] transition-colors">
                                <Users className="h-6 w-6 text-gray-500 group-hover:text-white" />
                            </div>
                            <p className="font-bold text-gray-700 group-hover:text-[#c9a961]">Kullanıcı Ekle</p>
                            <span className="text-xs text-gray-400 mt-1">Yönetici veya Editör</span>
                        </button>

                        <button className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 text-center transition-all hover:border-[#c9a961] hover:bg-[#c9a961]/5 group">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-[#c9a961] transition-colors">
                                <Calendar className="h-6 w-6 text-gray-500 group-hover:text-white" />
                            </div>
                            <p className="font-bold text-gray-700 group-hover:text-[#c9a961]">Randevular</p>
                            <span className="text-xs text-gray-400 mt-1">Takvimi Görüntüle</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
