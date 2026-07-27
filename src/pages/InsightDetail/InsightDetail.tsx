import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import JoinCta from '../../components/JoinCta'
import SEO from '../../components/SEO'
import insightCard1 from '../../assets/Insight/Screenshot_2026-07-02_075619.webp'
import insightCard2 from '../../assets/Insight/Card 2.webp'
import insightCard3 from '../../assets/Insight/Card 3.webp'
import insightCard4 from '../../assets/Insight/Card 4.webp'
import insightCard5 from '../../assets/Insight/Card 5.webp'
import './InsightDetail.css'

const articlesData: Record<string, {
  title: string
  tag: string
  category: string
  date: string
  readTime: string
  author: string
  image: any
  content: string[]
  tags: string[]
}> = {
  'hidden-geography-ghana-investment-risk': {
    title: 'The hidden geography of Ghana\'s investment risk',
    tag: 'Geospatial · Real estate',
    category: 'Insights',
    date: 'July 2026',
    readTime: '8 min read',
    author: 'BigData Ghana Research',
    image: insightCard1,
    content: [
      'The land Ghana\'s private sector is betting on is not always the land it thinks it is buying. Across Accra\'s fastest-growing corridors, spatial blind spots are costing developers and investors millions in misallocated capital.',
      'Most investment decisions in Ghana\'s real estate sector are made without a single spatial data point on the specific parcel being acquired. Boundary disputes, encroachment patterns, flood exposure, and infrastructure gaps remain invisible until capital has already been committed.',
      'BigData Ghana\'s eight years of spatial intelligence reveal that over 40% of high-value development sites in Greater Accra carry at least one material spatial risk that is not captured in traditional due diligence processes.',
      'The gap between perceived and actual land value is almost always an information gap. Organisations that invest in location intelligence before committing capital consistently outperform those that rely on surface-level surveys and second-hand reports.',
      'This is not a technology problem. It is a decision architecture problem. The data exists. The platforms exist. What is missing is the integration of spatial intelligence into the investment decision process at the point where it can change outcomes.',
    ],
    tags: ['Geospatial', 'Real Estate', 'Investment', 'Risk', 'Accra', 'Land Analytics'],
  },
  'loan-portfolio-geography': {
    title: 'Your loan portfolio has a geography. Most banks do not know what it is.',
    tag: 'Banking · Climate risk',
    category: 'Whitepapers',
    date: 'June 2026',
    readTime: '12 min read',
    author: 'BigData Ghana Research',
    image: insightCard2,
    content: [
      'The Bank of Ghana Climate Related Financial Risk Directive is active. The spatial data that satisfies it does not exist inside any bank\'s current risk system. This is the gap.',
      'Every loan in a bank\'s portfolio is attached to a physical location. That location carries climate risk, flood exposure, infrastructure dependency, and land value volatility that changes over time. Yet most banks assess credit risk without a single spatial variable.',
      'Our analysis of three major Ghanaian bank portfolios found that between 15-25% of commercial real estate collateral is located in areas with material flood or climate exposure that is not reflected in current valuations.',
      'The directive requires banks to identify, measure, and report climate-related financial risks. Without geospatial data, this is impossible.',
      'Banks that build spatial risk capability now will satisfy regulatory requirements and simultaneously improve loan origination quality. Those that wait will face both compliance pressure and portfolio losses that were visible in the data but never surfaced.',
    ],
    tags: ['Banking', 'Climate Risk', 'Regulation', 'Spatial Data', 'Financial Services'],
  },
  'yield-gap-agricultural-investments': {
    title: 'The yield gap: why Ghana\'s agricultural investments underperform',
    tag: 'Agriculture · Data',
    category: 'Blog',
    date: 'May 2026',
    readTime: '6 min read',
    author: 'BigData Ghana Research',
    image: insightCard5,
    content: [
      'Most agricultural investment in Ghana is made without a single spatial data point on the specific land being cultivated. The gap between projected and actual yield is almost always an information gap.',
      'Soil quality, water availability, elevation, historical weather patterns, and proximity to markets all vary dramatically across even small geographic areas. Yet investment decisions treat land as homogeneous.',
      'Our spatial analysis of agricultural zones across Ghana shows that yield variance within a single district can exceed 300%, driven entirely by location-specific factors that are measurable but currently unmeasured.',
      'Investors who integrate spatial intelligence into site selection and crop planning consistently achieve 20-40% better returns than those relying on regional averages and historical assumptions.',
      'The data infrastructure to support precision agricultural investment exists. What is missing is the decision framework that connects spatial intelligence to capital allocation at the point of investment.',
    ],
    tags: ['Agriculture', 'Data Analytics', 'Investment', 'Yield', 'Spatial Intelligence'],
  },
  'where-accra-growing-next': {
    title: 'Where Accra is growing next',
    tag: 'Urban growth · Logistics',
    category: 'Insights',
    date: 'April 2026',
    readTime: '7 min read',
    author: 'BigData Ghana Research',
    image: insightCard4,
    content: [
      'Eight years of spatial data reveals the corridors where commercial density is accelerating fastest. The businesses that get there first are reading the geography, not guessing.',
      'Accra\'s growth is not uniform. It follows infrastructure, water access, elevation, and existing commercial density in patterns that are measurable and predictable if you have the right data.',
      'Our analysis identifies five corridors where commercial growth rates exceed 15% annually. Three of these are not yet on the radar of major commercial real estate players.',
      'The businesses that position early in high-growth corridors capture location premiums that late movers cannot access. The window is typically 18-24 months before mainstream recognition drives prices up.',
      'This is not speculation. It is pattern recognition applied to eight years of consistently collected spatial data. The geography tells you where growth is going before the market prices it in.',
    ],
    tags: ['Urban Growth', 'Logistics', 'Accra', 'Commercial Real Estate', 'Spatial Data'],
  },
  'data-driven-organisations-winning-ghana': {
    title: 'The data-driven organisations quietly winning in Ghana',
    tag: 'AI · Competitive intelligence',
    category: 'Blog',
    date: 'March 2026',
    readTime: '5 min read',
    author: 'BigData Ghana Research',
    image: insightCard3,
    content: [
      'They are not doing anything complicated. They just know something their competitors do not, and the gap is widening.',
      'Across banking, agriculture, logistics, and real estate, a small number of organisations in Ghana are making consistently better decisions. They are not spending more. They are not hiring more people. They are using intelligence their competitors do not have access to.',
      'The common pattern: they invested in data infrastructure 2-3 years ago. They built internal capability to consume spatial and analytical intelligence. They made it part of their decision process, not an afterthought.',
      'The organisations that lag are not failing yet. But the decision quality gap compounds. Each quarter, the intelligence-driven organisations make slightly better calls on location, risk, allocation, and timing.',
      'The window to build this capability is now. The organisations that start today will have a 2-3 year lead by the time their competitors recognise what is happening.',
    ],
    tags: ['AI', 'Competitive Intelligence', 'Data Strategy', 'Business Growth'],
  },
}

const allSlugs = Object.keys(articlesData)

function InsightDetail() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? articlesData[slug] : null

  if (!article) {
    return (
      <main>
        <Navbar light />
        <div style={{ padding: '200px 48px 100px', textAlign: 'center' }}>
          <h1>Article not found</h1>
          <Link to="/insights">← Back to Insights</Link>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedSlugs = allSlugs.filter(s => s !== slug).slice(0, 4)

  return (
    <main className="insight-detail">
      <SEO
        title={`${article.title} | BigData Ghana Insights`}
        description={article.content[0]}
        path={`/insights/${slug}`}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          author: { '@type': 'Organization', name: 'BigData Ghana' },
          datePublished: article.date,
          publisher: { '@type': 'Organization', name: 'BigData Ghana' },
        }}
      />
      <Navbar light />

      {/* Hero Header */}
      <header className="insight-detail__hero">
        <img src={article.image} alt="" className="insight-detail__hero-bg" />
        <div className="insight-detail__hero-overlay" />
        <div className="insight-detail__hero-content">
          <div className="insight-detail__hero-meta">
            <span className="insight-detail__hero-category">{article.category}</span>
            <span className="insight-detail__hero-dot">·</span>
            <span className="insight-detail__hero-date">{article.date}</span>
            <span className="insight-detail__hero-dot">·</span>
            <span className="insight-detail__hero-time">{article.readTime}</span>
          </div>
          <h1 className="insight-detail__hero-title">{article.title}</h1>
          <span className="insight-detail__hero-author">By {article.author}</span>
        </div>
      </header>

      {/* Body: Content + Sidebar */}
      <div className="insight-detail__layout">
        {/* Left: Article content */}
        <article className="insight-detail__content">
          {article.content.map((para, i) => (
            <p key={i} className="insight-detail__paragraph">{para}</p>
          ))}

          {/* Tags */}
          <div className="insight-detail__tags">
            {article.tags.map(tag => (
              <span key={tag} className="insight-detail__tag">{tag}</span>
            ))}
          </div>

          {/* Share */}
          <div className="insight-detail__share">
            <span className="insight-detail__share-label">Share this article</span>
            <div className="insight-detail__share-btns">
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer" className="insight-detail__share-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M13.232 10.232L20 4"/></svg>
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://bigdataghana.com/insights/${slug}`)}`} target="_blank" rel="noopener noreferrer" className="insight-detail__share-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
              </a>
            </div>
          </div>
        </article>

        {/* Right: Sidebar */}
        <aside className="insight-detail__sidebar">
          {/* Search */}
          <div className="insight-detail__sidebar-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
            <input type="text" placeholder="Search articles..." className="insight-detail__sidebar-input" />
          </div>

          {/* Related Articles */}
          <div className="insight-detail__sidebar-section">
            <h3 className="insight-detail__sidebar-title">Related Articles</h3>
            <div className="insight-detail__sidebar-list">
              {relatedSlugs.map(s => {
                const a = articlesData[s]
                return (
                  <Link to={`/insights/${s}`} key={s} className="insight-detail__sidebar-card">
                    <img src={a.image} alt="" className="insight-detail__sidebar-card-img" />
                    <div className="insight-detail__sidebar-card-text">
                      <span className="insight-detail__sidebar-card-cat">{a.category}</span>
                      <span className="insight-detail__sidebar-card-title">{a.title}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="insight-detail__sidebar-cta">
            <h4 className="insight-detail__sidebar-cta-title">Stay informed</h4>
            <p className="insight-detail__sidebar-cta-desc">Get insights on data, AI, and decision intelligence delivered to your inbox.</p>
            <Link to="/contact" className="insight-detail__sidebar-cta-btn">Get in Touch →</Link>
          </div>
        </aside>
      </div>

      <JoinCta />
      <Footer />
    </main>
  )
}

export default InsightDetail
