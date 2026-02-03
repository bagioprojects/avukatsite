# Avukatlık Web Sitesi

Modern, çok dilli avukatlık web sitesi ve admin paneli.

## 🚀 Teknolojiler

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **AI:** OpenAI GPT-4
- **Diller:** Türkçe, İngilizce, Almanca, İspanyolca, Rusça, Arapça

## 📦 Kurulum

```bash
# Dependencies kur
npm install

# Environment variables kopyala
cp .env.example .env.local

# Database migrate et
npm run db:push

# Development server başlat
npm run dev
```

## 🏗️ Proje Yapısı

```
avukat/
├── app/              # Next.js App Router
├── components/       # React Components
├── core/            # Business Logic (MVC)
│   ├── models/      # Domain Models
│   ├── services/    # Business Services
│   └── repositories/# Data Access
├── lib/             # Utilities
├── prisma/          # Database Schema
└── types/           # TypeScript Types
```

## 📝 Scripts

- `npm run dev` - Development server (Turbopack)
- `npm run build` - Production build
- `npm run lint` - ESLint check
- `npm run format` - Prettier format
- `npm run db:push` - Database push
- `npm run db:studio` - Prisma Studio

## 📄 Lisans

Proprietary
