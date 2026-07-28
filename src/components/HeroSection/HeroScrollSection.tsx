/* eslint-disable react-hooks/purity, react-hooks/immutability, react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import HeroCTA from '../HeroCTA'
import heroSlides from './heroSlides'
import unidoLogo from '../../assets/UNIDO.webp'
import epaLogo from '../../assets/EPA.webp'
import './HeroScrollSection.css'

export interface HeroScrollSectionProps {
  badge?: string;
  title?: string;
  desc?: string;
  primaryCta?: { text: string; href: string; onClick?: () => void };
  secondaryCta?: { text: string; href: string };
  hideFloatingBar?: boolean;
}

function HeroScrollSection({
  badge = 'A National Platform for Circular Plastics',
  title = 'Closing the Loop on Plastics in Ghana',
  desc = 'CEF-PS Ghana brings together government, businesses, innovators, development partners, researchers and communities to reduce plastic pollution and accelerate Ghana’s transition towards a circular plastics economy.',
  primaryCta = { text: 'Explore the Framework', href: '#about-cefps' },
  secondaryCta = { text: 'Discover Programmes', href: '#programmes' },
  hideFloatingBar = false,
}: HeroScrollSectionProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero-scroll">
      {/* Background images — auto cycle */}
      <div className="hero-scroll__bg-layers">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`hero-scroll__bg-layer ${i === activeIndex ? 'active' : ''}`}
          >
            <div
              className="hero-scroll__bg-img"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            />
          </div>
        ))}
        <div className="hero-scroll__overlay" />
      </div>

      {/* Content */}
      <div className="hero-scroll__content">
        <div className="hero-scroll__left">
          {badge && (
            <div className="hero-scroll__badge" style={{ display: 'inline-block', background: 'rgba(255, 255, 255, 0.15)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '18px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.25)', letterSpacing: '0.5px' }}>
              {badge}
            </div>
          )}
          <h1 className="hero-scroll__title" style={{ fontSize: '3.4rem', lineHeight: '1.15', marginBottom: '20px' }}>
            {title}
          </h1>
          <p className="hero-scroll__desc" style={{ fontSize: '1.15rem', lineHeight: '1.6', maxWidth: '640px', marginBottom: '32px' }}>
            {desc}
          </p>
          <div className="hero-scroll__cta-wrap" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {primaryCta.onClick ? (
              <button type="button" onClick={primaryCta.onClick} style={{ padding: '14px 24px', background: '#005e3f', color: '#fff', borderRadius: '50px', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {primaryCta.text}
              </button>
            ) : (
              <HeroCTA text={primaryCta.text} href={primaryCta.href} variant="primary" />
            )}
            {secondaryCta && (
              <HeroCTA text={secondaryCta.text} href={secondaryCta.href} variant="secondary" />
            )}
          </div>
        </div>
      </div>

      {/* Floating Bar with Black Glass Transparent BG */}
      {!hideFloatingBar && (
        <div className="hero-scroll__floating-bar">
          <span className="hero-scroll__floating-title">FUNDED BY</span>
          <div className="hero-scroll__floating-divider" />
          <div className="hero-scroll__floating-logos">
            <img src={unidoLogo} alt="UNIDO" />
            <img src={epaLogo} alt="EPA" />
          </div>
        </div>
      )}
    </div>
  )
}

export default HeroScrollSection
