# SREE MURUGAN SONS — Full-Stack Application

A modern, high-performance full-stack web application for **SREE MURUGAN SONS** (Hardware, Paints, Steel, Cement & Agro Products).

---

## 📁 Project Architecture & Folder Structure

```
asme-landing/
├── frontend/                     # React + Vite + TypeScript + Tailwind CSS Client
│   ├── public/                   # Static assets, icons, product images & intro video
│   │   ├── assets/               # Production bundles & site assets
│   │   ├── images/               # 56+ product catalog images & theme assets
│   │   ├── hero_video_faststart.mp4 # 4K/2.5K high-bitrate intro video
│   │   ├── site.html             # Themed SREE MURUGAN SONS single-page website
│   │   ├── theme-terracotta.css  # Warm terracotta & amber orange hardware store theme
│   │   ├── scroll-animations.css # Scroll-triggered lift and reveal effects
│   │   └── scroll-animations.js  # Dynamic DOM observer for smooth scroll reveals
│   ├── src/
│   │   ├── components/
│   │   │   └── IntroVideo.tsx    # Full-screen video controller with unmute & skip
│   │   ├── Index.tsx             # Root orchestration (Intro video -> Website reveal)
│   │   ├── main.tsx              # React client entrypoint
│   │   └── index.css             # Base styles
│   ├── index.html                # Vite HTML entrypoint
│   ├── vite.config.ts            # Vite config with backend proxy (/api -> :5000)
│   ├── tsconfig.json             # TypeScript configuration
│   └── package.json              # Frontend dependencies and scripts
│
├── backend/                      # Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── routes/
│   │   │   ├── health.ts         # Service status & uptime monitoring
│   │   │   ├── quotes.ts         # Material estimation calculation & wholesale quote requests
│   │   │   ├── products.ts       # Product categories, brands & search API
│   │   │   └── contact.ts        # Store details, address, timings & customer inquiries
│   │   └── server.ts             # Express server setup with CORS, logger & routes
│   ├── .env                      # Environment variables (PORT, CLIENT_URL)
│   ├── tsconfig.json             # TypeScript configuration for NodeNext
│   └── package.json              # Backend dependencies (Express, CORS, tsx, etc.)
│
├── package.json                  # Root orchestration workspace (concurrent dev runner)
└── README.md                     # Project documentation
```

---

## 🚀 Quick Start

### 1. Run Both Frontend & Backend Concurrently
From the project root:
```bash
npm run dev
```
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

### 2. Run Independently
- **Frontend only**:
  ```bash
  npm run dev:frontend
  ```
- **Backend only**:
  ```bash
  npm run dev:backend
  ```

### 3. Build for Production
```bash
npm run build
```

---

## 📡 Backend API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Health status and uptime |
| `/api/quotes/estimate?sqft=1200` | GET | Indian construction material estimator (Cement, Steel, Paint) |
| `/api/quotes/request` | POST | Submit customer wholesale quote request |
| `/api/products/categories` | GET | Retrieve all categories and brands |
| `/api/products/search?q=tmt` | GET | Filter categories and products by query |
| `/api/contact/info` | GET | Official store address, GSTIN, timings & phones |
| `/api/contact/message` | POST | Submit store inquiry or contact message |

*Note: All `/api/*` calls from the frontend at `http://localhost:3000` are automatically proxied to the backend at `http://localhost:5000` via Vite.*
