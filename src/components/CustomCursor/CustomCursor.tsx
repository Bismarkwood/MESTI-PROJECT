import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      requestAnimationFrame(animate)
    }

    const handleHoverIn = () => setHovering(true)
    const handleHoverOut = () => setHovering(false)

    // Track interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], .proof-projects__card--clickable, .team-card')
      interactives.forEach(el => {
        el.addEventListener('mouseenter', handleHoverIn)
        el.addEventListener('mouseleave', handleHoverOut)
      })
    }

    window.addEventListener('mousemove', move)
    requestAnimationFrame(animate)

    // Initial + mutation observer for dynamic elements
    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${hovering ? 'cursor-dot--hover' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'cursor-ring--hover' : ''}`} />
    </>
  )
}

export default CustomCursor
