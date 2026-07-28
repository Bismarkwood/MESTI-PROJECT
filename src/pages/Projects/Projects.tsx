import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { projectsData } from '../../data/projectsData'
import './Projects.css'

function Projects() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('projects__visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const cards = document.querySelectorAll('.projects__card')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  const projectList = Object.entries(projectsData)

  return (
    <main className="projects" ref={mainRef}>
      <Navbar light />

      {/* Hero Section */}
      <section className="projects__hero">
        <div className="projects__hero-inner">
          <h1 className="projects__title">Our Projects</h1>
          <p className="projects__subtitle">
            Exploring real-world solutions and innovations across our portfolio of projects.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects__grid-section">
        <div className="projects__grid">
          {projectList.map(([slug, project]) => (
            <Link to={`/solutions/${slug}`} key={slug} className="projects__card">
              <div className="projects__card-image">
                <img src={project.image} alt={project.name} />
              </div>
              <div className="projects__card-content">
                <span className="projects__card-year">{project.year}</span>
                <h3 className="projects__card-title">{project.name}</h3>
                <h4 className="projects__card-subtitle">{project.subtitle}</h4>
                <p className="projects__card-desc">
                  {project.description.slice(0, 150)}...
                </p>
                <div className="projects__card-services">
                  {project.services.split(', ').slice(0, 3).map((service, idx) => (
                    <span key={idx} className="projects__card-tag">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Projects
