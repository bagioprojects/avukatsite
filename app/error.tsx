'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
            <div className="rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Bir hata oluştu!</h2>
                <p className="mb-6 text-gray-600">
                    Üzgünüz, bir şeyler yanlış gitti.
                </p>
                <button
                    onClick={() => reset()}
                    className="rounded-md bg-[#c9a961] px-6 py-2 text-white transition-colors hover:bg-[#b89851]"
                >
                    Tekrar dene
                </button>
            </div>
        </div>
    )
}
