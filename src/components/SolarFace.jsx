import { useMemo } from 'react'

const S = 280, CX = 140, CY = 140, R = 118

function toRad(deg) { return ((deg - 90) * Math.PI) / 180 }
function polar(deg, r) {
  const rad = toRad(deg)
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
}

export default function SolarFace({ time, theme, showSeconds }) {
  const h = time.getHours() % 12, m = time.getMinutes(), s = time.getSeconds()
  const hourDeg = h * 30 + m * 0.5
  const minDeg  = m * 6
  const secDeg  = s * 6

  const rays = useMemo(() => Array.from({ length: 96 }, (_, i) => {
    const isCard = i % 24 === 0
    const isMaj  = i % 8  === 0
    const len    = isCard ? 22 : isMaj ? 12 : 5
    const [x1, y1] = polar(i * 3.75, R)
    const [x2, y2] = polar(i * 3.75, R - len)
    return { i, isCard, isMaj, x1, y1, x2, y2 }
  }), [])

  const [htx, hty] = polar(hourDeg, 70)
  const [hbx, hby] = polar(hourDeg + 180, 14)
  const [mtx, mty] = polar(minDeg, 100)
  const [mbx, mby] = polar(minDeg + 180, 16)
  const [stx, sty] = polar(secDeg, 110)
  const [sbx, sby] = polar(secDeg + 180, 28)

  return (
    <svg width={S} height={S} style={{ position: 'relative', zIndex: 1 }}>
      <defs>
        <radialGradient id="sol-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={theme.accent} stopOpacity="0.18" />
          <stop offset="60%"  stopColor={theme.accent} stopOpacity="0.05" />
          <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
        </radialGradient>
        <filter id="sol-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Radial center glow */}
      <circle cx={CX} cy={CY} r="95" fill="url(#sol-glow)" />

      {/* Sun rays */}
      {rays.map(({ i, isCard, isMaj, x1, y1, x2, y2 }) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={isCard ? theme.accent : isMaj ? theme.accent + '99' : theme.accent + '33'}
          strokeWidth={isCard ? 2.8 : isMaj ? 1.4 : 0.7}
          strokeLinecap="round"
          filter={isCard ? 'url(#sol-soft)' : undefined}
        />
      ))}

      {/* Cardinal diamond markers */}
      {[0, 90, 180, 270].map((d, i) => {
        const [x, y] = polar(d, R - 32)
        return <circle key={i} cx={x} cy={y} r="3.5" fill={theme.accent} filter="url(#sol-soft)" />
      })}

      {/* Hour hand — wide, stubby */}
      <line x1={hbx} y1={hby} x2={htx} y2={hty}
        stroke={theme.hand} strokeWidth="8" strokeLinecap="round" />
      <line x1={hbx} y1={hby} x2={htx} y2={hty}
        stroke={theme.accent} strokeWidth="2.5" strokeLinecap="round" opacity="0.25" />

      {/* Minute hand */}
      <line x1={mbx} y1={mby} x2={mtx} y2={mty}
        stroke={theme.hand} strokeWidth="4.5" strokeLinecap="round" />

      {/* Second hand — lollipop */}
      {showSeconds && (
        <>
          <line x1={sbx} y1={sby} x2={stx} y2={sty}
            stroke={theme.accent} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx={stx} cy={sty} r="4.5" fill={theme.accent} filter="url(#sol-soft)" />
          <circle cx={sbx} cy={sby} r="4"   fill={theme.accent} />
        </>
      )}

      {/* Center burst */}
      <circle cx={CX} cy={CY} r="10" fill={theme.accent} opacity="0.2" filter="url(#sol-soft)" />
      <circle cx={CX} cy={CY} r="6.5" fill={theme.hand} />
      <circle cx={CX} cy={CY} r="3"   fill={theme.screen} opacity="0.6" />
    </svg>
  )
}
