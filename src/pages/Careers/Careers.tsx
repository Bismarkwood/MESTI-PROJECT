import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import HeroCTA from '../../components/HeroCTA'
import SEO from '../../components/SEO'
import careerHeroBg from '../../assets/Career/007A2193SIMPI26.webp'
import teamCtaImg from '../../assets/CTA Banner/CTA Banner 2nd Card.webp'
import './Careers.css'

const openRoles = [
  {
    title: 'Cloud Engineer',
    type: 'Full-time',
    location: 'Accra, Ghana',
    slug: 'cloud-engineer',
  },
  {
    title: 'GIS Developer',
    type: 'Full-time',
    location: 'Accra, Ghana',
    slug: 'gis-developer',
  },
  {
    title: 'Data Analyst',
    type: 'Full-time',
    location: 'Accra, Ghana',
    slug: 'data-analyst',
  },
  {
    title: 'Software Engineer',
    type: 'Full-time',
    location: 'Accra, Ghana',
    slug: 'software-engineer',
  },
  {
    title: 'Product Designer',
    type: 'Full-time',
    location: 'Accra, Ghana',
    slug: 'product-designer',
  },
]

function Careers() {
  return (
    <main className="careers-page">
      <SEO
        title="Careers | BigData Ghana — Shape the Future of Decision Intelligence"
        description="Join BigData Ghana. We are hiring cloud engineers, GIS developers, data analysts, and product designers. Build intelligence that matters, from Ghana."
        path="/careers"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Careers at BigData Ghana',
          description: 'Open roles at BigData Ghana for cloud engineers, GIS developers, data analysts, and product designers.',
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="careers-hero">
        <img src={careerHeroBg} alt="" className="careers-hero__bg" />
        <div className="careers-hero__overlay" />
        <div className="careers-hero__content">
          <h1 className="careers-hero__title">
            <span>Shape the future</span>
            <span>of decision intelligence.</span>
          </h1>
          <p className="careers-hero__sub">
            Help us build Ghana's most trusted intelligence company.
          </p>
        </div>
      </section>

      {/* Why BDG */}
      <section className="careers-interested">
        <div className="careers-interested__inner">
          <div className="careers-interested__left">
            <span className="careers-interested__tag">■ Interested?</span>
          </div>
          <div className="careers-interested__right">
            <h2 className="careers-interested__heading">
              Great talent deserves great challenges. <span className="careers-interested__muted">Join the elite</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Hiring Marquee */}
      <section className="careers-marquee">
        <div className="careers-marquee__track">
          <span className="careers-marquee__item">■ OPEN ROLES</span>
          <span className="careers-marquee__item">■ WORK WITH US</span>
          <span className="careers-marquee__item">■ NOW HIRING</span>
          <span className="careers-marquee__item">■ APPLY TODAY</span>
          <span className="careers-marquee__item">■ OPEN ROLES</span>
          <span className="careers-marquee__item">■ WE ARE HIRING</span>
          <span className="careers-marquee__item">■ WORK WITH US</span>
          <span className="careers-marquee__item">■ NOW HIRING</span>
          <span className="careers-marquee__item">■ APPLY TODAY</span>
          <span className="careers-marquee__item">■ OPEN ROLES</span>
          <span className="careers-marquee__item">■ WE ARE HIRING</span>
          <span className="careers-marquee__item">■ WORK WITH US</span>
        </div>
      </section>

      {/* Open Roles */}
      <section className="careers-roles" id="roles">
        <span className="careers-roles__tag">■ Find your next job</span>
        <h2 className="careers-roles__title">Elevate your career<br /><span className="careers-roles__title-muted">to the next level</span></h2>
        
        <div className="careers-roles__filters">
          <span className="careers-roles__filter careers-roles__filter--active">● Accra</span>
          <span className="careers-roles__filter">● Remote</span>
          <span className="careers-roles__filter">● Hybrid</span>
        </div>

        <div className="careers-roles__list">
          {openRoles.map((role, i) => (
            <a href={`/careers/${role.slug}`} className="careers-roles__item" key={i}>
              <div className="careers-roles__item-left">
                <h3 className="careers-roles__item-title">{role.title}</h3>
              </div>
              <span className="careers-roles__item-type">{role.type}</span>
              <span className="careers-roles__item-dept">Technology</span>
              <span className="careers-roles__item-location">{role.location}</span>
              <span className="careers-roles__item-arrow-circle">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="join-cta">
        <div className="join-cta__inner">
          <div className="join-cta__text">
            <span className="join-cta__label"></span>
            <h2 className="join-cta__heading">
              Ready to decide better?
            </h2>
            <p className="join-cta__sub">
              Tell us what you are working on. We will show you what the data says.
            </p>
            <HeroCTA text="Let's Work" href="/contact" />
          </div>
          <div className="join-cta__person">
            <img src={teamCtaImg} alt="BigData Ghana Team" className="join-cta__person-img" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Careers
