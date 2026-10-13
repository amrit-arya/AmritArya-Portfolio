import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Botcheck honeypot check: If hidden field was altered by automated spam bot, abort immediately
    const formElements = e.target.elements
    if (formElements.botcheck && (formElements.botcheck.checked || formElements.botcheck.value)) {
      setStatus({ type: 'success', message: 'Thank you for your message! I will get back to you soon.' })
      return
    }
    
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    
    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      setStatus({
        type: 'error',
        message: 'Form submission endpoint is not configured. Please add your Web3Forms Access Key to the .env file.'
      })
      return
    }

    setStatus({ type: 'sending', message: 'Sending message...' })

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Contact Submission from ${formData.name}`,
          from_name: `${formData.name} via Portfolio`,
          botcheck: ''  // Web3Forms honeypot — bots fill this, humans don't
        })
      })

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you for your message! I will get back to you soon.'
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again later.'
        })
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please check your internet connection and try again.'
      })
    }
  }

  const socials = [
    { name: 'GitHub', href: 'https://github.com/amrit-arya', icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/amrit-arya/', icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
    { name: 'Twitter', href: 'https://x.com', icon: <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /> },
  ]

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6">
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-pink/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`}>
          <span className="text-sm font-semibold tracking-widest uppercase text-white/70">Reach out</span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mt-3">Get In Touch</h2>
          <p className="mt-6 text-white/70 max-w-lg mx-auto">Have a project in mind? Let's create something amazing together.</p>
        </div>

        <div className={`glass-card rounded-3xl p-8 sm:p-12 gradient-border ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`} style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Web3Forms honeypot — hidden from users, bots fill it and get rejected */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm text-white/70 mb-2 font-medium">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 transition-all duration-300 hover:border-white/20 focus:border-sky/50"
                  placeholder="Amrit Arya"
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm text-white/70 mb-2 font-medium">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 transition-all duration-300 hover:border-white/20 focus:border-sky/50"
                  placeholder="arya@gmail.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm text-white/70 mb-2 font-medium">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                maxLength={5000}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 transition-all duration-300 hover:border-white/20 focus:border-sky/50 resize-none"
                placeholder="I'm interested in..."
                required
              />
            </div>
            {status.message && (
              <div role="status" aria-live="polite" className={`p-4 rounded-xl text-sm border flex items-start gap-3 backdrop-blur-md ${
                status.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300' 
                  : status.type === 'error' 
                  ? 'bg-rose-500/10 border-rose-500/25 text-rose-300'
                  : 'bg-blue-500/10 border-blue-500/25 text-blue-300'
              }`}>
                {status.type === 'success' ? (
                  <svg className="w-5 h-5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 shrink-0 text-rose-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                <span>{status.message}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={status.type === 'sending'}
              className={`w-full sm:w-auto px-10 py-4 rounded-xl bg-white text-black font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-sky/20 hover:scale-105 btn-glow cursor-pointer flex items-center justify-center gap-2 ${
                status.type === 'sending' ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
              }`}
            >
              {status.type === 'sending' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>

          {/* Social links */}
          <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center gap-4">
            {socials.map((s) => (
              <a key={s.name} href={s.href} aria-label={s.name} className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{s.icon}</svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}