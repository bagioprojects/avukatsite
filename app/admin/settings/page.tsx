'use client'

import { Save } from 'lucide-react'

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Site Ayarları</h1>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <form className="space-y-6">
                    {/* Site Name */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Site Adı</label>
                        <input
                            type="text"
                            defaultValue="Sevinç Hukuk Bürosu"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                        />
                    </div>

                    {/* Contact Email */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">İletişim E-posta</label>
                        <input
                            type="email"
                            defaultValue="info@sevinclaw.com"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Telefon</label>
                        <input
                            type="tel"
                            defaultValue="+90 555 123 4567"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Adres</label>
                        <textarea
                            rows={3}
                            defaultValue="Merkez Mah., Büyükdere Cad. No:123, İstanbul"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                        />
                    </div>

                    {/* Social Media */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">Facebook</label>
                            <input
                                type="url"
                                placeholder="https://facebook.com/sevinclaw"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">LinkedIn</label>
                            <input
                                type="url"
                                placeholder="https://linkedin.com/company/sevinclaw"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                            />
                        </div>
                    </div>

                    {/* Google Analytics */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Google Analytics ID</label>
                        <input
                            type="text"
                            placeholder="G-XXXXXXXXXX"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="flex items-center gap-2 rounded-lg bg-[#c9a961] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#b89851]"
                    >
                        <Save className="h-5 w-5" />
                        Ayarları Kaydet
                    </button>
                </form>
            </div>
        </div>
    )
}
