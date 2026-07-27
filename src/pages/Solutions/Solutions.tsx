import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import JoinCta from '../../components/JoinCta'
import SEO from '../../components/SEO'
import bigconnectImg from '../../assets/Our Solutions/BigConnectAI/BigConnect AI.webp'
import sendlineImg from '../../assets/Our Solutions/Sendlinesms/SendlineSMS logo.webp'
import maizeImg from '../../assets/Our Solutions/Maize Intelligence/maizeYield.webp'
import forestTraceImg from '../../assets/cef-ps-placeholder.svg'
import trafficImg from '../../assets/cef-ps-placeholder.svg'
import electionsImg from '../../assets/AI and Automation/GIS-RS Solution IN ELECTIONs.webp'
import nfmsImg from '../../assets/AI and Automation/Development of National Forest Monitoring System.webp'
import erpImg from '../../assets/cef-ps-placeholder.svg'
import routeAdvisorImg from '../../assets/cef-ps-placeholder.svg'
import '../ProjectDetail/ProjectCards.css'
import './SolutionsHero.css'
import './Solutions.css'

const solutions = [
  { title: 'Sendline SMS', tag: 'Product', image: sendlineImg, slug: 'sendline-sms' },
  { title: 'BigConnect AI', tag: 'Product', image: bigconnectImg, slug: 'real-time-logistics-optimisation' },
  { title: 'Maize Intelligence', tag: 'Product', image: maizeImg, slug: 'maize-intelligence' },
]

function Solutions() {
  return (
    <main className="solutions-page">
      <SEO
        title="Our Solutions | BigData Ghana — Products That Drive Decisions"
        description="SendLine SMS, BigConnect AI, and Maize Intelligence. Products built for Ghana's private sector to communicate, automate, and grow with intelligence."
        path="/solutions"
      />
      <Navbar />
      <section className="proof-hero">
        {/* 3-row marquee background */}
        <div className="proof-hero__marquee-bg">
          <div className="proof-hero__row proof-hero__row--1">
            <div className="proof-hero__row-track">
              <img src={sendlineImg} alt="" />
              <img src={bigconnectImg} alt="" />
              <img src={maizeImg} alt="" />
              <img src={forestTraceImg} alt="" />
              <img src={trafficImg} alt="" />
              <img src={sendlineImg} alt="" />
              <img src={bigconnectImg} alt="" />
              <img src={maizeImg} alt="" />
              <img src={forestTraceImg} alt="" />
              <img src={trafficImg} alt="" />
            </div>
          </div>
          <div className="proof-hero__row proof-hero__row--2">
            <div className="proof-hero__row-track">
              <img src={electionsImg} alt="" />
              <img src={nfmsImg} alt="" />
              <img src={erpImg} alt="" />
              <img src={routeAdvisorImg} alt="" />
              <img src={sendlineImg} alt="" />
              <img src={electionsImg} alt="" />
              <img src={nfmsImg} alt="" />
              <img src={erpImg} alt="" />
              <img src={routeAdvisorImg} alt="" />
              <img src={sendlineImg} alt="" />
            </div>
          </div>
          <div className="proof-hero__row proof-hero__row--3">
            <div className="proof-hero__row-track">
              <img src={maizeImg} alt="" />
              <img src={forestTraceImg} alt="" />
              <img src={bigconnectImg} alt="" />
              <img src={trafficImg} alt="" />
              <img src={electionsImg} alt="" />
              <img src={maizeImg} alt="" />
              <img src={forestTraceImg} alt="" />
              <img src={bigconnectImg} alt="" />
              <img src={trafficImg} alt="" />
              <img src={electionsImg} alt="" />
            </div>
          </div>
        </div>

        <div className="proof-hero__overlay" />

        <div className="proof-hero__content">
          <h1 className="proof-hero__title">Our Solutions</h1>
          <p className="proof-hero__sub">
            Products built for Ghana's private sector to communicate, automate, and grow with intelligence.
          </p>
          <div className="proof-hero__scroll">
            <div className="proof-hero__scroll-line">
              <div className="proof-hero__scroll-dot" />
            </div>
            <span className="proof-hero__scroll-text">Scroll</span>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="proof-projects">
        <div className="proof-projects__header">
          <h2 className="proof-projects__title">Our Products</h2>
        </div>
        <div className="proof-projects__content">
          <div className="proof-projects__grid">
            {solutions.map((item, i) => (
              <Link to={`/solutions/${item.slug}`} className="proof-projects__card" key={i}>
                <div className="proof-projects__card-img">
                  <img src={item.image} alt={item.title} className="proof-projects__card-image" />
                </div>
                <div className="proof-projects__card-info">
                  <span className="proof-projects__card-tag">{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <JoinCta />
      <Footer />
    </main>
  )
}

export default Solutions
