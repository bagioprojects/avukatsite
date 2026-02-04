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
            <div className="hidden md:block bg-[#111e38] text-white">
                <div className="max-w-[1440px] mx-auto px-8 md:px-12">
                    <div className="flex items-center justify-between h-10 text-xs font-bold tracking-wide">
                        <div className="flex items-center gap-8">
                            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#d1ae83] transition-colors">
                                <MapPin className="w-3.5 h-3.5 text-[#d1ae83]" />
                                <span>Maslak, İstanbul</span>
                            </a>
                            <a href="tel:+3725188763" className="flex items-center gap-2 hover:text-[#d1ae83] transition-colors">
                                <Phone className="w-3.5 h-3.5 text-[#d1ae83]" />
                                <span>+372 5188 763</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#d1ae83] transition-colors">
                                <FaTiktok className="w-3.5 h-3.5" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#d1ae83] transition-colors">
                                <FaFacebookF className="w-3.5 h-3.5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#d1ae83] transition-colors">
                                <FaLinkedinIn className="w-3.5 h-3.5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#d1ae83] transition-colors">
                                <FaInstagram className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header - White Background */}
            <header
                className={`sticky top-0 z-50 transition-all duration-500 ease-in-out h-20 ${scrolled
                    ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
                    : 'bg-white'
                    }`}
            >
                <div className="max-w-[1440px] mx-auto px-8 md:px-12 h-full">
                    <div className="flex items-center justify-between h-full relative">
                        {/* Logo - Standardized to Compact Size */}
                        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
                            <div className="w-12 h-12 bg-[#d1ae83]/90 flex items-center justify-center transition-all duration-500 group-hover:bg-[#c09767]">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-white"
                                >
                                    <path d="M12 4C10.8954 4 10 4.89543 10 6V18C10 19.1046 10.8954 20 12 20C13.1046 20 14 19.1046 14 18V6C14 4.89543 13.1046 4 12 4Z" fill="white" />
                                    <path d="M7 8C5.89543 8 5 8.89543 5 10V14C5 15.1046 5.89543 16 7 16C8.10457 16 9 15.1046 9 14V10C9 8.89543 8.10457 8 7 8Z" fill="white" />
                                    <path d="M17 8C15.8954 8 15 8.89543 15 10V14C15 15.1046 15.8954 16 17 16C18.1046 16 19 15.1046 19 14V10C19 8.89543 18.1046 8 17 8Z" fill="white" />
                                </svg>
                            </div>
                            <div className="flex flex-col justify-center leading-tight">
                                <span className="text-lg font-bold text-[#111e38] tracking-[0.05em] uppercase font-sans">
                                    SEVİNÇ
                                </span>
                                <span className="text-[8px] font-bold text-[#b8956b] tracking-[0.3em] uppercase mt-0.5 whitespace-nowrap">
                                    HUKUK BÜROSU
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Standardized to Compact Size */}
                        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
                            <Link href="/ekibimiz" className="text-base font-bold text-[#111e38] hover:text-[#b8956b] transition-all duration-300 whitespace-nowrap">
                                Ekibimiz
                            </Link>

                            <div className="relative group">
                                <button className="flex items-center gap-1.5 text-base font-bold text-[#111e38] hover:text-[#b8956b] transition-all duration-300 whitespace-nowrap">
                                    Hizmetler
                                    <ChevronDown className="w-4 h-4 opacity-60" />
                                </button>
                                <div className="absolute left-0 top-full pt-6 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                    <div className="bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
                                        <Link href="/hizmetler/sirket-kurulumu" className="block px-6 py-4 text-base font-bold text-[#111e38] hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-[#b8956b]">
                                            Şirket Kurulumu
                                        </Link>
                                        <Link href="/hizmetler/ticaret-hukuku" className="block px-6 py-4 text-base font-bold text-[#111e38] hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-[#b8956b]">
                                            Ticaret Hukuku
                                        </Link>
                                        <Link href="/hizmetler/is-hukuku" className="block px-6 py-4 text-base font-bold text-[#111e38] hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-[#b8956b]">
                                            İş Hukuku
                                        </Link>
                                        <Link href="/hizmetler/vergi-hukuku" className="block px-6 py-4 text-base font-bold text-[#111e38] hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-[#b8956b]">
                                            Vergi Hukuku
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link href="/makaleler" className="text-base font-bold text-[#111e38] hover:text-[#b8956b] transition-all duration-300 whitespace-nowrap">
                                Makaleler
                            </Link>
                            <Link href="/iletisim" className="text-base font-bold text-[#111e38] hover:text-[#b8956b] transition-all duration-300 whitespace-nowrap">
                                İletişim
                            </Link>
                        </nav>

                        {/* Right Side - Standardized to Compact Size */}
                        <div className="flex items-center gap-6">
                            {/* Language Switcher */}
                            <div className="hidden lg:flex items-center bg-gray-50/50 rounded-full border border-gray-100 p-1 scale-90">
                                <button className="text-sm font-black text-white bg-[#0e172a] px-4 py-2 rounded-full transition-all shadow-sm">
                                    TR
                                </button>
                                <button className="text-sm font-bold text-[#94a3b8] hover:text-[#0e172a] px-4 py-2 transition-colors">
                                    EN
                                </button>
                                <button className="text-sm font-bold text-[#94a3b8] hover:text-[#0e172a] px-4 py-2 transition-colors">
                                    RU
                                </button>
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/iletisim"
                                className="hidden lg:flex items-center bg-[#d1ae83] hover:bg-[#c09767] text-white transition-all duration-300 whitespace-nowrap group gap-4 shadow-sm hover:shadow-md rounded-full pl-6 pr-2 py-2 text-base font-bold"
                            >
                                İletişime Geçin
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all translate-x-1">
                                    <span className="text-lg leading-none">→</span>
                                </div>
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-3 rounded-xl text-[#111e38] hover:bg-gray-50 transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-8 h-8" />
                                ) : (
                                    <Menu className="w-8 h-8" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 top-[70px] z-50 bg-white overflow-y-auto animate-in slide-in-from-right duration-500">
                        <div className="px-8 py-12 space-y-10">
                            <nav className="flex flex-col gap-8">
                                <Link
                                    href="/ekibimiz"
                                    className="text-3xl font-black text-[#111e38]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Ekibimiz
                                </Link>

                                <div>
                                    <button
                                        onClick={() => setServicesOpen(!servicesOpen)}
                                        className="flex items-center justify-between w-full text-3xl font-black text-[#111e38]"
                                    >
                                        Hizmetler
                                        <ChevronDown className={`w-10 h-10 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {servicesOpen && (
                                        <div className="mt-6 flex flex-col gap-6 pl-6 border-l-4 border-gray-100">
                                            <Link href="/hizmetler/sirket-kurulumu" className="text-xl font-bold text-gray-500" onClick={() => setMobileMenuOpen(false)}>Şirket Kurulumu</Link>
                                            <Link href="/hizmetler/ticaret-hukuku" className="text-xl font-bold text-gray-500" onClick={() => setMobileMenuOpen(false)}>Ticaret Hukuku</Link>
                                            <Link href="/hizmetler/is-hukuku" className="text-xl font-bold text-gray-500" onClick={() => setMobileMenuOpen(false)}>İş Hukuku</Link>
                                            <Link href="/hizmetler/vergi-hukuku" className="text-xl font-bold text-gray-500" onClick={() => setMobileMenuOpen(false)}>Vergi Hukuku</Link>
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href="/makaleler"
                                    className="text-3xl font-black text-[#111e38]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Makaleler
                                </Link>
                                <Link
                                    href="/iletisim"
                                    className="text-3xl font-black text-[#111e38]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    İletişim
                                </Link>
                            </nav>

                            <div className="pt-12 border-t border-gray-100">
                                <div className="mb-10">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Dil Seçimi</p>
                                    <div className="flex bg-gray-50 rounded-2xl p-2 inline-flex border border-gray-100">
                                        <button className="bg-[#0e172a] text-white text-sm font-black px-8 py-3 rounded-xl shadow-lg">TR</button>
                                        <button className="text-gray-400 text-sm font-bold px-8 py-3">EN</button>
                                        <button className="text-gray-400 text-sm font-bold px-8 py-3">RU</button>
                                    </div>
                                </div>

                                <Link
                                    href="/iletisim"
                                    className="flex items-center justify-center w-full bg-[#111e38] text-white py-6 rounded-2xl text-xl font-black shadow-2xl hover:bg-[#b8956b] transition-colors"
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
