
'use client'

import { useState } from 'react'
import { Save, Lock, Bell, Settings } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function SettingsForm({ initialData }: { initialData: any }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    // Parse JSON fields safely or default to empty
    const contact = initialData?.contact as any || {}
    const social = initialData?.social as any || {}
    const siteName = (initialData?.siteName as any)?.tr || ''

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                toast.success('Ayarlar güncellendi!')
                router.refresh()
            } else {
                throw new Error('Failed')
            }
        } catch (error) {
            toast.error('Hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-[#2d3e50] rounded-lg text-white">
                            <Settings className="w-6 h-6" />
                        </div>
                        Genel Ayarlar
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* General Info */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Site Kimliği</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Site Başlığı</label>
                                <input name="siteName" defaultValue={siteName} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">E-posta</label>
                                <input name="email" defaultValue={contact.email} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/20" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Telefon</label>
                                <input name="phone" defaultValue={contact.phone} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/20" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Adres</label>
                                <textarea name="address" rows={3} defaultValue={contact.address} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/20" />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-6 mt-8">Sosyal Medya</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Facebook</label>
                                <input name="facebook" defaultValue={social.facebook} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/20" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Twitter</label>
                                <input name="twitter" defaultValue={social.twitter} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/20" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Instagram</label>
                                <input name="instagram" defaultValue={social.instagram} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/20" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn</label>
                                <input name="linkedin" defaultValue={social.linkedin} className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/20" placeholder="https://..." />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button disabled={loading} className="flex items-center gap-2 bg-[#c9a961] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#b08a5d] transition-colors shadow-lg shadow-[#c9a961]/20 disabled:opacity-50">
                                <Save className="w-4 h-4" />
                                {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Side Settings - Visual Only for now as they require Auth/Notification overhaul */}
                <div className="space-y-6 opacity-60 pointer-events-none grayscale">
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-red-500" />
                            Güvenlik (Yakında)
                        </h3>
                        {/* ... */}
                    </div>
                </div>
            </div>
        </form>
    )
}
