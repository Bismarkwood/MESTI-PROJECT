import './CloudVisual.css'

function CloudVisual() {
  return (
    <div className="cloud-visual">
      <svg viewBox="0 0 500 400" className="cloud-visual__svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E63946" />
            <stop offset="50%" stopColor="#FFD166" />
            <stop offset="100%" stopColor="#2E7D32" />
          </linearGradient>
          <linearGradient id="pipeGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E63946" />
            <stop offset="50%" stopColor="#FFD166" />
            <stop offset="100%" stopColor="#56C271" />
          </linearGradient>
          <linearGradient id="pipeGrad2" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#56C271" />
            <stop offset="50%" stopColor="#FFD166" />
            <stop offset="100%" stopColor="#E63946" />
          </linearGradient>
          <radialGradient id="cloudGlow">
            <stop offset="0%" stopColor="rgba(255,209,102,0.15)" />
            <stop offset="60%" stopColor="rgba(46,125,50,0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid */}
        <g opacity="0.15">
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`gh-${i}`} x1="80" y1={100 + i * 45} x2="420" y2={100 + i * 45} stroke="#FFD166" strokeWidth="0.3" strokeDasharray="4 4" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`gv-${i}`} x1={80 + i * 48} y1="100" x2={80 + i * 48} y2="340" stroke="#56C271" strokeWidth="0.3" strokeDasharray="4 4" />
          ))}
        </g>

        {/* Central cloud glow */}
        <ellipse cx="250" cy="185" rx="90" ry="60" fill="url(#cloudGlow)" />

        {/* Data pipelines flowing into cloud */}
        <g className="cloud-visual__pipes">
          <path className="cloud-visual__pipe cloud-visual__pipe--1" d="M100,320 Q100,260 170,220" fill="none" stroke="url(#pipeGrad1)" strokeWidth="1.2" />
          <path className="cloud-visual__pipe cloud-visual__pipe--2" d="M180,340 Q200,280 220,220" fill="none" stroke="url(#pipeGrad2)" strokeWidth="1.2" />
          <path className="cloud-visual__pipe cloud-visual__pipe--3" d="M320,340 Q300,280 280,220" fill="none" stroke="url(#pipeGrad1)" strokeWidth="1.2" />
          <path className="cloud-visual__pipe cloud-visual__pipe--4" d="M400,320 Q400,260 330,220" fill="none" stroke="url(#pipeGrad2)" strokeWidth="1.2" />
          {/* Outbound pipes */}
          <path className="cloud-visual__pipe cloud-visual__pipe--5" d="M200,160 Q160,120 130,90" fill="none" stroke="url(#pipeGrad1)" strokeWidth="1" />
          <path className="cloud-visual__pipe cloud-visual__pipe--6" d="M300,160 Q340,120 370,90" fill="none" stroke="url(#pipeGrad2)" strokeWidth="1" />
        </g>

        {/* Moving particles on pipes */}
        <g className="cloud-visual__particles">
          <circle className="cloud-visual__particle cloud-visual__particle--1" r="3" fill="#E63946" filter="url(#glow)">
            <animateMotion dur="3s" repeatCount="indefinite" path="M100,320 Q100,260 170,220" />
          </circle>
          <circle className="cloud-visual__particle cloud-visual__particle--2" r="3" fill="#FFD166" filter="url(#glow)">
            <animateMotion dur="3.5s" repeatCount="indefinite" path="M180,340 Q200,280 220,220" />
          </circle>
          <circle className="cloud-visual__particle cloud-visual__particle--3" r="3" fill="#56C271" filter="url(#glow)">
            <animateMotion dur="4s" repeatCount="indefinite" path="M320,340 Q300,280 280,220" />
          </circle>
          <circle className="cloud-visual__particle cloud-visual__particle--4" r="2.5" fill="#FFD166" filter="url(#glow)">
            <animateMotion dur="3.2s" repeatCount="indefinite" path="M400,320 Q400,260 330,220" />
          </circle>
          <circle className="cloud-visual__particle cloud-visual__particle--5" r="2" fill="#56C271" filter="url(#glow)">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M200,160 Q160,120 130,90" />
          </circle>
          <circle className="cloud-visual__particle cloud-visual__particle--6" r="2" fill="#E63946" filter="url(#glow)">
            <animateMotion dur="3s" repeatCount="indefinite" path="M300,160 Q340,120 370,90" />
          </circle>
        </g>

        {/* Central cloud structure */}
        <g className="cloud-visual__cloud">
          <path d="M190,210 Q190,175 215,165 Q230,145 255,150 Q275,140 295,155 Q320,160 320,185 Q330,195 320,210 Z" fill="#0c1218" stroke="url(#cloudGrad)" strokeWidth="1.2" />
          {/* Inner server cube */}
          <rect x="230" y="175" width="40" height="30" rx="3" fill="#0a0f14" stroke="url(#cloudGrad)" strokeWidth="0.6" opacity="0.8" />
          <line x1="238" y1="183" x2="262" y2="183" stroke="#FFD166" strokeWidth="0.8" opacity="0.6" />
          <line x1="238" y1="189" x2="255" y2="189" stroke="#56C271" strokeWidth="0.8" opacity="0.6" />
          <line x1="238" y1="195" x2="258" y2="195" stroke="#E63946" strokeWidth="0.8" opacity="0.4" />
        </g>

        {/* Bottom nodes — Database */}
        <g className="cloud-visual__node cloud-visual__node--db">
          <ellipse cx="100" cy="330" rx="18" ry="8" fill="#0c1218" stroke="#E63946" strokeWidth="0.8" />
          <rect x="82" y="322" width="36" height="16" fill="#0c1218" stroke="#E63946" strokeWidth="0.8" />
          <ellipse cx="100" cy="322" rx="18" ry="8" fill="#0c1218" stroke="#E63946" strokeWidth="0.8" />
        </g>

        {/* Bottom nodes — Server */}
        <g className="cloud-visual__node cloud-visual__node--server">
          <rect x="165" y="340" width="30" height="22" rx="2" fill="#0c1218" stroke="#FFD166" strokeWidth="0.8" />
          <line x1="170" y1="347" x2="190" y2="347" stroke="#FFD166" strokeWidth="0.5" opacity="0.6" />
          <line x1="170" y1="353" x2="185" y2="353" stroke="#FFD166" strokeWidth="0.5" opacity="0.4" />
        </g>

        {/* Bottom nodes — Analytics */}
        <g className="cloud-visual__node cloud-visual__node--analytics">
          <rect x="305" y="340" width="30" height="22" rx="2" fill="#0c1218" stroke="#56C271" strokeWidth="0.8" />
          <polyline points="310,356 316,350 322,354 328,346 330,348" fill="none" stroke="#56C271" strokeWidth="0.8" className="cloud-visual__chart" />
        </g>

        {/* Bottom nodes — AI chip */}
        <g className="cloud-visual__node cloud-visual__node--ai">
          <rect x="385" y="310" width="26" height="26" rx="4" fill="#0c1218" stroke="url(#cloudGrad)" strokeWidth="0.8" />
          <circle cx="398" cy="323" r="6" fill="none" stroke="#FFD166" strokeWidth="0.5" />
          <circle cx="398" cy="323" r="2" fill="#FFD166" opacity="0.8" />
        </g>

        {/* Top nodes */}
        <g className="cloud-visual__node cloud-visual__node--top1">
          <rect x="115" y="75" width="28" height="20" rx="3" fill="#0c1218" stroke="#56C271" strokeWidth="0.7" />
          <circle cx="129" cy="85" r="4" fill="none" stroke="#56C271" strokeWidth="0.5" />
        </g>
        <g className="cloud-visual__node cloud-visual__node--top2">
          <rect x="355" y="75" width="28" height="20" rx="3" fill="#0c1218" stroke="#E63946" strokeWidth="0.7" />
          <line x1="361" y1="82" x2="377" y2="82" stroke="#E63946" strokeWidth="0.5" opacity="0.7" />
          <line x1="361" y1="88" x2="372" y2="88" stroke="#E63946" strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* Orbit rings around cloud */}
        <ellipse className="cloud-visual__orbit" cx="250" cy="190" rx="110" ry="55" fill="none" stroke="url(#cloudGrad)" strokeWidth="0.4" strokeDasharray="4 6" opacity="0.4" />
      </svg>
    </div>
  )
}

export default CloudVisual
