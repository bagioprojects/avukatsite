# Sevinç Hukuk Bürosu - Vercel Deployment Guide

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/yourusername/avukat)

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Database**: PostgreSQL instance (Supabase, Railway, or Neon recommended)
3. **OpenAI API Key** (optional for AI features)

## 🔧 Environment Variables

Add these to your Vercel project settings:

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"
NEXTAUTH_URL="https://yourdomain.com"

# Admin
ADMIN_EMAIL="admin@sevinclaw.com"
ADMIN_PASSWORD="secure-password"

# OpenAI (Optional)
OPENAI_API_KEY="sk-..."

# Site
NEXT_PUBLIC_SITE_NAME="Sevinç Hukuk Bürosu"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
DEFAULT_LANGUAGE="tr"
```

## 📦 Deployment Steps

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically on push

## 🗄️ Database Setup

### Option A: Supabase (Recommended)

```bash
# 1. Create project at supabase.com
# 2. Get connection string
# 3. Add to Vercel env vars
# 4. Run migrations
npm run db:push
npm run db:seed
```

### Option B: Railway

```bash
# 1. Create PostgreSQL at railway.app
# 2. Copy DATABASE_URL
# 3. Add to Vercel
# 4. Migrate
```

### Option C: Neon

```bash
# 1. Create database at neon.tech
# 2. Get connection string
# 3. Configure in Vercel
```

## 🔐 Post-Deployment Steps

1. **Verify Database**
   ```bash
   npx prisma db push --preview-feature
   npx prisma db seed
   ```

2. **Create Admin User**
   - Login at: `https://yourdomain.com/admin/login`
   - Email: from `ADMIN_EMAIL`
   - Password: from `ADMIN_PASSWORD`

3. **Configure Domain**
   - Add custom domain in Vercel
   - Update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL`

4. **Enable Analytics**
   - Add Google Analytics ID in admin settings
   - Verify in Google Analytics dashboard

## ⚡ Performance Optimizations

Already configured:
- ✅ Next.js Image Optimization
- ✅ Font subsetting
- ✅ Automatic code splitting
- ✅ Static generation for services/articles
- ✅ Edge caching
- ✅ Compression

## 📊 Monitoring

### Google Analytics 4
1. Create GA4 property
2. Add measurement ID to admin settings
3. Verify tracking

### Error Tracking (Optional)
Install Sentry:
```bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### Uptime Monitoring
Use UptimeRobot or similar:
- Monitor: `https://yourdomain.com`
- Interval: 5 minutes
- Alert: Email/SMS

## 🧪 Pre-Production Checklist

- [ ] All environment variables set
- [ ] Database migrated and seeded
- [ ] Admin login working
- [ ] Contact form tested
- [ ] Appointment system tested
- [ ] All pages load correctly
- [ ] SEO metadata verified
- [ ] Sitemap.xml accessible
- [ ] Robots.txt configured
- [ ] SSL certificate active
- [ ] Custom domain configured

## 🔄 CI/CD Pipeline

Vercel automatically:
- Builds on push to main
- Runs preview deployments for PRs
- Invalidates cache on deploy
- Optimizes images
- Minifies code

## 📱 Domain Configuration

```bash
# Add domains in Vercel:
1. sevinclaw.com
2. www.sevinclaw.com

# Configure DNS:
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

## 🚨 Troubleshooting

**Database connection fails:**
```bash
# Check DATABASE_URL format
# Ensure IP allowlist (Supabase/Railway)
# Verify SSL mode: ?ssl=true
```

**Build errors:**
```bash
# Clear cache and rebuild
vercel --force
```

**NextAuth errors:**
```bash
# Ensure NEXTAUTH_URL matches deployment URL
# Check NEXTAUTH_SECRET is set
```

## 📈 Post-Launch

1. Submit sitemap to Google Search Console
2. Enable Google Analytics tracking
3. Set up error monitoring
4. Configure backup strategy
5. Schedule regular database backups

## 🎯 Production URLs

- **Website**: https://yourdomain.com
- **Admin**: https://yourdomain.com/admin/login
- **API Health**: https://yourdomain.com/api/health
- **Sitemap**: https://yourdomain.com/sitemap.xml

---

**Support**: For deployment issues, contact support or check Vercel documentation.
