import { useState } from 'react'
import HeroCTA from '../HeroCTA'
import './SolutionsSlider.css'

interface SolutionItem {
  label: string
  title: string
  description: string
  image: string
  cardLabel: string
  link: string
}

interface SolutionsSliderProps {
  solutions: SolutionItem[]
}

function SolutionsSlider({ solutions }: SolutionsSliderProps) {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const current = solutions[active]

  const next = () => {
    setDirection('next')
    setActive((prev) => (prev + 1) % solutions.length)
  }
  const prev = () => {
    setDirection('prev')
    setActive((prev) => (prev - 1 + solutions.length) % solutions.length)
  }

  return (
    <section className="solutions-slider">
      <div className="solutions-slider__inner">
        {/* Left: Content */}
        <div className="solutions-slider__content">
          <span className="solutions-slider__label">{current.label}</span>
          <div className="solutions-slider__text-slide" key={`text-${active}`} data-direction={direction}>
            <h2 className="solutions-slider__title">{current.title}</h2>
            <p className="solutions-slider__desc">{current.description}</p>
          </div>
          <div className="solutions-slider__cta-wrap">
            <HeroCTA text={`Explore ${current.cardLabel}`} href={current.link} />
          </div>
          <div className="solutions-slider__arrows">
            <button className="solutions-slider__arrow" onClick={prev} aria-label="Previous">←</button>
            <button className="solutions-slider__arrow" onClick={next} aria-label="Next">→</button>
          </div>
        </div>

        {/* Divider with animated bubbles */}
        <div className="solutions-slider__divider">
          <span className="solutions-slider__bubble solutions-slider__bubble--yellow" />
        </div>

        {/* Right: Image card */}
        <div className="solutions-slider__card">
          <div className="solutions-slider__card-img" key={`img-${active}`} data-direction={direction}>
            {current.image ? (
              <img src={current.image} alt={current.cardLabel} className="solutions-slider__img" />
            ) : (
              <div className="solutions-slider__img-placeholder" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="solutions-slider__line" />
    </section>
  )
}

export default SolutionsSlider
