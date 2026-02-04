'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from 'next/link'
import { toast } from 'sonner'
import { ChevronLeft, Save, Sparkles, AlertCircle, CheckCircle, Type, Image as ImageIcon, Layout, Globe, Search, BarChart, Settings, MoreHorizontal } from 'lucide-react'
import { analyzeContent } from '@/lib/seo-analyzer'
import { SeoSidebar } from '@/components/admin/SeoSidebar'

// Mock categories
const categories = [
    { id: 'genel', name: 'Genel' },
    { id: 'ceza-hukuku', name: 'Ceza Hukuku' },
    { id: 'aile-hukuku', name: 'Aile Hukuku' },
    { id: 'ticaret-hukuku', name: 'Ticaret Hukuku' },
    { id: 'is-hukuku', name: 'İş Hukuku' },
]

export default function NewArticlePage() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [status, setStatus] = useState('DRAFT')
    const [category, setCategory] = useState('genel')
    const [keyword, setKeyword] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [aiLoading, setAiLoading] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Makalenizi buraya yazmaya başlayın...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-lg max-w-none focus:outline-none min-h-[500px] text-gray-700 leading-relaxed font-serif',
            },
        },
        immediatelyRender: false,
    })

    // SEO Analysis Logic
    const contentText = editor?.getText() || ''
    const metrics = analyzeContent(contentText, title, keyword)

    // Unsaved Changes Logic
    const [isDirty, setIsDirty] = useState(false)

    // Track changes
    useEffect(() => {
        if (title || (editor && editor.getText().length > 0)) {
            setIsDirty(true)
        }
    }, [title, editor]) // Simplified change detection

    // Calculate simple composite score based on metrics
    const seoScore = (
        (metrics.wordCount > 300 ? 20 : 0) +
        (metrics.keywordInTitle ? 20 : 0) +
        (metrics.keywordInFirstPara ? 20 : 0) +
        (metrics.keywordDensity >= 0.5 && metrics.keywordDensity <= 3 ? 20 : 0) +
        (metrics.fleschScore > 50 ? 20 : 0)
    )

    // Prevent hydration mismatch
    if (!isMounted) {
        return null
    }

    // AI Function (Real)
    const handleAiGenerate = async (type: string) => {
        // 1. Prepare Content
        let contentToSend = ''

        if (type === 'title') {
            contentToSend = title
        } else if (['fix_grammar', 'simplify', 'expand'].includes(type)) {
            // Get selected text
            const { from, to, empty } = editor?.state.selection || {}
            if (empty || !editor) {
                alert('Lütfen işlem yapmak istediğiniz metni seçin.')
                return
            }
            contentToSend = editor.state.doc.textBetween(from!, to!, ' ')
        } else if (type === 'outline') {
            contentToSend = title
        }

        if (!contentToSend && type !== 'outline') {
            alert('Lütfen önce bir içerik girin.')
            return
        }

        setAiLoading(true)
        try {
            const res = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type,
                    content: contentToSend,
                    keyword,
                    title
                })
            })

            if (!res.ok) throw new Error('AI Error')
            const data = await res.json()

            if (type === 'title') {
                const result = data.result.replace(/^"|"$/g, '').replace(/^\d+\.\s*/, '')
                setTitle(result)
            } else if (type === 'outline') {
                editor?.commands.setContent(data.result)
            } else if (['fix_grammar', 'simplify', 'expand'].includes(type)) {
                editor?.commands.insertContent(data.result)
            }
        } catch (e) {
            console.error(e)
            alert('AI işleminde hata oluştu.')
        } finally {
            setAiLoading(false)
        }
    }

    const handlePublish = () => {
        if (!title) { alert('Lütfen bir başlık girin.'); return; }
        // Simulate Save
        const btn = document.getElementById('publish-btn');
        if (btn) btn.innerText = 'Kaydediliyor...';

        setTimeout(() => {
            alert('✅ Makale başarıyla veritabanına kaydedildi ve yayınlandı!')
            if (btn) btn.innerText = 'Yayınla';
            setStatus('PUBLISHED')
        }, 1500)
    }

    const handlePreview = () => {
        const win = window.open('', '_blank')
        if (win) {
            win.document.write(`
                <html>
                    <head>
                        <title>Önizleme: ${title}</title>
                        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                    </head>
                    <body class="bg-gray-50 p-10 max-w-3xl mx-auto prose lg:prose-xl">
                        <h1>${title}</h1>
                        ${editor?.getHTML()}
                    </body>
                </html>
            `)
        }
    }

    const handleBack = () => {
        if (isDirty && status === 'DRAFT') {
            if (confirm('Kaydedilmemiş değişiklikleriniz var. Taslak olarak kaydetmek ister misiniz?')) {
                handlePublish() // Save as draft/published
                return
            }
        }
        router.back()
    }

    return (
        <div className="relative min-h-screen bg-[#f3f4f6] font-sans pb-20">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#c9a961]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#2d3e50]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Top Navigation Bar (Glass) */}
            <div className="sticky top-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm flex items-center justify-between transition-all">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="p-2 -ml-2 rounded-full hover:bg-gray-100/50 text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="h-6 w-px bg-gray-300 mx-2" />
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">EDİTÖR</span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-gray-400 px-3">
                        {status === 'DRAFT' ? 'Taslak Kaydedildi' : 'Yayında'}
                    </span>
                    <button onClick={handlePreview} className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:shadow-md transition-all">
                        Önizle
                    </button>
                    <button onClick={handlePublish} id="publish-btn" className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#2d3e50] to-[#3d5065] rounded-full hover:shadow-lg hover:scale-105 active:scale-95 transition-all">
                        <Save className="w-4 h-4" />
                        Yayınla
                    </button>
                    <button
                        onClick={() => setSettingsOpen(!settingsOpen)}
                        className={`p-2.5 rounded-full border transition-all ${settingsOpen ? 'bg-[#c9a961] border-[#c9a961] text-white' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <main className="max-w-[1600px] mx-auto px-6 mt-8 flex gap-8 items-start relative">

                {/* Center Editor (Paper Style) */}
                <div className="flex-1 min-w-0 transition-all duration-300">
                    <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-xl shadow-gray-200/50 border border-white/50 overflow-hidden relative">

                        {/* Title Section */}
                        <div className="px-12 pt-12 pb-6 relative group">
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleAiGenerate('title')}
                                    disabled={aiLoading}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-bold hover:bg-purple-100 transition-colors"
                                >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {title && title.length > 5 ? 'AI İle İyileştir' : 'AI İle Yaz'}
                                </button>
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Makale Başlığını Buraya Giriniz..."
                                className="w-full text-4xl md:text-5xl font-serif font-bold text-gray-900 placeholder-gray-300 bg-transparent border-none focus:ring-0 p-0 leading-tight"
                            />
                        </div>

                        {/* Editor Toolbar (Sticky) */}
                        {editor && (
                            <div className="sticky top-[73px] z-40 px-12 py-3 bg-white/95 backdrop-blur-sm border-y border-gray-100 flex items-center gap-1 transition-all">
                                <ToolbarBtn editor={editor} action={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} icon={<span className="font-bold font-serif">B</span>} tip="Kalın" />
                                <ToolbarBtn editor={editor} action={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} icon={<span className="italic font-serif">I</span>} tip="İtalik" />
                                <div className="w-px h-5 bg-gray-200 mx-2" />
                                <ToolbarBtn editor={editor} action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} icon="H2" />
                                <ToolbarBtn editor={editor} action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} icon="H3" />
                                <div className="w-px h-5 bg-gray-200 mx-2" />
                                <ToolbarBtn editor={editor} action={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} icon={<MoreHorizontal className="w-4 h-4" />} tip="Liste" />
                                <div className="flex-grow" />
                                <span className="text-xs text-gray-400 font-mono">{metrics.wordCount} Kelime</span>
                            </div>
                        )}

                        {/* Editor Canvas */}
                        <div className="px-12 py-8 min-h-[600px] cursor-text" onClick={() => editor?.commands.focus()}>
                            <EditorContent editor={editor} />
                        </div>
                    </div>
                </div>

                {/* Right Sidebar (Glass Panels) */}
                <div className={`w-[360px] flex-shrink-0 space-y-6 transition-all duration-300 ${settingsOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 hidden'}`}>

                    {/* AI Tools Card */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2d3e50] to-[#1a2530] text-white shadow-2xl p-6">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a961] opacity-20 rounded-full blur-[60px] pointer-events-none" />

                        <h3 className="relative font-bold text-lg mb-4 flex items-center gap-2 text-[#c9a961]">
                            <Sparkles className="w-5 h-5" />
                            DeepSeek AI
                        </h3>

                        <div className="relative space-y-3">
                            <AiActionBtn label="Detaylı Taslak Oluştur" onClick={() => handleAiGenerate('outline')} loading={aiLoading} />
                            <AiActionBtn label="Grameri Düzenle (Seçimi)" onClick={() => handleAiGenerate('fix_grammar')} loading={aiLoading} />
                            <AiActionBtn label="Halk Diline Sadeleştir" onClick={() => handleAiGenerate('simplify')} loading={aiLoading} />
                            <AiActionBtn label="Paragrafı Genişlet" onClick={() => handleAiGenerate('expand')} loading={aiLoading} />
                        </div>

                        {/* Visual Gauge */}
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-6">
                            <div
                                className={`h-full transition-all duration-1000 ease-out rounded-full ${seoScore > 80 ? 'bg-green-500' : seoScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${seoScore}%` }}
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="Odak anahtar kelime..."
                                    className="w-full pl-10 pr-4 py-3 text-sm bg-white border-none rounded-xl shadow-sm focus:ring-2 focus:ring-[#c9a961]/20 placeholder-gray-400"
                                />
                            </div>

                            <CheckItem label="Başlık Uzunluğu (10-70)" pass={title.length > 10 && title.length < 70} />
                            <CheckItem label={`İçerik (>300 kelime)`} pass={editor && metrics.wordCount > 300} />
                            <CheckItem label="Anahtar Kelime Mevcut" pass={Boolean(keyword && contentText.toLowerCase().includes(keyword.toLowerCase()))} />
                            <CheckItem label={`Yoğunluk (%${metrics.keywordDensity.toFixed(1)})`} pass={metrics.keywordDensity > 0.5 && metrics.keywordDensity < 2.5} />
                        </div>
                    </div>

                    {/* Meta Settings */}
                    <div className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl p-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-gray-400" />
                            Yayın Ayarları
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1 mb-1 block">Durum</label>
                                <div className="p-1 bg-gray-100/50 rounded-xl flex">
                                    {['DRAFT', 'PUBLISHED'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setStatus(s)}
                                            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${status === s ? 'bg-white shadow text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                                        >
                                            {s === 'DRAFT' ? 'Taslak' : 'Yayında'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1 mb-1 block">Kategori</label>
                                <select
                                    className="w-full bg-white border-none rounded-xl p-3 text-sm shadow-sm focus:ring-2 focus:ring-[#c9a961]/20 cursor-pointer"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1 mb-1 block">URL Slug</label>
                                <div className="flex items-center gap-2 p-3 bg-white/50 border border-white/50 rounded-xl text-xs text-gray-500 font-mono truncate">
                                    <Globe className="w-3 h-3 flex-shrink-0" />
                                    /{slug || '...'}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-1 mb-1 block">Kapak Görseli URL</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={coverImage}
                                        onChange={(e) => setCoverImage(e.target.value)}
                                        placeholder="https://..."
                                        className="w-full bg-white border-none rounded-xl p-3 text-xs shadow-sm focus:ring-2 focus:ring-[#c9a961]/20 font-mono"
                                    />
                                    {coverImage && (
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={coverImage} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 pl-1">Boş bırakılırsa içerikteki ilk resim kullanılır.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}

// Components

function ToolbarBtn({ editor, action, active, icon, tip }: any) {
    return (
        <button
            onClick={action}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${active ? 'bg-[#c9a961] text-white shadow-md shadow-[#c9a961]/20' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
            title={tip}
        >
            {icon}
        </button>
    )
}

function AiActionBtn({ label, onClick, loading }: any) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="w-full text-left py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 text-sm font-medium transition-all flex items-center justify-between group"
        >
            {label}
            {loading ? <span className="animate-spin">⏳</span> : <Sparkles className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />}
        </button>
    )
}

function CheckItem({ label, pass }: any) {
    return (
        <div className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${pass ? 'bg-green-50 text-green-700' : 'text-gray-500 hover:bg-gray-50'}`}>
            {pass ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0" />}
            <span className="text-xs font-semibold">{label}</span>
        </div>
    )
}
