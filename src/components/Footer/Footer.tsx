import { Link } from 'react-router-dom'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
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
            <img src={mestLogo} alt="MEST CEF-PS Ghana Logo" className="footer__brand-img" />
            <h2 className="footer__brand-name">CEF-PS Ghana</h2>
          </div>
          <p className="footer__brand-tagline">
            CEF-PS Ghana is a national platform under the Ministry of Environment, Science, Technology and Innovation supporting Ghana’s transition towards a circular plastics economy.
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
            <Facebook size={16} strokeWidth={1.5} />
          </a>
          <a href="#" className="footer__social" aria-label="X">
            <Twitter size={16} strokeWidth={1.5} />
          </a>
          <a href="#" className="footer__social" aria-label="Instagram">
            <Instagram size={16} strokeWidth={1.5} />
          </a>
          <a href="#" className="footer__social" aria-label="LinkedIn">
            <Linkedin size={16} strokeWidth={1.5} />
          </a>
        </div>

        <div className="footer__contact">
          <span>+233 (0) 302 666 049</span>
          <span>info@cefpsghana.org</span>
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
