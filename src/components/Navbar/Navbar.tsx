import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { User, FileText, Star, Users, Mail, LayoutGrid } from 'lucide-react'
import HeroCTA from '../HeroCTA'
import mestLogo from '../../assets/NavBar Logo/Mest Logo.png'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Pilot Projects', href: '/cef-ps' },
  { label: 'Impact', href: '/impact' },
  { label: 'Projects', href: '/cef-ps' },
  { label: 'Knowledge Hub', href: '/knowledge-hub' },
  { label: 'Company', href: '#company', hasDropdown: true },
]

const companyDropdown = [
  { title: 'About Us', desc: 'Our mission, culture & leadership.', href: '/about', icon: 'about' },
  { title: 'Blog', desc: 'Insights on data, AI & growth.', href: '/insights', icon: 'blog' },
  // { title: 'Careers', desc: 'Join our growing team.', href: '/careers', icon: 'careers' },
  // { title: 'Team', desc: 'Meet the people behind BDG.', href: '/team', icon: 'team' },
]

function Navbar({ light = false }: { light?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${dropdownOpen ? 'navbar--dropdown-open' : ''} ${light ? 'navbar--light' : ''} ${mobileOpen ? 'navbar--mobile-open' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">
          <img src={mestLogo} alt="MEST Logo" className="navbar__logo-img" />
          <span className="navbar__logo-label">CEF-PS · MEST</span>
        </Link>

        {/* Inline nav links (desktop) */}
        <div className="navbar__links">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                className="navbar__link-dropdown-wrap"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <span className="navbar__link navbar__link--has-dropdown">
                  {link.label} <span className="navbar__link-chevron">▾</span>
                </span>
                {/* Dropdown */}
                <div className={`navbar__dropdown ${dropdownOpen ? 'navbar__dropdown--open' : ''}`}>
                  <div className="navbar__dropdown-grid">
                    {companyDropdown.map((item) => (
                      <Link to={item.href} key={item.title} className="navbar__dropdown-card" onClick={() => setDropdownOpen(false)}>
                        <span className="navbar__dropdown-card-icon">
                          {item.icon === 'about' && <User size={20} strokeWidth={1.8} />}
                          {item.icon === 'projects' && <LayoutGrid size={20} strokeWidth={1.8} />}
                          {item.icon === 'blog' && <FileText size={20} strokeWidth={1.8} />}
                          {item.icon === 'careers' && <Star size={20} strokeWidth={1.8} />}
                          {item.icon === 'team' && <Users size={20} strokeWidth={1.8} />}
                          {item.icon === 'contact' && <Mail size={20} strokeWidth={1.8} />}
                        </span>
                        <div className="navbar__dropdown-card-text">
                          <span className="navbar__dropdown-card-title">{item.title}</span>
                          <span className="navbar__dropdown-card-desc">{item.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : link.href.startsWith('/') ? (
              <Link key={link.label} to={link.href} className={`navbar__link ${location.pathname === link.href ? 'navbar__link--active' : ''}`}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="navbar__link">
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="navbar__right">
          {/* Hamburger button (mobile) */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
          <div className="navbar__cta-desktop">
            <HeroCTA text="Contact Us" href="/contact" />
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="navbar__mobile-menu">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.label} className="navbar__mobile-section">
                <span className="navbar__mobile-section-label">{link.label}</span>
                {companyDropdown.map((item) => (
                  <Link key={item.title} to={item.href} className="navbar__mobile-link navbar__mobile-link--sub" onClick={() => setMobileOpen(false)}>
                    {item.title}
                  </Link>
                ))}
              </div>
            ) : link.href.startsWith('/') ? (
              <Link key={link.label} to={link.href} className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className="navbar__mobile-link" onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            )
          )}
          <Link to="/contact" className="navbar__mobile-cta" onClick={() => setMobileOpen(false)}>
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
