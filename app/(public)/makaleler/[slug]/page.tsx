import { notFound } from 'next/navigation'
import { ArticleService } from '@/services/article.service'
import { Reveal } from '@/components/ui/Reveal'
import { Calendar, User, Tag } from 'lucide-react'

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const article = await ArticleService.getArticleBySlug(slug)

    if (!article) {
        notFound()
    }

    const title = (article.title as any).tr || (article.title as any).en
    const content = (article.content as any).tr || (article.content as any).en
    const date = new Date(article.publishedAt || article.createdAt).toLocaleDateString('tr-TR')

    return (
        <article className="pt-32 pb-24">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="max-w-4xl mx-auto">
                    <Reveal>
                        <div className="flex items-center gap-6 mb-8 text-xs font-bold text-[#c09767] tracking-[0.2em] uppercase">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {date}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {article.author.name}
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                {(article.category.name as any).tr || (article.category.name as any).en}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#182141] font-serif mb-12 leading-tight tracking-tight">
                            {title}
                        </h1>
                    </Reveal>

                    {article.coverImage && (
                        <Reveal delay={0.3}>
                            <div className="mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl">
                                <img
                                    src={article.coverImage}
                                    alt={title}
                                    className="w-full h-auto object-cover max-h-[500px]"
                                />
                            </div>
                        </Reveal>
                    )}

                    <Reveal delay={0.4}>
                        <div
                            className="prose prose-xl max-w-none text-gray-700 leading-relaxed font-light"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </Reveal>

                    <div className="mt-16 pt-12 border-t border-gray-100">
                        <div className="flex items-center gap-6 p-8 bg-gray-50 rounded-3xl">
                            <div className="w-20 h-20 rounded-2xl bg-[#182141] overflow-hidden flex-shrink-0">
                                {article.author.avatar ? (
                                    <img src={article.author.avatar} alt={article.author.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                                        {article.author.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-[#182141] mb-1">{article.author.name}</h4>
                                <p className="text-gray-500 text-sm italic">
                                    {(article.author.title as any)?.tr || 'Avukat'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
