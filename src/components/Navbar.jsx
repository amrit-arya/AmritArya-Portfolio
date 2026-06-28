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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observers = []
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.35 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

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

        {/* Mobile: Hamburger only (theme toggle removed) */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer text-white/80 hover:text-white hover:bg-white/5"
            aria-label="Toggle menu"
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
        className={`md:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl glass overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-96 opacity-100 shadow-xl shadow-white/5' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="p-4 flex flex-col gap-1">
          {navLinks.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
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
            className="mt-2 px-4 py-3 rounded-xl bg-white text-black text-sm font-semibold text-center transition-all hover:shadow-lg"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </nav>
  )
}