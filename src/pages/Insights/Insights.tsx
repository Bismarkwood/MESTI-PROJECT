import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import InsightsSection from '../../components/InsightsSection'
import JoinCta from '../../components/JoinCta'
import SEO from '../../components/SEO'
import insightHeroImg1 from '../../assets/Insight/Screenshot_2026-07-02_075619.webp'
import insightHeroImg2 from '../../assets/Insight/Card 2.webp'
import insightHeroImg3 from '../../assets/Insight/Card 3.webp'
import './Insights.css'

const filters = ['All', 'Blog', 'Insights', 'Whitepapers']

const heroSlides = [
  {
    image: insightHeroImg1,
    badge: 'FEATURED',
    date: 'JULY 2026',
    headline: "The hidden geography of Ghana's investment risk.",
    excerpt: "The land Ghana's private sector is betting on is not always the land it thinks it is buying. How spatial blind spots cost developers and investors across Accra's fastest-growing corridors.",
    slug: 'hidden-geography-ghana-investment-risk',
  },
  {
    image: insightHeroImg2,
    badge: 'RESEARCH',
    date: 'JUNE 2026',
    headline: "Why Ghana's loan portfolios carry invisible climate exposure.",
    excerpt: "Banks are lending against assets in flood zones, erosion corridors, and heat-stressed agricultural belts without a single spatial data point in their risk models.",
    slug: 'loan-portfolio-geography',
  },
  {
    image: insightHeroImg3,
    badge: 'ANALYSIS',
    date: 'MAY 2026',
    headline: "Where Accra is growing next, and what the data says about it.",
    excerpt: "Satellite imagery, population density shifts, and infrastructure spend patterns reveal the corridors that will define Greater Accra's next decade of growth.",
    slug: 'where-accra-growing-next',
  },
]

function Insights() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = heroSlides[currentSlide]

  return (
    <main>
      <SEO
        title="Insights | BigData Ghana — Ghana Through A Data Lens"
        description="Insights on land, climate risk, urban growth, agriculture, infrastructure, AI, cloud and the decisions shaping Ghana's future. Research and analysis from BigData Ghana."
        path="/insights"
      />
      <Navbar />
      <section className="insights-hero">
        {heroSlides.map((s, i) => (
          <img
            key={i}
            src={s.image}
            alt=""
            className={`insights-hero__bg ${i === currentSlide ? 'insights-hero__bg--active' : ''}`}
          />
        ))}
        <div className="insights-hero__overlay" />
        <div className="insights-hero__content">
          <div className="insights-hero__meta">
            <span className="insights-hero__badge">{slide.badge}</span>
            <span className="insights-hero__date">{slide.date}</span>
          </div>
          <h1 className="insights-hero__headline">{slide.headline}</h1>
          <p className="insights-hero__excerpt">{slide.excerpt}</p>
          <Link to={`/insights/${slide.slug}`} className="insights-hero__read">
            Read Article →
          </Link>
        </div>

        {/* Carousel indicators */}
        <div className="insights-hero__indicators">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`insights-hero__dot ${i === currentSlide ? 'insights-hero__dot--active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="insights-hero__label">
          <span>INSIGHTS & IDEAS</span>
        </div>
      </section>

      {/* Filter tags */}
      <div className="insights-hero__filters">
        <div className="insights-hero__search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
          </svg>
        </div>
        {filters.map((filter) => (
          <button
            key={filter}
            className={`insights-hero__filter-btn ${activeFilter === filter ? 'insights-hero__filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <InsightsSection activeFilter={activeFilter} />
      <JoinCta />
      <Footer />
    </main>
  )
}

export default Insights
