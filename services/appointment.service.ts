
import { prisma } from '@/lib/prisma'

export class AppointmentService {

    static async getPendingAppointments() {
        return await prisma.appointment.findMany({
            where: { status: 'PENDING' },
            orderBy: { date: 'asc' }
        })
    }

    static async getAllAppointments() {
        return await prisma.appointment.findMany({
            orderBy: { date: 'desc' }
        })
    }

    static async createAppointment(data: any) {
        return await prisma.appointment.create({ data })
    }

    static async updateStatus(id: string, status: any) {
        return await prisma.appointment.update({
            where: { id },
            data: { status }
        })
    }

    static async deleteAppointment(id: string) {
        return await prisma.appointment.delete({
            where: { id }
        })
    }
}
