import { Layers, Globe, ClipboardCheck, Rocket } from 'lucide-react'
import './CapabilitiesSection.css'

interface CardData {
  title: string
  subtitle?: string
  description: string
  buttonText: string
  visual?: string
}

const cards: CardData[] = [
  {
    title: 'CEF-PS',
    subtitle: 'Establishing a Circular Economy Framework for the Plastic Sector in Ghana',
    description: 'A national project supporting policy development, capacity building, pilot projects, technology transfer, knowledge management, monitoring and replication.',
    buttonText: 'View Programme',
    visual: 'geo',
  },
  {
    title: 'National Plastic Action Partnership',
    description: 'A collaborative platform supporting national action, stakeholder coordination and implementation of plastic-management priorities.',
    buttonText: 'View Programme',
    visual: 'cloud',
  },
  {
    title: 'National Plastic Management Policy Implementation',
    description: 'Policies, programmes and institutional actions supporting the implementation of Ghana’s national plastic-management direction.',
    buttonText: 'View Programme',
    visual: 'analytics',
  },
  {
    title: 'Future Initiatives',
    description: 'A flexible area for additional government, donor-funded, private-sector or regional programmes.',
    buttonText: 'View Programme',
    visual: 'bi',
  },
]

function CapabilitiesSection() {
  return (
    <section className="capabilities" id="programmes">
      <div className="capabilities__header">
        <div className="capabilities__header-left">
          <div className="capabilities__badge">
            <span>PROGRAMMES AND PROJECTS</span>
          </div>
          <h2 className="capabilities__heading">
            Programmes Driving the Transition
          </h2>
        </div>
        <p className="capabilities__sub">
          CEF-PS coordinates and showcases programmes that contribute to Ghana’s circular-plastics objectives.
        </p>
      </div>

      <div className="capabilities__grid">
        {cards.map((card, i) => (
          <div className="capabilities__card" key={i}>
            <div className="capabilities__card-visual">
              {card.visual === 'geo' ? (
                <Globe size={48} strokeWidth={1.5} color="var(--cefps-green-mid)" />
              ) : card.visual === 'cloud' ? (
                <Layers size={48} strokeWidth={1.5} color="var(--cefps-green-mid)" />
              ) : card.visual === 'analytics' ? (
                <ClipboardCheck size={48} strokeWidth={1.5} color="var(--cefps-green-mid)" />
              ) : card.visual === 'bi' ? (
                <Rocket size={48} strokeWidth={1.5} color="var(--cefps-green-mid)" />
              ) : (
                <div className="capabilities__card-placeholder">
                  <div className="capabilities__card-placeholder-inner" />
                </div>
              )}
            </div>
            <div className="capabilities__card-content">
              <h3 className="capabilities__card-title">{card.title}</h3>
              {card.subtitle && (
                <div className="capabilities__card-subtitle">{card.subtitle}</div>
              )}
              <p className="capabilities__card-desc">{card.description}</p>
              <a href="#" className="capabilities__card-cta">
                {card.buttonText} <span className="capabilities__card-cta-arrow">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CapabilitiesSection
