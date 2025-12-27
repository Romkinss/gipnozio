# GIPNOZIO: React → Astro Migration Plan

**Project:** ГИПНОЗИО (Eurasian Academy of Hypnosis)  
**Status:** Starting Migration  
**Date:** 2024-12-27  
**Framework:** React (Vite) → Astro  

---

## 📊 Project Analysis

### Current Stack (React)
- **Framework:** React 19 + Vite
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS 3.4
- **Backend:** Supabase
- **Components:** 35+ React components
- **Pages:** 15+ page components
- **Services:** 8 service modules

### Target Stack (Astro)
- **Framework:** Astro (latest)
- **Routing:** Astro file-based routing
- **Styling:** Tailwind CSS (integrated)
- **Backend:** Supabase (same)
- **Components:** Astro components + React islands
- **Pages:** Astro pages
- **Services:** Shared TypeScript modules

---

## 🎯 Migration Phases

### Phase 1: Setup & Infrastructure
- [ ] Initialize Astro project
- [ ] Configure Tailwind CSS
- [ ] Setup TypeScript
- [ ] Configure environment variables
- [ ] Setup Supabase integration
- [ ] Create project structure

### Phase 2: Core Layout & Navigation
- [ ] Migrate Layout components
- [ ] Migrate Navbar component
- [ ] Migrate Footer component
- [ ] Setup routing structure
- [ ] Create base layouts

### Phase 3: Static Pages
- [ ] Migrate Landing page
- [ ] Migrate About/Author page
- [ ] Migrate Testimonials page
- [ ] Migrate Contact page
- [ ] Migrate NotFound page

### Phase 4: Dynamic Content Pages
- [ ] Migrate Blog system (dynamic routes)
- [ ] Migrate Lessons system (dynamic routes)
- [ ] Migrate BlogPost page
- [ ] Migrate LessonView page

### Phase 5: Interactive Components
- [ ] Migrate Quiz system
- [ ] Migrate Survey system
- [ ] Migrate Forms
- [ ] Migrate interactive widgets

### Phase 6: Admin Panel
- [ ] Migrate Admin layout
- [ ] Migrate Admin authentication
- [ ] Migrate Admin editors
- [ ] Migrate Admin tabs

### Phase 7: Services & Utilities
- [ ] Migrate Supabase service
- [ ] Migrate API service
- [ ] Migrate content services
- [ ] Migrate utilities

### Phase 8: Testing & Optimization
- [ ] Test all pages
- [ ] Test dynamic routes
- [ ] Test Supabase integration
- [ ] Performance optimization
- [ ] SEO verification

### Phase 9: Deployment
- [ ] Build optimization
- [ ] Deploy to production
- [ ] Verify functionality
- [ ] Monitor performance

---

## 📁 Component Inventory

### Layout Components (5)
- Layout.tsx
- PublicLayout.tsx
- Navbar.tsx
- Footer.tsx
- SEO.tsx

### Page Components (15)
- Landing.tsx
- Blog.tsx
- BlogPost.tsx
- LessonView.tsx
- LearningDashboard.tsx
- Admin.tsx
- AdminLoginPage.tsx
- AuthorPage.tsx
- ClientPage.tsx
- LoginPage.tsx
- OfferPage.tsx
- Pulse.tsx
- TestimonialsPage.tsx
- NotFound.tsx

### Feature Components (20+)
- Hero.tsx
- Features.tsx
- Pricing.tsx
- Testimonials.tsx
- Program.tsx
- Mentors.tsx
- Contact.tsx
- Blog.tsx
- Accordion.tsx
- Breadcrumbs.tsx
- TableOfContents.tsx
- ShareButtons.tsx
- And more...

### Admin Components (12)
- ArticleEditor.tsx
- LessonEditor.tsx
- QuizEditor.tsx
- SurveyEditor.tsx
- TestimonialEditor.tsx
- Various tabs...

---

## 🔄 Migration Strategy

### Approach: Hybrid (Astro + React Islands)
1. **Static content** → Pure Astro components
2. **Interactive features** → React islands (client-side)
3. **Services** → Shared TypeScript modules
4. **Styling** → Tailwind CSS (same)

### Key Decisions
- Keep Supabase integration unchanged
- Use React islands for interactive components
- Leverage Astro's static generation for performance
- Maintain SEO capabilities
- Preserve all functionality

---

## 📋 Current Status

**Completed:**
- ✅ Environment setup
- ✅ Git initialization
- ✅ Dependencies installed
- ✅ Project analysis

**Next Steps:**
- Initialize Astro project
- Configure build system
- Begin Phase 1 setup

---

## 🚀 Quick Start Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Deploy
npm run deploy
```

---

## 📝 Notes

- All original functionality must be preserved
- Performance should improve with Astro
- SEO capabilities must be maintained or enhanced
- Supabase integration remains the same
- Database schema unchanged
