
import { FileText, Plus, Edit, Eye } from 'lucide-react'
import Link from 'next/link'
import { PageService } from '@/services/page.service'

export default async function PagesPage() {
    const pages = await PageService.getAllPages()
    return (
        <div className="space-y-8">
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-[#2d3e50] rounded-lg text-white">
                            <FileText className="w-6 h-6" />
                        </div>
                        Sayfa Yönetimi
                    </h1>
                    <p className="text-gray-500 mt-2 pl-1">Statik sayfaları düzenleyin (Hakkımızda, İletişim vb).</p>
                </div>

                <Link href="/admin/sayfalar/new" className="group relative flex items-center gap-2 bg-gradient-to-r from-[#c9a961] to-[#b08a5d] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#c9a961]/20 hover:shadow-xl hover:scale-105 transition-all">
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    Yeni Sayfa Ekle
                </Link>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl overflow-hidden p-1">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Sayfa Adı</th>
                            <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">URL</th>
                            <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Durum</th>
                            <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {pages.map((page: any) => (
                            <tr key={page.id} className="group hover:bg-blue-50/30 transition-colors">
                                <td className="px-8 py-5 font-bold text-gray-900">{(page.title as any)?.tr || 'Başlıksız'}</td>
                                <td className="px-6 py-5 font-mono text-xs text-blue-600 bg-blue-50/50 rounded-lg w-min whitespace-nowrap px-2 py-1">/{page.slug}</td>
                                <td className="px-6 py-5">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-bold text-green-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                        Yayında
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <Link href={`/admin/sayfalar/${page.id}`} className="p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:text-blue-600 shadow-sm"><Edit className="w-4 h-4" /></Link>
                                        <button className="p-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 shadow-sm"><Eye className="w-4 h-4" /></button>
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
