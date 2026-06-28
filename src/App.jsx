import { Component, useState } from 'react'
import { ThemeProvider } from './ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MarqueeStrip from './components/MarqueeStrip'
import NowHumming from './components/NowHumming'

import Silk from './components/Silk'
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import LoadingScreen from './components/LoadingScreen'
import { AnimatePresence } from 'framer-motion'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#0a0a0a', color: '#fff', padding: '2rem', fontFamily: 'monospace', minHeight: '100vh' }}>
          <h2 style={{ color: '#ff6b6b' }}>Something crashed:</h2>
          <pre style={{ color: '#aaa', fontSize: '13px', whiteSpace: 'pre-wrap' }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

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
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
          <Navbar />

          <main>
            <Hero />
            <MarqueeStrip />
            <About />
            <Education />
            <Projects />
            <Skills />
            <NowHumming />
            <Contact />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  )
}