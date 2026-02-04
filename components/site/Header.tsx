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
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md h-[70px]' : 'bg-white h-[88px]'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 h-full">
                    <div className="flex items-center justify-between h-full">
                        {/* Logo - Gold square with white S */}
                        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                            <div className="w-[40px] h-[40px] bg-[#c09767] flex items-center justify-center transition-all duration-300">
                                <span className="text-white text-xl font-bold">S</span>
                            </div>
                            <div className="flex flex-col justify-center leading-none">
                                <span className="text-[17px] font-bold text-[#182141] tracking-tight font-serif">
                                    SEVİNÇ
                                </span>
                                <span className="text-[8px] font-medium text-gray-500 tracking-[0.15em] mt-0.5">
                                    HUKUK BÜROSU
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Centered */}
                        <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 transform -translate-x-1/2">
                            <Link href="/ekibimiz" className="text-[15px] font-medium text-[#182141] hover:text-[#c9a961] transition-colors whitespace-nowrap">
                                Ekibimiz
                            </Link>

                            <div className="relative group">
                                <button className="flex items-center gap-0.5 text-[15px] font-medium text-[#182141] hover:text-[#c9a961] transition-colors whitespace-nowrap">
                                    Hizmetler
                                    <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                                <div className="absolute left-0 top-full pt-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2">
                                        <Link href="/hizmetler/sirket-kurulumu" className="block px-4 py-2.5 text-sm text-[#182141] hover:border-l-2 hover:border-[#c9a961] hover:bg-gray-50 transition-all">
                                            Şirket Kurulumu
                                        </Link>
                                        <Link href="/hizmetler/ticaret-hukuku" className="block px-4 py-2.5 text-sm text-[#182141] hover:border-l-2 hover:border-[#c9a961] hover:bg-gray-50 transition-all">
                                            Ticaret Hukuku
                                        </Link>
                                        <Link href="/hizmetler/is-hukuku" className="block px-4 py-2.5 text-sm text-[#182141] hover:border-l-2 hover:border-[#c9a961] hover:bg-gray-50 transition-all">
                                            İş Hukuku
                                        </Link>
                                        <Link href="/hizmetler/vergi-hukuku" className="block px-4 py-2.5 text-sm text-[#182141] hover:border-l-2 hover:border-[#c9a961] hover:bg-gray-50 transition-all">
                                            Vergi Hukuku
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/makaleler" className="text-[15px] font-medium text-[#182141] hover:text-[#c9a961] transition-colors whitespace-nowrap">
                                Makaleler
                            </Link>
                            <Link href="/iletisim" className="text-[15px] font-medium text-[#182141] hover:text-[#c9a961] transition-colors whitespace-nowrap">
                                İletişim
                            </Link>
                        </nav>

                        {/* Right Side - Language + CTA */}
                        <div className="flex items-center gap-4">
                            {/* Language Switcher - Dark Navy Capsule */}
                            <div className="hidden lg:flex items-center bg-[#2d3444] rounded-full h-[34px] px-1 shadow-sm">
                                <button className="text-[11px] font-bold text-white bg-white/10 px-3 h-[26px] rounded-full transition-all">
                                    TR
                                </button>
                                <button className="text-[11px] font-medium text-gray-400 hover:text-white px-3 h-full transition-colors">
                                    EN
                                </button>
                                <button className="text-[11px] font-medium text-gray-400 hover:text-white px-3 h-full transition-colors">
                                    RU
                                </button>
                            </div>

                            {/* CTA Button - Gold Capsule */}
                            <Link
                                href="/iletisim"
                                className="hidden lg:flex items-center bg-[#c09767] hover:bg-[#b08a5d] text-white px-7 h-[36px] rounded-full text-[13px] font-bold transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-lg gap-2"
                            >
                                İletişime Geçin
                                <span className="text-sm font-bold">→</span>
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
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
                    <div className="lg:hidden fixed inset-0 top-[70px] z-50 bg-white overflow-y-auto animate-in slide-in-from-right duration-300">
                        <div className="px-6 py-8 space-y-6">
                            <nav className="flex flex-col space-y-4">
                                <Link
                                    href="/ekibimiz"
                                    className="text-xl font-bold text-[#182141] py-2 border-b border-gray-100"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Ekibimiz
                                </Link>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setServicesOpen(!servicesOpen)}
                                        className="flex items-center justify-between w-full text-xl font-bold text-[#182141] py-2 border-b border-gray-100"
                                    >
                                        Hizmetler
                                        <ChevronDown className={`w-6 h-6 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {servicesOpen && (
                                        <div className="pl-4 space-y-4 pt-2">
                                            <Link href="/hizmetler/sirket-kurulumu" className="block text-lg text-gray-600" onClick={() => setMobileMenuOpen(false)}>Şirket Kurulumu</Link>
                                            <Link href="/hizmetler/ticaret-hukuku" className="block text-lg text-gray-600" onClick={() => setMobileMenuOpen(false)}>Ticaret Hukuku</Link>
                                            <Link href="/hizmetler/is-hukuku" className="block text-lg text-gray-600" onClick={() => setMobileMenuOpen(false)}>İş Hukuku</Link>
                                            <Link href="/hizmetler/vergi-hukuku" className="block text-lg text-gray-600" onClick={() => setMobileMenuOpen(false)}>Vergi Hukuku</Link>
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href="/makaleler"
                                    className="text-xl font-bold text-[#182141] py-2 border-b border-gray-100"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Makaleler
                                </Link>
                                <Link
                                    href="/iletisim"
                                    className="text-xl font-bold text-[#182141] py-2 border-b border-gray-100"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    İletişim
                                </Link>
                            </nav>

                            <div className="pt-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Dil Seçimi</span>
                                    <div className="flex items-center bg-gray-100 rounded-full p-1">
                                        <button className="bg-[#182141] text-white text-xs font-bold px-4 py-2 rounded-full">TR</button>
                                        <button className="text-gray-500 text-xs font-bold px-4 py-2">EN</button>
                                        <button className="text-gray-500 text-xs font-bold px-4 py-2">RU</button>
                                    </div>
                                </div>

                                <Link
                                    href="/iletisim"
                                    className="flex items-center justify-center w-full bg-[#182141] text-white h-[60px] rounded-full text-lg font-bold shadow-xl"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    İletişime Geçin
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}
