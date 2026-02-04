import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, phone, date, message } = body

        if (!name || !email || !phone || !date) {
            return NextResponse.json({ error: 'Eksik alanlar var' }, { status: 400 })
        }

        const appointment = await prisma.appointment.create({
            data: {
                name,
                email,
                phone,
                date: new Date(date),
                message,
                status: 'PENDING'
            }
        })

        return NextResponse.json({ success: true, message: 'Randevu talebiniz alındı', data: appointment })
    } catch (error) {
        console.error('Appointment API Error:', error)
        return NextResponse.json({ error: 'Bir hata oluştu' }, { status: 500 })
    }
}
