# MACH-X — Award-Level Scroll-Driven Web Experience ⚡

[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?logo=greensock&logoColor=black)](https://greensock.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-FF5500)](https://lenis.darkroom.engineering/)

Award-level scroll-driven website for the elite sneaker brand **MACH-X**, featuring high-performance image-sequence scroll scrubbing, 60fps canvas rendering, Lenis smooth scrolling synced with GSAP ScrollTrigger, and Framer Motion kinetic typography.

---

## ✨ Highlights & Features

- **Kinetic Image-Sequence Scrubbing:** 240 high-density WebP frames rendered onto a responsive full-screen `<canvas>` with cover-fit math and DPR capped at 2.
- **Synchronized Smooth Scroll:** Lenis smooth scrolling piped directly into the GSAP ScrollTrigger ticker with `lagSmoothing(0)`.
- **Intelligent Preloader:** Real-time buffer tracker preloading all 240 frames before entry, with automatic fallback to high-resolution poster.
- **Adaptive Viewports:** Auto-switches between desktop (`1920px`) and mobile (`960px`) frame sequences below 768px.
- **Cinematic Atmosphere:** Procedural SVG film grain overlay, soft vignette, dynamic ambient lighting that shifts per scene beat, and subtle parallax scaling.
- **Interactive Colorways Switcher:** Real-time CSS filter transformations across 4 race editions (*Inferno Orange, Stealth Onyx, Cyber Volt, Hyper Ice*).
- **Animated Lab Telemetry:** Intersection-observed animated counter HUD for weight (198g), heel drop (8mm), stack height (38mm), and energy rebound (89%).
- **Interactive E-Commerce UI:** Size selector (US 7.0–13.0), width selector, stock indicator, animated "Add to Cart" feedback, and persistent shopping bag badge.
- **Accessibility & Performance:** Full `prefers-reduced-motion` compliance, 60fps target with throttled `requestAnimationFrame` drawing, and Open Graph / Twitter Card SEO tags.

---

## 🏎 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 (TypeScript) |
| **Bundler & Dev Server** | Vite 6 |
| **Styling & Theme** | Tailwind CSS + Custom Neon Orange (`#FF5500`) & Onyx Dark Palette |
| **Animation & Scrubbing** | GSAP 3 + ScrollTrigger (scrub: 0.5 over 700vh) |
| **Smooth Scrolling** | Lenis (`@studio-freight/lenis` v1.3) |
| **Micro-Interactions** | Framer Motion |
| **Icons** | Lucide React |
| **Asset Pipeline** | FFmpeg 9.0 (WebP frame extraction at quality 80) |

---

## 🎯 Scroll Story & Video Scene Mapping

The 700vh scroll sequence maps directly to the 240 video frames extracted from Google Flow:

| Scroll Phase | Range | Placement | Headline & Story Beat |
| :---: | :---: | :---: | :--- |
| **01** | `0% – 15%` | **Left** | **"BUILT FROM NOTHING."**<br>*Every great stride starts as raw material. Molecular compounds suspended in zero-drag stasis.* |
| **02** | `15% – 35%` | **Right** | **"WOVEN FOR FREEDOM."**<br>*Tensile micro-strands interlock under adaptive tension to mold seamlessly against your foot.* |
| **03** | `35% – 55%` | **Left** | **"ENGINEERED UNDERFOOT."**<br>*Full-length spoon-curved carbon fiber propulsion plate within NitroFoam™ supercritical matrix.* |
| **04** | `55% – 75%` | **Right** | **"FUSED BY FIRE."**<br>*High-temperature thermal sonic fusion binds upper to chassis without a single heavy seam.* |
| **05** | `75% – 100%` | **Left** | **"MACH-X. BREAK THE SPEED LIMIT."**<br>*198 grams of aerodynamic propulsion. Engineered for podium finishes.* + **"SHOP MACH-X" CTA** |

---

## 📁 Project Architecture

```
mach-x/
├── assets/                       # Google Flow video clips & high-res source stills
│   ├── hero.mp4                  # 20s concatenated master video (480 frames @ 24fps)
│   ├── Sneaker_assembling_on_pedestal_20261027110355.mp4
│   ├── Sneaker_pieces_form_finished_shoe_20261027110355.mp4
│   └── *.jpg                     # Raw materials, knit, sole, and hero stills
├── public/
│   ├── frames/
│   │   ├── desktop/              # 240 WebP frames (1920px wide @ q=80)
│   │   └── mobile/               # 240 WebP frames (960px wide @ q=80)
│   └── poster.jpg                # High-res fallback hero still
├── scripts/
│   ├── extract-frames.mjs        # FFmpeg frame extraction pipeline (npm run frames)
│   ├── remove-watermark.py       # Automated AI watermark inpainting cleaner
│   └── test-scroll.mjs           # Automated headless browser verification suite
├── src/
│   ├── components/
│   │   ├── CustomCursor.tsx      # Trailing electric orange cursor with magnetic hover expansion
│   │   ├── FilmGrain.tsx         # Film grain SVG + cinematic vignette + per-scene gradients
│   │   ├── LoadingScreen.tsx     # MACH-X logo, neon glow progress bar, and percentage
│   │   ├── Navbar.tsx            # Glassmorphism navbar with active state & shopping bag
│   │   ├── ScrollIndicator.tsx   # Animated 'Scroll to Assemble' indicator
│   │   ├── SideProgressBar.tsx   # Vertical track with 5 scene dots & interactive tooltips
│   │   └── WordmarkLogo.tsx      # MACH-X SVG with speed lines & electric orange X
│   ├── hooks/
│   │   ├── useFramePreloader.ts  # Preloads 240 WebP frames with mobile breakpoint check
│   │   └── useSmoothScroll.ts    # Lenis smooth scroll synced with GSAP ScrollTrigger
│   ├── sections/
│   │   ├── CanvasScroller.tsx    # 700vh sticky canvas scroller with cover-fit & dpr cap
│   │   ├── TechFeatures.tsx      # Cushioning, Grip, Breathability hover glow cards
│   │   ├── Colorways.tsx         # 4 interactive swatches with CSS tint filters
│   │   ├── SpecsSection.tsx      # Animated counters (198g, 8mm drop, 38mm stack)
│   │   ├── ProductPurchase.tsx   # Size selector US 7-13, width, Add to Cart UI
│   │   ├── TestimonialsCarousel.tsx # Elite athletes & researchers reviews
│   │   ├── FinalCTA.tsx          # High-voltage finish & order button
│   │   └── Footer.tsx            # Wordmark, Pacers Lab newsletter, and social links
│   ├── utils/
│   │   └── constants.ts          # Story beats, specs, colorways, and feature data
│   ├── App.tsx                   # Main layout and composition
│   ├── index.css                 # Tailwind directives, custom scrollbar, glass panels
│   └── main.tsx
└── package.json
```

---

## 🎬 Replacing Video & Re-Extracting Frames

To update or replace the hero sequence:

1. Place your new video file(s) into the `/assets` directory.
   - If you have multiple clips, concatenate them or replace `/assets/hero.mp4` directly.
2. Run the automated extraction pipeline:
   ```bash
   npm run frames
   ```
3. The script will automatically:
   - Detect system FFmpeg or local binaries
   - Extract **240 WebP frames at 1920px (quality 80)** into `/public/frames/desktop/`
   - Extract **240 WebP frames at 960px (quality 80)** into `/public/frames/mobile/`
   - Execute the watermark cleaning script on all generated frames
   - Generate `/public/poster.jpg` if needed
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v24)
- FFmpeg (required only if re-extracting frames via `npm run frames`)

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/SSManikandaprabu/mach-x.git
cd mach-x

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 📜 License
MIT License. Created for the **MACH-X** Propulsion Lab.
