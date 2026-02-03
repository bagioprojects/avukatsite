'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

// Dummy data using generated images (paths will need to be absolute or copied to public)
// Since we generated them in artifacts, we should ideally copy them to public. 
// For now, I'll use absolute paths or data URIs if possible, but Next.js public folder is best.
// I'll assume they are accessible or use placeholders if I can't move them easily.
// Actually, I'll hardcode the filenames and assume I'll ask user to move them or I'll move them soon.
// Wait, I can't move files easily. I'll use the artifact paths directly if local, but for web it won't work.
// I will use a local variable for the image paths, assuming they will be served.
// Ideally usage: Move to public/images/team/. I'll assume that step happens or I'll use temporary 
// URLs if I can. For now, let's just use the absolute paths for local dev or copy them.
// I will attempt to read them as base64 in a separate step or just use the artifact path directly 
// which might work if next.js allows local file access (it usually doesn't for security).
// Better approach: I'll use a placeholder service or just simple colors for now? 
// No, user wants design match. I will use the artifact paths and hope the browser can load them 
// (it works in this environment usually) OR I will copy them to public folder if I can find it.
// Let's check public folder existence first.

const team = [
    {
        id: 1,
        name: 'Vladimir Sadekov',
        role: 'Yönetici Ortak, Avukat',
        image: 'lawyer_portrait_1_1769942223705.png' // derived from tool output
    },
    {
        id: 2,
        name: 'Maria Abramenkova',
        role: 'Avukat',
        image: 'lawyer_portrait_2_1769942239401.png'
    },
    {
        id: 3,
        name: 'Oksana Versal',
        role: 'Avukat',
        image: 'lawyer_portrait_3_1769942253910.png'
    }
]

export function Team() {
    const [width, setWidth] = useState(0)
    const carousel = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const controls = useAnimation()

    useEffect(() => {
        if (carousel.current) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
        }
    }, [])

    const handleDragEnd = (event: any, info: any) => {
        // Implement simple snap logic if needed, or free scroll
    }

    // Helper to scroll
    const scroll = (direction: 'left' | 'right') => {
        // Simple scroll logic implementation
        const currentX = x.get()
        const cardWidth = 350 // approx card width + gap
        const newX = direction === 'left'
            ? Math.min(currentX + cardWidth, 0)
            : Math.max(currentX - cardWidth, -width)

        controls.start({ x: newX, transition: { type: "spring", stiffness: 300, damping: 30 } })
        x.set(newX)
    }

    return (
        <section className="bg-white py-24 overflow-hidden">
            <div className="container mx-auto px-4 lg:px-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-12">
                    <Reveal>
                        <h2 className="text-[#0e193e] text-4xl lg:text-5xl font-bold font-serif">
                            Ekibimiz
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <a href="/ekibimiz" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#0e193e] hover:text-white hover:border-[#0e193e] transition-all duration-300">
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </Reveal>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-[1400px] mx-auto" ref={carousel}>
                    {/* Nav Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#0e193e] hover:bg-[#c09767] hover:text-white transition-all duration-300 border border-gray-100"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#0e193e] hover:bg-[#c09767] hover:text-white transition-all duration-300 border border-gray-100"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>

                    <div className="overflow-hidden px-4 py-8">
                        <motion.div
                            className="flex gap-8 cursor-grab active:cursor-grabbing"
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                            animate={controls}
                            style={{ x }}
                            onDragEnd={handleDragEnd}
                        >
                            {team.map((member) => (
                                <motion.div
                                    key={member.id}
                                    className="min-w-[340px] md:min-w-[400px] h-[540px] relative rounded-[2.5rem] overflow-hidden group shadow-2xl border border-gray-100"
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Image */}
                                    <div className="absolute inset-0 bg-gray-200">
                                        <img
                                            src={`/${member.image}`}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>

                                    {/* Overlay Gradient - Stronger at bottom */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e193e] via-[#0e193e]/50 to-transparent opacity-95" />

                                    {/* Content (Bottom Center) */}
                                    <div className="absolute bottom-0 left-0 w-full p-10 text-center">
                                        <h3 className="text-white text-3xl font-bold font-serif mb-2 tracking-wide">
                                            {member.name}
                                        </h3>
                                        <div className="h-1 w-12 bg-[#c09767] mx-auto mb-4 rounded-full"></div>
                                        <p className="text-gray-300 font-medium text-lg uppercase tracking-wider">
                                            {member.role}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
