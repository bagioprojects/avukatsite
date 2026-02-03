import Link from 'next/link'
import { Calendar, User } from 'lucide-react'

const articles = [
    {
        id: 1,
        title: 'İcra Takibi Sürecinde Sıkça Sorulan Sorular',
        author: 'Elif Demir',
        date: '02.12.2024',
        href: '/makaleler/icra-takibi-sureci',
    },
    {
        id: 2,
        title: 'Avukat Mehmet Yılmaz Muhasebeciler Konferansında Konuştu',
        author: 'Av. Mehmet Yılmaz',
        date: '11.11.2024',
        href: '/makaleler/konferans-konusmasi',
    },
    {
        id: 3,
        title: 'Kişiye Hakaret veya Tahrik Meşru Müdafaa Durumu Yaratır mı?',
        author: 'Can Öztürk',
        date: '30.10.2024',
        href: '/makaleler/mesru-mudafaa',
    },
    {
        id: 4,
        title: 'Türkiye\'de Uluslararası Koruma Başvurusu',
        author: 'Elif Demir',
        date: '04.09.2024',
        href: '/makaleler/uluslararasi-koruma',
    },
    {
        id: 5,
        title: 'Türkiye\'nin En Tartışmalı Avukatı: Bedelsiz Yardım ve Başarı Hikayeleri',
        author: 'Av. Mehmet Yılmaz',
        date: '16.06.2023',
        href: '/makaleler/basari-hikayeleri',
    },
    {
        id: 6,
        title: 'Tüzel Kişilerin Alacaklı Haklarının Korunması - Karar İncelemesi',
        author: 'Av. Mehmet Yılmaz',
        date: '13.05.2022',
        href: '/makaleler/tuzel-kisi-haklari',
    },
    {
        id: 7,
        title: 'Leasing Kullanımı ve İade Edilmemesi - Ceza Hukuku Bağlamı',
        author: 'Av. Mehmet Yılmaz',
        date: '11.05.2022',
        href: '/makaleler/leasing-ceza-hukuku',
    },
    {
        id: 8,
        title: 'Miras Paylaşımı, Bağış Sözleşmesi, Miras - Uzman Görüşleri',
        author: 'Av. Mehmet Yılmaz',
        date: '09.05.2022',
        href: '/makaleler/miras-paylasimi',
    },
    {
        id: 9,
        title: 'Ortağın Ortaklık Çevresinden Çıkarılması Mümkün mü?',
        author: 'Av. Mehmet Yılmaz',
        date: '07.05.2022',
        href: '/makaleler/ortak-cikarilmasi',
    },
]

export function Articles() {
    return (
        <section className="bg-gray-50 py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
                        Son Makaleler
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <Link
                            key={article.id}
                            href={article.href}
                            className="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-[#c9a961] hover:shadow-lg"
                        >
                            {/* Author & Date Header */}
                            <div className="flex items-center gap-4 border-b border-gray-100 px-6 py-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#e8d4b8]">
                                    <span className="text-sm font-bold text-[#c9a961]">
                                        {article.author.split(' ')[1]?.charAt(0) || article.author.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-semibold text-gray-900">
                                        {article.author}
                                    </div>
                                    <div className="text-xs text-gray-500">{article.date}</div>
                                </div>
                            </div>

                            {/* Article Content */}
                            <div className="flex-1 p-6">
                                <h3 className="mb-4 text-lg font-bold leading-tight text-gray-900 transition-colors group-hover:text-[#c9a961]">
                                    {article.title}
                                </h3>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-gray-100 px-6 py-4">
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#c9a961] transition-all group-hover:gap-3">
                                    Detaylı Bilgi
                                    <span>→</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
