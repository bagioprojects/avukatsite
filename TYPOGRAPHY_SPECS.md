# Typography Specifications - Sadekov.ee Clone

## Header Logo

### Main Logo Text ("SADEKOV")
- **Font Family**: Source Sans Pro
- **Font Size**: 22px
- **Font Weight**: 600 (semibold)
- **Letter Spacing**: 0.12em
- **Color**: #262b3e (dark navy)

### Logo Subtitle ("ADVOKAADIBÜROO")
- **Font Family**: Source Sans Pro
- **Font Size**: 8px
- **Font Weight**: 300 (light)
- **Letter Spacing**: 0.2em
- **Color**: #6b7280 (gray-500)
- **Text Transform**: uppercase

## Navigation Menu

### Menu Links (Meie meeskond, Teenused, Artiklid, Kontaktid)
- **Font Family**: Source Sans Pro
- **Font Size**: 15px
- **Font Weight**: 400 (normal)
- **Font Style**: normal
- **Color**: #374151 (gray-700)
- **Hover Color**: #c9a961 (gold)

## Language Switcher (ET EN RU)
- **Font Family**: Source Sans Pro
- **Font Size**: 11px
- **Font Weight**: 
  - Active (ET): 600 (semibold)
  - Inactive: 400 (normal)
- **Background**: #262b3e (dark navy circle)
- **Active Color**: white
- **Inactive Color**: #9ca3af (gray-400)

## CTA Button ("Võtke ühendust")
- **Font Family**: Source Sans Pro
- **Font Size**: 15px
- **Font Weight**: 600 (semibold)
- **Background**: #c9a961 (gold)
- **Text Color**: white
- **Padding**: px-7 py-2.5 (28px horizontal, 10px vertical)
- **Border Radius**: rounded-full
- **Arrow**: → (text-base, 16px)

## Color Palette

```css
--navy-dark: #262b3e;      /* Top bar & language switcher */
--navy-text: #262b3e;      /* Logo text */
--gold-primary: #c9a961;   /* CTA button & hover states */
--text-gray: #374151;      /* Menu text (gray-700) */
--text-light: #6b7280;     /* Subtitle (gray-500) */
--text-inactive: #9ca3af; /* Language switcher inactive (gray-400) */
```

## Implementation Notes

1. All typography uses inline `style` prop to force Source Sans Pro
2. Font weights specified with both class (`font-normal`) and inline style (`fontWeight: 400`)
3. Letter-spacing uses Tailwind `tracking-[]` utility with exact em values
4. Color values use exact hex codes, not Tailwind utilities, for precision
