'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'

// Mock data
const mockPages = [
    { id: 1, title: 'Ceza Hukuku', slug: 'ceza-hukuku', status: 'Published', updatedAt: '2024-01-15' },
    { id: 2, title: 'Ticaret Hukuku', slug: 'ticaret-hukuku', status: 'Published', updatedAt: '2024-01-10' },
    { id: 3, title: 'Aile Hukuku', slug: 'aile-hukuku', status: 'Draft', updatedAt: '2024-01-08' },
]

export default function PagesManagement() {
    const [search, setSearch] = useState('')

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Sayfa Yönetimi</h1>
                <button className="flex items-center gap-2 rounded-lg bg-[#c9a961] px-4 py-2 font-semibold text-white transition-colors hover:bg-[#b89851]">
                    <Plus className="h-5 w-5" />
                    Yeni Sayfa
                </button>
            </div>

            {/* Search */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Sayfa ara..."
                        className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Başlık</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Slug</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Güncelleme</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {mockPages.map((page) => (
                            <tr key={page.id} className="transition-colors hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{page.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{page.slug}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${page.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {page.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{page.updatedAt}</td>
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
