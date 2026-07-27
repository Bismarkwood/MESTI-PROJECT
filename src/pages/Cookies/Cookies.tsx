import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import SEO from '../../components/SEO'
import '../Privacy/Privacy.css'

function Cookies() {
  return (
    <main className="privacy-page">
      <SEO
        title="Cookie Policy | BigData Ghana"
        description="BigData Ghana's Cookie Policy. How we use cookies and similar technologies on bigdataghana.com."
        path="/cookies"
      />
      <Navbar />

      {/* Hero */}
      <section className="privacy-hero">
        <div className="privacy-hero__content">
          <span className="privacy-hero__label">LEGAL</span>
          <h1 className="privacy-hero__title">Cookie Policy</h1>
          <p className="privacy-hero__sub">Effective Date: 22 July 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="privacy-content">
        <div className="privacy-content__inner">
          <aside className="privacy-toc">
            <h3 className="privacy-toc__title">Contents</h3>
            <nav className="privacy-toc__nav">
              <a href="#what-are-cookies">What Are Cookies</a>
              <a href="#essential">Essential Cookies</a>
              <a href="#functional">Functional Cookies</a>
              <a href="#analytics">Analytics Cookies</a>
              <a href="#marketing">Marketing Cookies</a>
              <a href="#third-party">Third-Party Cookies</a>
              <a href="#data-use">How We Use Cookie Data</a>
              <a href="#managing">Managing Cookies</a>
              <a href="#retention">Cookie Retention</a>
              <a href="#security">Security</a>
              <a href="#third-party-links">Third-Party Links</a>
              <a href="#changes">Changes to This Policy</a>
              <a href="#contact">Contact Us</a>
            </nav>
          </aside>

          <div className="privacy-body">
            <div className="privacy-section" id="what-are-cookies">
              <h2>What Are Cookies</h2>
              <p>
                BigData Ghana Limited uses cookies and similar technologies on bigdataghana.com to ensure that the website operates properly, remains secure and provides visitors with a useful browsing experience. This Cookie Policy explains what cookies are, how we use them and how you can manage your preferences.
              </p>
              <p>
                Cookies are small text files placed on your computer, mobile phone or other device when you visit a website. They allow a website to recognise your device, remember certain preferences, understand how visitors interact with its pages and improve its performance. Some cookies remain on your device only while your browser is open, while others may remain for a specified period or until you delete them.
              </p>
            </div>

            <div className="privacy-section" id="essential">
              <h2>Essential Cookies</h2>
              <p>
                We may use essential cookies that are necessary for the website to function properly. These may support website security, page navigation, contact forms, session management, fraud prevention and the storage of your cookie preferences. Because these cookies are required for the operation and security of the website, they may be used without requesting separate consent where permitted by law.
              </p>
            </div>

            <div className="privacy-section" id="functional">
              <h2>Functional Cookies</h2>
              <p>
                We may also use functional cookies to remember choices you make and provide an improved browsing experience. These may include language, location, display or other website preferences.
              </p>
            </div>

            <div className="privacy-section" id="analytics">
              <h2>Analytics & Performance Cookies</h2>
              <p>
                Analytics and performance cookies may be used to help us understand how visitors use the website. They may collect information such as the pages visited, the time spent on the website, the source through which a visitor reached the website, the type of browser or device used and whether technical errors occurred. We use this information to measure website performance, identify areas for improvement and better understand which content is useful to visitors.
              </p>
            </div>

            <div className="privacy-section" id="marketing">
              <h2>Marketing Cookies</h2>
              <p>
                Where marketing or advertising cookies are introduced, they may be used to measure the effectiveness of campaigns and provide communications that are more relevant to users. BigData Ghana Limited will not activate non-essential marketing or analytics cookies without obtaining consent where consent is required.
              </p>
            </div>

            <div className="privacy-section" id="third-party">
              <h2>Third-Party Cookies</h2>
              <p>
                Some cookies may be placed directly by BigData Ghana Limited, while others may be placed by trusted third-party service providers that support website hosting, analytics, security, communications or embedded content. These providers may process limited technical information in accordance with their own privacy policies and the services they provide to us.
              </p>
            </div>

            <div className="privacy-section" id="data-use">
              <h2>How We Use Cookie Data</h2>
              <p>
                We will use information collected through cookies only for appropriate, specific and lawful purposes. We do not use cookies to obtain unnecessary personal information, and we do not sell personal data collected through cookies. Where cookie information can identify or be linked to an individual, it will be handled in accordance with our Privacy Policy and Ghana's Data Protection Act, 2012 (Act 843).
              </p>
            </div>

            <div className="privacy-section" id="managing">
              <h2>Managing Your Cookie Preferences</h2>
              <p>
                When you first visit our website, you may be presented with a cookie notice that allows you to accept, reject or manage non-essential cookies. You may change your preferences through the cookie settings available on the website. You may also block or delete cookies through your browser settings. Disabling essential cookies may affect the operation or availability of certain website features.
              </p>
            </div>

            <div className="privacy-section" id="retention">
              <h2>Cookie Retention</h2>
              <p>
                Cookies will be retained only for the period reasonably necessary for their intended purpose. Session cookies are normally deleted when you close your browser, while persistent cookies may remain on your device until they expire, are replaced or are deleted by you. The specific cookies, their purposes, providers and durations may be displayed through the website's cookie preference centre.
              </p>
            </div>

            <div className="privacy-section" id="security">
              <h2>Security</h2>
              <p>
                We take reasonable technical and organisational steps to protect information collected through the website against unauthorised access, disclosure, misuse, alteration, loss or destruction. However, no internet-based system can be guaranteed to be completely secure.
              </p>
            </div>

            <div className="privacy-section" id="third-party-links">
              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to or content from third-party websites and platforms. Those third parties may use their own cookies, and BigData Ghana Limited does not control their cookie or privacy practices. Visitors should review the policies of those third parties before interacting with their services.
              </p>
            </div>

            <div className="privacy-section" id="changes">
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Cookie Policy when we change the cookies or technologies used on the website or where necessary to reflect changes in our services, legal requirements or data-protection practices. Any revised policy will be published on this page with an updated effective date.
              </p>
            </div>

            <div className="privacy-section" id="contact">
              <h2>Contact Us</h2>
              <p>Questions or concerns about our use of cookies may be directed to:</p>
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Cookies
