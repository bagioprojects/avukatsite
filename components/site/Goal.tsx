'use client'

import { motion } from 'framer-motion'
import { Reveal } from '@/components/ui/Reveal'
import { StaggeredText } from '@/components/ui/StaggeredText'

export function Goal() {
    return (
        <section className="relative bg-[#f7f9fa] pt-32 pb-24 overflow-hidden">
            {/* Background Lines Pattern - Custom SVG to match reference */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <svg
                    viewBox="0 0 1440 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-100"
                >
                    <path
                        d="M -100 400 C 300 400 600 200 600 -100"
                        stroke="#e2e8f0"
                        strokeWidth="80"
                        fill="none"
                    />
                    <path
                        d="M -50 400 C 350 400 650 200 650 -100"
                        stroke="#e2e8f0"
                        strokeWidth="80"
                        fill="none"
                    />
                    <path
                        d="M 0 400 C 400 400 700 200 700 -100"
                        stroke="#e2e8f0"
                        strokeWidth="80"
                        fill="none"
                    />
                    {/* Second set of lines for the bottom right flow */}
                    <path
                        d="M 800 900 C 1100 600 1300 400 1600 400"
                        stroke="#e2e8f0"
                        strokeWidth="80"
                        fill="none"
                    />
                    <path
                        d="M 850 950 C 1150 650 1350 450 1650 450"
                        stroke="#e2e8f0"
                        strokeWidth="80"
                        fill="none"
                    />
                </svg>
                {/* Swirly background image simulation */}
                <div
                    className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-y7z5z5.png')] bg-no-repeat bg-left-top bg-contain opacity-10 mix-blend-multiply"
                    style={{ backgroundSize: '50%' }}
                ></div>
            </div>

            {/* Swirly Lines SVG Simulation */}
            <div className="absolute left-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none">
                <svg viewBox="0 0 500 800" className="w-full h-full text-gray-100 fill-none stroke-current" style={{ strokeWidth: 40 }}>
                    <path d="M-100 800 Q 100 800 250 400 T 250 -100" opacity="0.5" />
                    <path d="M-50 800 Q 150 800 300 400 T 300 -100" opacity="0.4" />
                    <path d="M0 800 Q 200 800 350 400 T 350 -100" opacity="0.3" />
                </svg>
            </div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="max-w-5xl">
                    {/* Small Label */}
                    <Reveal>
                        <span className="text-[#c09767] font-bold tracking-[0.3em] uppercase mb-8 block text-xs">
                            Hukuk ve Vizyon
                        </span>
                    </Reveal>

                    {/* Main Heading */}
                    <Reveal delay={0.3}>
                        <h2 className="text-[#182141] text-5xl md:text-6xl lg:text-8xl font-bold font-serif mb-16 leading-none tracking-tight">
                            Hukukun Üstünlüğü, <br />
                            İnsanın <span className="text-[#c09767] italic font-light underline decoration-gray-200 underline-offset-8">Onuru</span>.
                        </h2>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Column 1 */}
                        <div className="space-y-10">
                            <Reveal delay={0.4}>
                                <p className="text-gray-500 text-xl md:text-2xl leading-relaxed font-light">
                                    Hizmet sunarken her müvekkile <span className="text-[#182141] font-bold italic">kişisel</span> yaklaşım sağlıyor, hukuki süreçlerin karmaşıklığını net ve şeffaf bir dille çözüme kavuşturuyoruz.
                                </p>
                            </Reveal>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-10">
                            <Reveal delay={0.6}>
                                <p className="text-gray-400 text-lg md:text-xl leading-loose font-light border-l-4 border-[#c09767] pl-8">
                                    Ekibimiz, güncel mevzuata ve yüksek mahkeme kararlarına hakim, sorumluluk bilinci yüksek profesyonellerden oluşmaktadır. Müvekkillerimizin bize olan güveni, başarımızın en büyük teminatıdır.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
