import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import './ScrollToTopButton.css'

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`scroll-top-btn ${visible ? 'scroll-top-btn--visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp size={18} strokeWidth={2} />
    </button>
  )
}

export default ScrollToTopButton
