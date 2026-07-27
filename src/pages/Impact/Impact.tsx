import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { HeroScrollSection } from '../../components/HeroSection'
import HeroCTA from '../../components/HeroCTA'
import JoinCta from '../../components/JoinCta'
import './Impact.css'

import cefPsPlaceholder from '../../assets/cef-ps-placeholder.svg'

/* ─── DATA ─── */
const progressMetrics = [
  { figure: '11', unit: '', label: 'Participating SMEs', desc: 'Enterprises currently participating in the CEF-PS pilot programme.' },
  { figure: '8', unit: '', label: 'SMEs Receiving First-Tranche Support', desc: 'Eight participating enterprises received initial project funding.' },
  { figure: 'USD 311,606', unit: '', label: 'Funds Disbursed', desc: 'First-tranche funding disbursed for the implementation of pilot activities.' },
  { figure: '~50', unit: '', label: 'Stakeholders Engaged', desc: 'Participants involved in the INC debrief and alignment workshop.' },
]

const programmeTargets = [
  { figure: '93,000', unit: 'tonnes', label: 'Plastic waste targeted for recovery', desc: 'Supporting stronger collection, recovery and productive reuse of plastic materials.' },
  { figure: '13,000+', unit: 'tonnes', label: 'Marine litter targeted for prevention', desc: 'Reducing the amount of plastic waste entering waterways and marine environments.' },
  { figure: '2,000', unit: 'stakeholders', label: 'Targeted for training', desc: 'Strengthening technical and institutional capacity across the plastics sector.' },
  { figure: '50', unit: 'inspections', label: 'Planned inspections', desc: 'Supporting implementation, compliance, monitoring and learning.' },
]

const impactAreas = [
  { num: '01', title: 'Environmental Impact', desc: 'Reducing plastic leakage into communities, drains, waterways and marine environments through stronger collection, recovery and recycling systems.', icon: 'leaf' },
  { num: '02', title: 'Enterprise and Innovation', desc: 'Supporting businesses and technologies that transform recovered plastic into useful products and sustainable economic opportunities.', icon: 'lightbulb' },
  { num: '03', title: 'People and Capacity', desc: 'Building the knowledge and skills of public institutions, enterprises and other stakeholders across the plastics value chain.', icon: 'users' },
  { num: '04', title: 'Policy and Systems', desc: 'Strengthening the institutional, technical and coordination systems required for a long-term circular plastics economy.', icon: 'settings' },
]

const solutionBlocks = [
  { title: 'Community Buy-Back Centres', desc: 'Supporting accessible systems through which communities can return plastic materials for aggregation and recovery.' },
  { title: 'Plastic Lumber and Furniture', desc: 'Transforming recovered plastic into durable lumber used to produce furniture and related products.' },
  { title: 'Recycled Plastic Yarn', desc: 'Processing plastic waste into yarn and other materials for productive applications.' },
  { title: 'Pavement and Construction Products', desc: 'Using recovered plastic in the production of paving and construction-related materials.' },
  { title: 'Alternatives to Conventional Plastics', desc: 'Supporting products and solutions that reduce dependence on traditional plastic materials.' },
]

const impactStories = [
  { title: 'Strengthening Plastic Collection Networks', desc: 'How collection and buy-back systems can improve plastic recovery while creating opportunities for local communities.', category: 'Collection & Recovery' },
  { title: 'Creating New Products from Recovered Plastic', desc: 'How circular enterprises are converting discarded materials into furniture, yarn, paving products and other useful goods.', category: 'Recycling & Manufacturing' },
  { title: 'Building Knowledge Across the Sector', desc: 'How workshops, stakeholder engagement and technical capacity development support stronger coordination and implementation.', category: 'Capacity Building' },
]

const galleryImages = [
  { title: 'Pilot SME production facility', category: 'Enterprise' },
  { title: 'Ministerial or project-site visit', category: 'Governance' },
  { title: 'Stakeholder workshop', category: 'Capacity Building' },
  { title: 'Plastic collection activity', category: 'Recovery' },
  { title: 'Recycled products or processing equipment', category: 'Innovation' },
]

const reportingPrinciples = [
  { title: 'Verified Data', desc: 'Figures should be published only after review and confirmation by the responsible programme team.' },
  { title: 'Clear Reporting Periods', desc: 'Every metric should show the year or reporting period it covers.' },
  { title: 'Target Versus Achievement', desc: 'Targets must be visually distinguished from completed and verified results.' },
  { title: 'Programme Attribution', desc: 'Results should state whether they relate to CEF-PS or another CPF programme.' },
]

function Impact() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Animate metric cards on scroll
  useEffect(() => {
    const cards = document.querySelectorAll('.impact-animate')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('impact-animate--visible')
          }
        })
      },
      { threshold: 0.15 }
    )
    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 120
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="impact-page">
      <SEO
        title="CPF Ghana Impact · Progress, Targets and Stories of Change"
        description="Verified progress, programme targets and real stories from CPF Ghana's circular plastics programmes. CEF-PS data clearly labelled as programme-level."
        path="/impact"
      />
      <Navbar />

      {/* ─── 1. IMPACT HERO ─── */}
      <section id="overview" className="impact-hero-override">
        <HeroScrollSection
          badge="Impact and Progress"
          title="Turning Circular-Plastics Ambition into Measurable Action"
          desc="CPF Ghana brings together programmes, partnerships and practical solutions that strengthen plastic recovery, support circular enterprises, build stakeholder capacity and protect Ghana's environment."
          primaryCta={{ text: 'Explore Our Progress', href: '#progress', onClick: () => scrollToSection('progress') }}
          secondaryCta={{ text: 'View Programmes', href: '/cef-ps' }}
          hideFloatingBar
        />
      </section>

      {/* ─── 2. CURRENT PROGRESS SNAPSHOT ─── */}
      <section className="impact-progress" id="progress">
        <div className="impact-progress__container">
          <span className="impact-label impact-label--gold">Progress to Date</span>
          <h2 className="impact-section-title">Building the Foundation for Circular Action</h2>
          <p className="impact-section-desc">
            CEF-PS has progressed from institutional setup and stakeholder engagement into support for pilot enterprises and practical circular-economy activities.
          </p>

          <div className="impact-progress__grid">
            {progressMetrics.map((m, i) => (
              <div key={i} className="impact-metric-card impact-animate">
                <span className="impact-metric-card__status">Progress</span>
                <div className="impact-metric-card__figure">{m.figure}</div>
                <div className="impact-metric-card__label">{m.label}</div>
                <p className="impact-metric-card__desc">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="impact-progress__data-label">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            CEF-PS progress data · Reporting period: inception to June 2025
          </div>
        </div>
      </section>

      {/* ─── 3. PROGRAMME TARGETS ─── */}
      <section className="impact-targets" id="targets">
        <div className="impact-targets__container">
          <div className="impact-targets__content">
            <div className="impact-targets__image-col">
              <img src={cefPsPlaceholder} alt="Ghanaian waterway and surrounding community environment" className="impact-targets__image" />
            </div>
            <div className="impact-targets__cards-col">
              <span className="impact-label impact-label--gold-dark">What We Are Working Towards</span>
              <h2 className="impact-section-title impact-section-title--white">Long-Term Environmental and Sector Targets</h2>
              <p className="impact-targets__intro">
                These targets reflect the intended contribution of the CEF-PS programme to Ghana's transition towards circular plastics management.
              </p>
              <div className="impact-targets__grid">
                {programmeTargets.map((t, i) => (
                  <div key={i} className="impact-target-card impact-animate">
                    <span className="impact-target-card__tag">Programme Target</span>
                    <div className="impact-target-card__figure">{t.figure}</div>
                    <div className="impact-target-card__unit">{t.unit}</div>
                    <div className="impact-target-card__label">{t.label}</div>
                    <p className="impact-target-card__desc">{t.desc}</p>
                  </div>
                ))}
              </div>
              <p className="impact-targets__note">
                These figures are programme targets and should remain labelled as targets until verified results are officially reported.
              </p>
            </div>
          </div>
          <div className="impact-targets__ghana-outline" />
        </div>
      </section>

      {/* ─── 4. IMPACT AREAS ─── */}
      <section className="impact-areas" id="impact-areas">
        <div className="impact-areas__container">
          <span className="impact-label impact-label--green">How Change Happens</span>
          <h2 className="impact-section-title">Impact Across the Plastics Ecosystem</h2>

          <div className="impact-areas__grid">
            {impactAreas.map((area) => (
              <div key={area.num} className="impact-area-card impact-animate">
                <div className="impact-area-card__icon">
                  {area.icon === 'leaf' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 21c3-3 7-6 12-11C14 5 10 3 6 3c0 6 0 12 0 18z"/><path d="M6 21c1-3 3-6 6-9"/></svg>}
                  {area.icon === 'lightbulb' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>}
                  {area.icon === 'users' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                  {area.icon === 'settings' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>}
                </div>
                <span className="impact-area-card__num">{area.num}</span>
                <h3 className="impact-area-card__title">{area.title}</h3>
                <p className="impact-area-card__desc">{area.desc}</p>
                <span className="impact-area-card__link">
                  Learn more <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. IMPACT IN ACTION ─── */}
      <section className="impact-action" id="action">
        <div className="impact-action__container">
          <span className="impact-label impact-label--green">Circular Solutions</span>
          <h2 className="impact-section-title">From Plastic Waste to Productive Value</h2>
          <p className="impact-section-desc">
            Participating enterprises are implementing solutions across plastic collection, processing, recycling, manufacturing and alternative-material development.
          </p>

          <div className="impact-action__layout">
            <div className="impact-action__image">
              <img src={cefPsPlaceholder} alt="Community plastic buy-back or collection centre" className="impact-action__main-img" />
            </div>
            <div className="impact-action__solutions">
              {solutionBlocks.map((s, i) => (
                <div key={i} className="impact-solution-block impact-animate">
                  <span className="impact-solution-block__num">0{i + 1}</span>
                  <div className="impact-solution-block__content">
                    <h4 className="impact-solution-block__title">{s.title}</h4>
                    <p className="impact-solution-block__desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="impact-action__gallery">
            <div className="impact-action__gallery-card">
              <img src={cefPsPlaceholder} alt="Plastic lumber, recycled furniture or finished product" />
              <span className="impact-action__gallery-tag">Recycling</span>
            </div>
            <div className="impact-action__gallery-card">
              <img src={cefPsPlaceholder} alt="Plastic sorting, shredding or processing facility" />
              <span className="impact-action__gallery-tag">Processing</span>
            </div>
            <div className="impact-action__gallery-card">
              <img src={cefPsPlaceholder} alt="Recycled plastic products" />
              <span className="impact-action__gallery-tag">Products</span>
            </div>
          </div>

          <p className="impact-action__note">
            These solution areas are identified in the consolidated CEF-PS report as activities supported through participating SMEs.
          </p>
        </div>
      </section>

      {/* ─── 6. FEATURED IMPACT STORIES ─── */}
      <section className="impact-stories" id="stories">
        <div className="impact-stories__container">
          <span className="impact-label impact-label--green">Stories of Change</span>
          <h2 className="impact-section-title">People and Enterprises Moving Circularity Forward</h2>

          <div className="impact-stories__grid">
            {impactStories.map((story, i) => (
              <div key={i} className="impact-story-card impact-animate">
                <div className="impact-story-card__image">
                  <img src={cefPsPlaceholder} alt={story.title} />
                </div>
                <div className="impact-story-card__body">
                  <span className="impact-story-card__category">{story.category}</span>
                  <h3 className="impact-story-card__title">{story.title}</h3>
                  <p className="impact-story-card__desc">{story.desc}</p>
                  <span className="impact-story-card__link">
                    Read the Story <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="impact-stories__disclaimer">
            Do not publish a story as a completed impact case study until its facts and images have been approved.
          </p>
        </div>
      </section>

      {/* ─── 7. MONITORING AND ACCOUNTABILITY ─── */}
      <section className="impact-accountability" id="accountability">
        <div className="impact-accountability__container">
          <div className="impact-accountability__layout">
            <div className="impact-accountability__image">
              <img src={cefPsPlaceholder} alt="Project team conducting a monitoring visit at a pilot site" />
            </div>
            <div className="impact-accountability__content">
              <span className="impact-label impact-label--green">Evidence and Learning</span>
              <h2 className="impact-section-title">Tracking Progress Responsibly</h2>
              <p className="impact-accountability__intro">
                Impact reporting under CPF Ghana clearly separates programme targets, activities completed, funds disbursed, outputs delivered, verified outcomes and long-term environmental impact.
              </p>
              <p className="impact-accountability__body">
                The CEF-PS Project Management Unit conducts monitoring and evaluation activities at pilot sites to verify baseline information, support participating SMEs, monitor the use of funds and assess alignment with the project results framework.
              </p>

              <div className="impact-accountability__principles">
                {reportingPrinciples.map((p, i) => (
                  <div key={i} className="impact-principle">
                    <span className="impact-principle__icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5L6 12 2.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <div className="impact-principle__text">
                      <strong>{p.title}</strong>
                      <span>{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/knowledge-hub" className="impact-btn impact-btn--primary">
                View Reports and Resources
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>

              <div className="impact-accountability__updated">Last updated: June 2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. IMPACT GALLERY ─── */}
      <section className="impact-gallery">
        <div className="impact-gallery__container">
          <h2 className="impact-section-title">Impact in Pictures</h2>
          <p className="impact-section-desc">
            A visual record of workshops, pilot-site visits, stakeholder engagement, enterprise activities and circular solutions.
          </p>

          <div className="impact-gallery__grid">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`impact-gallery__item ${i === 0 ? 'impact-gallery__item--large' : ''}`}
                onClick={() => setLightboxIndex(i)}
              >
                <img src={cefPsPlaceholder} alt={img.title} />
                <div className="impact-gallery__caption">
                  <span className="impact-gallery__caption-cat">{img.category}</span>
                  <span className="impact-gallery__caption-title">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="impact-lightbox" onClick={() => setLightboxIndex(null)}>
          <div className="impact-lightbox__inner" onClick={e => e.stopPropagation()}>
            <button className="impact-lightbox__close" onClick={() => setLightboxIndex(null)} aria-label="Close lightbox">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <img src={cefPsPlaceholder} alt={galleryImages[lightboxIndex].title} className="impact-lightbox__img" />
            <div className="impact-lightbox__info">
              <span>{galleryImages[lightboxIndex].category}</span>
              <strong>{galleryImages[lightboxIndex].title}</strong>
            </div>
            <div className="impact-lightbox__nav">
              <button
                onClick={() => setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : galleryImages.length - 1)}
                aria-label="Previous image"
              >←</button>
              <button
                onClick={() => setLightboxIndex(lightboxIndex < galleryImages.length - 1 ? lightboxIndex + 1 : 0)}
                aria-label="Next image"
              >→</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── 9. FINAL CTA ─── */}
      <JoinCta />

      <Footer />
    </div>
  )
}

export default Impact
