# TNCSC RiskGuard: AI-Driven Command Center
**Automated Grain Storage Risk Management System**

RiskGuard is a comprehensive decision-support system designed for the Tamil Nadu Civil Supplies Corporation (TNCSC) to prevent grain spoilage, optimize logistics, and digitize field operations.

![TNCSC Hero](https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=2940)

## 🚀 Live Demo
**[Launch Working Model (GitHub Pages)](https://sivapradeep671-gif.github.io/pradeep/)**
*(Zero-Backend Mode enabled for instant preview)*

## 🌟 Key Accomplishments

### 1. High-Impact Landing Page
- **Hero Section**: Designed a premium, government-aligned hero section with clear CTAs.
- **Problem & Solution**: Detailed visualization of the core "Grain Spoilage" issue and our AI solution.
- **Roadmap**: "Present vs Future" vision showcasing scalable impact.
- **Branding**: Official Government of Tamil Nadu emblem and TNCSC branding integration.

### 2. Bilingual Support (Tamil/English)
- **Full Translation**: Instant English/Tamil toggle across Dashboard, Landing Page, and Field App.
- **Context-Aware**: Uses official terminology (e.g., "Mandal", "Godown", "DPC").

### 3. Realistic Government Data
- **Backend Injection**: Seeded with realistic Godown data (IDs like TNJ001, MDU005) and districts.
- **Real-time Analytics**: Command Center displays live calculated risk scores and operational metrics.

### 4. Field Officer App
- **Inspection Workflow**: Step-by-step digital form for officers with metadata and compliance checklists.
- **Evidence Collection**: Integrated photo upload UI for audit trails.
- **Task Management**: Prioritized task list for localized risk mitigation.

### 5. UX & Accessibility
- **Robust formatting**: Handled edge cases with robust date/number formatting utilities.
- **Accessibility**: High-contrast states, keyboard focus rings, and clear navigation.
- **Navigation**: Intuitive sidebar with active states and unified language controls.

### 6. Interactive Maps & Analytics
- **Risk Map**: Live Heatmap visualization of godowns categorized by risk level (Critical, Warning, Safe).
- **Data Remediation**: Backend logic to auto-calculate risk scores, eliminating "Zero Data" issues.

### 7. Static Demo Mode
- **Zero-Backend Architecture**: Frontend automatically falls back to robust "Mock Data" on GitHub Pages.
- **Full Capabilities**: Browse Godown lists, view Risk Maps, inspect Movement logs, and access Admin dashboards without a backend.

## 🛠️ Technology Stack
- **Frontend**: React + Vite, Tailwind CSS, Recharts, React-Leaflet
- **Backend**: Node.js, Express (with Mock Database for demo)
- **Deployment**: GitHub Actions (CI/CD), GitHub Pages

## 📦 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/sivapradeep671-gif/pradeep.git
   cd pradeep
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

## 📜 License
This project is developed for the TNCSC Innovation Challenge.

## 🛠️ Troubleshooting & Dev Notes

### Blank Screen on GitHub Pages
- **Cause**: Client-side routing behavior conflicts with static hosting.
- **Fix**: The project uses `HashRouter` (/#/url) in `App.jsx` to ensure compatibility with GitHub Pages.
- **Verification**: If the page loads but shows only title, a hard refresh (Ctrl+Shift+R) clears cached older builds.

### Build Failures
- **Circular Dependency**: We resolved a critical `tncsc-system` circular reference in `package.json` that was causing CI/CD crashes.
- **Pathing**: The `vite.config.js` `base` is correctly set to `/pradeep/` for correct asset loading.
