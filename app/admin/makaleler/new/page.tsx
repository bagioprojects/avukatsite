'use client'

import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from 'next/link'
import { ChevronLeft, Save, Sparkles, AlertCircle, CheckCircle, Type, Image as ImageIcon, Layout, Globe, Search, BarChart } from 'lucide-react'

// Mock categories for now (fetched from DB in real implementation via props or separate fetch)
const categories = [
    { id: 'genel', name: 'Genel' },
    { id: 'ceza-hukuku', name: 'Ceza Hukuku' },
    { id: 'aile-hukuku', name: 'Aile Hukuku' },
    { id: 'ticaret-hukuku', name: 'Ticaret Hukuku' },
    { id: 'is-hukuku', name: 'İş Hukuku' },
]

export default function NewArticlePage() {
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [status, setStatus] = useState('DRAFT')
    const [category, setCategory] = useState('genel')
    const [keyword, setKeyword] = useState('')
    const [aiLoading, setAiLoading] = useState(false)

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: '<p>Makalenizi buraya yazmaya başlayın...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px]',
            },
        },
    })

    // SEO Analysis Logic
    const contentText = editor?.getText() || ''
    const wordCount = contentText.split(/\s+/).filter(w => w.length > 0).length
    const keywordDensity = keyword && wordCount > 0
        ? ((contentText.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length / wordCount * 100).toFixed(1)
        : 0

    const seoScore = [
        title.length > 10,
        title.length < 70,
        slug.length > 0,
        editor && wordCount > 300,
        keyword && contentText.toLowerCase().includes(keyword.toLowerCase()),
    ].filter(Boolean).length * 20

    // AI Mock Function
    const handleAiGenerate = async (type: string) => {
        setAiLoading(true)
        // Simulate API delay
        await new Promise(r => setTimeout(r, 1500))

        if (type === 'title') {
            setTitle('Hukuki Süreçlerde Dikkat Edilmesi Gereken 5 Altın Kural')
        } else if (type === 'outline') {
            editor?.commands.setContent(`
                <h2>Giriş</h2>
                <p>Konuya genel bir bakış...</p>
                <h2>Yasal Çerçeve</h2>
                <p>İlgili kanun maddeleri ve mevzuat...</p>
                <h2>Uygulama Örnekleri</h2>
                <p>Yargıtay kararları ve emsal davalar...</p>
                <h2>Sonuç</h2>
                <p>Özet ve tavsiyeler...</p>
            `)
        }
        setAiLoading(false)
    }

    return (
        <div className="flex h-[calc(100vh-theme(spacing.20))] gap-6">

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col space-y-6 overflow-y-auto pr-2 pb-20">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/makaleler" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Yeni Makale Yaz</h1>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm">
                            Taslağı Kaydet
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#c9a961] rounded-lg hover:bg-[#b08a5d] shadow-sm">
                            <Save className="w-4 h-4" />
                            Yayınla
                        </button>
                    </div>
                </div>

                {/* Title Input */}
                <div className="space-y-2 group">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-gray-700">Makale Başlığı</label>
                        <button
                            onClick={() => handleAiGenerate('title')}
                            disabled={aiLoading}
                            className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium bg-purple-50 px-2 py-1 rounded-md transition-colors"
                        >
                            <Sparkles className="w-3 h-3" />
                            {aiLoading ? 'Oluşturuluyor...' : 'AI ile Başlık Öner'}
                        </button>
                    </div>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Örn: Boşanma Davasında Merak Edilenler"
                        className="w-full text-3xl font-serif font-bold placeholder-gray-300 border-none focus:ring-0 p-0 bg-transparent"
                    />
                    <div className="h-px bg-gray-200 group-focus-within:bg-[#c9a961] transition-colors" />
                </div>

                {/* Rich Text Editor Toolbar */}
                {editor && (
                    <div className="bg-white border border-gray-200 rounded-t-xl sticky top-0 z-10 flex flex-wrap gap-1 p-2 shadow-sm">
                        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100 text-[#c9a961]' : 'text-gray-600'}`} title="Kalın"><Type className="w-4 h-4" strokeWidth={3} /></button>
                        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100 text-[#c9a961]' : 'text-gray-600'}`} title="İtalik"><Type className="w-4 h-4 italic" /></button>
                        <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
                        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 text-[#c9a961]' : 'text-gray-600'}`}>H2</button>
                        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-100 text-[#c9a961]' : 'text-gray-600'}`}>H3</button>
                        <div className="w-px h-6 bg-gray-200 mx-1 self-center" />
                        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-100 text-[#c9a961]' : 'text-gray-600'}`}>Liste</button>
                    </div>
                )}

                {/* Editor Content */}
                <div className="min-h-[500px] bg-white rounded-b-xl border border-t-0 border-gray-200 p-8 shadow-sm cursor-text" onClick={() => editor?.commands.focus()}>
                    <EditorContent editor={editor} />
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 flex-shrink-0 space-y-6">

                {/* Publish Settings */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Layout className="w-4 h-4 text-[#c9a961]" />
                        Yayın Ayarları
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Durum</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full text-sm border-gray-300 rounded-lg focus:ring-[#c9a961] focus:border-[#c9a961]"
                            >
                                <option value="DRAFT">Taslak</option>
                                <option value="PUBLISHED">Yayında</option>
                                <option value="ARCHIVED">Arşiv</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Kategori</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full text-sm border-gray-300 rounded-lg focus:ring-[#c9a961] focus:border-[#c9a961]"
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">URL (Slug)</label>
                            <div className="flex items-center px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 break-all">
                                <Globe className="w-3 h-3 mr-2 flex-shrink-0" />
                                /{slug || 'otomatik-olusturulacak'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Analysis */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BarChart className="w-4 h-4 text-[#c9a961]" />
                        SEO Analizi
                    </h3>

                    {/* Score Circle */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative w-24 h-24">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="48" cy="48" r="40" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                                <circle
                                    cx="48" cy="48" r="40" stroke={seoScore > 80 ? '#22c55e' : seoScore > 50 ? '#eab308' : '#ef4444'} strokeWidth="8" fill="none"
                                    strokeDasharray={251.2}
                                    strokeDashoffset={251.2 - (251.2 * seoScore / 100)}
                                    className="transition-all duration-1000 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className={`text-2xl font-bold ${seoScore > 80 ? 'text-green-600' : seoScore > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                    {seoScore}
                                </span>
                                <span className="text-[10px] text-gray-400 font-medium">SKOR</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3" />
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Odak anahtar kelime..."
                                className="w-full pl-8 py-1.5 text-xs text-center border-gray-200 bg-gray-50 rounded-md focus:border-[#c9a961] focus:ring-0"
                            />
                        </div>

                        <div className="text-xs space-y-2 pt-2 border-t border-gray-100">
                            <CheckItem label="Başlık Uzunluğu (10-70)" pass={title.length > 10 && title.length < 70} />
                            <CheckItem label="İçerik Uzunluğu (>300 kelime)" pass={editor && wordCount > 300} value={`${wordCount} kelime`} />
                            <CheckItem label="Anahtar Kelime Kullanımı" pass={Boolean(keyword && contentText.toLowerCase().includes(keyword.toLowerCase()))} />
                            <CheckItem label="Anahtar Kelime Yoğunluğu" pass={Number(keywordDensity) > 0.5 && Number(keywordDensity) < 2.5} value={`%${keywordDensity}`} />
                        </div>
                    </div>
                </div>

                {/* AI Assistant */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100 shadow-sm p-4">
                    <h3 className="font-bold text-purple-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        AI İçerik Asistanı
                    </h3>

                    <div className="space-y-2">
                        <button
                            onClick={() => handleAiGenerate('outline')}
                            disabled={aiLoading}
                            className="w-full text-left px-3 py-2 bg-white/60 hover:bg-white text-purple-900 rounded-lg text-xs font-medium transition-all flex items-center gap-2 group"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-purple-600" />
                            Makale taslağı oluştur
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-white/60 hover:bg-white text-purple-900 rounded-lg text-xs font-medium transition-all flex items-center gap-2 group">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-purple-600" />
                            Yazım hatalarını düzelt
                        </button>
                        <button className="w-full text-left px-3 py-2 bg-white/60 hover:bg-white text-purple-900 rounded-lg text-xs font-medium transition-all flex items-center gap-2 group">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 group-hover:bg-purple-600" />
                            SEO uyumlu özet yaz
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

function CheckItem({ label, pass, value }: { label: string, pass: boolean | null | undefined, value?: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                {pass ? (
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-gray-300" />
                )}
                <span className={`text-gray-600 ${pass ? 'text-gray-900' : ''}`}>{label}</span>
            </div>
            {value && <span className="text-gray-400 font-mono">{value}</span>}
        </div>
    )
}
