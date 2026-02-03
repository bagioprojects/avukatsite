import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Veritabanı tohumlanıyor...')

    // 1. Admin Kullanıcısı
    const admin = await prisma.user.upsert({
        where: { email: 'admin@avukat.com' },
        update: {},
        create: {
            email: 'admin@avukat.com',
            name: 'Av. Mehmet Sevinç',
            password: '$2a$10$X9z5QkW5z5QkW5z5QkW5z5QkW5z5QkW5z5QkW5z5QkW5z5', // bcrypt hash: "admin123"
            role: 'SUPER_ADMIN',
            avatar: '/images/team/mehmet-sevinc.jpg'
        },
    })
    console.log('✅ Admin oluşturuldu:', admin.name)

    // 2. Kategoriler
    const categoriesData = [
        { slug: 'ceza-hukuku', name: { tr: 'Ceza Hukuku', en: 'Criminal Law' } },
        { slug: 'aile-hukuku', name: { tr: 'Aile Hukuku', en: 'Family Law' } },
        { slug: 'ticaret-hukuku', name: { tr: 'Ticaret Hukuku', en: 'Commercial Law' } },
        { slug: 'is-hukuku', name: { tr: 'İş Hukuku', en: 'Labor Law' } },
        { slug: 'icra-iflas-hukuku', name: { tr: 'İcra ve İflas Hukuku', en: 'Enforcement Law' } },
        { slug: 'gayrimenkul-hukuku', name: { tr: 'Gayrimenkul Hukuku', en: 'Real Estate Law' } },
    ]

    const categories = []
    for (const cat of categoriesData) {
        const c = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: {
                slug: cat.slug,
                name: cat.name,
            },
        })
        categories.push(c)
    }
    console.log(`✅ ${categories.length} kategori oluşturuldu.`)

    // 3. Makaleler (12 Adet)
    // Gerçekçi hukuki içerikler
    const articlesData = [
        {
            title: { tr: "Boşanma Davalarında Mal Paylaşımı Nasıl Yapılır?" },
            slug: "bosanma-davalarinda-mal-paylasimi",
            category: "aile-hukuku",
            excerpt: { tr: "Boşanma sürecinde edinilmiş mallara katılma rejimi, kişisel mallar ve mal paylaşımı davası hakkında detaylı hukuki rehber." },
            content: {
                tr: `
                <h2>Boşanmada Mal Paylaşımı Esasları</h2>
                <p>Türk Medeni Kanunu'na göre, 2002 sonrası evliliklerde yasal mal rejimi "Edinilmiş Mallara Katılma Rejimi"dir. Bu rejime göre, evlilik birliği içerisinde edinilen mallar, boşanma durumunda eşler arasında yarı yarıya paylaşılır.</p>
                <h3>Kişisel Mallar ve Edinilmiş Mallar Ayrımı</h3>
                <p>Edinilmiş mallar, çalışma karşılığı elde edilen edinimler, sosyal güvenlik ödemeleri ve kişisel malların gelirleridir. Kişisel mallar ise (miras yoluyla kalanlar, evlilik öncesi mallar) paylaşıma dahil edilmez.</p>
                <h3>Dava Süreci</h3>
                <p>Mal paylaşımı davası, boşanma davası kesinleştikten sonra 10 yıl içinde açılmalıdır. Ancak genellikle boşanma davası ile birlikte talep edilir ve boşanma kararının kesinleşmesi beklenir.</p>
            `},
            keywords: ["boşanma", "mal paylaşımı", "edinilmiş mallar", "aile hukuku"]
        },
        {
            title: { tr: "İş Kazası Sonrası Tazminat Hakları" },
            slug: "is-kazasi-sonrasi-tazminat-haklari",
            category: "is-hukuku",
            excerpt: { tr: "İş kazası geçiren işçinin maddi ve manevi tazminat hakları, iş göremezlik ödeneği ve dava açma süreleri." },
            content: {
                tr: `
                <h2>İş Kazası Nedir?</h2>
                <p>İşçinin işyerinde bulunduğu sırada, işveren tarafından yürütülen iş nedeniyle veya işveren tarafından sağlanan taşıtla yolculuk esnasında meydana gelen ve işçiyi bedenen veya ruhen engelli hale getiren olaydır.</p>
                <h3>Tazminat Türleri</h3>
                <ul>
                    <li><strong>Maddi Tazminat:</strong> Tedavi giderleri, çalışılamayan süre için gelir kaybı ve çalışma gücü kaybı (maluliyet) tazminatı.</li>
                    <li><strong>Manevi Tazminat:</strong> Kaza nedeniyle yaşanan acı, elem ve ızdırap için ödenen tutar.</li>
                </ul>
                <p>İş kazası davalarında kusur oranı belirleyici faktördür.</p>
            `},
            keywords: ["iş kazası", "tazminat", "iş hukuku", "işçi hakları"]
        },
        {
            title: { tr: "Çek Senet Tahsilatı ve İcra Takibi" },
            slug: "cek-senet-tahsilati-ve-icra",
            category: "icra-iflas-hukuku",
            excerpt: { tr: "Karşılıksız çek ve ödenmeyen senetlerin icra yoluyla tahsili, kambiyo senetlerine özgü haciz yolu ve itiraz süreçleri." },
            content: {
                tr: `
                <h2>Kambiyo Senetlerine Özgü Haciz Yolu</h2>
                <p>Çek ve senet gibi kambiyo senetleri için İcra İflas Kanunu özel bir takip yolu öngörmüştür. Bu yolda borçluya ödeme emri gönderilir ve 10 gün içinde ödeme yapması istenir.</p>
                <h3>İhtiyati Haciz</h3>
                <p>Alacağın tehlikeye girmesi durumunda mahkemeden ihtiyati haciz kararı alınarak borçlunun mallarına el konulabilir.</p>
                <h3>Karşılıksız Çek Suçu</h3>
                <p>Çekin karşılıksız çıkması durumunda, hamili şikayet yoluyla çeki keşide eden hakkında hapis cezası talep edebilir.</p>
            `},
            keywords: ["icra", "çek", "senet", "kambiyo", "haciz"]
        },
        {
            title: { tr: "Kira Tespit ve Tahliye Davaları" },
            slug: "kira-tespit-ve-tahliye-davalari",
            category: "gayrimenkul-hukuku",
            excerpt: { tr: "5 yılı dolduran kiracılar için kira tespit davası ve 10 yıllık uzama süresi sonunda tahliye hakkı." },
            content: {
                tr: `
                <h2>Kira Tespit Davası (Kira Artırımı)</h2>
                <p>5 yılı dolduran kira sözleşmelerinde, ev sahibi "TÜFE" oranına bağlı kalmaksızın, emsal kira bedellerine göre kira artırımı talep edebilir. Mahkeme, bölgedeki rayiç bedelleri baz alarak yeni kira bedelini belirler.</p>
                <h2>Tahliye Nedenleri</h2>
                <p>İhtiyaç nedeniyle tahliye, kiracının temerrüdü (kirayı ödememesi) ve 10 yıllık uzama süresinin dolması gibi nedenlerle tahliye davası açılabilir.</p>
            `},
            keywords: ["kira hukuku", "tahliye", "kira artışı", "gayrimenkul"]
        },
        {
            title: { tr: "Şirket Kuruluşunda Dikkat Edilmesi Gerekenler" },
            slug: "sirket-kurulusunda-dikkat-edilmesi-gerekenler",
            category: "ticaret-hukuku",
            excerpt: { tr: "Limited ve Anonim şirket farkları, vergi avantajları ve kuruluş maliyetleri üzerine karşılaştırmalı analiz." },
            content: {
                tr: `
                <h2>Limited mi Anonim mi?</h2>
                <p>Anonim şirketler, hisse devri kolaylığı ve vergi avantajları nedeniyle büyük ölçekli yatırımlar için daha uygundur. Limited şirketler ise daha küçük ölçekli ve ortakların birbirini tanıdığı yapılar için tercih edilir.</p>
                <h3>Ana Sözleşme</h3>
                <p>Şirket ana sözleşmesi, şirketin gelecekteki yönetimi ve ortaklar arası ilişkiler açısından kritik öneme sahiptir. Standart şablonlar yerine ihtiyaca özel sözleşmeler hazırlanmalıdır.</p>
            `},
            keywords: ["şirket kurma", "ticaret hukuku", "limited", "anonim"]
        },
        {
            title: { tr: "Uyuşturucu Madde Ticareti Suçu ve Cezası" },
            slug: "uyusturucu-madde-ticareti-sucu",
            category: "ceza-hukuku",
            excerpt: { tr: "TCK 188 kapsamında uyuşturucu ticareti suçu, etkin pişmanlık hükümleri ve savunma stratejileri." },
            content: {
                tr: `
                <h2>TCK 188 ve Ağırlaştırıcı Sebepler</h2>
                <p>Uyuşturucu veya uyarıcı madde imal ve ticareti suçu, Türk Ceza Kanunu'nda ağır yaptırımlara bağlanmıştır. Okul, hastane gibi yerlere yakınlık cezayı artırır.</p>
                <h3>Etkin Pişmanlık</h3>
                <p>Soruşturma veya kovuşturma aşamasında suç ortaklarını veya uyuşturucu maddenin saklandığı yeri bildiren failler hakkında cezada indirim yapılır.</p>
            `},
            keywords: ["ceza hukuku", "uyuşturucu", "ağır ceza", "avukat"]
        },
        {
            title: { tr: "Anlaşmalı Boşanma Protokolü Nasıl Hazırlanır?" },
            slug: "anlasmali-bosanma-protokolu",
            category: "aile-hukuku",
            excerpt: { tr: "Tek celsede boşanmak için gerekli şartlar ve protokolde bulunması gereken zorunlu maddeler." },
            content: {
                tr: `
                <h2>Anlaşmalı Boşanma Şartları</h2>
                <p>Evliliğin en az 1 yıl sürmüş olması ve eşlerin boşanmanın tüm sonuçları (nafaka, velayet, tazminat) üzerinde uzlaşmış olması gerekir.</p>
                <h3>Protokolün Önemi</h3>
                <p>Hazırlanan protokol hakim tarafından onaylanmalıdır. Velayet düzenlemeleri ve mali konular net bir şekilde ifade edilmelidir, aksi takdirde hakim protokolü reddedebilir.</p>
            `},
            keywords: ["anlaşmalı boşanma", "protokol", "velayet", "nafaka"]
        },
        {
            title: { tr: "İşe İade Davası Şartları" },
            slug: "ise-iade-davasi-sartlari",
            category: "is-hukuku",
            excerpt: { tr: "Geçersiz sebeple işten çıkarılan işçinin işe iade davası açma hakkı ve iş güvencesi tazminatı." },
            content: {
                tr: `
                <h2>Kimler İşe İade Davası Açabilir?</h2>
                <p>İşyerinde en az 30 işçi çalışıyorsa ve işçinin en az 6 aylık kıdemi varsa, iş sözleşmesi haksız yere feshedilen işçi 1 ay içinde arabulucuya başvurarak işe iade talebinde bulunabilir.</p>
                <h3>Dava Sonucu</h3>
                <p>Mahkeme işe iade kararı verirse, işveren işçiyi 1 ay içinde işe başlatmak zorundadır. Başlatmazsa en az 4, en çok 8 aylık brüt ücret tutarında tazminat öder.</p>
            `},
            keywords: ["işe iade", "iş hukuku", "fesih", "tazminat"]
        },
        {
            title: { tr: "Bilişim Suçları ve Hukuki Boyutu" },
            slug: "bilisim-suclari-ve-hukuki-boyutu",
            category: "ceza-hukuku",
            excerpt: { tr: "Siber zorbalık, veri hırsızlığı ve sistem engelleme suçlarında ceza soruşturması süreci." },
            content: {
                tr: `
                <h2>Yaygın Bilişim Suçları</h2>
                <p>Bilişim sistemine yetkisiz erişim, verileri yok etme veya değiştirme, banka veya kredi kartlarının kötüye kullanılması en sık karşılaşılan suç tipleridir.</p>
                <h3>Delil Tespiti</h3>
                <p>IP adresleri, log kayıtları ve dijital materyaller bu davalarda en önemli delillerdir. Uzman adli bilişim incelemesi gerektirir.</p>
            `},
            keywords: ["bilişim suçları", "siber suçlar", "ceza hukuku", "hacker"]
        },
        {
            title: { tr: "Arabuluculuk Nedir? Hangi Davalarda Zorunludur?" },
            slug: "arabuluculuk-nedir",
            category: "ticaret-hukuku",
            excerpt: { tr: "Ticari davalar, iş davaları ve tüketici davalarında dava şartı arabuluculuk süreci hakkında bilgiler." },
            content: {
                tr: `
                <h2>Dava Şartı Arabuluculuk</h2>
                <p>İş davaları (kıdem, ihbar vb.), ticari alacak davaları ve tüketici uyuşmazlıklarında dava açmadan önce arabulucuya başvurmak zorunludur.</p>
                <h3>Süreç Nasıl İşler?</h3>
                <p>Taraflar tarafsız bir arabulucu eşliğinde bir araya gelir. Anlaşma sağlanırsa, düzenlenen belge mahkeme ilamı hükmündedir ve doğrudan icraya konulabilir.</p>
            `},
            keywords: ["arabuluculuk", "dava şartı", "ticaret hukuku", "iş hukuku"]
        },
        {
            title: { tr: "Mirasçılık Belgesi (Veraset İlamı) Nedir?" },
            slug: "mirascilik-belgesi-nedir",
            category: "aile-hukuku",
            excerpt: { tr: "Mirasın intikali için gerekli olan veraset ilamı nasıl alınır? Noter mi Mahkeme mi?" },
            content: {
                tr: `
                <h2>Veraset İlamı Nereden Alınır?</h2>
                <p>Mirasçılık belgesi, noterlerden veya Sulh Hukuk Mahkemelerinden alınabilir. Nüfus kayıtlarında yabancı unsur veya karmaşık durumlar yoksa noterden almak daha hızlıdır.</p>
                <h3>Mirasın Reddi</h3>
                <p>Mirasbırakanın borçları malvarlığından fazlaysa, mirasçılar 3 ay içinde mirası reddedebilir (Reddi Miras).</p>
            `},
            keywords: ["miras", "veraset ilamı", "miras hukuku", "reddi miras"]
        },
        {
            title: { tr: "Konkordato İlanı ve Sonuçları" },
            slug: "konkordato-ilani",
            category: "icra-iflas-hukuku",
            excerpt: { tr: "Mali darboğaza giren şirketler için iflas erteleme yerine getirilen konkordato müessesi." },
            content: {
                tr: `
                <h2>Geçici ve Kesin Mühlet</h2>
                <p>Mahkeme, şirketin projesini uygun bulursa önce 3 aylık geçici mühlet verir. Bu sürede şirkete haciz yapılamaz. Süreç başarılı ilerlerse 1 yıllık kesin mühlet verilir.</p>
                <h3>Alacaklılar Toplantısı</h3>
                <p>Konkordato projesinin kabulü için alacaklıların belirli bir çoğunluğunun onayı gerekir.</p>
            `},
            keywords: ["konkordato", "iflas", "ticaret hukuku", "borç"]
        }
    ]

    console.log('📝 Makaleler oluşturuluyor...')

    for (const article of articlesData) {
        // İlgili kategoriyi bul
        const cat = categories.find(c => c.slug === article.category)
        if (!cat) continue

        await prisma.article.upsert({
            where: { slug: article.slug },
            update: {},
            create: {
                slug: article.slug,
                title: article.title,
                content: article.content,
                excerpt: article.excerpt,
                status: 'PUBLISHED',
                publishedAt: new Date(),
                authorId: admin.id,
                categoryId: cat.id,
                coverImage: `/uploads/placeholder-${article.category}.jpg`, // Mock image
                seo: {
                    create: {
                        metaTitle: article.title,
                        metaDesc: article.excerpt,
                        keywords: article.keywords
                    }
                }
            },
        })
    }

    console.log(`✅ ${articlesData.length} makale başarıyla oluşturuldu.`)
    console.log('🎉 Seeding tamamlandı!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('❌ Seeding hatası:', e)
        await prisma.$disconnect()
        process.exit(1)
    })
