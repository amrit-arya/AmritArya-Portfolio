import { useState, useEffect } from 'react'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Dynamic scroll spy with rAF and support for lazy-loaded sections (e.g. Skills)
  useEffect(() => {
    let rafId = null

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)

      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = null

        // If user is at or near the bottom of the page, activate Contact
        const isNearBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 70

        if (isNearBottom) {
          setActiveSection('contact')
          return
        }

        // If user is at top of page, activate Home
        if (window.scrollY < 120) {
          setActiveSection('home')
          return
        }

        // Reference line at ~35% of the viewport height (natural reading eye level)
        const focalLine = window.innerHeight * 0.35
        let current = 'home'

        for (const { id } of navLinks) {
          const el = document.getElementById(id)
          if (!el) continue
          const rect = el.getBoundingClientRect()
          // If section's top has crossed the focal line, it is the current candidate
          if (rect.top <= focalLine) {
            current = id
          }
        }

        setActiveSection(current)
      })
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    // Observe DOM changes so lazy-loaded components (like Skills) are detected immediately upon render
    const observer = new MutationObserver(() => {
      handleScroll()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      observer.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const scrollTo = (id) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  // Handle escape key and outside click to close mobile menu
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    const handleClickOutside = (e) => {
      const nav = document.getElementById('main-navbar')
      if (nav && !nav.contains(e.target)) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handleClickOutside)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <nav
      id="main-navbar"
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled
          ? 'top-2 w-[90%] max-w-5xl'
          : 'top-4 w-[95%] max-w-6xl'
        }`}
    >
      <div
        className={`flex items-center justify-between rounded-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled
            ? 'glass px-5 py-2 shadow-lg shadow-white/5'
            : 'glass px-6 py-3 shadow-xl shadow-white/5'
          }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="text-lg font-heading font-bold transition-colors text-white/90 group-hover:text-white">
            Arya<span className="text-white/70">.</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${activeSection === id
                  ? 'text-white'
                  : 'text-white/70 hover:text-white/90'
                }`}
            >
              {activeSection === id && (
                <span className="absolute inset-0 rounded-xl bg-white/10" />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>

        {/* Right side: CTA only (theme toggle removed) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-white/15 hover:scale-105 btn-glow"
          >
            <span>Let's Talk</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer text-white/80 hover:text-white hover:bg-white/5"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            <div className="flex flex-col gap-1.5 items-center">
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-nav-menu"
        className={`md:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl glass overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-96 opacity-100 shadow-xl shadow-white/5' : 'max-h-0 opacity-0'
          }`}
        onKeyDown={(e) => { if (e.key === 'Escape') setIsOpen(false) }}
      >
        <div className="p-4 flex flex-col gap-1">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              tabIndex={isOpen ? 0 : -1}
              className={`px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-300 cursor-pointer ${activeSection === id
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
            >
              {label}
            </button>
          ))}
          <a
            href="#contact"
            tabIndex={isOpen ? 0 : -1}
            className="mt-2 px-4 py-3 rounded-xl bg-white text-black text-sm font-semibold text-center transition-all hover:shadow-lg"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </nav>
  )
}