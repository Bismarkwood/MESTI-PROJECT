import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import GeoGlobe from './GeoGlobe'
import './GeoHeroSection.css'

function GeoHeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const content = contentRef.current
    if (!section || !canvas || !content) return

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / (section.offsetHeight * 0.6)))

      // Globe scales down and moves back
      canvas.style.transform = `scale(${1 - progress * 0.2}) translateY(${-progress * 60}px)`
      canvas.style.opacity = `${1 - progress * 0.6}`

      // Text fades and slides up
      content.style.transform = `translateX(-50%) translateY(${-progress * 80}px)`
      content.style.opacity = `${1 - progress * 1.5}`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="geo-hero-webgl" ref={sectionRef}>
      {/* Background layers */}
      <div className="geo-hero-webgl__grid" />
      <div className="geo-hero-webgl__glow" />
      <div className="geo-hero-webgl__vignette" />

      {/* WebGL Canvas */}
      <div className="geo-hero-webgl__canvas" ref={canvasRef}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <GeoGlobe />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.4}
              autoRotate
              autoRotateSpeed={0.3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom gradient for text readability */}
      <div className="geo-hero-webgl__bottom-fade" />

      {/* Hero text overlay */}
      <div className="geo-hero-webgl__overlay-content" ref={contentRef}>
        <h1 className="geo-hero-webgl__title">Geospatial intelligence</h1>
        <div className="geo-hero-webgl__divider" />
        <p className="geo-hero-webgl__sub">
          BDG turns Ghana's geography into competitive intelligence. Land, location, risk and opportunity — all visible before you commit.
        </p>
        <div className="geo-hero-webgl__scroll">
          <div className="geo-hero-webgl__scroll-line">
            <div className="geo-hero-webgl__scroll-dot" />
          </div>
          <span className="geo-hero-webgl__scroll-text">Scroll</span>
        </div>
      </div>
    </section>
  )
}

export default GeoHeroSection
