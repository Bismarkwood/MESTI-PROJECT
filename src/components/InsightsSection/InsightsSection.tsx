import { Link } from 'react-router-dom'
import img1 from '../../assets/Insight/Screenshot_2026-07-02_075619.webp'
import img2 from '../../assets/Insight/Card 2.webp'
import img3 from '../../assets/Insight/Card 4.webp'
import img4 from '../../assets/Insight/Card 5.webp'
import './InsightsSection.css'

const cards = [
  {
    tag: 'Knowledge Hub',
    heading: 'Policies and Frameworks',
    desc: 'National policies enabling responsible plastic management across Ghana.',
    cta: 'Browse',
    image: img1,
  },
  {
    tag: 'Knowledge Hub',
    heading: 'Technical Guidelines',
    desc: 'Research publications and sector assessments for evidence-based decisions.',
    cta: 'View',
    image: img2,
  },
  {
    tag: 'News',
    heading: 'Programme Updates',
    desc: 'Latest activities and announcements from CPF Ghana programmes.',
    cta: 'Read',
    image: img3,
  },
  {
    tag: 'Opportunities',
    heading: 'Training and Funding',
    desc: 'Open calls, capacity building and upcoming sector events.',
    cta: 'Explore',
    image: img4,
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
            Access policies, research, and the latest from CPF Ghana.
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
