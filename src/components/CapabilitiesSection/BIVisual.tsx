import './BIVisual.css'

function BIVisual() {
  return (
    <div className="bi-visual">
      <svg viewBox="0 0 500 400" className="bi-visual__svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="biFrameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B5E20" />
            <stop offset="50%" stopColor="#56C271" />
            <stop offset="100%" stopColor="#F4B400" />
          </linearGradient>
          <linearGradient id="biChartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#56C271" />
          </linearGradient>
          <linearGradient id="biProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#56C271" />
            <stop offset="100%" stopColor="#F4B400" />
          </linearGradient>
        </defs>

        {/* Background grid */}
        <g opacity="0.08">
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`bgh-${i}`} x1="80" y1={80 + i * 40} x2="420" y2={80 + i * 40} stroke="#56C271" strokeWidth="0.4" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`bgv-${i}`} x1={80 + i * 42} y1="80" x2={80 + i * 42} y2="340" stroke="#56C271" strokeWidth="0.4" />
          ))}
        </g>

        {/* Main dashboard frame */}
        <rect className="bi-visual__frame" x="100" y="90" width="300" height="220" rx="8" fill="#060c09" stroke="url(#biFrameGrad)" strokeWidth="1" />

        {/* KPI Cards (top row) */}
        <g className="bi-visual__kpi--1">
          <rect x="115" y="105" width="80" height="40" rx="4" fill="#0a1610" stroke="#56C271" strokeWidth="0.5" />
          <line x1="125" y1="120" x2="155" y2="120" stroke="#56C271" strokeWidth="1.5" opacity="0.7" />
          <line x1="125" y1="130" x2="145" y2="130" stroke="#38BDF8" strokeWidth="1" opacity="0.5" />
          {/* Trend arrow up */}
          <polyline points="175,135 180,125 185,135" fill="none" stroke="#56C271" strokeWidth="1" strokeLinecap="round" />
        </g>

        <g className="bi-visual__kpi--2">
          <rect x="205" y="105" width="80" height="40" rx="4" fill="#0a1610" stroke="#F4B400" strokeWidth="0.5" />
          <line x1="215" y1="120" x2="250" y2="120" stroke="#F4B400" strokeWidth="1.5" opacity="0.7" />
          <line x1="215" y1="130" x2="240" y2="130" stroke="#38BDF8" strokeWidth="1" opacity="0.5" />
          <circle cx="270" cy="125" r="6" fill="none" stroke="#F4B400" strokeWidth="1" opacity="0.6" />
        </g>

        <g className="bi-visual__kpi--3">
          <rect x="295" y="105" width="80" height="40" rx="4" fill="#0a1610" stroke="#38BDF8" strokeWidth="0.5" />
          <line x1="305" y1="120" x2="340" y2="120" stroke="#38BDF8" strokeWidth="1.5" opacity="0.7" />
          <line x1="305" y1="130" x2="330" y2="130" stroke="#56C271" strokeWidth="1" opacity="0.5" />
          <rect x="350" y="118" width="14" height="14" rx="2" fill="none" stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* Line chart */}
        <polyline className="bi-visual__line-chart" points="120,260 145,250 170,255 195,240 220,235 245,220 270,225 295,210 320,200 345,195 370,185" fill="none" stroke="url(#biChartGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Bar chart (right area) */}
        <g>
          <rect className="bi-visual__bar--1" x="330" y="245" width="12" height="40" rx="2" fill="#1B5E20" style={{ transformOrigin: '336px 285px' }} />
          <rect className="bi-visual__bar--2" x="346" y="235" width="12" height="50" rx="2" fill="#56C271" style={{ transformOrigin: '352px 285px' }} />
          <rect className="bi-visual__bar--3" x="362" y="250" width="12" height="35" rx="2" fill="#F4B400" style={{ transformOrigin: '368px 285px' }} />
          <rect className="bi-visual__bar--4" x="378" y="225" width="12" height="60" rx="2" fill="#38BDF8" style={{ transformOrigin: '384px 285px' }} />
        </g>

        {/* Progress ring (circular gauge) */}
        <g>
          <circle cx="150" cy="200" r="25" fill="none" stroke="#1a2e20" strokeWidth="3" />
          <circle className="bi-visual__progress-fill" cx="150" cy="200" r="25" fill="none" stroke="url(#biProgressGrad)" strokeWidth="3" strokeLinecap="round" style={{ transformOrigin: '150px 200px', transform: 'rotate(-90deg)' }} />
          <circle cx="150" cy="200" r="4" fill="#56C271" opacity="0.6" />
        </g>

        {/* Report panel (bottom right) */}
        <g className="bi-visual__report">
          <rect x="415" y="200" width="55" height="70" rx="4" fill="#080e0b" stroke="#56C271" strokeWidth="0.6" />
          <line x1="425" y1="215" x2="458" y2="215" stroke="#56C271" strokeWidth="0.8" opacity="0.5" />
          <line x1="425" y1="225" x2="450" y2="225" stroke="#38BDF8" strokeWidth="0.6" opacity="0.4" />
          <line x1="425" y1="235" x2="455" y2="235" stroke="#F4B400" strokeWidth="0.6" opacity="0.4" />
          <rect x="425" y="245" width="30" height="12" rx="2" fill="#1B5E20" opacity="0.4" />
        </g>

        {/* Decision insight glow */}
        <g className="bi-visual__insight">
          <circle cx="320" cy="195" r="8" fill="none" stroke="#F4B400" strokeWidth="1.5" />
          <circle cx="320" cy="195" r="3" fill="#F4B400" opacity="0.8" />
        </g>
      </svg>
    </div>
  )
}

export default BIVisual
