'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/site'
import { Phone, Mail, X } from 'lucide-react'

// Team members data
const teamMembers = [
    {
        id: 1,
        name: 'Av. Mehmet Sevinç',
        title: 'Kurucu Ortak',
        specialty: 'Ceza Hukuku',
        phone: '+90 555 123 4567',
        email: 'mehmet@sevinclaw.com',
        bio: '25 yılı aşkın deneyime sahip ceza hukuku uzmanı. Barolar Birliği üyesi. Yüzlerce başarılı davada müvekkil temsil etmiştir.',
    },
    {
        id: 2,
        name: 'Av. Ayşe Demir',
        title: 'Ortak Avukat',
        specialty: 'Borçlar ve İş Hukuku',
        phone: '+90 555 234 5678',
        email: 'ayse@sevinclaw.com',
        bio: '15 yıl boyunca borçlar ve iş hukuku alanında çalışmalar yürütmüştür. Kurumsal şirketlere danışmanlık vermektedir.',
    },
    {
        id: 3,
        name: 'Av. Can Yılmaz',
        title: 'Kıdemli Avukat',
        specialty: 'Ticaret Hukuku',
        phone: '+90 555 345 6789',
        email: 'can@sevinclaw.com',
        bio: 'Şirket birleşmeleri, devralmalar ve ticari sözleşmeler konusunda uzman. 12 yıllık deneyime sahiptir.',
    },
    {
        id: 4,
        name: 'Av. Zeynep Kaya',
        title: 'Avukat',
        specialty: 'Aile Hukuku',
        phone: '+90 555 456 7890',
        email: 'zeynep@sevinclaw.com',
        bio: 'Boşanma, velayet ve nafaka davaları konusunda 10 yıl deneyime sahip uzman avukat.',
    },
    {
        id: 5,
        name: 'Av. Emre Aksoy',
        title: 'Avukat',
        specialty: 'İcra Hukuku',
        phone: '+90 555 567 8901',
        email: 'emre@sevinclaw.com',
        bio: 'Alacak tahsili ve icra takipleri konusunda 8 yıldır hukuki danışmanlık vermektedir.',
    },
    {
        id: 6,
        name: 'Av. Selin Öztürk',
        title: 'Avukat',
        specialty: 'İş Hukuku',
        phone: '+90 555 678 9012',
        email: 'selin@sevinclaw.com',
        bio: 'İşçi ve işveren hakları, iş sözleşmeleri konusunda 7 yıl tecrübeli avukat.',
    },
]

const specialties = ['Tümü', 'Ceza Hukuku', 'Borçlar ve İş Hukuku', 'Ticaret Hukuku', 'Aile Hukuku', 'İcra Hukuku', 'İş Hukuku']

export default function TeamPage() {
    const [selectedSpecialty, setSelectedSpecialty] = useState('Tümü')
    const [selectedMember, setSelectedMember] = useState<any>(null)

    const filteredMembers = teamMembers.filter(member =>
        selectedSpecialty === 'Tümü' || member.specialty === selectedSpecialty
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-[#2d3e50] to-[#3d4e60] py-16 text-white">
                    <div className="container mx-auto px-4">
                        <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Ekibimiz</h1>
                        <p className="text-xl text-gray-200">
                            Alanında uzman, deneyimli avukatlarımızla tanışın
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    {/* Filter Buttons */}
                    <div className="mb-8 flex flex-wrap justify-center gap-2">
                        {specialties.map((specialty) => (
                            <button
                                key={specialty}
                                onClick={() => setSelectedSpecialty(specialty)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${selectedSpecialty === specialty
                                        ? 'bg-[#c9a961] text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {specialty}
                            </button>
                        ))}
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredMembers.map((member) => (
                            <div
                                key={member.id}
                                className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:border-[#c9a961] hover:shadow-xl"
                                onClick={() => setSelectedMember(member)}
                            >
                                {/* Avatar */}
                                <div className="flex h-64 items-center justify-center bg-gradient-to-br from-[#e8d4b8] to-[#d4af7a]">
                                    <div className="text-6xl font-bold text-white">
                                        {member.name.split(' ')[1][0]}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-6">
                                    <h3 className="mb-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#c9a961]">
                                        {member.name}
                                    </h3>
                                    <div className="mb-2 text-sm font-medium text-gray-500">
                                        {member.title}
                                    </div>
                                    <div className="mb-4 inline-block rounded-full bg-[#c9a961]/10 px-3 py-1 text-xs font-semibold text-[#c9a961]">
                                        {member.specialty}
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-[#c9a961]" />
                                            <span>{member.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-[#c9a961]" />
                                            <span className="truncate">{member.email}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#c9a961] transition-all group-hover:gap-3">
                                        Detaylı Bilgi →
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />

            {/* Modal */}
            {selectedMember && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
                        <button
                            onClick={() => setSelectedMember(null)}
                            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <div className="flex flex-col gap-6 md:flex-row">
                            {/* Avatar */}
                            <div className="flex h-48 w-48 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8d4b8] to-[#d4af7a]">
                                <div className="text-6xl font-bold text-white">
                                    {selectedMember.name.split(' ')[1][0]}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <h2 className="mb-2 text-3xl font-bold text-gray-900">
                                    {selectedMember.name}
                                </h2>
                                <div className="mb-3 text-lg font-medium text-gray-500">
                                    {selectedMember.title}
                                </div>
                                <div className="mb-4 inline-block rounded-full bg-[#c9a961]/10 px-4 py-2 text-sm font-semibold text-[#c9a961]">
                                    {selectedMember.specialty}
                                </div>

                                <p className="mb-6 leading-relaxed text-gray-600">
                                    {selectedMember.bio}
                                </p>

                                <div className="space-y-3 border-t border-gray-200 pt-4">
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-5 w-5 text-[#c9a961]" />
                                        <a href={`tel:${selectedMember.phone}`} className="text-gray-900 hover:text-[#c9a961]">
                                            {selectedMember.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-[#c9a961]" />
                                        <a href={`mailto:${selectedMember.email}`} className="text-gray-900 hover:text-[#c9a961]">
                                            {selectedMember.email}
                                        </a>
                                    </div>
                                </div>

                                <a
                                    href="/iletisim"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c9a961] px-6 py-3 font-semibold text-white transition-all hover:bg-[#b89851]"
                                >
                                    İletişime Geçin →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
