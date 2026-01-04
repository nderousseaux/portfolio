# Tailwind Configuration

## Breakpoints

| Alias   | Width    | Usage                      |
|---------|----------|----------------------------|
| `xs`    | 440px    | Small mobile               |
| `sm-md` | 750px    | Large mobile / small tablet|
| `md`    | 810px    | Tablet                     |
| `lg`    | 992px    | Desktop transition         |
| `xl`    | 1200px   | Large desktop              |
| `2xl`   | 1420px   | Max container              |

## Custom Values

### Line Heights
- `leading-5-25` → 21px
- `leading-6` → 24px
- `leading-7` → 28px

### Spacing
- `*-2-5` → 10px
- `*-5-25` → 21px
- `*-7-75` → 31px

### Container Widths
- `max-w-192-5` → 770px
- `max-w-255` → 1020px
- `max-w-295` → 1180px
- `max-w-350` → 1400px
- `max-w-content-xs` → 24.5rem
- `max-w-content-sm` → 28rem
- `max-w-content-lg` → 31rem

## Files

- `globals.css` → Tailwind v4 @theme (breakpoints, spacing, widths), base layer
- `tailwind.config.ts` → Colors, fonts
- `postcss.config.mjs` → @tailwindcss/postcss plugin (required)
