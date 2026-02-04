
import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export class SettingsService {

    static async getSettings() {
        // Try to find first settings, if not exists, create default
        let settings = await prisma.siteSettings.findFirst()

        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: {
                    siteName: { tr: "Hukuk Bürosu" },
                    contact: {
                        email: "info@example.com",
                        phone: "+90 555 123 45 67",
                        address: "İstanbul, Türkiye"
                    },
                    social: {
                        facebook: "",
                        twitter: "",
                        instagram: "",
                        linkedin: ""
                    }
                }
            })
        }

        return settings
    }

    static async updateSettings(data: any) {
        // We assume there's only one settings row, so we update the first one
        const current = await this.getSettings()

        return await prisma.siteSettings.update({
            where: { id: current.id },
            data
        })
    }
}
