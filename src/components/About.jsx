import { useEffect, useRef, useState } from 'react'

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const step = Math.ceil(target / 40)
          const timer = setInterval(() => {
            start += step
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(start)
            }
          }, 30)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

const stats = [
  { value: 9, suffix: '+', label: 'Projects Completed' },
  { value: 3, suffix: '+', label: 'Hackathons' },
  { value: 10, suffix: '+', label: 'Technologies' },
  { value: 100, suffix: '%', label: 'Dedication' },
]

export default function About() {
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
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-lavender/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sky/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-sky/80">Get to know me</span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mt-3 gradient-text">
            About Me
          </h2>
          <div className="mt-4 mx-auto w-20 h-1 rounded-full bg-white/30" />
        </div>

        {/* Content */}
        <div className={`max-w-3xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`} style={{ animationDelay: '0.2s' }}>
          <div className="glass-card rounded-3xl p-8 sm:p-10 gradient-border">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white/90 mb-6">
              A cloud enthusiast who loves building scalable software and watching
              <span className="text-pink"> containers behave.</span>
            </h3>
            <div className="space-y-4 text-white/75 leading-relaxed">
              <p>
                I'm <strong className="text-white">Amrit Arya</strong>, a Computer Science undergraduate at ITER, Siksha 'O' Anusandhan University, with a strong interest in <strong className="text-white">DevOps, cloud computing, and building scalable software systems</strong>. I enjoy working at the intersection of development and operations, where automation, collaboration, and continuous improvement help turn ideas into reliable products.
              </p>
              <p>
                My technical journey has involved building projects that combine <strong className="text-white">software development, machine learning, and security-focused systems</strong>. I developed <strong className="text-white">VOX</strong>, a real-time sign language–to–text translation system using computer vision to improve accessibility, and <strong className="text-white">Virasat</strong>, a secure digital legacy management platform designed to safely store and transfer sensitive data. I have also worked on <strong className="text-white">Cyber Sentinel</strong>, a cybersecurity monitoring dashboard that helps detect and visualize vulnerabilities in real time.
              </p>
              <p>
                Alongside technical projects, I actively contribute to tech communities as a <strong className="text-white">Core Media Team Member at Google Developers Group</strong>.
              </p>
              <p>
                I'm currently focused on deepening my skills in <strong className="text-white">cloud infrastructure, automation, and DevOps engineering</strong>, with the goal of contributing to high-impact systems and scalable platforms.
              </p>
            </div>

            {/* Quick info badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {['Python', 'Java', 'JavaScript', 'Docker', 'AWS', 'Git', 'MySQL', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl glass-card text-sm text-white/75 hover:text-white hover:border-sky/30 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`} style={{ animationDelay: '0.6s' }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group glass-card rounded-2xl p-6 text-center hover:scale-105 hover:border-lavender/25 gradient-border"
            >
              <div className="text-3xl sm:text-4xl font-heading font-bold gradient-text mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-white/70 group-hover:text-white/90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
