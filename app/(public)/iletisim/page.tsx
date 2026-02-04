'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/site'
import { MapPin, Phone, Mail, Clock, Send, Globe, MessageCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Validation schema
const contactSchema = z.object({
    name: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
    phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
    message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log('Form Data:', data)
        setSubmitSuccess(true)
        setIsSubmitting(false)
        reset()
        setTimeout(() => setSubmitSuccess(false), 5000)
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main className="flex-grow">
                <div className="flex flex-col lg:flex-row min-h-[calc(100vh-88px)]">

                    {/* LEFT SIDE - Dark Navy Info Section */}
                    <div className="w-full lg:w-1/2 bg-[#0b1226] text-white p-8 lg:p-20 flex flex-col justify-center relative overflow-hidden">

                        <div className="relative z-10 max-w-xl mx-auto lg:mx-0 w-full">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl lg:text-5xl font-bold font-serif mb-16"
                            >
                                İletişim
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-8 text-sm lg:text-base text-gray-300 font-light"
                            >
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">Sevinç Hukuk Bürosu</h3>
                                    <p className="opacity-80">Pzt-Cum 08:00–17:00</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <p>Büyükdere Cad. No:123, Şişli/İstanbul</p>
                                        <div className="flex flex-col gap-1">
                                            <a href="tel:+905551234567" className="hover:text-[#c09767] transition-colors">Tel: +90 555 123 4567</a>
                                            <a href="tel:+902121234567" className="hover:text-[#c09767] transition-colors">Ofis: +90 212 123 4567</a>
                                            <a href="tel:+905321234567" className="hover:text-[#c09767] transition-colors">Acil: +90 532 123 4567</a>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <a href="mailto:info@sevinc.com" className="block hover:text-[#c09767] transition-colors">E-posta: info@sevinc.com</a>
                                        <p>Sicil No: 12345678</p>
                                        <p>Mersis: 012345678900001</p>
                                    </div>
                                </div>

                                {/* Social Icons - Gold Circle Style */}
                                <div className="flex gap-4 pt-4">
                                    <a href="#" className="w-12 h-12 rounded-full border border-[#c09767] text-[#c09767] flex items-center justify-center hover:bg-[#c09767] hover:text-white transition-all duration-300">
                                        <FaTelegramPlane className="w-5 h-5" />
                                    </a>
                                    <a href="#" className="w-12 h-12 rounded-full border border-[#c09767] text-[#c09767] flex items-center justify-center hover:bg-[#c09767] hover:text-white transition-all duration-300">
                                        <FaWhatsapp className="w-5 h-5" />
                                    </a>
                                </div>

                                {/* Map Section */}
                                <div className="pt-8">
                                    <h4 className="text-white font-bold mb-4">Bizi nasıl bulursunuz</h4>
                                    <div className="rounded-xl overflow-hidden h-48 w-full border border-white/10 opacity-90 hover:opacity-100 transition-opacity">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192697.8893644346!2d28.8717548!3d41.0053215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab730d6bf4a71%3A0x6331a98621d98124!2sMaslak%2C%20Sariyer%2FIstanbul!5e0!3m2!1sen!2str!4v1706859739455!5m2!1sen!2str"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - White Form Section */}
                    <div className="w-full lg:w-1/2 bg-white text-[#182141] p-8 lg:p-20 flex flex-col justify-center">
                        <div className="max-w-xl mx-auto lg:mx-0 w-full">

                            {/* Top CTA */}
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 text-[#182141]">Danışmanlık için<br />randevu alın</h2>
                                <Link
                                    href="/online-randevu"
                                    className="inline-flex items-center gap-2 bg-[#c9a961] hover:bg-[#b08a5d] text-white px-8 py-4 rounded-full font-medium transition-all transform hover:-translate-y-1 shadow-lg"
                                >
                                    Online Randevu <span className="text-lg">→</span>
                                </Link>
                            </div>

                            {/* Divider */}
                            <div className="relative flex items-center justify-center mb-12">
                                <div className="h-px bg-gray-200 w-full absolute"></div>
                                <span className="bg-white px-4 text-gray-400 relative z-10 text-sm uppercase tracking-wider">Veya</span>
                            </div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-[#182141]">İletişim Formu</h2>
                                <p className="text-gray-500 mb-8 leading-relaxed">
                                    Formu doldurun ve uzmanlarımızdan görüş alın. Talebinizi en kısa sürede, ilk fırsatta değerlendireceğiz.
                                </p>

                                {submitSuccess ? (
                                    <div className="bg-green-50 text-green-800 p-6 rounded-lg text-center border border-green-100">
                                        <h3 className="font-bold text-lg mb-2">Mesajınız Alındı!</h3>
                                        <p>En kısa sürede size dönüş yapacağız.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Adınız</label>
                                            <input
                                                {...register('name')}
                                                className="w-full bg-[#f4f6f8] border-none rounded-lg px-4 py-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#c09767]/20 focus:bg-white transition-all"
                                                placeholder=""
                                            />
                                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">E-postanız</label>
                                            <input
                                                {...register('email')}
                                                type="email"
                                                className="w-full bg-[#f4f6f8] border-none rounded-lg px-4 py-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#c09767]/20 focus:bg-white transition-all"
                                                placeholder=""
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                                            <input
                                                {...register('phone')}
                                                type="tel"
                                                className="w-full bg-[#f4f6f8] border-none rounded-lg px-4 py-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#c09767]/20 focus:bg-white transition-all"
                                                placeholder=""
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Durumu Açıklayın</label>
                                            <textarea
                                                {...register('message')}
                                                rows={4}
                                                className="w-full bg-[#f4f6f8] border-none rounded-lg px-4 py-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#c09767]/20 focus:bg-white transition-all resize-none"
                                                placeholder=""
                                            />
                                            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center justify-center gap-2 bg-[#c9a961] hover:bg-[#b08a5d] text-white px-8 py-4 rounded-full font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                        >
                                            {isSubmitting ? 'Gönderiliyor...' : 'Talebi Gönder'}
                                            {!isSubmitting && <span className="text-lg">→</span>}
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    )
}
