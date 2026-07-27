export interface HeroSlide {
  backgroundImage: string
  circleImage: string
}

import heroImg1 from '../../assets/homepage-hero-bg.jpg'

const heroSlides: HeroSlide[] = [
  {
    backgroundImage: heroImg1,
    circleImage: heroImg1,
  }
]

export default heroSlides
