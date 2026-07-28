import { useParams, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import JoinCta from '../../components/JoinCta'
import forestTraceImg from '../../assets/cef-ps-placeholder.svg'
import './ProjectDetail.css'
import './ProjectCards.css'

import { projectsData } from '../../data/projectsData'

function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? projectsData[slug] : null
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('project-detail--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = main.querySelectorAll('.project-detail__section, .project-detail__image, .project-detail__image-split, .project-detail__related')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [project])

  if (!project) {
    return (
      <main>
        <Navbar />
        <div style={{ padding: '200px 48px 100px', textAlign: 'center' }}>
          <h1>Project not found</h1>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="project-detail" ref={mainRef}>
      <Navbar light />

      {/* Hero */}
      <section className="project-detail__hero">
        <div className="project-detail__title-wrap">
          <h1 className="project-detail__name">{project.name}</h1>
          <h2 className="project-detail__subtitle">{project.subtitle}</h2>
        </div>
        <p className="project-detail__desc">{project.description}</p>
      </section>

      {/* Meta row */}
      <div className="project-detail__meta">
        <div className="project-detail__meta-item">
          <span className="project-detail__meta-label">Year</span>
          <span className="project-detail__meta-value">{project.year}</span>
        </div>
        <div className="project-detail__meta-item">
          <span className="project-detail__meta-label">Services</span>
          <span className="project-detail__meta-value">{project.services}</span>
        </div>
        {project.externalUrl && (
          <div className="project-detail__meta-item">
            <span className="project-detail__meta-label">Website</span>
            <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="project-detail__meta-link">
              Visit {project.name} ↗
            </a>
          </div>
        )}
      </div>

      {/* Full width image */}
      <section className="project-detail__image">
        <img src={project.image} alt={project.subtitle} />
      </section>

      {/* Challenge section */}
      <section className="project-detail__section">
        <span className="project-detail__section-num">(01)</span>
        <h3 className="project-detail__section-label">CHALLENGE</h3>
        <p className="project-detail__section-text">
          {project.challenge || project.description}
        </p>
      </section>

      {/* Second full width image */}
      <section className="project-detail__image">
        <img src={project.image} alt={project.subtitle} />
      </section>

      {/* Intelligence applied section */}
      <section className="project-detail__section">
        <span className="project-detail__section-num">(02)</span>
        <h3 className="project-detail__section-label">Intelligence applied</h3>
        <p className="project-detail__section-text">
          {project.intelligence || 'Spatial flood modelling over the specific development corridor.'}
        </p>
      </section>

      {/* Split image section */}
      <section className="project-detail__image-split">
        <div className="project-detail__image-half">
          <img src={project.image} alt="" />
        </div>
        <div className="project-detail__image-half">
          <img src={project.image} alt="" />
        </div>
      </section>

      {/* Why it matters section */}
      <section className="project-detail__section">
        <span className="project-detail__section-num">(03)</span>
        <h3 className="project-detail__section-label">Why it matters</h3>
        <p className="project-detail__section-text">
          {project.whyItMatters || 'Site and development risk can be priced out before a decision is finalised.'}
        </p>
      </section>

      {/* Project Overview (if available) */}
      {(project.client || project.industry || project.tools) && (
        <section className="project-detail__overview">
          <h3 className="project-detail__overview-title">Project Overview</h3>
          <div className="project-detail__overview-grid">
            {project.client && (
              <div className="project-detail__overview-item">
                <span className="project-detail__overview-label">Client</span>
                <span className="project-detail__overview-value">{project.client}</span>
              </div>
            )}
            {project.industry && (
              <div className="project-detail__overview-item">
                <span className="project-detail__overview-label">Industry</span>
                <span className="project-detail__overview-value">{project.industry}</span>
              </div>
            )}
            <div className="project-detail__overview-item">
              <span className="project-detail__overview-label">Services</span>
              <span className="project-detail__overview-value">{project.services}</span>
            </div>
            {project.tools && (
              <div className="project-detail__overview-item">
                <span className="project-detail__overview-label">Tools Used</span>
                <span className="project-detail__overview-value">{project.tools}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Projects */}
      <section className="project-detail__related">
        <div className="project-detail__related-header">
          <h3 className="project-detail__related-title">Related Projects</h3>
          <Link to="/projects" className="project-detail__related-link">All Projects →</Link>
        </div>
        <div className="proof-projects__grid">
          {[
            { title: 'ForestTrace AI Ghana', image: forestTraceImg, slug: 'foresttrace-ai' },
            { title: 'MTTD Traffic Enforcement', image: forestTraceImg, slug: 'vehicle-traffic-enforcement' },
            { title: 'GIS Elections Platform', image: forestTraceImg, slug: 'gis-rs-solution-elections' },
          ]
            .filter(item => item.slug !== slug)
            .map((item, i) => (
              <Link to={`/projects/${item.slug}`} className="proof-projects__card proof-projects__card--clickable" key={i}>
                <div className="proof-projects__card-img">
                  <img src={item.image} alt={item.title} className="proof-projects__card-image" />
                </div>
                <div className="proof-projects__card-info">
                  <span className="proof-projects__card-tag">{item.title}</span>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <JoinCta
        heading="Interested in Our Projects?"
        description="Get in touch with our team to learn how BDG's data and technology solutions can support your organisation."
      />

      <Footer />
    </main>
  )
}

export default ProjectDetail
