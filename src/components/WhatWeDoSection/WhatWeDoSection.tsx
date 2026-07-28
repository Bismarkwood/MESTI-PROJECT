import { BookOpen, Briefcase, Recycle, BarChart } from 'lucide-react'
import './WhatWeDoSection.css'

const focusCards = [
  {
    title: 'Policy and Governance',
    desc: 'Supporting policies, standards and institutional coordination for circular plastics management.',
    icon: BookOpen,
  },
  {
    title: 'Circular Business and Innovation',
    desc: 'Promoting technologies, enterprises and sustainable business models across the value chain.',
    icon: Briefcase,
  },
  {
    title: 'Collection and Recycling',
    desc: 'Strengthening collection, sorting, recovery and recycling systems nationwide.',
    icon: Recycle,
  },
  {
    title: 'Data and Awareness',
    desc: 'Improving plastic-sector data, research and public education for informed decisions.',
    icon: BarChart,
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
          <p className="focus-areas__subtitle">
            From policy to collection, recycling to public awareness — we work across every stage of Ghana's plastics ecosystem.
          </p>
        </div>

        <div className="focus-areas__grid">
          {focusCards.map((card, index) => (
            <div className="focus-areas__card" key={index}>
              <div className="focus-areas__card-icon">
                <card.icon size={48} strokeWidth={1.5} color="var(--cefps-green-mid)" />
              </div>
              <div className="focus-areas__card-body">
                <h3 className="focus-areas__card-title">{card.title}</h3>
                <p className="focus-areas__card-desc">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDoSection
