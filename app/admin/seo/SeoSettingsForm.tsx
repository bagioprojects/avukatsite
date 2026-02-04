
'use client'

import { useState } from 'react'
import { BarChart3, Search, TrendingUp, Globe, Save } from 'lucide-react'
import { toast } from 'sonner'

export default function SeoSettingsForm({ initialSettings }: { initialSettings: any }) {
    const [loading, setLoading] = useState(false)
    const siteName = (initialSettings?.siteName as any)?.tr || ''
    const analytics = initialSettings?.analytics || ''

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        // Re-shape for Settings API
        const payload = {
            siteName: data.siteName, // Use this for Title Template %title% | SiteName
            analytics: data.analytics
            // description: we might need to add this to schema later, ignoring for now
        }

        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                toast.success('SEO Ayarları Güncellendi')
            } else {
                throw new Error('Failed')
            }
        } catch (e) {
            toast.error('Hata')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-[#2d3e50] rounded-lg text-white">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        SEO & Analitik
                    </h1>
                </div>
            </div>

            {/* Score Cards - Mock Data for Logic, Real Data coming later */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg shadow-green-500/20 relative overflow-hidden">
                    <h3 className="text-lg font-medium opacity-90">Site Sağlığı</h3>
                    <div className="text-5xl font-bold mt-2">100%</div>
                    <div className="mt-4 text-xs font-medium bg-white/20 inline-block px-2 py-1 rounded">Sistem Hazır</div>
                    <Search className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
                </div>
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl">
                    <h3 className="text-gray-500 font-medium text-sm">Site Haritası (Sitemap)</h3>
                    <div className="text-xl font-bold text-gray-900 mt-2">Otomatik (Dynamic)</div>
                    <div className="mt-4 flex items-center gap-2 text-green-600 text-sm font-bold">
                        <TrendingUp className="w-4 h-4" /> /sitemap.xml
                    </div>
                </div>
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl">
                    <h3 className="text-gray-500 font-medium text-sm">Robots.txt</h3>
                    <div className="text-xl font-bold text-gray-900 mt-2">Aktif</div>
                    <div className="mt-4 text-gray-400 text-xs">/robots.txt</div>
                </div>
            </div>

            {/* Settings Form */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#c9a961]" />
                    Global Meta Ayarları
                </h3>
                <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Site Genel Adı (Title Suffix)</label>
                        <input name="siteName" defaultValue={siteName} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" placeholder="Örn: Sevinç Hukuk" />
                        <p className="text-xs text-gray-400 mt-1">Sayfa başlıklarının sonuna eklenir: "İletişim | Sevinç Hukuk"</p>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Google Analytics ID</label>
                        <input name="analytics" defaultValue={analytics} placeholder="G-XXXXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" />
                    </div>

                    <button disabled={loading} className="flex items-center gap-2 bg-[#2d3e50] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3d5065] transition-colors disabled:opacity-50">
                        <Save className="w-4 h-4" />
                        {loading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                    </button>
                </form>
            </div>
        </div>
    )
}
