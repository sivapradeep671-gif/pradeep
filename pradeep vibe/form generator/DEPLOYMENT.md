# Deployment Guide for BharatForms

This guide explains how to deploy the full-stack application (Backend + Frontend).

## 1. Backend Deployment (Render / Railway / Heroku)

The backend (`server/`) is a Node.js Express app using Google Gemini API.

### Prerequisites in `server/package.json`
- [x] Ensure `"start": "node index.js"` exists in `scripts`. (We fixed this!)
- [x] Ensure `dotenv`, `express`, `cors`, `@google/generative-ai` are in `dependencies`.

### Steps (Example for Render.com)
1.  Push your code to GitHub.
2.  Go to [Render Dashboard](https://dashboard.render.com).
3.  Click **New +** -> **Web Service**.
4.  Connect your GitHub repository.
5.  **Root Directory**: `server` (Important!)
6.  **Build Command**: `npm install`
7.  **Start Command**: `node index.js`
8.  **Environment Variables**:
    - Add `GEMINI_API_KEY`: Your Google Gemini API Key.
    - Add `PORT`: `5000` (optional, Render usually sets this automatically).
9.  Click **Deploy**.
10. Copy your **Service URL** (e.g., `https://bharatforms-api.onrender.com`).

---

## 2. Frontend Deployment (Vercel / Netlify)

The frontend (`client/`) is a React + Vite app.

### Preparation
1.  Open `client/src/App.jsx`.
2.  Ensure it uses the environment variable for the API:
    ```javascript
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    ```

### Steps (Example for Netlify)
1.  Go to [Netlify](https://app.netlify.com).
2.  **Add new site** -> **Import an existing project**.
3.  Connect GitHub and choose your repo.
4.  **Base directory**: `client`
5.  **Build command**: `npm run build`
6.  **Publish directory**: `client/dist` (Netlify usually detects `dist`, but ensure `client/` prefix if needed).
7.  **Environment Variables**:
    - Key: `VITE_API_URL`
    - Value: Your **Backend Service URL** from Step 1 (e.g., `https://bharatforms-api.onrender.com`).
      *Note: Do NOT add a trailing slash `/`.*
8.  Click **Deploy**.

## 3. Verify
- Open your Netlify URL.
- Enter a prompt and click Generate.
- If it works, your full-stack app is live!
