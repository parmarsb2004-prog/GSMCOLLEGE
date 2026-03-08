# Deploy Gram Seva Nardipur (Live Website)

Your app is a Vite + React single-page app. Below are simple ways to put it online.

---

## Option 1: Vercel (recommended, free & fast)

1. **Push your code to GitHub** (if not already):
   - Create a repo at https://github.com/new
   - In your project folder run:
   ```bash
   git add .
   git commit -m "Ready for deploy"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to https://vercel.com and sign up/login (use “Continue with GitHub”).
   - Click **Add New…** → **Project**.
   - Import your GitHub repo (Gram Seva Nardipur).
   - Leave **Build Command** as `npm run build` and **Output Directory** as `dist`.
   - Click **Deploy**. In 1–2 minutes you get a live URL like `https://your-project.vercel.app`.

3. **Later updates**: Push to GitHub; Vercel will auto-deploy.

---

## Option 2: Netlify

1. Push your project to GitHub (same as step 1 above).

2. Go to https://netlify.com → **Sign up** / **Log in** → **Add new site** → **Import an existing project** → choose **GitHub** and your repo.

3. Settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

4. Click **Deploy site**. You’ll get a URL like `https://random-name.netlify.app`.

5. For React Router (no 404 on refresh), add a file **public/netlify.toml** in your project:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
   Or in Netlify dashboard: **Site settings** → **Build & deploy** → **Post processing** → **Asset optimization**; under **Redirects** add a rule: `/*` → `/index.html` with status **200**.

---

## Option 3: Firebase Hosting (you already use Firebase)

1. **Install Firebase CLI** (once on your PC):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**:
   ```bash
   firebase login
   ```

3. **In your project folder**, run:
   ```bash
   firebase init hosting
   ```
   - Choose “Use an existing project” (your Firebase project) or create one.
   - **Public directory:** type `dist`.
   - **Single-page app?** Yes (so all URLs go to `index.html`).
   - Don’t overwrite `index.html` if it asks.

4. **Build and deploy**:
   ```bash
   npm run build
   firebase deploy
   ```
   The terminal will show your live URL (e.g. `https://your-project.web.app`).

---

## Before you deploy

- Run **`npm run build`** locally. If it fails, fix errors before deploying.
- Your Firebase (Firestore/Storage) already works; no extra config needed for Vercel/Netlify. For Firebase Hosting, the same Firebase project is used.

---

## Quick summary

| Platform        | Best for              | Free? | URL you get                    |
|----------------|------------------------|-------|--------------------------------|
| **Vercel**     | Easiest, auto deploy   | Yes   | `*.vercel.app`                 |
| **Netlify**    | Simple, form support   | Yes   | `*.netlify.app`                |
| **Firebase**   | Same as your backend   | Yes   | `*.web.app` / `*.firebaseapp.com` |

Use **Option 1 (Vercel)** if you just want the site live quickly.
