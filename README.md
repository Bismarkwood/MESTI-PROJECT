# BigData Ghana — Corporate Website

The official website for **BigData Ghana Limited**, a Ghanaian technology and intelligence company specializing in geospatial intelligence, cloud technologies, data analytics, and AI.

**Live URL:** [bigdataghana.com](https://bigdataghana.com)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Routing | React Router v6 |
| Styling | Plain CSS (BEM methodology) |
| Animations | CSS animations + IntersectionObserver |
| SEO | react-helmet-async |
| Analytics | Google Analytics 4 (GA4) |
| Hosting | Vercel |
| Font | Manrope (Google Fonts) |

---

## Project Structure

```
src/
├── assets/              # Images, videos, logos
├── components/          # Reusable components
│   ├── ChatWidget/      # Floating chat widget with BDG branding
│   ├── ClientLogos/     # Marquee client logo section
│   ├── CloudHero/       # Cloud platforms hero
│   ├── CloudServices/   # Cloud services grid
│   ├── CloudStatsBar/   # AWS certification badges
│   ├── CtaBanner/       # "Why Big Data Ghana" parallax CTA
│   ├── CustomCursor/    # Custom green cursor (desktop only)
│   ├── DiscoverSection/ # "What we help you do" cards
│   ├── Footer/          # Site footer with navigation
│   ├── GeoHero/         # Geospatial hero section
│   ├── HeroCTA/         # Reusable CTA button
│   ├── HeroSection/     # Homepage hero carousel
│   ├── InsightsSection/ # Blog/insights card grid
│   ├── JoinCta/         # "Ready to decide better" CTA banner
│   ├── Navbar/          # Main navigation with dropdown
│   ├── ProofProjects/   # Project cards grid
│   ├── ScrollToTop.tsx  # Scroll to top on route change
│   ├── ScrollToTopButton/ # Floating scroll-to-top button
│   ├── SEO/             # Helmet-based meta/SEO component
│   ├── SolutionsSlider/ # Horizontal solutions slider
│   └── StatsBar/        # Partner logos marquee
├── hooks/
│   └── usePageTracking.ts  # GA4 page view tracking
├── pages/
│   ├── About/           # About Us page
│   ├── AIAutomation/    # AI & Automation service page
│   ├── Careers/         # Careers listing page
│   ├── CareerDetail/    # Individual job detail
│   ├── CloudPlatforms/  # AWS & Cloud service page
│   ├── Contact/         # Contact form + map + info cards
│   ├── DataAnalytics/   # Data Analytics service page
│   ├── FAQ/             # FAQ with search + categories
│   ├── Geospatial/      # Geospatial Intelligence service page
│   ├── Homepage/        # Main landing page
│   ├── InsightDetail/   # Blog article detail (sidebar layout)
│   ├── Insights/        # Blog listing with carousel hero
│   ├── Privacy/         # Privacy Policy page
│   ├── ProjectDetail/   # Solution/project detail template
│   ├── Proof/           # Projects page with marquee hero
│   ├── Services/        # All services overview
│   ├── Solutions/       # Products page (SendLine, BigConnect, Maize)
│   └── Team/            # Team page with member cards
├── App.tsx              # Main app with routes
├── App.css              # Global app styles
├── index.css            # CSS variables, resets, scrollbar
└── main.tsx             # Entry point with HelmetProvider
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Homepage | Hero carousel, capabilities, discover section, insights |
| `/services` | Services | All 4 service blocks with CTAs |
| `/geospatial` | Geospatial Intelligence | Land analytics, overview cards, related projects |
| `/cloud-platforms` | Cloud Platforms | AWS services, certifications |
| `/ai-automation` | AI & Automation | Impact section, services grid, overview cards |
| `/data-analytics` | Data Analytics | Timeline overview, services grid |
| `/solutions` | Our Solutions | Product cards (SendLine, BigConnect, Maize) |
| `/solutions/:slug` | Solution Detail | Product detail with sections |
| `/projects` | Our Projects | Project cards with marquee hero |
| `/projects/:slug` | Project Detail | Full project case study |
| `/about` | About Us | Story, mission, team faces, testimonials, timeline |
| `/team` | Team | Team member cards with LinkedIn links |
| `/careers` | Careers | Open roles listing |
| `/careers/:slug` | Career Detail | Job description and application |
| `/insights` | Blog | Carousel hero, filter tabs, article cards |
| `/insights/:slug` | Blog Detail | Article with sidebar |
| `/contact` | Contact | Form, Google Maps, info cards |
| `/privacy` | Privacy Policy | Full privacy policy with TOC |
| `/faq` | FAQ | Searchable accordion with categories |

---

## Key Features

### Design & UX
- Custom green cursor (desktop only, hidden on touch devices)
- Scroll-to-top floating button
- Scroll-triggered reveal animations (IntersectionObserver)
- Responsive design (desktop, 13-inch laptop, tablet, mobile)
- Hidden browser scrollbar for clean aesthetic
- Smooth page transitions via React Router

### SEO & Performance
- Per-page meta tags via react-helmet-async
- Open Graph and Twitter Card meta for social sharing
- Structured data (JSON-LD) for organization and articles
- Sitemap.xml and robots.txt
- Canonical URLs on every page
- Lazy-loaded pages for code splitting
- Preconnect to external resources

### Analytics & Tracking
- Google Analytics 4 integration
- Page view tracking on every route change
- Event tracking ready via `window.gtag()`

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion support via `prefers-reduced-motion`

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Configuration

### Google Analytics
Replace `G-XXXXXXXXXX` in `index.html` (appears twice) with your GA4 Measurement ID from [analytics.google.com](https://analytics.google.com).

### Site URL
Update the `siteUrl` in `src/components/SEO/SEO.tsx` if your domain changes.

### Contact Form
The contact form currently prevents default submission. To connect it to a backend or service (e.g., Formspree, EmailJS), update the `onSubmit` handler in `src/pages/Contact/Contact.tsx`.

### Google Maps
Update the iframe `src` URL in `src/pages/Contact/Contact.tsx` with your Google Maps embed URL for accurate location pinning.

---

## Deployment

The site is deployed on **Vercel** with automatic deployments from the `main` branch.

```bash
# Manual deploy
npx vercel --prod
```

---

## Team Members (as of July 2026)

| Name | Role |
|------|------|
| Mr. Henry Baffoe | Managing Director |
| Nana Yaa Fordwour | Head of Finance & Administrative Officer |
| Priscillia Fianu | Cloud Engineer |
| Akwasi Darkwa Anto | Data & AI Lead |
| Gertrude Chichi | Cloud Engineer Assistant |
| Logan Linford Kojo | Marketing Head |
| Dzehu Mighty | Associate Software Developer |
| Yaa Oparebea Acquah | Assistant Finance |
| Nana Akua Afra Owusu-Addo | Technical Writer & Geo Developer |
| Amram Afriyie | Earth Observation Desk Coordinator |
| Nii Amon Ashie | Marketor |
| Kwaku Quartey Ansah | Associate Software Developer |
| Bismark Gyebi Duah | Lead Product Designer |
| Nancy Wayua | Associate GIS Developer |
| Emmanuel Kyei Baffour | Cloud Engineer |

---

## Social Links

- LinkedIn: [BigData Ghana Limited](https://www.linkedin.com/company/bigdata-ghana-limited/)
- Instagram: [@bigdataghana](https://www.instagram.com/bigdataghana)

---

## License

© 2026 BigData Ghana Limited. All rights reserved.
