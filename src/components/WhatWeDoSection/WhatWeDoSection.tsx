import img1 from '../../assets/What we help/Location decisions.webp'
import img2 from '../../assets/What we help/Investment Decisions.webp'
import img3 from '../../assets/What we help/Risk Descision.webp'
import img4 from '../../assets/What we help/Operational decisions.webp'
import './WhatWeDoSection.css'

const focusCards = [
  {
    title: 'Policy and Governance',
    desc: 'Supporting policies, standards and institutional coordination for circular plastics management.',
    image: img1,
  },
  {
    title: 'Circular Business and Innovation',
    desc: 'Promoting technologies, enterprises and sustainable business models across the value chain.',
    image: img2,
  },
  {
    title: 'Collection and Recycling',
    desc: 'Strengthening collection, sorting, recovery and recycling systems nationwide.',
    image: img3,
  },
  {
    title: 'Data and Awareness',
    desc: 'Improving plastic-sector data, research and public education for informed decisions.',
    image: img4,
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
              <div className="focus-areas__card-image">
                <img src={card.image} alt={card.title} />
                <span className="focus-areas__card-num">0{index + 1}</span>
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
