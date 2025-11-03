# GV Portfolio - Enhanced React Portfolio

A modern, animated portfolio website built with React.js, Tailwind CSS, and GSAP animations.

## ✨ Features

### 🎨 Visual Enhancements
- **Modern Design**: Dark theme with gradient accents and glass morphism effects
- **Smooth Animations**: GSAP-powered animations with scroll triggers and micro-interactions
- **Interactive Elements**: Hover effects, floating elements, and magnetic buttons
- **Particle Background**: Dynamic canvas-based particle system with connecting lines
- **Loading Screen**: Animated loading screen with progress indicator

### 🚀 Performance & UX
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Smooth Scrolling**: Custom scrollbar and smooth scroll behavior
- **Progress Indicator**: Visual scroll progress bar at the top
- **Accessibility**: Focus states, semantic HTML, and keyboard navigation
- **Performance Optimized**: Efficient animations and lazy loading

### 🛠 Technical Features
- **React 19**: Latest React with hooks and modern patterns
- **Tailwind CSS 4**: Utility-first CSS with custom animations and utilities
- **GSAP**: Professional-grade animations and scroll triggers
- **Vite**: Fast development and build tooling
- **Component Architecture**: Modular, reusable components

## 🎯 Sections

1. **Hero Section**: Animated introduction with floating decorative elements
2. **About Section**: Personal information with animated statistics cards
3. **Skills Section**: Interactive skill cards with hover animations
4. **Projects Section**: Project showcase with image hover effects
5. **Contact Section**: Functional contact form with validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd GV_portfolio/client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
- Primary brand colors: `brand` (blue gradient)
- Accent colors: `purple`, `pink`, `emerald`, `blue`, `cyan`
- Neutral colors: `neutral` (grays)

### Animations
Custom animations are defined in both:
- `tailwind.config.js` for Tailwind utilities
- `src/index.css` for CSS keyframes and custom classes

### Content
Update the content in `src/App.jsx`:
- Personal information in the hero and about sections
- Skills array with icons and descriptions
- Projects array with images, descriptions, and links
- Contact information and social links

## 📁 Project Structure

```
src/
├── components/
│   ├── LoadingScreen.jsx      # Animated loading screen
│   ├── ParticleBackground.jsx # Canvas particle system
│   ├── ScrollProgress.jsx     # Scroll progress indicator
│   └── ContactForm.jsx        # Contact form with validation
├── App.jsx                    # Main application component
├── main.jsx                   # Application entry point
├── index.css                  # Global styles and animations
└── App.css                    # Component-specific styles
```

## 🎭 Animation Features

### GSAP Animations
- Scroll-triggered section animations
- Hero section staggered entrance
- Floating decorative elements
- Parallax effects

### CSS Animations
- Custom keyframe animations
- Hover effects and transitions
- Loading animations
- Gradient shifts

### Interactive Elements
- Magnetic button effects
- Card hover animations
- Image scale effects
- Smooth transitions

## 🌟 Performance Optimizations

- **Lazy Loading**: Components load as needed
- **Efficient Animations**: Optimized GSAP animations
- **CSS Optimization**: Tailwind purging for production
- **Image Optimization**: Responsive images with proper sizing

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

## 🔧 Technologies Used

- **React 19.1.1**: UI library
- **Tailwind CSS 4.1.12**: Utility-first CSS framework
- **GSAP 3.13.0**: Animation library
- **Vite 7.1.2**: Build tool
- **PostCSS**: CSS processing
- **ESLint**: Code linting

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by Ganeshyam Verma
