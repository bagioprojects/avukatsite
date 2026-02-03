import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export function Contact() {
    return (
        <section className="bg-gray-50 py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
                        İletişim
                    </h2>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="mb-1 font-bold text-gray-900">Adres</h3>
                                    <Link
                                        href="https://maps.google.com"
                                        target="_blank"
                                        className="text-gray-600 hover:text-blue-600"
                                    >
                                        Merkez Mahallesi, Büyükdere Caddesi No:123, Kat:7 Daire:706, Şişli/İstanbul
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="mb-2 font-bold text-gray-900">Telefon</h3>
                                    <div className="space-y-1">
                                        <Link
                                            href="tel:+905551234567"
                                            className="block text-gray-600 hover:text-blue-600"
                                        >
                                            +90 555 123 4567
                                        </Link>
                                        <Link
                                            href="tel:+902121234567"
                                            className="block text-gray-600 hover:text-blue-600"
                                        >
                                            +90 212 123 4567
                                        </Link>
                                        <Link
                                            href="tel:+905551234568"
                                            className="block text-gray-600 hover:text-blue-600"
                                        >
                                            +90 555 123 4568
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="mb-1 font-bold text-gray-900">E-posta</h3>
                                    <Link
                                        href="mailto:info@avukatlik.com"
                                        className="text-gray-600 hover:text-blue-600"
                                    >
                                        info@avukatlik.com
                                    </Link>
                                </div>
                            </div>

                            <div className="pt-6">
                                <h3 className="mb-3 font-bold text-gray-900">Bizi Nasıl Bulursunuz</h3>
                                <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
                                    {/* Placeholder for map */}
                                    <div className="flex h-full items-center justify-center text-gray-400">
                                        Harita yükleniyor...
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="rounded-lg border border-gray-200 bg-white p-8">
                            <h3 className="mb-6 text-xl font-bold text-gray-900">
                                Bize Ulaşın
                            </h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                                        Ad Soyad
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Adınız ve soyadınız"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                                        E-posta
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="E-posta adresiniz"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                                        Telefon
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Telefon numaranız"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                                        Mesajınız
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Mesajınızı yazın..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                                >
                                    Gönder
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
