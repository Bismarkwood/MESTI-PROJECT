import { useEffect, useRef } from "react"
import "./WhatWeDoRole.css"

import coordinateImg from "../../assets/What we help/Location decisions.webp"
import supportImg    from "../../assets/What we help/Investment Decisions.webp"
import informImg     from "../../assets/What we help/Risk Descision.webp"
import trackImg      from "../../assets/What we help/Operational decisions.webp"

const roles = [
  {
    number: "01",
    verb: "Coordinate",
    description:
      "Bring public institutions, businesses, development partners and communities together around shared priorities.",
    image: coordinateImg,
  },
  {
    number: "02",
    verb: "Support",
    description:
      "Promote programmes, technologies, enterprises and partnerships that provide practical circular-plastics solutions.",
    image: supportImg,
  },
  {
    number: "03",
    verb: "Inform",
    description:
      "Improve access to policies, research, technical guidance and plastic-sector information.",
    image: informImg,
  },
  {
    number: "04",
    verb: "Track",
    description:
      "Support monitoring, learning and transparent reporting on programmes and national progress.",
    image: trackImg,
  },
]

function WhatWeDoRole() {
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = rowRef.current?.querySelectorAll(".wwd-role__card")
    if (!cards) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("wwd-role__card--visible")
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="wwd-role" id="what-we-do">

      {/* ── Top header ── */}
      <div className="wwd-role__header">
        <div className="wwd-role__header-left">
          <div className="wwd-role__badge"><span>Our Role</span></div>
          <h2 className="wwd-role__heading">What We Do</h2>
        </div>
        <p className="wwd-role__sub">
          CPF Ghana acts as a catalyst for national action — connecting
          stakeholders, surfacing solutions and keeping progress visible.
        </p>
      </div>

      {/* ── Cards row ── */}
      <div className="wwd-role__row" ref={rowRef}>
        {roles.map((role, i) => (
          <div className="wwd-role__card" key={i}>
            {/* Full-bleed image */}
            <img
              src={role.image}
              alt={role.verb}
              className="wwd-role__card-img"
              loading="lazy"
            />
            <div className="wwd-role__card-overlay" />

            {/* Content */}
            <div className="wwd-role__card-body">
              <span className="wwd-role__card-num">{role.number}</span>
              <h3 className="wwd-role__card-verb">{role.verb}</h3>
              <p className="wwd-role__card-desc">{role.description}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default WhatWeDoRole
