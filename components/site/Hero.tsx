'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/ui/Reveal'

export function Hero() {
    return (
        <section className="relative z-20 bg-[#182141] min-h-[700px] flex items-center overflow-visible">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute right-0 top-0 h-full w-[40%] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
            </div>

            {/* Desktop Image - Split Screen 40% Width */}
            <div className="hidden lg:block absolute right-0 top-0 w-[40%] h-full overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} // Match roughly with Reveal
                    className="w-full h-full"
                >
                    <img
                        src="/images/hero-image.webp"
                        alt="Lawyer Desk"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Gradient Overlay for text readability at the edge - reduced opacity */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#182141] via-[#182141]/20 to-transparent opacity-40"></div>
                </motion.div>
            </div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10 w-full pt-20 pb-40 lg:py-0">
                <div className="flex flex-col lg:flex-row items-center">

                    {/* Text Content - Left Side (60%) */}
                    <div className="w-full lg:w-[55%] pr-0 lg:pr-12 relative z-10">
                        <Reveal>
                            <span className="text-[#c09767] font-bold tracking-[0.3em] text-[11px] md:text-xs uppercase mb-6 block">
                                Sevinç Hukuk Bürosu & Danışmanlık
                            </span>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white font-serif leading-[1.1] mb-8 tracking-tight">
                                Hukukta <span className="italic font-light">Zarafet</span> <br />
                                ve <span className="text-[#c09767]">Keskin</span> Çözümler.
                            </h1>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl font-light mb-10 opacity-80">
                                25 yılı aşkın tecrübemizle, müvekkillerimize en yüksek standartlarda hukuki destek sağlıyoruz. Eston ve Türk hukuku arasında köprü kuruyoruz.
                            </p>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="https://wa.me/905551234567"
                                    target="_blank"
                                    className="bg-[#c09767] text-white px-10 py-4 rounded-full font-bold hover:bg-[#b08855] transition-all text-sm tracking-wide shadow-xl shadow-[#c09767]/20 flex items-center justify-center gap-2 group"
                                >
                                    WhatsApp ile Danışın
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                                <Link
                                    href="/#iletisim"
                                    className="border border-white/30 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all text-center backdrop-blur-sm text-sm tracking-wide"
                                >
                                    Online Randevu Al
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* Stats Card - Centered Floating at Bottom - PERFECT OVERLAP */}
            <motion.div
                className="absolute bottom-0 left-1/2 z-30 w-[90%] max-w-4xl"
                initial={{ opacity: 0, y: 50, x: "-50%" }}
                animate={{ opacity: 1, y: "50%", x: "-50%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className="bg-white rounded-tr-[50px] rounded-bl-[50px] shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] p-8 md:p-10 relative overflow-hidden">


                    <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10 w-full px-4">
                        {/* Left Side */}
                        <div className="text-center md:flex-1">
                            <p className="text-[#182141] font-serif text-xl md:text-2xl font-medium">
                                <span className="text-[#c09767] font-bold text-4xl md:text-5xl mx-2">25</span>
                                yılı aşkın tecrübe
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-16 bg-gray-200"></div>

                        {/* Right Side */}
                        <div className="text-center md:flex-1">
                            <div className="flex flex-col justify-center items-center gap-1">
                                <span className="text-[#c09767] font-serif text-3xl md:text-4xl font-bold">2006&apos;dan beri</span>
                                <span className="text-[#182141] font-serif text-lg md:text-xl font-medium">İstanbul Barosu Üyesi</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
