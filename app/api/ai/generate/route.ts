
import { NextResponse } from 'next/server'
import { generateDeepSeekResponse } from '@/lib/deepseek'

export async function POST(req: Request) {
    try {
        const { type, content, keyword, title } = await req.json()

        let systemPrompt = "Sen uzman bir Türk avukatsın. Hukuki makaleler yazıyorsun. Dilin profesyonel, ikna edici ve SEO uyumlu."
        let userPrompt = ""

        switch (type) {
            case 'outline':
                userPrompt = `Konu: "${title}". Bu konu hakkında SEO uyumlu, H2 ve H3 başlıkları içeren detaylı bir makale taslağı (outline) oluştur. Sadece HTML formatında başlıkları (<h2>, <h3>) ve kısa açıklamaları (<p>) döndür. Giriş, Gelişme, Sonuç yapısına uygun olsun.`
                break

            case 'title':
                // Check if we are improving an existing title or generating new ones
                if (content && content.length > 5) {
                    userPrompt = `Mevcut Başlık: "${content}". Bu başlığı daha profesyonel, ilgi çekici ve SEO uyumlu hale getir. Sadece EN İYİ 1 alternatifi yaz. Tırnak işareti kullanma.`
                } else {
                    userPrompt = `Konu: "${title || 'Hukuk'}". Bu konuyla ilgili tıklanma oranı yüksek, merak uyandıran 5 adet blog başlığı öner. Sadece maddeler halinde başlıkları yaz.`
                }
                break

            case 'fix_grammar':
                userPrompt = `Aşağıdaki metindeki yazım/imla hatalarını düzelt ve anlatım bozukluklarını gider. Hukuki terimleri koru. Sadece düzeltilmiş metni döndür:\n\n"${content}"`
                break

            case 'simplify':
                userPrompt = `Aşağıdaki hukuki metni, hukuki bilgisi olmayan bir vatandaşın ("Halk Dili") rahatça anlayabileceği şekilde sadeleştir, açıkla ve özetle:\n\n"${content}"`
                break

            case 'lsi_keywords':
                userPrompt = `Anahtar Kelime: "${keyword}". Bu anahtar kelime ile alakalı, varyasyonlu ve anlamsal (LSI) anahtar kelimeleri listele. Virgülle ayır.`
                break

            case 'expand':
                userPrompt = `Aşağıdaki paragrafı, hukuki detaylar, örnekler veya açıklamalar ekleyerek zenginleştir ve genişlet. Profesyonel bir ton kullan:\n\n"${content}"`
                break

            default:
                return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
        }

        const result = await generateDeepSeekResponse(userPrompt, systemPrompt)
        return NextResponse.json({ result })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
