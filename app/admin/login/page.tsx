'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError(result.error)
            } else {
                router.push('/admin/dashboard')
                router.refresh()
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyiniz.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#2d3e50] to-[#3d4e60]">
            <div className="w-full max-w-md p-8">
                {/* Logo */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#d4af7a]">
                        <span className="text-4xl font-bold text-white">S</span>
                    </div>
                    <h1 className="mb-2 text-2xl font-bold text-white">Admin Panel</h1>
                    <p className="text-gray-300">Sevinç Hukuk Bürosu</p>
                </div>

                {/* Login Form */}
                <div className="rounded-2xl bg-white p-8 shadow-2xl">
                    <h2 className="mb-6 text-xl font-bold text-gray-900">Giriş Yapın</h2>

                    {error && (
                        <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                            <AlertCircle className="h-4 w-4 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                E-posta
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                                    placeholder="admin@sevinclaw.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Şifre
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-[#c9a961] focus:outline-none focus:ring-2 focus:ring-[#c9a961]/20"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#c9a961] px-6 py-3 font-semibold text-white transition-all hover:bg-[#b89851] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    Giriş yapılıyor...
                                </>
                            ) : (
                                'Giriş Yap'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setEmail('admin@avukat.com')
                                setPassword('admin123')
                                // Optional: auto-submit logic could go here, but filling is safer for now to let user see
                            }}
                            className="w-full text-center text-sm text-gray-500 hover:text-[#c9a961] hover:underline mt-2"
                        >
                            Hızlı Giriş (Admin)
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-300">
                    © 2024 Sevinç Hukuk Bürosu. Tüm hakları saklıdır.
                </p>
            </div>
        </div>
    )
}
