import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import contactHeroBg from '../../assets/Career/007A2193SIMPI26.webp'
import './Contact.css'

function Contact() {
  return (
    <main className="contact-page">
      <SEO
        title="Contact | BigData Ghana — Let's Work Together"
        description="Get in touch with BigData Ghana. Tell us about the decision you need to make and we will show you what the data says. Offices in Accra, Ghana."
        path="/contact"
      />
      <Navbar />

      {/* Hero */}
      <section className="contact-hero">
        <img src={contactHeroBg} alt="" className="contact-hero__bg" />
        <div className="contact-hero__overlay" />
        <div className="contact-hero__content">
          <h1 className="contact-hero__title">Tell us the decision you are facing.</h1>
          <p className="contact-hero__sub">
            Whether you are assessing land, mapping risk, building a data platform, improving operations, exploring AI or funding a deployment, BDG can help you see the decision more clearly.
          </p>
        </div>
      </section>

      {/* Form + Map Section */}
      <section className="contact-body">
        <div className="contact-body__inner">
          {/* Form */}
          <div className="contact-body__form-card">
            <h2 className="contact-body__form-title">Send us a message</h2>
            <p className="contact-body__form-sub">Fill out the form and our team will get back to you within 24 hours.</p>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label>First name <span className="contact-form__required">*</span></label>
                  <input type="text" placeholder="John" />
                </div>
                <div className="contact-form__field">
                  <label>Last name <span className="contact-form__required">*</span></label>
                  <input type="text" placeholder="Doe" />
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label>Email <span className="contact-form__required">*</span></label>
                  <input type="email" placeholder="john@company.com" />
                </div>
                <div className="contact-form__field">
                  <label>Company</label>
                  <input type="text" placeholder="Your company" />
                </div>
              </div>

              <div className="contact-form__field contact-form__field--full">
                <label>Phone number <span className="contact-form__required">*</span></label>
                <div className="contact-form__phone-input">
                  <div className="contact-form__phone-code">+233</div>
                  <input type="tel" placeholder="24 000 0000" />
                </div>
              </div>

              <div className="contact-form__field contact-form__field--full">
                <label>How can we help? <span className="contact-form__required">*</span></label>
                <textarea placeholder="Tell us about your project or question..." rows={5}></textarea>
              </div>

              <button type="submit" className="contact-form__submit">
                Send Message
                <span className="contact-form__submit-icon">&#8599;</span>
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="contact-body__map-card">
            <iframe
              title="BigData Ghana Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9!2d-0.187!3d5.614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzYnNTAuNCJOIDDCsDExJzEzLjIiVw!5e0!3m2!1sen!2sgh!4v1700000000000"
              className="contact-body__map-iframe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="contact-body__map-info">
              <div className="contact-body__map-pin">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E8A00" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>No. 4 Blewusi Rd, Airport Residential, Accra, Ghana</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info">
        <div className="contact-info__grid">
          <div className="contact-info__card">
            <div className="contact-info__card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3 className="contact-info__card-title">Phone Number</h3>
            <p className="contact-info__card-value">+233 59 943 2731</p>
          </div>

          <div className="contact-info__card">
            <div className="contact-info__card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
            </div>
            <h3 className="contact-info__card-title">Email</h3>
            <p className="contact-info__card-value">info@bigdataghana.com</p>
          </div>

          <div className="contact-info__card">
            <div className="contact-info__card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 className="contact-info__card-title">Office Location</h3>
            <p className="contact-info__card-value">No. 4 Blewusi Rd,<br/>Airport Residential, Accra Ghana.<br/>GA-117-2050</p>
          </div>

          <div className="contact-info__card">
            <div className="contact-info__card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h3 className="contact-info__card-title">Follow Us</h3>
            <div className="contact-info__socials">
              <a href="#" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M13.232 10.232L20 4"/></svg>
              </a>
              <a href="https://www.instagram.com/bigdataghana" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/bigdata-ghana-limited/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Contact
