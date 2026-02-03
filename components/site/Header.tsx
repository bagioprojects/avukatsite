'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, MapPin, Phone, ChevronDown } from 'lucide-react'
import { FaTiktok, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [servicesOpen, setServicesOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            {/* Top Contact Bar - Dark Navy Blue */}
            <div className="hidden md:block bg-[#182141] text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-9 text-sm">
                        <div className="flex items-center gap-6">
                            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                                <MapPin className="w-3 h-3" />
                                <span>Maslak, İstanbul</span>
                            </a>
                            <a href="tel:+3725188763" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors">
                                <Phone className="w-3 h-3" />
                                <span>+372 5188 763</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                                <FaTiktok className="w-3 h-3" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                                <FaFacebookF className="w-3 h-3" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                                <FaLinkedinIn className="w-3 h-3" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                                <FaInstagram className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header - White Background */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-[88px]">
                        {/* Logo - Gold square with white S */}
                        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                            <div className="w-[42px] h-[42px] bg-[#c09767] flex items-center justify-center">
                                <span className="text-white text-2xl font-bold">S</span>
                            </div>
                            <div className="flex flex-col justify-center leading-none">
                                <span className="text-[18px] font-bold text-[#182141] tracking-tight font-serif">
                                    SEVİNÇ
                                </span>
                                <span className="text-[9px] font-medium text-gray-500 tracking-[0.15em] mt-0.5">
                                    HUKUK BÜROSU
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Centered */}
                        <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
                            <Link href="/ekibimiz" className="text-[16px] font-medium text-[#182141] hover:text-[#c9a961] transition-colors whitespace-nowrap">
                                Ekibimiz
                            </Link>

                            <div className="relative group">
                                <button className="flex items-center gap-0.5 text-[16px] font-medium text-[#182141] hover:text-[#c9a961] transition-colors whitespace-nowrap">
                                    Hizmetler
                                    <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="p-2">
                                        <Link href="/hizmetler/sirket-kurulumu" className="block px-4 py-2.5 text-sm text-[#182141] hover:bg-gray-50 rounded-md transition-colors">
                                            Şirket Kurulumu
                                        </Link>
                                        <Link href="/hizmetler/ticaret-hukuku" className="block px-4 py-2.5 text-sm text-[#182141] hover:bg-gray-50 rounded-md transition-colors">
                                            Ticaret Hukuku
                                        </Link>
                                        <Link href="/hizmetler/is-hukuku" className="block px-4 py-2.5 text-sm text-[#182141] hover:bg-gray-50 rounded-md transition-colors">
                                            İş Hukuku
                                        </Link>
                                        <Link href="/hizmetler/vergi-hukuku" className="block px-4 py-2.5 text-sm text-[#182141] hover:bg-gray-50 rounded-md transition-colors">
                                            Vergi Hukuku
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/makaleler" className="text-[16px] font-medium text-[#182141] hover:text-[#c9a961] transition-colors whitespace-nowrap">
                                Makaleler
                            </Link>
                            <Link href="/iletisim" className="text-[16px] font-medium text-[#182141] hover:text-[#c9a961] transition-colors whitespace-nowrap">
                                İletişim
                            </Link>
                        </nav>

                        {/* Right Side - Language + CTA */}
                        <div className="flex items-center gap-2">
                            {/* Language Switcher - Dark Navy Circle */}
                            <div className="hidden lg:flex items-center bg-[#182141] rounded-full h-[32px] px-1">
                                <button className="text-[12px] font-semibold text-white bg-[#182141] px-2.5 h-full rounded-full transition-colors">
                                    TR
                                </button>
                                <button className="text-[12px] font-medium text-gray-400 hover:text-white px-2.5 h-full transition-colors">
                                    EN
                                </button>
                                <button className="text-[12px] font-medium text-gray-400 hover:text-white px-2.5 h-full transition-colors">
                                    RU
                                </button>
                            </div>

                            {/* CTA Button - Gold Circle */}
                            <Link
                                href="/iletisim"
                                className="hidden lg:flex items-center bg-[#c09767] hover:bg-[#b08a5d] text-white px-5 h-[32px] rounded-full text-[14px] font-semibold transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md gap-1"
                            >
                                İletişime Geçin
                                <span className="text-sm">→</span>
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 bg-white">
                        <div className="px-4 py-4 space-y-3">
                            <Link
                                href="/ekibimiz"
                                className="block px-4 py-2.5 text-base font-medium text-[#182141] hover:bg-gray-50 rounded-md transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Ekibimiz
                            </Link>

                            <div>
                                <button
                                    onClick={() => setServicesOpen(!servicesOpen)}
                                    className="flex items-center justify-between w-full px-4 py-2.5 text-base font-medium text-[#182141] hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    Hizmetler
                                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {servicesOpen && (
                                    <div className="mt-2 ml-4 space-y-2">
                                        <Link
                                            href="/hizmetler/sirket-kurulumu"
                                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Şirket Kurulumu
                                        </Link>
                                        <Link
                                            href="/hizmetler/ticaret-hukuku"
                                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Ticaret Hukuku
                                        </Link>
                                        <Link
                                            href="/hizmetler/is-hukuku"
                                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            İş Hukuku
                                        </Link>
                                        <Link
                                            href="/hizmetler/vergi-hukuku"
                                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Vergi Hukuku
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/makaleler"
                                className="block px-4 py-2.5 text-base font-medium text-[#182141] hover:bg-gray-50 rounded-md transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Makaleler
                            </Link>
                            <Link
                                href="/iletisim"
                                className="block px-4 py-2.5 text-base font-medium text-[#182141] hover:bg-gray-50 rounded-md transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                İletişim
                            </Link>

                            {/* Mobile Language Switcher */}
                            <div className="flex items-center gap-2 px-4 py-3">
                                <span className="text-sm text-gray-600 mr-2">Dil:</span>
                                <button className="text-sm font-bold text-white bg-[#182141] rounded-full px-3 py-1.5">
                                    TR
                                </button>
                                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5">
                                    EN
                                </button>
                                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5">
                                    RU
                                </button>
                            </div>

                            {/* Mobile CTA */}
                            <Link
                                href="/online-randevu"
                                className="block w-full bg-gradient-to-r from-[#c9a961] to-[#b89851] text-white text-center px-6 py-3 rounded-full font-semibold shadow-md"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                İletişime Geçin →
                            </Link>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}
