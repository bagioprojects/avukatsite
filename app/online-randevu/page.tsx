'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/site'
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, FileText } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Appointment schema
const appointmentSchema = z.object({
    name: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
    email: z.string().email('Geçerli bir e-posta adresi giriniz'),
    phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
    date: z.string().min(1, 'Lütfen bir tarih seçiniz'),
    time: z.string().min(1, 'Lütfen bir saat seçiniz'),
    lawyer: z.string().min(1, 'Lütfen bir avukat seçiniz'),
    subject: z.string().min(3, 'Konu en az 3 karakter olmalıdır'),
    notes: z.string().optional(),
})

type AppointmentFormData = z.infer<typeof appointmentSchema>

const lawyers = [
    'Av. Mehmet Sevinç',
    'Av. Ayşe Demir',
    'Av. Can Yılmaz',
    'Av. Zeynep Kaya',
    'Av. Emre Aksoy',
    'Av. Selin Öztürk',
]

const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30',
]

export default function AppointmentPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const [availableSlots, setAvailableSlots] = useState(timeSlots)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<AppointmentFormData>({
        resolver: zodResolver(appointmentSchema),
    })

    const watchDate = watch('date')

    const onSubmit = async (data: AppointmentFormData) => {
        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log('Appointment Data:', data)
        setSubmitSuccess(true)
        setIsSubmitting(false)
        reset()

        setTimeout(() => setSubmitSuccess(false), 5000)
    }

    // Get min date (today)
    const today = new Date().toISOString().split('T')[0]

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-[#2d3e50] to-[#3d4e60] py-16 text-white">
                    <div className="container mx-auto px-4">
                        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Online Randevu</h1>
                        <p className="text-xl text-gray-200">
                            Avukatlarımızla görüşmek için randevu alın
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="mx-auto max-w-4xl">
                        {/* Info Cards */}
                        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#e8d4b8] to-[#d4af7a]">
                                    <CalendarIcon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-semibold text-gray-900">Hızlı Randevu</h3>
                                <p className="text-sm text-gray-600">
                                    Online randevu sistemi ile kolayca görüşme ayarlayın
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#e8d4b8] to-[#d4af7a]">
                                    <Clock className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-semibold text-gray-900">Esnek Saatler</h3>
                                <p className="text-sm text-gray-600">
                                    Size uygun saatte randevu alabileceğiniz geniş zaman aralıkları
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#e8d4b8] to-[#d4af7a]">
                                    <User className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="mb-2 font-semibold text-gray-900">Uzman Kadro</h3>
                                <p className="text-sm text-gray-600">
                                    Alanında uzman avukatlarımızdan birini seçin
                                </p>
                            </div>
                        </div>

                        {/* Appointment Form */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                Randevu Formu
                            </h2>

                            {submitSuccess && (
                                <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
                                    ✓ Randevunuz başarıyla oluşturuldu. E-posta adresinize onay mesajı gönderildi.
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Name */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Ad Soyad *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...register('name')}
                                                type="text"
                                                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                                                placeholder="Adınız ve soyadınız"
                                            />
                                        </div>
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            E-posta *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...register('email')}
                                                type="email"
                                                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                                                placeholder="ornek@email.com"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Telefon *
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...register('phone')}
                                                type="tel"
                                                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                                                placeholder="+90 555 123 45 67"
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    {/* Lawyer Selection */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Avukat Seçimi *
                                        </label>
                                        <select
                                            {...register('lawyer')}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                                        >
                                            <option value="">Avukat seçiniz</option>
                                            {lawyers.map((lawyer) => (
                                                <option key={lawyer} value={lawyer}>
                                                    {lawyer}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.lawyer && (
                                            <p className="mt-1 text-sm text-red-600">{errors.lawyer.message}</p>
                                        )}
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Tarih *
                                        </label>
                                        <div className="relative">
                                            <CalendarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                            <input
                                                {...register('date')}
                                                type="date"
                                                min={today}
                                                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                                            />
                                        </div>
                                        {errors.date && (
                                            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                                        )}
                                    </div>

                                    {/* Time */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Saat *
                                        </label>
                                        <select
                                            {...register('time')}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                                        >
                                            <option value="">Saat seçiniz</option>
                                            {availableSlots.map((slot) => (
                                                <option key={slot} value={slot}>
                                                    {slot}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.time && (
                                            <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Konu *
                                    </label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                                        <input
                                            {...register('subject')}
                                            type="text"
                                            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                                            placeholder="Görüşme konusu"
                                        />
                                    </div>
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                                    )}
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Notlar (Opsiyonel)
                                    </label>
                                    <textarea
                                        {...register('notes')}
                                        rows={4}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                                        placeholder="Eklemek istediğiniz ek bilgiler..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a961] px-8 py-4 font-semibold text-white transition-all hover:bg-[#b89851] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Randevu Oluşturuluyor...
                                        </>
                                    ) : (
                                        <>
                                            <CalendarIcon className="h-5 w-5" />
                                            Randevu Oluştur
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-8 rounded-xl border-l-4 border-[#c9a961] bg-white p-6">
                            <h3 className="mb-2 font-semibold text-gray-900">Önemli Bilgilendirme</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Randevunuz oluşturulduktan sonra e-posta adresinize onay mesajı gönderilecektir.</li>
                                <li>• Randevunuzu iptal veya ertelemek isterseniz en az 24 saat öncesinden bildiriniz.</li>
                                <li>• İlk görüşme ücretsiz olup, danışmanlık süreci hakkında bilgilendirme yapılacaktır.</li>
                                <li>• Acil durumlar için lütfen doğrudan telefon ile iletişime geçiniz.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
