import { useEffect, useState } from 'react'

export default function ScrollIndicator() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    if (scrolled) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll"
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: '8px',
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: scrolled ? '2px solid rgba(255,255,255,0.8)' : '2px solid rgba(255,255,255,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.4s ease, background 0.4s ease',
          background: scrolled ? 'rgba(255,255,255,0.1)' : 'transparent',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Arrow icon — flips when scrolled */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={scrolled ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-scroll-bounce"
          style={{
            transform: scrolled ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.4s ease, stroke 0.4s ease',
          }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </button>
  )
}