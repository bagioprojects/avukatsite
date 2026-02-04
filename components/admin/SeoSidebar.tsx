
import { AlertCircle, CheckCircle, HelpCircle, Info } from "lucide-react"

interface SeoSidebarProps {
    metrics: any
    keyword: string
    setKeyword: (k: string) => void
    seoScore: number
}

export function SeoSidebar({ metrics, keyword, setKeyword, seoScore }: SeoSidebarProps) {
    return (
        <div className="space-y-6">

            {/* Score Card */}
            <div className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">SEO Skoru</h3>
                    <span className={`text-xl font-bold ${seoScore >= 80 ? 'text-green-600' : seoScore >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                        {Math.round(seoScore)}/100
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-6">
                    <div
                        className={`h-full transition-all duration-1000 ease-out rounded-full ${seoScore >= 80 ? 'bg-green-500' : seoScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${seoScore}%` }}
                    />
                </div>

                {/* Keyword Input */}
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Odak Anahtar Kelime</label>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Örn: Boşanma Davası"
                        className="w-full pl-4 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a961]/20 outline-none"
                    />
                </div>
            </div>

            {/* Analysis Tabs - Readability vs SEO */}
            <div className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-gray-800">Analiz Raporu</h3>
                </div>

                <div className="divide-y divide-gray-100">
                    {/* Readability Checks */}
                    <div className="p-4 space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Okunabilirlik</h4>

                        <CheckItem
                            label="Paragraf Uzunluğu"
                            status={metrics.paragraphCount > 0 ? "success" : "neutral"}
                            desc="Paragraflarınız ideal uzunlukta."
                        />
                        <CheckItem
                            label="Cümle Uzunluğu"
                            status={metrics.wordCount / metrics.sentenceCount < 20 ? "success" : "warning"}
                            desc={`${(metrics.wordCount / metrics.sentenceCount).toFixed(1)} kelime/cümle ortalaması.`}
                        />
                        <CheckItem
                            label="Edilgen Çatı (Passive)"
                            status={metrics.passiveVoicePercentage < 10 ? "success" : "warning"}
                            desc={`%${metrics.passiveVoicePercentage.toFixed(1)} oranında edilgen cümle.`}
                        />
                        <CheckItem
                            label="Okuma Kolaylığı"
                            status={metrics.fleschScore > 60 ? "success" : "error"}
                            desc={`Skor: ${metrics.fleschScore.toFixed(0)} (Zorluk Seviyesi)`}
                        />
                    </div>

                    {/* SEO Checks */}
                    <div className="p-4 space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">SEO Optimizasyonu</h4>

                        <CheckItem
                            label="Anahtar Kelime Yoğunluğu"
                            status={metrics.keywordDensity >= 0.5 && metrics.keywordDensity <= 3 ? "success" : "error"}
                            desc={`Mevcut: %${metrics.keywordDensity.toFixed(2)} (Hedef: %0.5 - %2.5)`}
                        />
                        <CheckItem
                            label="Başlıkta Anahtar Kelime"
                            status={metrics.keywordInTitle ? "success" : "error"}
                            desc={metrics.keywordInTitle ? "Başlıkta geçiyor." : "Başlıkta bulunamadı."}
                        />
                        <CheckItem
                            label="Giriş Bölümünde"
                            status={metrics.keywordInFirstPara ? "success" : "error"}
                            desc="İlk paragrafta anahtar kelime kullanılmalı."
                        />
                        <CheckItem
                            label="Kelime Sayısı"
                            status={metrics.wordCount > 300 ? "success" : "warning"}
                            desc={`${metrics.wordCount} kelime (Min: 300)`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function CheckItem({ label, status, desc }: { label: string, status: 'success' | 'warning' | 'error' | 'neutral', desc?: string }) {
    const colors = {
        success: "text-green-500",
        warning: "text-orange-500",
        error: "text-red-500",
        neutral: "text-gray-400"
    }

    const icons = {
        success: CheckCircle,
        warning: HelpCircle,
        error: AlertCircle,
        neutral: Info
    }

    const Icon = icons[status]

    return (
        <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors[status]}`} />
            <div>
                <p className="text-sm font-medium text-gray-700">{label}</p>
                {desc && <p className="text-xs text-gray-500 mt-0.5">{desc}</p>}
            </div>
        </div>
    )
}
