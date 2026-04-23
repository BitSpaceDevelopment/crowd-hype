# CrowdHype

An interactive WebXR crowd engagement game built with React, Three.js, and react-three-fiber. Play as a performer and keep the crowd hyped — or face tomatoes.

**[Play Live](https://bitspacedevelopment.github.io/crowd-hype/)**

## About

CrowdHype puts you on stage in a VR venue. Engage the crowd by looking at them, throwing t-shirts, and performing gestures. Let the hype meter drop to zero and it's game over. Choose from multiple songs, venues, and game modes. High scores are saved locally in your browser.

## Features

- WebXR / VR headset support
- Desktop mouse + OrbitControls playable without a headset
- Multiple venues: Main Stage, Concert, Festival, Stadium
- 8 songs across genres (chip tune, phonk, rock, country, EDM, hip hop, pop, folk metal)
- Endless and Session game modes
- Local high score leaderboard (persists in browser)
- Gesture detection
- Tutorial mode

## Tech Stack

- React 18
- Three.js via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber)
- [@react-three/drei](https://github.com/pmndrs/drei) — helpers and abstractions
- [@react-three/xr](https://github.com/pmndrs/xr) — WebXR controller support
- Vite 5 — build tool

## Local Development

```bash
cd crowdhype
npm install
npm start        # dev server at http://localhost:5173
npm run build    # production build → crowdhype/dist/
npm run preview  # preview the production build locally
```

## Deployment

The game deploys automatically to GitHub Pages via GitHub Actions on every push to `main`.

Live URL: `https://bitspacedevelopment.github.io/crowd-hype/`

To deploy manually or to a different repo, update `base` in `crowdhype/vite.config.js` to match your repository name:

```js
base: "/your-repo-name/",
```

Then enable GitHub Pages in your repo settings under **Settings → Pages → Source: GitHub Actions**.
