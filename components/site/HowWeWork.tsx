'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageSquare, Scale, FileText, Gavel, CheckCircle } from 'lucide-react'

// Tab Data
const WORK_STAGES = {
    civil: [
        {
            step: 1,
            title: "Sorunun İlk Değerlendirmesi",
            description: "Müvekkil problemi tüm şeffaflığıyla anlatır. Avukat, gelen bilgileri analiz eder, belgeleri inceler ve davanın gidişatı hakkında ilk hukuki görüşünü sunar.",
            icon: MessageSquare
        },
        {
            step: 2,
            title: "Strateji ve Planlama",
            description: "Hukuki yol haritası belirlenir. Toplanması gereken deliller, başvurulacak merciler ve takip edilecek usuller netleştirilir.",
            icon: FileText
        },
        {
            step: 3,
            title: "Dava Süreci ve Takip",
            description: "Dava dilekçesi hazırlanır ve ilgili mahkemeye sunulur. Duruşmalar titizlikle takip edilir ve müvekkil düzenli olarak bilgilendirilir.",
            icon: Scale
        },
        {
            step: 4,
            title: "Sonuç ve İnfaz",
            description: "Mahkeme kararı alındıktan sonra, kararın uygulanmesi (infaz) aşamasına geçilir ve hak kaybı yaşanmaması için süreç tamamlanır.",
            icon: CheckCircle
        }
    ],
    criminal: [
        {
            step: 1,
            title: "Dosya İncelemesi",
            description: "Avukat soruşturma veya kovuşturma dosyasını detaylıca inceler. Müvekkil, şahitler ve ilgili kişilerle görüşmeler yaparak olayı aydınlatır.",
            icon: MessageSquare
        },
        {
            step: 2,
            title: "Savunma Hazırlığı",
            description: "Lehe olan deliller toplanır, emsal kararlar araştırılır ve güçlü bir savunma stratejisi kurgulanır. İfada süreçlerine hazırlık yapılır.",
            icon: Gavel
        },
        {
            step: 3,
            title: "Mahkeme Aşaması",
            description: "Duruşmalarda etkin savunma yapılır. Çapraz sorgu ve beyanlarla maddi gerçeğin ortaya çıkması için çalışılır.",
            icon: Scale
        },
        {
            step: 4,
            title: "Karar ve İtiraz",
            description: "Mahkeme kararı değerlendirilir. Gerekirse İstinaf veya Yargıtay kanun yollarına başvurularak karar denetlettirilir.",
            icon: FileText
        }
    ]
}

export function HowWeWork() {
    // Separate states for two sliders
    const [civilIndex, setCivilIndex] = useState(0)
    const [criminalIndex, setCriminalIndex] = useState(0)

    const nextStep = (type: 'civil' | 'criminal') => {
        if (type === 'civil') {
            setCivilIndex((prev) => (prev + 1) % WORK_STAGES.civil.length)
        } else {
            setCriminalIndex((prev) => (prev + 1) % WORK_STAGES.criminal.length)
        }
    }

    const prevStep = (type: 'civil' | 'criminal') => {
        if (type === 'civil') {
            setCivilIndex((prev) => (prev - 1 + WORK_STAGES.civil.length) % WORK_STAGES.civil.length)
        } else {
            setCriminalIndex((prev) => (prev - 1 + WORK_STAGES.criminal.length) % WORK_STAGES.criminal.length)
        }
    }

    return (
        <section className="bg-[#182141] py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 C 30 50 70 50 100 0 V 100 H 0 Z" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">
                        Nasıl Çalışıyoruz?
                    </h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed opacity-90">
                        Her müvekkilimize ve kurumsal ortaklarımıza, sürecin her aşamasında şeffaf ve nitelikli hukuki destek sunuyoruz.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

                    {/* LEFT CARD: Civil Law */}
                    <div className="bg-white rounded-tr-[50px] rounded-bl-[50px] p-8 md:p-12 min-h-[450px] flex flex-col relative shadow-2xl">
                        <h3 className="text-[#182141] text-2xl md:text-3xl font-bold font-serif mb-8 border-b border-gray-100 pb-4">
                            Hukuk ve İdari Dava Süreci
                        </h3>

                        <div className="flex-grow relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={civilIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full flex flex-col justify-center"
                                >
                                    <span className="text-[#c09767] font-bold text-sm tracking-widest uppercase mb-2 block">
                                        ADIM {WORK_STAGES.civil[civilIndex].step}
                                    </span>
                                    <h4 className="text-xl md:text-2xl font-bold text-[#182141] mb-4">
                                        {WORK_STAGES.civil[civilIndex].title}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {WORK_STAGES.civil[civilIndex].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                            <div className="flex gap-2">
                                {WORK_STAGES.civil.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCivilIndex(idx)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${idx === civilIndex ? 'bg-[#182141] scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                                    />
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => prevStep('civil')}
                                    className="w-10 h-10 rounded-full bg-[#c09767] text-white flex items-center justify-center hover:bg-[#b08855] transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => nextStep('civil')}
                                    className="w-10 h-10 rounded-full bg-[#c09767] text-white flex items-center justify-center hover:bg-[#b08855] transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* RIGHT CARD: Criminal Law */}
                    <div className="bg-white rounded-tr-[50px] rounded-bl-[50px] p-8 md:p-12 min-h-[450px] flex flex-col relative shadow-2xl">
                        <h3 className="text-[#182141] text-2xl md:text-3xl font-bold font-serif mb-8 border-b border-gray-100 pb-4">
                            Ceza Yargılaması Süreci
                        </h3>

                        <div className="flex-grow relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={criminalIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full flex flex-col justify-center"
                                >
                                    <span className="text-[#c09767] font-bold text-sm tracking-widest uppercase mb-2 block">
                                        ADIM {WORK_STAGES.criminal[criminalIndex].step}
                                    </span>
                                    <h4 className="text-xl md:text-2xl font-bold text-[#182141] mb-4">
                                        {WORK_STAGES.criminal[criminalIndex].title}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {WORK_STAGES.criminal[criminalIndex].description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                            <div className="flex gap-2">
                                {WORK_STAGES.criminal.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCriminalIndex(idx)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${idx === criminalIndex ? 'bg-[#182141] scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
                                    />
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => prevStep('criminal')}
                                    className="w-10 h-10 rounded-full bg-[#c09767] text-white flex items-center justify-center hover:bg-[#b08855] transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => nextStep('criminal')}
                                    className="w-10 h-10 rounded-full bg-[#c09767] text-white flex items-center justify-center hover:bg-[#b08855] transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
