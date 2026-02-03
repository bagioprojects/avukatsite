import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="mb-4 text-6xl font-bold text-[#c9a961]">404</h1>
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">Sayfa Bulunamadı</h2>
                <p className="mb-8 text-gray-600">
                    Aradığınız sayfa mevcut değil veya taşınmış olabilir.
                </p>
                <Link
                    href="/"
                    className="inline-block rounded-full bg-[#c9a961] px-8 py-3 text-white transition-colors hover:bg-[#b89851]"
                >
                    Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    )
}
