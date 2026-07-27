import { useEffect, useRef, useState, useCallback } from 'react'
import './ServiceScroll.css'

interface ServiceItem {
  title: string
  description: string
  image: string
  number: string
  label: string
}

interface ServiceScrollProps {
  services: ServiceItem[]
}

function ServiceScroll({ services }: ServiceScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const totalCards = services.length
    const wrapperTop = wrapper.offsetTop
    const wrapperHeight = wrapper.offsetHeight
    const scrollY = window.scrollY
    const viewportH = window.innerHeight

    const scrollIntoWrapper = scrollY - wrapperTop
    const scrollableDistance = wrapperHeight - viewportH

    if (scrollableDistance <= 0) return

    const progress = Math.max(0, Math.min(1, scrollIntoWrapper / scrollableDistance))
    const idx = Math.min(totalCards - 1, Math.round(progress * (totalCards - 1)))
    setActiveIndex(idx)
  }, [services.length])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const circumference = 2 * Math.PI * 24
  const progressOffset = circumference - ((activeIndex + 1) / services.length) * circumference

  return (
    <div
      className="sscroll-wrapper"
      ref={wrapperRef}
      style={{ height: `${services.length * 80}vh` }}
    >
      <div className="sscroll">
        {/* Center number indicator */}
        <div className="sscroll__indicator">
          <svg className="sscroll__progress-svg" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle
              className="sscroll__progress-fill"
              cx="26" cy="26" r="24"
              fill="none"
              stroke="#2ea872"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
            />
          </svg>
          <span className="sscroll__indicator-num">{services[activeIndex]?.number}</span>
        </div>

        {/* Track that moves up */}
        <div
          className="sscroll__track"
          style={{ transform: `translateY(-${activeIndex * 100}vh)` }}
        >
          {services.map((service, i) => {
            const isReversed = i % 2 !== 0
            return (
              <div className={`sscroll__card ${isReversed ? 'sscroll__card--reversed' : ''}`} key={i}>
                {/* Content */}
                <div className="sscroll__content">
                  <div className="sscroll__content-inner">
                    <span className="sscroll__label">{service.label}</span>
                    <h3 className="sscroll__title">{service.title}</h3>
                    <p className="sscroll__desc">{service.description}</p>
                  </div>
                </div>
                {/* Image */}
                <div className="sscroll__image">
                  {service.image ? (
                    <img src={service.image} alt={service.title} className="sscroll__img" />
                  ) : (
                    <div className="sscroll__img-placeholder" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServiceScroll
