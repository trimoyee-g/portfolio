# Trimoyee Ghosh — Portfolio

An OS-themed developer portfolio built with React and Vite. The desktop simulates a windowed environment — double-click icons to open sections, drag windows around, minimize, maximize, and close them. Supports both a macOS and a Windows UI skin, with a toggle to switch between them.

## Features

- **Windowed UI** — fully draggable, resizable, minimizable windows for each section
- **Dual OS theme** — macOS dock + wallpaper or Windows taskbar + wallpaper; switchable at runtime via a button
- **Mobile layout** — dedicated responsive view for small screens
- **Interactive terminal** — `tri@portfolio` bash-style terminal with real commands
- **Right-click context menu** — open all / close all windows from the desktop
- **Sections**: About · Experience · Projects · Skills · Achievements · Education · Terminal · Contact

## Tech stack

- **React 18** + **Vite**
- **JavaScript**
- **Framer Motion** — window animations and transitions
- CSS-in-JS inline styles with a dark theme (`#0a0a14` base, purple/blue accents)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build   # production build → dist/
npm run preview # preview the production build locally
```

## Project structure

```
src/
  components/     # UI components (windows, taskbar, wallpaper, icons…)
  data/
    portfolio.js  # all content: profile, experience, projects, skills, etc.
  hooks/          # useWindowManager, useIsMobile, useOS
  App.jsx         # root — window manager wiring + OS switching
public/
  favicon.svg     
```

All portfolio content lives in [src/data/portfolio.js](src/data/portfolio.js)
