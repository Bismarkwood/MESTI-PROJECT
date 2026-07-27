import img1 from '../../assets/What we help/Location decisions.webp'
import img2 from '../../assets/What we help/Investment Decisions.webp'
import img3 from '../../assets/What we help/Risk Descision.webp'
import img4 from '../../assets/What we help/Operational decisions.webp'
import './WhatWeDoSection.css'

const focusCards = [
  {
    title: 'Policy and Governance',
    desc: 'Supporting policies, standards and institutional coordination.',
    image: img1,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    )
  },
  {
    title: 'Circular Business and Innovation',
    desc: 'Promoting technologies, enterprises and sustainable business models.',
    image: img2,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
    )
  },
  {
    title: 'Collection and Recycling',
    desc: 'Strengthening collection, sorting, recovery and recycling systems.',
    image: img3,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
    )
  },
  {
    title: 'Data and Awareness',
    desc: 'Improving plastic-sector data, research and public education.',
    image: img4,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
    )
  }
]

function WhatWeDoSection() {
  return (
    <section className="focus-areas" id="focus-areas">
      <div className="focus-areas__inner">
        {/* Header */}
        <div className="focus-areas__header">
          <div className="focus-areas__badge">
            <span>Our Focus</span>
          </div>
          <h2 className="focus-areas__title">
            Supporting the Full Plastics Value Chain
          </h2>
        </div>

        {/* 4 Large Cards Grid (2x2 on Desktop) */}
        <div className="focus-areas__grid">
          {focusCards.map((card, index) => (
            <div className="focus-areas__card" key={index}>
              <div className="focus-areas__card-top">
                <div className="focus-areas__icon-box">
                  {card.icon}
                </div>
                <span className="focus-areas__num">0{index + 1}</span>
              </div>
              
              <h3 className="focus-areas__card-title">{card.title}</h3>
              <p className="focus-areas__card-desc">{card.desc}</p>
              
              {/* Small Image Reveal on Hover */}
              <div className="focus-areas__card-reveal">
                <img src={card.image} alt={card.title} className="focus-areas__reveal-img" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDoSection
