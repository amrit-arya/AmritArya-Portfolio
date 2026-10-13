import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: 'GASMIND',
    description: 'An intelligent by-product gas management platform for real-time generation, consumption, gas balance monitoring, and what-if impact simulation.',
    tags: ['TypeScript', 'React Js', 'Data Analytics'],
    color: 'from-lavender to-pink',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: 'Cyber Sentinel',
    description: 'A full-stack CCTV Security Scanning Platform with encrypted RTSP scanning, real-time threat monitoring, camera management, and a modern React-based dashboard.',
    tags: ['React Js', 'Python', 'Tailwind CSS'],
    color: 'from-lavender to-pink',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    title: 'Virasat',
    description: 'This is a comprehensive digital legacy management platform that helps users securely store and manage important documents, assets, and information for their beneficiaries.',
    tags: ['React Js', 'Node Js', 'MongoDB', 'JWT'],
    color: 'from-pink to-rose',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    title: 'VOX',
    description: 'Vox is an end-to-end system that translates sign language gestures into text and speech in real-time.',
    tags: ['Python', 'Open CV', 'Mediapipe', 'Tensorflow'],
    color: 'from-rose to-light-blue',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Railway Management System',
    description: 'A centralized railway reservation and operations management system designed with automated seat allocation, scheduling, and MySQL transactional data storage.',
    tags: ['Python', 'MySQL'],
    color: 'from-light-blue to-sky',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m13.5 0a1.5 1.5 0 0 1-3 0m-7.5 0h7.5m-10.5-3.75h13.5m-13.5-3.75h13.5M6 3.75h12a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6A2.25 2.25 0 0 1 6 3.75Zm-2 16.5 2-1.5m14 1.5-2-1.5" />
      </svg>
    ),
  }
]

export default function Projects() {
  const sectionRef = useRef(null)
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
    <section id="projects" ref={sectionRef} className="relative py-32 px-6">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-pink/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-sky/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-white/70 font-body">My portfolio</span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mt-3">
            Featured Projects
          </h2>
          <p className="mt-6 text-white/70 max-w-xl mx-auto font-body">
            Here are some projects I've worked on. Each one was an opportunity to learn and grow.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl glass-card hover:shadow-lavender/5 ${
                isVisible ? 'animate-fade-in-up' : 'scroll-hidden'
              }`}
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              {/* Top gradient bar */}
              <div className="h-px bg-white/15" />

              <div className="p-6">
                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 bg-white/10 text-white/80">
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold transition-colors text-white/90 group-hover:text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-5 transition-colors text-white/70 group-hover:text-white/80 font-body">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-medium transition-all bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white/70 font-body"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <a
                    href={project.demoUrl || "https://github.com/amrit-arya"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors text-white/75 hover:text-sky font-body"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                  <a
                    href={project.sourceUrl || "https://github.com/amrit-arya"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors text-white/75 hover:text-lavender font-body"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Source
                  </a>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}