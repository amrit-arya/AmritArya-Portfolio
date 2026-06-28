import { useEffect, useRef, useState } from 'react'

export default function Footer() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={ref} className={`relative py-12 px-6 border-t border-white/5 ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`}>
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            
            <span className="text-base font-heading font-semibold text-white/70">
              Amrit Arya
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {['Home', 'About', 'Education', 'Projects', 'Skills', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-white/30 hover:text-white/70 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/20">
            © {new Date().getFullYear()} Amrit Arya
          </p>
        </div>
      </div>
    </footer>
  )
}