import Link from 'next/link'
import { FaTiktok, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-[#262b3e] text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* About */}
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d4af7a]">
                                <span className="text-xl font-bold text-white">S</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base font-bold tracking-wider text-white">SEVİNÇ</span>
                                <span className="text-[9px] tracking-widest text-gray-400">HUKUK BÜROSU</span>
                            </div>
                        </div>
                        <p className="mb-4 text-sm leading-relaxed">
                            Ceza, aile, ticaret, medeni ve idari hukuk alanlarında profesyonel hukuki danışmanlık hizmetleri sunuyoruz.
                        </p>
                        <div className="flex gap-3">
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-[#c9a961]"
                            >
                                <FaTiktok className="h-4 w-4" />
                            </Link>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-[#c9a961]"
                            >
                                <FaFacebookF className="h-4 w-4" />
                            </Link>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-[#c9a961]"
                            >
                                <FaLinkedinIn className="h-4 w-4" />
                            </Link>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 transition-colors hover:bg-[#c9a961]"
                            >
                                <FaInstagram className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">Hızlı Bağlantılar</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-[#c9a961]">
                                    Ana Sayfa
                                </Link>
                            </li>
                            <li>
                                <Link href="/ekibimiz" className="hover:text-[#c9a961]">
                                    Ekibimiz
                                </Link>
                            </li>
                            <li>
                                <Link href="/makaleler" className="hover:text-[#c9a961]">
                                    Makaleler
                                </Link>
                            </li>
                            <li>
                                <Link href="/iletisim" className="hover:text-[#c9a961]">
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Services */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">Hukuk Alanları</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/ceza-hukuku" className="hover:text-[#c9a961]">
                                    Ceza Hukuku
                                </Link>
                            </li>
                            <li>
                                <Link href="/borclar-hukuku" className="hover:text-[#c9a961]">
                                    Borçlar Hukuku
                                </Link>
                            </li>
                            <li>
                                <Link href="/ticaret-hukuku" className="hover:text-[#c9a961]">
                                    Ticaret Hukuku
                                </Link>
                            </li>
                            <li>
                                <Link href="/aile-hukuku" className="hover:text-[#c9a961]">
                                    Aile Hukuku
                                </Link>
                            </li>
                            <li>
                                <Link href="/icra-hukuku" className="hover:text-[#c9a961]">
                                    İcra Hukuku
                                </Link>
                            </li>
                            <li>
                                <Link href="/is-hukuku" className="hover:text-[#c9a961]">
                                    İş Hukuku
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">İletişim</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c9a961]" />
                                <span>Merkez Mah., Büyükdere Cad. No:123, Şişli/İstanbul</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 flex-shrink-0 text-[#c9a961]" />
                                <Link href="tel:+905551234567" className="hover:text-[#c9a961]">
                                    +90 555 123 4567
                                </Link>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 flex-shrink-0 text-[#c9a961]" />
                                <Link href="mailto:info@sevinc.com" className="hover:text-[#c9a961]">
                                    info@sevinc.com
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm">
                    <p>
                        © {new Date().getFullYear()} Sevinç Hukuk Bürosu. Tüm hakları saklıdır. |{' '}
                        <Link href="/gizlilik-politikasi" className="hover:text-[#c9a961]">
                            Gizlilik Politikası
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}
