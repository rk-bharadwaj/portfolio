# R Kiran Bharadwaj - Portfolio

Personal portfolio website for **R Kiran Bharadwaj** — Embedded Systems & Full-Stack IoT Developer.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```text
portfolio-website/
├── public/                 # Static assets
│   ├── favicon.svg         # Site favicon
│   ├── profile.jpg         # Profile photograph
│   └── oled-hill-climb.jpg # ESP32 OLED game preview
├── src/
│   ├── components/         # Page sections
│   │   ├── Navbar.jsx                           # Top sticky navigation
│   │   ├── Hero.jsx                             # Hero section & bio card
│   │   ├── CoreExpertise.jsx                    # Engineering disciplines
│   │   ├── SkillsMatrix.jsx                     # Technical skill badges
│   │   ├── ProjectsSection.jsx                  # Featured project carousel & modals
│   │   ├── InteractiveBench.jsx                 # STM32 Simon game & ESP32 OLED showcase
│   │   ├── ContactSection.jsx                   # Contact details & inquiry form
│   │   ├── Footer.jsx                           # Website footer
│   │   └── InteractiveDotRippleBackground.jsx   # Mouse-interactive dot canvas background
│   ├── data/
│   │   └── portfolioData.js                     # All personal bio, skills, and project data
│   ├── utils/
│   │   └── sound.js                             # Web Audio utilities
│   ├── App.jsx                                  # Main application component
│   ├── index.css                                # Global styling & system font stack
│   └── main.jsx                                 # React application entry point
├── index.html              # HTML entry template
├── package.json            # Project dependencies & scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
```

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS (Apple SF system font stack)
- **Icons:** Lucide React
- **Hosting:** Vercel compatible
