import { useEffect, useRef } from 'react'
import './ParticleCircle.css'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  speed: number
}

function ParticleCircle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // High DPI support
    const dpr = window.devicePixelRatio || 1
    const size = 300
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${size}px`
    canvas.style.height = `${size}px`
    ctx.scale(dpr, dpr)

    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 4

    // Create particles
    const particleCount = 80
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * radius * 0.85
      particles.push({
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
      })
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, size, size)

      // Update and draw particles
      particles.forEach((p) => {
        // Move
        p.x += p.vx * p.speed
        p.y += p.vy * p.speed

        // Slight orbit drift
        const dx = p.x - centerX
        const dy = p.y - centerY
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Keep within circle bounds
        if (dist > radius * 0.88) {
          const angle = Math.atan2(dy, dx)
          p.x = centerX + Math.cos(angle) * radius * 0.85
          p.y = centerY + Math.sin(angle) * radius * 0.85
          p.vx = -p.vx * 0.5 + (Math.random() - 0.5) * 0.3
          p.vy = -p.vy * 0.5 + (Math.random() - 0.5) * 0.3
        }

        // Gentle orbit influence
        p.vx += -dy * 0.00008
        p.vy += dx * 0.00008

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 40) {
            const opacity = (1 - dist / 40) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <div className="particle-circle">
      <canvas ref={canvasRef} className="particle-circle__canvas" />
    </div>
  )
}

export default ParticleCircle
