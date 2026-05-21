import { useMemo } from 'react'

const S = 280, CX = 140, CY = 140, R = 120
const ROMAN = ['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI']

function toRad(deg) { return ((deg - 90) * Math.PI) / 180 }
function polar(deg, r) {
  const rad = toRad(deg)
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
}

export default function RetroFace({ time, theme, showSeconds }) {
  const h = time.getHours() % 12, m = time.getMinutes(), s = time.getSeconds()
  const hourDeg = h * 30 + m * 0.5
  const minDeg  = m * 6
  const secDeg  = s * 6

  const ticks = useMemo(() => Array.from({ length: 60 }, (_, i) => {
    const isHour = i % 5 === 0
    const [x1, y1] = polar(i * 6, R)
    const [x2, y2] = polar(i * 6, R - (isHour ? 12 : 5))
    return { i, isHour, x1, y1, x2, y2 }
  }), [])

  const [htx, hty] = polar(hourDeg, 64)
  const [hbx, hby] = polar(hourDeg + 180, 16)
  const [mtx, mty] = polar(minDeg,  94)
  const [mbx, mby] = polar(minDeg + 180, 18)
  const [stx, sty] = polar(secDeg, 104)
  const [sbx, sby] = polar(secDeg + 180, 24)
  const [dcx, dcy] = polar(90, 62)  // date at 3 o'clock area

  return (
    <svg width={S} height={S} style={{ position: 'relative', zIndex: 1 }}>
      {/* Decorative double rings */}
      <circle cx={CX} cy={CY} r={R + 7} fill="none" stroke={theme.accent + '28'} strokeWidth="1.5" />
      <circle cx={CX} cy={CY} r={R + 3} fill="none" stroke={theme.accent + '15'} strokeWidth="0.8" />

      {/* Ornamental diamonds at cardinal positions */}
      {[0,90,180,270].map((d, i) => {
        const [x, y] = polar(d, R + 7)
        return (
          <polygon key={i}
            points={`${x},${y-4} ${x+3},${y} ${x},${y+4} ${x-3},${y}`}
            fill={theme.accent + '60'}
          />
        )
      })}

      {/* Tick marks */}
      {ticks.map(({ i, isHour, x1, y1, x2, y2 }) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={isHour ? theme.marker + 'ee' : theme.marker + '55'}
          strokeWidth={isHour ? 2 : 0.8}
          strokeLinecap="square"
        />
      ))}

      {/* Roman numerals */}
      {ROMAN.map((n, i) => {
        const [x, y] = polar(i * 30, R - 22)
        const isCard = i % 3 === 0
        return (
          <text key={n} x={x} y={y} textAnchor="middle" dominantBaseline="central"
            fill={isCard ? theme.text : theme.marker + 'cc'}
            fontSize={isCard ? 11 : 9}
            fontWeight={isCard ? 700 : 400}
            fontFamily="Georgia, 'Times New Roman', serif"
          >
            {n}
          </text>
        )
      })}

      {/* Date window */}
      <rect x={dcx - 15} y={dcy - 9} width={30} height={18} rx={3}
        fill={theme.screen || '#111'} stroke={theme.accent + '70'} strokeWidth="1" />
      <text x={dcx} y={dcy} textAnchor="middle" dominantBaseline="central"
        fill={theme.accent} fontSize="10" fontWeight="700" fontFamily="Georgia, serif">
        {time.getDate()}
      </text>

      {/* Hour hand — blunt classic */}
      <line x1={hbx} y1={hby} x2={htx} y2={hty}
        stroke={theme.hand} strokeWidth="7.5" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1={mbx} y1={mby} x2={mtx} y2={mty}
        stroke={theme.hand} strokeWidth="4.5" strokeLinecap="round" />

      {/* Second hand */}
      {showSeconds && (
        <>
          <line x1={sbx} y1={sby} x2={stx} y2={sty}
            stroke={theme.accent} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx={sbx} cy={sby} r="3.5" fill={theme.accent} />
        </>
      )}

      {/* Ornate center cap */}
      <circle cx={CX} cy={CY} r="11" fill={theme.hand} />
      <circle cx={CX} cy={CY} r="8"  fill={theme.screen || '#000'} />
      <circle cx={CX} cy={CY} r="4"  fill={theme.hand} />
      <circle cx={CX} cy={CY} r="2"  fill={theme.accent} />
    </svg>
  )
}
