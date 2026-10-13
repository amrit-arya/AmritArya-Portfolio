import { useEffect, useRef } from 'react'

const vertexShaderSrc = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

const fragmentShaderSrc = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
varying vec2 vUv;
uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2 rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd     = noise(gl_FragCoord.xy);
  vec2  uv      = rotateUvs(vUv * uScale, uRotation);
  vec2  tex     = uv * uScale;
  float tOffset = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
    0.4 * sin(5.0 * (tex.x + tex.y +
      cos(3.0 * tex.x + 5.0 * tex.y) +
      0.02 * tOffset) +
      sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec3 col = uColor * pattern - rnd / 15.0 * uNoiseIntensity;
  gl_FragColor = vec4(col, 1.0);
}
`

function hexToRGB(hex) {
  hex = hex.replace('#', '')
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ]
}

function compileShader(gl, type, src) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function Silk({
  color = '#7b7481',
  speed = 2,
  scale = 1.2,
  noiseIntensity = 1.0,
  rotation = 0,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) return

    // Handle context loss gracefully
    const handleContextLost = (e) => e.preventDefault()
    canvas.addEventListener('webglcontextlost', handleContextLost, false)

    // Compile shaders
    const vert = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSrc)
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc)
    if (!vert || !frag) return

    const program = gl.createProgram()
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    // Full-screen quad
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )
    const aPos = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uColor = gl.getUniformLocation(program, 'uColor')
    const uSpeed = gl.getUniformLocation(program, 'uSpeed')
    const uScale = gl.getUniformLocation(program, 'uScale')
    const uRotation = gl.getUniformLocation(program, 'uRotation')
    const uNoise = gl.getUniformLocation(program, 'uNoiseIntensity')

    const rgb = hexToRGB(color)
    gl.uniform3f(uColor, rgb[0], rgb[1], rgb[2])
    gl.uniform1f(uSpeed, speed)
    gl.uniform1f(uScale, scale)
    gl.uniform1f(uRotation, rotation)
    gl.uniform1f(uNoise, noiseIntensity)

    // Resize handler: prevent reallocating canvas buffer on mobile address bar scroll
    let curW = 0
    let curH = 0
    const resize = () => {
      const newW = window.innerWidth
      const newH = window.innerHeight
      // Only resize if width changed or height changed significantly (ignoring ~100px mobile address bar shift)
      if (curW !== newW || Math.abs(curH - newH) > 120) {
        curW = newW
        curH = newH
        canvas.width = newW
        canvas.height = newH
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    // Render loop with time wrapping and visibility pausing
    let rafId
    let isRunning = true
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const render = (ts) => {
      if (!isRunning) return
      // Wrap time with modulo to prevent float precision breakdown on mobile GPUs
      const t = (ts * 0.001) % 1000.0
      gl.uniform1f(uTime, t)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // If user prefers reduced motion, render single frame and don't loop
      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(render)
      }
    }
    rafId = requestAnimationFrame(render)

    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false
        cancelAnimationFrame(rafId)
      } else {
        isRunning = true
        if (!prefersReducedMotion) {
          rafId = requestAnimationFrame(render)
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      isRunning = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      gl.deleteProgram(program)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
      gl.deleteBuffer(buf)
    }
  }, [color, speed, scale, noiseIntensity, rotation])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}