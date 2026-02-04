
'use client'

import { Trash2, Edit, Eye } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface ArticleActionsProps {
    id: string
    slug: string
}

export function ArticleActions({ id, slug }: ArticleActionsProps) {
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('Bu makaleyi silmek istediğinize emin misiniz?')) return

        const promise = fetch(`/api/articles/${id}`, { method: 'DELETE' })

        toast.promise(promise, {
            loading: 'Siliniyor...',
            success: () => {
                router.refresh() // Refresh server data
                return 'Makale silindi'
            },
            error: 'Silme işlemi başarısız'
        })
    }

    return (
        <div className="flex items-center justify-end gap-2">
            <Link
                href={`/makaleler/${slug}`}
                target="_blank"
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Sitede Gör"
            >
                <Eye className="w-4 h-4" />
            </Link>
            <Link
                href={`/admin/makaleler/new?id=${id}`} // We will handle edit logic later or separate page
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Düzenle"
            >
                <Edit className="w-4 h-4" />
            </Link>
            <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Sil"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}
