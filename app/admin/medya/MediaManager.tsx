
'use client'

import { useState } from 'react'
import { Image as ImageIcon, Upload, Trash2, Copy, Check, FileText } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

export default function MediaManager({ initialMedia }: { initialMedia: any[] }) {
    const [media, setMedia] = useState(initialMedia)
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return
        setUploading(true)

        const formData = new FormData()
        formData.append('file', e.target.files[0])

        try {
            const res = await fetch('/api/media/upload', {
                method: 'POST',
                body: formData
            })

            if (res.ok) {
                const newFile = await res.json()
                setMedia([newFile, ...media])
                toast.success('Dosya yüklendi!')
            } else {
                throw new Error('Upload failed')
            }
        } catch (error) {
            toast.error('Yükleme başarısız')
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Bu dosyayı silmek istediğinize emin misiniz?')) return
        try {
            const res = await fetch(`/api/media/${id}`, { method: 'DELETE' })
            if (res.ok) {
                setMedia(media.filter(m => m.id !== id))
                toast.success('Dosya silindi')
            }
        } catch (e) {
            toast.error('Silinemedi')
        }
    }

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url)
        toast.success('URL kopyalandı!')
    }

    return (
        <div className="space-y-8">
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-[#2d3e50] rounded-lg text-white">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        Medya Kütüphanesi
                    </h1>
                </div>

                <label className="flex items-center gap-2 bg-[#2d3e50] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#3d5065] transition-all cursor-pointer">
                    <Upload className="w-5 h-5" />
                    {uploading ? 'Yükleniyor...' : 'Yeni Dosya Yükle'}
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*,application/pdf" disabled={uploading} />
                </label>
            </div>

            {/* Drop Zone Visual (Optional / Functional if expanded) */}
            <label className="w-full h-48 border-3 border-dashed border-gray-300 rounded-3xl flex flex-col items-center justify-center bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer group relative">
                <input type="file" className="hidden" onChange={handleUpload} accept="image/*,application/pdf" disabled={uploading} />
                <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-[#c9a961]" />
                </div>
                <p className="text-gray-500 font-medium">Dosyaları buraya sürükleyin veya <span className="text-[#c9a961] underline">seçmek için tıklayın</span></p>
                <p className="text-xs text-gray-400 mt-2">PNG, JPG, PDF (Max 10MB)</p>
                {uploading && <div className="absolute inset-0 bg-white/50 flex items-center justify-center font-bold">Yükleniyor...</div>}
            </label>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {media.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-400">Henüz dosya yok.</div>
                )}

                {media.map((item) => (
                    <div key={item.id} className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-all border border-gray-200">
                        {item.type === 'IMAGE' ? (
                            <Image
                                src={item.url}
                                alt={item.filename}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 15vw"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                                <FileText className="w-8 h-8 mb-2" />
                                <span className="text-xs break-all">{item.filename}</span>
                            </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button onClick={() => copyToClipboard(item.url)} className="p-2 bg-white/10 text-white hover:bg-white/30 rounded-lg backdrop-blur-sm" title="URL Kopyala">
                                <Copy className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/80 text-white hover:bg-red-500 rounded-lg backdrop-blur-sm" title="Sil">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Type Badge */}
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded backdrop-blur-sm">
                            {(item.size / 1024).toFixed(0)} KB
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
