import { useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import JoinCta from '../../components/JoinCta'
import SEO from '../../components/SEO'
import heroImg from '../../assets/AI and Automation/AI And Automation Hero Section.webp'
import problemImg from '../../assets/AI and Automation/The problem.webp'
import decisionImg from '../../assets/AI and Automation/The smarter approach.webp'
import './AIAutomation.css'

const services = [
  { tag: 'AUTOMATION · WORKFLOWS', title: 'Intelligent process automation', desc: 'Replace manual, repetitive workflows with systems that handle them automatically, accurately, and around the clock.' },
  { tag: 'CONVERSATIONAL · VOICE AI', title: 'Voice & conversational AI', desc: 'AI-powered systems that handle calls, queries, and customer interactions at a scale no human team can match.' },
  { tag: 'FORECASTING · PREDICTION', title: 'Predictive analytics & modelling', desc: 'Models that forecast demand, risk, or outcomes before they happen, so decisions are made ahead of time, not in reaction.' },
  { tag: 'CUSTOM AI · DEVELOPMENT', title: 'Custom AI system development', desc: 'AI built specifically around your operations and data, not adapted from a generic template.' },
  { tag: 'INTEGRATION · DEPLOYMENT', title: 'AI integration & deployment', desc: 'Seamless integration of AI systems into your existing tools and workflows, built for real-world use from day one.' },
  { tag: 'MONITORING · OPTIMISATION', title: 'Ongoing model monitoring', desc: 'Continuous performance monitoring and refinement, so your AI systems improve rather than degrade over time.' },
]

function AIAutomation() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.ai-services__card')
    if (!cards) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement
            const idx = Number(card.dataset.index ?? 0)
            card.style.animationDelay = `${(idx % 3) * 100}ms`
            card.classList.add('ai-services__card--visible')
            observer.unobserve(card)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    cards.forEach(c => observer.observe(c))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="ai-page">
      <SEO
        title="AI & Automation | BigData Ghana — Intelligent Systems for Business"
        description="Custom AI and automation systems built for your operations. Predictive models, intelligent workflows, conversational AI, and production-grade infrastructure from an AWS-certified partner."
        path="/ai-automation"
      />
      <Navbar />

      {/* Hero with image */}
      <section className="ai-hero">
        <img
          className="ai-hero__bg"
          src={heroImg}
          alt="AI and Automation"
        />
        <div className="ai-hero__overlay" />
        <div className="ai-hero__content">
          <span className="ai-hero__label">AI & AUTOMATION</span>
          <h1 className="ai-hero__title">Intelligent systems<br />built for how you work.</h1>
          <p className="ai-hero__sub">
            From predictive models to automated workflows, AI that runs your business, not just demos.
          </p>
        </div>
      </section>

      {/* Problem / Decision / Service / Outcome */}
      <section className="ai-overview">
        <div className="ai-overview__top">
          <span className="ai-overview__label">OUR APPROACH</span>
          <h2 className="ai-overview__heading">From problem to<br />business outcome</h2>
        </div>
        <div className="ai-overview__cards">
          <div className="ai-overview__card">
            <div className="ai-overview__card-img">
              <img src={problemImg} alt="The customer problem" className="ai-overview__card-image" />
              <span className="ai-overview__card-badge">01 / PROBLEM</span>
            </div>
            <div className="ai-overview__card-body">
              <h3 className="ai-overview__card-title">The customer problem</h3>
              <p className="ai-overview__card-text">
                Most organisations run on manual processes and disconnected tools, decisions made by intuition, repetitive work absorbing hours that should go toward growth. Opportunities to predict, automate, or respond in real time go unused, not because the data isn't there, but because no system is built to act on it.
              </p>
            </div>
          </div>

          <div className="ai-overview__card">
            <div className="ai-overview__card-img">
              <img src={decisionImg} alt="The smarter approach" className="ai-overview__card-image" />
              <span className="ai-overview__card-badge">02 / DECISION</span>
            </div>
            <div className="ai-overview__card-body">
              <h3 className="ai-overview__card-title">The smarter approach</h3>
              <p className="ai-overview__card-text">
                Before you add more headcount to handle repetitive work, you should know what can be automated, what can be predicted, and what your competitors are already doing with intelligent systems while you're still doing it by hand. Not a generic tool. Not a one-size-fits-all chatbot. AI built around how your business actually operates.
              </p>
            </div>
          </div>

          <div className="ai-overview__card">
            <div className="ai-overview__card-img">
              <div className="ai-overview__card-placeholder" />
              <span className="ai-overview__card-badge">03 / SERVICE</span>
            </div>
            <div className="ai-overview__card-body">
              <h3 className="ai-overview__card-title">The BDG service</h3>
              <p className="ai-overview__card-text">
                BDG designs and builds AI and automation systems tailored to your specific operations, from intelligent workflows that remove manual bottlenecks, to predictive models that tell you what's likely to happen next. We build on certified, production-grade infrastructure, so what we deliver isn't a prototype, it's a system ready to run your business.
              </p>
            </div>
          </div>

          <div className="ai-overview__card">
            <div className="ai-overview__card-img">
              <div className="ai-overview__card-placeholder" />
              <span className="ai-overview__card-badge">04 / OUTCOME</span>
            </div>
            <div className="ai-overview__card-body">
              <h3 className="ai-overview__card-title">The business outcome</h3>
              <p className="ai-overview__card-text">
                Hours returned to your team. Decisions made ahead of the problem, not after it. A durable operational advantage built on systems competitors can't copy overnight, because they're built specifically around how you work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="ai-impact">
        <div className="ai-impact__top">
          <div className="ai-impact__left">
            <span className="ai-impact__label">AI & AUTOMATION IMPACT</span>
            <h2 className="ai-impact__heading">
              Less time on repetitive work. More time for decisions, customers, and growth.
            </h2>
            <p className="ai-impact__desc">
              BDG introduces AI and automation into the areas where work slows down, reorganising workflows, connecting disconnected systems, and removing repetitive manual tasks from everyday operations.
            </p>
          </div>
          <div className="ai-impact__right">
            <a href="/contact" className="ai-impact__cta">START AN AI ASSESSMENT →</a>
          </div>
        </div>
        <div className="ai-impact__cards">
          <div className="ai-impact__card ai-impact__card--green">
            <span className="ai-impact__card-num">24/7</span>
            <span className="ai-impact__card-title">Faster customer response</span>
            <div className="ai-impact__card-line" />
            <p className="ai-impact__card-desc">
              Conversational AI handles common enquiries, captures information, schedules appointments, and escalates complex requests so your team can focus on what matters.
            </p>
          </div>
          <div className="ai-impact__card ai-impact__card--white">
            <span className="ai-impact__card-num">Fewer</span>
            <span className="ai-impact__card-title">Manual processes</span>
            <div className="ai-impact__card-line" />
            <p className="ai-impact__card-desc">
              Routine data entry, document handling, notifications, reporting, and approvals can be completed automatically, giving your people their time back.
            </p>
          </div>
          <div className="ai-impact__card ai-impact__card--mint">
            <span className="ai-impact__card-num">More</span>
            <span className="ai-impact__card-title">Productive teams</span>
            <div className="ai-impact__card-line" />
            <p className="ai-impact__card-desc">
              Employees spend less time following up on repetitive tasks and more time solving problems, building relationships, and supporting growth.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="ai-services">
        <div className="ai-services__header">
          <h2 className="ai-services__heading">Services included</h2>
          <p className="ai-services__sub">
            End-to-end AI capability — from design and development to deployment and ongoing optimisation.
          </p>
        </div>
        <div className="ai-services__grid" ref={gridRef}>
          {services.map((s, i) => (
            <div className="ai-services__card" key={i} data-index={i}>
              <span className="ai-services__card-tag">{s.tag}</span>
              <h3 className="ai-services__card-title">{s.title}</h3>
              <p className="ai-services__card-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <JoinCta />
      <Footer />
    </main>
  )
}

export default AIAutomation
