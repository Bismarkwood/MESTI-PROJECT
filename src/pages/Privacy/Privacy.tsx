import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import './Privacy.css'

function Privacy() {
  return (
    <main className="privacy-page">
      <SEO
        title="Privacy Policy | BigData Ghana"
        description="BigData Ghana's privacy policy. How we collect, use, protect, and share your information in accordance with Ghana's Data Protection Act, 2012 (Act 843)."
        path="/privacy"
      />
      <Navbar />

      {/* Hero */}
      <section className="privacy-hero">
        <div className="privacy-hero__content">
          <span className="privacy-hero__label">LEGAL</span>
          <h1 className="privacy-hero__title">Privacy Policy</h1>
          <p className="privacy-hero__sub">Effective Date: 22 July 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="privacy-content">
        <div className="privacy-content__inner">
          <aside className="privacy-toc">
            <h3 className="privacy-toc__title">Contents</h3>
            <nav className="privacy-toc__nav">
              <a href="#introduction">Introduction</a>
              <a href="#information-collected">Information We Collect</a>
              <a href="#technical-data">Technical Data</a>
              <a href="#how-we-use">How We Use Your Data</a>
              <a href="#data-security">Data Security</a>
              <a href="#data-sharing">Data Sharing</a>
              <a href="#international-transfers">International Transfers</a>
              <a href="#cookies">Cookies</a>
              <a href="#marketing">Marketing Communications</a>
              <a href="#data-retention">Data Retention</a>
              <a href="#your-rights">Your Rights</a>
              <a href="#third-party">Third-Party Links</a>
              <a href="#changes">Changes to This Policy</a>
              <a href="#contact">Contact & Complaints</a>
            </nav>
          </aside>

          <div className="privacy-body">
            <div className="privacy-section" id="introduction">
              <h2>Introduction</h2>
              <p>
                BigData Ghana Limited respects your privacy and is committed to protecting the personal information you provide when using our website. This Privacy Policy explains how we collect, use, store, share and protect personal data in accordance with Ghana's Data Protection Act, 2012 (Act 843).
              </p>
            </div>

            <div className="privacy-section" id="information-collected">
              <h2>Information We Collect</h2>
              <p>
                When you visit our website, submit a contact or service enquiry, apply for a job, subscribe to our newsletter or interact with our website, we may collect information such as your name, email address, telephone number, organisation, job title, location and any information included in your message or application.
              </p>
              <p>
                For job applications, we may also collect your curriculum vitae, qualifications, employment history, skills, references and other information relevant to the recruitment process.
              </p>
            </div>

            <div className="privacy-section" id="technical-data">
              <h2>Technical Data</h2>
              <p>
                We may automatically collect limited technical information when you use our website, including your Internet Protocol address, browser type, device type, operating system, pages visited, time of access, referring website and information collected through cookies or website analytics tools.
              </p>
            </div>

            <div className="privacy-section" id="how-we-use">
              <h2>How We Use Your Data</h2>
              <p>
                We use personal data only for specific, lawful and appropriate purposes. These may include responding to enquiries, understanding your business requirements, providing information about our services, preparing proposals or quotations, managing client and business relationships, processing job applications, sending newsletters or marketing communications where consent has been provided, maintaining website security, improving website performance and complying with legal or regulatory obligations.
              </p>
              <p>
                BigData Ghana Limited will not use personal data for a purpose that is unrelated to the reason it was originally collected unless you have been informed, provided the required consent or the additional use is otherwise permitted or required by law. We aim to collect only information that is relevant and reasonably necessary for the intended purpose.
              </p>
            </div>

            <div className="privacy-section" id="data-security">
              <h2>Data Security</h2>
              <p>
                We do our best to ensure that personal data under our control is handled responsibly and kept secure. We apply reasonable technical and organisational safeguards to protect information against accidental loss, misuse, unauthorised access, disclosure, alteration, damage or destruction. These measures may include access restrictions, password controls, secure hosting, system monitoring, security updates, backups, confidentiality requirements and appropriate security procedures.
              </p>
              <p>
                Although we take reasonable steps to protect personal data, no website, electronic transmission or storage system can be guaranteed to be completely secure. Where a personal-data security incident occurs, we will investigate the matter, take appropriate corrective action and notify affected individuals and the Data Protection Commission where required by law.
              </p>
            </div>

            <div className="privacy-section" id="data-sharing">
              <h2>Data Sharing</h2>
              <p>
                We do not sell or rent personal data. We may share information with authorised employees and trusted service providers who support our website, hosting, cloud services, email communications, analytics, recruitment, security or professional operations. These parties are expected to use personal data only for authorised purposes and to maintain appropriate confidentiality and security measures.
              </p>
              <p>
                We may also disclose personal data where required by law, a court, regulatory authority or law-enforcement agency, or where disclosure is reasonably necessary to protect our legal rights, systems, employees, clients or members of the public.
              </p>
            </div>

            <div className="privacy-section" id="international-transfers">
              <h2>International Transfers</h2>
              <p>
                Some of our technology or service providers may process information using systems located outside Ghana. Where this occurs, we will take reasonable steps to ensure that the information is processed lawfully and is protected by appropriate contractual, technical or organisational safeguards.
              </p>
            </div>

            <div className="privacy-section" id="cookies">
              <h2>Cookies</h2>
              <p>
                Our website may use cookies and similar technologies to support website functionality, remember user preferences, maintain security, analyse website traffic and improve the user experience. Where required, non-essential cookies will be used only after consent has been provided. Visitors may manage cookie preferences through the website's cookie notice or their browser settings.
              </p>
            </div>

            <div className="privacy-section" id="marketing">
              <h2>Marketing Communications</h2>
              <p>
                Marketing communications will only be sent where we have an appropriate legal basis, including consent where required. You may unsubscribe from marketing messages at any time by using the unsubscribe link provided or by contacting us. Unsubscribing from marketing will not prevent us from responding to an enquiry or sending necessary service-related communications.
              </p>
            </div>

            <div className="privacy-section" id="data-retention">
              <h2>Data Retention</h2>
              <p>
                We retain personal data only for as long as reasonably necessary to fulfil the purpose for which it was collected, comply with legal or contractual obligations, manage complaints or disputes and protect legitimate business interests. When information is no longer required, it may be securely deleted, destroyed or anonymised.
              </p>
            </div>

            <div className="privacy-section" id="your-rights">
              <h2>Your Rights</h2>
              <p>
                Subject to applicable law, you may request access to the personal data we hold about you, ask us to correct inaccurate or incomplete information, withdraw consent, object to direct marketing or request the deletion or restriction of personal data where legally appropriate. We may need to verify your identity before responding to a request.
              </p>
            </div>

            <div className="privacy-section" id="third-party">
              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. BigData Ghana Limited is not responsible for the privacy or security practices of those websites, and visitors should review the relevant third-party privacy policies before providing personal information.
              </p>
            </div>

            <div className="privacy-section" id="changes">
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our website, services, security practices, legal obligations or business operations. Any updated version will be published on this page with a revised effective date.
              </p>
            </div>

            <div className="privacy-section" id="contact">
              <h2>Contact & Complaints</h2>
              <div className="privacy-contact-card">
                <div className="privacy-contact-card__item">
                  <span className="privacy-contact-card__label">Company</span>
                  <span>BigData Ghana Limited</span>
                </div>
                <div className="privacy-contact-card__item">
                  <span className="privacy-contact-card__label">Address</span>
                  <span>No. 4 Blewusi Road, Airport Residential Area, Accra, Ghana</span>
                </div>
                <div className="privacy-contact-card__item">
                  <span className="privacy-contact-card__label">Digital Address</span>
                  <span>GA-117-2050</span>
                </div>
                <div className="privacy-contact-card__item">
                  <span className="privacy-contact-card__label">Email</span>
                  <a href="mailto:info@bigdataghana.com">info@bigdataghana.com</a>
                </div>
                <div className="privacy-contact-card__item">
                  <span className="privacy-contact-card__label">Telephone</span>
                  <span>+233 54 388 4816</span>
                </div>
              </div>
              <p>
                You may also submit a complaint to the Data Protection Commission of Ghana where you believe your personal data has not been handled in accordance with applicable data-protection law.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Privacy
