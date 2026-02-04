import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, phone, message } = body

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Eksik alanlar var' }, { status: 400 })
        }

        const newMessage = await prisma.message.create({
            data: {
                name,
                email,
                phone,
                content: message
            }
        })

        return NextResponse.json({ success: true, message: 'Mesajınız iletildi', data: newMessage })
    } catch (error) {
        console.error('Contact API Error:', error)
        return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 })
    }
}
