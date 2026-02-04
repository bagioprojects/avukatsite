'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { toast } from 'sonner'

export function Contact() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (res.ok) {
                toast.success('Mesajınız başarıyla iletildi. En kısa sürede size döneceğiz.')
                setFormData({ name: '', email: '', phone: '', message: '' })
            } else {
                toast.error(data.error || 'Mesaj iletilemedi.')
            }
        } catch (error) {
            toast.error('Bağlantı hatası oluştu.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="bg-gray-50 py-16 lg:py-24" id="iletisim">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center text-[#182141]">
                    <span className="text-[#c09767] font-bold tracking-[0.3em] uppercase mb-4 block text-xs">
                        Bize Ulaşın
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold font-serif">
                        İletişim
                    </h2>
                </div>

                <div className="mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Contact Information Cards */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-[#182141] text-white rounded-2xl flex items-center justify-center mb-4">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Adres</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Merkez Mahallesi, Büyükdere Caddesi No:123, Şişli/İstanbul
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-[#c09767] text-white rounded-2xl flex items-center justify-center mb-4">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">Telefon</h3>
                                <p className="text-gray-500 text-sm">
                                    +90 555 123 45 67
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-[#182141] text-white rounded-2xl flex items-center justify-center mb-4">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">E-posta</h3>
                                <p className="text-gray-500 text-sm">
                                    info@sevinc.com
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-[#182141] mb-8 font-serif">
                                Hukuki Danışmanlık İçin Yazın
                            </h3>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                            Ad Soyad
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 rounded-2xl border-none px-6 py-4 focus:ring-2 focus:ring-[#c09767] focus:bg-white transition-all text-sm"
                                            placeholder="Adınız ve soyadınız"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                            E-posta
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 rounded-2xl border-none px-6 py-4 focus:ring-2 focus:ring-[#c09767] focus:bg-white transition-all text-sm"
                                            placeholder="E-posta adresiniz"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                        Telefon (Opsiyonel)
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 rounded-2xl border-none px-6 py-4 focus:ring-2 focus:ring-[#c09767] focus:bg-white transition-all text-sm"
                                        placeholder="Telefon numaranız"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                        Mesajınız
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 rounded-2xl border-none px-6 py-4 focus:ring-2 focus:ring-[#c09767] focus:bg-white transition-all text-sm resize-none"
                                        placeholder="Hukuki sorunuzu veya talebinizi buraya yazın..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[#182141] hover:bg-[#c09767] text-white px-10 py-5 rounded-full font-bold text-sm tracking-widest transition-all shadow-xl hover:shadow-[#c09767]/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group w-full md:w-auto"
                                >
                                    {loading ? 'GÖNDERİLİYOR...' : 'MESAJI GÖNDER'}
                                    {!loading && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
