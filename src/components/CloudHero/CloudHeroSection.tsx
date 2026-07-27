import cloudHeroBg from '../../assets/Cloud Platform/Cloud Platform.webp'
import './CloudHeroSection.css'

function CloudHeroSection() {
  return (
    <section className="cloud-hero-webgl">
      {/* Background image */}
      <div
        className="cloud-hero-webgl__bg"
        style={{ backgroundImage: `url(${cloudHeroBg})` }}
      />
      <div className="cloud-hero-webgl__overlay" />

      {/* Hero text */}
      <div className="cloud-hero-webgl__content">
        <h1 className="cloud-hero-webgl__title">Cloud and data platforms</h1>
        <div className="cloud-hero-webgl__divider" />
        <p className="cloud-hero-webgl__sub">
          BDG designs, migrates, secures, and manages cloud infrastructure built for scale.
        </p>
        <div className="cloud-hero-webgl__scroll">
          <div className="cloud-hero-webgl__scroll-line">
            <div className="cloud-hero-webgl__scroll-dot" />
          </div>
          <span className="cloud-hero-webgl__scroll-text">Scroll</span>
        </div>
      </div>
    </section>
  )
}

export default CloudHeroSection
