import unidoLogo from '../../assets/UNIDO.webp'
import epaLogo from '../../assets/EPA.webp'
import './StatsBar.css'

function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="stats-bar__inner">
        <span className="stats-bar__title">FUNDED BY</span>
        <div className="stats-bar__divider" />
        <div className="stats-bar__logos">
          <img src={unidoLogo} alt="UNIDO" />
          <img src={epaLogo} alt="EPA" />
        </div>
      </div>
    </section>
  )
}

export default StatsBar
