'use client'

import { useSession, signOut } from 'next-auth/react'
import { Bell, LogOut, User } from 'lucide-react'

export default function AdminHeader() {
    const { data: session } = useSession()

    return (
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
            <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100">
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#e8d4b8] to-[#d4af7a]">
                        <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-sm">
                        <div className="font-semibold text-gray-900">{session?.user?.name || 'Admin'}</div>
                        <div className="text-gray-500">{session?.user?.role || 'Administrator'}</div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-red-600"
                        title="Çıkış Yap"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    )
}
