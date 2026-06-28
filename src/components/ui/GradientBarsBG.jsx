
import React, { useMemo } from "react"

export default function GradientBarsBG(props) {
    const {
        numBars = 15,
        gradientColor = "rgba(77, 33, 105, 0.8)", // Matching the #4d2169 Silk component color
        backgroundColor = "#0a0a0a", // Matched to site background
        animationDuration = 2,
        direction = "bottom-to-top",
        style,
    } = props

    const resolvedGradientColor = useMemo(() => {
        if (typeof window === "undefined") return gradientColor
        const div = document.createElement("div")
        div.style.color = gradientColor
        document.body.appendChild(div)
        const rgb = getComputedStyle(div).color
        document.body.removeChild(div)
        return rgb
    }, [gradientColor])

    const calculateHeight = (index, total) => {
        const position = index / (total - 1)
        const maxHeight = 100
        const minHeight = 30
        const center = 0.5
        const distanceFromCenter = Math.abs(position - center)
        const heightPercentage = Math.pow(distanceFromCenter * 2, 1.2)
        return minHeight + (maxHeight - minHeight) * heightPercentage
    }

    return (
        <>
            <style>{`
                @keyframes pulseBar {
                    0% { transform: scaleY(var(--initial-scale)); }
                    100% { transform: scaleY(calc(var(--initial-scale) * 0.7)); }
                }
            `}</style>

            <section
                style={{
                    ...style,
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    backgroundColor,
                    zIndex: 0,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            height: "100%",
                            width: "100%",
                            transform: "translateZ(0)",
                            backfaceVisibility: "hidden",
                            WebkitFontSmoothing: "antialiased",
                            gap: 0,
                            flexDirection:
                                direction === "left-to-right"
                                    ? "row"
                                    : direction === "right-to-left"
                                        ? "row-reverse"
                                        : "row",
                        }}
                    >
                        {Array.from({ length: numBars }).map((_, index) => {
                            const height = calculateHeight(index, numBars)
                            let gradientDir = "to top"
                            let transform = `scaleY(${height / 100})`
                            let transformOrigin = "bottom"
                            if (direction === "top-to-bottom") {
                                gradientDir = "to bottom"
                                transformOrigin = "top"
                            } else if (direction === "left-to-right") {
                                gradientDir = "to right"
                                transform = `scaleX(${height / 100})`
                                transformOrigin = "left"
                            } else if (direction === "right-to-left") {
                                gradientDir = "to left"
                                transform = `scaleX(${height / 100})`
                                transformOrigin = "right"
                            }
                            return (
                                <div
                                    key={index}
                                    style={{
                                        flex: 1,
                                        height: "100%",
                                        background: `linear-gradient(${gradientDir}, ${resolvedGradientColor}, transparent)`,
                                        transform,
                                        transformOrigin,
                                        transition: "transform 0.5s ease-in-out",
                                        animation: `pulseBar ${animationDuration}s ease-in-out infinite alternate`,
                                        animationDelay: `${index * 0.1}s`,
                                        boxSizing: "border-box",
                                        marginLeft: index > 0 ? "-1px" : "0",
                                        "--initial-scale": height / 100,
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}
