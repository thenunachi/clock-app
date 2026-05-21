import { useMemo } from 'react'

const S = 280, CX = 140, CY = 140, R = 116
const SUB_CX = CX, SUB_CY = CY + 52, SUB_R = 26

function toRad(deg) { return ((deg - 90) * Math.PI) / 180 }
function polar(deg, r, cx = CX, cy = CY) {
  const rad = toRad(deg)
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

export default function ChronoFace({ time, theme, showSeconds }) {
  const h = time.getHours() % 12, m = time.getMinutes(), s = time.getSeconds()
  const hourDeg = h * 30 + m * 0.5
  const minDeg  = m * 6
  const secDeg  = s * 6

  const outerTicks = useMemo(() => Array.from({ length: 60 }, (_, i) => {
    const isCard = i % 15 === 0
    const isMaj  = i % 5  === 0
    const [x1, y1] = polar(i * 6, R)
    const [x2, y2] = polar(i * 6, R - (isCard ? 16 : isMaj ? 9 : 5))
    return { i, isCard, isMaj, x1, y1, x2, y2 }
  }), [])

  const subTicks = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const [x1, y1] = polar(i * 30, SUB_R, SUB_CX, SUB_CY)
    const [x2, y2] = polar(i * 30, SUB_R - 5, SUB_CX, SUB_CY)
    return { i, x1, y1, x2, y2 }
  }), [])

  const [htx, hty] = polar(hourDeg, 66)
  const [hbx, hby] = polar(hourDeg + 180, 16)
  const [mtx, mty] = polar(minDeg, 96)
  const [mbx, mby] = polar(minDeg + 180, 20)

  const [subStx, subSty] = polar(secDeg, SUB_R - 5, SUB_CX, SUB_CY)
  const [subSbx, subSby] = polar(secDeg + 180, 8, SUB_CX, SUB_CY)

  const dateNum  = time.getDate()
  const [dcx, dcy] = polar(90, 58)

  return (
    <svg width={S} height={S} style={{ position: 'relative', zIndex: 1 }}>
      {/* Tachymeter bezel ring */}
      <circle cx={CX} cy={CY} r={R + 6} fill="none" stroke={theme.accent + '18'} strokeWidth="10" />
      <circle cx={CX} cy={CY} r={R + 2} fill="none" stroke={theme.accent + '30'} strokeWidth="1" />

      {/* Outer tick marks */}
      {outerTicks.map(({ i, isCard, isMaj, x1, y1, x2, y2 }) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={isCard ? theme.text : isMaj ? theme.marker + 'cc' : theme.marker + '55'}
          strokeWidth={isCard ? 2.2 : isMaj ? 1.4 : 0.7}
          strokeLinecap="round"
        />
      ))}

      {/* Cardinal numerals — skip 6 (sub-dial) */}
      {[{ n: '12', d: 0 }, { n: '3', d: 90 }, { n: '9', d: 270 }].map(({ n, d }) => {
        const [x, y] = polar(d, R - 28)
        return (
          <text key={n} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fill={theme.text} fontSize="13" fontWeight="600" fontFamily="system-ui">
            {n}
          </text>
        )
      })}

      {/* Date window at 3 o'clock */}
      <rect x={dcx - 14} y={dcy - 9} width={28} height={18} rx="3"
        fill={theme.screen} stroke={theme.accent + '88'} strokeWidth="1" />
      <text x={dcx} y={dcy} textAnchor="middle" dominantBaseline="central"
        fill={theme.accent} fontSize="9" fontWeight="700" fontFamily="monospace">
        {dateNum}
      </text>

      {/* Sub-dial background */}
      <circle cx={SUB_CX} cy={SUB_CY} r={SUB_R + 3}
        fill={theme.screen} stroke={theme.accent + '35'} strokeWidth="1.5" />
      <circle cx={SUB_CX} cy={SUB_CY} r={SUB_R}
        fill="none" stroke={theme.marker + '55'} strokeWidth="0.5" />

      {/* Sub-dial ticks */}
      {subTicks.map(({ i, x1, y1, x2, y2 }) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={theme.marker + 'bb'}
          strokeWidth={i % 3 === 0 ? 1.4 : 0.7}
          strokeLinecap="round"
        />
      ))}

      {/* Sub-dial second hand */}
      {showSeconds && (
        <>
          <line x1={subSbx} y1={subSby} x2={subStx} y2={subSty}
            stroke={theme.accent} strokeWidth="1.2" strokeLinecap="round" />
          <circle cx={SUB_CX} cy={SUB_CY} r="2.5" fill={theme.accent} />
        </>
      )}

      {/* Hour hand — thick with lume strip */}
      <line x1={hbx} y1={hby} x2={htx} y2={hty}
        stroke={theme.hand} strokeWidth="7.5" strokeLinecap="round" />
      <line x1={hbx} y1={hby} x2={htx} y2={hty}
        stroke={theme.accent} strokeWidth="2" strokeLinecap="round" opacity="0.3" />

      {/* Minute hand */}
      <line x1={mbx} y1={mby} x2={mtx} y2={mty}
        stroke={theme.hand} strokeWidth="5" strokeLinecap="round" />
      <line x1={mbx} y1={mby} x2={mtx} y2={mty}
        stroke={theme.accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />

      {/* Center cap */}
      <circle cx={CX} cy={CY} r="8"   fill={theme.hand} />
      <circle cx={CX} cy={CY} r="5"   fill={theme.accent} />
      <circle cx={CX} cy={CY} r="2.5" fill={theme.screen} opacity="0.5" />
    </svg>
  )
}
