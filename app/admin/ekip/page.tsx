
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Search, Users, Shield, Mail, Phone, MoreHorizontal } from 'lucide-react'
import { UserService } from '@/services/user.service'

export default async function TeamPage() {
    const team = await UserService.getAllUsers()

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-[#2d3e50] rounded-lg text-white">
                            <Users className="w-6 h-6" />
                        </div>
                        Ekip Yönetimi
                    </h1>
                    <p className="text-gray-500 mt-2 pl-1">Avukatları ve personeli yönetin.</p>
                </div>

                <Link
                    href="/admin/ekip/new"
                    className="group relative flex items-center gap-2 bg-gradient-to-r from-[#c9a961] to-[#b08a5d] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#c9a961]/20 hover:shadow-xl hover:scale-105 transition-all"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    Yeni Üye Ekle
                </Link>
            </div>

            {/* Main Content */}
            <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl overflow-hidden p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {team.length === 0 ? (
                        <div className="col-span-full text-center py-20 text-gray-400">
                            Henüz ekip üyesi eklenmemiş.
                        </div>
                    ) : team.map((user: any) => (
                        <div key={user.id} className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:border-[#c9a961]/30 transition-all relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-500">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden mb-4 relative">
                                    {user.avatar ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#2d3e50] text-xl font-bold text-white">
                                            {user.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                                <p className="text-sm text-[#c9a961] font-medium mb-4">{(user.title as any)?.tr || 'Avukat'}</p>

                                <div className="w-full space-y-2 border-t border-gray-100 pt-4">
                                    <div className="flex items-center gap-3 text-sm text-gray-500 justify-center">
                                        <Mail className="w-4 h-4" />
                                        {user.email}
                                    </div>
                                    {user.phone && (
                                        <div className="flex items-center gap-3 text-sm text-gray-500 justify-center">
                                            <Phone className="w-4 h-4" />
                                            {user.phone}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                        {user.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
