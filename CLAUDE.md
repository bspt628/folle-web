# CLAUDE.md - AI Assistant Guide for Orchestra più Folle Website

## Project Overview

**Orchestra più Folle** is a classical orchestra website built with Next.js 15, showcasing concerts, news, and organization information. The site features a modern, responsive design with a turquoise/teal color scheme and Japanese typography optimization.

**Primary Language**: Japanese (lang="ja")
**Target Audience**: Classical music enthusiasts in Japan

## Technology Stack

### Core Framework
- **Next.js 15.2.4** - App Router with React Server Components (RSC)
- **React 19.0.0** - Latest React with concurrent features
- **TypeScript 5** - Strict mode enabled for type safety

### UI & Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **shadcn/ui** - Component library (New York style, RSC-enabled)
- **Radix UI** - Headless UI primitives for accessibility
- **lucide-react** - Icon library
- **class-variance-authority** - Component variant management
- **clsx + tailwind-merge** - Classname utilities

### Data & State Management
- **Supabase** - Contact form storage (PostgreSQL backend)
- **microCMS SDK** - CMS integration (prepared, not yet active)
- **SWR 2.3** - Data fetching and caching (via custom hooks)
- **date-fns 4.1** - Date formatting with Japanese locale
- **Zod 3.25** - Schema validation

### Analytics & Performance
- **@vercel/analytics** - User analytics
- **@vercel/speed-insights** - Performance monitoring

### Testing
- **Jest 30** - Test runner with SWC
- **React Testing Library 16.3** - Component testing
- **@testing-library/user-event** - User interaction simulation

### Build & Development
- **Node.js >= 18.17.0** - Runtime requirement
- **ESLint** - Code linting (Next.js config)
- **PostCSS + Autoprefixer** - CSS processing

## Directory Structure

```
/home/user/folle-web/
├── app/                          # Next.js App Router (pages & API routes)
│   ├── about/page.tsx           # About page
│   ├── api/notify-slack/route.ts # Slack notification API endpoint
│   ├── concerts/                # Concerts routes
│   │   ├── page.tsx             # Concerts listing
│   │   └── [id]/page.tsx        # Concert detail page (dynamic)
│   ├── contact/page.tsx         # Contact form
│   ├── news/[id]/page.tsx       # News detail page (dynamic)
│   ├── ui/fonts.ts              # Font configuration (Roboto, Inter)
│   ├── globals.css              # Global styles & CSS variables
│   ├── layout.tsx               # Root layout (Header, Footer, Analytics)
│   ├── loading.tsx              # Loading UI with animated logo
│   └── page.tsx                 # Homepage (news feed + upcoming concert)
│
├── components/                   # React components
│   ├── header.tsx               # Site header with navigation & mobile menu
│   ├── footer.tsx               # Site footer with social links
│   └── ui/                      # shadcn/ui components
│       ├── button.tsx           # Button variants (default, ghost, outline, etc.)
│       ├── card.tsx             # Card with header/content/footer slots
│       ├── input.tsx            # Form input with validation states
│       ├── textarea.tsx         # Textarea component
│       ├── logo-link.tsx        # Reusable logo component
│       └── page-container.tsx   # Page wrapper with background
│
├── lib/                         # Utilities & business logic
│   ├── api/                     # API integration layer
│   │   ├── concerts.ts          # Concert API (placeholder for microCMS)
│   │   ├── contact.ts           # Contact form submission (Supabase + Slack)
│   │   └── news.ts              # News API (placeholder)
│   ├── constants/               # Static data (current data source)
│   │   ├── concerts.ts          # Concert data & helpers
│   │   └── news.ts              # News data & helpers
│   ├── hooks/                   # Custom React hooks
│   │   ├── useConcerts.ts       # Concert data fetching hooks
│   │   └── useMediaQuery.ts     # Responsive media query hook
│   ├── supabase/                # Supabase client setup
│   │   └── client.ts            # Supabase client & ContactForm type
│   ├── microcms.ts              # microCMS client (configured, not active)
│   ├── types.ts                 # Core TypeScript types (Concert, NewsItem, Venue)
│   └── utils.ts                 # Utility functions (cn, isVideoPublished)
│
├── types/                       # Additional TypeScript definitions
│   └── jest.d.ts                # Jest type definitions
│
├── __tests__/                   # Jest test files
│   ├── app/                     # Page component tests
│   │   ├── page.test.tsx        # Homepage tests
│   │   ├── about/page.test.tsx  # About page tests
│   │   ├── contact/page.test.tsx # Contact page tests
│   │   └── concerts/page.test.tsx # Concerts page tests
│   └── components/              # Component tests
│       └── Header.test.tsx      # Header component tests
│
├── test/                        # Test utilities
│   └── providers/test-provider.tsx # Test wrapper component
│
├── public/                      # Static assets
│   ├── logo.svg                 # Orchestra logo files
│   ├── gray_back.jpg            # Background image
│   ├── 1stビラ.png              # Concert posters
│   ├── robots.txt               # SEO robots file
│   ├── sitemap.xml              # SEO sitemap
│   └── concerts/*.ics           # Calendar files
│
├── .github/workflows/           # CI/CD
│   └── test.yml                 # GitHub Actions test workflow
│
└── Configuration files
    ├── components.json          # shadcn/ui configuration
    ├── jest.config.js           # Jest test configuration
    ├── jest.setup.js            # Jest setup & mocks
    ├── next.config.ts           # Next.js configuration
    ├── tailwind.config.ts       # Tailwind theme & plugins
    ├── tsconfig.json            # TypeScript compiler options
    ├── eslint.config.mjs        # ESLint configuration
    ├── postcss.config.mjs       # PostCSS configuration
    └── package.json             # Dependencies & scripts
```

## Development Workflows

### Getting Started

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test              # Single run
npm run test:watch    # Watch mode
npm run test:ci       # CI mode with coverage
```

### Git Workflow

**Current Branch**: `claude/claude-md-mhy4nj93sy6a4nbc-01U9biZzYBx7BQLjXq3HJTCm`

```bash
# Check status
git status

# Stage changes
git add <files>

# Commit with descriptive message
git commit -m "type: concise description"

# Push to remote (ALWAYS use -u flag for new branches)
git push -u origin <branch-name>
```

**Commit Message Convention**:
- Use imperative mood: "Add feature" not "Added feature"
- Types: `feat:`, `fix:`, `refactor:`, `style:`, `test:`, `docs:`
- Keep messages concise (1-2 sentences)
- Focus on "why" rather than "what"

### Branch Protection
- Main branches: `main`, `dev`
- Feature branches should start with `claude/` for AI-assisted development
- CI runs tests on all PRs to main/dev

## Code Conventions and Standards

### TypeScript Guidelines

1. **Strict Mode**: Always maintain strict TypeScript settings
2. **Type Definitions**: Define types in `lib/types.ts` or co-located with components
3. **No `any`**: Avoid `any` type; use `unknown` if type is truly unknown
4. **Interfaces vs Types**: Use `type` for most definitions (project convention)

**Example Type Definition**:
```typescript
// lib/types.ts
export type Concert = {
  id: string
  title: string
  date: Date
  venue: Venue
  program: string[]
  // ... more fields
}
```

### File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `header.tsx`, `page-container.tsx`)
- **Pages**: `page.tsx` (Next.js App Router convention)
- **API Routes**: `route.ts` (Next.js App Router convention)
- **Utilities**: `kebab-case.ts` (e.g., `utils.ts`, `microcms.ts`)
- **Types**: `types.ts` or component-specific `*.types.ts`
- **Tests**: `*.test.tsx` or `*.test.ts`

### Import Ordering

```typescript
// 1. React/Next.js imports
import { useState } from 'react'
import Link from 'next/link'

// 2. Third-party libraries
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

// 3. Internal imports (using @ alias)
import { Concert } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// 4. Relative imports (if any)
import { LocalComponent } from './local-component'
```

### Code Style

- **Indentation**: Tabs (project uses tabs, not spaces)
- **Quotes**: Double quotes for strings
- **Semicolons**: Required (ESLint enforces)
- **Line Length**: No strict limit, but keep readable
- **Arrow Functions**: Prefer arrow functions for components and utilities

## Component Patterns

### Page Components (RSC - Server Components)

```typescript
// app/example/page.tsx
import { Metadata } from 'next'
import { getDataFromConstant } from '@/lib/constants/data'

export const metadata: Metadata = {
  title: 'Page Title - Orchestra più Folle',
  description: 'Page description for SEO',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    // ... more OG tags
  },
}

export default function ExamplePage() {
  // Fetch data directly (RSC)
  const data = getDataFromConstant()

  return (
    <div className="container mx-auto px-4">
      {/* Content */}
    </div>
  )
}
```

### Client Components (Interactive)

```typescript
// components/example.tsx
'use client'

import { useState } from 'react'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

export function ExampleComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div>
      {/* Interactive content */}
    </div>
  )
}
```

### shadcn/ui Component Pattern

All UI components follow this pattern:

```typescript
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const componentVariants = cva(
  'base-classes', // Always applied
  {
    variants: {
      variant: {
        default: 'variant-classes',
        secondary: 'other-variant-classes',
      },
      size: {
        default: 'size-classes',
        sm: 'small-size-classes',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

export function Component({ className, variant, size, ...props }: ComponentProps) {
  return (
    <element
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

### Layout Components

**Header**: Fixed position, scroll detection, mobile menu with focus trap
**Footer**: Sticky footer with social links
**PageContainer**: Background image overlay pattern

## Data Fetching Patterns

### Current Architecture: Static Data (Constants)

**Status**: All data currently comes from static constants in `lib/constants/`

**Pattern**:
```typescript
// lib/constants/concerts.ts
export const CONCERTS: Concert[] = [
  {
    id: '1st-special-concert',
    title: '第1回 特別演奏会',
    date: new Date('2025-04-20T14:00:00+09:00'),
    // ... more fields
  },
]

export function getAllConcerts(): Concert[] {
  return CONCERTS
}

export function getConcert(id: string): Concert | undefined {
  return CONCERTS.find(concert => concert.id === id)
}
```

**Usage in Components**:
```typescript
// Direct usage in Server Components
import { getAllConcerts } from '@/lib/constants/concerts'

export default function ConcertsPage() {
  const concerts = getAllConcerts()
  return <div>{/* Render concerts */}</div>
}

// Or use custom hooks in Client Components
'use client'
import { useUpcomingConcert } from '@/lib/hooks/useConcerts'

export function NextConcertWidget() {
  const { concert, loading, error } = useUpcomingConcert()
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  return <div>{concert?.title}</div>
}
```

### Custom Hooks Pattern

```typescript
// lib/hooks/useConcerts.ts
import useSWR from 'swr'
import { getUpcomingConcert } from '@/lib/constants/concerts'

export function useUpcomingConcert() {
  const { data, error, isLoading } = useSWR(
    '/api/upcoming-concert',
    getUpcomingConcert
  )

  return {
    concert: data,
    loading: isLoading,
    error: error,
  }
}
```

### Future Migration: microCMS

**Prepared but not active**. When migrating to microCMS:

1. Update `lib/api/concerts.ts` and `lib/api/news.ts` with microCMS calls
2. Keep helper functions signatures the same
3. Update hooks to call API functions instead of constants
4. Add proper error handling and loading states

**Environment Variables Required**:
```env
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

### Supabase Integration (Contact Forms)

```typescript
// lib/api/contact.ts
import { supabase } from '@/lib/supabase/client'

export async function submitContactForm(data: ContactFormData) {
  // 1. Insert to Supabase
  const { error } = await supabase
    .from('contact_forms')
    .insert([{
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'new',
    }])

  if (error) throw error

  // 2. Notify Slack
  await fetch('/api/notify-slack', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
```

## Styling Guidelines

### Tailwind CSS Conventions

**Custom Theme Colors** (`tailwind.config.ts`):
```typescript
colors: {
  base: '#7DEADF',      // Light turquoise
  main: '#40E0D0',      // Main turquoise
  accent: '#07D5C0',    // Accent teal
}
```

**Color Usage**:
- Primary actions: `bg-main`, `text-main`, `border-main`
- Hover states: `hover:bg-accent`
- Glass morphism: `bg-white/10 backdrop-blur-md`
- Overlays: `bg-black/60`

### Component Styling Patterns

**Glass Morphism Card**:
```tsx
<div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6">
  {/* Content */}
</div>
```

**Button Primary**:
```tsx
<button className="bg-main hover:bg-accent text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105">
  {/* Text */}
</button>
```

**Page Title**:
```tsx
<h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
  {/* Title */}
</h1>
```

### CSS Custom Properties

Defined in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --radius: 0.5rem;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
```

**Usage**: `bg-background`, `text-foreground`, `rounded-[var(--radius)]`

### Animation Classes

**Available Animations**:
- `animate-spin` - Logo rotation (-1080deg)
- `animate-slowRotate` - Continuous rotation (360deg, 20s)
- `animate-fadeIn` / `animate-fadeOut` - Opacity transitions
- `animate-logoFadeIn` - Scale + opacity (for logo)
- `animate-slideIn` - Slide from left
- `animate-brightness` - Pulsing brightness effect

**Usage**:
```tsx
<div className="animate-fadeIn">Fading in content</div>
```

### Responsive Design

**Breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-First Approach**:
```tsx
<div className="text-base md:text-lg lg:text-xl">
  {/* Scales up on larger screens */}
</div>
```

**useMediaQuery Hook**:
```tsx
const isMobile = useMediaQuery('(max-width: 768px)')
```

### Accessibility Requirements

1. **Semantic HTML**: Use proper heading hierarchy (h1 → h2 → h3)
2. **ARIA Labels**: Add `aria-label` for icon-only buttons
3. **Focus States**: Always style `focus-visible:` states
4. **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
5. **Alt Text**: Always provide meaningful alt text for images
6. **Color Contrast**: Maintain WCAG AA contrast ratios (4.5:1 for text)

**Example**:
```tsx
<button
  aria-label="メニューを開く"
  className="focus-visible:ring-2 focus-visible:ring-accent"
>
  <MenuIcon />
</button>
```

## Testing Guidelines

### Test File Location

- Page tests: `__tests__/app/[route]/page.test.tsx`
- Component tests: `__tests__/components/ComponentName.test.tsx`
- Utility tests: `__tests__/lib/utils.test.ts`

### Testing Pattern

```typescript
import { render, screen } from '@testing-library/react'
import { TestProvider } from '@/test/providers/test-provider'
import ComponentToTest from './component'

// Mock external dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(() => '/'),
}))

describe('ComponentToTest', () => {
  it('renders successfully', () => {
    render(
      <TestProvider>
        <ComponentToTest />
      </TestProvider>
    )

    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interaction', async () => {
    const { user } = userEvent.setup()
    render(<ComponentToTest />)

    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(/* assertion */).toBe(/* expected */)
  })
})
```

### Common Mocks (in `jest.setup.js`)

- `window.matchMedia` - For responsive tests
- `window.performance.getEntriesByType` - For navigation timing
- Next.js router hooks - Mock in individual tests

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- Header.test.tsx

# Run with coverage
npm run test:ci

# Watch mode for development
npm run test:watch
```

### Testing Checklist

- [ ] Component renders without errors
- [ ] User interactions work as expected
- [ ] Error states display correctly
- [ ] Loading states display correctly
- [ ] Accessibility features work (ARIA, keyboard nav)
- [ ] Responsive behavior works (use `useMediaQuery` mock)
- [ ] Edge cases are handled

## Common Tasks

### Adding a New Page

1. Create page file: `app/new-route/page.tsx`
2. Add metadata for SEO
3. Create page component (RSC by default)
4. Add to navigation in `components/header.tsx`
5. Add test file: `__tests__/app/new-route/page.test.tsx`

```typescript
// app/new-route/page.tsx
import { Metadata } from 'next'
import { PageContainer } from '@/components/ui/page-container'

export const metadata: Metadata = {
  title: 'New Page - Orchestra più Folle',
  description: 'Description',
}

export default function NewPage() {
  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-16">
        <h1 className="page-title">Page Title</h1>
        {/* Content */}
      </div>
    </PageContainer>
  )
}
```

### Adding a New UI Component (shadcn/ui)

```bash
# Use shadcn CLI to add components
npx shadcn@latest add [component-name]

# Example: Add dialog component
npx shadcn@latest add dialog
```

Components are added to `components/ui/` with proper TypeScript types and variants.

### Adding Concert Data

Edit `lib/constants/concerts.ts`:

```typescript
export const CONCERTS: Concert[] = [
  {
    id: 'unique-id-kebab-case', // Used in URL
    title: '演奏会タイトル',
    date: new Date('2025-MM-DDTHH:mm:ss+09:00'), // JST timezone
    openTime: 'HH:mm',
    startTime: 'HH:mm',
    venue: {
      name: '会場名',
      address: '住所',
      access: '最寄り駅からのアクセス',
      mapUrl: 'Google Maps URL',
    },
    program: [
      '曲目1',
      '曲目2',
    ],
    posterImage: '/poster-filename.png', // In /public/
    ticketPrice: ['一般 2,000円', '学生 1,000円'],
    ticketUrl: 'https://teket.jp/...',
    description: '演奏会の説明文',
    youtubeVideos: [
      {
        id: 'YouTube動画ID',
        title: '動画タイトル',
        publishDate: new Date('2025-MM-DD'), // Optional: show after date
      },
    ],
  },
  // ... existing concerts
]
```

**Important**:
- Keep concerts in chronological order (newest first)
- Use proper JST timezone (+09:00)
- Ensure poster image exists in `/public/`

### Adding News Items

Edit `lib/constants/news.ts`:

```typescript
export const newsItems: NewsItem[] = [
  {
    id: 'unique-id-kebab-case',
    date: new Date('2025-MM-DD'),
    title: 'ニュースタイトル',
    content: '概要テキスト（一覧ページに表示）',
    hasDetailPage: true, // Set to true if detail page needed
    links: [
      {
        text: 'リンクテキスト',
        url: 'https://example.com',
      },
    ],
  },
  // ... existing news items
]
```

If `hasDetailPage: true`, create detail page at `app/news/[id]/page.tsx`.

### Modifying Styles

**Theme Colors**: Edit `tailwind.config.ts`
```typescript
theme: {
  extend: {
    colors: {
      base: '#7DEADF',
      main: '#40E0D0',
      accent: '#07D5C0',
    }
  }
}
```

**Global Styles**: Edit `app/globals.css`
**Component Styles**: Use Tailwind classes inline

### Updating Environment Variables

Create `.env.local` file (not committed to git):

```env
# Supabase (Contact Forms)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Slack Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# microCMS (Future use)
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Environment Variables

### Required for Production

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJ...` |
| `SLACK_WEBHOOK_URL` | Slack incoming webhook | `https://hooks.slack.com/...` |

### Optional (Future Use)

| Variable | Purpose | Example |
|----------|---------|---------|
| `MICROCMS_SERVICE_DOMAIN` | microCMS service domain | `your-service` |
| `MICROCMS_API_KEY` | microCMS API key | `xxx-xxx-xxx` |

### Vercel Deployment

Set environment variables in Vercel dashboard:
1. Project Settings → Environment Variables
2. Add each variable for Production, Preview, Development
3. Redeploy to apply changes

## Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. **Automatic Deployments**: Push to `main` branch
2. **Preview Deployments**: All PRs get preview URLs
3. **Environment Variables**: Set in Vercel dashboard
4. **Analytics**: Automatically enabled with `@vercel/analytics`
5. **Speed Insights**: Automatically enabled with `@vercel/speed-insights`

### Build Optimizations

**Next.js Configuration** (`next.config.ts`):
- Console.log removal in production
- Image optimization for microCMS assets
- Modern JavaScript targeting (no unnecessary transpilation)
- Optimized package imports for analytics

**Browser Support**:
- Chrome 64+, Edge 79+, Firefox 67+, Opera 51+, Safari 12+
- Modern ES6+ features enabled
- No IE11 support

### Performance Checklist

- [x] Server Components for static content
- [x] Image optimization with `next/image`
- [x] Lazy loading for images and components
- [x] Font optimization (next/font)
- [x] Analytics and speed insights
- [x] CSS optimization (Tailwind purge)
- [x] Modern JS targeting (no polyfills needed)

## Key Files Reference

### Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Next.js configuration, build optimizations |
| `tailwind.config.ts` | Theme colors, animations, design tokens |
| `tsconfig.json` | TypeScript compiler options, path aliases |
| `components.json` | shadcn/ui configuration |
| `jest.config.js` | Jest test runner configuration |
| `eslint.config.mjs` | Linting rules |
| `postcss.config.mjs` | CSS processing (Tailwind + Autoprefixer) |

### Core Application Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, metadata, analytics setup |
| `app/page.tsx` | Homepage (news feed + upcoming concert) |
| `app/globals.css` | Global styles, CSS variables, animations |
| `lib/types.ts` | Core TypeScript type definitions |
| `lib/utils.ts` | Utility functions (cn, isVideoPublished) |
| `lib/constants/concerts.ts` | Concert data and helper functions |
| `lib/constants/news.ts` | News data and helper functions |

### Component Files

| File | Purpose |
|------|---------|
| `components/header.tsx` | Site header with navigation |
| `components/footer.tsx` | Site footer with social links |
| `components/ui/button.tsx` | Button component with variants |
| `components/ui/card.tsx` | Card component for content |
| `components/ui/page-container.tsx` | Page wrapper with background |

## Accessibility Checklist

When creating or modifying components:

- [ ] Proper semantic HTML (header, nav, main, section, article, footer)
- [ ] Heading hierarchy (h1 → h2 → h3, no skipping levels)
- [ ] Alt text for all images (meaningful, not decorative)
- [ ] ARIA labels for icon-only buttons
- [ ] Keyboard navigation support (tab order, enter/space activation)
- [ ] Focus visible styles (`:focus-visible` pseudo-class)
- [ ] Color contrast >= 4.5:1 for text (WCAG AA)
- [ ] Form labels properly associated with inputs
- [ ] Error messages announced to screen readers
- [ ] Skip to content link (already in layout)
- [ ] Lang attribute set (lang="ja" in root layout)

## Japanese Localization Guidelines

### Typography

- Primary font: Roboto with Japanese fallbacks
- Line height: Optimized for Japanese text (1.7-1.8)
- Font weight: 400 (normal), 700 (bold)
- Text rendering: `text-rendering: optimizeLegibility`

### Date Formatting

Always use `date-fns` with Japanese locale:

```typescript
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

const formattedDate = format(date, 'yyyy年M月d日(E)', { locale: ja })
// Output: "2025年4月20日(日)"
```

### Content Guidelines

- Use polite form (です・ます体) for all public-facing text
- Concert times in 24-hour format: "14:00開演"
- Prices in yen: "一般 2,000円"
- Addresses in Japanese standard format (prefecture → city → street)

## Performance Best Practices

### Server Components First

Default to Server Components unless interactivity is needed:

```typescript
// ✅ Good: Server Component (default)
export default function ConcertList() {
  const concerts = getAllConcerts()
  return <div>{/* Render concerts */}</div>
}

// ❌ Avoid: Client Component when not needed
'use client'
export default function ConcertList() {
  const concerts = getAllConcerts()
  return <div>{/* Render concerts */}</div>
}
```

Use `'use client'` only when you need:
- State (`useState`, `useReducer`)
- Effects (`useEffect`, `useLayoutEffect`)
- Event listeners (`onClick`, `onChange`)
- Browser-only APIs (`window`, `document`)
- Custom hooks that use the above

### Image Optimization

Always use `next/image` with proper sizing:

```typescript
import Image from 'next/image'

<Image
  src="/poster.png"
  alt="演奏会ポスター"
  width={800}
  height={1131}
  priority // For above-the-fold images
  className="rounded-lg"
/>
```

### Data Fetching

- Fetch data in Server Components when possible
- Use SWR for client-side data that changes frequently
- Cache static data (concerts, news) at build time

### Bundle Size

- Import only what you need: `import { format } from 'date-fns'`
- Avoid importing entire libraries
- Use dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <div>Loading...</div>,
})
```

## Security Best Practices

### Environment Variables

- Never commit `.env.local` to git (already in `.gitignore`)
- Use `NEXT_PUBLIC_` prefix only for truly public variables
- Keep API keys and secrets server-side only

### Form Handling

- Validate all input on both client and server
- Sanitize user input before storing in database
- Use Zod for schema validation:

```typescript
import { z } from 'zod'

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message too short'),
})
```

### API Routes

- Validate request method (GET, POST, etc.)
- Check authentication/authorization
- Return appropriate HTTP status codes
- Handle errors gracefully

```typescript
// app/api/example/route.ts
export async function POST(request: Request) {
  try {
    // Validate request
    const body = await request.json()

    // Process request
    const result = await processData(body)

    return Response.json(result, { status: 200 })
  } catch (error) {
    console.error('API Error:', error)
    return Response.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
```

### Supabase Security

- Use Row Level Security (RLS) policies in Supabase
- Never expose service role key to client
- Use anon key for client-side operations only

## Troubleshooting

### Common Issues

**Issue**: Module not found error
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**Issue**: TypeScript errors after updating dependencies
```bash
# Solution: Regenerate TypeScript types
npm run build
# Or restart TypeScript server in IDE
```

**Issue**: Styles not applying
```bash
# Solution: Rebuild Tailwind CSS
# 1. Stop dev server
# 2. Delete .next folder
# 3. Restart dev server
npm run dev
```

**Issue**: Tests failing with module errors
```bash
# Solution: Clear Jest cache
npm test -- --clearCache
npm test
```

### Debugging Tips

1. **Check console**: Always check browser console for errors
2. **Network tab**: Check API calls and responses
3. **React DevTools**: Inspect component props and state
4. **Next.js DevTools**: Use built-in performance profiler
5. **Lighthouse**: Run audit for performance/accessibility issues

### Getting Help

1. Check Next.js docs: https://nextjs.org/docs
2. Check shadcn/ui docs: https://ui.shadcn.com
3. Check Tailwind docs: https://tailwindcss.com/docs
4. Search GitHub issues for similar problems
5. Check commit history for recent changes

## Migration Notes

### From Constants to microCMS (Planned)

When ready to migrate from static constants to microCMS:

1. **Verify microCMS Setup**:
   - Create content models in microCMS dashboard
   - Match field names to current TypeScript types
   - Add API key to environment variables

2. **Update API Layer**:
   - Implement functions in `lib/api/concerts.ts`
   - Implement functions in `lib/api/news.ts`
   - Keep same function signatures as constants

3. **Update Hooks**:
   - Modify `useConcerts.ts` to call API functions
   - Add proper error handling
   - Test loading and error states

4. **Test Thoroughly**:
   - Test all pages that display concerts/news
   - Verify data structure matches
   - Check error handling
   - Test caching behavior (SWR)

5. **Deploy**:
   - Set environment variables in Vercel
   - Deploy to preview environment first
   - Verify data displays correctly
   - Deploy to production

### Breaking Changes to Watch For

- Next.js major version updates (currently 15.x)
- React major version updates (currently 19.x)
- Tailwind CSS major version updates (currently 3.x)
- shadcn/ui component updates (check migration guides)

## Additional Resources

### Official Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [microCMS Docs](https://document.microcms.io)

### Tools
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://app.supabase.com)
- [microCMS Dashboard](https://app.microcms.io)

### Design Resources
- Color scheme: Turquoise/Teal (#40E0D0, #07D5C0)
- Font: Roboto (Google Fonts)
- Icons: lucide-react
- Images: Store in `/public/` directory

---

## Summary for AI Assistants

When working on this codebase:

1. **Always use TypeScript** with strict typing
2. **Prefer Server Components** unless interactivity is needed
3. **Use Tailwind** for styling (no CSS modules or styled-components)
4. **Follow Japanese localization** guidelines (date formatting, typography)
5. **Test your changes** before committing
6. **Write accessible code** (semantic HTML, ARIA labels, keyboard nav)
7. **Use existing patterns** from `components/ui/` for consistency
8. **Check mobile responsiveness** (mobile-first approach)
9. **Optimize images** with next/image
10. **Document complex logic** with comments in Japanese when appropriate

This is a production website for a real orchestra. Maintain high code quality, accessibility, and performance standards.

---

**Last Updated**: 2025-11-14
**Next.js Version**: 15.2.4
**React Version**: 19.0.0
**Node Version**: >= 18.17.0
