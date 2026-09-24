# Ryu Gym — Fitness & Training Website

> **College Web Development Project**
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

**Ryu Gym** is a fully functional, multi-page fitness and gym website designed as a college web development project. The website is themed around a fictional premium training facility called "Ryu Gym" and showcases a professional-grade, monochrome (black & white) editorial design aesthetic.

### What Makes This Project Stand Out

- **6 complete HTML pages** with consistent navigation across all of them
- **~1,950 lines of hand-written CSS** covering responsive layouts, dark/light theming, animations, and print styles
- **~870 lines of Vanilla JavaScript** implementing 17+ interactive features without any external library
- **Dark/Light mode** toggle that saves the user's preference in `localStorage`
- **Interactive widgets**: BMI Calculator, Before/After image comparison slider, Tabata workout timer, contact form with full client-side validation
- **Fully responsive** design that adapts to mobile, tablet, and desktop screens
- **Video integration** in trainer cards with autoplay, loop, and muted playback
- **Custom 404 error page** with its own design
- **Print stylesheet** so the About page can be printed as a clean document

---

## How to Open / Run the Website

This is a **static website** — it does not need a server, Node.js, or any installation.

### Steps:
1. Navigate to the project folder: `College project/`
2. Double-click on **`index.html`** — it will open in your default web browser
3. Use the navigation bar at the top to visit other pages (About, Programs, Trainers, Contact)

### Alternative (Live Server):
If using VS Code, install the "Live Server" extension, then right-click `index.html` → "Open with Live Server" for auto-refresh during development.

---

## File & Folder Structure

```
College project/
│
├── index.html          → Homepage (hero, stats, programs preview, trainers, transformation slider, trial CTA)
├── about.html          → About page (gym story, facilities grid, operating hours table, membership pricing cards)
├── programs.html       → Programs page (6 filterable training programs, BMI calculator widget, Tabata timer)
├── trainers.html       → Trainers page (4 trainer cards with click-to-expand lightbox dossier modal)
├── contact.html        → Contact page (validated form, facility info, embedded OpenStreetMap)
├── 404.html            → Custom 404 error page
│
├── style.css           → All CSS styles for every page (~1,950 lines, single shared stylesheet)
├── script.js           → All JavaScript logic for every page (~870 lines, single shared script)
│
└── assets/             → Media folder containing all images and videos
    ├── gym cat.jpg     → Hero section image on homepage
    ├── workout.jpg     → Additional gym imagery
    ├── Cute-Cat.jpg    → Before/After slider comparison image
    ├── fatcat.jpg      → Before/After slider comparison image
    ├── walking.mp4     → Trainer 1 video (autoplaying in trainer card)
    ├── gym boii.mp4    → Trainer 2 video (autoplaying in trainer card)
    ├── giga chad.mp4   → Trainer 3 video (autoplaying in trainer card)
    └── README.txt      → Asset notes
```

> **Important**: The entire website uses ONE CSS file (`style.css`) and ONE JavaScript file (`script.js`). This keeps the project simple and easy to maintain. Every HTML page links to both files.

---

## Page-by-Page Breakdown

### 1. Homepage — `index.html` (371 lines)

The main landing page. It contains the following sections from top to bottom:

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Navigation Bar** | Logo + 5 page links + dark/light toggle + hamburger menu | Sticky header, mobile-responsive |
| **Hero Section** | Large headline "Train Hard. Transform Yourself." + CTA buttons + hero image | Text scramble animation, spotlight cursor effect |
| **Scrolling Ticker** | Horizontal auto-scrolling slogans ("NO EXCUSES", "PURE DISCIPLINE", etc.) | CSS-only infinite marquee animation |
| **Stats Counter Strip** | 4 animated counters: 500+ Members, 10+ Years, 18+ Trainers, 99% Goal Rate | Numbers count up from 0 when scrolled into view (Intersection Observer) |
| **Why Choose Us** | 4 feature cards with numbered index (01–04) | Scroll-reveal stagger animation |
| **Featured Programs** | 3 program preview cards with images, badges, descriptions | Links to programs.html |
| **Trainer Preview** | 3 trainer cards with **autoplaying video** backgrounds | `<video>` tag with autoplay, loop, muted, playsinline |
| **Before/After Slider** | Interactive image comparison slider with draggable handle | Custom drag logic (mouse + touch), colorful gradient handle with neon glow |
| **Trial Pass CTA** | Call-to-action to claim a free day pass | Links to contact.html |
| **Footer** | Navigation links, training hours, address, copyright | 4-column responsive grid |

---

### 2. About Page — `about.html` (354 lines)

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Gym Story** | Origin paragraph about Ryu Gym's founding philosophy | Narrow container for readability |
| **Facilities Grid** | 4 facility cards (Weight Room, Conditioning Floor, Boxing Arena, Recovery Suites) | Each with an image and description |
| **Operating Hours Table** | HTML `<table>` with staffed hours for each day of the week | Proper `<thead>`, `<tbody>` usage |
| **Membership Pricing** | 3 pricing cards: Iron Pass ($49), Black Tier ($79), Elite Athlete ($129) | Monthly/Yearly toggle switch that dynamically updates prices via JavaScript |
| **Print Header** | Hidden header that appears only when the page is printed | CSS `@media print` stylesheet |

---

### 3. Programs Page — `programs.html` (286 lines)

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Filter Bar** | Buttons: All, Strength, Bodybuilding, Cardio & Fat Loss, Flexibility | JavaScript filters program cards by `data-category` attribute |
| **Program Grid** | 6 detailed program cards with images, badges, durations, descriptions | Filterable with smooth hide/show transitions |
| **BMI Calculator** | Height/Weight form → computes BMI → shows result with animated SVG ring | Classifies as Underweight / Normal / Overweight / Obese and recommends a program |
| **Tabata Timer** | Functional 20s Work / 10s Rest × 8 Rounds interval timer | Start, Pause, Reset buttons with live countdown display |

---

### 4. Trainers Page — `trainers.html` (211 lines)

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Trainer Grid** | 4 trainer profile cards with photo, name, specialty, experience | Data stored in HTML `data-*` attributes |
| **Lightbox Modal** | Click any trainer card → full-screen overlay with detailed bio, credentials | JavaScript reads `data-name`, `data-role`, `data-bio`, `data-specs` attributes |

---

### 5. Contact Page — `contact.html` (219 lines)

| Section | What It Shows | Key Feature |
|---------|--------------|-------------|
| **Contact Form** | Name, Email, Phone, Program dropdown, Message textarea | Full client-side validation with regex patterns and per-field error messages |
| **Success Banner** | Animated confirmation message after valid submission | Form hides and banner slides in |
| **Facility Info** | Address, phone, email, operating hours in plain text | Two-column responsive layout |
| **Embedded Map** | OpenStreetMap iframe showing gym location | CSS grayscale filter applied to match monochrome theme |

---

### 6. Custom 404 Page — `404.html` (127 lines)

Displays a large "404" error code, a "Sector Out of Bounds" message, and a link back to the homepage. Uses inline `<style>` for page-specific layout.

---

## JavaScript Features Explained (`script.js`)

The file contains **17 separate functions**, each handling one specific feature. All are initialized on page load via `DOMContentLoaded`. Here is every function explained:

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
| 9 | `initBmiCalculator()` | Takes height (cm) and weight (kg), calculates BMI, classifies it, animates an SVG progress ring, and recommends a training program | Form handling, `event.preventDefault()`, SVG `stroke-dashoffset` animation |
| 10 | `initTrainerLightbox()` | Clicking a trainer card opens a full-screen modal overlay with their detailed bio pulled from `data-*` attributes | DOM creation, overlay toggling, Escape key listener |
| 11 | `initContactForm()` | Validates every form field with regex (email format, phone format, min length). Shows per-field inline errors. On success, hides the form and shows the confirmation banner | Form validation, `regex.test()`, `classList.add('field-error')` |
| 12 | `initPrintTrigger()` | Lets users print the About page as a formatted document via `window.print()` | Print API |
| 13 | `initSpotlight()` | Creates a subtle radial spotlight that follows the mouse cursor on the Hero section | `mousemove` event, CSS `radial-gradient` updated dynamically |
| 14 | `initTextScramble()` | The hero title characters scramble randomly then resolve into the correct text on page load | Character randomization loop with `setTimeout` |
| 15 | `initMagneticButtons()` | Buttons with class `.btn-magnetic` slightly shift toward the cursor when hovered | `mousemove` on button, CSS `transform: translate()` |
| 16 | `initBeforeAfterSlider()` | Interactive image comparison slider where you drag a vertical handle to reveal before/after images | `mousedown`/`mousemove`/`mouseup` + touch events, percentage-based width calculation |
| 17 | `initTabataTimer()` | Fully functional Tabata interval timer (20s work / 10s rest × 8 rounds) with Start, Pause, Reset | `setInterval`, state management, DOM updates |
| 18 | `initKeyboardShortcuts()` | Press `T` to toggle theme, `Escape` to close overlays | `keydown` event listener |

---

## CSS Architecture Explained (`style.css`)

The stylesheet is approximately **1,950 lines** and is organized into clearly commented sections.

### Design System (CSS Variables)

All colors, fonts, and transitions are defined as CSS Custom Properties (variables) in `:root`:

```css
:root {
  --bg-primary: #ffffff;        /* Page background */
  --text-primary: #000000;      /* Main text color */
  --text-secondary: #555555;    /* Muted text */
  --border-strong: #000000;     /* Bold borders */
  --font-heading: 'Oswald';     /* Display/heading font (Google Fonts) */
  --font-body: 'Inter';         /* Body text font (Google Fonts) */
  --transition-fast: 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-smooth: 0.35s;
}
```

Dark mode overrides these variables under `[data-theme="dark"]`:
```css
[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --text-primary: #ffffff;
  /* ... all colors invert */
}
```

> **Why this matters**: By changing just the CSS variables, the ENTIRE website switches between light and dark mode — no need to write duplicate styles.

### Key CSS Techniques Used

| Technique | Where It's Used | Why |
|-----------|----------------|-----|
| **CSS Grid** | Trainer grid, Program grid, Pricing cards, Footer, Stats strip | Responsive multi-column layouts |
| **Flexbox** | Navigation bar, Hero section, Card footers, CTA groups | Alignment and spacing |
| **CSS Custom Properties (Variables)** | Everywhere | Centralized theming, easy dark mode |
| **`@media` Queries** | Multiple breakpoints (768px, 480px) | Mobile-first responsive design |
| **`@media print`** | About page | Clean printable document layout |
| **CSS Animations (`@keyframes`)** | Ticker marquee, scroll reveal, stat counter | Smooth entrance and looping effects |
| **`aspect-ratio`** | Trainer cards (3/4), Comparison slider (16/9) | Maintain consistent proportions |
| **`object-fit: cover`** | All images and videos | Prevents image stretching/distortion |
| **Gradients (`linear-gradient`)** | Before/After slider handle (colorful neon glow) | Visual accent on the interactive slider |
| **`box-shadow` with color** | Slider divider line (cyan glow) | Neon glow effect on the draggable divider |
| **`data-theme` attribute selector** | Dark mode styles | Theme switching without JS-heavy class toggling |
| **Google Fonts (`@import`)** | `Oswald` for headings, `Inter` for body text | Professional typography |

---

## Technologies & Concepts Used

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Page structure, semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`) |
| **CSS3** | All styling, layout, responsive design, animations, dark/light theming, print styles |
| **Vanilla JavaScript (ES6+)** | All interactivity — DOM manipulation, event handling, form validation, timers, API usage |
| **Google Fonts** | Oswald and Inter font families loaded via `@import` |
| **OpenStreetMap** | Embedded `<iframe>` map on the Contact page |
| **SVG** | Inline SVGs for theme toggle icons, BMI progress ring, and image placeholders |
| **HTML5 `<video>`** | Autoplaying trainer preview videos |
| **HTML5 `data-*` Attributes** | Storing trainer bios, pricing data, stat targets, and filter categories directly in the HTML |

---

## Key Academic Concepts Demonstrated

These are the core web development concepts this project demonstrates, which you can highlight to your teacher:

### 1. **Semantic HTML5 Structure**
Every page uses proper semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`. This is important for accessibility and SEO.

### 2. **Responsive Web Design (RWD)**
The website uses CSS Grid, Flexbox, and `@media` queries to adapt to any screen size. The navigation collapses into a hamburger menu on mobile.

### 3. **CSS Custom Properties for Theming**
Instead of hard-coding colors everywhere, all colors are stored in CSS variables. This allows the dark/light mode toggle to work by simply swapping one set of variables.

### 4. **DOM Manipulation**
JavaScript directly reads and modifies the DOM — creating elements, changing text, toggling classes, updating styles — all without jQuery or any library.

### 5. **Intersection Observer API**
Used for scroll-triggered animations (reveal on scroll, stat counter). This is a modern browser API that is much more efficient than listening to scroll events.

### 6. **Client-Side Form Validation**
The contact form validates every field using JavaScript regex patterns before allowing submission. Shows inline error messages for each field.

### 7. **Event Handling**
The project uses multiple event types: `click`, `scroll`, `mousemove`, `mousedown`, `mouseup`, `touchstart`, `touchmove`, `touchend`, `keydown`, `submit`, `error`.

### 8. **localStorage for Persistence**
The dark/light mode preference is saved to `localStorage` so it persists across page refreshes and navigation.

### 9. **Accessibility (ARIA)**
Interactive elements use `aria-label`, `aria-expanded`, `aria-hidden`, `role` attributes for screen reader compatibility.

### 10. **Print Stylesheet**
The About page includes `@media print` CSS that hides the navigation, footer, buttons, and reformats the pricing cards for clean printing.

### 11. **HTML5 Video Element**
Trainer cards use `<video>` with `autoplay`, `loop`, `muted`, and `playsinline` attributes for inline video playback without user interaction.

### 12. **Data Attributes (`data-*`)**
Used extensively to store metadata in HTML elements — trainer bios (`data-bio`), pricing values (`data-price-monthly`), stat targets (`data-target`), and program categories (`data-category`). JavaScript reads these to dynamically generate content.

---

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Google Chrome (latest) | ✅ Yes |
| Mozilla Firefox (latest) | ✅ Yes |
| Microsoft Edge (latest) | ✅ Yes |
| Safari (latest) | ✅ Yes |
| Internet Explorer | ❌ No (uses ES6+, CSS Grid, Custom Properties) |

---

## Credits & Acknowledgements

- **Fonts**: [Google Fonts](https://fonts.google.com/) — Oswald, Inter
- **Map**: [OpenStreetMap](https://www.openstreetmap.org/) (free, open-source map embed)
- **Media**: All images and videos used are for educational/academic demonstration purposes only
- **Code**: 100% hand-written — no templates, no frameworks, no Bootstrap, no jQuery, no npm packages
- **Built with**: A text editor (VS Code) and a web browser

---

> **© 2026 Ryu Gym — College Web Development Project. Hand-built with semantic HTML5, CSS3, and Vanilla JavaScript.**


# Stage all changed files
git add -A

# Commit with a message
git commit -m "Your message here"

# Push to GitHub
git push
