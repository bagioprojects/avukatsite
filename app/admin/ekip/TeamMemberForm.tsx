
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { User, Mail, Phone, Briefcase, Shield, Save, ChevronLeft, Trash2, Camera } from 'lucide-react'

export default function TeamMemberForm({ initialData, mode = 'create' }: { initialData?: any, mode?: 'create' | 'edit' }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState(initialData?.avatar || '')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        // Transform title to simple object for now or handle detailed language input
        // For 20x speed, we assume single input saves to TR
        const payload = {
            ...data,
            title: { tr: data.title_tr },
            role: data.role
        }

        const url = mode === 'create' ? '/api/team' : `/api/team/${initialData.id}`
        const method = mode === 'create' ? 'POST' : 'PUT'

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                toast.success(mode === 'create' ? 'Üye eklendi' : 'Üye güncellendi')
                router.push('/admin/ekip')
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
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">{mode === 'create' ? 'Yeni Ekip Üyesi' : 'Üye Düzenle'}</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Avatar Area */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-40 h-40 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer mb-6">
                            {avatarPreview ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-16 h-16 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs">
                                <Camera className="w-6 h-6 mb-1" />
                                Değiştir
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Profil Fotoğrafı</p>
                        <input name="avatar" value={avatarPreview} onChange={e => setAvatarPreview(e.target.value)} placeholder="Avatar URL..." className="w-full text-xs p-2 bg-gray-50 rounded-lg border-none" />
                    </div>
                </div>

                {/* Right: Info Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Ad Soyad</label>
                                    <input name="name" defaultValue={initialData?.name} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">E-posta</label>
                                    <input name="email" type="email" defaultValue={initialData?.email} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Telefon</label>
                                    <input name="phone" defaultValue={initialData?.phone} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Ünvan (Türkçe)</label>
                                    <input name="title_tr" defaultValue={initialData?.title?.tr} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" placeholder="Örn: Kıdemli Avukat" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Rol / Yetki</label>
                                    <select name="role" defaultValue={initialData?.role || 'EDITOR'} className="w-full px-4 py-3 rounded-xl border border-gray-200">
                                        <option value="SUPER_ADMIN">Süper Admin</option>
                                        <option value="ADMIN">Yönetici</option>
                                        <option value="EDITOR">Editör</option>
                                        <option value="VIEWER">Görüntüleyici</option>
                                    </select>
                                </div>

                                {mode === 'create' && (
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Şifre</label>
                                        <input name="password" type="password" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" />
                                        <p className="text-xs text-gray-400 mt-1">En az 6 karakter</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                {mode === 'edit' && <button type="button" className="px-6 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl">Profili Sil</button>}
                                <button disabled={loading} className="bg-[#2d3e50] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3d5065] transition-colors flex items-center gap-2">
                                    <Save className="w-5 h-5" />
                                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
