import { Link } from 'react-router-dom'
import footerBg from '../../assets/Footer/footer.webp'
import mestLogo from '../../assets/NavBar Logo/Mest Logo.png'
import './Footer.css'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Programmes', href: '#programmes' },
  { label: 'Resources', href: '#resources' },
  { label: 'News', href: '#news' },
  { label: 'Opportunities', href: '#opportunities' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
]

function Footer() {
  return (
    <footer className="footer">
      {/* Background image */}
      <div className="footer__bg" style={{ backgroundImage: `url(${footerBg})` }} />
      <div className="footer__overlay" />
      
      {/* Top: Brand + Nav */}
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__brand-logo">
            <img src={mestLogo} alt="MEST CPF Ghana Logo" className="footer__brand-img" />
            <h2 className="footer__brand-name">CPF Ghana</h2>
          </div>
          <p className="footer__brand-tagline">
            CPF Ghana is a national platform under the Ministry of Environment, Science, Technology and Innovation supporting Ghana’s transition towards a circular plastics economy.
          </p>
        </div>
        
        <nav className="footer__nav">
          {navLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link key={link.label} to={link.href} className="footer__nav-link">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="footer__nav-link">
                {link.label}
              </a>
            )
          ))}
        </nav>
      </div>

      {/* Middle: Address | Socials | Contact */}
      <div className="footer__middle">
        <div className="footer__address">
          Accra, Ghana<br />
          Ministry of Environment, Science, Technology and Innovation (MEST)
        </div>

        <div className="footer__socials">
          <a href="#" className="footer__social" aria-label="Facebook">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" className="footer__social" aria-label="X">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768M13.232 10.232L20 4"/></svg>
          </a>
          <a href="#" className="footer__social" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="#" className="footer__social" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>
          </a>
        </div>

        <div className="footer__contact">
          <span>+233 (0) 302 666 049</span>
          <span>info@cpfghana.org</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
