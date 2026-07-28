import { FileText, Lightbulb, Recycle, BarChart3 } from 'lucide-react'
import './WhatWeDoSection.css'

const focusCards = [
  {
    title: 'Policy and Governance',
    desc: 'Supporting policies, standards and institutional coordination.',
    Icon: FileText,
  },
  {
    title: 'Circular Business',
    desc: 'Promoting technologies, enterprises and sustainable models.',
    Icon: Lightbulb,
  },
  {
    title: 'Collection and Recycling',
    desc: 'Strengthening collection, sorting, recovery and recycling.',
    Icon: Recycle,
  },
  {
    title: 'Data and Awareness',
    desc: 'Improving sector data, research and public education.',
    Icon: BarChart3,
  },
]

function WhatWeDoSection() {
  return (
    <section className="focus-areas" id="focus-areas">
      <div className="focus-areas__inner">
        <div className="focus-areas__header">
          <span className="focus-areas__badge">Our Focus</span>
          <h2 className="focus-areas__title">
            Supporting the Full Plastics Value Chain
          </h2>
        </div>

        <div className="focus-areas__grid">
          {focusCards.map((card, index) => (
            <div className="focus-areas__card" key={index}>
              <div className="focus-areas__card-icon">
                <card.Icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="focus-areas__card-title">{card.title}</h3>
              <p className="focus-areas__card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDoSection
