import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'] as const,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    compress: true,
    poweredByHeader: false,
    reactStrictMode: true,
}

export default bundleAnalyzer(nextConfig)
