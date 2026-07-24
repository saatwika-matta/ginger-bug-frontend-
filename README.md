# GingerBug — Phase 1 Frontend

Phase 1 of the GingerBug system design: a 3-page React + Vite site
(Home, Products, Contact) reading from local JSON. No backend yet —
see the design doc for Phase 2+.

## Run it locally

You'll need [Node.js 18+](https://nodejs.org) installed.

```bash
cd gingerbug-frontend
npm install
npm run dev
```

Then open the URL it prints — usually `http://localhost:5173`.

## Build for production

```bash
npm run build
```

This produces a `dist/` folder. Upload that folder's contents to
Vercel, Netlify, S3, or your GoDaddy hosting — per section 9 of the
design doc.

## Before you go live

1. **Contact form**: create a free form at [formspree.io](https://formspree.io),
   then open `src/lib/api.js` and replace `YOUR_FORM_ID` with the ID
   Formspree gives you.
2. **Product photography**: once you have real product photos, upload
   them to Cloudinary (see design doc section 7), then either:
   - replace the placeholder URLs in `src/data/products.json`, and
   - swap the `<JarIllustration>` in `src/components/ProductCard.jsx`
     for `<img src={product.imageUrl} alt={product.name} />`.
3. **Copy**: everything in `src/data/products.json` and `config.json`
   is placeholder text — edit freely, no code changes needed.

## When Phase 2 arrives (real backend)

Open `src/lib/api.js` — it's the only file that needs to change.
Replace the JSON imports with `fetch()` calls to `VITE_API_URL`. No
page or component file needs to be touched.
