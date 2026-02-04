import { notFound } from 'next/navigation'
import { PageService } from '@/services/page.service'
import { Reveal } from '@/components/ui/Reveal'

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const page = await PageService.getPageBySlug(slug)

    if (!page || page.template !== 'service') {
        notFound()
    }

    const title = (page.title as any).tr || (page.title as any).en
    const content = (page.content as any).tr || (page.content as any).en

    return (
        <div className="pt-32 pb-24">
            <div className="container mx-auto px-4 lg:px-6">
                <Reveal>
                    <span className="text-[#c09767] font-bold tracking-[0.3em] uppercase mb-4 block text-xs">
                        HUKUKİ HİZMETLERİMİZ
                    </span>
                </Reveal>

                <Reveal delay={0.2}>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#182141] font-serif mb-12 leading-none">
                        {title}
                    </h1>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2">
                        <Reveal delay={0.4}>
                            <div
                                className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-light"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </Reveal>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-32 p-10 bg-[#182141] rounded-[2.5rem] text-white shadow-2xl">
                            <h3 className="text-2xl font-bold font-serif mb-6 text-[#c09767]">Danışmanlık Alın</h3>
                            <p className="text-gray-300 mb-8 font-light leading-relaxed">
                                Bu konuyla ilgili hukuki desteğe mi ihtiyacınız var? Uzman avukatlarımız size yardımcı olmaya hazır.
                            </p>
                            <a
                                href="/#iletisim"
                                className="block w-full text-center bg-[#c09767] hover:bg-[#b08855] text-white py-4 rounded-full font-bold transition-all shadow-lg"
                            >
                                Hemen İletişime Geçin
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
