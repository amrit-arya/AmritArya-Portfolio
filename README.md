# 🌌 Amrit Arya - Personal Portfolio

Welcome to the official repository for the personal portfolio of **Amrit Arya**, a Computer Science student at ITER, Siksha 'O' Anusandhan University, specializing in **DevOps, Cloud Infrastructure, and Scalable Software Systems**.

This portfolio is a showcase of engineering expertise, interactive design, and premium UI experiences, featuring custom WebGL components, smooth inertia-based physics animations, and custom typography.

---

## 🎨 Design & Aesthetic Highlights

This project was built following premium web design guidelines to create an interactive, responsive, and visually stunning experience:
*   **🌌 Silk WebGL Fluid Background**: An interactive, organic particle WebGL shader background (`Silk.jsx`) that floats smoothly behind the content.
*   **☄️ Magic Bento Spotlight Cards**: Adaptive grid components (`MagicBento.jsx`) powered by **GSAP** featuring:
    *   *Magnetism*: Subtle attraction of cards towards the mouse.
    *   *3D Tilt*: Real-time tilt relative to pointer coordinates.
    *   *Particle Emitter*: Custom physical-like particles generated on hover.
    *   *Ripple Effect*: Click ripples emitting from cursor position.
    *   *Cursor Spotlight*: Global cursor light tracking overlay adjusting border and card illumination on the fly.
*   **🎯 Velocity-Sensitive Cursor**: A custom pointer (`SmoothCursor.jsx`) that tracks mouse movements, automatically rotating to align with motion velocity vectors and scaling down on acceleration using spring physics.
*   **🎵 Now Humming Music Player**: A retro 3D spinning vinyl carousel player (`NowHumming.jsx`) using `framer-motion` 3D perspective transforms. Features:
    *   Automatic turntable animation during playback.
    *   Interactive swipe/drag gesture carousel tracking.
    *   Real-time custom HTML5 Audio progress bar tracking & scrubbing.
    *   Active track wave bounce visualization.
*   **📊 Interactive SVG Radar Chart**: Custom-calculated skill matrix visualization (`RadarChart` inside `Skills.jsx`) with hover tooltips displaying subject mastery levels.

---

## 🛠️ Technology Stack

*   **Core**: React 19, JavaScript (ES6+), HTML5, CSS3
*   **Build System & Tooling**: Vite 7
*   **Styling**: Tailwind CSS v4, Custom CSS classes (`index.css`)
*   **Animation**: GSAP (GreenSock), Framer Motion, CSS Keyframes
*   **Icons**: Lucide React
*   **API & Serverless**: Web3Forms for Contact Form submissions

---

## 📂 Project Structure

```bash
Amrit-Portfolio/
├── .env.example            # Environment variables example
├── index.html              # Entry HTML file
├── package.json            # Configuration and dependencies
├── vite.config.js          # Vite config with path aliases
└── src/
    ├── App.jsx             # Main layout & section router
    ├── ThemeContext.jsx    # Site-wide styling and themes
    ├── main.jsx            # React root mount point
    ├── index.css           # Global custom classes, keyframes, cursors, & fonts
    ├── components/
    │   ├── Hero.jsx        # Landing section with multi-lingual greeting cycle
    │   ├── About.jsx       # Biography, custom stats count animation, badges
    │   ├── Education.jsx   # Interactive vertical timeline layout
    │   ├── Projects.jsx    # Projects display grid (Cyber Sentinel, Virasat, VOX, etc.)
    │   ├── Skills.jsx      # Skills grid & custom SVG Radar Chart integration
    │   ├── NowHumming.jsx  # Retro spinning vinyl media carousel and player
    │   ├── Contact.jsx     # Contact form connected to Web3Forms API
    │   ├── Footer.jsx      # Social profiles links & licensing details
    │   ├── Silk.jsx        # WebGL fluid shader background canvas
    │   ├── LoadingScreen.jsx# Initial SVG handwriting drawing page
    │   └── ui/
    │       ├── button.jsx  # Customized UI action component
    │       ├── GradientBarsBG.jsx # Vertical bar graphics for loading screens
    │       └── smooth-cursor.jsx  # Spring-velocity tracking custom cursor
    └── utils/              # Helper utilities
```

---

## ⚙️ Configuration & Environment Setup

The contact form is powered by [Web3Forms](https://web3forms.com/), requiring a free access token to receive email submissions.

1.  Copy `.env.example` to a new file named `.env`:
    ```bash
    cp .env.example .env
    ```
2.  Replace `YOUR_ACCESS_KEY_HERE` with your actual Web3Forms access token:
    ```env
    VITE_WEB3FORMS_ACCESS_KEY=your_real_access_key
    ```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have **Node.js** (version 18 or above) installed on your system.

### 📥 Installation

Clone the repository and install all dependencies:

```bash
# Clone the repository
git clone https://github.com/amrit-arya/AmritArya-Portfolio.git

# Navigate into the project directory
cd AmritArya-Portfolio

# Install dependencies
npm install
```

### 💻 Local Development

Run the Vite development server locally:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### 🏗️ Production Build

Generate optimized static files for deployment:

```bash
npm run build
```

This creates a `dist/` directory ready to be served on platforms like Vercel, Netlify, or AWS Amplify.

### 🔍 Preview Build

Preview the production build locally:

```bash
npm run preview
```

---

## 🚀 Showcase Projects Details

1.  **Cyber Sentinel**: Full-stack CCTV Security Scanning Platform featuring encrypted RTSP feed scanning, camera administration, threat logs, and a React-based monitoring dashboard.
2.  **Virasat**: A secure digital legacy vault enabling users to encrypt, store, and transfer sensitive documents and credentials to designated beneficiaries.
3.  **VOX**: End-to-end computer-vision system converting sign language gestures into text/speech in real-time using OpenCV, Mediapipe, and TensorFlow.
4.  **Railway Management System**: System joining Python and MySQL backend to manage railway ticketing, schedules, and routing.

---

## 🛡️ License

This project is licensed under the **ISC License**. Feel free to use it to inspire your own portfolio designs!
