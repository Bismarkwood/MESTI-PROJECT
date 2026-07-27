import img1 from '../../assets/Insight/Screenshot_2026-07-02_075619.webp'
import img2 from '../../assets/Insight/Card 2.webp'
import img3 from '../../assets/Insight/Card 4.webp'
import img4 from '../../assets/Insight/Card 5.webp'
import './InsightsSection.css'

const cards = [
  {
    tag: 'Knowledge Hub',
    heading: 'Policies and Frameworks',
    desc: 'National policies and institutional frameworks enabling responsible plastic management across Ghana.',
    cta: 'Browse Policies',
    href: '#policies',
    image: img1,
    accent: '#1c7a4d',
  },
  {
    tag: 'Knowledge Hub',
    heading: 'Technical Guidelines and Reports',
    desc: 'Research publications, technical standards and sector assessments supporting evidence-based decisions.',
    cta: 'View Reports',
    href: '#reports',
    image: img2,
    accent: '#1c7a4d',
  },
  {
    tag: 'News and Events',
    heading: 'Programme Updates',
    desc: 'Latest news, activities and announcements from CPF Ghana programmes and stakeholder engagements.',
    cta: 'Read Updates',
    href: '#news',
    image: img3,
    accent: '#0f2b1f',
  },
  {
    tag: 'News and Events',
    heading: 'Opportunities and Training',
    desc: 'Open calls, funding opportunities, capacity building programmes and upcoming sector events.',
    cta: 'Explore Opportunities',
    href: '#opportunities',
    image: img4,
    accent: '#0f2b1f',
  },
]

function InsightsSection() {
  return (
    <section className="knowledge-updates" id="knowledge-hub">
      {/* Header */}
      <div className="knowledge-updates__header">
        <div className="knowledge-updates__header-left">
          <div className="knowledge-updates__badge">
            <span>Knowledge and Updates</span>
          </div>
          <h2 className="knowledge-updates__title">
            Resources, News and Opportunities
          </h2>
        </div>
        <p className="knowledge-updates__sub">
          Access policies, research, and the latest from CPF Ghana — all in one place.
        </p>
      </div>

      {/* 4 Cards — asymmetric layout */}
      <div className="knowledge-updates__grid">
        {cards.map((card, i) => (
          <a href={card.href} className="ku-card" key={i}>
            {/* Image */}
            <div className="ku-card__media">
              <img src={card.image} alt={card.heading} className="ku-card__img" />
              <div className="ku-card__media-overlay" />
            </div>
            {/* Body */}
            <div className="ku-card__body">
              <span className="ku-card__tag">{card.tag}</span>
              <h3 className="ku-card__heading">{card.heading}</h3>
              <p className="ku-card__desc">{card.desc}</p>
              <div className="ku-card__footer">
                <span className="ku-card__cta">
                  {card.cta}
                  <svg className="ku-card__arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default InsightsSection
