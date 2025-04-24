# 🌌 My Dev Universe – Personal Portfolio

Welcome to my interactive portfolio — where code meets creativity!  
Explore my journey, projects, pixel-art games, and more.

An interactive and responsive personal portfolio website showcasing my development journey, projects, and a fun mini-game built with React.

---

## 🛠️ Tech Stack Overview
```bash
| Category         | Stack                                                    |
|------------------|----------------------------------------------------------|
| **Frontend**     | React v18+, Tailwind CSS v3+                             |
| **Routing**      | React Router DOM v6+                                     |
| **State Mgmt.**  | `useState`, `useEffect`, `useRef`, `useContext`          |
| **Deployment**   | GitHub Pages (via `gh-pages` package)                    |
| **Game Logic**   | HTML Canvas API + React Hooks                            |
| **Dark Mode**    | Tailwind's `dark:` utility + custom `ThemeContext`       |
| **i18n**         | Manual language toggle (EN/KO) using `LanguageContext`   |
```
---

## 🚀 Features
- ✅ **Fully Responsive** – Optimized for Mobile / Tablet / Desktop
- 🌙 **Dark & Light Theme Toggle** – With emoji UI ✨
- 🌐 **Language Toggle (EN / 한국어)**
- 🎮 **Mini Games** – Built with React + Canvas
  - Brick Breaker, Runner, and Shooter prototypes
  - Mobile touch support
  - Particle backgrounds
  - Game Over / Clear Screens
  - Difficulty scaling
- 💡 **Mind Map Page** – Animated interactive map about me
- 📄 **About Me, Projects, Lab (실험실)** – All with multilingual support
- 🔗 **Contact Section** – GitHub / LinkedIn / Email (Styled as a digital card)
- 📦 **Easy Deployment** – `npm run deploy` to GitHub Pages

---

## 📁 Structure
```bash
src/ │ 
     ├── assets/ # images, fonts, etc. 
     ├── components/ # shared UI components 
     ├── context/ # ThemeContext, LanguageContext 
     ├── games/ # mini games (Canvas + React) 
     ├── pages/ # About, Projects, Career, MindMap, Lab 
     ├── styles/ # Tailwind config + global styles 
     └── App.js # main router
```
---

## 🖥️ Live Demo
    🔗 https://patriciapark.github.io/portfolio
