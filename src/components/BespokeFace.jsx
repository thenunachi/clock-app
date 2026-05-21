import { useMemo } from 'react'

const S = 280, CX = 140, CY = 140, R = 120

function toRad(deg) { return ((deg - 90) * Math.PI) / 180 }

function polar(deg, r) {
  const rad = toRad(deg)
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
}

function TaperedHand({ deg, tipLen, tailLen, baseW, tipW = 1.5, fill }) {
  const rad = toRad(deg)
  const cos = Math.cos(rad), sin = Math.sin(rad)
  const px = -sin, py = cos  // perpendicular
  const [tx, ty] = [CX + tipLen * cos, CY + tipLen * sin]
  const [bx, by] = [CX - tailLen * cos, CY - tailLen * sin]
  const hw = baseW / 2, thw = tipW / 2
  return (
    <polygon
      points={`${tx + px * thw},${ty + py * thw} ${bx + px * hw},${by + py * hw} ${bx - px * hw},${by - py * hw} ${tx - px * thw},${ty - py * thw}`}
      fill={fill}
    />
  )
}

export default function BespokeFace({ time, theme, showSeconds }) {
  const h = time.getHours() % 12
  const m = time.getMinutes()
  const s = time.getSeconds()
  const hourDeg = h * 30 + m * 0.5
  const minDeg = m * 6
  const secDeg = s * 6

  const ticks = useMemo(() => Array.from({ length: 60 }, (_, i) => {
    const isCard = i % 15 === 0
    const isMaj = i % 5 === 0
    const [x1, y1] = polar(i * 6, R)
    const [x2, y2] = polar(i * 6, R - (isCard ? 16 : isMaj ? 10 : 5))
    return { i, isCard, isMaj, x1, y1, x2, y2 }
  }), [])

  const [stx, sty] = polar(secDeg, 108)
  const [sbx, sby] = polar(secDeg + 180, 26)
  const [dcx, dcy] = polar(120, 66)
  const dateNum = time.getDate()

  return (
    <svg width={S} height={S} style={{ position: 'relative', zIndex: 1 }}>
      {/* Bezel hint ring */}
      <circle cx={CX} cy={CY} r={R + 2} fill="none" stroke={theme.accent + '18'} strokeWidth="1.5" />

      {/* Tick marks */}
      {ticks.map(({ i, isCard, isMaj, x1, y1, x2, y2 }) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={isCard ? theme.accent : isMaj ? theme.marker + 'cc' : theme.marker + '44'}
          strokeWidth={isCard ? 2.5 : isMaj ? 1.5 : 0.8}
          strokeLinecap="round"
        />
      ))}

      {/* 12 o'clock accent dot */}
      {(() => { const [x, y] = polar(0, R - 24); return <circle cx={x} cy={y} r="3" fill={theme.accent} /> })()}

      {/* Date complication (4 o'clock area) */}
      <circle cx={dcx} cy={dcy} r="16" fill={theme.screen} stroke={theme.accent + 'aa'} strokeWidth="1" />
      <text x={dcx} y={dcy} textAnchor="middle" dominantBaseline="central"
        fill={theme.accent} fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">
        {dateNum}
      </text>

      {/* Hour hand */}
      <TaperedHand deg={hourDeg} tipLen={70} tailLen={16} baseW={8} tipW={2} fill={theme.hand} />
      {/* Minute hand */}
      <TaperedHand deg={minDeg} tipLen={98} tailLen={18} baseW={6} tipW={1.5} fill={theme.hand} />

      {/* Second hand */}
      {showSeconds && (
        <>
          <line x1={sbx} y1={sby} x2={stx} y2={sty}
            stroke={theme.accent} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx={sbx} cy={sby} r="3.5" fill={theme.accent} />
        </>
      )}

      {/* Center cap */}
      <circle cx={CX} cy={CY} r="5.5" fill={theme.hand} />
      <circle cx={CX} cy={CY} r="2.5" fill={theme.screen} opacity="0.6" />
    </svg>
  )
}
