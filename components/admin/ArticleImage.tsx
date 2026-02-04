
'use client'

import { useState } from 'react'
import { Newspaper, FileText } from 'lucide-react'

interface ArticleImageProps {
    src: string | null
    alt: string
}

export function ArticleImage({ src, alt }: ArticleImageProps) {
    const [error, setError] = useState(false)

    if (!src || error) {
        return (
            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                <Newspaper className="w-6 h-6 opacity-50" />
            </div>
        )
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-opacity duration-300"
            onError={() => setError(true)}
        />
    )
}
