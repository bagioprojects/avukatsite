# Common Errors and Solutions

## TypeScript Errors

### 1. NextAuth Type Errors
**Error**: `Property 'role' does not exist on type 'User'`

**Solution**: Already fixed in `types/next-auth.d.ts`

### 2. Component Import Errors
**Error**: `Module has no exported member 'default'`

**Solution**: Fixed exports in `components/site/index.ts` to use named exports

### 3. Image Format Type Error
**Error**: `Type 'string[]' is not assignable to type 'ImageFormat[]'`

**Solution**: Added `as const` to image formats in `next.config.ts`

---

## Environment Variable Errors

### Missing NEXTAUTH_SECRET
Add to `.env.local`:
```bash
NEXTAUTH_SECRET="your-secret-min-32-characters"
```

Generate secure secret:
```bash
openssl rand -base64 32
```

---

## Database Errors

### Connection Failed
Check:
1. Docker is running: `docker ps`
2. PostgreSQL port 5433 is free
3. DATABASE_URL is correct in `.env.local`

Restart database:
```bash
docker-compose down
docker-compose up -d
```

### Migration Errors
Reset database:
```bash
npm run db:push
npm run db:seed
```

---

## Build Errors

### Bundle Analyzer Error
If `@next/bundle-analyzer` causes issues:
```bash
npm install -D @next/bundle-analyzer
```

### OpenAI Import Error
If OpenAI API is not used:
- Remove `OPENAI_API_KEY` requirement checks
- Or add dummy key to `.env.local`: `OPENAI_API_KEY="sk-test"`

---

## Runtime Errors

### NextAuth Session Error
Ensure in `app/admin/layout.tsx`:
```tsx
import { SessionProvider } from 'next-auth/react'
```

### Middleware Redirect Loop
Check middleware.ts doesn't redirect admin routes unnecessarily

---

## Test Errors

### Playwright Not Installed
```bash
npx playwright install
npm run test:e2e
```

### Port 3000 In Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## Performance Issues

### Slow Hot Reload
1. Disable Turbopack: Change `dev` script to `next dev`
2. Increase Node memory: `NODE_OPTIONS='--max-old-space-size=4096' npm run dev`

### Large Bundle Size
Run analyzer:
```bash
npm run analyze
```

Remove unused dependencies

---

## Deployment Errors

### Vercel Build Fails
1. Check all environment variables are set
2. Ensure DATABASE_URL is production database
3. Run `npm run build` locally first

### Database Connection on Vercel
- Use connection pooling (PgBouncer)
- Set `?connection_limit=5` in DATABASE_URL

---

## Quick Fixes

Reset everything:
```bash
# Stop docker
docker-compose down

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart database
docker-compose up -d

# Migrate database
npm run db:push
npm run db:seed

# Start dev server
npm run dev
```
