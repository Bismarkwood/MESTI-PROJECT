import { Link, useNavigate } from 'react-router-dom'
import './HeroCTA.css'

interface HeroCTAProps {
  text?: string
  href?: string
  variant?: 'primary' | 'secondary'
}

function HeroCTA({ text = 'Explore Our Work', href = '#work', variant = 'primary' }: HeroCTAProps) {
  const navigate = useNavigate()
  const isInternal = href.startsWith('/')

  const content = (
    <>
      <span className="hero-cta-text">{text}</span>
      <span className="hero-cta-circle">
        <span className="hero-cta-arrow">&#8599;</span>
      </span>
    </>
  )

  if (isInternal) {
    return (
      <button
        type="button"
        className={`hero-cta ${variant === 'secondary' ? 'hero-cta--secondary' : ''}`}
        onClick={() => navigate(href)}
      >
        {content}
      </button>
    )
  }

  return (
    <a href={href} className={`hero-cta ${variant === 'secondary' ? 'hero-cta--secondary' : ''}`}>
      {content}
    </a>
  )
}

export default HeroCTA
