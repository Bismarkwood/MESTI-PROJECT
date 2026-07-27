import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
          <img src={mestLogo} alt="Mest Logo" className="navbar__logo-img" />
          <span className="navbar__logo-label">CPF - MESTI</span>
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
                          {item.icon === 'about' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>}
                          {item.icon === 'projects' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>}
                          {item.icon === 'blog' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16v16H4z" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 8h8M8 12h5"/></svg>}
                          {item.icon === 'careers' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
                          {item.icon === 'team' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><path d="M2 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1"/></svg>}
                          {item.icon === 'contact' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>}
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
