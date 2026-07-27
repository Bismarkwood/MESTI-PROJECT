import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import JoinCta from '../../components/JoinCta'
import SEO from '../../components/SEO'
import careerHeroBg from '../../assets/Teams/Hero section/Meet Our Team.webp'
import gertrudeImg from '../../assets/Teams/Gertrude Chichi.webp'
import henryImg from '../../assets/Teams/Mr. Henry Baffoe.webp'
import priscilliaImg from '../../assets/Teams/Priscillia Fianu.webp'
import yaaImg from '../../assets/Teams/Yaa Oparebea Acquah.webp'
import afraImg from '../../assets/Teams/Afra Owusu-Addo.webp'
import nanayaaImg from '../../assets/Teams/Nanayaa Fordjour.webp'
import amramImg from '../../assets/Teams/Amram Afriyie.webp'
import niiImg from '../../assets/Teams/Nii Amon Ashie.webp'
import loganImg from '../../assets/Teams/Logan Linford Kojo.webp'
import akwasiImg from '../../assets/Teams/Akwasi Anto Darkwah.webp'
import bismarkImg from '../../assets/Teams/Bismark Gyebi Duah.webp'
import dzehuImg from '../../assets/Teams/Dzehu Mighty.webp'
import nancyImg from '../../assets/Teams/Nancy Wagun.webp'
import kwakuImg from '../../assets/Teams/Kwaku Quartey Ansah.webp'
import kyeiImg from '../../assets/Teams/Kyei.webp'
import './Team.css'

const leadership = [
  {
    name: 'Mr. Henry Baffoe',
    role: 'MANAGING DIRECTOR',
    image: henryImg,
    linkedin: 'https://www.linkedin.com/in/henry-kwamena-baffoe-b35324100',
  },
  {
    name: 'Nana Yaa Fordwour',
    role: 'HEAD OF FINANCE & ADMINISTRATIVE OFFICER',
    image: nanayaaImg,
  },
  {
    name: 'Priscillia Fianu',
    role: 'CLOUD ENGINEER',
    image: priscilliaImg,
    linkedin: 'https://www.linkedin.com/in/priscilla-fianu-849b90227/',
  },
  {
    name: 'Akwasi Darkwa Anto',
    role: 'DATA & AI LEAD',
    image: akwasiImg,
    linkedin: 'https://www.linkedin.com/in/akwasi-anto',
  },
  {
    name: 'Gertrude Chichi',
    role: 'CLOUD ENGINEER ASSISTANT',
    image: gertrudeImg,
  },
  {
    name: 'Logan Linford Kojo',
    role: 'MARKETING HEAD',
    image: loganImg,
    linkedin: 'https://www.linkedin.com/in/linford-logan-709258333/',
  },
  {
    name: 'Dzehu Mighty',
    role: 'ASSOCIATE SOFTWARE DEVELOPER',
    image: dzehuImg,
  },
  {
    name: 'Yaa Oparebea Acquah',
    role: 'ASSISTANT FINANCE',
    image: yaaImg,
    linkedin: 'https://www.linkedin.com/in/yaa-oparebea-acquah-368170331/',
  },
  {
    name: 'Nana Akua Afra Owusu-Addo',
    role: 'TECHNICAL WRITER & GEO DEVELOPER',
    image: afraImg,
    linkedin: 'https://www.linkedin.com/in/nana-akua-afra-owusu-addo/',
  },
  {
    name: 'Amram Afriyie',
    role: 'EARTH OBSERVATION DESK COORDINATOR',
    image: amramImg,
  },
  {
    name: 'Nii Amon Ashie',
    role: 'MARKETOR',
    image: niiImg,
    linkedin: 'https://www.linkedin.com/in/nii-amon-ashie-00b020144/',
  },
  {
    name: 'Kwaku Quartey Ansah',
    role: 'ASSOCIATE SOFTWARE DEVELOPER',
    image: kwakuImg,
    linkedin: 'https://www.linkedin.com/in/quarteyansahofei/',
  },
  {
    name: 'Bismark Gyebi Duah',
    role: 'LEAD PRODUCT DESIGNER',
    image: bismarkImg,
  },
  {
    name: 'Nancy Wayua',
    role: 'ASSOCIATE GIS DEVELOPER',
    image: nancyImg,
    linkedin: 'https://www.linkedin.com/in/nancy-wayua-317905261/',
  },
  {
    name: 'Emmanuel Kyei Baffour',
    role: 'CLOUD ENGINEER',
    image: kyeiImg,
    linkedin: 'https://www.linkedin.com/in/emmanuelfrimpongkyei-baffour/',
  },
]

function Team() {
  return (
    <main className="team-page">
      <SEO
        title="Our Team | BigData Ghana — 15+ Intelligence Professionals"
        description="Meet the engineers, data scientists, geospatial analysts, and strategists building Africa's decision infrastructure at BigData Ghana."
        path="/team"
      />
      <Navbar />

      {/* Hero */}
      <section className="team-hero">
        <img src={careerHeroBg} alt="" className="team-hero__bg" />
        <div className="team-hero__overlay" />
        <div className="team-hero__content">
          <h1 className="team-hero__title">Meet Our Team</h1>
          <p className="team-hero__sub">
            The people behind the intelligence. A team of engineers, data scientists, geospatial analysts, and strategists building Africa's decision infrastructure.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="team-grid-section">
        <div className="team-grid">
          {leadership.map((member, i) => (
            <div className="team-card" key={i}>
              <div className="team-card__image">
                {member.image ? (
                  <img src={member.image} alt={member.name} />
                ) : (
                  <div className="team-card__placeholder" />
                )}
              </div>
              <div className="team-card__overlay">
                <div className="team-card__info">
                  <h3 className="team-card__name">{member.name}</h3>
                  <span className="team-card__role">{member.role}</span>
                </div>
                {member.linkedin ? (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-card__icon" aria-label={`${member.name} LinkedIn`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                ) : (
                  <div className="team-card__icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Culture Section */}
      <section className="team-culture">
        <div className="team-culture__inner">
          <div className="team-culture__text">
            <span className="team-culture__label">OUR CULTURE</span>
            <h2 className="team-culture__heading">Built on curiosity, collaboration, and purpose.</h2>
            <p className="team-culture__desc">
              We hire problem-solvers who care about impact. Our team works at the intersection of technology and real-world decisions — building platforms that protect forests, predict floods, optimise logistics, and strengthen businesses.
            </p>
            <p className="team-culture__desc">
              Every person at BDG contributes to intelligence that changes outcomes for communities and organisations across Ghana and West Africa.
            </p>
          </div>
          <div className="team-culture__stats">
            <div className="team-culture__stat">
              <span className="team-culture__stat-num">15+</span>
              <span className="team-culture__stat-label">Years together</span>
            </div>
            <div className="team-culture__stat-divider" />
            <div className="team-culture__stat">
              <span className="team-culture__stat-num">4+</span>
              <span className="team-culture__stat-label">Disciplines</span>
            </div>
            <div className="team-culture__stat-divider" />
            <div className="team-culture__stat">
              <span className="team-culture__stat-num">15+</span>
              <span className="team-culture__stat-label">Team members</span>
            </div>
          </div>
        </div>
      </section>

      <JoinCta />
      <Footer />
    </main>
  )
}

export default Team
