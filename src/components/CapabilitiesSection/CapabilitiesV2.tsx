import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './CapabilitiesV2.css'

// Card images
import cefPsImg from '../../assets/cef-ps-placeholder.svg'
import npapImg from '../../assets/What we help/Location decisions.webp'
import policyImg from '../../assets/What we help/Operational decisions.webp'
import futureImg from '../../assets/What we help/Investment Decisions.webp'

interface CardData {
  title: string
  subtitle?: string
  description: string
  image: string
  link?: string
  tag?: string
  buttonText?: string
}

const defaultCards: CardData[] = [
  {
    tag: 'Flagship Project',
    title: 'CEF-PS',
    subtitle: 'Establishing a Circular Economy Framework for the Plastic Sector in Ghana',
    description: 'A national project supporting policy development, capacity building, pilot projects, technology transfer, knowledge management, monitoring and replication.',
    image: cefPsImg,
    buttonText: 'View Programme',
    link: '/cef-ps',
  },
  {
    tag: 'National Partnership',
    title: 'National Plastic Action Partnership',
    description: 'A collaborative platform supporting national action, stakeholder coordination and implementation of plastic-management priorities.',
    image: npapImg,
    buttonText: 'View Programme',
    link: '#',
  },
  {
    tag: 'Policy Implementation',
    title: 'National Plastic Management Policy Implementation',
    description: 'Policies, programmes and institutional actions supporting the implementation of Ghana’s national plastic-management direction.',
    image: policyImg,
    buttonText: 'View Programme',
    link: '#',
  },
  {
    tag: 'Future Growth',
    title: 'Future Initiatives',
    description: 'A flexible area for additional government, donor-funded, private-sector or regional programmes.',
    image: futureImg,
    buttonText: 'View Programme',
    link: '#',
  },
]

function CapabilitiesV2({ hideHeader = false, customCards }: { hideHeader?: boolean; customCards?: CardData[] }) {
  const cards = customCards || defaultCards
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('capv2__card--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )

    grid.querySelectorAll('.capv2__card').forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [cards])

  return (
    <section className="capv2" id="programmes">
      {!hideHeader && (
        <div className="capv2__header">
          <div className="capv2__header-left">
            <div className="capv2__badge">
              <span>PROGRAMMES AND PROJECTS</span>
            </div>
            <h2 className="capv2__heading">
              Programmes Driving the Transition
            </h2>
          </div>
          <p className="capv2__sub">
            CEF-PS coordinates and showcases programmes that contribute to Ghana’s circular-plastics objectives.
          </p>
        </div>
      )}

      <div className="capv2__grid" ref={gridRef}>
        {cards.map((card, i) => (
          <div className="capv2__card" key={i}>
            <div className="capv2__card-img-wrap">
              {card.image ? (
                <img src={card.image} alt={card.title} className="capv2__card-img" />
              ) : (
                <div className="capv2__card-placeholder" />
              )}
            </div>
            {card.tag && <span className="capv2__card-tag">{card.tag}</span>}
            <h3 className="capv2__card-title">{card.title}</h3>
            {card.subtitle && (
              <div className="capv2__card-subtitle">{card.subtitle}</div>
            )}
            <p className="capv2__card-desc">{card.description}</p>
            {card.link && card.link !== '#' ? (
              <Link to={card.link} className="capv2__card-cta">
                {card.buttonText || 'View Programme'} <span className="capv2__card-cta-arrow">→</span>
              </Link>
            ) : (
              <a href="#" className="capv2__card-cta">
                {card.buttonText || 'View Programme'} <span className="capv2__card-cta-arrow">→</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default CapabilitiesV2
