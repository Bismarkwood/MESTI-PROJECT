import './AnalyticsVisual.css'

function AnalyticsVisual() {
  return (
    <div className="analytics-visual">
      <svg viewBox="0 0 500 400" className="analytics-visual__svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="aiCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B5E20" />
            <stop offset="50%" stopColor="#56C271" />
            <stop offset="100%" stopColor="#F4B400" />
          </linearGradient>
          <linearGradient id="dataFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#56C271" />
          </linearGradient>
          <linearGradient id="insightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#56C271" />
            <stop offset="100%" stopColor="#F4B400" />
          </linearGradient>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="rgba(86,194,113,0.12)" />
            <stop offset="60%" stopColor="rgba(56,189,248,0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <ellipse cx="250" cy="200" rx="120" ry="100" fill="url(#coreGlow)" />

        {/* Background grid */}
        <g opacity="0.1">
          <circle cx="250" cy="200" r="140" fill="none" stroke="#56C271" strokeWidth="0.4" strokeDasharray="4 6" />
          <circle cx="250" cy="200" r="100" fill="none" stroke="#38BDF8" strokeWidth="0.3" strokeDasharray="3 5" />
        </g>

        {/* Data flow lines (left → center) */}
        <path d="M60,150 Q150,170 220,195" fill="none" stroke="url(#dataFlowGrad)" strokeWidth="0.8" opacity="0.4" />
        <path d="M80,280 Q160,240 230,210" fill="none" stroke="url(#dataFlowGrad)" strokeWidth="0.8" opacity="0.4" />
        <path d="M100,100 Q170,140 235,190" fill="none" stroke="url(#dataFlowGrad)" strokeWidth="0.8" opacity="0.3" />

        {/* Insight output lines (center → right) */}
        <path d="M280,185 Q340,150 400,125" fill="none" stroke="url(#insightGrad)" strokeWidth="0.8" opacity="0.4" />
        <path d="M280,210 Q340,240 400,265" fill="none" stroke="url(#insightGrad)" strokeWidth="0.8" opacity="0.4" />

        {/* Data particles flowing in */}
        <circle className="analytics-visual__particle--in1" cx="60" cy="150" r="4" fill="#38BDF8" />
        <circle className="analytics-visual__particle--in2" cx="80" cy="280" r="3.5" fill="#56C271" />
        <circle className="analytics-visual__particle--in3" cx="100" cy="100" r="3" fill="#F4B400" />

        {/* Insight particles flowing out */}
        <circle className="analytics-visual__particle--out1" cx="250" cy="200" r="4" fill="#56C271" />
        <circle className="analytics-visual__particle--out2" cx="250" cy="200" r="3.5" fill="#F4B400" />

        {/* AI Core */}
        <g className="analytics-visual__core">
          <circle cx="250" cy="200" r="38" fill="#060a08" stroke="url(#aiCoreGrad)" strokeWidth="1.8" />
        </g>

        {/* Neural ring inside core */}
        <circle className="analytics-visual__neural-ring" cx="250" cy="200" r="28" fill="none" stroke="#38BDF8" strokeWidth="0.6" strokeDasharray="5 4" opacity="0.5" />

        {/* Neural nodes inside core */}
        <circle className="analytics-visual__node--1" cx="240" cy="192" r="3" fill="#56C271" />
        <circle className="analytics-visual__node--2" cx="260" cy="205" r="2.5" fill="#F4B400" />
        <circle className="analytics-visual__node--3" cx="248" cy="212" r="2" fill="#38BDF8" />

        {/* Chart area (right side) */}
        <g className="analytics-visual__card">
          <rect x="360" y="110" width="70" height="45" rx="4" fill="#080c0a" stroke="#56C271" strokeWidth="0.6" opacity="0.7" />
        </g>

        {/* Chart line */}
        <polyline className="analytics-visual__chart-line" points="370,145 380,140 390,142 400,135 410,130 420,125" fill="none" stroke="#56C271" strokeWidth="1.2" strokeLinecap="round" />

        {/* Predictive dotted line */}
        <polyline className="analytics-visual__predict-line" points="420,125 430,118 440,112" fill="none" stroke="#F4B400" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 2" />

        {/* Anomaly dot */}
        <circle className="analytics-visual__anomaly" cx="400" cy="135" r="5" fill="none" stroke="#F97316" strokeWidth="1.5" />

        {/* Decision check marker */}
        <g className="analytics-visual__decision">
          <circle cx="410" cy="270" r="12" fill="#0a1a12" stroke="#56C271" strokeWidth="1.2" />
          <polyline points="404,270 408,274 416,266" fill="none" stroke="#56C271" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  )
}

export default AnalyticsVisual
