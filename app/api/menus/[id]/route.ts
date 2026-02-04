
import { NextResponse } from 'next/server'
import { MenuService } from '@/services/menu.service'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const body = await req.json()
        if (body.action === 'reorder') {
            await MenuService.reorderMenu(id, body.direction)
            return NextResponse.json({ success: true })
        }
        return NextResponse.json({ error: 'Invalid Action' }, { status: 400 })
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        await MenuService.deleteMenu(id)
        return NextResponse.json({ success: true })
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
