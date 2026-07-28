import { Link } from 'react-router-dom'
import './InsightsSection.css'
const cards = [
  {
    tag: 'Knowledge Hub',
    heading: 'Policies and Frameworks',
    desc: 'National policies enabling responsible plastic management across Ghana.',
    cta: 'Browse',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
  },
  {
    tag: 'Knowledge Hub',
    heading: 'Technical Guidelines',
    desc: 'Research publications and sector assessments for evidence-based decisions.',
    cta: 'View',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800',
  },
  {
    tag: 'News',
    heading: 'Programme Updates',
    desc: 'Latest activities and announcements from CEF-PS Ghana programmes.',
    cta: 'Read',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800',
  },
  {
    tag: 'Opportunities',
    heading: 'Training and Funding',
    desc: 'Open calls, capacity building and upcoming sector events.',
    cta: 'Explore',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
  },
]

function InsightsSection() {
  return (
    <section className="knowledge-updates" id="knowledge-hub">
      <div className="knowledge-updates__inner">
        <div className="knowledge-updates__header">
          <h2 className="knowledge-updates__title">
            Resources, News and Opportunities
          </h2>
          <p className="knowledge-updates__sub">
            Access policies, research, and the latest from CEF-PS Ghana.
          </p>
        </div>

        <div className="knowledge-updates__grid">
          {cards.map((card, i) => (
            <Link to="/knowledge-hub" className="ku-card" key={i}>
              <div className="ku-card__img-wrap">
                <img src={card.image} alt={card.heading} className="ku-card__img" />
              </div>
              <div className="ku-card__body">
                <span className="ku-card__tag">{card.tag}</span>
                <h3 className="ku-card__heading">{card.heading}</h3>
                <p className="ku-card__desc">{card.desc}</p>
                <span className="ku-card__cta">
                  {card.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InsightsSection
