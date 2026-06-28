const MARQUEE_TEXT =
    '// Communication // Problem-Solving // Collaboration // Adaptability // Time Management // Critical Thinking // Responsibility // Continuous Learning // Emotional Intelligence // Conflict Resolution '

export default function MarqueeStrip() {
    return (
        <div
            style={{
                width: '100%',
                overflow: 'hidden',
                background: '#000000',
                padding: '14px 0',
                position: 'relative',
                zIndex: 2,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    animation: 'marquee-scroll 10s linear infinite',
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
        </div>
    )
}
