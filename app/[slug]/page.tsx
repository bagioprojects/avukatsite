import { Metadata } from 'next'
import { Header, Footer } from '@/components/site'
import { notFound } from 'next/navigation'

// Dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    return {
        title: `${params.slug.replace(/-/g, ' ').toUpperCase()} | Sevinç Hukuk Bürosu`,
        description: `${params.slug.replace(/-/g, ' ')} konusunda profesyonel hukuki danışmanlık hizmetleri.`,
    }
}

// Static paths for known services
export function generateStaticParams() {
    return [
        { slug: 'ceza-hukuku' },
        { slug: 'borclar-hukuku' },
        { slug: 'ticaret-hukuku' },
        { slug: 'aile-hukuku' },
        { slug: 'icra-hukuku' },
        { slug: 'is-hukuku' },
    ]
}

// Service data (in production, fetch from database)
const serviceData: Record<string, any> = {
    'ceza-hukuku': {
        title: 'Ceza Hukuku',
        description: 'Şüpheli veya sanığın haklarının korunması, mağdur temsili ve ceza davalarında profesyonel savunma.',
        content: `
      <h2>Ceza Hukuku Hizmetlerimiz</h2>
      <p>Ceza hukuku alanında geniş deneyime sahip ekibimiz, müvekkillerimizin haklarını en iyi şekilde korumak için çalışmaktadır.</p>
      
      <h3>Hizmet Kapsamımız</h3>
      <ul>
        <li>Şüpheli ve sanık hakları savunması</li>
        <li>Mağdur temsili ve tazminat davala\u0131</li>
        <li>Soruşturma ve kovuşturma aşamalarında danışmanlık</li>
        <li>Mahkeme Savunması</li>
        <li>Temyiz ve İtiraz İşlemleri</li>
      </ul>

      <h3>Uzman Ekibimiz</h3>
      <p>Ceza hukuku alanında 25 yılı aşkın deneyime sahip avukatlarımız, her türlü ceza davasında müvekkillerimizin yanındadır.</p>
    `,
    },
    'borclar-hukuku': {
        title: 'Borçlar Hukuku',
        description: 'Sözleşme hukuku, borç ilişkileri ve yükümlülüklerin yerine getirilmesi konularında danışmanlık.',
        content: `
      <h2>Borçlar Hukuku Hizmetlerimiz</h2>
      <p>Borç ilişkilerinden kaynaklanan uyuşmazlıkların çözümünde uzmanız.</p>
      
      <h3>Hizmet Alanlarımız</h3>
      <ul>
        <li>Sözleşme hazırlama ve inceleme</li>
        <li>Borç ilişkilerinde danışmanlık</li>
        <li>Alacak-verecek davaları</li>
        <li>Tazminat talepleri</li>
      </ul>
    `,
    },
    'ticaret-hukuku': {
        title: 'Ticaret Hukuku',
        description: 'Şirket kuruluşu, birleşme, devir ve ticari uyuşmazlıklarda hukuki destek.',
        content: `
      <h2>Ticaret Hukuku Hizmetlerimiz</h2>
      <p>Ticari faaliyetlerinizde hukuki güvence sağlıyoruz.</p>
      
      <h3>Hizmetlerimiz</h3>
      <ul>
        <li>Şirket kuruluşu ve yapılandırma</li>
        <li>Ortaklık anlaşmazlıkları</li>
        <li>Birleşme ve devir işlemleri</li>
        <li>Tasfiye ve iflas süreçleri</li>
      </ul>
    `,
    },
    'aile-hukuku': {
        title: 'Aile Hukuku',
        description: 'Boşanma, velayet, nafaka ve aile içi uyuşmazlıklarda profesyonel destek.',
        content: `
      <h2>Aile Hukuku Hizmetlerimiz</h2>
      <p>Aile içi uyuşmazlıklarda hassas ve profesyonel yaklaşım.</p>
      
      <h3>Uzmanlık Alanlarımız</h3>
      <ul>
        <li>Boşanma davaları</li>
        <li>Velayet ve kişisel ilişki</li>
        <li>Mal paylaşımı</li>
        <li>Nafaka talepleri</li>
      </ul>
    `,
    },
    'icra-hukuku': {
        title: 'İcra Hukuku',
        description: 'Alacak tahsili, haciz ve icra takibi süreçlerinde danışmanlık.',
        content: `
      <h2>İcra Hukuku Hizmetlerimiz</h2>
      <p>Alacaklarınızın tahsili için etkin hukuki yollar.</p>
      
      <h3>Hizmetlerimiz</h3>
      <ul>
        <li>İcra takibi başlatma</li>
        <li>Haciz işlemleri</li>
        <li>İtiraz ve şikayet</li>
        <li>Alacak tahsili</li>
      </ul>
    `,
    },
    'is-hukuku': {
        title: 'İş Hukuku',
        description: 'İşçi ve işveren hakları, iş sözleşmeleri ve iş uyuşmazlıklarında destek.',
        content: `
      <h2>İş Hukuku Hizmetlerimiz</h2>
      <p>İş ilişkilerinde her iki tarafın da haklarını koruyoruz.</p>
      
      <h3>Hizmet Kapsamı</h3>
      <ul>
        <li>İş sözleşmeleri hazırlama</li>
        <li>İşe iade davaları</li>
        <li>Kıdem ve ihbar tazminatı</li>
        <li>İş kazası ve meslek hastalıkları</li>
      </ul>
    `,
    },
}

export default function ServicePage({ params }: { params: { slug: string } }) {
    const service = serviceData[params.slug]

    if (!service) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
                {/* Breadcrumb */}
                <div className="border-b border-gray-200 bg-white py-4">
                    <div className="container mx-auto px-4">
                        <nav className="flex items-center gap-2 text-sm text-gray-600">
                            <a href="/" className="hover:text-[#c9a961]">Ana Sayfa</a>
                            <span>/</span>
                            <span className="text-gray-900">{service.title}</span>
                        </nav>
                    </div>
                </div>

                {/* Page Content */}
                <div className="container mx-auto px-4 py-16">
                    <div className="mx-auto max-w-4xl">
                        {/* Hero Section */}
                        <div className="mb-12 rounded-2xl bg-gradient-to-br from-[#2d3e50] to-[#3d4e60] p-12 text-white">
                            <h1 className="mb-4 text-4xl font-bold">{service.title}</h1>
                            <p className="text-xl text-gray-200">{service.description}</p>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none rounded-xl bg-white p-8 shadow-sm">
                            <div dangerouslySetInnerHTML={{ __html: service.content }} />
                        </div>

                        {/* CTA Section */}
                        <div className="mt-12 rounded-xl border-2 border-[#c9a961] bg-white p-8 text-center">
                            <h3 className="mb-4 text-2xl font-bold text-gray-900">
                                {service.title} Konusunda Hukuki Destek Alın
                            </h3>
                            <p className="mb-6 text-gray-600">
                                Deneyimli avukatlarımızla görüşmek için bizimle iletişime geçin.
                            </p>
                            <a
                                href="/iletisim"
                                className="inline-flex items-center gap-2 rounded-full bg-[#c9a961] px-8 py-3 font-semibold text-white transition-all hover:bg-[#b89851]"
                            >
                                İletişime Geçin →
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
