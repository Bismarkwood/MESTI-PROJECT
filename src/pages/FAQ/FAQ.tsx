import { useState, useEffect, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import './FAQ.css'

interface FaqItem {
  id: string
  q: string
  a: string | React.ReactNode
  category: string
  relatedLink?: { label: string; href: string }
}

const faqData: FaqItem[] = [
  // ─── 3. GENERAL QUESTIONS ───
  {
    id: 'what-is-cpf-ghana',
    category: 'General',
    q: 'What is CPF Ghana?',
    a: (
      <>
        <p>
          CPF Ghana is a national platform under the Ministry of Environment, Science, Technology and Innovation that supports Ghana’s transition towards a circular plastics economy.
        </p>
        <p>
          It brings together government institutions, businesses, development partners, researchers, civil society organisations, waste-sector actors and communities to coordinate action across the plastics value chain.
        </p>
      </>
    ),
    relatedLink: { label: 'Learn More About Us →', href: '/about' },
  },
  {
    id: 'what-is-the-purpose-of-cpf-ghana',
    category: 'General',
    q: 'What is the purpose of CPF Ghana?',
    a: (
      <>
        <p>
          CPF Ghana is intended to improve coordination across Ghana’s plastics sector and provide a central platform for:
        </p>
        <ul>
          <li>Policies and national strategies</li>
          <li>Circular-plastics programmes</li>
          <li>Research and technical resources</li>
          <li>Business and community solutions</li>
          <li>Stakeholder collaboration</li>
          <li>Sector data and progress updates</li>
          <li>Opportunities for participation</li>
        </ul>
        <p>
          Its broader purpose is to support a system where plastic materials are reduced, reused, recovered, recycled and returned to productive use.
        </p>
      </>
    ),
    relatedLink: { label: 'Explore Our Programmes →', href: '/services' },
  },
  {
    id: 'is-cpf-ghana-a-government-platform',
    category: 'General',
    q: 'Is CPF Ghana a government platform?',
    a: (
      <>
        <p>
          Yes. CPF Ghana is presented as a national circular-plastics platform under MESTI.
        </p>
        <p>The website should clearly distinguish between:</p>
        <ul>
          <li>CPF Ghana as the broader national platform</li>
          <li>Individual programmes implemented under it</li>
          <li>Institutions and development partners supporting specific programmes</li>
        </ul>
      </>
    ),
    relatedLink: { label: 'View MESTI & Partner Institutions →', href: '/about' },
  },
  {
    id: 'is-cpf-ghana-the-same-as-cef-ps',
    category: 'General',
    q: 'Is CPF Ghana the same as CEF-PS?',
    a: (
      <>
        <p>No.</p>
        <p>
          CPF Ghana is the broader platform for Ghana’s circular-plastics agenda. CEF-PS is a specific programme that should be featured under the <strong>Programmes and Projects</strong> section of the website.
        </p>
        <p>
          CEF-PS has its own objectives, implementation period, budget, partners, activities and expected results.
        </p>
      </>
    ),
    relatedLink: { label: 'Explore the CEF-PS Project Page →', href: '/cef-ps' },
  },
  {
    id: 'who-can-use-the-cpf-ghana-website',
    category: 'General',
    q: 'Who can use the CPF Ghana website?',
    a: (
      <>
        <p>The platform is intended for:</p>
        <ul>
          <li>Government institutions</li>
          <li>Plastic manufacturers</li>
          <li>Waste collectors and aggregators</li>
          <li>Recycling businesses</li>
          <li>Investors</li>
          <li>Development partners</li>
          <li>Researchers and universities</li>
          <li>Civil society organisations</li>
          <li>Local authorities</li>
          <li>Community groups</li>
          <li>Members of the public</li>
        </ul>
      </>
    ),
    relatedLink: { label: 'Get Involved Today →', href: '/contact' },
  },

  // ─── 4. CIRCULAR PLASTICS QUESTIONS ───
  {
    id: 'what-is-a-circular-plastics-economy',
    category: 'Circular Plastics',
    q: 'What is a circular plastics economy?',
    a: (
      <>
        <p>
          A circular plastics economy is a system where plastic materials are kept in productive use for as long as possible.
        </p>
        <p>
          Instead of following a linear model of producing, using and disposing of plastic, a circular system focuses on:
        </p>
        <p>
          <strong>Reducing → Reusing → Collecting → Recovering → Recycling → Remanufacturing</strong>
        </p>
        <p>
          The objective is to reduce waste, conserve resources and prevent plastic pollution.
        </p>
      </>
    ),
    relatedLink: { label: 'See Circular Solutions in Action →', href: '/solutions' },
  },
  {
    id: 'why-is-a-circular-approach-necessary',
    category: 'Circular Plastics',
    q: 'Why is a circular approach necessary?',
    a: (
      <>
        <p>
          Plastic pollution is not only a waste-collection problem. It is connected to how products are designed, manufactured, consumed, collected and processed.
        </p>
        <p>A circular approach addresses the entire system by encouraging:</p>
        <ul>
          <li>Better product and packaging design</li>
          <li>Responsible production</li>
          <li>Reusable alternatives</li>
          <li>Improved collection</li>
          <li>Stronger recycling capacity</li>
          <li>Markets for recycled materials</li>
          <li>Public participation</li>
          <li>Reliable sector data</li>
        </ul>
      </>
    ),
  },
  {
    id: 'what-types-of-plastics-are-covered',
    category: 'Circular Plastics',
    q: 'What types of plastics are covered?',
    a: (
      <>
        <p>
          The broader platform may provide information relating to different plastic materials, products and packaging used in Ghana.
        </p>
        <p>
          Specific programmes may focus on particular plastic types, value chains, technologies or geographical areas. These details should be stated on each programme or project page.
        </p>
      </>
    ),
    relatedLink: { label: 'Explore Our Programmes →', href: '/services' },
  },
  {
    id: 'does-cpf-ghana-collect-plastic-waste-directly',
    category: 'Circular Plastics',
    q: 'Does CPF Ghana collect plastic waste directly?',
    a: (
      <>
        <p>
          CPF Ghana should primarily be presented as a coordination, information and stakeholder-engagement platform.
        </p>
        <p>
          Plastic collection services may be delivered by registered collectors, aggregators, local authorities, recycling businesses, community organisations or programmes featured on the platform.
        </p>
        <p>
          A future <strong>Circular Solutions Directory</strong> can help users identify relevant organisations and services.
        </p>
      </>
    ),
  },
  {
    id: 'where-can-i-find-a-plastic-collection-or-recycling-organisation',
    category: 'Circular Plastics',
    q: 'Where can I find a plastic collection or recycling organisation?',
    a: (
      <>
        <p>
          Visitors should use the proposed <strong>Circular Solutions</strong> section to search for:
        </p>
        <ul>
          <li>Collection companies</li>
          <li>Buy-back centres</li>
          <li>Aggregators</li>
          <li>Recyclers</li>
          <li>Waste-management organisations</li>
          <li>Alternative-material businesses</li>
          <li>Community initiatives</li>
        </ul>
        <p>
          Search filters can include location, region, plastic type and solution category.
        </p>
      </>
    ),
    relatedLink: { label: 'Browse Circular Solutions →', href: '/solutions' },
  },

  // ─── 5. PROGRAMMES AND PROJECTS ───
  {
    id: 'what-is-cef-ps',
    category: 'Programmes',
    q: 'What is CEF-PS?',
    a: (
      <>
        <p>
          CEF-PS means <strong>Establishing a Circular Economy Framework for the Plastic Sector in Ghana</strong>.
        </p>
        <p>
          It is a national project designed to strengthen Ghana’s ability to transition from a linear plastics economy towards a more sustainable circular system.
        </p>
        <p>
          The project supports policy development, institutional coordination, capacity building, technology transfer, pilot projects, knowledge management, monitoring and replication.
        </p>
      </>
    ),
    relatedLink: { label: 'View Dedicated CEF-PS Page →', href: '/cef-ps' },
  },
  {
    id: 'who-funds-and-implements-cef-ps',
    category: 'Programmes',
    q: 'Who funds and implements CEF-PS?',
    a: (
      <>
        <p>CEF-PS is:</p>
        <ul>
          <li><strong>Funded by:</strong> Global Environment Facility (GEF Project 10401)</li>
          <li><strong>Implemented by:</strong> United Nations Industrial Development Organization (UNIDO)</li>
          <li><strong>Executed by:</strong> MESTI and the Environmental Protection Agency (EPA) Ghana</li>
        </ul>
        <p>
          The consolidated report identifies the project budget as <strong>USD 7 million</strong>.
        </p>
      </>
    ),
    relatedLink: { label: 'Explore CEF-PS Institutional Partners →', href: '/cef-ps' },
  },
  {
    id: 'how-long-does-cef-ps-run',
    category: 'Programmes',
    q: 'How long does CEF-PS run?',
    a: (
      <>
        <p>
          The report states that the project is scheduled from <strong>15 November 2021 to 15 November 2026</strong>.
        </p>
        <p>
          Any future changes to the implementation period should be reflected on the website only after official confirmation.
        </p>
      </>
    ),
  },
  {
    id: 'what-are-the-main-components-of-cef-ps',
    category: 'Programmes',
    q: 'What are the main components of CEF-PS?',
    a: (
      <>
        <p>The programme has four main components:</p>
        <h4>1. Enabling framework</h4>
        <p>Strengthening the legal, institutional and policy environment for circular plastics management.</p>
        
        <h4>2. Capacity building and pilot projects</h4>
        <p>Supporting training, public-private partnerships, technology transfer and practical pilot initiatives.</p>
        
        <h4>3. Coordination and knowledge management</h4>
        <p>Improving communication, collaboration, awareness and knowledge sharing.</p>
        
        <h4>4. Monitoring, evaluation and replication</h4>
        <p>Tracking implementation, assessing results and supporting the replication of effective approaches.</p>
        
        <p><em>These components follow the project structure in the consolidated report.</em></p>
      </>
    ),
    relatedLink: { label: 'View Project Components in Detail →', href: '/cef-ps' },
  },
  {
    id: 'what-results-does-cef-ps-aim-to-achieve',
    category: 'Programmes',
    q: 'What results does CEF-PS aim to achieve?',
    a: (
      <>
        <p>The project report identifies targets that include:</p>
        <ul>
          <li>Recovering at least <strong>93,000 tonnes of plastic waste</strong></li>
          <li>Preventing more than <strong>13,000 tonnes of marine litter</strong></li>
          <li>Training at least <strong>2,000 stakeholders</strong></li>
          <li>Conducting <strong>50 inspections</strong></li>
        </ul>
        <p>
          <em>These are programme targets and should not be displayed as completed achievements until officially verified.</em>
        </p>
      </>
    ),
    relatedLink: { label: 'See Target Targets & Progress →', href: '/cef-ps' },
  },
  {
    id: 'does-cef-ps-support-businesses',
    category: 'Programmes',
    q: 'Does CEF-PS support businesses?',
    a: (
      <>
        <p>
          Yes. CEF-PS includes pilot support for participating small and medium-sized enterprises (SMEs).
        </p>
        <p>
          The report states that the project currently has eleven participating SMEs. Supported activities include community buy-back centres, plastic lumber and furniture, recycled yarn, plastic pavement products and alternatives to conventional plastic materials.
        </p>
      </>
    ),
    relatedLink: { label: 'View Supported Grassroots Solutions →', href: '/cef-ps' },
  },
  {
    id: 'can-businesses-currently-apply-for-cef-ps-funding',
    category: 'Programmes',
    q: 'Can businesses currently apply for CEF-PS funding?',
    a: (
      <>
        <p>
          The consolidated report describes funding and agreements for selected pilot SMEs. It does not establish a general, continuously open application process.
        </p>
        <p>
          Any new calls for proposals, funding or SME participation should be published in the website’s <strong>Opportunities</strong> section with clear eligibility requirements and deadlines.
        </p>
      </>
    ),
  },

  // ─── 6. PARTNERSHIPS AND PARTICIPATION ───
  {
    id: 'who-can-partner-with-cpf-ghana',
    category: 'Partnerships',
    q: 'Who can partner with CPF Ghana?',
    a: (
      <>
        <p>Potential partners may include:</p>
        <ul>
          <li>Government agencies and local authorities</li>
          <li>Manufacturers and recyclers</li>
          <li>Waste-management companies</li>
          <li>Investors and development organisations</li>
          <li>Universities and research institutions</li>
          <li>Civil society organisations and community groups</li>
          <li>Technology providers</li>
        </ul>
        <p>
          Partnership requests should be reviewed according to MESTI’s approved institutional processes.
        </p>
      </>
    ),
    relatedLink: { label: 'Propose a Partnership →', href: '/contact' },
  },
  {
    id: 'how-can-my-organisation-get-involved',
    category: 'Partnerships',
    q: 'How can my organisation get involved?',
    a: (
      <>
        <p>
          Organisations should be able to use a <strong>Get Involved</strong> form to:
        </p>
        <ul>
          <li>Propose a partnership or submit a circular-plastics solution</li>
          <li>Share research or sector data</li>
          <li>Register an organisation or express interest in programmes</li>
          <li>Request information or participate in consultations</li>
        </ul>
        <p>
          <em>The form should make clear that submission does not automatically guarantee approval, partnership or funding.</em>
        </p>
      </>
    ),
    relatedLink: { label: 'Contact Us to Get Involved →', href: '/contact' },
  },
  {
    id: 'can-i-submit-my-recycling-initiative-to-the-website',
    category: 'Partnerships',
    q: 'Can I submit my recycling initiative to the website?',
    a: (
      <>
        <p>Yes, the website can include a structured submission form for circular-plastics initiatives.</p>
        <p>Applicants should provide:</p>
        <ul>
          <li>Organisation name and location</li>
          <li>Initiative description and plastic materials addressed</li>
          <li>Current implementation status</li>
          <li>Environmental or social impact</li>
          <li>Contact information</li>
          <li>Supporting images or documents</li>
        </ul>
        <p>Submissions should be reviewed before publication.</p>
      </>
    ),
    relatedLink: { label: 'Submit Your Initiative →', href: '/contact' },
  },
  {
    id: 'how-can-development-partners-participate',
    category: 'Partnerships',
    q: 'How can development partners participate?',
    a: (
      <>
        <p>Development partners may support:</p>
        <ul>
          <li>Policy and institutional development</li>
          <li>Research and plastic-sector data</li>
          <li>Recycling infrastructure and technology transfer</li>
          <li>Capacity building and SME development</li>
          <li>Public education and community-based solutions</li>
          <li>Monitoring and evaluation</li>
        </ul>
        <p>
          Partnership discussions should be directed to the official CPF or MESTI contact channel.
        </p>
      </>
    ),
    relatedLink: { label: 'Contact MESTI / CPF Team →', href: '/contact' },
  },

  // ─── 7. RESOURCES AND DATA ───
  {
    id: 'what-resources-will-be-available-on-the-website',
    category: 'Resources',
    q: 'What resources will be available on the website?',
    a: (
      <>
        <p>The Knowledge Hub can provide access to:</p>
        <ul>
          <li>National policies, strategies and frameworks</li>
          <li>Project reports and research studies</li>
          <li>Technical guidelines and training materials</li>
          <li>Case studies and standard operating procedures (SOPs)</li>
          <li>Monitoring reports, videos and infographics</li>
        </ul>
        <p>
          Resources should show their publisher, publication date, category and file format.
        </p>
      </>
    ),
    relatedLink: { label: 'Browse the Knowledge Hub →', href: '/knowledge-hub' },
  },
  {
    id: 'are-the-resources-free-to-download',
    category: 'Resources',
    q: 'Are the resources free to download?',
    a: (
      <>
        <p>
          Public resources should be available without payment unless an official restriction applies.
        </p>
        <p>
          Documents that are confidential, internal, incomplete or subject to third-party restrictions should not be published.
        </p>
      </>
    ),
  },
  {
    id: 'how-often-will-website-information-be-updated',
    category: 'Resources',
    q: 'How often will website information be updated?',
    a: (
      <>
        <p>
          News, events, opportunities and programme updates should be published as they are approved.
        </p>
        <p>
          Project data and impact figures should be updated according to official reporting cycles. Each figure should display:
        </p>
        <ul>
          <li>Reporting period & data source</li>
          <li>Programme & verification status</li>
          <li>Last updated date</li>
        </ul>
      </>
    ),
  },
  {
    id: 'can-researchers-access-cpf-ghana-data',
    category: 'Resources',
    q: 'Can researchers access CPF Ghana data?',
    a: (
      <>
        <p>
          Researchers should be able to access approved public datasets, reports and sector information through the Data and Insights section.
        </p>
        <p>
          Where detailed or restricted information is required, the researcher may need to submit a formal data request.
        </p>
      </>
    ),
    relatedLink: { label: 'Explore Insights & Data →', href: '/insights' },
  },
  {
    id: 'how-can-i-submit-a-publication-or-research-report',
    category: 'Resources',
    q: 'How can I submit a publication or research report?',
    a: (
      <>
        <p>The website can provide a resource-submission form requiring:</p>
        <ul>
          <li>Publication title, author or organisation</li>
          <li>Abstract and publication date</li>
          <li>Topic and file or publication link</li>
          <li>Contact information & permission to publish</li>
        </ul>
        <p>All submissions should be reviewed for relevance, credibility and publication rights.</p>
      </>
    ),
    relatedLink: { label: 'Submit a Resource →', href: '/contact' },
  },

  // ─── 8. NEWS, EVENTS AND OPPORTUNITIES ───
  {
    id: 'where-can-i-find-upcoming-events',
    category: 'Opportunities',
    q: 'Where can I find upcoming events?',
    a: (
      <>
        <p>
          Upcoming workshops, consultations, training programmes, conferences and stakeholder engagements should be listed under <strong>News and Events</strong>.
        </p>
        <p>Each event page should show:</p>
        <ul>
          <li>Date, time and location</li>
          <li>Organiser and participation requirements</li>
          <li>Registration link and contact information</li>
        </ul>
      </>
    ),
    relatedLink: { label: 'View Latest Insights & Events →', href: '/insights' },
  },
  {
    id: 'where-will-funding-and-procurement-opportunities-be-published',
    category: 'Opportunities',
    q: 'Where will funding and procurement opportunities be published?',
    a: (
      <>
        <p>Approved opportunities should be published under the <strong>Opportunities</strong> section.</p>
        <p>Categories may include:</p>
        <ul>
          <li>Calls for proposals and consultancy assignments</li>
          <li>Procurement notices and training opportunities</li>
          <li>Innovation challenges and research partnerships</li>
          <li>SME support and public consultations</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-can-i-receive-cpf-ghana-updates',
    category: 'Opportunities',
    q: 'How can I receive CPF Ghana updates?',
    a: (
      <>
        <p>
          Visitors should be able to subscribe to a newsletter for updates on:
        </p>
        <ul>
          <li>Programmes and policy developments</li>
          <li>Events and publications</li>
          <li>Funding opportunities and circular-plastics initiatives</li>
        </ul>
        <p>
          Subscribers should be informed how their personal information will be used and protected.
        </p>
      </>
    ),
  },

  // ─── 9. CONTACT AND REPORTING ───
  {
    id: 'how-can-i-contact-cpf-ghana',
    category: 'Contact',
    q: 'How can I contact CPF Ghana?',
    a: (
      <>
        <p>
          Visitors should use the official contact details published on the website or complete the contact form.
        </p>
        <p>The form should include:</p>
        <ul>
          <li>Full name, organisation, email and phone number</li>
          <li>Enquiry category and message</li>
          <li>Consent checkbox</li>
        </ul>
        <p>Enquiry categories can include: General enquiry, Partnership, Programme info, Media request, Resource submission, Technical support, Opportunity, or Feedback.</p>
      </>
    ),
    relatedLink: { label: 'Go to Contact Page →', href: '/contact' },
  },
  {
    id: 'can-i-report-incorrect-information-on-the-website',
    category: 'Contact',
    q: 'Can I report incorrect information on the website?',
    a: (
      <>
        <p>
          Yes. Visitors should be encouraged to report inaccurate, outdated or incomplete information through the contact form.
        </p>
        <p>
          The website team should verify the issue before changing published content.
        </p>
      </>
    ),
    relatedLink: { label: 'Report an Issue →', href: '/contact' },
  },
  {
    id: 'can-i-report-plastic-pollution-through-the-website',
    category: 'Contact',
    q: 'Can I report plastic pollution through the website?',
    a: (
      <>
        <p>
          A pollution-reporting function should only be introduced when CPF Ghana has an approved process and responsible institution for receiving, verifying and responding to reports.
        </p>
        <p>
          Until then, visitors should direct reports to the appropriate official environmental (EPA) or local-government authority rather than creating the expectation of an emergency-response service.
        </p>
      </>
    ),
  },
]

const categories = [
  'General',
  'Circular Plastics',
  'Programmes',
  'Partnerships',
  'Resources',
  'Opportunities',
  'Contact',
]

function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('General')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, string>>({})

  const location = useLocation()

  // Handle URL hash navigation for SEO anchor links
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      const foundItem = faqData.find((item) => item.id === targetId)
      if (foundItem) {
        setActiveCategory(foundItem.category)
        setOpenItems(new Set([foundItem.id]))
        setTimeout(() => {
          const el = document.getElementById(foundItem.id)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 150)
      }
    }
  }, [location.hash])

  // Filter questions by active category OR global search query
  const displayedQuestions = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase()
    if (!trimmed) {
      return faqData.filter((item) => item.category === activeCategory)
    }
    return faqData.filter(
      (item) =>
        item.q.toLowerCase().includes(trimmed) ||
        item.category.toLowerCase().includes(trimmed) ||
        item.id.toLowerCase().includes(trimmed)
    )
  }, [activeCategory, searchQuery])

  // Toggle single accordion open/closed
  const toggleAccordion = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        // Spec: Only one accordion should be open at a time (unless user expanded all)
        next.clear()
        next.add(id)
      }
      return next
    })
  }

  // Expand All / Collapse All
  const handleExpandAll = () => {
    const allIds = displayedQuestions.map((item) => item.id)
    setOpenItems(new Set(allIds))
  }

  const handleCollapseAll = () => {
    setOpenItems(new Set())
  }

  // Copy anchor link
  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const url = `${window.location.origin}/faq#${id}`
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  // Handle helpful feedback
  const handleFeedback = (e: React.MouseEvent, id: string, type: 'yes' | 'no') => {
    e.stopPropagation()
    setHelpfulFeedback((prev) => ({ ...prev, [id]: type }))
  }

  // Popular search term click
  const handlePopularClick = (term: string) => {
    setSearchQuery(term)
  }

  return (
    <div className="faq-page">
      <SEO
        title="Frequently Asked Questions | CPF Ghana - MESTI"
        description="Find answers about CPF Ghana, circular plastics, programmes like CEF-PS, partnerships, resources, and participation opportunities."
        path="/faq"
      />
      <Navbar light={false} />

      {/* ─── 1. FAQ HERO SECTION ─── */}
      <section className="faq-hero">
        <div className="faq-hero__bg-pattern" />
        <div className="faq-hero__content">
          <span className="faq-hero__label">Help and Information</span>
          <h1 className="faq-hero__title">Frequently Asked Questions</h1>
          <p className="faq-hero__sub">
            Find answers about CPF Ghana, circular plastics, programmes, partnerships, resources and opportunities to participate.
          </p>

          <div className="faq-hero__search-wrap">
            <div className="faq-hero__search-box">
              <svg className="faq-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                className="faq-hero__search-input"
                placeholder="Try “CEF-PS”, “plastic recycling”, “partnerships” or “resources”"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="faq-hero__search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="faq-hero__popular">
              <span className="faq-popular-label">Popular:</span>
              <button type="button" className="faq-popular-btn" onClick={() => handlePopularClick('CPF Ghana')}>
                CPF Ghana
              </button>
              <span className="faq-popular-sep">·</span>
              <button type="button" className="faq-popular-btn" onClick={() => handlePopularClick('CEF-PS')}>
                CEF-PS
              </button>
              <span className="faq-popular-sep">·</span>
              <button type="button" className="faq-popular-btn" onClick={() => handlePopularClick('Partnerships')}>
                Partnerships
              </button>
              <span className="faq-popular-sep">·</span>
              <button type="button" className="faq-popular-btn" onClick={() => handlePopularClick('Resources')}>
                Resources
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. MAIN TWO-COLUMN LAYOUT & CATEGORY NAVIGATION ─── */}
      <section className="faq-main-container">
        <aside className="faq-sidebar">
          <div className="faq-sidebar__title">Categories</div>
          {categories.map((cat) => {
            const count = faqData.filter((i) => i.category === cat).length
            const isActive = !searchQuery && activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                className={`faq-category-btn ${isActive ? 'faq-category-btn--active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat)
                  setSearchQuery('')
                  setOpenItems(new Set())
                }}
              >
                <span>{cat}</span>
                <span className="faq-category-count">{count}</span>
              </button>
            )
          })}
        </aside>

        {/* ─── 3. QUESTIONS COLUMN & ACCORDIONS ─── */}
        <div className="faq-content">
          <div className="faq-content__header">
            <div className="faq-content__title-area">
              <h2 className="faq-content__heading">
                {searchQuery ? `Search Results for "${searchQuery}"` : activeCategory}
              </h2>
              <span className="faq-content__badge">
                {displayedQuestions.length} {displayedQuestions.length === 1 ? 'question' : 'questions'}
              </span>
            </div>

            {displayedQuestions.length > 0 && (
              <div className="faq-controls">
                <button type="button" className="faq-control-btn" onClick={handleExpandAll}>
                  Expand All
                </button>
                <button type="button" className="faq-control-btn" onClick={handleCollapseAll}>
                  Collapse All
                </button>
              </div>
            )}
          </div>

          {displayedQuestions.length > 0 ? (
            <div className="faq-list">
              {displayedQuestions.map((item) => {
                const isOpen = openItems.has(item.id)
                const isCopied = copiedId === item.id
                const feedback = helpfulFeedback[item.id]

                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className={`faq-accordion ${isOpen ? 'faq-accordion--open' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-accordion__trigger"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <span className="faq-accordion__icon">{isOpen ? '−' : '+'}</span>
                    </button>

                    {isOpen && (
                      <div className="faq-accordion__body">
                        <div className="faq-accordion__text">{item.a}</div>

                        {item.relatedLink && (
                          <Link to={item.relatedLink.href} className="faq-related-link">
                            {item.relatedLink.label}
                          </Link>
                        )}

                        <div className="faq-accordion__footer">
                          <button
                            type="button"
                            className={`faq-copy-btn ${isCopied ? 'faq-copy-btn--copied' : ''}`}
                            onClick={(e) => handleCopyLink(e, item.id)}
                            title="Copy link to this question"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                            {isCopied ? 'Link copied!' : 'Copy link to question'}
                          </button>

                          <div className="faq-helpful">
                            {feedback ? (
                              <span className="faq-helpful-thanks">✓ Thank you for your feedback!</span>
                            ) : (
                              <>
                                <span>Was this answer helpful?</span>
                                <button
                                  type="button"
                                  className="faq-helpful-btn"
                                  onClick={(e) => handleFeedback(e, item.id, 'yes')}
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  className="faq-helpful-btn"
                                  onClick={(e) => handleFeedback(e, item.id, 'no')}
                                >
                                  No
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="faq-empty-state">
              <div className="faq-empty-icon">🔍</div>
              <h3>No matching questions found</h3>
              <p>
                We couldn’t find an answer matching “{searchQuery}”. Try searching for different keywords, or reach out to our team directly.
              </p>
              <div className="faq-empty-actions">
                <button
                  type="button"
                  className="faq-btn faq-btn--blue"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </button>
                <Link to="/contact" className="faq-btn faq-btn--outline">
                  Contact the CPF Team
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── 10. STILL NEED HELP SECTION ─── */}
      <section className="faq-still-help">
        <div className="faq-still-help__container">
          <div className="faq-still-help__pattern" />
          <h2 className="faq-still-help__title">Couldn’t Find What You Were Looking For?</h2>
          <p className="faq-still-help__sub">
            Contact the CPF Ghana team for programme information, partnerships, resources and general enquiries.
          </p>
          <div className="faq-still-help__actions">
            <Link to="/contact" className="faq-btn faq-btn--gold">
              Contact the CPF Team
            </Link>
            <Link to="/knowledge-hub" className="faq-btn faq-btn--outline-white">
              Explore the Knowledge Hub
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FAQ
