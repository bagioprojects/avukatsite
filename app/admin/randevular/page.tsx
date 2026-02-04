
import { prisma } from '@/lib/prisma'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Phone, Mail } from 'lucide-react'
import { AppointmentService } from '@/services/appointment.service'

export default async function AppointmentsPage() {
    // Mock data if DB failed, but ideally fetch real
    let appointments: any[] = []
    try {
        appointments = await AppointmentService.getAllAppointments()
    } catch (e) {
        console.error("DB Error", e)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-[#2d3e50] rounded-lg text-white">
                            <Calendar className="w-6 h-6" />
                        </div>
                        Randevu Talepleri
                    </h1>
                    <p className="text-gray-500 mt-2 pl-1">Gelen randevu taleplerini yönetin.</p>
                </div>

                <a href="/admin/randevular/new" className="flex items-center gap-2 bg-[#2d3e50] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                    Or create new..
                </a>
            </div>

            {/* Content */}
            <div className="space-y-4">
                {appointments.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-100 shadow-sm">
                        <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">Henüz randevu talebi yok</h3>
                        <p>Web sitenizden alınan randevular burada listelenecektir.</p>
                    </div>
                ) : appointments.map((apt: any) => (
                    <div key={apt.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Date Box */}
                        <div className="flex flex-col items-center justify-center w-20 h-20 bg-blue-50 rounded-2xl text-blue-700 flex-shrink-0">
                            <span className="text-xs font-bold uppercase">{new Date(apt.date).toLocaleDateString('tr-TR', { month: 'short' })}</span>
                            <span className="text-2xl font-bold">{new Date(apt.date).getDate()}</span>
                            <span className="text-xs opacity-75">{new Date(apt.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>

                        {/* Info */}
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold text-gray-900">{apt.name}</h3>
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                                    <Mail className="w-3.5 h-3.5" /> {apt.email}
                                </span>
                                <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                                    <Phone className="w-3.5 h-3.5" /> {apt.phone}
                                </span>
                            </div>
                            {apt.message && (
                                <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                                    "{apt.message}"
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-xl text-sm font-bold transition-colors">
                                <CheckCircle className="w-4 h-4" />
                                Onayla
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl text-sm font-bold transition-colors">
                                <XCircle className="w-4 h-4" />
                                Reddet
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
