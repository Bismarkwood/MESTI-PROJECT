import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import JoinCta from '../../components/JoinCta'
import SEO from '../../components/SEO'
import GeoHeroSection from '../../components/GeoHero'
import customerProblemImg from '../../assets/Geo intelligence Page/The customer problem.webp'
import betterDecisionImg from '../../assets/Geo intelligence Page/The better decision.webp'
import bdgServiceImg from '../../assets/Geo intelligence Page/The BDG service.webp'
import './Geospatial.css'

function Geospatial() {
  return (
    <main>
      <SEO
        title="Geospatial Intelligence | BigData Ghana — Land Analytics & Earth Observation"
        description="Turn Ghana's geography into competitive intelligence. Land suitability, flood risk mapping, satellite imagery, boundary detection and custom spatial platforms. 8 years of Ghana-specific data."
        path="/geospatial"
      />
      <Navbar />
      <GeoHeroSection />

      {/* Overview Section */}
      <section className="geo-overview">
        <div className="geo-overview__header">
          <h2 className="geo-overview__heading">Land analytics that protect your investment</h2>
          <p className="geo-overview__sub">
            Every location decision carries spatial risk that traditional due diligence misses. We map what others cannot see — flood zones, encroachment patterns, land disputes, infrastructure gaps — so you invest with confidence.
          </p>
        </div>

        <div className="geo-overview__grid">
          <div className="geo-overview__card">
            <div className="geo-overview__card-img">
              <img src={customerProblemImg} alt="The customer problem" className="geo-overview__card-image" />
            </div>
            <div className="geo-overview__card-tags">
              <span className="geo-overview__card-tag">01</span>
              <span className="geo-overview__card-tag">Problem</span>
            </div>
            <h3 className="geo-overview__card-title">The customer problem</h3>
            <p className="geo-overview__card-desc">
              Your most consequential decisions depend on geography: where to invest, where to build, where risk is concentrated. Most organisations enter these decisions without spatial intelligence, relying on instinct, surface surveys and second-hand reports. The result is capital allocated to underperforming locations and risk that was visible in the data but never surfaced.
            </p>
          </div>

          <div className="geo-overview__card">
            <div className="geo-overview__card-img">
              <img src={betterDecisionImg} alt="The better decision" className="geo-overview__card-image" />
            </div>
            <div className="geo-overview__card-tags">
              <span className="geo-overview__card-tag">02</span>
              <span className="geo-overview__card-tag">Decision</span>
            </div>
            <h3 className="geo-overview__card-title">The better decision</h3>
            <p className="geo-overview__card-desc">
              Before you commit capital to any location in Ghana, you should have a clear, data-grounded answer to what that location says about your decision, and what your competitors do not yet know about it. Not an estimate. Not a map. Spatial intelligence that changes how you act.
            </p>
          </div>

          <div className="geo-overview__card">
            <div className="geo-overview__card-img">
              <img src={bdgServiceImg} alt="The BDG service" className="geo-overview__card-image" />
            </div>
            <div className="geo-overview__card-tags">
              <span className="geo-overview__card-tag">03</span>
              <span className="geo-overview__card-tag">Service</span>
            </div>
            <h3 className="geo-overview__card-title">The BDG service</h3>
            <p className="geo-overview__card-desc">
              BDG applies eight years of Ghana-specific geospatial data to your location question. We run spatial analysis, overlay risk and opportunity layers, and return intelligence faster than any field survey, at a depth no generalist can reach. AWS-certified infrastructure processes at speed. Our analysts interpret at depth.
            </p>
          </div>

          <div className="geo-overview__card">
            <div className="geo-overview__card-img">
              <div className="geo-overview__card-img-placeholder" />
            </div>
            <div className="geo-overview__card-tags">
              <span className="geo-overview__card-tag">04</span>
              <span className="geo-overview__card-tag">Outcome</span>
            </div>
            <h3 className="geo-overview__card-title">The business outcome</h3>
            <p className="geo-overview__card-desc">
              Smarter site selection. Higher-confidence investment decisions. Spatial risk eliminated before capital is committed. Competitive advantage built on intelligence others do not have, and eight years of Ghana-specific data no competitor holds.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />

      {/* Related Projects */}
      <section className="geo-related">
        <div className="geo-related__header">
          <h2 className="geo-related__title">Related Projects</h2>
          <Link to="/projects" className="geo-related__link">View All Projects →</Link>
        </div>
        <div className="geo-related__grid">
          <Link to="/proof/foresttrace-ai-ghana" className="geo-related__card">
            <div className="geo-related__card-img">
              <div className="geo-related__card-placeholder" />
            </div>
            <span className="geo-related__card-name">ForestTrace AI Ghana</span>
          </Link>
          <Link to="/proof/agricultural-yield-prediction-system" className="geo-related__card">
            <div className="geo-related__card-img">
              <div className="geo-related__card-placeholder" />
            </div>
            <span className="geo-related__card-name">National Forest Monitoring System</span>
          </Link>
          <Link to="/proof/gis-rs-solution-elections" className="geo-related__card">
            <div className="geo-related__card-img">
              <div className="geo-related__card-placeholder" />
            </div>
            <span className="geo-related__card-name">GIS/RS Solution in Elections</span>
          </Link>
        </div>
      </section>

      <JoinCta />
      <Footer />
    </main>
  )
}

export default Geospatial
