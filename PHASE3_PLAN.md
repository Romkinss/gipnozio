# Phase 3: Static Pages Migration - Detailed Plan

**Status:** Ready to Start  
**Date:** 2024-12-27  
**Estimated Duration:** 1.5-2 hours  

---

## 📋 Pages to Migrate

### 1. Landing Page
**Current:** `pages/Landing.tsx`  
**Target:** `src/pages/index.astro` (update existing)  
**Complexity:** High (many sections)

**Sections to Include:**
- Hero section
- Features section
- Pricing section
- Program section
- Testimonials section
- Call-to-action sections
- And more...

**Strategy:**
- Break into smaller Astro components
- Use React islands only for interactive parts
- Keep styling with Tailwind CSS

---

### 2. Blog Listing Page
**Current:** `pages/Blog.tsx`  
**Target:** `src/pages/blog/index.astro`  
**Complexity:** Medium

**Features:**
- Blog post listing
- Search/filter functionality
- Pagination
- Category filtering

**Strategy:**
- Create dynamic route for blog posts
- Use Astro's content collection (if available)
- React island for search/filter

---

### 3. Author Page
**Current:** `pages/AuthorPage.tsx`  
**Target:** `src/pages/author/[slug].astro`  
**Complexity:** Medium

**Features:**
- Author information
- Bio
- Social links
- Posts by author

**Strategy:**
- Dynamic route with slug parameter
- Static content with Astro
- React island for interactive elements

---

### 4. Testimonials Page
**Current:** `pages/TestimonialsPage.tsx`  
**Target:** `src/pages/testimonials/index.astro`  
**Complexity:** Medium

**Features:**
- Testimonials listing
- Filtering/sorting
- Pagination
- Individual testimonial cards

**Strategy:**
- Fetch testimonials from Supabase
- Display in grid layout
- React island for filtering

---

### 5. NotFound Page
**Current:** `pages/NotFound.tsx`  
**Target:** `src/pages/404.astro`  
**Complexity:** Low

**Features:**
- 404 error message
- Navigation links
- Helpful suggestions

**Strategy:**
- Simple Astro component
- No interactivity needed
- Use MainLayout

---

## 🔄 Migration Strategy

### Approach: Component Decomposition
1. **Analyze** each page component
2. **Identify** sections and sub-components
3. **Create** Astro components for static sections
4. **Create** React islands for interactive parts
5. **Compose** into page layout
6. **Test** thoroughly

### Key Principles
- Keep styling consistent
- Preserve all functionality
- Maintain responsive design
- Use Tailwind CSS
- Minimize React islands
- Optimize performance

---

## 📊 Component Breakdown

### Landing Page Sections
```
Landing.tsx
├── Hero
├── Features
├── Pricing
├── Program
├── Testimonials
├── ForWhom
├── Guarantee
├── Problem
├── Solution
├── Resonance
├── DigitalManifesto
├── Scarcity
├── CallToAction
└── Contact
```

### Blog Page
```
Blog.tsx
├── Header
├── Search/Filter (React island)
├── Blog Post List
├── Pagination (React island)
└── Sidebar
```

### Author Page
```
AuthorPage.tsx
├── Author Header
├── Bio
├── Social Links
├── Posts List
└── Contact
```

### Testimonials Page
```
TestimonialsPage.tsx
├── Header
├── Filter/Sort (React island)
├── Testimonials Grid
├── Pagination (React island)
└── CTA
```

---

## 🎯 Execution Plan

### Step 1: Analyze Components (15 min)
- [ ] Read Landing.tsx
- [ ] Read Blog.tsx
- [ ] Read AuthorPage.tsx
- [ ] Read TestimonialsPage.tsx
- [ ] Read NotFound.tsx
- [ ] Identify dependencies

### Step 2: Create Astro Components (30 min)
- [ ] Create Hero.astro
- [ ] Create Features.astro
- [ ] Create Pricing.astro
- [ ] Create Testimonials.astro
- [ ] Create other sections...

### Step 3: Create React Islands (15 min)
- [ ] Create SearchFilter.tsx (for blog)
- [ ] Create Pagination.tsx
- [ ] Create other interactive components

### Step 4: Create Pages (20 min)
- [ ] Update index.astro (Landing)
- [ ] Create blog/index.astro
- [ ] Create author/[slug].astro
- [ ] Create testimonials/index.astro
- [ ] Create 404.astro

### Step 5: Testing (20 min)
- [ ] Test all pages load
- [ ] Test responsive design
- [ ] Test styling
- [ ] Test navigation
- [ ] Check for errors

---

## 📁 Expected Structure After Phase 3

```
src/pages/
├── index.astro (Landing)
├── 404.astro
├── blog/
│   └── index.astro
├── author/
│   └── [slug].astro
└── testimonials/
    └── index.astro

src/components/
├── Navbar.astro
├── Footer.astro
├── Hero.astro
├── Features.astro
├── Pricing.astro
├── Testimonials.astro
├── SearchFilter.tsx (React island)
├── Pagination.tsx (React island)
└── ... (other components)
```

---

## 🔗 Routing Structure

```
/                    → Landing page
/blog                → Blog listing
/blog/[slug]         → Blog post (Phase 4)
/author/[slug]       → Author page
/testimonials        → Testimonials listing
/404                 → Not found page
```

---

## 🎨 Styling Considerations

### Colors to Use
- `bg-dark-accent` - Dark backgrounds
- `text-gold` - Gold text/accents
- `border-gold` - Gold borders
- `bg-light-secondary` - Light backgrounds
- `text-dark` - Dark text

### Responsive Classes
- `md:` - Medium screens
- `lg:` - Large screens
- `container mx-auto px-4` - Container

### Common Patterns
- `py-16 md:py-24` - Vertical padding
- `grid md:grid-cols-2 lg:grid-cols-3` - Responsive grid
- `hover:text-gold transition-colors` - Hover effects

---

## ✅ Acceptance Criteria

- [ ] All pages render without errors
- [ ] Styling matches original design
- [ ] Responsive design works
- [ ] Navigation works between pages
- [ ] No console errors
- [ ] Performance is good
- [ ] All links work correctly
- [ ] Images load properly
- [ ] Forms work (if any)
- [ ] SEO metadata is correct

---

## 📝 Notes

- Keep all original functionality
- Maintain responsive design
- Use Tailwind CSS consistently
- Test on multiple screen sizes
- Verify all links work
- Check for broken images
- Ensure proper SEO

---

## 🚀 Ready to Start?

Phase 3 will significantly increase the functionality of the site by migrating all static pages. This will bring us to 50% completion of the migration.

**Next Action:** Begin analyzing and migrating static pages.
