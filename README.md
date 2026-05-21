# Pixel Watch

A browser-based Pixel Watch face simulator built with React + Vite. Customize watch faces, color themes, and dial photos in real time.

**Live demo:** [clock-nu-eight.vercel.app](https://clock-nu-eight.vercel.app)

---

## Features

- **7 watch faces** — Bespoke, Digital, Minimal, Orbit, Neon, Retro, Infograph
- **5 color themes** — Obsidian, Hazel, Porcelain, Coral, Bay
- **Dial photo** — upload any image as the watch face background
- **Second hand toggle** — enable or disable the sweeping second hand
- Live time updated every second

## Tech stack

- React 19
- Vite 8
- Pure CSS (no UI library)
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Project structure

```
src/
├── App.jsx                  # Root — state, themes, faces
├── components/
│   ├── PixelWatch.jsx       # Watch case, band, crown, glass
│   ├── ControlPanel.jsx     # Face picker, theme swatches, settings
│   ├── BespokeFace.jsx
│   ├── DigitalFace.jsx
│   ├── MinimalFace.jsx
│   ├── OrbitFace.jsx
│   ├── NeonFace.jsx
│   ├── RetroFace.jsx
│   └── InfographFace.jsx
```
