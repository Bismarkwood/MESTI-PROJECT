import './GeoVisual.css'

function GeoVisual() {
  return (
    <div className="geo-visual">
      <svg viewBox="0 0 400 300" className="geo-visual__svg" xmlns="http://www.w3.org/2000/svg">
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="blockGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4444" />
            <stop offset="50%" stopColor="#ffd93d" />
            <stop offset="100%" stopColor="#2ea872" />
          </linearGradient>
          <linearGradient id="blockGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4444" />
            <stop offset="50%" stopColor="#ffd93d" />
            <stop offset="100%" stopColor="#2ea872" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        <g className="geo-visual__grid" opacity="0.3">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h-${i}`} x1="50" y1={60 + i * 30} x2="350" y2={60 + i * 30} stroke="url(#blockGradient1)" strokeWidth="0.3" strokeDasharray="3 3" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`v-${i}`} x1={50 + i * 33} y1="60" x2={50 + i * 33} y2="270" stroke="url(#blockGradient1)" strokeWidth="0.3" strokeDasharray="3 3" />
          ))}
        </g>

        {/* Isometric blocks */}
        <g className="geo-visual__blocks">
          <g className="geo-visual__block geo-visual__block--1">
            <polygon points="120,180 150,165 180,180 150,195" fill="#1a0a0a" stroke="url(#blockGradient1)" strokeWidth="0.7" />
            <polygon points="120,180 120,200 150,215 150,195" fill="#1a1008" stroke="url(#blockGradient1)" strokeWidth="0.7" />
            <polygon points="150,195 150,215 180,200 180,180" fill="#0a1a12" stroke="url(#blockGradient1)" strokeWidth="0.7" />
          </g>
          <g className="geo-visual__block geo-visual__block--2">
            <polygon points="180,165 210,150 240,165 210,180" fill="#1a0a0a" stroke="url(#blockGradient2)" strokeWidth="0.7" />
            <polygon points="180,165 180,195 210,210 210,180" fill="#1a1008" stroke="url(#blockGradient2)" strokeWidth="0.7" />
            <polygon points="210,180 210,210 240,195 240,165" fill="#0a1a12" stroke="url(#blockGradient2)" strokeWidth="0.7" />
          </g>
          <g className="geo-visual__block geo-visual__block--3">
            <polygon points="240,150 270,135 300,150 270,165" fill="#1a0a0a" stroke="url(#blockGradient1)" strokeWidth="0.7" />
            <polygon points="240,150 240,185 270,200 270,165" fill="#1a1008" stroke="url(#blockGradient1)" strokeWidth="0.7" />
            <polygon points="270,165 270,200 300,185 300,150" fill="#0a1a12" stroke="url(#blockGradient1)" strokeWidth="0.7" />
          </g>
          <g className="geo-visual__block geo-visual__block--4">
            <polygon points="150,210 180,195 210,210 180,225" fill="#1a0a0a" stroke="url(#blockGradient2)" strokeWidth="0.7" />
            <polygon points="150,210 150,235 180,250 180,225" fill="#1a1008" stroke="url(#blockGradient2)" strokeWidth="0.7" />
            <polygon points="180,225 180,250 210,235 210,210" fill="#0a1a12" stroke="url(#blockGradient2)" strokeWidth="0.7" />
          </g>
          <g className="geo-visual__block geo-visual__block--5">
            <polygon points="210,195 240,180 270,195 240,210" fill="#1a0a0a" stroke="url(#blockGradient1)" strokeWidth="0.7" />
            <polygon points="210,195 210,230 240,245 240,210" fill="#1a1008" stroke="url(#blockGradient1)" strokeWidth="0.7" />
            <polygon points="240,210 240,245 270,230 270,195" fill="#0a1a12" stroke="url(#blockGradient1)" strokeWidth="0.7" />
          </g>
        </g>

        {/* Connection lines */}
        <g className="geo-visual__connections" opacity="0.5">
          <line x1="120" y1="100" x2="150" y2="165" stroke="#ff6b6b" strokeWidth="0.8" className="geo-visual__line--pulse" />
          <line x1="280" y1="90" x2="270" y2="135" stroke="#ffd93d" strokeWidth="0.8" className="geo-visual__line--pulse" />
          <line x1="320" y1="200" x2="270" y2="195" stroke="#2ea872" strokeWidth="0.8" className="geo-visual__line--pulse" />
        </g>

        {/* Data points */}
        <circle className="geo-visual__dot geo-visual__dot--1" cx="120" cy="100" r="3" fill="#ff6b6b" />
        <circle className="geo-visual__dot geo-visual__dot--2" cx="280" cy="90" r="3" fill="#ffd93d" />
        <circle className="geo-visual__dot geo-visual__dot--3" cx="320" cy="200" r="3" fill="#2ea872" />

        {/* Floating label */}
        <g className="geo-visual__label">
          <rect x="85" y="88" width="70" height="16" rx="3" fill="rgba(255,68,68,0.1)" stroke="url(#blockGradient1)" strokeWidth="0.5" />
          <text x="120" y="99" textAnchor="middle" fill="#ffd93d" fontSize="7" fontFamily="Manrope">GH.2025.1201</text>
        </g>
      </svg>
    </div>
  )
}

export default GeoVisual
