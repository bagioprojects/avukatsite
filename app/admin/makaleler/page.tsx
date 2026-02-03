import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

export default async function ArticlesManagementPage() {
    const articles = await prisma.article.findMany({
        orderBy: { updatedAt: 'desc' },
        include: {
            category: true,
            author: true
        }
    })

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Makale Yönetimi</h1>
                    <p className="text-gray-500">Blog yazılarını oluşturun, düzenleyin veya silin.</p>
                </div>
                <Link
                    href="/admin/makaleler/new"
                    className="flex items-center gap-2 bg-[#c9a961] hover:bg-[#b08a5d] text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Yeni Makale Ekle
                </Link>
            </div>

            {/* Filter/Search Bar (Optional for now) */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex gap-4">
                <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Makale başlıklarında ara..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]"
                    />
                </div>
            </div>

            {/* Articles Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#f8f9fa] border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700">Başlık</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Kategori</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Durum</th>
                            <th className="px-6 py-4 font-semibold text-gray-700">Tarih</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {articles.map((article: any) => (
                            <tr key={article.id} className="hover:bg-gray-50 group transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                            {article.coverImage ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={article.coverImage} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 line-clamp-1 max-w-xs ">{(article.title as any).tr}</p>
                                            <p className="text-xs text-gray-500">{article.author.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                                        {(article.category.name as any).tr}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${article.status === 'PUBLISHED'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${article.status === 'PUBLISHED' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                        {article.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(article.updatedAt).toLocaleDateString('tr-TR')}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/makaleler/${article.slug}`}
                                            target="_blank"
                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="Sitede Gör"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/makaleler/${article.id}`}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Düzenle"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Sil"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function FileText(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    )
}
