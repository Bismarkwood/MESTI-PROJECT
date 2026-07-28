import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Lightbulb, Users, Settings, ArrowRight, Info, X } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import { HeroScrollSection } from '../../components/HeroSection'
import HeroCTA from '../../components/HeroCTA'
import JoinCta from '../../components/JoinCta'
import './Impact.css'

import cefPsPlaceholder from '../../assets/cef-ps-placeholder.svg'
import processingEquipmentImg from '../../assets/processing-equipment.jpg'
import plasticCollectionImg from '../../assets/plastic-collection.png'
import smeFacilityImg from '../../assets/sme-facility.jpg'

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
  { title: 'Pilot SME production facility', category: 'Enterprise', img: smeFacilityImg },
  { title: 'Ministerial or project-site visit', category: 'Governance', img: cefPsPlaceholder },
  { title: 'Stakeholder workshop', category: 'Capacity Building', img: cefPsPlaceholder },
  { title: 'Plastic collection activity', category: 'Recovery', img: plasticCollectionImg },
  { title: 'Recycled products or processing equipment', category: 'Innovation', img: processingEquipmentImg },
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
        title="CEF-PS Ghana Impact · Progress, Targets and Stories of Change"
        description="Verified progress, programme targets and real stories from CEF-PS Ghana's circular plastics programmes. CEF-PS data clearly labelled as programme-level."
        path="/impact"
      />
      <Navbar />

      {/* ─── 1. IMPACT HERO (CUSTOM PREMIUM) ─── */}
      <section id="overview" className="impact-hero-custom">
        <div className="impact-hero-custom__bg">
          <img src={smeFacilityImg} alt="SME Facility Background" />
          <div className="impact-hero-custom__overlay"></div>
        </div>
        <div className="impact-hero-custom__content">
          <div className="impact-badge-premium">
            <span className="impact-badge-dot"></span>
            Impact and Progress
          </div>
          <h1 className="impact-hero-custom__title">
            Turning Circular-Plastics Ambition into <span className="impact-hero-custom__highlight">Measurable Action</span>
          </h1>
          <p className="impact-hero-custom__desc">
            CEF-PS Ghana brings together programmes, partnerships and practical solutions that strengthen plastic recovery, support circular enterprises, build stakeholder capacity and protect Ghana's environment.
          </p>
          <div className="impact-hero-custom__actions">
            <button className="impact-btn-primary" onClick={() => scrollToSection('progress')}>
              Explore Our Progress
              <ArrowRight size={18} strokeWidth={2} />
            </button>
            <Link to="/cef-ps" className="impact-btn-secondary">
              View Programmes
            </Link>
          </div>
        </div>
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
                <div className="impact-metric-card__figure">{m.figure}</div>
                <div className="impact-metric-card__label">{m.label}</div>
                <p className="impact-metric-card__desc">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="impact-progress__data-label">
            <Info size={14} strokeWidth={1.5} />
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
                  {area.icon === 'leaf' && <Leaf size={24} strokeWidth={1.5} />}
                  {area.icon === 'lightbulb' && <Lightbulb size={24} strokeWidth={1.5} />}
                  {area.icon === 'users' && <Users size={24} strokeWidth={1.5} />}
                  {area.icon === 'settings' && <Settings size={24} strokeWidth={1.5} />}
                </div>
                <span className="impact-area-card__num">{area.num}</span>
                <h3 className="impact-area-card__title">{area.title}</h3>
                <p className="impact-area-card__desc">{area.desc}</p>
                <span className="impact-area-card__link">
                  Learn more <ArrowRight size={14} strokeWidth={1.5} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. IMPACT IN ACTION ─── */}
      <section className="impact-action" id="action">
        <div className="impact-action__container">
          <div className="impact-action__header">
            <span className="impact-label impact-label--green">Circular Solutions</span>
            <h2 className="impact-section-title">From Plastic Waste to Productive Value</h2>
            <p className="impact-section-desc">
              Participating enterprises are implementing solutions across plastic collection, processing, recycling, manufacturing and alternative-material development.
            </p>
          </div>

          <div className="impact-action__grid">
            {solutionBlocks.map((s, i) => (
              <div key={i} className="impact-action-card impact-animate">
                <div className="impact-action-card__img">
                  <img src={cefPsPlaceholder} alt={s.title} />
                </div>
                <div className="impact-action-card__body">
                  <span className="impact-action-card__num">0{i + 1}</span>
                  <h4 className="impact-action-card__title">{s.title}</h4>
                  <p className="impact-action-card__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
                    Read the Story <ArrowRight size={14} strokeWidth={1.5} />
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
                <img src={img.img || cefPsPlaceholder} alt={img.title} />
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
              <X size={24} strokeWidth={2} />
            </button>
            <img src={galleryImages[lightboxIndex].img || cefPsPlaceholder} alt={galleryImages[lightboxIndex].title} className="impact-lightbox__img" />
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
