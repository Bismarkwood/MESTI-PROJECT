import { useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import JoinCta from '../../components/JoinCta'
import SEO from '../../components/SEO'
import heroImage from '../../assets/cef-ps-placeholder.svg'
import './DataAnalytics.css'

const services = [
  { tag: 'PIPELINES · INTEGRATION', title: 'Data pipeline & warehousing', desc: 'Bring scattered data from across your organisation into one clean, reliable, accessible system.' },
  { tag: 'DASHBOARDS · BI', title: 'Dashboard & reporting development', desc: 'Real-time dashboards that put the numbers that matter directly in front of decision-makers.' },
  { tag: 'FORECASTING · PREDICTION', title: 'Predictive analytics', desc: 'Models that surface trends and forecast outcomes before they show up in your bottom line.' },
  { tag: 'VISUALIZATION · INSIGHT', title: 'Data visualization', desc: 'Turn complex datasets into clear visuals that make patterns obvious at a glance.' },
  { tag: 'GOVERNANCE · QUALITY', title: 'Data quality & governance', desc: 'Ensure the data driving your decisions is accurate, consistent, and trustworthy.' },
  { tag: 'CUSTOM ANALYSIS', title: 'Ad-hoc analysis & insights', desc: 'Targeted analysis for specific business questions, delivered when you need answers, not on a fixed schedule.' },
]

function DataAnalytics() {
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const main = mainRef.current
    if (!main) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('da-reveal')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const elements = main.querySelectorAll('.da-animate')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="da-page" ref={mainRef}>
      <SEO
        title="Data Analytics | BigData Ghana — Turn Raw Data Into Decisions"
        description="Data pipeline engineering, dashboards, predictive analytics, and business intelligence. BDG turns scattered data into clear, decision-ready intelligence for organisations in Ghana."
        path="/data-analytics"
      />
      <Navbar />

      {/* Hero */}
      <section className="da-hero">
        <img
          className="da-hero__video"
          src={heroImage}
          alt="Data Analytics Placeholder"
        />
        <div className="da-hero__overlay" />
        <div className="da-hero__content">
          <span className="da-hero__label">DATA ANALYTICS</span>
          <h1 className="da-hero__title">Your data already has<br />the answers. We surface them.</h1>
          <p className="da-hero__sub">
            Pipelines, dashboards, predictive models, and business intelligence built for leadership teams who need clarity, not more spreadsheets.
          </p>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="da-overview">
        <div className="da-overview__top da-animate">
          <span className="da-overview__label">OUR APPROACH</span>
          <h2 className="da-overview__heading">From scattered data<br />to strategic clarity</h2>
        </div>

        <div className="da-overview__grid">
          <div className="da-overview__card da-animate">
            <div className="da-overview__card-num">01</div>
            <h3 className="da-overview__card-title">The customer problem</h3>
            <p className="da-overview__card-text">
              Most organisations collect far more data than they use. It sits scattered across spreadsheets, systems, and departments, visible to no one, actionable by no one. Decisions get made on instinct and outdated reports, while the patterns that could have shaped strategy go unseen until it's too late to act on them.
            </p>
          </div>

          <div className="da-overview__card da-animate">
            <div className="da-overview__card-num">02</div>
            <h3 className="da-overview__card-title">The smarter approach</h3>
            <p className="da-overview__card-text">
              Before your next major decision, you should know what your own data is already telling you, not a static report from last quarter, but a clear, current picture of what's actually happening in your business. Not more spreadsheets. Not more dashboards nobody opens. Analytics that leadership can act on.
            </p>
          </div>

          <div className="da-overview__card da-animate">
            <div className="da-overview__card-num">03</div>
            <h3 className="da-overview__card-title">The BDG service</h3>
            <p className="da-overview__card-text">
              BDG turns scattered, raw data into clear, decision-ready intelligence. We build the pipelines that bring your data together, the dashboards that make it visible, and the models that surface what matters so insight isn't buried in a system nobody checks, it's in front of the people making the decisions.
            </p>
          </div>

          <div className="da-overview__card da-animate">
            <div className="da-overview__card-num">04</div>
            <h3 className="da-overview__card-title">The business outcome</h3>
            <p className="da-overview__card-text">
              Faster, better-informed decisions. Trends and risks visible before they become expensive problems. Leadership with a clear, real-time view of the business, not a quarterly guess.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="da-services">
        <div className="da-services__header da-animate">
          <h2 className="da-services__heading">Services included</h2>
          <p className="da-services__sub">
            End-to-end analytics capability, from raw data to boardroom-ready intelligence.
          </p>
        </div>
        <div className="da-services__grid">
          {services.map((s, i) => (
            <div className="da-services__card da-animate" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="da-services__card-tag">{s.tag}</span>
              <h3 className="da-services__card-title">{s.title}</h3>
              <p className="da-services__card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <JoinCta />
      <Footer />
    </main>
  )
}

export default DataAnalytics
