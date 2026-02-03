'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

const mockArticles = [
    { id: 1, title: 'Ceza Hukukunda Savunma Hakları', category: 'Ceza Hukuku', author: 'Av. Mehmet Sevinç', status: 'Published', date: '2024-01-15' },
    { id: 2, title: 'Borçlar Hukukunda Sözleşme', category: 'Borçlar Hukuku', author: 'Av. Ayşe Demir', status: 'Published', date: '2024-01-10' },
    { id: 3, title: 'Şirket Birleşmeleri', category: 'Ticaret Hukuku', author: 'Av. Can Yılmaz', status: 'Draft', date: '2024-01-08' },
]

export default function ArticlesManagement() {
    const [search, setSearch] = useState('')

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Makale Yönetimi</h1>
                <button className="flex items-center gap-2 rounded-lg bg-[#c9a961] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#b89851]">
                    <Plus className="h-5 w-5" />
                    Yeni Makale
                </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Makale ara..."
                        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                    />
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Başlık</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Kategori</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Yazar</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tarih</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {mockArticles.map((article) => (
                            <tr key={article.id} className="transition-colors hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{article.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{article.category}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{article.author}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${article.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {article.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{article.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-100">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-100">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button className="rounded p-1 text-red-600 transition-colors hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
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
