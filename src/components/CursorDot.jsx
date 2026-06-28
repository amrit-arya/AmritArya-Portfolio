import { useEffect, useRef } from 'react'

export default function CursorDot() {
    const dotRef = useRef(null)

    useEffect(() => {
        const dot = dotRef.current
        if (!dot) return

        const onMove = (e) => {
            dot.style.left = e.clientX + 'px'
            dot.style.top = e.clientY + 'px'
        }

        const onEnter = () => dot.classList.add('hovering')
        const onLeave = () => dot.classList.remove('hovering')

        window.addEventListener('mousemove', onMove)

        // Grow cursor on interactive elements
        const observe = () => {
            document.querySelectorAll('a, button, input, textarea, [role="button"]').forEach((el) => {
                el.addEventListener('mouseenter', onEnter)
                el.addEventListener('mouseleave', onLeave)
            })
        }

        observe()
        const mo = new MutationObserver(observe)
        mo.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', onMove)
            mo.disconnect()
        }
    }, [])

    return <div ref={dotRef} className="cursor-dot" />
}
