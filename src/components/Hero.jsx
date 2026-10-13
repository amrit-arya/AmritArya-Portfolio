import { useState, useEffect } from 'react'

const LANGUAGES = [
  { name: 'AMRIT ARYA' },
  { name: 'アムリット・アーリャ' },
  { name: 'અમૃત આર્ય' },
  { name: '阿姆里特·阿里亚' },
  { name: '아므리트 아랴' },
  { name: 'अमृत आर्य' },
  { name: 'అమృత్ ఆర్య' },
  { name: 'أمريت آريا' },
]

const HOLD_MS = 400
const ENTER_MS = 100
const EXIT_MS = 100

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('visible')

  useEffect(() => {
    // Respect prefers-reduced-motion: stay static on index 0
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIndex(0)
      setPhase('visible')
      return
    }

    let timer
    if (phase === 'entering') {
      timer = setTimeout(() => setPhase('visible'), ENTER_MS)
    } else if (phase === 'visible') {
      timer = setTimeout(() => setPhase('exiting'), HOLD_MS)
    } else if (phase === 'exiting') {
      timer = setTimeout(() => {
        setIndex(i => (i + 1) % LANGUAGES.length)
        setPhase('entering')
      }, EXIT_MS)
    }
    return () => clearTimeout(timer)
  }, [phase])

  const current = LANGUAGES[index]

  const nameStyle = {
    opacity: phase === 'visible' ? 1 : 0,
    transform: phase === 'exiting'
      ? 'translateY(-40px)'
      : phase === 'entering'
        ? 'translateY(40px)'
        : 'translateY(0)',
    filter: phase === 'visible' ? 'blur(0px)' : 'blur(8px)',
    transition: phase === 'exiting'
      ? `opacity ${EXIT_MS}ms cubic-bezier(0.4,0,1,1), transform ${EXIT_MS}ms cubic-bezier(0.4,0,1,1), filter ${EXIT_MS}ms ease`
      : `opacity ${ENTER_MS}ms cubic-bezier(0,0,0.2,1), transform ${ENTER_MS}ms cubic-bezier(0,0,0.2,1), filter ${ENTER_MS}ms ease`,
  }

  return (
    <section id="home" className="relative min-h-[100dvh] min-h-svh flex items-center justify-center overflow-hidden">
      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* "Hello, I'm" subtitle */}
        <div className="animate-fade-in-up mb-4" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <p className="text-xl sm:text-2xl tracking-[0.2em] uppercase font-bold text-white/80"
            style={{ fontFamily: 'Herkey, sans-serif' }}>
            Hello, I'm
          </p>
        </div>

        {/* Animated Name */}
        <div className="animate-fade-in-up mb-12" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <div style={{ overflow: 'hidden', padding: '0.35em 0.2em', height: 'clamp(70px, 12vw, 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1
              aria-label="Amrit Arya"
              style={{
                fontSize: index === 0 ? 'clamp(46px, 8.5vw, 88px)' : 'clamp(36px, 7vw, 76px)',
                lineHeight: '1.2',
                fontFamily: index === 0 ? 'MickeyMouse, sans-serif' : 'Monograph, sans-serif',
                color: '#ffffff',
                fontWeight: index === 0 ? 'normal' : 'bold',
                display: 'block',
                whiteSpace: 'nowrap',
                willChange: 'transform, opacity, filter',
                ...nameStyle,
              }}
            >
              <span aria-hidden="true">{current.name}</span>
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up text-white/70"
          style={{ animationDelay: '0.7s', opacity: 0, fontFamily: 'Herkey, sans-serif' }}
        >
          Aspiring{' '}
          <span className="font-bold text-white/90">DevOps Engineer</span>{' '}
          passionate about automation and{' '}
          <span className="font-bold text-white/90">scalable systems</span>.
          I build reliable pipelines and infrastructure that power modern applications.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.9s', opacity: 0 }}>
          <a
            href="#projects"
            className="group px-8 py-4 rounded-2xl bg-white text-black font-bold text-base hover:bg-white/90 hover:scale-105 btn-glow flex items-center gap-3"
            style={{ fontFamily: 'Herkey, sans-serif' }}
          >
            View My Work
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href="/Arya-%20Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 rounded-2xl glass-card font-bold text-base hover:scale-105 flex items-center gap-3 gradient-border text-white/80 hover:text-white hover:bg-white/10"
            style={{ fontFamily: 'Herkey, sans-serif' }}
          >
            View Resume
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}