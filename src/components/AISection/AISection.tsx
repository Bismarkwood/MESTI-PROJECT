import { useState, useEffect } from 'react'
import ParticleWaveBackground from './ParticleWaveBackground'
import './AISection.css'

const slides = [
  {
    label: 'Cloud computing · AWS',
    text: 'Scale your operations on infrastructure built for growth, not just for today.',
  },
  {
    label: 'Data and AI automation',
    text: 'Unlock the growth that is already sitting in your data.',
  },
  {
    label: 'Business intelligence',
    text: 'See your entire business clearly and act on what matters most.',
  },
]

function AISection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentSlide = slides[activeIndex]

  return (
    <section className="ai-hero">
      <div className="ai-hero-stripes ai-hero-stripes--top" />
      <ParticleWaveBackground />
      <div className="ai-hero-overlay" />
      <div className="ai-hero-content">
        <span className="ai-hero-label" key={`label-${activeIndex}`}>
          {currentSlide.label}
        </span>
        <h2 key={`text-${activeIndex}`}>
          {currentSlide.text}
        </h2>
      </div>
      <div className="ai-hero-stripes ai-hero-stripes--bottom" />
    </section>
  )
}

export default AISection
