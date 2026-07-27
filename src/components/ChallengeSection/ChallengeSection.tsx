import problemImg from '../../assets/AI and Automation/The problem.webp'
import './ChallengeSection.css'

function ChallengeSection() {
  return (
    <section className="challenge-section" id="challenge">
      <div className="challenge-section__inner">
        {/* Left Column: Photograph */}
        <div className="challenge-section__media">
          <div className="challenge-section__image-frame">
            <div className="challenge-section__image-wrapper">
              <img 
                src={problemImg} 
                alt="Plastic pollution around a community and drainage system in Ghana" 
                className="challenge-section__image" 
              />
              <div className="challenge-section__image-overlay" />
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="challenge-section__content">
          <div className="challenge-section__badge">
            <span className="challenge-section__badge-text">THE CHALLENGE</span>
          </div>

          <h2 className="challenge-section__title">
            Addressing Ghana’s <span className="challenge-section__title-gradient">Plastic Challenge</span>
          </h2>

          <p className="challenge-section__lead">
            Plastic pollution affects communities, drainage systems, waterways, marine ecosystems and economic activities. Solving this challenge requires more than waste collection. It requires coordinated policies, responsible production, better recycling infrastructure, sustainable technologies and participation from businesses and communities.
          </p>

          <div className="challenge-section__highlight-card">
            <div className="challenge-section__highlight-icon">🇬🇭</div>
            <p className="challenge-section__highlight-text">
              The project directly supports the implementation of Ghana’s National Plastic Management Policy and the National Plastic Action Partnership.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ChallengeSection
