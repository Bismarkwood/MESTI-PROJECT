import '../StatsBar/StatsBar.css'

function ProofStatsBar() {
  return (
    <section className="stats-bar">
      <div className="stats-bar__inner">
        <div className="stats-bar__item">
          <span className="stats-bar__number">5</span>
          <span className="stats-bar__label">Flagship platforms and analyses</span>
        </div>
        <div className="stats-bar__divider" />
        <div className="stats-bar__item">
          <span className="stats-bar__number">4</span>
          <span className="stats-bar__label">Sectors of proven delivery</span>
        </div>
        <div className="stats-bar__divider" />
        <div className="stats-bar__item">
          <span className="stats-bar__number">8 yrs</span>
          <span className="stats-bar__label">Of Ghana-specific data</span>
        </div>
      </div>
    </section>
  )
}

export default ProofStatsBar
