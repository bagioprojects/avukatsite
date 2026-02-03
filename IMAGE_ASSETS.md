# Sadekov.ee Pixel-Perfect Clone - Image Assets

## Required Images from Sadekov.ee

Since the browser tool is not available, please manually download these images from https://sadekov.ee:

### 1. Logo
- **File**: `logo.svg` or `logo.png`
- **Location**: Header top-left
- **Description**: SADEKOV text logo in gold/beige (#d4af7a)
- **Save to**: `d:/avukat/public/images/logo.png`

### 2. Hero Laptop Image
- **File**: Laptop with business card
- **Location**: Hero section right side
- **Description**: MacBook-style laptop showing SADEKOV business card
- **Save to**: `d:/avukat/public/images/laptop-hero.png`
- **Estimated size**: 1200x900px

### 3. Business Card (if separate)
- ** Description**: Navy blue business card with SADEKOV branding
- **Save to**: `d:/avukat/public/images/business-card.png`

## Temporary Placeholders

Until real images are downloaded, using:
- CSS gradients for laptop mockup
- SVG for logo (inline)
- Solid colors for business card

## How to Download

1. Visit https://sadekov.ee
2. Right-click on images → "Save image as"
3. Save to `d:/avukat/public/images/` directory
4. Update component imports to use real images

## Next.js Image Component

After downloading, update components:

```tsx
import Image from 'next/image'

// Logo
<Image 
  src="/images/logo.png" 
  alt="Sadekov Logo" 
  width={180} 
  height={60}
  priority
/>

// Hero Laptop
<Image 
  src="/images/laptop-hero.png" 
  alt="Legal Services" 
  width={1200} 
  height={900}
  className="..."
/>
```

## Color Palette (Extracted from Reference)

```css
/* Exact Sadekov colors */
--navy-dark: #262b3e;      /* Top bar */
--navy-hero: #2d3e50;      /* Hero background */
--gold-primary: #c9a961;    /* **CTA buttons */
--gold-light: #d4af7a;     /* Logo */
--beige-light: #e8d4b8;    /* Accents */
```
