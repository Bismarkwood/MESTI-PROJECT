import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import JoinCta from '../../components/JoinCta'
import SEO from '../../components/SEO'
import './CareerDetail.css'

const rolesData: Record<string, {
  title: string
  location: string
  type: string
  department: string
  about: string
  responsibilities: string[]
  requirements: string[]
}> = {
  'cloud-engineer': {
    title: 'Cloud Engineer',
    location: 'Accra, Ghana',
    type: 'Full Time',
    department: 'Technology',
    about: 'We are looking for a Cloud Engineer to design, build and manage cloud infrastructure on AWS. You will work on national-scale platforms that process geospatial and AI workloads for clients across Ghana.',
    responsibilities: [
      'Design and implement cloud architecture on AWS',
      'Manage data pipelines and serverless infrastructure',
      'Ensure security, compliance and cost optimisation',
      'Collaborate with data and GIS teams on platform delivery',
      'Monitor system performance and resolve incidents',
    ],
    requirements: [
      '2+ years experience with AWS services',
      'Familiarity with Infrastructure as Code (Terraform/CloudFormation)',
      'Understanding of networking, security and IAM',
      'Experience with containers (Docker, ECS/EKS)',
      'AWS certification is a plus',
    ],
  },
  'gis-developer': {
    title: 'GIS Developer',
    location: 'Accra, Ghana',
    type: 'Full Time',
    department: 'Geospatial',
    about: 'We need a GIS Developer to build spatial platforms, process satellite imagery, and deliver geospatial intelligence products for government and private sector clients.',
    responsibilities: [
      'Develop and maintain web-based GIS applications',
      'Process and analyse satellite and spatial data',
      'Build custom mapping and spatial analysis tools',
      'Integrate geospatial APIs and data services',
      'Support field data collection and validation workflows',
    ],
    requirements: [
      '2+ years experience with GIS tools (QGIS, ArcGIS, PostGIS)',
      'Proficiency in Python or JavaScript for spatial development',
      'Experience with web mapping libraries (Leaflet, Mapbox, OpenLayers)',
      'Understanding of remote sensing and earth observation data',
      'Degree in Geography, Geomatics, or related field',
    ],
  },
  'data-analyst': {
    title: 'Data Analyst',
    location: 'Accra, Ghana',
    type: 'Full Time',
    department: 'Analytics',
    about: 'We are hiring a Data Analyst to turn raw data into actionable insights for our clients across banking, agriculture, logistics and real estate.',
    responsibilities: [
      'Analyse datasets to identify trends and patterns',
      'Build dashboards and visualisations for stakeholders',
      'Support data pipeline development and quality assurance',
      'Produce reports and presentations for client delivery',
      'Collaborate with engineering on data product development',
    ],
    requirements: [
      '2+ years experience in data analysis',
      'Proficiency in SQL, Python or R',
      'Experience with BI tools (Power BI, Tableau, Metabase)',
      'Strong communication and presentation skills',
      'Experience with spatial or geospatial data is a plus',
    ],
  },
  'software-engineer': {
    title: 'Software Engineer',
    location: 'Accra, Ghana',
    type: 'Full Time',
    department: 'Technology',
    about: 'We are looking for a Software Engineer to build web applications, APIs and platforms that power BDG\'s intelligence products.',
    responsibilities: [
      'Build and maintain full-stack web applications',
      'Design and implement RESTful APIs',
      'Write clean, tested and documented code',
      'Collaborate with designers and product on feature delivery',
      'Participate in code reviews and technical discussions',
    ],
    requirements: [
      '2+ years experience in software development',
      'Proficiency in TypeScript/JavaScript, React, Node.js',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Understanding of CI/CD and version control (Git)',
      'Experience with AWS services is a plus',
    ],
  },
  'product-designer': {
    title: 'Product Designer',
    location: 'Accra, Ghana',
    type: 'Full Time',
    department: 'Design',
    about: 'We need a Product Designer to shape how users interact with BDG\'s intelligence platforms — from geospatial dashboards to AI-powered products.',
    responsibilities: [
      'Design user interfaces for web and mobile platforms',
      'Conduct user research and usability testing',
      'Create wireframes, prototypes and design systems',
      'Collaborate with engineering on implementation',
      'Maintain consistency across all BDG products',
    ],
    requirements: [
      '2+ years experience in product/UI design',
      'Proficiency in Figma or similar design tools',
      'Strong portfolio showing end-to-end product design',
      'Understanding of design systems and accessibility',
      'Experience designing data-heavy or dashboard interfaces is a plus',
    ],
  },
}

function CareerDetail() {
  const { slug } = useParams<{ slug: string }>()
  const role = slug ? rolesData[slug] : null

  if (!role) {
    return (
      <main>
        <Navbar />
        <div style={{ padding: '200px 48px 100px', textAlign: 'center' }}>
          <h1>Role not found</h1>
          <Link to="/careers">← Back to Careers</Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="career-detail">
      <SEO
        title={`${role.title} | Careers at BigData Ghana`}
        description={role.about}
        path={`/careers/${slug}`}
      />
      <Navbar />

      {/* Hero */}
      <section className="career-detail__hero">
        <span className="career-detail__tag">● Job Opening</span>
        <h1 className="career-detail__title">{role.title}</h1>
        <div className="career-detail__meta">
          <span className="career-detail__meta-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> {role.location}</span>
          <span className="career-detail__meta-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> {role.type}</span>
          <span className="career-detail__meta-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> {role.department}</span>
        </div>
      </section>

      {/* Content - Split layout */}
      <section className="career-detail__content">
        <div className="career-detail__split">
          {/* Left - Role description */}
          <div className="career-detail__left">
            <div className="career-detail__section">
              <h2>⊙ The Role</h2>
              <p>{role.about}</p>
            </div>

            <div className="career-detail__section">
              <h2>⊙ Responsibilities</h2>
              <ul>
                {role.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="career-detail__section">
              <h2>⊙ Requirements</h2>
              <ul>
                {role.requirements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Application form */}
          <div className="career-detail__right">
            <div className="career-detail__form-card">
              <h2 className="career-detail__form-title">Apply Now</h2>
              <p className="career-detail__form-sub">{role.title}, {role.location}, {role.type}</p>

              <form className="career-detail__form" onSubmit={(e) => e.preventDefault()}>
                <div className="career-detail__form-row">
                  <div className="career-detail__form-field">
                    <label>First Name <span>*</span></label>
                    <input type="text" placeholder="Enter your name" />
                  </div>
                  <div className="career-detail__form-field">
                    <label>Last Name <span>*</span></label>
                    <input type="text" placeholder="Enter your name" />
                  </div>
                </div>

                <div className="career-detail__form-row">
                  <div className="career-detail__form-field">
                    <label>Email <span>*</span></label>
                    <input type="email" placeholder="Enter Your Email" />
                  </div>
                  <div className="career-detail__form-field">
                    <label>Phone Number <span>*</span></label>
                    <input type="tel" placeholder="Phone Number" />
                  </div>
                </div>

                <div className="career-detail__form-field">
                  <label>Subject<span>*</span></label>
                  <input type="text" placeholder="Enter your subject" />
                </div>

                <div className="career-detail__form-field">
                  <label>Message<span>*</span></label>
                  <textarea placeholder="How can we help you? Feel free to get in touch!" rows={5}></textarea>
                </div>

                <button type="submit" className="career-detail__form-btn">Apply Now ↗</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <JoinCta />
      <Footer />
    </main>
  )
}

export default CareerDetail
