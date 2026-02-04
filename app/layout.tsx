import { Source_Serif_4, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { prisma } from '@/lib/prisma'

const serif = Source_Serif_4({
    subsets: ['latin'],
    variable: '--font-serif',
    weight: ['300', '400', '700'],
})

const sans = Source_Sans_3({
    subsets: ['latin'],
    variable: '--font-sans',
    weight: ['300', '400', '500', '600', '700'],
})

export async function generateMetadata() {
    const settings = await prisma.siteSettings.findFirst()
    const siteName = (settings?.siteName as any)?.tr || 'Sevinç Hukuk Bürosu'

    return {
        title: {
            template: `%s | ${siteName}`,
            default: `${siteName} | Profesyonel Hukuki Danışmanlık`,
        },
        description: 'Uzman avukatlarımızla profesyonel hukuk danışmanlığı.',
        icons: {
            icon: settings?.favicon || '/favicon.ico',
        }
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="tr" className={`${serif.variable} ${sans.variable} scroll-smooth`}>
            <body className="font-sans antialiased text-[#182141]">
                {children}
                <Toaster position="top-right" richColors />
            </body>
        </html>
    )
}
