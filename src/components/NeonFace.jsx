import { useMemo } from 'react'

const S = 280, CX = 140, CY = 140, R = 120

function toRad(deg) { return ((deg - 90) * Math.PI) / 180 }
function polar(deg, r) {
  const rad = toRad(deg)
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
}

export default function NeonFace({ time, theme, showSeconds }) {
  const h = time.getHours() % 12, m = time.getMinutes(), s = time.getSeconds()
  const hourDeg = h * 30 + m * 0.5
  const minDeg  = m * 6
  const secDeg  = s * 6

  const ticks = useMemo(() => Array.from({ length: 60 }, (_, i) => {
    const isCard = i % 15 === 0
    const isMaj  = i % 5  === 0
    const [x1, y1] = polar(i * 6, R)
    const [x2, y2] = polar(i * 6, R - (isCard ? 14 : isMaj ? 8 : 4))
    return { i, isCard, isMaj, x1, y1, x2, y2 }
  }), [])

  const [htx, hty] = polar(hourDeg, 70)
  const [mtx, mty] = polar(minDeg, 98)
  const [stx, sty] = polar(secDeg, 108)
  const [sbx, sby] = polar(secDeg + 180, 26)

  return (
    <svg width={S} height={S} style={{ position: 'relative', zIndex: 1 }}>
      <defs>
        <filter id="glow-strong" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" result="b1" />
          <feGaussianBlur stdDeviation="2" result="b2" />
          <feMerge><feMergeNode in="b1" /><feMergeNode in="b2" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer neon ring */}
      <circle cx={CX} cy={CY} r={R + 3} fill="none" stroke={theme.accent + '55'} strokeWidth="2" filter="url(#glow-soft)" />
      {/* Inner subtle ring */}
      <circle cx={CX} cy={CY} r={R - 16} fill="none" stroke={theme.accent + '20'} strokeWidth="1" />

      {/* Tick marks */}
      {ticks.map(({ i, isCard, isMaj, x1, y1, x2, y2 }) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={isCard ? theme.accent : isMaj ? theme.accent + '88' : theme.accent + '30'}
          strokeWidth={isCard ? 2.5 : isMaj ? 1.5 : 0.8}
          strokeLinecap="round"
          filter={isMaj ? 'url(#glow-soft)' : undefined}
        />
      ))}

      {/* Cardinal numbers */}
      {[{n:'12',d:0},{n:'3',d:90},{n:'6',d:180},{n:'9',d:270}].map(({ n, d }) => {
        const [x, y] = polar(d, R - 27)
        return (
          <text key={n} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fill={theme.accent} fontSize="13" fontWeight="700" fontFamily="system-ui"
            filter="url(#glow-soft)">
            {n}
          </text>
        )
      })}

      {/* Hour hand */}
      <line x1={CX} y1={CY} x2={htx} y2={hty}
        stroke={theme.hand} strokeWidth="5" strokeLinecap="round" filter="url(#glow-strong)" />

      {/* Minute hand */}
      <line x1={CX} y1={CY} x2={mtx} y2={mty}
        stroke={theme.hand} strokeWidth="3" strokeLinecap="round" filter="url(#glow-strong)" />

      {/* Second hand */}
      {showSeconds && (
        <>
          <line x1={sbx} y1={sby} x2={stx} y2={sty}
            stroke={theme.accent} strokeWidth="1.5" strokeLinecap="round" filter="url(#glow-strong)" />
          <circle cx={sbx} cy={sby} r="3.5" fill={theme.accent} filter="url(#glow-strong)" />
        </>
      )}

      {/* Center glow */}
      <circle cx={CX} cy={CY} r="8" fill={theme.accent} filter="url(#glow-strong)" />
      <circle cx={CX} cy={CY} r="4" fill="#000" />
    </svg>
  )
}
