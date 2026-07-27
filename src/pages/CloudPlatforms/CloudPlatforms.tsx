import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CloudStatsBar from '../../components/CloudStatsBar'
import CtaBanner from '../../components/CtaBanner'
import JoinCta from '../../components/JoinCta'
import SEO from '../../components/SEO'
import CloudHeroSection from '../../components/CloudHero'
import CloudServices from '../../components/CloudServices'
import './CloudPlatforms.css'

function CloudPlatforms() {
  return (
    <main>
      <SEO
        title="Cloud Platforms | BigData Ghana — AWS-Certified Infrastructure for Africa"
        description="Scale faster on cloud infrastructure built for growth. AWS-certified architecture, data platform engineering, security and managed operations for organisations in Ghana."
        path="/cloud-platforms"
      />
      <Navbar />
      <CloudHeroSection />

      <CloudStatsBar />

      {/* About Cloud Section */}
      <section className="cloud-about">
        <div className="cloud-about__top">
          <span className="cloud-about__tag">● What you get</span>
          <p className="cloud-about__heading">
            Scale faster on infrastructure built for where you are going. Big Data Ghana is an AWS Certified Partner. We build and manage cloud infrastructure that grows with your ambition, processes more data, and runs reliably so your team can focus on the business.
          </p>
        </div>
        <div className="cloud-about__cards">
          <div className="cloud-about__card cloud-about__card--green">
            <h3 className="cloud-about__card-title">Infrastructure that scales with your ambition, not against it. Sized for where you are going, not where you are.</h3>
            <div className="cloud-about__card-arrow">→</div>
          </div>
          <div className="cloud-about__card cloud-about__card--image">
            <h3 className="cloud-about__card-title" style={{color: '#fff'}}>Data that is accessible, secure, and connected across your organisation. No silos. No manual workarounds.</h3>
          </div>
          <div className="cloud-about__card cloud-about__card--dark">
            <h3 className="cloud-about__card-title" style={{color: '#fff'}}>Cloud costs that reduce over time as your architecture is optimised, not grow unchecked as your operation scales.</h3>
            <div className="cloud-about__card-arrow">→</div>
          </div>
        </div>
      </section>

      <CloudServices />

      <CtaBanner />
      <JoinCta />
      <Footer />
    </main>
  )
}

export default CloudPlatforms
