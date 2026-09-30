# Ryu Gym — Fitness & Training Website

> **College Web Development Project — 2nd Semester**
> Student: **Aman Rouniyar** | Biratnagar-2, Near Chapri Mall
> Built entirely with **HTML5**, **CSS3**, **Vanilla JavaScript**, and a **Node.js/Express** backend payment server.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [How to Open / Run the Website](#how-to-open--run-the-website)
3. [File & Folder Structure](#file--folder-structure)
4. [Page-by-Page Breakdown](#page-by-page-breakdown)
5. [Payment Gateway System](#payment-gateway-system)
   - [How the Backend Server Works](#how-the-backend-server-works)
   - [How Render Deployment Works](#how-render-deployment-works)
   - [eSewa Integration Flow](#esewa-integration-flow)
   - [Khalti Integration Flow](#khalti-integration-flow)
   - [Digital Turnstile Keycard](#digital-turnstile-keycard)
6. [JavaScript Features (script.js)](#javascript-features-scriptjs)
7. [CSS Architecture (style.css)](#css-architecture-stylecss)
8. [Technologies & Concepts Used](#technologies--concepts-used)
9. [Key Academic Concepts Demonstrated](#key-academic-concepts-demonstrated)
10. [Browser Compatibility](#browser-compatibility)
11. [Credits & Acknowledgements](#credits--acknowledgements)

---

## Project Overview

**Ryu Gym** is a fully functional, multi-page fitness and gym website built as a 2nd semester college web development project. The website simulates a real premium training facility with a professional monochrome (black & white) editorial design with crimson red and gold accents matching the official Ryu Gym brand logo.

### What Makes This Project Stand Out

- **8 complete HTML pages** with consistent navigation and branding across all of them
- **Official Ryu Gym logo** (barbell + wordmark) integrated in every page's nav, footer, digital keycard, and favicon
- **~3,645 lines of hand-written CSS** — responsive layouts, dark/light theming, animations, print styles, digital keycard
- **~2,100+ lines of Vanilla JavaScript** — 20+ interactive features with zero external libraries
- **Real Payment Gateway Integration** — eSewa ePay v2 and Khalti EPAY v2 backend with HMAC-SHA256 signature verification
- **Node.js/Express backend server** deployed on Render — handles secure payment initiation and verification
- **1-Time Digital Turnstile E-Keycard** generated after verified online payment — with QR code, barcode, NFC icon, and athlete details
- **Membership Barcode Voucher** — Code-39 barcode + QR code auto-generated after checkout
- **Dark/Light mode** toggle saved in `localStorage`
- **Interactive widgets**: BMI Calculator, Before/After image slider, Tabata workout timer, contact form with full validation
- **Fully responsive** — mobile, tablet, desktop
- **Custom 404 page**, print stylesheets, accessible ARIA markup

---

## How to Open / Run the Website

### Option A — Static Site Only (No Payment Backend)
> This mode lets you view all pages. Card and Desk Cash checkout work. eSewa/Khalti gateways need the backend.

1. Clone or download the project folder
2. Double-click `index.html` — opens in your browser
3. Navigate using the top navigation bar

### Option B — Live Server (Recommended for Development)
1. Open the folder in **VS Code**
2. Install the **"Live Server"** extension
3. Right-click `index.html` → **"Open with Live Server"**
4. Site runs at `http://127.0.0.1:5500`

### Option C — Full Stack (with Payment Gateways)
> Required to use eSewa and Khalti real payment gateway flows.

**Step 1: Set up the backend server**
```bash
cd server
cp .env.example .env       # Copy the example env file
# Edit .env with your real eSewa and Khalti credentials
npm install                # Install Node.js dependencies
npm start                  # Start the payment server on port 3001
```

**Step 2: Open the frontend** via Live Server (NOT file://)
- Frontend: `http://127.0.0.1:5500`
- Backend API: `http://localhost:3001`

**Step 3: Test a payment**
- Go to **Membership** page → Select a plan → Click **"Proceed to eSewa Online Payment"**
- You will be redirected to eSewa's sandbox payment portal

---

## File & Folder Structure

```
Aman Rouniyar-Ryu Gym -2nd sem/
│
├── index.html          → Homepage — hero, stats, programs preview, trainers, transformation slider
├── about.html          → About page — gym story, facilities, hours table, pricing cards
├── programs.html       → Programs page — 6 filterable programs, BMI calculator, Tabata timer
├── trainers.html       → Trainers page — 4 trainer cards with lightbox bio modal
├── contact.html        → Contact page — validated form, facility info, embedded map
├── membership.html     → Membership page — plan selection, payment (eSewa/Khalti/Card/Cash)
├── checkout.html       → Dedicated checkout page (opens in new tab from membership)
├── 404.html            → Custom 404 error page
│
├── style.css           → All CSS for every page (~3,645 lines, single shared stylesheet)
├── script.js           → All JavaScript for every page (~2,100+ lines, single shared script)
├── render.yaml         → Render.com deployment config for the backend Node.js server
│
├── server/             → Node.js/Express backend payment server
│   ├── index.js            → Main Express app (CORS, routing, error handling)
│   ├── signature.js        → HMAC-SHA256 cryptographic signature generator/verifier (eSewa)
│   ├── db.js               → In-memory transaction store (idempotency, status tracking)
│   ├── .env                → Local environment variables (NOT committed to Git)
│   ├── .env.example        → Template for environment setup
│   ├── package.json        → Node.js dependencies (express, axios, uuid, dotenv, cors)
│   └── routes/
│       └── payment.js      → All payment API endpoints (eSewa + Khalti initiate/callback/status)
│
└── assets/             → Media folder
    ├── ryugym-logo.png             → Cropped square logo badge (nav, footer, favicon)
    ├── ryugym-logo-transparent.png → Transparent background variant
    ├── ryugym-logo-dark.png        → Dark-mode variant
    ├── ryugym-logo.svg             → Scalable vector version
    ├── qr-esewa.jpg                → eSewa payment QR code
    ├── qr-khalti.jpg               → Khalti payment QR code
    ├── my-qr.jpg                   → General QR code (legacy)
    └── [images, videos ...]        → Trainer videos, gym photos, program images
```

---

## Page-by-Page Breakdown

### 1. Homepage — `index.html`
The main landing page. Users arrive here first.

| Section | Description | Key JS Feature |
|---------|-------------|----------------|
| **Navigation Bar** | Logo + 6 page links + dark/light toggle + hamburger | Sticky header, logo micro-animation |
| **Hero Section** | Big headline + CTA buttons + hero image | Text scramble animation, spotlight cursor |
| **Scrolling Ticker** | Auto-scrolling slogans ("NO EXCUSES", etc.) | CSS infinite marquee |
| **Stats Counter** | 500+ Members, 10+ Years, 18+ Trainers, 99% Rate | Count-up on scroll (Intersection Observer) |
| **Why Choose Us** | 4 feature cards (numbered 01–04) | Scroll-reveal stagger animation |
| **Featured Programs** | 3 program preview cards | Links to programs.html |
| **Trainer Preview** | 3 trainer cards with autoplaying video backgrounds | HTML5 `<video>` autoplay, loop, muted |
| **Before/After Slider** | Draggable image comparison slider | Custom drag logic (mouse + touch events) |
| **Trial CTA** | Free day pass call-to-action | Links to contact.html |
| **Footer** | Logo + nav links + hours + address + socials | 4-column responsive grid |

---

### 2. About Page — `about.html`
Background on the gym and facilities.

| Section | Description | Key Feature |
|---------|-------------|-------------|
| **Gym Story** | Founding philosophy paragraph | Narrow readable column |
| **Facilities Grid** | Olympic Weight Room, Conditioning Floor, Boxing Arena, Recovery Suite | Image cards |
| **Hours Table** | `<table>` with staffed hours for each weekday | Proper thead/tbody |
| **Pricing Cards** | Iron Pass, Black Tier, Elite Athlete plans | Monthly/Annual toggle (JavaScript price switching) |
| **Print Header** | Only visible when page is printed | `@media print` CSS |

---

### 3. Programs Page — `programs.html`
Showcases all training programs with interactive tools.

| Section | Description | Key Feature |
|---------|-------------|-------------|
| **Filter Bar** | All / Strength / Bodybuilding / Cardio / Flexibility | Filters cards by `data-category` attribute |
| **Program Grid** | 6 detailed cards (image, badge, duration, description) | Show/hide animation on filter |
| **BMI Calculator** | Height + Weight → BMI → animated SVG ring | Classifies and recommends a program |
| **Tabata Timer** | 20s Work / 10s Rest × 8 Rounds | Start, Pause, Reset with live countdown |

---

### 4. Trainers Page — `trainers.html`
Profiles of the gym's coaching staff.

| Section | Description | Key Feature |
|---------|-------------|-------------|
| **Trainer Grid** | 4 cards with photo/video, name, specialty, years | Video backgrounds per card |
| **Lightbox Modal** | Click trainer → full-screen bio overlay | Reads `data-bio`, `data-role`, `data-specs` from HTML |

---

### 5. Contact Page — `contact.html`
How to reach Ryu Gym.

| Section | Description | Key Feature |
|---------|-------------|-------------|
| **Contact Form** | Name, Email, Phone, Program, Message | Regex validation + per-field error messages |
| **Success Banner** | Confirmation on valid submission | Form hides, banner slides in |
| **Facility Info** | Address, phone, email, hours | Two-column layout |
| **Embedded Map** | OpenStreetMap iframe | CSS grayscale filter for monochrome theme |

---

### 6. Membership Page — `membership.html`
The primary membership enrollment hub.

| Section | Description | Key Feature |
|---------|-------------|-------------|
| **Plan Selector** | Iron Pass / Black Tier / Elite Athlete / Specialized Discipline | Radio buttons highlight selected card |
| **Billing Toggle** | Monthly / Annual (Save 20%) | JS switches prices dynamically |
| **Plan Cards** | Feature lists, prices, "Select & Pay" buttons | Opens checkout.html in a new tab |
| **Inline Checkout** | Backup full checkout embedded in page | Shown on eSewa/Khalti payment callback return |
| **Payment Tabs** | eSewa ePay / Khalti Pay / Card Payment / Desk Cash | Each tab shows its own panel |
| **Voucher Success** | Membership barcode voucher + QR code | Auto-generated Code-39 barcode and QR |
| **Digital Keycard** | 1-Time Turnstile E-Keycard | Only shown on verified online payments |

---

### 7. Checkout Page — `checkout.html`
Dedicated full-screen checkout that opens in a new browser tab.

| Section | Description | Key Feature |
|---------|-------------|-------------|
| **Plan Summary** | Shows selected plan, cycle, and running total | Reads URL params (?plan=BlackTier) |
| **Member Details** | Name, Email, Phone fields | Validated before submission |
| **Payment Method Tabs** | eSewa ePay / Khalti Pay / Card / Desk Cash Voucher | Each method has its own panel |
| **eSewa Panel** | Gateway info + "Proceed to eSewa" button | Calls backend `/api/initiate-payment` |
| **Khalti Panel** | Gateway info + "Proceed to Khalti" button | Calls backend `/api/khalti/initiate` |
| **Card Panel** | Animated credit card preview + form | Simulated card processing |
| **Desk Cash Panel** | Reservation notice for front desk payment | Generates cashier voucher barcode |
| **Promo Codes** | RYU2026 (10% off), STUDENT15 (15% off) | Applied to order total |
| **Voucher Success View** | Membership pass with Code-39 barcode + QR | Generated client-side via Canvas/SVG |
| **Digital Keycard** | 1-Time Turnstile E-Keycard (eSewa/Khalti only) | Displayed only after verified gateway payment |

---

### 8. Custom 404 Page — `404.html`
Shown when a visitor navigates to a non-existent page.
- Styled to match the main site theme
- Provides a "Go Home" button back to index.html

---

## Payment Gateway System

### How the Backend Server Works

The payment server lives in the `server/` folder and is a **Node.js + Express** application.

```
server/
├── index.js        → Express app entry point
├── signature.js    → Cryptographic signature functions
├── db.js           → In-memory transaction database
└── routes/
    └── payment.js  → All API route handlers
```

#### Starting the Server

```bash
cd server
npm install    # Install: express, cors, axios, uuid, dotenv
npm start      # Runs on http://localhost:3001
```

#### Environment Variables (`server/.env`)

```env
NODE_ENV=development
PORT=3001

# CORS — which frontend origins are allowed
FRONTEND_ORIGIN=http://127.0.0.1:5500,https://amancodexd.github.io

# eSewa sandbox credentials
ESEWA_PRODUCT_CODE=EPAYTEST
ESEWA_SECRET_KEY=8gBm/:&EnhH.1/q
ESEWA_PAYMENT_URL=https://rc-epay.esewa.com.np/api/epay/main/v2/form
ESEWA_STATUS_URL=https://rc.esewa.com.np/api/epay/transaction/status/

# Khalti sandbox credentials
KHALTI_PUBLIC_KEY=test_public_key_dc74e0fd57cb46cd93832aee0a505e1f
KHALTI_SECRET_KEY=test_secret_key_6d477381665a4c9eb4718ae5d233e680
KHALTI_INITIATE_URL=https://dev.khalti.com/api/v2/epayment/initiate/
KHALTI_LOOKUP_URL=https://dev.khalti.com/api/v2/epayment/lookup/

# This server's own public URL (eSewa/Khalti redirects back here)
BACKEND_PUBLIC_URL=http://localhost:3001
```

#### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check — returns `{ ok: true }` |
| `POST` | `/api/initiate-payment` | Start an eSewa transaction — returns form URL + fields |
| `GET` | `/api/payment/success` | eSewa redirects here after user pays |
| `GET` | `/api/payment/failure` | eSewa redirects here if user cancels |
| `POST` | `/api/khalti/initiate` | Start a Khalti transaction — returns `payment_url` |
| `GET` | `/api/khalti/callback` | Khalti redirects here after user pays |
| `GET` | `/api/payment/status/:uuid` | Query transaction status by UUID |

#### Transaction Database (`db.js`)
A simple in-memory JavaScript object stores all transactions:
```js
{ uuid: { planKey, amount, name, email, status, gateway, origin, returnPage, ... } }
```
This ensures **idempotency** — if eSewa accidentally sends the success callback twice, we only process it once.

#### HMAC-SHA256 Signature (`signature.js`)
eSewa uses cryptographic signatures to verify payment authenticity:
```js
// When initiating: we sign "total_amount,transaction_uuid,product_code"
// When verifying callback: we re-verify eSewa's returned signature matches ours
generateSignature({ totalAmount, transactionUuid, productCode, secretKey })
verifyCallbackSignature({ decodedData, secretKey })
```

---

### How Render Deployment Works

**Render** is a cloud platform that hosts the Node.js backend server so it is accessible from the internet (not just `localhost`).

#### `render.yaml` Configuration

```yaml
services:
  - type: web
    name: ryugym-api
    runtime: node
    rootDir: server         # Only deploy the /server folder
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: FRONTEND_ORIGIN
        value: https://amancodexd.github.io,https://ryugym-chi.vercel.app
      - key: ESEWA_PRODUCT_CODE
        value: EPAYTEST
      # ... all other secrets set in Render dashboard
      - key: BACKEND_PUBLIC_URL
        value: https://ryugym-api.onrender.com
```

#### How Render Connects to the Frontend

```
GitHub (push code)
        │
        ▼
   Render detects push
        │
        ▼
   Runs: npm install → npm start
        │
        ▼
   Backend live at: https://ryugym-api.onrender.com
        │
        ▼
   Frontend (GitHub Pages / Vercel) calls backend API
        │
        ▼
   CORS whitelist allows the frontend origin
```

**Why Render?**
- Free tier for academic projects
- Auto-deploys whenever code is pushed to GitHub
- Provides a stable HTTPS URL that eSewa and Khalti can redirect back to
- Environment variables are stored securely in the dashboard (not in code)

---

### eSewa Integration Flow

eSewa uses a **server-side form POST** approach (ePay v2):

```
┌─────────────────────────────────────────────────────────────────────┐
│                        eSewa Payment Flow                           │
└─────────────────────────────────────────────────────────────────────┘

1. USER clicks "Proceed to eSewa Online Payment" on checkout page
        │
        ▼
2. FRONTEND sends POST to backend:
   /api/initiate-payment
   { planKey, amount, cycle, name, email, phone, origin, returnPage }
        │
        ▼
3. BACKEND (server/routes/payment.js):
   - Generates a unique UUID (transaction ID)
   - Computes HMAC-SHA256 signature using eSewa secret key
   - Saves transaction to in-memory DB { status: 'PENDING' }
   - Returns: { formUrl, fields: { amount, signature, product_code, ... } }
        │
        ▼
4. FRONTEND builds a hidden HTML <form> with those fields and submits it
   → User's browser POSTs directly to eSewa's payment portal
        │
        ▼
5. USER sees eSewa's payment page, enters eSewa PIN/password
        │
        ▼
6. eSewa redirects to our BACKEND:
   GET /api/payment/success?data=BASE64_ENCODED_RESPONSE
        │
        ▼
7. BACKEND decodes the response and:
   - Step 1: Verifies eSewa's signature matches what we expect (anti-tampering)
   - Step 2: Checks the transaction UUID exists in our DB (idempotency)
   - Step 3: Re-verifies with eSewa's Status API (never trust redirect alone)
   - Marks transaction as COMPLETE in DB
        │
        ▼
8. BACKEND redirects user's browser back to FRONTEND:
   /checkout.html?payment=success&gateway=esewa&txn=UUID&ref=REF&amount=AMT&name=NAME&plan=PLAN
        │
        ▼
9. FRONTEND (script.js) detects ?payment=success in URL:
   - Renders the Membership Voucher (Code-39 barcode + QR code)
   - Shows the 1-Time Digital Turnstile Keycard
   - Saves pass to localStorage
   - Cleans the URL (removes query params)
```

---

### Khalti Integration Flow

Khalti uses a **server-to-server initiation** then redirect approach (EPAY v2):

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Khalti Payment Flow                          │
└─────────────────────────────────────────────────────────────────────┘

1. USER clicks "Proceed to Khalti Payment"
        │
        ▼
2. FRONTEND sends POST to backend:
   /api/khalti/initiate
   { planKey, amount, cycle, name, email, phone, origin, returnPage }
        │
        ▼
3. BACKEND (server/routes/payment.js):
   - Converts amount to **paisa** (NPR × 100) as Khalti requires
   - Generates a unique UUID as purchase_order_id
   - Saves transaction to in-memory DB { status: 'PENDING' }
   - Calls Khalti's API: POST https://dev.khalti.com/api/v2/epayment/initiate/
     with Authorization: Key <KHALTI_SECRET_KEY>
   - Khalti returns a { payment_url, pidx }
   - Backend returns payment_url to frontend
        │
        ▼
4. FRONTEND redirects: window.location.href = payment_url
   → User sees Khalti's payment portal (wallet / mobile banking options)
        │
        ▼
5. USER completes payment on Khalti
        │
        ▼
6. Khalti redirects to our BACKEND:
   GET /api/khalti/callback?pidx=...&purchase_order_id=UUID&status=Completed
        │
        ▼
7. BACKEND:
   - Looks up the UUID in our DB
   - Calls Khalti's Lookup API to verify the pidx is genuinely COMPLETE
   - Marks transaction as COMPLETE in DB
        │
        ▼
8. BACKEND redirects user's browser back to FRONTEND:
   /checkout.html?payment=success&gateway=khalti&txn=UUID&ref=PIDX&amount=AMT&name=NAME&plan=PLAN
        │
        ▼
9. FRONTEND renders voucher + keycard (same as eSewa success flow)
```

> **Sandbox / Demo note:** In development, the Khalti sandbox API may timeout. The server gracefully falls back to an instant-verified demo redirect so the voucher and keycard flow can still be demonstrated offline.

---

### Digital Turnstile Keycard

After a verified **online payment** (eSewa or Khalti), the member receives a **1-Time Digital Turnstile E-Keycard** instead of the standard cash reservation notice:

```
┌─────────────────────────────────────────────────────────────────────┐
│  ⊞  RYU GYM                              )))  NFC / Optical         │
│     1-Time Turnstile E-Keycard                                      │
│                                                                     │
│  ATHLETE PASS HOLDER                     [QR CODE]                  │
│  ALEX HUNTER                                                        │
│  BLACK TIER MEMBERSHIP                                              │
│                                                                     │
│  PASS CODE: RYU-A1B2C3D4                                           │
│  [=== BARCODE ===]                                                  │
│                                                                     │
│  VALID FOR: 1-TIME ENTRY ONLY            EXPIRES: Oct 30, 2026     │
│  Present this card at the turnstile scanner or show to front desk   │
└─────────────────────────────────────────────────────────────────────┘
```

**What it contains:**
- Athlete's full name and membership tier
- Unique pass code (e.g. `RYU-A1B2C3D4`)
- QR code encoding the pass code + member name
- Code-39 barcode for turnstile scanner
- NFC wave icon
- 1-entry validity notice and expiry date
- "Used" animation when the simulate-turnstile button is clicked

**Why only for online payment?**
- Card and Desk Cash payments are not immediately verified (cash is collected in person)
- Online payments (eSewa/Khalti) are cryptographically verified by the backend before the keycard is issued

---

## JavaScript Features (script.js)

All JavaScript lives in a **single shared file** loaded by every HTML page. It uses `DOMContentLoaded` and checks which elements exist before running — so only the relevant code runs on each page.

| Function | What It Does |
|----------|-------------|
| `initThemeToggle()` | Dark/light mode toggle, saves to `localStorage` |
| `initStickyHeader()` | Adds shadow/border to navbar when user scrolls past hero |
| `initMobileNav()` | Hamburger menu open/close with ARIA attributes |
| `initScrollReveal()` | Intersection Observer — fades elements in as you scroll |
| `initStatsCounter()` | Animates number counters from 0 to target when visible |
| `initPricingToggle()` | Monthly/Annual price switcher on About and Membership pages |
| `initProgramFilter()` | Filters program cards by category on Programs page |
| `initBmiCalculator()` | Calculates BMI, animates SVG ring, recommends program |
| `initTabataTimer()` | Functional interval timer (20s work / 10s rest × 8 rounds) |
| `initTrainerLightbox()` | Click trainer card → open full-bio modal overlay |
| `initContactForm()` | Full client-side form validation with regex patterns |
| `initBeforeAfterSlider()` | Draggable image comparison slider (mouse + touch) |
| `initSpotlight()` | Cursor spotlight effect on hero section |
| `initTextScramble()` | Scrambles/unscrambles hero headline letters on load |
| `initMagneticButtons()` | Subtle magnetic pull on CTA buttons when cursor is nearby |
| `initCheckoutSystem()` | **Full checkout engine** — plan selection, payment tabs, voucher generation, eSewa/Khalti gateway calls, keycard display |
| `generateCode39BarcodeSVG()` | Pure JS Code-39 barcode SVG renderer |
| `generateCrispQRSVG()` | Pure JS QR code SVG renderer (no library) |

---

## CSS Architecture (style.css)

One single stylesheet (~3,645 lines) used by all 8 pages.

### Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --bg-primary: #ffffff;
  --bg-surface: #f7f7f7;
  --text-primary: #000000;
  --text-secondary: #555555;
  --accent-primary: #c0392b;      /* Crimson red */
  --accent-secondary: #d4a017;    /* Gold */
  --border-strong: #000000;

  /* Typography */
  --font-heading: 'Oswald', sans-serif;
  --font-body: 'Inter', sans-serif;

  /* Transitions */
  --transition-fast: 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-smooth: 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --text-primary: #ffffff;
  /* ... all colors invert */
}
```

### Key CSS Techniques

| Technique | Where Used |
|-----------|-----------|
| **CSS Grid** | Trainer grid, Program grid, Pricing cards, Footer, Stats strip |
| **Flexbox** | Navigation, Hero, Card footers, CTA groups, brand logo |
| **CSS Custom Properties** | Everywhere — enables dark mode with zero duplicate styles |
| **`@media` Queries** | Multiple breakpoints (768px, 480px) |
| **`@media print`** | About & Membership pages — clean printable layout |
| **CSS `@keyframes`** | Ticker marquee, scroll reveal, stat counter, keycard shimmer |
| **CSS 3D Transforms** | Credit card flip (`perspective`, `rotateY`) |
| **`aspect-ratio`** | Trainer cards (3/4), Before/After slider (16/9) |
| **`backdrop-filter: blur`** | Modal overlays, sticky nav (glassmorphism) |
| **`linear-gradient`** | Slider handle, digital keycard background, gateway panels |
| **`box-shadow` with color** | Hover glow on cards, keycard glow |
| **Google Fonts (`@import`)** | Oswald (headings), Inter (body text) |

---

## Technologies & Concepts Used

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Page structure — semantic elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) |
| **CSS3** | All styling, layout, responsive design, animations, dark/light theming, print styles |
| **Vanilla JavaScript (ES6+)** | All interactivity — DOM manipulation, event handling, form validation, payment gateway calls |
| **Node.js** | Backend JavaScript runtime for the payment server |
| **Express.js** | HTTP server framework for the payment API endpoints |
| **axios** | HTTP client on the backend for calling eSewa and Khalti status/lookup APIs |
| **uuid** | Generates unique transaction IDs for each payment |
| **dotenv** | Loads environment variables from `.env` file |
| **cors** | Enables the frontend to call the backend across different origins |
| **Google Fonts** | Oswald (headings) and Inter (body text) loaded via `@import` |
| **OpenStreetMap** | Embedded iframe map on the Contact page |
| **SVG** | Inline SVGs for icons, BMI ring, barcodes, QR codes, and the vector logo |
| **HTML5 `<video>`** | Autoplaying trainer card background videos |
| **HTML5 `data-*` Attributes** | Trainer bios, pricing values, stat targets, program categories |
| **`localStorage` Web API** | Persist dark/light mode preference and issued membership passes |
| **HMAC-SHA256** | Cryptographic signature for eSewa payment verification |
| **Render.com** | Cloud hosting for the Node.js payment backend |
| **GitHub Pages / Vercel** | Static site hosting for the HTML/CSS/JS frontend |

---

## Key Academic Concepts Demonstrated

### 1. Semantic HTML5 Structure
Every page uses proper semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`. Essential for accessibility and SEO.

### 2. Responsive Web Design (RWD)
CSS Grid, Flexbox, and `@media` queries adapt the layout to any screen size. Navigation collapses into a hamburger menu on mobile.

### 3. CSS Custom Properties for Theming
All colors are stored in CSS variables. Dark/light mode works by swapping one set of variables — no duplicate CSS needed.

### 4. DOM Manipulation
JavaScript reads and modifies the DOM — creating elements, changing text, toggling classes, updating styles — all without jQuery or any library.

### 5. Intersection Observer API
Used for scroll-triggered animations and stat counters. Far more efficient than listening to raw `scroll` events.

### 6. Client-Side Form Validation
Contact and membership forms validate every field using JavaScript regex patterns. Shows inline error messages per field without page reload.

### 7. Event Handling
Uses multiple event types: `click`, `scroll`, `mousemove`, `mousedown`, `mouseup`, `touchstart`, `touchmove`, `touchend`, `keydown`, `submit`, `input`, `focus`, `blur`.

### 8. localStorage for Persistence
Dark/light mode preference and issued membership passes are saved to `localStorage` — persisting across page refreshes and navigation.

### 9. REST API Design
The backend server exposes clean REST endpoints (`POST /api/initiate-payment`, `GET /api/payment/success`, etc.) following standard HTTP conventions.

### 10. Cryptography in Web Development
eSewa requires HMAC-SHA256 message authentication codes to ensure payment data is not tampered with between the server and payment gateway.

### 11. Asynchronous JavaScript (Promises / fetch)
All payment API calls use the `fetch()` API with `.then()/.catch()` for non-blocking server communication.

### 12. Server-Side Rendering vs Client-Side Generation
The payment gateway redirects are handled server-side (Node.js) while the voucher and barcode are generated client-side (pure JavaScript SVG/Canvas rendering).

### 13. Accessibility (ARIA)
Interactive elements use `aria-label`, `aria-expanded`, `aria-hidden`, `role`, `title` attributes for screen reader compatibility.

### 14. CSS 3D Transforms
The credit card preview uses `perspective` and `rotateY` to create a realistic card-flip animation when the CVV field is focused.

### 15. Data Attributes (`data-*`)
Used for trainer bios (`data-bio`), pricing values (`data-price-monthly`), stat targets (`data-target`), and program categories (`data-category`). JavaScript reads these to dynamically generate content without hardcoding in JS.

---

## Browser Compatibility

| Browser | Supported |
|---------|----------|
| Google Chrome (latest) | ✅ Yes |
| Mozilla Firefox (latest) | ✅ Yes |
| Microsoft Edge (latest) | ✅ Yes |
| Safari (latest) | ✅ Yes |
| Internet Explorer | ❌ No (uses ES6+, CSS Grid, Custom Properties, Intersection Observer) |

---

## Credits & Acknowledgements

- **Fonts**: [Google Fonts](https://fonts.google.com/) — Oswald, Inter
- **Map**: [OpenStreetMap](https://www.openstreetmap.org/) — free, open-source map embed
- **Payment Gateways**: [eSewa](https://esewa.com.np) and [Khalti](https://khalti.com) — used in sandbox mode for academic demonstration
- **Backend Hosting**: [Render.com](https://render.com) — free tier Node.js deployment
- **Media**: All images and videos are for educational and academic demonstration purposes
- **Logo**: Official Ryu Gym logo (barbell + wordmark) designed for this project
- **Code**: 100% hand-written — no templates, no Bootstrap, no jQuery, no frontend frameworks
- **Built with**: VS Code + Node.js + npm + a web browser

---

> **© 2026 Ryu Gym — 2nd Semester College Web Development Project**
> Hand-built with semantic HTML5, CSS3 (~3,645 lines), Vanilla JavaScript (~2,100+ lines), and Node.js/Express backend.
> *Student: Aman Rouniyar | Biratnagar-2, Near Chapri Mall | Ryugym@gmail.com | 9826320933*
