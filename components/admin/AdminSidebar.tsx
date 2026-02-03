'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    FileText,
    Newspaper,
    Users,
    Menu as MenuIcon,
    Settings,
    Calendar,
    Image,
    Languages,
    BarChart3
} from 'lucide-react'

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: FileText, label: 'Sayfalar', href: '/admin/pages' },
    { icon: Newspaper, label: 'Makaleler', href: '/admin/articles' },
    { icon: Users, label: 'Ekip', href: '/admin/team' },
    { icon: Calendar, label: 'Randevular', href: '/admin/appointments' },
    { icon: MenuIcon, label: 'Menüler', href: '/admin/menus' },
    { icon: Image, label: 'Medya', href: '/admin/media' },
    { icon: Languages, label: 'Diller', href: '/admin/languages' },
    { icon: BarChart3, label: 'SEO & Analitik', href: '/admin/seo' },
    { icon: Settings, label: 'Ayarlar', href: '/admin/settings' },
]

export default function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
            {/* Logo */}
            <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#d4af7a]">
                    <span className="text-xl font-bold text-white">S</span>
                </div>
                <div>
                    <div className="text-sm font-bold text-gray-900">SEVİNÇ</div>
                    <div className="text-xs text-gray-500">Admin Panel</div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${isActive
                                            ? 'bg-[#c9a961] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4">
                <div className="text-xs text-gray-500">
                    © 2024 Sevinç Hukuk
                </div>
            </div>
        </aside>
    )
}
