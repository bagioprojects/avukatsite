import { Languages, Globe, Check, AlertCircle } from 'lucide-react'
import { i18n } from '@/lib/i18n-config'

export default function LanguagesPage() {
    return (
        <div className="space-y-8">
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 z-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-[#2d3e50] rounded-lg text-white">
                            <Languages className="w-6 h-6" />
                        </div>
                        Dil Yönetimi
                    </h1>
                    <p className="text-gray-500 mt-2 pl-1">Sitenizin yayın yaptığı aktif diller.</p>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                    <span className="font-bold">Bilgi:</span> Yeni bir dil eklemek veya mevcut bir dili kaldırmak için yazılım ekibiyle iletişime geçiniz. Bu panel şu an sadece aktif dilleri listeler.
                    Otomatik dil algılama sistemi (Middleware) şu an <strong>Aktif</strong>.
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
                {i18n.locales.map((locale) => (
                    <div key={locale} className="flex items-center justify-between p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-xl uppercase text-gray-500">
                                {locale}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg uppercase">{new Intl.DisplayNames([locale], { type: 'language' }).of(locale)}</h3>
                                <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">{locale}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {locale === i18n.defaultLocale ? (
                                <span className="px-4 py-2 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100 flex items-center gap-2">
                                    <Check className="w-4 h-4" /> Varsayılan Dil
                                </span>
                            ) : (
                                <span className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg">
                                    Aktif
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
