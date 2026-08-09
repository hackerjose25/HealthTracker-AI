# Continuum — Next.js App Router

An AI-integrated medical platform for storing, understanding, and forecasting your health timeline.

## Next.js Project Structure

```
Continuum/
├── app/
│   ├── layout.jsx            # Root layout with fonts & metadata
│   ├── globals.css           # Design tokens, typography & CSS animations
│   └── page.jsx              # Home page rendering LandingPage module
├── src/
│   └── pages/
│       └── LandingPage.jsx  # Landing Page Module ('use client')
├── jsconfig.json             # `@/*` path alias configuration
├── next.config.mjs           # Next.js configuration
└── package.json              # Next.js 14, React 18, Lucide React
```

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production
```bash
npm run build
npm run start
```
