import { Component, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MarqueeStrip from './components/MarqueeStrip'
import Silk from './components/Silk'
import { SmoothCursor } from "@/components/ui/smooth-cursor"

// Lazy-load heavier below-the-fold components to reduce initial JS chunk size
const Skills = lazy(() => import('./components/Skills'))
const NowHumming = lazy(() => import('./components/NowHumming'))

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    console.error('Portfolio application caught error:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#0a0a0a', color: '#fff', padding: '2rem', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ffffff' }}>Something went wrong</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '420px', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            An unexpected error occurred while rendering this page. Please refresh to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '0.75rem 2rem', borderRadius: '0.75rem', background: '#ffffff', color: '#000000', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
          >
            Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <SmoothCursor />
      {/* Silk WebGL background — fixed, behind everything */}
      <Silk
        color="#4d2169"
        speed={1}
        scale={1.2}
        noiseIntensity={0.6}
        rotation={0}
      />

      {/* Page content */}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100dvh' }}>
        <Navbar />

        <main>
          <Hero />
          <MarqueeStrip />
          <About />
          <Education />
          <Projects />
          <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-white/40">Loading skills...</div>}>
            <Skills />
          </Suspense>
          <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-white/40">Loading player...</div>}>
            <NowHumming />
          </Suspense>
          <Contact />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}