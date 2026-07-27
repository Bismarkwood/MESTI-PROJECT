import heroImg from '../../assets/images/hero.webp'
import reactLogo from '../../assets/images/react.svg'
import viteLogo from '../../assets/images/vite.svg'
import './Hero.css'

function Hero() {
  return (
    <div className="hero">
      <img src={heroImg} className="base" width="170" height="179" alt="" />
      <img src={reactLogo} className="framework" alt="React logo" />
      <img src={viteLogo} className="vite" alt="Vite logo" />
    </div>
  )
}

export default Hero
