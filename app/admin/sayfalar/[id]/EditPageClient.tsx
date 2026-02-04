
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { toast } from 'sonner'
import { ChevronLeft, Save, Sparkles, AlertCircle, CheckCircle, Settings, Layout, Globe, Trash2 } from 'lucide-react'

export default function EditPageClient({ initialData }: { initialData: any }) {
    const router = useRouter()
    const [title, setTitle] = useState(initialData.title?.tr || '')
    const [slug, setSlug] = useState(initialData.slug)
    const [status, setStatus] = useState(initialData.status)
    const [template, setTemplate] = useState(initialData.template)
    const [isMounted, setIsMounted] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => setIsMounted(true), [])

    const editor = useEditor({
        extensions: [StarterKit],
        content: initialData.content?.tr || '<p></p>',
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] text-gray-700 leading-relaxed font-serif',
            },
        },
    })

    if (!isMounted) return null

    const handleSave = async () => {
        if (!title) { toast.error('Lütfen başlık girin'); return }
        setSaving(true)

        try {
            const res = await fetch(`/api/pages/${initialData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    content: editor?.getHTML(),
                    slug,
                    status,
                    template
                })
            })

            if (res.ok) {
                toast.success('Değişiklikler kaydedildi!')
                router.refresh()
            } else {
                throw new Error('Save Failed')
            }
        } catch (e) {
            toast.error('Hata oluştu')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm('Bu sayfayı silmek istediğinize emin misiniz?')) return
        try {
            const res = await fetch(`/api/pages/${initialData.id}`, { method: 'DELETE' })
            if (res.ok) {
                toast.success('Sayfa silindi')
                router.push('/admin/sayfalar')
            }
        } catch (e) {
            toast.error('Silinemedi')
        }
    }

    return (
        <div className="relative min-h-screen bg-[#f3f4f6] pb-20">
            {/* Header */}
            <div className="sticky top-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full"><ChevronLeft /></button>
                    <span className="text-sm font-semibold text-gray-500 uppercase">SAYFA DÜZENLE</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDelete}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title="Sil"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#2d3e50] text-white rounded-full font-bold hover:shadow-lg disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        {saving ? 'Kaydediliyor...' : 'Güncelle'}
                    </button>
                </div>
            </div>

            <main className="max-w-[1600px] mx-auto px-6 mt-8 flex gap-8 items-start">
                <div className="flex-1 min-w-0 bg-white rounded-[2rem] shadow-xl p-12">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Sayfa Başlığı"
                        className="w-full text-5xl font-serif font-bold placeholder-gray-300 border-none focus:ring-0 p-0 mb-8"
                    />
                    <div className="min-h-[500px]">
                        <EditorContent editor={editor} />
                    </div>
                </div>

                <div className="w-[360px] space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                        <h3 className="font-bold mb-4 flex items-center gap-2"><Settings className="w-4 h-4" /> Ayarlar</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 block mb-1">URL Slug</label>
                                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg text-sm font-mono text-gray-600">
                                    <Globe className="w-3 h-3" />
                                    /<input value={slug} onChange={e => setSlug(e.target.value)} className="bg-transparent border-none p-0 text-sm font-mono w-full focus:ring-0" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 block mb-1">Durum</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full p-2 bg-gray-50 rounded-lg text-sm border-none"
                                >
                                    <option value="DRAFT">Taslak</option>
                                    <option value="PUBLISHED">Yayında</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 block mb-1">Şablon</label>
                                <select
                                    value={template}
                                    onChange={(e) => setTemplate(e.target.value)}
                                    className="w-full p-2 bg-gray-50 rounded-lg text-sm border-none"
                                >
                                    <option value="default">Varsayılan (Default)</option>
                                    <option value="full-width">Tam Genişlik</option>
                                    <option value="contact">İletişim Formlu</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
