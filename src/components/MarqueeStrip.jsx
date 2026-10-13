import { useState } from 'react'

const MARQUEE_TEXT =
    '// Communication // Problem-Solving // Collaboration // Adaptability // Time Management // Critical Thinking // Responsibility // Continuous Learning // Emotional Intelligence // Conflict Resolution '

export default function MarqueeStrip() {
    const [isPaused, setIsPaused] = useState(false)

    return (
        <div
            className="w-full relative overflow-hidden bg-black py-3.5 z-10 flex items-center group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                style={{
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    animation: 'marquee-scroll 10s linear infinite',
                    animationPlayState: isPaused ? 'paused' : 'running',
                }}
            >
                {/* Duplicate the text so the loop is seamless */}
                {[0, 1, 2].map((i) => (
                    <span
                        key={i}
                        style={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            letterSpacing: '0.08em',
                            fontFamily: 'Herkey, sans-serif',
                            paddingRight: '2rem',
                            flexShrink: 0,
                        }}
                    >
                        {MARQUEE_TEXT}
                    </span>
                ))}
            </div>

            {/* WCAG 2.2.2 Pause/Play button */}
            <button
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Play scrolling marquee" : "Pause scrolling marquee"}
                aria-pressed={isPaused}
                className="absolute right-4 z-20 px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 backdrop-blur-md cursor-pointer"
            >
                {isPaused ? '▶ Play' : '⏸ Pause'}
            </button>
        </div>
    )
}
