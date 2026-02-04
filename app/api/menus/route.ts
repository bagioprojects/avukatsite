
import { NextResponse } from 'next/server'
import { MenuService } from '@/services/menu.service'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const location = searchParams.get('location') as 'HEADER' | 'FOOTER' || 'HEADER'
    const menus = await MenuService.getMenus(location)
    return NextResponse.json(menus)
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const menu = await MenuService.createMenu({
            name: { tr: body.title }, // Default to TR
            url: body.url,
            location: body.location || 'HEADER'
        })
        return NextResponse.json(menu)
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
