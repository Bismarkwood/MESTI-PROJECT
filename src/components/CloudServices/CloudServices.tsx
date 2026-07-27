import { useEffect, useRef } from 'react'
import awsImg from '../../assets/Cloud Platform/Cloud Platform.webp'
import cloudImg from '../../assets/capabilities/big-data-data-cloud.webp'
import analyticsImg from '../../assets/capabilities/Data analytics and AI.webp'
import geoImg from '../../assets/hero/Geospatial.webp'
import biImg from '../../assets/capabilities/Business intelligence.webp'
import heroImg from '../../assets/hero/hero section image 2.webp'
import './CloudServices.css'

const services = [
  { tag: 'Infrastructure · AWS', title: 'AWS cloud architecture and deployment', description: 'Design and deploy scalable AWS infrastructure tailored to your organisation\'s data and operational needs.', img: awsImg },
  { tag: 'Migration · Cloud', title: 'Cloud migration', description: 'Seamlessly move your systems, data and applications to the cloud with minimal disruption.', img: cloudImg },
  { tag: 'Operations · Support', title: 'Managed cloud support', description: 'Ongoing management, maintenance and optimisation of your cloud environment by certified experts.', img: analyticsImg },
  { tag: 'Monitoring · DevOps', title: 'Infrastructure monitoring', description: 'Real-time visibility into your systems with proactive alerting and performance dashboards.', img: geoImg },
  { tag: 'Recovery · Resilience', title: 'Backup and disaster recovery', description: 'Protect your data and ensure business continuity with automated backup and recovery systems.', img: biImg },
  { tag: 'Security · Compliance', title: 'Cloud security review', description: 'Identify vulnerabilities and harden your cloud environment against threats and compliance risks.', img: heroImg },
  { tag: 'Cost · Efficiency', title: 'Cost optimisation', description: 'Right-size resources and eliminate waste to reduce cloud spend without sacrificing performance.', img: awsImg },
  { tag: 'DevOps · CI/CD', title: 'DevOps and CI/CD setup', description: 'Automate your delivery pipelines to ship faster, reduce errors and improve team collaboration.', img: cloudImg },
  { tag: 'Hosting · Applications', title: 'Server and application hosting', description: 'Reliable, high-availability hosting for web applications, APIs and enterprise platforms.', img: analyticsImg },
  { tag: 'Database · API', title: 'Database and API deployment', description: 'Deploy and manage scalable databases and APIs that power your data-driven applications.', img: geoImg },
]

function CloudServices() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.cloud-services__card')
    if (!cards) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement
            const index = Number(card.dataset.index ?? 0)
            // Stagger: 80ms per card, reset by row of 4
            const stagger = (index % 4) * 80
            card.style.animationDelay = `${stagger}ms`
            card.classList.add('is-visible')
            observer.unobserve(card)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="cloud-services">
      {/* Header */}
      <div className="cloud-services__header">
        <h2 className="cloud-services__heading">
          Services included
        </h2>
        <div className="cloud-services__header-right">
          <p className="cloud-services__sub">
            From cloud migration to managed operations, BDG delivers AWS-certified infrastructure that processes intelligence at speed.
          </p>
        </div>
      </div>

      {/* Services grid - 4 columns */}
      <div className="cloud-services__grid" ref={gridRef}>
        {services.map((service, i) => (
          <div className="cloud-services__card" key={i} data-index={i}>
            <div className="cloud-services__card-img-wrap">
              <img src={service.img} alt={service.title} className="cloud-services__card-img" />
            </div>
            <span className="cloud-services__card-tag">{service.tag}</span>
            <h3 className="cloud-services__card-title">{service.title}</h3>
            <p className="cloud-services__card-desc">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Bottom line */}
      <div className="cloud-services__line" />
    </section>
  )
}

export default CloudServices
