
import { NextResponse } from 'next/server'
import { SettingsService } from '@/services/settings.service'

export async function PUT(req: Request) {
    try {
        const body = await req.json()
        const { siteName, email, phone, address, facebook, twitter, linkedin, instagram } = body

        // Construct update data
        const updateData = {
            siteName: { tr: siteName }, // Default to TR for now
            contact: { email, phone, address },
            social: { facebook, twitter, linkedin, instagram }
        }

        const settings = await SettingsService.updateSettings(updateData)
        return NextResponse.json(settings)
    } catch (e) {
        console.error("Settings Update Error", e)
        return NextResponse.json({ error: 'Update Failed' }, { status: 500 })
    }
}
