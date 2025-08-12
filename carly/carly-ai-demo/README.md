# Carly AI - Automotive Dealership AI Assistant Demo

A cutting-edge marketing landing page showcasing AI-powered voice agent technology for automotive dealerships. This demo features Carly and Carlyle, two specialized AI assistants designed to revolutionize the car sales experience with a Lost in Space-inspired particle globe visualization representing AI consciousness.

![Carly AI Demo](https://img.shields.io/badge/Next.js-14+-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0+-purple) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-12+-green)

## 🚀 Features

### Core Capabilities
- **Dual AI Agents**: Carly (New Vehicle Specialist) and Carlyle (Used Vehicle & Trade-in Expert)
- **Interactive Voice Demo**: Lost in Space-inspired AI consciousness visualization
- **Glassmorphic Design**: Modern frosted glass effects with dynamic blur
- **3D Animated Background**: Organic particle globe with neural activity simulation
- **Audio-Responsive Particles**: Real-time visual feedback during conversations
- **Professional Layout**: Well-spaced interface with clear visual hierarchy

### Technical Highlights
- **Next.js 14+** with App Router for optimal performance
- **TypeScript** for type-safe development
- **Tailwind CSS v4** for rapid styling
- **Framer Motion** for sophisticated animations
- **Bun** for ultra-fast package management
- **Canvas-based 3D Rendering** for smooth 60fps animations

## 🎯 AI Agent Specializations

### Carly - New Vehicle Specialist
- New Vehicle Exploration
- Test Drive Scheduling
- Feature Demonstrations
- Financing Discussions

### Carlyle - Used Vehicle & Trade-in Expert
- Used Vehicle Assessment
- Trade-in Evaluation
- CPO Program Explanation
- Market Value Analysis

## 🎨 Visual Design

### Lost in Space AI Consciousness
The demo features a revolutionary particle globe visualization that represents the AI's "consciousness":
- **Organic Movement**: Smooth, natural turbulence with spring physics
- **Neural Activity**: Circuit patterns and electrical arcs during speech
- **Audio Responsiveness**: Particles react to conversation flow
- **Agent Colors**: Cyan for Carly, Purple for Carlyle

### Glassmorphic Effects
- **Frosted Glass Cards**: 10-20% opacity with backdrop blur
- **3D Transforms**: Mouse-tracking card tilts with yellow comet tracers
- **Depth Layering**: Multiple glass layers for visual hierarchy
- **Dynamic Glows**: Agent-specific color schemes

## 🛠️ Installation

### Prerequisites
- Node.js 18+ or Bun runtime
- Git

### Setup Instructions

1. **Clone the repository**
```bash
git clone [repository-url]
cd carly-ai-demo
```

2. **Install dependencies using Bun (recommended)**
```bash
bun install
```
Or using npm:
```bash
npm install
```

3. **Run the development server**
```bash
bun run dev
```
Or using npm:
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
carly-ai-demo/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main landing page with demo interface
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles and animations
│   ├── components/
│   │   └── ui/
│   │       ├── glass-card.tsx        # Glassmorphic card with 3D effects
│   │       └── animated-background.tsx # 3D particle globe system
│   └── lib/
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── next.config.ts           # Next.js configuration
└── package.json             # Project dependencies
```

## 🎨 Design System

### Color Palette
- **Primary**: Electric Blue (#00D4FF)
- **Secondary**: Vibrant Purple (#8B5CF6)
- **Accent**: Neon Green (#00FF88)
- **Carly Theme**: Cyan (#22d3ee)
- **Carlyle Theme**: Purple (#a855f7)

### Animation System
- **Spring Physics**: Smooth, organic movement (stiffness: 20, damping: 30)
- **Turbulence**: Natural flow patterns with Perlin noise
- **Particle System**: 100 particles in 3D sphere formation
- **Electrical Arcs**: Dynamic connections during speech

### Layout Design
- **Professional Header**: Clean navigation with agent branding
- **Hero Section**: Welcoming introduction with auto-hide
- **Card Grid**: Two-column responsive layout with proper spacing
- **Demo Interface**: Centered visualization with status indicators

## 🔧 Customization

### Adding New Tasks
Edit the `tasks` array in `src/app/page.tsx`:
```typescript
const tasks: Task[] = [
  {
    id: "unique-id",
    title: "Task Title",
    description: "Task description",
    icon: <IconComponent />,
    agent: "carly" | "carlyle",
    preview: <PreviewComponent />
  }
];
```

### Modifying Themes
Update color values in `src/app/globals.css`:
```css
:root {
  --primary: 195 100% 50%;
  --accent: 186 100% 50%;
  /* Add custom colors */
}
```

### Adjusting Animations
Configure spring physics in `src/components/ui/animated-background.tsx`:
```typescript
const springX = useSpring(mouseX, { 
  stiffness: 20,  // Lower = smoother
  damping: 30     // Higher = less bouncy
});
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
vercel
```

### Build for Production
```bash
bun run build
bun run start
```

## 📊 Performance Optimization

- **Smooth Animations**: 60fps particle rendering with RequestAnimationFrame
- **Spring Physics**: Natural movement with proper damping
- **Hardware Acceleration**: GPU-optimized transforms
- **Efficient Re-renders**: React memo and optimized state management
- **Lazy Loading**: Components load on-demand

## 🔄 Recent Updates

### Latest Improvements (v1.1.0)
- ✅ Smoother, more organic particle animations
- ✅ Enhanced spacing between sections and cards
- ✅ Professional header layout with better visual hierarchy
- ✅ Lost in Space-inspired AI consciousness visualization
- ✅ Audio-responsive particle system
- ✅ Improved demo mode interface

## 🔄 Future Enhancements

- [ ] Real AI voice integration with WebRTC
- [ ] Dark/Light/System theme switching
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Live chat integration
- [ ] CRM system connection
- [ ] Real-time appointment booking
- [ ] Vehicle inventory API integration
- [ ] Voice control for accessibility
- [ ] Mobile app companion

## 📝 License

This project is proprietary software for demonstration purposes.

## 🤝 Contributing

For contribution guidelines, please contact the development team.

## 📧 Contact

For inquiries about implementing this AI solution in your dealership:
- Website: [Your Website]
- Email: [Your Email]
- Phone: [Your Phone]

---

Built with ❤️ for the future of automotive sales
