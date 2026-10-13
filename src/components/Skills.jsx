import { useEffect, useRef, useState } from 'react'
import { MagicBentoStyles, GlobalSpotlight, ParticleCard, DEFAULT_GLOW_COLOR } from './MagicBento'

const radarData = [
  { subject: 'DevOps',    score: 88 },
  { subject: 'Backend',   score: 82 },
  { subject: 'Frontend',  score: 75 },
  { subject: 'Cloud',     score: 78 },
  { subject: 'ML / CV',   score: 70 },
  { subject: 'Security',  score: 72 },
  { subject: 'Databases', score: 85 },
]

const techStacks = [
  { category: 'Languages',  items: ['Python', 'Java', 'JavaScript', 'C++'] },
  { category: 'DevOps',     items: ['Docker', 'CI/CD', 'Linux', 'Nginx'] },
  { category: 'Cloud',      items: ['AWS', 'GCP Basics', 'Firebase', 'Vercel'] },
  { category: 'Frameworks', items: ['React', 'Node.js', 'Express', 'Tailwind'] },
  { category: 'Databases',  items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'] },
  { category: 'Tools',      items: ['Git', 'GitHub', 'Figma', 'VS Code'] },
]

function RadarChart({ data, size = 320 }) {
  const [hovered, setHovered] = useState(null)
  const cx = size / 2
  const cy = size / 2
  const levels = 5
  const maxR = size * 0.32
  const n = data.length

  const angleFor = (i) => (Math.PI * 2 * i) / n - Math.PI / 2

  const pointAt = (score, i) => {
    const r = (score / 100) * maxR
    const a = angleFor(i)
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  }

  const labelAt = (i) => {
    const r = maxR + 24
    const a = angleFor(i)
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
  }

  // Build polygon path for data
  const dataPoints = data.map((d, i) => pointAt(d.score, i))
  const polyPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') + ' Z'

  // Grid rings
  const rings = Array.from({ length: levels }, (_, i) => {
    const r = ((i + 1) / levels) * maxR
    const pts = Array.from({ length: n }, (_, j) => {
      const a = angleFor(j)
      return `${j === 0 ? 'M' : 'L'}${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`
    }).join(' ') + ' Z'
    return pts
  })

  // Axis lines
  const axes = data.map((_, i) => {
    const end = pointAt(100, i)
    return { x1: cx, y1: cy, x2: end.x, y2: end.y }
  })

  return (
    <div className="w-full flex flex-col items-center">
      <svg
        width="100%"
        height="100%"
        viewBox="-25 -20 370 360"
        role="img"
        aria-label={`Skill radar chart: ${data.map(d => `${d.subject} ${d.score}%`).join(', ')}`}
        style={{ overflow: 'visible', display: 'block', maxWidth: '340px', margin: '0 auto' }}
      >
        {/* Grid rings */}
        {rings.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        ))}

        {/* Axis lines */}
        {axes.map((a, i) => (
          <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
            stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        ))}

        {/* Data polygon fill */}
        <path d={polyPath} fill="rgba(255,255,255,0.08)" stroke="none" />

        {/* Data polygon stroke */}
        <path d={polyPath} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8"
          strokeLinejoin="round" />

        {/* Dots */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x} cy={p.y} r={hovered === i ? 7 : 5}
            fill={hovered === i ? '#ffffff' : 'rgba(255,255,255,0.7)'}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            tabIndex={0}
            role="button"
            aria-label={`${data[i].subject}: ${data[i].score}%`}
            style={{ cursor: 'pointer', transition: 'r 0.15s, fill 0.15s' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered(hovered === i ? null : i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setHovered(hovered === i ? null : i); }}
          />
        ))}

        {/* Tooltip bubble on hover */}
        {hovered !== null && (() => {
          const p = dataPoints[hovered]
          const d = data[hovered]
          const bw = 84, bh = 40, br = 8
          let bx = p.x - bw / 2
          let by = p.y - bh - 12
          if (by < 4) by = p.y + 14
          bx = Math.max(0, Math.min(size - bw, bx))
          return (
            <g>
              <rect x={bx} y={by} width={bw} height={bh} rx={br}
                fill="rgba(8,8,18,0.95)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <text x={bx + bw / 2} y={by + 14} textAnchor="middle"
                fill="rgba(255,255,255,0.7)" fontSize="10"
                style={{ fontFamily: 'Herkey, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {d.subject}
              </text>
              <text x={bx + bw / 2} y={by + 31} textAnchor="middle"
                fill="#ffffff" fontSize="14" fontWeight="bold"
                style={{ fontFamily: 'Monograph, sans-serif' }}>
                {d.score}%
              </text>
            </g>
          )
        })()}

        {/* Labels */}
        {data.map((d, i) => {
          const lp = labelAt(i)
          return (
            <text key={i} x={lp.x} y={lp.y}
              textAnchor="middle" dominantBaseline="middle"
              fill={hovered === i ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.75)'}
              fontSize="11"
              style={{ fontFamily: 'Herkey, sans-serif', letterSpacing: '0.04em', transition: 'fill 0.15s' }}>
              {d.subject}
            </text>
          )
        })}
      </svg>
      {/* Mobile fallback pills for touch devices */}
      <div className="flex sm:hidden flex-wrap gap-1.5 justify-center mt-3 max-w-xs">
        {data.map((d) => (
          <span key={d.subject} className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white/80 font-mono">
            {d.subject}: <strong className="text-white">{d.score}%</strong>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 px-6">
      <MagicBentoStyles glowColor={DEFAULT_GLOW_COLOR} />
      
      {isVisible && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={false}
          enabled={true}
          spotlightRadius={400}
          glowColor={DEFAULT_GLOW_COLOR}
        />
      )}

      <div className="max-w-6xl mx-auto bento-section" ref={gridRef}>
        {/* Header */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-white/60 font-body">
            What I do
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3 text-white font-heading">
            Skills & Expertise
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto font-body">
            Technologies and tools I use to bring products to life.
          </p>
        </div>

        {/* Radar + Tech grid wrapped with GLOW CARDS */}
        <div className={`grid lg:grid-cols-2 gap-10 items-stretch ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`}
          style={{ animationDelay: '0.2s' }}>

          {/* Radar chart Inside Glow Card */}
          <ParticleCard 
            className="card flex flex-col items-center justify-center glass-card rounded-[32px] p-4 sm:p-8 border border-white/10 card--border-glow w-full pointer-events-auto min-h-[460px] h-auto"
            style={{
              '--glow-intensity': '0',
              '--glow-radius': '300px'
            }}
            particleCount={20}
            glowColor={DEFAULT_GLOW_COLOR}
            enableTilt={false} // Radar SVG hovers are delicate
            clickEffect={true}
            disableAnimations={false}
          >
            <h3 className="text-lg font-bold text-white mb-2 self-start font-heading tracking-wider">
              Skill Radar
            </h3>
            <RadarChart data={radarData} size={300} />
          </ParticleCard>

          {/* Tech stack grid Inside Glow Grid */}
          <div className="grid grid-cols-2 gap-4">
            {techStacks.map((stack, i) => (
              <ParticleCard
                key={i}
                className="card flex flex-col glass-card rounded-2xl p-5 border border-white/10 card--border-glow cursor-default h-full"
                style={{
                  '--glow-intensity': '0',
                  '--glow-radius': '150px'
                }}
                particleCount={8}
                glowColor={DEFAULT_GLOW_COLOR}
                enableTilt={false} 
                clickEffect={true}
              >
                <div style={{ animationDelay: `${0.1 * i + 0.3}s` }}>
                  <p className="text-xs tracking-widest uppercase text-white/50 mb-4 font-bold font-body">
                    {stack.category}
                  </p>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {stack.items.map((item) => (
                      <span key={item}
                        className="px-3 py-1.5 rounded-lg text-[11px] text-white/80 bg-white/10 hover:bg-white/20 hover:text-white transition-all pointer-events-auto z-20 font-body">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </ParticleCard>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}