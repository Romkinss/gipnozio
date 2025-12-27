# Phase 2: Core Layout & Navigation - Detailed Plan

**Status:** Ready to Start  
**Date:** 2024-12-27  

---

## 📋 Components to Migrate

### 1. Navbar Component
**Current:** React component with React Router  
**Target:** Astro component with React island for interactive parts

**Features:**
- Logo and branding
- Navigation links (with scroll-to-section and route navigation)
- Pulse text animation (rotating status messages)
- Mobile menu toggle
- Login button
- Responsive design

**Migration Strategy:**
- Create `Navbar.astro` as main component
- Use React island for interactive parts (menu toggle, navigation)
- Keep styling with Tailwind CSS
- Replace React Router with Astro routing

**Key Changes:**
- Remove `useNavigate`, `useLocation` hooks
- Replace `Link` with Astro `<a>` tags
- Use Astro's routing system
- Keep animation logic in React island

---

### 2. Footer Component
**Current:** React component  
**Target:** Astro component

**Features:**
- Footer content
- Links
- Contact information
- Social links

**Migration Strategy:**
- Create `Footer.astro`
- Pure Astro component (no interactivity needed)
- Keep styling with Tailwind CSS

---

### 3. Layout Components
**Current:** React wrapper components  
**Target:** Astro layouts

**Components:**
- `Layout.tsx` → `MainLayout.astro`
- `PublicLayout.tsx` → `PublicLayout.astro`

**Features:**
- Navbar integration
- Footer integration
- Main content area
- Sidebar (if needed)

**Migration Strategy:**
- Create Astro layouts
- Use `<slot />` for content
- Include Navbar and Footer
- Maintain styling

---

## 🔄 Migration Steps

### Step 1: Analyze Current Components
- [x] Navbar.tsx analyzed
- [ ] Footer.tsx analysis
- [ ] Layout.tsx analysis
- [ ] PublicLayout.tsx analysis

### Step 2: Create Astro Components
- [ ] Create Navbar.astro
- [ ] Create NavbarMenu.tsx (React island)
- [ ] Create Footer.astro
- [ ] Create MainLayout.astro
- [ ] Create PublicLayout.astro

### Step 3: Update Routing
- [ ] Create routing structure
- [ ] Update page imports
- [ ] Test navigation

### Step 4: Testing
- [ ] Test Navbar functionality
- [ ] Test mobile menu
- [ ] Test navigation links
- [ ] Test responsive design
- [ ] Test styling

### Step 5: Integration
- [ ] Update all pages to use new layouts
- [ ] Verify all pages render correctly
- [ ] Test cross-page navigation

---

## 🎯 Detailed Tasks

### Task 1: Create Navbar.astro
```astro
---
// src/components/Navbar.astro
import NavbarMenu from './NavbarMenu';
---

<header>
  <!-- Logo and branding -->
</header>

<nav>
  <!-- Navigation with React island for interactivity -->
  <NavbarMenu client:load />
</nav>
```

### Task 2: Create NavbarMenu.tsx (React Island)
```tsx
// src/components/NavbarMenu.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, Circle } from 'lucide-react';

export default function NavbarMenu() {
  // Interactive menu logic
}
```

### Task 3: Create Footer.astro
```astro
---
// src/components/Footer.astro
---

<footer>
  <!-- Footer content -->
</footer>
```

### Task 4: Create MainLayout.astro
```astro
---
// src/layouts/MainLayout.astro
import BaseLayout from './BaseLayout.astro';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title?: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <Navbar />
  <main>
    <slot />
  </main>
  <Footer />
</BaseLayout>
```

### Task 5: Create PublicLayout.astro
```astro
---
// src/layouts/PublicLayout.astro
import MainLayout from './MainLayout.astro';

interface Props {
  title?: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<MainLayout title={title} description={description}>
  <slot />
</MainLayout>
```

---

## 📊 Component Dependencies

```
BaseLayout.astro
├── Navbar.astro
│   └── NavbarMenu.tsx (React island)
├── Footer.astro
└── <slot />

MainLayout.astro
└── BaseLayout.astro

PublicLayout.astro
└── MainLayout.astro
```

---

## 🔗 Navigation Structure

### Routes to Support
- `/` - Home
- `/blog` - Blog listing
- `/blog/[slug]` - Blog post
- `/lessons` - Lessons listing
- `/lessons/[slug]` - Lesson view
- `/clients` - Clients page
- `/testimonials` - Testimonials
- `/pulse` - Pulse page
- `/login` - Login
- `/admin` - Admin panel
- `/author` - Author page
- `/offer` - Offer page

---

## 🎨 Styling Considerations

### Tailwind Classes Used
- `bg-dark-accent` - Dark background
- `text-gold` - Gold text
- `border-gold` - Gold borders
- `bg-light-secondary` - Light background
- `container mx-auto px-4` - Container
- `md:` - Responsive breakpoints

### Custom Colors (from tailwind.config.ts)
- `dark-accent` - Main dark color
- `light-secondary` - Light color
- `gold` - Accent gold color

---

## ✅ Acceptance Criteria

- [ ] All navigation links work correctly
- [ ] Mobile menu toggles properly
- [ ] Responsive design works on all breakpoints
- [ ] Styling matches original design
- [ ] No console errors
- [ ] All pages render with new layouts
- [ ] Navigation between pages works smoothly
- [ ] Pulse text animation works
- [ ] Logo links to home
- [ ] Login button navigates to login page

---

## 📝 Notes

- Keep all original functionality
- Maintain responsive design
- Preserve styling and animations
- Use React islands only for interactive parts
- Test thoroughly before moving to next phase
