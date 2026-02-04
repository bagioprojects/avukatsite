
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Calendar, User, Phone, Mail, Clock, CheckCircle } from 'lucide-react'

export default function NewAppointmentPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())

        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                toast.success('Randevu oluşturuldu!')
                router.push('/admin/randevular')
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
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-[#2d3e50] rounded-lg text-white">
                    <Calendar className="w-6 h-6" />
                </div>
                Yeni Randevu Oluştur
            </h1>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Ad Soyad</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input name="name" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" placeholder="Müşteri Adı" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Telefon</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input name="phone" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" placeholder="0555..." />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">E-posta</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input name="email" type="email" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" placeholder="ornek@email.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Tarih</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input name="date" type="datetime-local" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Durum</label>
                            <select name="status" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]">
                                <option value="CONFIRMED">Onaylandı</option>
                                <option value="PENDING">Beklemede</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Not / Mesaj</label>
                            <textarea name="message" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c9a961]/20 focus:border-[#c9a961]" placeholder="Müşteri notu..." />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button disabled={loading} className="bg-[#2d3e50] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3d5065] transition-colors flex items-center gap-2">
                            {loading ? 'Kaydediliyor...' : <><CheckCircle className="w-5 h-5" /> Randevu Oluştur</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
