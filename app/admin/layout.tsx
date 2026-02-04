'use client'

import { SessionProvider, useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminRootLayout({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SessionProvider>
    )
}

function AdminLayoutContent({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (status === 'unauthenticated' && !pathname.includes('/login')) {
            router.push('/admin/login')
        }
    }, [status, router, pathname])

    if (status === 'loading') {
        return (
            <div className="flex h-screen items-center justify-center bg-[#f3f4f6]">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#c9a961] border-t-transparent"></div>
            </div>
        )
    }

    if (!session && !pathname.includes('/login')) {
        return null // Will redirect via effect
    }

    // Don't show sidebar on login page
    if (pathname.includes('/login')) {
        return <>{children}</>
    }

    return (
        <div className="flex h-screen bg-[#f3f4f6]">
            <AdminSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto p-8 relative">
                    {children}
                </main>
            </div>
        </div>
    )
}
