import './ServiceCard.css'

interface ServiceCardProps {
  number: string
  label: string
  title: string
  description: string
  image: string
  orbitImages?: string[]
  reversed?: boolean
}

function ServiceCard({ number, label, title, description, image, orbitImages = [], reversed = false }: ServiceCardProps) {
  return (
    <div className={`service-card ${reversed ? 'service-card--reversed' : ''}`}>
      {/* Left: Image */}
      <div className="service-card__image-side">
        {image ? (
          <img src={image} alt={title} className="service-card__img" />
        ) : (
          <div className="service-card__img-placeholder" />
        )}
      </div>

      {/* Right: Dark side with content */}
      <div className="service-card__right">
        <div className="service-card__content">
          <span className="service-card__label">{label}</span>
          <h3 className="service-card__title">{title}</h3>
          <p className="service-card__desc">{description}</p>
        </div>
      </div>

      {/* Orbit system — overlays the center split */}
      <div className="service-card__orbit-wrap">
        {/* Concentric rings */}
        <div className="service-card__ring service-card__ring--3" />
        <div className="service-card__ring service-card__ring--2" />
        <div className="service-card__ring service-card__ring--main" />
        <div className="service-card__ring service-card__ring--1" />

        {/* Number */}
        <span className="service-card__number">{number}</span>

        {/* Orbit dots */}
        {orbitImages[0] !== undefined && (
          <div className="service-card__orbit-dot service-card__orbit-dot--1">
            {orbitImages[0] ? (
              <img src={orbitImages[0]} alt="" className="service-card__orbit-img" />
            ) : (
              <div className="service-card__orbit-img-placeholder" />
            )}
          </div>
        )}
        {orbitImages[1] !== undefined && (
          <div className="service-card__orbit-dot service-card__orbit-dot--2">
            {orbitImages[1] ? (
              <img src={orbitImages[1]} alt="" className="service-card__orbit-img" />
            ) : (
              <div className="service-card__orbit-img-placeholder" />
            )}
          </div>
        )}
        {orbitImages[2] !== undefined && (
          <div className="service-card__orbit-dot service-card__orbit-dot--3">
            {orbitImages[2] ? (
              <img src={orbitImages[2]} alt="" className="service-card__orbit-img" />
            ) : (
              <div className="service-card__orbit-img-placeholder" />
            )}
          </div>
        )}
        {orbitImages[3] !== undefined && (
          <div className="service-card__orbit-dot service-card__orbit-dot--4">
            {orbitImages[3] ? (
              <img src={orbitImages[3]} alt="" className="service-card__orbit-img" />
            ) : (
              <div className="service-card__orbit-img-placeholder" />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceCard
