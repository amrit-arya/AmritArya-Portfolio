import { useEffect, useRef, useState } from 'react'

const educationData = [
  {
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Engineering',
    institution: 'ITER | SOA',
    year: '2024 - Present',
    description: 'Focused on data structures, algorithms, software engineering, and web development. Participated in hackathons and coding competitions.',
    gpa: '8.55 / 10',
    color: 'from-lavender to-pink',
  },
  {
    degree: 'Higher Secondary (XII)',
    field: 'Science - PCM',
    institution: 'D.A.V Public School, Bistupur',
    year: '2024',
    description: 'Completed higher secondary education with focus on Physics, Chemistry, and Mathematics.',
    gpa: '7.4 / 10',
    color: 'from-pink to-rose',
  },
  {
    degree: 'Secondary (X)',
    field: 'General Studies',
    institution: 'D.A.V Public School, Bistupur',
    year: '2022',
    description: 'Completed secondary education with distinction in Mathematics and Science.',
    gpa: '9.3 / 10',
    color: 'from-light-blue to-sky',
  },
]

export default function Education() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="education" ref={sectionRef} className="relative py-32 px-6">
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-lavender/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-sky/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-white/40">My Journey</span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mt-3">
            Education
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-white/15" />

          {educationData.map((item, i) => (
            <div
              key={i}
              className={`relative flex flex-col md:flex-row items-start mb-16 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } ${isVisible ? (i % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right') : (i % 2 === 0 ? 'scroll-hidden-left' : 'scroll-hidden-right')}`}
              style={{ animationDelay: `${0.3 * i}s` }}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#0a0a0a] z-10" />

              {/* Card */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] gradient-border group">
                  {/* Gradient top bar */}
                  <div className="h-px -mt-6 -mx-6 mb-5 bg-white/10" />

                  {/* Year badge */}
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-3 bg-white/10 text-white/70">
                    {item.year}
                  </span>

                  <h3 className="text-xl font-heading font-bold text-white/90 mb-1">
                    {item.degree}
                  </h3>
                  <p className="text-sm text-pink font-medium mb-1">{item.field}</p>
                  <p className="text-sm text-white/40 mb-3">{item.institution}</p>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{item.description}</p>

                  {/* GPA */}
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-sm text-white/60 font-medium">GPA: {item.gpa}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}