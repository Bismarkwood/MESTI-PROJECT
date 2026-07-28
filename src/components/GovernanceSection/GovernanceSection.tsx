import { Link } from "react-router-dom"
import "./GovernanceSection.css"

import govImg     from "../../assets/Mission & Vision/Mission & Vision.webp"

function GovernanceSection() {
  return (
    <section className="gov" id="governance">
      {/* --- Background image + overlays --- */}
      <div className="gov__bg-wrap">
        <img src={govImg} alt="" className="gov__bg-img" />
        <div className="gov__bg-overlay" />
        <div className="gov__bg-tint" />
      </div>

      {/* --- Main layout --- */}
      <div className="gov__inner">

        {/* Left: text content */}
        <div className="gov__content">
          <div className="gov__badge">
            <span>Governance &amp; Coordination</span>
          </div>

          <h2 className="gov__heading">
            Led by <em>MEST</em>,<br />
            Delivered Through<br />
            Collaboration
          </h2>

          <p className="gov__body">
            CEF-PS Ghana is coordinated under the Ministry of Environment, Science,
            Technology and Innovation, working with relevant government institutions
            and stakeholders across Ghana's plastics ecosystem.
          </p>

          <p className="gov__note">
            Programme-specific organisations and development partners are presented
            within their respective project pages.
          </p>

          <Link to="/partners" className="gov__btn">
            Meet Our Partners
            <span className="gov__btn-arrow" aria-hidden="true">?</span>
          </Link>
        </div>

      </div>

      {/* --- Bottom accent bar --- */}
      <div className="gov__accent-bar" />
    </section>
  )
}

export default GovernanceSection
