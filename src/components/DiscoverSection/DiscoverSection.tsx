import { Link } from 'react-router-dom'
import locationImg from '../../assets/What we help/Location decisions.webp'
import riskImg from '../../assets/What we help/Risk Descision.webp'
import operationalImg from '../../assets/What we help/Operational decisions.webp'
import investmentImg from '../../assets/What we help/Investment Decisions.webp'
import './DiscoverSection.css'

const steps = [
  {
    tag: 'LOCATION DECISIONS',
    icon: '📍',
    title: 'Location decisions',
    description: 'Know where to build, invest, expand or operate.',
    image: locationImg,
    num: '001',
    link: '/geospatial',
  },
  {
    tag: 'RISK DECISIONS',
    icon: '⚠️',
    title: 'Risk decisions',
    description: 'Identify climate, infrastructure, portfolio and operational risks before they become costly.',
    image: riskImg,
    num: '002',
    link: '/geospatial',
  },
  {
    tag: 'OPERATIONAL DECISIONS',
    icon: '⚙️',
    title: 'Operational decisions',
    description: 'Use cloud, AI, data platforms and analytics to improve visibility, efficiency and performance.',
    image: operationalImg,
    num: '003',
    link: '/cloud-platforms',
  },
  {
    tag: 'INVESTMENT DECISIONS',
    icon: '📈',
    title: 'Investment decisions',
    description: 'Commit capital with greater confidence and less uncertainty.',
    image: investmentImg,
    num: '004',
    link: '/data-analytics',
  },
]

function DiscoverSection() {
  return (
    <section className="discover">
      {/* Header */}
      <div className="discover__header">
        <h2 className="discover__heading">What we help<br />you do</h2>
        <p className="discover__sub">
          Whether you are choosing where to build, assessing risk, improving operations or planning growth — BDG turns complex data into insight you can act on.
        </p>
      </div>

      {/* Bottom cards */}
      <div className="discover__cards">
        {steps.map((step, i) => (
          <div className="discover__card" key={i}>
            <img src={step.image} alt={step.title} className="discover__card-bg" />
            <div className="discover__card-overlay" />
            <div className="discover__card-content">
              <h3 className="discover__card-title">{step.title}</h3>
              <p className="discover__card-desc">{step.description}</p>
              <Link to={step.link} className="discover__card-btn-primary">Learn More →</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default DiscoverSection
