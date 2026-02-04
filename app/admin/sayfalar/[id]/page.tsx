
import { PageService } from '@/services/page.service'
import { notFound } from 'next/navigation'
import EditPageClient from './EditPageClient'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const page = await PageService.getPageById(id)

    if (!page) {
        notFound()
    }

    return <EditPageClient initialData={page} />
}
