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

interface ServiceProps {
    icon?: any;
    title: string;
    description: string;
    link: string;
}

const defaultServices = [
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

export function Services({ items = defaultServices }: { items?: ServiceProps[] }) {
    return (
        <section className="bg-[#182141] py-32 selection:bg-[#c09767] selection:text-white relative overflow-hidden">
            {/* Subtle Texture Background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 text-white">
                    <Reveal>
                        <div className="space-y-4">
                            <span className="text-[#c09767] font-bold tracking-[0.3em] uppercase text-xs">
                                UZMANLIK ALANLARIMIZ
                            </span>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-none tracking-tight">
                                Profesyonel <br /> <span className="text-[#c09767] font-light italic">Çözümler</span>
                            </h2>
                        </div>
                    </Reveal>

                    <Reveal delay={0.3}>
                        <p className="text-gray-400 text-lg max-w-sm mb-2 leading-relaxed font-light">
                            Hukukun her alanında, uluslararası standartlarda, sonuç odaklı savunma ve danışmanlık süreci sağlıyoruz.
                        </p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((service, index) => {
                        const Icon = service.icon || Scale;
                        return (
                            <motion.div
                                key={index}
                                className="bg-[#2d3444]/40 backdrop-blur-3xl border border-white/5 p-8 flex flex-col h-full group hover:bg-[#c09767] transition-all duration-500 rounded-3xl relative overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                {/* Decorative Line */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:bg-white/10 transition-colors"></div>

                                {/* Icon Circle */}
                                <div className="w-16 h-16 rounded-2xl bg-[#c09767] group-hover:bg-white flex items-center justify-center text-white group-hover:text-[#c09767] mb-8 transition-all duration-500 shadow-lg group-hover:shadow-white/20">
                                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-white text-2xl font-bold font-serif mb-4 group-hover:text-white transition-colors">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 group-hover:text-gray-100 mb-8 flex-grow leading-loose text-sm font-light transition-colors">
                                    {service.description}
                                </p>

                                <div className="mt-auto">
                                    <a
                                        href={service.link}
                                        className="inline-flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group/link"
                                    >
                                        İNCELE
                                        <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform duration-300" />
                                    </a>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
