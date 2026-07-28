import aboutImg from '../../assets/homepage-about-bg.jpg'
import './AboutCPFSection.css'

function AboutCPFSection() {
  return (
    <section className="about-cpf" id="about-cpf">
      <div className="about-cpf__inner">
        <div className="about-cpf__content">
          <div className="about-cpf__number">01</div>
          <div className="about-cpf__text-wrap">
            <div className="about-cpf__eyebrow">
              <span className="about-cpf__eyebrow-line"></span>
              About CEF-PS Ghana
            </div>

            <h2 className="about-cpf__heading">
              One Platform. One Direction. A Circular Future.
            </h2>

            <p className="about-cpf__lead">
              CEF-PS Ghana provides a coordinated national platform for improving how plastics are designed, produced, used, collected, recovered and returned to productive use.
            </p>

            <p className="about-cpf__desc">
              We support collaboration across public institutions, businesses, local authorities, research organisations, development partners and communities to progressively eliminate plastic pollution and accelerate Ghana’s circular economy.
            </p>

            <div className="about-cpf__btn-wrap">
              <a href="#programmes" className="about-cpf__btn">
                Learn About CEF-PS <span className="about-cpf__btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="about-cpf__media">
          <div className="about-cpf__image-container">
            <img 
              src={aboutImg} 
              alt="CEF-PS Ghana Coordinated National Approach" 
              className="about-cpf__image" 
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutCPFSection
