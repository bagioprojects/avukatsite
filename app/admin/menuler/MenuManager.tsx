
'use client'

import { useState } from 'react'
import { Menu, Plus, GripVertical, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function MenuManager({ initialHeaderMenus, initialFooterMenus }: { initialHeaderMenus: any[], initialFooterMenus: any[] }) {
    const router = useRouter()
    const [headerMenus, setHeaderMenus] = useState(initialHeaderMenus)
    const [footerMenus, setFooterMenus] = useState(initialFooterMenus)

    // New Menu State
    const [newMenu, setNewMenu] = useState({ title: '', url: '', location: 'HEADER' })

    const handleAdd = async () => {
        if (!newMenu.title || !newMenu.url) return toast.error('Başlık ve URL gerekli')

        try {
            const res = await fetch('/api/menus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMenu)
            })
            if (res.ok) {
                toast.success('Menü eklendi')
                router.refresh()
                // Optimistic update not easy due to ID content, relying on refresh or re-fetch logic
                // For speed, just refresh
                setNewMenu({ title: '', url: '', location: newMenu.location })
            }
        } catch (e) {
            toast.error('Hata')
        }
    }

    const handleDelete = async (id: string, location: string) => {
        if (!confirm('Silinsin mi?')) return
        try {
            await fetch(`/api/menus/${id}`, { method: 'DELETE' })
            toast.success('Silindi')
            router.refresh()
        } catch (e) { toast.error('Hata') }
    }

    const handleReorder = async (id: string, direction: 'up' | 'down') => {
        try {
            await fetch(`/api/menus/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ action: 'reorder', direction })
            })
            router.refresh()
        } catch (e) { toast.error('Hata') }
    }

    const MenuList = ({ items, location }: { items: any[], location: string }) => (
        <div className="space-y-3">
            {items.map((item, idx) => (
                <div key={item.id} className="group flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-md transition-all">
                    <div className="flex flex-col gap-1">
                        <button disabled={idx === 0} onClick={() => handleReorder(item.id, 'up')} className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"><ArrowUp className="w-3 h-3" /></button>
                        <button disabled={idx === items.length - 1} onClick={() => handleReorder(item.id, 'down')} className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"><ArrowDown className="w-3 h-3" /></button>
                    </div>
                    <div className="flex-grow">
                        <p className="font-bold text-gray-900">{(item.name as any)?.tr || item.name}</p>
                        <p className="text-xs text-gray-400 font-mono">{item.url}</p>
                    </div>
                    <button onClick={() => handleDelete(item.id, location)} className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 p-2 rounded transition-opacity">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ))}
            {items.length === 0 && <p className="text-gray-400 text-center py-4 text-sm">Menü öğesi yok.</p>}
        </div>
    )

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-[#2d3e50] rounded-lg text-white"><Menu className="w-6 h-6" /></div>
                        Menü Yönetimi
                    </h1>
                </div>
            </div>

            {/* Add New Section */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex gap-4 items-end">
                <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 block mb-1">Başlık</label>
                    <input value={newMenu.title} onChange={e => setNewMenu({ ...newMenu, title: e.target.value })} className="w-full bg-gray-50 border-none rounded-xl px-4 py-2" placeholder="Örn: Ana Sayfa" />
                </div>
                <div className="flex-1">
                    <label className="text-xs font-bold text-gray-500 block mb-1">URL</label>
                    <input value={newMenu.url} onChange={e => setNewMenu({ ...newMenu, url: e.target.value })} className="w-full bg-gray-50 border-none rounded-xl px-4 py-2" placeholder="/" />
                </div>
                <div className="w-40">
                    <label className="text-xs font-bold text-gray-500 block mb-1">Konum</label>
                    <select value={newMenu.location} onChange={e => setNewMenu({ ...newMenu, location: e.target.value })} className="w-full bg-gray-50 border-none rounded-xl px-4 py-2">
                        <option value="HEADER">Header</option>
                        <option value="FOOTER">Footer</option>
                    </select>
                </div>
                <button onClick={handleAdd} className="bg-[#2d3e50] text-white px-6 py-2 rounded-xl font-bold hover:bg-[#3d5065] h-[42px] flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Ekle
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Header Menü</h3>
                    <MenuList items={headerMenus} location="HEADER" />
                </div>
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Footer Menü</h3>
                    <MenuList items={footerMenus} location="FOOTER" />
                </div>
            </div>
        </div>
    )
}
