import './ProjectCards.css'

interface ProjectItem {
  label: string
  title: string
  image: string
  thumbnail: string
  thumbLabel: string
  thumbTitle: string
}

interface ProjectCardsProps {
  projects: ProjectItem[]
}

function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <section className="proj-cards">
      {projects.map((project, i) => {
        const isReversed = i % 2 !== 0

        return (
          <div key={i}>
            {i > 0 && <div className="proj-cards__divider" />}
            <div className={`proj-cards__item ${isReversed ? 'proj-cards__item--reversed' : ''}`}>
              {/* Main card (fixed size) */}
              <div className="proj-cards__main">
                <img src={project.image} alt={project.title} className="proj-cards__main-img" />
                <div className="proj-cards__main-overlay" />
                <div className="proj-cards__main-content">
                  <span className="proj-cards__label">{project.label}</span>
                  <h3 className="proj-cards__title">{project.title}</h3>
                  <a href="#" className="proj-cards__cta">Learn more →</a>
                </div>
              </div>

              {/* Thumbnail card (expands on hover) */}
              <div className="proj-cards__thumb-area">
                <div className="proj-cards__thumb">
                  <img src={project.thumbnail} alt="" className="proj-cards__thumb-img" />
                  <div className="proj-cards__thumb-overlay" />
                  <div className="proj-cards__thumb-content">
                    <span className="proj-cards__label">{project.thumbLabel}</span>
                    <h3 className="proj-cards__title">{project.thumbTitle}</h3>
                    <a href="#" className="proj-cards__cta">Learn more →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default ProjectCards
