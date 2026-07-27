import bgImage from '../../assets/cta-banner-bg.jpg'
import './JoinCta.css'

interface JoinCtaProps {
  heading?: string;
  description?: string;
}

function JoinCta({ 
  heading = "Be Part of Ghana’s Circular-Plastics Transition",
  description = "Businesses, researchers, development partners, public institutions and communities all have a role to play."
}: JoinCtaProps) {
  return (
    <section className="banner-cta" id="get-involved">
      {/* Background Image filling full width */}
      <div 
        className="banner-cta__bg" 
        style={{ backgroundImage: `url(${bgImage})` }} 
      />
      
      {/* Solid Black / Dark-Green Overlay (No Gradient) */}
      <div className="banner-cta__overlay" />
      
      {/* Subtle SVG Circular-Plastics Pattern */}
      <div className="banner-cta__pattern" aria-hidden="true">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="500" cy="100" r="240" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" strokeDasharray="10 10" />
          <circle cx="500" cy="100" r="160" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1.5" />
          <circle cx="100" cy="500" r="260" stroke="rgba(212, 160, 23, 0.08)" strokeWidth="1.5" strokeDasharray="14 14" />
          <circle cx="100" cy="500" r="180" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="banner-cta__content">
        <h2 className="banner-cta__heading">
          {heading}
        </h2>
        
        <p className="banner-cta__desc">
          {description}
        </p>
        
        <div className="banner-cta__buttons">
          <a href="/contact" className="banner-cta__btn banner-cta__btn--primary">
            Contact CPF Ghana
          </a>
        </div>
      </div>
    </section>
  )
}

export default JoinCta
