# ✦ Div | Cinematic Portfolio Experience

> "Building interactive digital dreams."

A high-fidelity, futuristic personal dashboard designed to feel like a living interface rather than a static website. This project merges advanced WebGL shaders, fluid physics-based motion, and time-aware atmospheric effects to create an immersive storytelling platform.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg)

## 🌌 Live Demo
**[View the Portfolio](https://divicoded.github.io/portfoliodivi)**

## ✨ Key Features

### 🕰️ Chrono-Adaptive Environment
The interface "breathes" and changes based on the real world:
- **Seasonal Themes**: The atmosphere shifts between 6 distinct seasons (Vasant, Grishma, Varsha, etc.), changing particle systems (rain, petals, snow) and color palettes automatically based on the current month.
- **Time of Day System**: Dynamic lighting and gradients shift from Morning to Night mode based on the user's local time.

### 🔮 Immersive UI Components
- **WebGL Infinite Menu**: A custom raw WebGL icosahedron sphere gallery for navigating interests.
- **Magnetic Physics**: Buttons and interactive elements possess mass and resist/attract the cursor using spring physics.
- **Holographic Cards**: 3D tilt effects with dynamic lighting, noise textures, and glassmorphism.
- **Cinematic Reveals**: Scroll-triggered entrance animations powered by `Framer Motion`.

### ⚡ Technical Highlights
- **Custom Cursor**: Fluid trailing cursor with morphing shapes based on the current season.
- **Skill Radar**: A procedural SVG data blob visualization for stats.
- **Performance**: Optimized with GPU acceleration, `will-change` hints, and efficient canvas rendering.

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, CSS Modules
- **Motion**: Framer Motion, GSAP, Anime.js
- **Graphics**: Raw WebGL 2.0, gl-matrix
- **Icons**: Lucide React


## 🎨 Customization

### Updating Content
All content is centralized in `src/constants.tsx` (or directly in `App.tsx` for specific sections):
- **Projects**: Modify the `PROJECTS` array in `constants.tsx`.
- **Navigation**: Update `NAV_ITEMS` in `constants.tsx`.
- **Skills**: Adjust the `radarData` and `StatBar` values in `App.tsx`.
- **Anime Menu**: Update the `menuItems` array in `App.tsx`.

### Images
Place your images in the `public/images` directory and reference them in `constants.tsx` or `App.tsx`.

### Seasons & Time
Logic for seasons is located in `src/App.tsx` and `src/components/scene/SeasonalEnvironment.tsx`. You can adjust the particle count, physics, and colors in the `getSeasonConfig` function.


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Designed & Coded by Div*
