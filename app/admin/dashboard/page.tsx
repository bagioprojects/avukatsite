'use client'

import { FileText, Users, Newspaper, Calendar, TrendingUp, Eye } from 'lucide-react'

export default function AdminDashboard() {
    const stats = [
        { icon: FileText, label: 'Toplam Sayfa', value: '12', change: '+2', color: 'from-blue-500 to-blue-600' },
        { icon: Newspaper, label: 'Makaleler', value: '28', change: '+5', color: 'from-green-500 to-green-600' },
        { icon: Users, label: 'Ekip Üyeleri', value: '8', change: '+1', color: 'from-purple-500 to-purple-600' },
        { icon: Calendar, label: 'Randevular', value: '15', change: '+3', color: 'from-orange-500 to-orange-600' },
        { icon: Eye, label: 'Aylık Ziyaretçi', value: '2.4K', change: '+12%', color: 'from-pink-500 to-pink-600' },
        { icon: TrendingUp, label: 'Dönüşüm', value: '8.2%', change: '+1.2%', color: 'from-cyan-500 to-cyan-600' },
    ]

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="rounded-xl bg-gradient-to-br from-[#2d3e50] to-[#3d4e60] p-8 text-white">
                <h1 className="mb-2 text-3xl font-bold">Hoş Geldiniz!</h1>
                <p className="text-gray-300">
                    Sevinç Hukuk Bürosu admin paneline hoş geldiniz. Sisteminizi buradan yönetebilirsiniz.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={index}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="mb-1 text-sm font-medium text-gray-600">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="mt-2 text-sm text-green-600">
                                            <span className="font-semibold">{stat.change}</span> son ayda
                                        </p>
                                    </div>
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${stat.color}`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Articles */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-bold text-gray-900">Son Makaleler</h2>
                    <div className="space-y-3">
                        {[
                            { title: 'Ceza Hukukunda Savunma Hakları', date: '15 Ocak 2024' },
                            { title: 'Borçlar Hukukunda Sözleşme', date: '10 Ocak 2024' },
                            { title: 'Şirket Birleşmeleri', date: '5 Ocak 2024' },
                        ].map((article, idx) => (
                            <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                                <div>
                                    <p className="font-medium text-gray-900">{article.title}</p>
                                    <p className="text-sm text-gray-500">{article.date}</p>
                                </div>
                                <button className="text-sm font-semibold text-[#c9a961] hover:text-[#b89851]">
                                    Düzenle
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Appointments */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-bold text-gray-900">Yaklaşan Randevular</h2>
                    <div className="space-y-3">
                        {[
                            { client: 'Ahmet Yılmaz', date: '1 Şubat 2024', time: '10:00' },
                            { client: 'Ayşe Demir', date: '1 Şubat 2024', time: '14:00' },
                            { client: 'Mehmet Kaya', date: '2 Şubat 2024', time: '09:00' },
                        ].map((appointment, idx) => (
                            <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                                <div>
                                    <p className="font-medium text-gray-900">{appointment.client}</p>
                                    <p className="text-sm text-gray-500">
                                        {appointment.date} - {appointment.time}
                                    </p>
                                </div>
                                <button className="text-sm font-semibold text-[#c9a961] hover:text-[#b89851]">
                                    Detay
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Hızlı İşlemler</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <button className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-[#c9a961] hover:bg-gray-50">
                        <FileText className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-sm font-semibold text-gray-700">Yeni Sayfa</p>
                    </button>
                    <button className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-[#c9a961] hover:bg-gray-50">
                        <Newspaper className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-sm font-semibold text-gray-700">Yeni Makale</p>
                    </button>
                    <button className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-[#c9a961] hover:bg-gray-50">
                        <Users className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-sm font-semibold text-gray-700">Ekip Üyesi Ekle</p>
                    </button>
                    <button className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-[#c9a961] hover:bg-gray-50">
                        <Calendar className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-sm font-semibold text-gray-700">Randevu Listesi</p>
                    </button>
                </div>
            </div>
        </div>
    )
}
