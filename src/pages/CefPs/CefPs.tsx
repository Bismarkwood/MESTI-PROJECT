import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import JoinCta from '../../components/JoinCta'
import './CefPs.css'

// Removed placeholder import

// Partner Logos
import unidoLogo from '../../assets/UNIDO.webp'
import MESTLogo from '../../assets/Mesti.png'
import epaLogo from '../../assets/EPA.webp'

// Data types for interactive modals
interface PilotSolution {
  id: string
  title: string
  category: string
  enterprise: string
  location: string
  status: string
  description: string
  detailedDescription: string
  impactTarget: string
  image: string
}

interface ComponentInfo {
  num: string
  title: string
  shortDesc: string
  fullDesc: string
  keyActivities: string[]
}

const pilotSolutionsData: PilotSolution[] = [
  {
    id: 'buy-back',
    title: 'Community Buy-Back Centres',
    category: 'Collection & Recovery',
    enterprise: 'Participating Pilot SMEs · Collection Network',
    location: 'Greater Accra & Ashanti Regions',
    status: 'Active Pilot',
    description: 'Creating accessible collection points where communities can return plastic materials for recovery.',
    detailedDescription: 'This initiative establishes decentralized buy-back centers within high-density communities and coastal zones. By offering immediate financial incentives for sorted PET, HDPE, and LDPE plastics, the centers intercept waste before it reaches informal dumpsites or water bodies. Each center serves as a community education hub on segregation at source.',
    impactTarget: 'Targeting over 25,000 tonnes of recovered plastic per year and creating sustainable livelihoods for informal waste pickers.',
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'lumber',
    title: 'Plastic Lumber and Furniture',
    category: 'Recycling & Manufacturing',
    enterprise: 'Participating Pilot SMEs · Eco-Materials',
    location: 'Tema / Greater Accra',
    status: 'Scaling Production',
    description: 'Converting plastic waste into durable lumber for furniture and other useful products.',
    detailedDescription: 'Using advanced extrusion and compression molding techniques, participating SMEs transform mixed and low-value plastic waste into high-strength synthetic lumber. This lumber replaces timber in outdoor furniture, school desks, decking, and municipal construction, directly mitigating deforestation while tackling plastic pollution.',
    impactTarget: 'Diverting 18,000 tonnes of hard-to-recycle plastics into long-life infrastructure and school furniture.',
    image: 'https://images.unsplash.com/photo-1499933374294-4584d31507cb?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'yarn',
    title: 'Recycled Plastic Yarn',
    category: 'Material Innovation',
    enterprise: 'Participating Pilot SMEs · Textile Recovery',
    location: 'Accra Industrial Area',
    status: 'Technical Testing',
    description: 'Processing recovered plastic into material for textile and manufacturing applications.',
    detailedDescription: 'This pilot focuses on high-grade bottle-to-fiber recycling. Cleaned and flaked PET bottles are processed into recycled polyester (rPET) yarn and strapping. The recovered fiber supplies doMESTc textile manufacturers and industrial packaging sectors, fostering a true closed-loop material economy in Ghana.',
    impactTarget: 'Replacing imported virgin polyester with 100% locally recovered post-consumer rPET fiber.',
    image: 'https://images.unsplash.com/photo-1550005809-91ad75fb315f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'pavement',
    title: 'Plastic Pavement Products',
    category: 'Infrastructure & Construction',
    enterprise: 'Participating Pilot SMEs · Green Construction',
    location: 'Kumasi & Takoradi',
    status: 'Active Pilot',
    description: 'Transforming plastic waste into paving blocks and related construction materials.',
    detailedDescription: 'By binding shredded non-recyclable plastic waste with sand and aggregate, pilot SMEs produce heavy-duty pavement blocks and road construction tiles. These polymer-modified tiles exhibit superior compressive strength and water resistance compared to standard concrete blocks, ideal for municipal walkways and drainage.',
    impactTarget: 'Targeting 20,000 tonnes of flexible and single-use plastic waste utilized in municipal road paving projects.',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'alternatives',
    title: 'Alternatives to Plastic',
    category: 'Eco-Design & Substitution',
    enterprise: 'Participating Pilot SMEs · Bio-Innovation',
    location: 'Nationwide Deployment',
    status: 'Research & Development',
    description: 'Supporting the development and adoption of products that reduce dependence on conventional plastics.',
    detailedDescription: 'To address plastics that cannot be economically recovered, this component supports SMEs pioneering biodegradable packaging, agricultural mulch films from cassava starch, and reusable packaging models. The initiative includes technical incubation, lifecycle assessment, and market readiness testing.',
    impactTarget: 'Eliminating 15,000 tonnes of conventional single-use plastics through viable bio-based and reusable substitutes.',
    image: 'https://images.unsplash.com/photo-1605600659901-523190fcb691?auto=format&fit=crop&q=80&w=800',
  },
]

const componentsData: ComponentInfo[] = [
  {
    num: '01',
    title: 'Enabling Framework',
    shortDesc: 'Strengthening the legal, policy and institutional environment required to support a circular economy for plastics in Ghana.',
    fullDesc: 'Component 1 focuses on building the governance architecture needed to transition from a linear to a circular plastics economy. It aligns national regulatory instruments with global best practices and the National Plastic Management Policy (NPMP).',
    keyActivities: [
      'Drafting standard operating procedures (SOPs) for secondary resource markets.',
      'Harmonizing national standards for recycled resin and plastic products.',
      'Institutional strengthening for MEST, EPA, and municipal authorities.',
      'Establishing legal mechanisms for Extended Producer Responsibility (EPR) integration.',
    ],
  },
  {
    num: '02',
    title: 'Capacity Building and Pilot Projects',
    shortDesc: 'Supporting stakeholder training, public-private partnerships, technology transfer and pilot projects that demonstrate practical circular-economy solutions.',
    fullDesc: 'Component 2 is the operational engine of CEF-PS, channeling financial, technical, and equipment support directly to enterprises and stakeholders on the ground to demonstrate commercial viability.',
    keyActivities: [
      'Disbursing capital and technical assistance to 11 participating SME pilot projects.',
      'Facilitating international technology transfer in advanced recycling and extrusion.',
      'Training over 2,000 value chain actors, including informal waste pickers and municipal officers.',
      'Forming public-private coalitions for localized plastic waste interception.',
    ],
  },
  {
    num: '03',
    title: 'Coordination and Knowledge Management',
    shortDesc: 'Improving communication, collaboration, public awareness and knowledge sharing among national and international stakeholders.',
    fullDesc: 'Component 3 ensures that data, lessons learned, and public awareness campaigns reach all strata of Ghanaian society, fostering behavior change and seamless stakeholder coordination across sectors.',
    keyActivities: [
      'Operationalizing the National Plastic Action Partnership (NPAP) coordination hub.',
      'Deploying a centralized national methodology for plastic waste data accounting.',
      'Running nationwide educational campaigns on circularity and waste segregation.',
      'Hosting annual knowledge-sharing forums and ministerial roundtables.',
    ],
  },
  {
    num: '04',
    title: 'Monitoring, Evaluation and Replication',
    shortDesc: 'Tracking implementation, measuring results, documenting lessons and supporting the replication of successful solutions.',
    fullDesc: 'Component 4 guarantees project accountability, rigorous verification of environmental impact, and the creation of scalability blueprints for regional expansion across West Africa.',
    keyActivities: [
      'Conducting 50+ rigorous site inspections and compliance auditing missions.',
      'Publishing verified recovery and marine litter prevention metrics.',
      'Developing replication toolkits for municipal assemblies across all 16 regions.',
      'Mid-term reviews and continuous socioeconomic impact assessments.',
    ],
  },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800', title: 'Project Steering Committee Session', category: 'Governance · 2024', desc: 'Strategic oversight meeting with representatives from MEST, EPA, UNIDO, and GEF discussing pilot disbursement milestones.' },
  { src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800', title: 'Ministerial Monitoring & Evaluation Tour', category: 'Field Visit · 2024', desc: 'High-level delegation inspecting newly installed plastic extrusion and lumber processing machinery at participating SME facilities in Tema.' },
  { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800', title: 'Stakeholder Circularity Workshop', category: 'Capacity Building · 2025', desc: 'Technical training session for municipal waste coordinators and private recycler aggregators on standard operating procedures.' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=800', title: 'SME Fund Disbursement Ceremony', category: 'Enterprise Support · 2025', desc: 'Official handover of catalytic grant funding and technical transfer packages to the 11 selected circular economy enterprises.' },
  { src: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800', title: 'Community Buy-Back Center Activation', category: 'Recovery Network · 2025', desc: 'Community members participating in a segregated plastic collection drive at an active coastal interception center in Greater Accra.' },
]

function CefPs() {
  const [, setActiveNav] = useState('hero')
  const [selectedPilot, setSelectedPilot] = useState<PilotSolution | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null)

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const pilotScrollRef = useRef<HTMLDivElement>(null)



  // Track active section for sticky navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'snapshot', 'overview', 'components', 'targets', 'pilots', 'milestones', 'resources', 'gallery', 'partners']
      const scrollPos = window.scrollY + 200

      for (const sec of sections) {
        const el = document.getElementById(sec)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(sec)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const yOffset = -80
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Horizontal scroll controls for pilot projects
  const scrollPilots = (direction: 'left' | 'right') => {
    if (pilotScrollRef.current) {
      const { scrollLeft, clientWidth } = pilotScrollRef.current
      const scrollAmount = clientWidth * 0.75
      pilotScrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="cefps-page">
      <SEO
        title="CEF-PS · National Circular Plastics Project | GEF Project 10401"
        description="Establishing a Circular Economy Framework for the Plastic Sector in Ghana. Supporting policy, capacity building, 11 pilot SMEs, and preventing marine litter."
        path="/cef-ps"
      />
      <Navbar />


      {/* ─── 1. PROJECT HERO ─── */}
      <section className="cefps-hero" id="hero">


        <div className="cefps-hero__container">
          <div className="cefps-hero__left">

            <div className="cefps-hero__label">
              <span className="cefps-hero__label-dot" />
              National Circular Plastics Project · GEF Project 10401
            </div>

            <h1 className="cefps-hero__title">
              Establishing a Circular Economy Framework for the Plastic Sector in Ghana
            </h1>

            <p className="cefps-hero__intro">
              CEF-PS is supporting Ghana’s transition from a linear plastics economy towards a circular system that reduces waste, promotes reuse and recycling, supports innovation and prevents plastic leakage into waterways and oceans.
            </p>

            <div className="cefps-hero__actions">
              <button type="button" className="cefps-btn cefps-btn--gold" onClick={() => scrollToSection('pilots')}>
                Explore Project Activities
                <svg className="cefps-btn-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
              <button type="button" className="cefps-btn cefps-btn--outline-blue" onClick={() => scrollToSection('resources')}>
                View Resources
              </button>
            </div>

            <div className="cefps-hero__details-card">
              <div className="cefps-hero__details-grid">
                <div className="cefps-detail-item">
                  <span className="cefps-detail-label">Project period</span>
                  <strong className="cefps-detail-val">November 2021 – November 2026</strong>
                </div>
                <div className="cefps-detail-item">
                  <span className="cefps-detail-label">Total budget</span>
                  <strong className="cefps-detail-val">USD 7 million</strong>
                </div>
                <div className="cefps-detail-item">
                  <span className="cefps-detail-label">Funded by</span>
                  <strong className="cefps-detail-val">Global Environment Facility</strong>
                </div>
                <div className="cefps-detail-item">
                  <span className="cefps-detail-label">Implemented by</span>
                  <strong className="cefps-detail-val">UNIDO</strong>
                </div>
                <div className="cefps-detail-item cefps-detail-item--full">
                  <span className="cefps-detail-label">Executed by</span>
                  <strong className="cefps-detail-val">MEST and EPA Ghana</strong>
                </div>
              </div>

            </div>

          </div>


        </div>
      </section>

      {/* ─── 2. PROJECT SNAPSHOT ─── */}
      <section className="cefps-snapshot" id="snapshot">
        <div className="cefps-snapshot__container">
          <div className="cefps-snapshot__grid">
            <div className="cefps-stat-card cefps-stat-card--blue">
              <div className="cefps-stat-num">USD 7M</div>
              <div className="cefps-stat-label">Total Project Budget</div>
              <div className="cefps-stat-bar" />
            </div>
            <div className="cefps-stat-card cefps-stat-card--gold">
              <div className="cefps-stat-num">5 Years</div>
              <div className="cefps-stat-label">Project Implementation Period</div>
              <div className="cefps-stat-bar" />
            </div>
            <div className="cefps-stat-card cefps-stat-card--blue">
              <div className="cefps-stat-num">11 SMEs</div>
              <div className="cefps-stat-label">Participating Pilot Enterprises</div>
              <div className="cefps-stat-bar" />
            </div>
            <div className="cefps-stat-card cefps-stat-card--green">
              <div className="cefps-stat-num">4 Components</div>
              <div className="cefps-stat-label">Supporting Ghana’s Circular-Plastics Transition</div>
              <div className="cefps-stat-bar" />
            </div>
          </div>
          <div className="cefps-snapshot__note">
            <svg className="cefps-note-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
            <span>Project information based on the latest approved reporting period. The project currently has eleven participating SMEs following the withdrawal of one initial participant.</span>
          </div>
        </div>
      </section>

      {/* ─── 3. PROJECT OVERVIEW ─── */}
      <section className="cefps-overview" id="overview">
        <div className="cefps-overview__container">
          <div className="cefps-overview__left">
            <div className="cefps-overview__img-wrap">
              <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800" alt="Ghana Plastic Waste Interception" className="cefps-overview__img" />
              <div className="cefps-overview__img-caption">
                <strong>National Capacity Building</strong>
                <span>Supporting public-private coordination across municipal assemblies.</span>
              </div>
            </div>
          </div>
          <div className="cefps-overview__right">
            <div className="cefps-section-tag">
              <span>About the Project</span>
            </div>
            <h2 className="cefps-section-title">
              Moving Ghana’s Plastics Sector from Linear to Circular
            </h2>
            <div className="cefps-overview__editorial">
              <p>
                CEF-PS is a national project designed to strengthen Ghana’s capacity to manage plastics sustainably.
              </p>
              <p>
                Anchored in the National Plastic Management Policy and the National Plastic Action Partnership, the project supports improvements in policy, institutional coordination, technical capacity, technology transfer, circular businesses and plastic-waste recovery.
              </p>
              <p>
                Its broader objective is to reduce plastic pollution, prevent waste from entering oceans and waterways and create environmental and economic opportunities through responsible plastic management.
              </p>
            </div>


          </div>
        </div>
      </section>

      {/* ─── 4. PROJECT COMPONENTS ─── */}
      <section className="cefps-components" id="components">
        <div className="cefps-components__container">
          <div className="cefps-components__header">
            <div className="cefps-section-tag">
              <span>How the Project Works</span>
            </div>
            <h2 className="cefps-section-title">
              Four Components Driving the Transition
            </h2>
            <p className="cefps-section-sub">
              These four components follow the project structure outlined in the consolidated report to deliver systemic reform across Ghana's plastics sector.
            </p>
          </div>

          <div className="cefps-components__grid">
            {componentsData.map((comp) => (
              <div
                key={comp.num}
                className="cefps-comp-card"
                onClick={() => setSelectedComponent(comp)}
              >
                <div className="cefps-comp-card__top">
                  <span className="cefps-comp-card__num">{comp.num}</span>
                  <div className="cefps-comp-card__icon">
                    {comp.num === '01' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>}
                    {comp.num === '02' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
                    {comp.num === '03' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>}
                    {comp.num === '04' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                  </div>
                </div>
                <h3 className="cefps-comp-card__title">{comp.title}</h3>
                <p className="cefps-comp-card__desc">{comp.shortDesc}</p>
                <div className="cefps-comp-card__cta">
                  <span>Learn more</span>
                  <span className="cefps-comp-card__arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. PROJECT TARGETS ─── */}
      <section className="cefps-targets" id="targets">
        <div className="cefps-targets__bg-outline" />
        <div className="cefps-targets__container">
          <div className="cefps-targets__header">
            <div className="cefps-section-tag cefps-section-tag--gold">
              <span>Expected Results</span>
            </div>
            <h2 className="cefps-section-title cefps-section-title--white">
              What CEF-PS Aims to Deliver
            </h2>
            <p className="cefps-targets__sub">
              These figures represent official <strong>project targets</strong> for national recovery, capacity building, and marine litter prevention over the 5-year implementation cycle.
            </p>
          </div>

          <div className="cefps-targets__grid">
            <div className="cefps-target-card">
              <div className="cefps-target-ring">
                <svg viewBox="0 0 36 36" className="cefps-ring-svg">
                  <path className="cefps-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="cefps-ring-val cefps-ring-val--80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="cefps-target-num">93,000</div>
              </div>
              <div className="cefps-target-unit">tonnes</div>
              <div className="cefps-target-label">Plastic waste targeted for recovery</div>
            </div>

            <div className="cefps-target-card">
              <div className="cefps-target-ring">
                <svg viewBox="0 0 36 36" className="cefps-ring-svg">
                  <path className="cefps-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="cefps-ring-val cefps-ring-val--85" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="cefps-target-num">13,000+</div>
              </div>
              <div className="cefps-target-unit">tonnes</div>
              <div className="cefps-target-label">Marine litter targeted for prevention</div>
            </div>

            <div className="cefps-target-card">
              <div className="cefps-target-ring">
                <svg viewBox="0 0 36 36" className="cefps-ring-svg">
                  <path className="cefps-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="cefps-ring-val cefps-ring-val--90" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="cefps-target-num">2,000</div>
              </div>
              <div className="cefps-target-unit">stakeholders</div>
              <div className="cefps-target-label">Targeted for training across the plastics sector</div>
            </div>

            <div className="cefps-target-card">
              <div className="cefps-target-ring">
                <svg viewBox="0 0 36 36" className="cefps-ring-svg">
                  <path className="cefps-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="cefps-ring-val cefps-ring-val--75" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="cefps-target-num">50</div>
              </div>
              <div className="cefps-target-unit">inspections</div>
              <div className="cefps-target-label">Planned to support monitoring and compliance</div>
            </div>
          </div>

          <div className="cefps-targets__disclaimer">
            <blockquote>
              Results will be updated as verified project data becomes available through official M&amp;E reports.
            </blockquote>
          </div>
        </div>
      </section>

      {/* ─── 6. PILOT PROJECTS AND SOLUTIONS ─── */}
      <section className="cefps-pilots" id="pilots">
        <div className="cefps-pilots__container">
          <div className="cefps-pilots__header">
            <div className="cefps-pilots__header-text">
              <div className="cefps-section-tag">
                <span>Circularity in Action</span>
              </div>
              <h2 className="cefps-section-title">
                Supporting Practical Solutions Across the Plastics Value Chain
              </h2>
              <p className="cefps-section-sub">
                CEF-PS works with participating SMEs to implement solutions that improve plastic recovery, create new products and demonstrate circular business models. The consolidated report identifies these among the circular activities supported through the eleven participating SMEs.
              </p>
            </div>
            <div className="cefps-pilots__controls">
              <button
                type="button"
                className="cefps-slider-btn"
                onClick={() => scrollPilots('left')}
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                type="button"
                className="cefps-slider-btn"
                onClick={() => scrollPilots('right')}
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div className="cefps-pilots__track" ref={pilotScrollRef}>
            {pilotSolutionsData.map((pilot) => (
              <div
                key={pilot.id}
                className="cefps-pilot-card"
                onClick={() => setSelectedPilot(pilot)}
              >
                <div className="cefps-pilot-card__img-wrap">
                  <img src={pilot.image} alt={pilot.title} className="cefps-pilot-card__img" loading="lazy" />
                </div>
                <div className="cefps-pilot-card__body">
                  <h3 className="cefps-pilot-card__title">{pilot.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="cefps-pilots__bottom-cta">
            <button
              type="button"
              className="cefps-btn cefps-btn--blue-solid"
              onClick={() => setSelectedPilot(pilotSolutionsData[0])}
            >
              View All Pilot Projects
            </button>
          </div>
        </div>
      </section>

      {/* ─── 7. PROJECT MILESTONES ─── */}
      <section className="cefps-milestones" id="milestones">
        <div className="cefps-milestones__container">
          <div className="cefps-milestones__header">
            <div className="cefps-section-tag">
              <span>Project Journey</span>
            </div>
            <h2 className="cefps-section-title">
              Progress from Inception to Implementation
            </h2>
            <p className="cefps-section-sub">
              Tracking key developmental milestones of CEF-PS across its 5-year execution lifecycle.
            </p>
          </div>

          <div className="cefps-timeline">
            <div className="cefps-timeline__line" />

            <div className="cefps-timeline-item">
              <div className="cefps-timeline-marker" />
              <div className="cefps-timeline-year">2021</div>
              <h3 className="cefps-timeline-title">Inception</h3>
              <p className="cefps-timeline-desc">Project launched.</p>
            </div>

            <div className="cefps-timeline-item">
              <div className="cefps-timeline-marker" />
              <div className="cefps-timeline-year">2022</div>
              <h3 className="cefps-timeline-title">Execution</h3>
              <p className="cefps-timeline-desc">Agreements signed.</p>
            </div>

            <div className="cefps-timeline-item">
              <div className="cefps-timeline-marker" />
              <div className="cefps-timeline-year">2023</div>
              <h3 className="cefps-timeline-title">Governance</h3>
              <p className="cefps-timeline-desc">Committees formed.</p>
            </div>

            <div className="cefps-timeline-item">
              <div className="cefps-timeline-marker" />
              <div className="cefps-timeline-year">2024</div>
              <h3 className="cefps-timeline-title">Partnerships</h3>
              <p className="cefps-timeline-desc">Mid-term review completed.</p>
            </div>

            <div className="cefps-timeline-item cefps-timeline-item--current">
              <div className="cefps-timeline-marker cefps-timeline-marker--gold">
                <span className="cefps-marker-pulse" />
              </div>
              <div className="cefps-timeline-year cefps-timeline-year--gold">
                2025 <span className="cefps-current-tag">Current</span>
              </div>
              <h3 className="cefps-timeline-title">Implementation</h3>
              <p className="cefps-timeline-desc">Pilot funding disbursed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. RESOURCES AND UPDATES ─── */}
      <section className="cefps-resources" id="resources">
        <div className="cefps-resources__container">
          <div className="cefps-resources__grid">
            {/* Resource Card */}
            <div className="cefps-res-card">
              <div className="cefps-res-card__tags">
                <span className="cefps-tag">Report</span>
                <span className="cefps-tag">Guideline</span>
                <span className="cefps-tag">SOP</span>
                <span className="cefps-tag">Methodology</span>
              </div>
              <div className="cefps-res-card__body">
                <span className="cefps-res-super">Project Resources</span>
                <h3 className="cefps-res-title">Access CEF-PS Documents</h3>
                <p className="cefps-res-desc">
                  Explore project reports, technical guidelines, training materials, publications and implementation resources.
                </p>
              </div>
              <div className="cefps-res-card__visual">
                <div className="cefps-doc-stack">
                  <div className="cefps-doc-page cefps-doc-page--3" />
                  <div className="cefps-doc-page cefps-doc-page--2" />
                  <div className="cefps-doc-page cefps-doc-page--1">
                    <div className="cefps-doc-header">GEF Project 10401 · Technical Series</div>
                    <div className="cefps-doc-title">CEF-PS Consolidated Progress Report &amp; SME Guidelines</div>
                    <div className="cefps-doc-lines">
                      <div className="cefps-doc-line" />
                      <div className="cefps-doc-line cefps-doc-line--short" />
                      <div className="cefps-doc-line" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="cefps-res-card__footer">
                <a href="#resources" className="cefps-res-link" onClick={(e) => { e.preventDefault(); alert('Resource Document Library is being updated with the latest approved reporting period PDFs.') }}>
                  <span>Browse Resources</span>
                  <span className="cefps-res-arrow">→</span>
                </a>
              </div>
            </div>

            {/* Update Card */}
            <div className="cefps-res-card">
              <div className="cefps-res-card__tags">
                <span className="cefps-tag">News</span>
                <span className="cefps-tag">Gallery</span>
                <span className="cefps-tag">Field Visit</span>
                <span className="cefps-tag">Workshop</span>
              </div>
              <div className="cefps-res-card__body">
                <span className="cefps-res-super">Project Updates</span>
                <h3 className="cefps-res-title">Follow Project Activities</h3>
                <p className="cefps-res-desc">
                  View stakeholder engagements, pilot-project visits, training activities, announcements and implementation updates.
                </p>
              </div>
              <div className="cefps-res-card__visual">
                <div className="cefps-update-photo-wrap">
                  <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800" alt="CEF-PS Field Monitoring Visit" className="cefps-update-photo" />
                  <div className="cefps-update-badge">
                    <strong>Latest Activity</strong>
                    <span>Ministerial &amp; Steering Committee Site Tour</span>
                  </div>
                </div>
              </div>
              <div className="cefps-res-card__footer">
                <button type="button" className="cefps-res-link" onClick={() => scrollToSection('gallery')}>
                  <span>View Updates</span>
                  <span className="cefps-res-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. PROJECT GALLERY ─── */}
      <section className="cefps-gallery" id="gallery">
        <div className="cefps-gallery__container">
          <div className="cefps-gallery__header">
            <div className="cefps-gallery__header-left">
              <div className="cefps-section-tag">
                <span>CEF-PS in Action</span>
              </div>
              <h2 className="cefps-section-title">
                Photographic Highlights from Implementation
              </h2>
            </div>
            <p className="cefps-gallery__sub">
              Featuring Steering Committee sessions, stakeholder workshops, ministerial tours, M&amp;E field visits, pilot sites, and SME funding activities.
            </p>
          </div>

          <div className="cefps-masonry">
            {/* Featured Large Image (Index 0) */}
            <div className="cefps-masonry__item cefps-masonry__item--featured" onClick={() => setLightboxIndex(0)}>
              <img src={galleryImages[0].src} alt={galleryImages[0].title} className="cefps-masonry__img" />
              <div className="cefps-masonry__overlay">
                <span className="cefps-masonry-cat">{galleryImages[0].category}</span>
                <h3 className="cefps-masonry-title">{galleryImages[0].title}</h3>
                <p className="cefps-masonry-desc">{galleryImages[0].desc}</p>
              </div>
            </div>

            {/* 4 Smaller Images (Indices 1 to 4) */}
            <div className="cefps-masonry__subgrid">
              {galleryImages.slice(1).map((img, i) => (
                <div key={img.title} className="cefps-masonry__item" onClick={() => setLightboxIndex(i + 1)}>
                  <img src={img.src} alt={img.title} className="cefps-masonry__img" loading="lazy" />
                  <div className="cefps-masonry__overlay">
                    <span className="cefps-masonry-cat">{img.category}</span>
                    <h4 className="cefps-masonry-title">{img.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cefps-gallery__cta">
            <button type="button" className="cefps-btn cefps-btn--outline" onClick={() => setLightboxIndex(0)}>
              View Full Gallery
            </button>
          </div>
        </div>
      </section>

      {/* ─── 10. PARTNERS ─── */}
      <section className="cefps-partners" id="partners">
        <div className="cefps-partners__container">
          <div className="cefps-partners__header">
            <div className="cefps-section-tag">
              <span>Project Leadership and Partnerships</span>
            </div>
            <h2 className="cefps-section-title">
              National &amp; International Institutional Coordination
            </h2>
            <p className="cefps-section-sub">
              MEST and EPA remain clearly positioned as the national executing institutions, driving Ghana’s sustainable circular transformation.
            </p>
          </div>

          <div className="cefps-partners__tiers">
            {/* Row 1: Funded by */}
            <div className="cefps-tier-row">
              <div className="cefps-tier-label">1. Funded by</div>
              <div className="cefps-tier-content">
                <div className="cefps-institution-card cefps-institution-card--gold">
                  <div className="cefps-inst-badge">Global Environment Facility (GEF)</div>
                  <div className="cefps-inst-details">
                    <strong>Global Environment Facility</strong>
                    <span>Providing primary catalytic financing under GEF Project 10401 to combat marine plastics and advance circularity.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Implemented by */}
            <div className="cefps-tier-row">
              <div className="cefps-tier-label">2. Implemented by</div>
              <div className="cefps-tier-content">
                <div className="cefps-institution-card">
                  <div className="cefps-inst-logo-wrap">
                    <img src={unidoLogo} alt="UNIDO" className="cefps-inst-logo" />
                  </div>
                  <div className="cefps-inst-details">
                    <strong>United Nations Industrial Development Organization (UNIDO)</strong>
                    <span>Specialized UN implementing agency overseeing technical cooperation, international technology transfer, and monitoring.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Executed with partners */}
            <div className="cefps-tier-row">
              <div className="cefps-tier-label">3. Executed with partners</div>
              <div className="cefps-tier-content cefps-tier-content--multi">
                {/* Executing Institutions */}
                <div className="cefps-institution-card cefps-institution-card--exec">
                  <div className="cefps-inst-logo-row">
                    <img src={MESTLogo} alt="MEST" className="cefps-inst-logo" />
                    <img src={epaLogo} alt="EPA Ghana" className="cefps-inst-logo" />
                  </div>
                  <div className="cefps-inst-details">
                    <strong>Ministry of Environment, Science, Technology and Innovation (MEST) &amp; Environmental Protection Agency Ghana (EPA Ghana)</strong>
                    <span>National executing authorities responsible for regulatory enforcement, policy alignment, and national coordination.</span>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 11. FINAL CALL TO ACTION ─── */}
      <JoinCta
        heading="Be Part of Ghana's Circular-Plastics Transition"
        description="Businesses, researchers, development partners, public institutions and communities all have a role to play."
      />

      <Footer />

      {/* ─── MODAL: PILOT PROJECT PROFILE ─── */}
      {selectedPilot && (
        <div className="cefps-modal-backdrop" onClick={() => setSelectedPilot(null)}>
          <div className="cefps-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="cefps-modal-close" onClick={() => setSelectedPilot(null)} aria-label="Close modal">✕</button>
            <div className="cefps-modal__header">
              <span className="cefps-modal__cat">{selectedPilot.category} · {selectedPilot.status}</span>
              <h3 className="cefps-modal__title">{selectedPilot.title}</h3>
              <div className="cefps-modal__meta">
                <span>🏢 {selectedPilot.enterprise}</span>
                <span>📍 {selectedPilot.location}</span>
              </div>
            </div>
            <div className="cefps-modal__body">
              <div className="cefps-modal__img-wrap">
                <img src={selectedPilot.image} alt={selectedPilot.title} className="cefps-modal__img" />
              </div>
              <div className="cefps-modal__content">
                <h4 className="cefps-modal__section-heading">Project Solution Overview</h4>
                <p>{selectedPilot.detailedDescription}</p>

                <h4 className="cefps-modal__section-heading">Target Environmental &amp; Economic Impact</h4>
                <div className="cefps-modal__impact-box">
                  <span className="cefps-impact-icon">🎯</span>
                  <p>{selectedPilot.impactTarget}</p>
                </div>

                <div className="cefps-modal__notice">
                  <span>ℹ️ Pilot project operations are monitored under CEF-PS Component 2 &amp; 4 compliance frameworks.</span>
                </div>
              </div>
            </div>
            <div className="cefps-modal__footer">
              <button type="button" className="cefps-btn cefps-btn--blue-solid" onClick={() => setSelectedPilot(null)}>
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: COMPONENT DETAILS ─── */}
      {selectedComponent && (
        <div className="cefps-modal-backdrop" onClick={() => setSelectedComponent(null)}>
          <div className="cefps-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="cefps-modal-close" onClick={() => setSelectedComponent(null)} aria-label="Close modal">✕</button>
            <div className="cefps-modal__header">
              <span className="cefps-modal__cat">CEF-PS Project Component · {selectedComponent.num}</span>
              <h3 className="cefps-modal__title">{selectedComponent.title}</h3>
            </div>
            <div className="cefps-modal__body">
              <div className="cefps-modal__content">
                <p className="cefps-modal__lead">{selectedComponent.fullDesc}</p>
                <h4 className="cefps-modal__section-heading">Key Implementation Activities:</h4>
                <ul className="cefps-modal__list">
                  {selectedComponent.keyActivities.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="cefps-modal__footer">
              <button type="button" className="cefps-btn cefps-btn--blue-solid" onClick={() => setSelectedComponent(null)}>
                Close Component Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: CONTACT TEAM ─── */}
      {contactModalOpen && (
        <div className="cefps-modal-backdrop" onClick={() => setContactModalOpen(false)}>
          <div className="cefps-modal cefps-modal--sm" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="cefps-modal-close" onClick={() => setContactModalOpen(false)} aria-label="Close modal">✕</button>
            <div className="cefps-modal__header">
              <span className="cefps-modal__cat">National Project Management Unit</span>
              <h3 className="cefps-modal__title">Contact the CEF-PS Team</h3>
            </div>
            <div className="cefps-modal__body">
              <div className="cefps-modal__content">
                <p>For official inquiries regarding GEF Project 10401, stakeholder coordination, or pilot enterprise partnerships, please connect with the Project Management Unit at MEST and EPA Ghana.</p>
                <div className="cefps-contact-info">
                  <div className="cefps-contact-row">
                    <strong>Ministry of Environment, Science, Technology and Innovation (MEST)</strong>
                    <span>Ministries Post Office, Box M232, Accra, Ghana</span>
                  </div>
                  <div className="cefps-contact-row">
                    <strong>Environmental Protection Agency (EPA Ghana)</strong>
                    <span>Starlets 91 Road, Ministries, Accra, Ghana</span>
                  </div>
                  <div className="cefps-contact-row">
                    <strong>Email Inquiries:</strong>
                    <a href="mailto:cefps-pmu@MEST.gov.gh">cefps-pmu@MEST.gov.gh</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="cefps-modal__footer">
              <button type="button" className="cefps-btn cefps-btn--blue-solid" onClick={() => setContactModalOpen(false)}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: LIGHTBOX GALLERY ─── */}
      {lightboxIndex !== null && (
        <div className="cefps-lightbox" onClick={() => setLightboxIndex(null)}>
          <button type="button" className="cefps-lightbox-close" onClick={() => setLightboxIndex(null)}>✕</button>
          <button
            type="button"
            className="cefps-lightbox-nav cefps-lightbox-nav--prev"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length) }}
          >
            ‹
          </button>
          <div className="cefps-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img src={galleryImages[lightboxIndex].src} alt={galleryImages[lightboxIndex].title} className="cefps-lightbox__img" />
            <div className="cefps-lightbox__caption">
              <span className="cefps-lightbox__cat">{galleryImages[lightboxIndex].category}</span>
              <h3>{galleryImages[lightboxIndex].title}</h3>
              <p>{galleryImages[lightboxIndex].desc}</p>
            </div>
          </div>
          <button
            type="button"
            className="cefps-lightbox-nav cefps-lightbox-nav--next"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryImages.length) }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}

export default CefPs
