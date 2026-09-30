# Ryu Gym — Fitness & Training Website

> **College Web Development Project — 2nd Semester**
> Built entirely with **HTML5**, **CSS3**, and **Vanilla JavaScript** — no frameworks, no libraries, no Bootstrap.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [How to Open / Run the Website](#how-to-open--run-the-website)
3. [File & Folder Structure](#file--folder-structure)
4. [Page-by-Page Breakdown](#page-by-page-breakdown)
5. [JavaScript Features Explained (script.js)](#javascript-features-explained-scriptjs)
6. [CSS Architecture Explained (style.css)](#css-architecture-explained-stylecss)
7. [Technologies & Concepts Used](#technologies--concepts-used)
8. [Key Academic Concepts Demonstrated](#key-academic-concepts-demonstrated)
9. [Browser Compatibility](#browser-compatibility)
10. [Credits & Acknowledgements](#credits--acknowledgements)

---

## Project Overview

**Ryu Gym** is a fully functional, multi-page fitness and gym website designed as a college web development project. The website is themed around a fictional premium training facility called "Ryu Gym" and showcases a professional-grade, monochrome (black & white) editorial design aesthetic with accent colors (crimson red and gold) matching the official Ryu Gym brand logo.

### What Makes This Project Stand Out

- **8 complete HTML pages** with consistent navigation and branding across all of them
- **Official Ryu Gym logo** integrated in every page's navigation bar, footer, and digital keycard — with smooth hover micro-animations and favicon support
- **~3,645 lines of hand-written CSS** covering responsive layouts, dark/light theming, animations, print styles, and digital keycard design
- **~1,978 lines of Vanilla JavaScript** implementing 20+ interactive features without any external library
- **Dark/Light mode** toggle that saves the user's preference in `localStorage`
- **Full Membership & Checkout system** with payment forms (Card, QR/eSewa/Khalti, Cash), digital e-keycard generation, and barcode voucher
- **Interactive widgets**: BMI Calculator, Before/After image comparison slider, Tabata workout timer, contact form with full client-side validation
- **Fully responsive** design that adapts to mobile, tablet, and desktop screens
- **Video integration** in trainer cards with autoplay, loop, and muted playback
- **Custom 404 error page** with its own design
- **Print stylesheet** so pages with official documents can be printed cleanly

---

## How to Open / Run the Website

This is a **static website** — it does not need a server, Node.js, or any installation.

### Steps:
1. Download or clone the project folder
2. Double-click on **`index.html`** — it will open in your default web browser
3. Use the navigation bar at the top to visit other pages

### Alternative (Live Server in VS Code):
Install the "Live Server" extension in VS Code, then right-click `index.html` → **"Open with Live Server"** for auto-refresh during development.

---

## File & Folder Structure

```
Aman Rouniyar-Ryu Gym -2nd sem/
│
├── index.html          → Homepage (434 lines) — hero, stats, programs preview, trainers, transformation slider, trial CTA
├── about.html          → About page (243 lines) — gym story, facilities grid, operating hours table, membership pricing cards
├── programs.html       → Programs page (315 lines) — 6 filterable training programs, BMI calculator, Tabata timer
├── trainers.html       → Trainers page (241 lines) — 4 trainer cards with click-to-expand lightbox dossier modal
├── contact.html        → Contact page (257 lines) — validated form, facility info, embedded OpenStreetMap
├── membership.html     → Membership page (638 lines) — tier selection, payment forms (Card/QR/Cash), digital e-keycard
├── checkout.html       → Checkout page (473 lines) — full checkout flow, barcode voucher, pass lookup modal
├── 404.html            → Custom 404 error page (156 lines)
│
├── style.css           → All CSS styles for every page (~3,645 lines, single shared stylesheet)
├── script.js           → All JavaScript logic for every page (~1,978 lines, single shared script)
│
└── assets/             → Media folder containing all images, videos, and logo files
    │
    ├── — LOGO FILES —
    ├── ryugym logo.png             → Original Ryu Gym logo (barbell + RYU GYM text, beige background)
    ├── ryugym-logo.png             → Clean cropped square logo badge (used in nav, footer, favicon)
    ├── ryugym-logo-transparent.png → Transparent background variant for light backgrounds
    ├── ryugym-logo-dark.png        → Dark-mode optimized transparent variant
    ├── ryugym-logo.svg             → Scalable vector logo (crisp at any size)
    │
    ├── — IMAGES —
    ├── gym cat.jpg                 → Hero section image on homepage
    ├── workout.jpg                 → General gym imagery
    ├── Cute-Cat.jpg                → Before/After slider — "Before" image
    ├── fatcat.jpg                  → Before/After slider — "After" image
    ├── olmpic weight room.jpg      → Facilities section — Olympic Weight Room
    ├── heavy metal.jpg             → Facilities section — Heavy Metal Zone
    ├── saunas.jpg                  → Facilities section — Recovery/Sauna
    ├── combact zone.jpg            → Facilities section — Combat Zone
    ├── cardio.jpg                  → Programs — Cardio & Fat Loss
    ├── high ocatne hiit.jpg        → Programs — HIIT program
    ├── hyoertrophy.jpg             → Programs — Hypertrophy/Bodybuilding
    ├── yoga and mobility.jpg       → Programs — Yoga & Mobility
    ├── act fight.jpg               → Programs — Combat Conditioning
    ├── my-qr.jpg                   → QR code (general)
    ├── qr-esewa.jpg                → eSewa payment QR code
    ├── qr-khalti.jpg               → Khalti payment QR code
    │
    ├── — VIDEOS —
    ├── walking.mp4                 → Trainer 1 card background video
    ├── gym boii.mp4                → Trainer 2 card background video
    ├── giga chad.mp4               → Trainer 3 card background video
    ├── john wick.mp4               → Trainer 4 card background video
    ├── andrew atte.mp4             → Trainer profile video
    ├── deadkift.mp4                → Deadlift demonstration video
    ├── thanos.mp4                  → Strength showcase video
    ├── justnothing.mp4             → Background/ambient video
    │
    └── README.txt                  → Asset notes
```

> **Important**: The entire website uses **ONE CSS file** (`style.css`) and **ONE JavaScript file** (`script.js`). Every HTML page links to both. This keeps the project unified and easy to maintain.

---

## Page-by-Page Breakdown

### 1. Homepage — `index.html` (434 lines)

The main landing page with the following sections from top to bottom:

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Navigation Bar** | Ryu Gym logo badge + 6 page links + dark/light toggle + hamburger menu | Sticky header, logo with hover animation, mobile-responsive |
| **Hero Section** | Large headline "Train Hard. Transform Yourself." + CTA buttons + hero image | Text scramble animation, spotlight cursor effect |
| **Scrolling Ticker** | Horizontal auto-scrolling slogans ("NO EXCUSES", "PURE DISCIPLINE", etc.) | CSS-only infinite marquee animation |
| **Stats Counter Strip** | 4 animated counters: 500+ Members, 10+ Years, 18+ Trainers, 99% Goal Rate | Numbers count up from 0 when scrolled into view (Intersection Observer) |
| **Why Choose Us** | 4 feature cards with numbered index (01–04) | Scroll-reveal stagger animation |
| **Featured Programs** | 3 program preview cards with images, badges, descriptions | Links to programs.html |
| **Trainer Preview** | 3 trainer cards with **autoplaying video** backgrounds | `<video>` tag with autoplay, loop, muted, playsinline |
| **Before/After Slider** | Interactive image comparison slider with draggable handle | Custom drag logic (mouse + touch), gradient handle |
| **Trial Pass CTA** | Call-to-action to claim a free day pass | Links to contact.html |
| **Footer** | Ryu Gym logo + navigation links, training hours, address, social icons | 4-column responsive grid, logo with hover scale |

---

### 2. About Page — `about.html` (243 lines)

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Gym Story** | Origin paragraph about Ryu Gym's founding philosophy | Narrow container for readability |
| **Facilities Grid** | 4 facility cards (Weight Room, Conditioning Floor, Boxing Arena, Recovery Suites) | Each with an image and description |
| **Operating Hours Table** | HTML `<table>` with staffed hours for each day of the week | Proper `<thead>`, `<tbody>` usage |
| **Membership Pricing** | 3 pricing cards: Iron Pass, Black Tier, Elite Athlete | Monthly/Yearly toggle switch that dynamically updates prices via JavaScript |
| **Print Header** | Hidden header that only appears when the page is printed | CSS `@media print` stylesheet |

---

### 3. Programs Page — `programs.html` (315 lines)

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Filter Bar** | Buttons: All, Strength, Bodybuilding, Cardio & Fat Loss, Flexibility | JavaScript filters program cards by `data-category` attribute |
| **Program Grid** | 6 detailed program cards with images, badges, durations, descriptions | Filterable with smooth hide/show transitions |
| **BMI Calculator** | Height/Weight form → computes BMI → animated SVG ring result | Classifies Underweight / Normal / Overweight / Obese and recommends a program |
| **Tabata Timer** | Functional 20s Work / 10s Rest × 8 Rounds interval timer | Start, Pause, Reset buttons with live countdown display |

---

### 4. Trainers Page — `trainers.html` (241 lines)

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Trainer Grid** | 4 trainer profile cards with photo/video, name, specialty, experience | Data stored in HTML `data-*` attributes |
| **Lightbox Modal** | Click any trainer card → full-screen overlay with detailed bio, credentials | JavaScript reads `data-name`, `data-role`, `data-bio`, `data-specs` |

---

### 5. Contact Page — `contact.html` (257 lines)

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Contact Form** | Name, Email, Phone, Program dropdown, Message textarea | Full client-side validation with regex patterns and per-field error messages |
| **Success Banner** | Animated confirmation message after valid submission | Form hides and banner slides in |
| **Facility Info** | Address, phone, email, operating hours in plain text | Two-column responsive layout |
| **Embedded Map** | OpenStreetMap iframe showing gym location | CSS grayscale filter applied to match monochrome theme |

---

### 6. Membership Page — `membership.html` (638 lines)

The full membership enrollment page:

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Tier Selection** | 3 membership tiers displayed as cards (Iron Pass, Black Tier, Elite Athlete) | Click to select; highlights chosen tier |
| **Member Info Form** | Name, email, phone, start date collection | Client-side validation with inline error messages |
| **Payment Section** | 3 payment method tabs: Card, QR (eSewa/Khalti), Cash | Tab switching, live card preview animation |
| **Card Payment Form** | Card number, expiry, CVV with real-time card preview | Card type auto-detection (Visa/MC/Amex), flip animation on CVV focus |
| **QR Payment** | eSewa and Khalti QR codes displayed for scanning | Payment confirmation flow |
| **Cash Payment** | Walk-in cash instruction with counter visit note | Simple confirmation flow |
| **Digital E-Keycard** | Animated digital keycard with Ryu Gym logo badge, member name, tier, QR code | 1-time use turnstile access pass, NFC/Optical icon |
| **Barcode Voucher** | Generated barcode membership pass with member details | Printable; auto-generates unique voucher ID |

---

### 7. Checkout Page — `checkout.html` (473 lines)

The streamlined checkout and voucher issuance page:

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Minimal Header** | Ryu Gym logo + "Back to Plans" link + theme toggle | Compact checkout-specific header |
| **Order Summary** | Selected tier, price, and member info confirmation | Pulled from membership.html via `localStorage`/URL params |
| **Payment Processing** | Same Card/QR/Cash flow as membership.html | Unified payment UI |
| **Digital E-Keycard** | Ryu Gym logo badge, member name, tier tag, QR access code | Shown immediately after successful online payment |
| **Barcode Voucher** | Full membership pass with barcode, validity dates | Printable via "Print Voucher / Save PDF" button |
| **Pass Lookup Modal** | Retrieve previously issued passes stored on this device | Uses `localStorage` to restore past vouchers |

---

### 8. Custom 404 Page — `404.html` (156 lines)

Displays a large "404" error code with "Sector Out of Bounds" message, a brief explanation, and a back-to-home link. Uses inline `<style>` for page-specific layout, shares the site header and footer.

---

## JavaScript Features Explained (`script.js`)

The file contains **20+ functions** (~1,978 lines), each handling one specific feature. All are initialized on page load via `DOMContentLoaded`:

| # | Function Name | What It Does | Concept Used |
|---|--------------|-------------|--------------|
| 0 | `initImagePlaceholders()` | If any `<img>` fails to load, replaces it with a generated SVG placeholder so the layout never breaks | `error` event listener, Data URIs |
| 1 | `initThemeToggle()` | Toggles dark/light mode by setting `data-theme` attribute on `<html>`. Saves preference to `localStorage` | `localStorage`, DOM attribute manipulation |
| 2 | `updateThemeIcon()` | Swaps the sun/moon SVG icon inside the toggle button based on current theme | Dynamic SVG injection via `innerHTML` |
| 3 | `initStickyHeader()` | Adds a `.scrolled` CSS class to the header when the user scrolls past 60px, making it compact | `scroll` event, `classList.toggle()` |
| 4 | `initMobileNav()` | Hamburger menu toggle for mobile screens. Toggles `.nav-open` class on the body | `click` event, `classList.toggle()`, `aria-expanded` |
| 5 | `initScrollReveal()` | Elements with class `.reveal` fade/slide in when they enter the viewport | **Intersection Observer API** with threshold |
| 6 | `initStatsCounter()` | Animates numbers counting up (e.g., 0 → 500+) when the stats section scrolls into view | Intersection Observer + `requestAnimationFrame` counter loop |
| 7 | `initPricingToggle()` | Monthly/Yearly billing switch on the About page. Updates all prices dynamically | Toggle switch reads `data-price-monthly` and `data-price-yearly` attributes |
| 8 | `initProgramFilter()` | Filter buttons on Programs page show/hide cards based on `data-category` attribute | `data-*` attributes, CSS display toggling |
| 9 | `initBmiCalculator()` | Takes height (cm) and weight (kg), calculates BMI, classifies it, animates an SVG progress ring, and recommends a program | Form handling, `event.preventDefault()`, SVG `stroke-dashoffset` animation |
| 10 | `initTrainerLightbox()` | Clicking a trainer card opens a full-screen modal with detailed bio from `data-*` attributes | DOM creation, overlay toggling, Escape key listener |
| 11 | `initContactForm()` | Validates every field with regex (email format, phone format, min length). Shows per-field inline errors. On success hides form and shows confirmation banner | Form validation, `regex.test()`, `classList.add('field-error')` |
| 12 | `initPrintTrigger()` | Lets users print pages as formatted documents via `window.print()` | Print API |
| 13 | `initSpotlight()` | Creates a subtle radial spotlight following the mouse cursor on the Hero section | `mousemove` event, CSS `radial-gradient` updated dynamically |
| 14 | `initTextScramble()` | Hero title characters scramble randomly then resolve into the correct text on page load | Character randomization loop with `setTimeout` |
| 15 | `initMagneticButtons()` | Buttons with class `.btn-magnetic` slightly shift toward the cursor when hovered | `mousemove` on button, CSS `transform: translate()` |
| 16 | `initBeforeAfterSlider()` | Interactive image comparison slider — drag a vertical handle to reveal before/after images | `mousedown`/`mousemove`/`mouseup` + touch events, percentage-based width calculation |
| 17 | `initTabataTimer()` | Fully functional Tabata interval timer (20s work / 10s rest × 8 rounds) with Start, Pause, Reset | `setInterval`, state management, DOM updates |
| 18 | `initKeyboardShortcuts()` | Press `T` to toggle theme, `Escape` to close overlays | `keydown` event listener |
| 19 | `initMembershipFlow()` | Handles full membership tier selection, member form, payment tab switching, QR display, card preview animation, digital keycard generation, barcode voucher creation, and pass storage | Complex state machine; `localStorage`, dynamic DOM creation, `canvas` barcode generation |
| 20 | `initCardPreview()` | Real-time animated credit card preview — number masking, card flip on CVV focus, Visa/MC/Amex type detection | Input event listeners, CSS 3D `perspective`/`rotateY` transform |

---

## CSS Architecture Explained (`style.css`)

The stylesheet is approximately **3,645 lines** organized into clearly commented sections.

### Design System (CSS Variables)

All colors, fonts, and transitions are defined as CSS Custom Properties (variables) in `:root`:

```css
:root {
  --bg-primary: #ffffff;        /* Page background */
  --bg-surface: #f7f7f7;        /* Surface/card background */
  --text-primary: #000000;      /* Main text color */
  --text-secondary: #555555;    /* Muted text */
  --border-strong: #000000;     /* Bold borders */
  --font-heading: 'Oswald';     /* Display/heading font (Google Fonts) */
  --font-body: 'Inter';         /* Body text font (Google Fonts) */
  --transition-fast: 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-smooth: 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-long: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
```

Dark mode overrides all variables under `[data-theme="dark"]`:
```css
[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --text-primary: #ffffff;
  /* ... all colors invert */
}
```

> **Why this matters**: By changing just the CSS variables, the ENTIRE website switches between light and dark mode — no duplicate styles needed.

### Key CSS Techniques Used

| Technique | Where It's Used | Why |
|-----------|----------------|-----|
| **CSS Grid** | Trainer grid, Program grid, Pricing cards, Footer, Stats strip | Responsive multi-column layouts |
| **Flexbox** | Navigation bar, Hero section, Card footers, CTA groups, brand logo | Alignment and spacing |
| **CSS Custom Properties (Variables)** | Everywhere | Centralized theming, easy dark mode |
| **`@media` Queries** | Multiple breakpoints (768px, 480px) | Mobile-first responsive design |
| **`@media print`** | About & Membership pages | Clean printable document layout |
| **CSS Animations (`@keyframes`)** | Ticker marquee, scroll reveal, stat counter, keycard shimmer | Smooth entrance and looping effects |
| **CSS 3D Transforms** | Credit card flip (`perspective`, `rotateY`) | Premium card preview interaction |
| **`aspect-ratio`** | Trainer cards (3/4), Comparison slider (16/9) | Maintain consistent proportions |
| **`object-fit: cover`** | All images and videos | Prevents image stretching/distortion |
| **`backdrop-filter: blur`** | Modal overlays, sticky nav | Glassmorphism frosted glass effect |
| **Gradients (`linear-gradient`)** | Before/After slider handle, digital keycard background | Visual accent and premium card feel |
| **`box-shadow` with color** | Card hover effects, keycard glow | Depth and focus |
| **`data-theme` attribute selector** | Dark mode styles | Theme switching without JS-heavy class toggling |
| **Google Fonts (`@import`)** | `Oswald` for headings, `Inter` for body text | Professional typography |
| **`.brand-logo-img`** | Navbar logo badge with hover scale + rotate | Logo integration with micro-animation |
| **`.keycard-logo-badge`** | E-keycard logo badge | Official branding on digital pass |
| **`.footer-brand-logo-img`** | Footer logo beside heading | Consistent branding in footer |

---

## Technologies & Concepts Used

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Page structure, semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`) |
| **CSS3** | All styling, layout, responsive design, animations, dark/light theming, print styles |
| **Vanilla JavaScript (ES6+)** | All interactivity — DOM manipulation, event handling, form validation, timers, state management |
| **Google Fonts** | Oswald (headings) and Inter (body text) loaded via `@import` |
| **OpenStreetMap** | Embedded `<iframe>` map on the Contact page |
| **SVG** | Inline SVGs for theme toggle icons, BMI progress ring, image placeholders, and the vector logo |
| **HTML5 `<video>`** | Autoplaying trainer preview videos |
| **HTML5 `data-*` Attributes** | Storing trainer bios, pricing data, stat targets, and filter categories in HTML |
| **`localStorage` Web API** | Persist dark/light mode preference and saved membership passes across sessions |
| **PNG / SVG Logo Assets** | Official Ryu Gym branding (barbell + RYU GYM wordmark) integrated across nav, footer, keycard, and favicon |

---

## Key Academic Concepts Demonstrated

### 1. **Semantic HTML5 Structure**
Every page uses proper semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`. Important for accessibility and SEO.

### 2. **Responsive Web Design (RWD)**
CSS Grid, Flexbox, and `@media` queries adapt the layout to any screen size. Navigation collapses into a hamburger menu on mobile.

### 3. **CSS Custom Properties for Theming**
All colors are stored in CSS variables. Dark/light mode works by swapping one set of variables — no duplicate CSS.

### 4. **DOM Manipulation**
JavaScript reads and modifies the DOM — creating elements, changing text, toggling classes, updating styles — all without jQuery.

### 5. **Intersection Observer API**
Used for scroll-triggered animations (reveal on scroll, stat counter). Far more efficient than listening to raw `scroll` events.

### 6. **Client-Side Form Validation**
Contact and membership forms validate every field using JavaScript regex patterns before allowing submission. Shows inline error messages per field.

### 7. **Event Handling**
Uses multiple event types: `click`, `scroll`, `mousemove`, `mousedown`, `mouseup`, `touchstart`, `touchmove`, `touchend`, `keydown`, `submit`, `error`, `focus`, `blur`, `input`.

### 8. **localStorage for Persistence**
Dark/light mode preference and issued membership passes are saved to `localStorage` so they persist across page refreshes.

### 9. **Accessibility (ARIA)**
Interactive elements use `aria-label`, `aria-expanded`, `aria-hidden`, `role`, `title` attributes for screen reader compatibility.

### 10. **Print Stylesheet**
About and Membership pages include `@media print` CSS that hides navigation, footer, and buttons — reformatting content for clean printing.

### 11. **HTML5 Video Element**
Trainer cards use `<video>` with `autoplay`, `loop`, `muted`, and `playsinline` for inline video playback without user interaction.

### 12. **Data Attributes (`data-*`)**
Used extensively for trainer bios (`data-bio`), pricing values (`data-price-monthly`), stat targets (`data-target`), and program categories (`data-category`). JavaScript reads these to dynamically generate content.

### 13. **CSS 3D Transforms**
The credit card preview in the Membership page uses `perspective` and `rotateY` to create a realistic card-flip animation when the user focuses the CVV field.

### 14. **Asset Management & Branding**
The official Ryu Gym logo (barbell graphic + RYU GYM wordmark) is provided in four formats: original PNG, cropped square PNG, transparent PNG, dark-mode PNG, and SVG vector. It is placed consistently across all pages for professional brand coherence.

---

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Google Chrome (latest) | ✅ Yes |
| Mozilla Firefox (latest) | ✅ Yes |
| Microsoft Edge (latest) | ✅ Yes |
| Safari (latest) | ✅ Yes |
| Internet Explorer | ❌ No (uses ES6+, CSS Grid, Custom Properties, Intersection Observer) |

---

## Credits & Acknowledgements

- **Fonts**: [Google Fonts](https://fonts.google.com/) — Oswald, Inter
- **Map**: [OpenStreetMap](https://www.openstreetmap.org/) (free, open-source map embed)
- **Payment QR Codes**: eSewa and Khalti QR codes used for academic demonstration purposes
- **Media**: All images and videos used are for educational/academic demonstration purposes only
- **Logo**: Official Ryu Gym logo (barbell + wordmark) designed for this project
- **Code**: 100% hand-written — no templates, no frameworks, no Bootstrap, no jQuery, no npm packages
- **Built with**: VS Code text editor and a web browser
- **Student**: Aman Rouniyar — 2nd Semester Web Development Project

---

> **© 2026 Ryu Gym — College Web Development Project.**
> Hand-built with semantic HTML5, CSS3 (~3,645 lines), and Vanilla JavaScript (~1,978 lines).
> *Biratnagar-2, Near Chapri Mall | Ryugym@gmail.com | 980-0000000*
