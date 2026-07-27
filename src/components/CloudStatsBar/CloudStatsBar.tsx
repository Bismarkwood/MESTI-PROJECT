import cloudPractitionerLogo from '../../assets/Cloud Platform/cloud Practioner.webp'
import solutionsArchitectLogo from '../../assets/Cloud Platform/aws certified solutions architect.webp'
import aiPractitionerLogo from '../../assets/Cloud Platform/AI Practioner.webp'
import awsLogo from '../../assets/Aws Partner logo/Aws Partner.webp'
import '../StatsBar/StatsBar.css'

function CloudStatsBar() {
  return (
    <section className="stats-bar">
      <div className="stats-bar__inner">
        <div className="stats-bar__item">
          <img src={cloudPractitionerLogo} alt="AWS Cloud Practitioner" className="stats-bar__aws-logo" />
          <span className="stats-bar__label">AWS Cloud Practitioners</span>
        </div>
        <div className="stats-bar__divider" />
        <div className="stats-bar__item">
          <img src={solutionsArchitectLogo} alt="AWS Solutions Architect" className="stats-bar__aws-logo" />
          <span className="stats-bar__label">AWS Certified Solutions Architect</span>
        </div>
        <div className="stats-bar__divider" />
        <div className="stats-bar__item">
          <img src={aiPractitionerLogo} alt="AWS AI Practitioner" className="stats-bar__aws-logo" />
          <span className="stats-bar__label">AWS AI Practitioner</span>
        </div>
        <div className="stats-bar__divider" />
        <div className="stats-bar__item">
          <img src={awsLogo} alt="AWS Partner" className="stats-bar__aws-logo" />
          <span className="stats-bar__label">AWS Certified Partner</span>
        </div>
      </div>
    </section>
  )
}

export default CloudStatsBar
