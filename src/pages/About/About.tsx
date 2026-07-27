import { useEffect, useRef } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import SEO from "../../components/SEO"
import CtaBanner from "../../components/CtaBanner"
import WhatWeDoRole from "../../components/WhatWeDoRole"
import GovernanceSection from "../../components/GovernanceSection"
import aboutHeroImg from "../../assets/About/About Hero section.webp"
import whyBdgImg from "../../assets/Why Big Data Ghana.webp"
import missionImg from "../../assets/Mission & Vision/Mission & Vision.webp"
import lifeImg1 from "../../assets/Life at Big Data Ghana/007A2148SIMPI26.webp"
import howImg1 from "../../assets/Life at Big Data Ghana/1765533172285.webp"
import howImg2 from "../../assets/Life at Big Data Ghana/1756482542508.webp"
import "./About.css"

function About() {
  const mainRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  // Scroll-triggered animations
  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("about-reveal")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    )

    const elements = main.querySelectorAll(".about-animate")
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Parallax for hero
  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current
      if (!hero) return
      const scrollY = window.scrollY
      const bg = hero.querySelector(".about-hero__bg") as HTMLElement
      const content = hero.querySelector(".about-hero__content") as HTMLElement
      if (bg) bg.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`
      if (content) {
        content.style.transform = `translateY(${scrollY * 0.15}px)`
        content.style.opacity = `${1 - scrollY / 700}`
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="about-page" ref={mainRef}>
      <SEO
        title="About Us | CPF Ghana — Coordinating the Circular Plastics Transition"
        description="CPF Ghana is a national platform coordinated under MESTI, bringing stakeholders together to advance sustainable plastic production, consumption, collection, recovery and recycling."
        path="/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          mainEntity: {
            "@type": "Organization",
            name: "CPF Ghana",
            areaServed: "Ghana",
            knowsAbout: ["Circular Economy", "Plastic Waste Management", "Environmental Policy", "Recycling"],
          },
        }}
      />
      <Navbar />

      {/* 1. Hero */}
      <section className="about-hero" ref={heroRef}>
        <img src={aboutHeroImg} alt="" className="about-hero__bg" />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <span className="about-hero__eyebrow">About CPF Ghana</span>
          <h1 className="about-hero__title">
            Coordinating Ghana's Transition to Circular Plastics
          </h1>
          <p className="about-hero__sub">
            CPF Ghana is a national platform under the Ministry of Environment, Science, Technology and Innovation
            that brings stakeholders together to advance sustainable plastic production, consumption, collection,
            recovery and recycling.
          </p>
        </div>
        <div className="about-hero__scroll-indicator">
          <span className="about-hero__scroll-dot" />
        </div>
      </section>

      {/* 2. Who We Are */}
      <section className="about-story">
        <div className="about-story__inner">
          <div className="about-story__text">
            <span className="about-story__label">WHO WE ARE</span>
            <h2 className="about-story__heading">A Shared Platform for National Action</h2>
            <p className="about-story__desc">
              CPF Ghana connects government institutions, businesses, development partners, researchers,
              civil society organisations, waste-sector actors and communities around a shared
              circular-plastics agenda.
            </p>
            <p className="about-story__desc">
              The platform supports coordinated action across the plastics value chain, helping Ghana
              move away from the traditional take, use and dispose model towards a system where
              materials remain in productive use for longer.
            </p>
          </div>
          <div className="about-story__images">
            <div className="about-story__image">
              <img src={whyBdgImg} alt="CPF Ghana coordination" />
            </div>
            <div className="about-story__image">
              <img src={lifeImg1} alt="Stakeholders at work" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why CPF Ghana Exists */}
      <section className="about-why">
        <div className="about-why__inner">
          <div className="about-why__left">
            <div className="about-why__badge">
              <span>Why CPF Ghana Exists</span>
            </div>
            <h2 className="about-why__heading">
              Ghana Needs a Coordinated Response to Plastic Pollution
            </h2>
          </div>
          <div className="about-why__right">
            <p className="about-why__body">
              Plastic pollution is one of Ghana's most visible environmental challenges. Collection systems
              are fragmented, recycling infrastructure remains underdeveloped, and policies are difficult
              to implement without a shared platform connecting all actors.
            </p>
            <p className="about-why__body">
              CPF Ghana exists to close that gap — providing a neutral, nationally recognised coordination
              platform that aligns government, business, civil society and development partners behind
              common objectives and measurable outcomes.
            </p>
            <div className="about-why__stats">
              <div className="about-why__stat">
                <span className="about-why__stat-num">3.7M</span>
                <span className="about-why__stat-label">tonnes of plastic waste generated annually in Ghana</span>
              </div>
              <div className="about-why__stat">
                <span className="about-why__stat-num">11%</span>
                <span className="about-why__stat-label">of plastic waste formally collected and recycled</span>
              </div>
              <div className="about-why__stat">
                <span className="about-why__stat-num">1</span>
                <span className="about-why__stat-label">national coordination platform — CPF Ghana</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mission & Vision */}
      <section className="about-mission">
        <div className="about-mission__divider" />
        <div className="about-mission__grid">
          <div className="about-mission__card about-animate about-animate--delay-1">
            <div className="about-mission__icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1E8A00" strokeWidth="1.5">
                <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="about-mission__heading">Mission</h2>
            <p className="about-mission__text">
              To coordinate national action, partnerships and knowledge that support Ghana's transition
              towards a sustainable circular plastics economy.
            </p>
          </div>
          <div className="about-mission__separator" />
          <div className="about-mission__card about-animate about-animate--delay-2">
            <div className="about-mission__icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1E8A00" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3"/>
                <circle cx="12" cy="12" r="8"/>
                <path d="M12 4v1M12 19v1M4 12h1M19 12h1" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 className="about-mission__heading">Vision</h2>
            <p className="about-mission__text">
              A Ghana where plastic materials are responsibly designed, used, recovered and returned
              to productive use without harming people or the environment.
            </p>
          </div>
        </div>
        <div className="about-mission__images">
          <div className="about-mission__img-wrap">
            <img src={missionImg} alt="CPF Ghana Mission" />
          </div>
        </div>
      </section>

      {/* 5. What We Do */}
      <WhatWeDoRole />

      {/* 6. How CPF Works */}
      <section className="about-how">
        <div className="about-how__inner">
          <div className="about-how__header">
            <div className="about-how__badge"><span>How CPF Works</span></div>
            <h2 className="about-how__heading">A Platform, Not a Programme</h2>
            <p className="about-how__sub">
              CPF Ghana operates as a coordination layer — facilitating collaboration, not implementing
              projects directly. Here is how the platform functions in practice.
            </p>
          </div>
          <div className="about-how__body">
            <div className="about-how__steps">
              {[
                {
                  n: "01",
                  title: "Stakeholder Convening",
                  desc: "CPF Ghana brings together government ministries, industry associations, development partners, recyclers and civil society through working groups, forums and thematic networks.",
                },
                {
                  n: "02",
                  title: "Programme Alignment",
                  desc: "Ongoing programmes across the plastics value chain are mapped and aligned to national priorities, reducing duplication and ensuring coherent progress.",
                },
                {
                  n: "03",
                  title: "Knowledge Sharing",
                  desc: "Policies, research, data and best practices are centralised and made accessible to all stakeholders — improving evidence-based decision-making.",
                },
                {
                  n: "04",
                  title: "Progress Tracking",
                  desc: "Key metrics, programme milestones and national targets are monitored and reported transparently to maintain accountability across the ecosystem.",
                },
              ].map((step) => (
                <div className="about-how__step" key={step.n}>
                  <span className="about-how__step-num">{step.n}</span>
                  <div className="about-how__step-content">
                    <h3 className="about-how__step-title">{step.title}</h3>
                    <p className="about-how__step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="about-how__imgs">
              <div className="about-how__img about-how__img--top">
                <img src={howImg1} alt="CPF stakeholder session" />
              </div>
              <div className="about-how__img about-how__img--bottom">
                <img src={howImg2} alt="CPF coordination meeting" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Governance & Coordination */}
      <GovernanceSection />

      {/* 8. Call to Action */}
      <CtaBanner
        heading="Let's Build a Circular Plastics Economy Together"
        sub="Final Call to Action"
        desc="Explore the programmes, policies, organisations and resources contributing to Ghana's circular-plastics transition."
        btnText="Explore Programmes"
        btnHref="/programmes"
      />

      <Footer />
    </main>
  )
}

export default About
