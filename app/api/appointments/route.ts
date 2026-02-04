
import { NextResponse } from 'next/server'
import { AppointmentService } from '@/services/appointment.service'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, phone, date, message, status } = body

        const appointment = await AppointmentService.createAppointment({
            name,
            email,
            phone,
            date: new Date(date),
            message,
            status: status || 'PENDING'
        })

        return NextResponse.json(appointment)
    } catch (error) {
        console.error('Appointment Create Error', error)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
