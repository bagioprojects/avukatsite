
import {
    Users, FileText, Calendar, TrendingUp,
    ArrowUpRight, Clock, Activity, AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Genel Bakış</h1>
                    <p className="text-gray-500 mt-1">Hukuk büronuzun anlık performans verileri.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 text-xs font-medium bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-100 animate-pulse">
                        <Activity className="w-3 h-3" />
                        Sistem Aktif
                    </span>
                    <span className="text-sm text-gray-500 font-mono">v2.4.0</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Toplam Makale"
                    value="12"
                    change="+2"
                    trend="up"
                    icon={FileText}
                    color="blue"
                />
                <StatCard
                    title="Randevu Talepleri"
                    value="5"
                    change="+5"
                    trend="up"
                    icon={Calendar}
                    color="purple"
                />
                <StatCard
                    title="Ekip Üyeleri"
                    value="8"
                    change="0"
                    trend="neutral"
                    icon={Users}
                    color="orange"
                />
                <StatCard
                    title="Aylık Görüntülenme"
                    value="12.4K"
                    change="+18%"
                    trend="up"
                    icon={TrendingUp}
                    color="green"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Analytics */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Traffic Chart Placeholder */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Ziyaretçi Trafiği</h3>
                                <p className="text-xs text-gray-400">Son 30 gün verileri</p>
                            </div>
                            <button className="text-xs font-bold text-[#c9a961] hover:underline">Raporu İndir</button>
                        </div>

                        {/* CSS Bar Chart */}
                        <div className="h-64 flex items-end gap-2 md:gap-4 justify-between px-2">
                            {[40, 60, 45, 90, 70, 85, 60, 75, 50, 95, 80, 100].map((h, i) => (
                                <div key={i} className="w-full bg-gray-50 rounded-t-xl relative group-hover:bg-[#f8f9fa] transition-colors overflow-hidden">
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2d3e50] to-[#3d5065] rounded-t-xl transition-all duration-1000 ease-out"
                                        style={{ height: `${h}%`, opacity: 0.8 }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Articles */}
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">Son Blog Yazıları</h3>
                            <Link href="/admin/makaleler" className="text-xs font-bold text-gray-400 hover:text-[#c9a961]">Tümünü Gör</Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold">
                                            {i}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#c9a961] transition-colors">Hukuki Süreçlerde Dikkat Edilmesi Gerekenler</h4>
                                            <p className="text-xs text-gray-400">3 saat önce · Av. Mehmet Sevinç</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded">YAYINDA</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Quick Actions & Notifications */}
                <div className="space-y-8">

                    {/* Quick Actions */}
                    <div className="bg-[#2d3e50] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a961] rounded-full blur-[50px] opacity-20 pointer-events-none" />

                        <h3 className="text-lg font-bold mb-6 relative">Hızlı İşlemler</h3>
                        <div className="grid grid-cols-2 gap-3 relative">
                            <QuickAction href="/admin/makaleler/new" icon={FileText} label="Makale Yaz" />
                            <QuickAction href="/admin/randevular" icon={Calendar} label="Randevu Ekle" />
                            <QuickAction href="/admin/ekip/new" icon={Users} label="Üye Ekle" />
                            <QuickAction href="/admin/ayarlar" icon={ArrowUpRight} label="Site Ayarları" />
                        </div>
                    </div>

                    {/* Pending Appointments */}
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            Bekleyen Randevular
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        </h3>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-[#c9a961]">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Ahmet Yılmaz</h4>
                                        <p className="text-xs text-gray-500">Boşanma Davası · Yarın 14:00</p>
                                        <div className="flex gap-2 mt-2">
                                            <button className="text-[10px] bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors">Onayla</button>
                                            <button className="text-[10px] bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">Reddet</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, change, trend, icon: Icon, color }: any) {
    const colors: any = {
        blue: 'text-blue-500 bg-blue-50',
        purple: 'text-purple-500 bg-purple-50',
        orange: 'text-orange-500 bg-orange-50',
        green: 'text-green-500 bg-green-50',
    }

    return (
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl ${colors[color]} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend === 'up' && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3" />
                        {change}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <h3 className="text-3xl font-bold text-gray-900 tabular-nums">{value}</h3>
                <p className="text-sm text-gray-400 font-medium mt-1">{title}</p>
            </div>
        </div>
    )
}

function QuickAction({ href, icon: Icon, label }: any) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center justify-center gap-2 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all border border-white/5 group"
        >
            <Icon className="w-6 h-6 text-[#c9a961] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-white/90">{label}</span>
        </Link>
    )
}
