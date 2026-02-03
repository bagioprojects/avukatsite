'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Gavel, Scale, Briefcase, FileText, Landmark, Search } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

// Icon mapping:
// Kriminaalõigus (Criminal Law) -> Gavel (Hammer)
// Võlaõigus (Obligation Law) -> Search (Magnifying Glass - closest approximation to finding/audit)
// Äriõigus (Business Law) -> Briefcase
// Perekonnaõigus (Family Law) -> Scale (Scales)
// Täitemenetlus (Enforcement Procedure) -> Landmark (closest to court/official building)
// Tööõigus (Labor Law) -> FileText (Contract/Agreement) - or maybe Users/HardHat? Reference icon looks like a building/institution in bottom right. Let's use Landmark for that one and maybe something else for enforcement.
// Actually, reference bottom middle icon looks like a Group of people or Jury. 
// Bottom right looks like a Building (Bank/Court).

const services = [
    {
        icon: Gavel,
        title: 'Ceza Hukuku',
        description: 'Müvekkillerimizin soruşturma ve kovuşturma aşamalarında şüpheli veya sanık olarak savunmalarını üstleniyor, mağdur haklarını titizlikle koruyarak sürecin her aşamasında etkin hukuki destek sağlıyoruz.',
        link: '/hizmetler/ceza-hukuku'
    },
    {
        icon: Search,
        title: 'Borçlar Hukuku',
        description: 'Sözleşmelerin hazırlanması, incelenmesi ve yorumlanması süreçlerinde danışmanlık veriyor, borç ilişkilerinden doğan uyuşmazlıklarda ve tahsilat takiplerinde müvekkillerimizin haklarını en etkili şekilde savunuyoruz.',
        link: '/hizmetler/borclar-hukuku'
    },
    {
        icon: Briefcase,
        title: 'Ticaret Hukuku',
        description: 'Şirketlerin kuruluş, birleşme ve devralma işlemlerini yönetiyor, ticari sözleşmelerin düzenlenmesi ve kurumsal yönetim süreçlerinde işletmelere kapsamlı ve stratejik hukuki danışmanlık hizmetleri sunuyoruz.',
        link: '/hizmetler/ticaret-hukuku'
    },
    {
        icon: Scale,
        title: 'Aile Hukuku',
        description: 'Boşanma, velayet, nafaka ve mal paylaşımı davalarında tarafların haklarını gözetiyor, aile birliğinin sarsılması süreçlerinde yaşanan hukuki ihtilaflarda hassas ve çözüm odaklı yaklaşıyoruz.',
        link: '/hizmetler/aile-hukuku'
    },
    {
        icon: Landmark,
        title: 'İcra Hukuku',
        description: 'Alacakların tahsili amacıyla icra takiplerinin başlatılması, haciz işlemleri ve borçluyla müzakere süreçlerini yürütüyor, ticari ve şahsi alacakların en hızlı şekilde tahsilini hedefliyoruz.',
        link: '/hizmetler/icra-hukuku'
    },
    {
        icon: Landmark,
        title: 'İş Hukuku',
        description: 'İşçi ve işveren arasındaki uyuşmazlıklarda, işe iade, kıdem tazminatı ve hizmet sözleşmelerinin feshi konularında her iki taraf için de profesyonel hukuki çözüm üretiyoruz.',
        link: '/hizmetler/is-hukuku'
    }
]

export function Services() {
    return (
        <section className="bg-[#0e193e] py-24 selection:bg-[#c09767] selection:text-white">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <Reveal>
                        <div>
                            <span className="text-[#c09767] font-semibold tracking-wider uppercase mb-4 block">
                                UZMANLIK ALANLARIMIZ
                            </span>
                            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
                                Temel <br /> <span className="text-[#c09767]">Hizmetlerimiz</span>
                            </h2>
                        </div>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className="text-gray-400 text-lg max-w-md mb-2 leading-relaxed">
                            Müvekkillerimize en iyi hizmeti sunmak için uzmanlaştığımız temel hukuk alanları.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-tl-xl rounded-tr-[4rem] rounded-br-xl rounded-bl-[4rem] p-6 flex flex-col h-full group hover:bg-white transition-all duration-300 relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Icon Circle - Smaller & Horizontal alignment with title? No, keep stacked but compact */}
                            <div className="flex items-center gap-5 mb-5">
                                <div className="w-14 h-14 flex-shrink-0 rounded-full bg-[#0e193e] flex items-center justify-center text-white shadow-lg">
                                    <service.icon className="w-7 h-7" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[#0e193e] text-xl font-bold font-serif leading-tight">
                                    {service.title}
                                </h3>
                            </div>

                            <p className="text-gray-600 mb-5 flex-grow leading-relaxed text-sm lg:text-base">
                                {service.description}
                            </p>

                            <div className="mt-auto">
                                <a
                                    href={service.link}
                                    className="inline-flex items-center justify-between w-full border border-[#c09767] rounded-full px-4 py-2 text-[#c09767] hover:bg-[#c09767] hover:text-white transition-all duration-300 group/btn shadow-sm"
                                >
                                    <span className="font-semibold font-serif text-xs uppercase tracking-wider">Detaylı Bilgi Al</span>
                                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
