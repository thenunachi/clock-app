import { useMemo } from 'react'

const S = 280, CX = 140, CY = 140, R = 120

function toRad(deg) { return ((deg - 90) * Math.PI) / 180 }
function polar(deg, r) {
  const rad = toRad(deg)
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
}

function arcPath(cx, cy, r, frac) {
  if (frac <= 0) return null
  const s = -Math.PI / 2, e = s + frac * 2 * Math.PI
  const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s)
  const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e)
  if (frac >= 0.9999) return `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x1 - 0.001} ${y1}`
  return `M ${x1} ${y1} A ${r} ${r} 0 ${frac > 0.5 ? 1 : 0} 1 ${x2} ${y2}`
}

function Comp({ cx, cy, r = 22, w = 3.5, frac, color, label, value }) {
  const path = arcPath(cx, cy, r, frac)
  return (
    <g>
      {/* Track ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color + '20'} strokeWidth={w} />
      {/* Progress arc */}
      {path && <path d={path} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" />}
      {/* Inner accent ring */}
      <circle cx={cx} cy={cy} r={r - 7} fill="none" stroke={color + '18'} strokeWidth="1" />
      {/* Value */}
      <text x={cx} y={cy - 2} textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize="8" fontWeight="700" fontFamily="system-ui">
        {value}
      </text>
      {/* Label */}
      <text x={cx} y={cy + 7} textAnchor="middle" dominantBaseline="central"
        fill={color + 'aa'} fontSize="6" fontFamily="system-ui" letterSpacing="0.4">
        {label}
      </text>
    </g>
  )
}

function TaperedHand({ deg, tipLen, tailLen, baseW, tipW = 1.5, fill }) {
  const rad = toRad(deg)
  const cos = Math.cos(rad), sin = Math.sin(rad)
  const px = -sin, py = cos
  const [tx, ty] = [CX + tipLen * cos, CY + tipLen * sin]
  const [bx, by] = [CX - tailLen * cos, CY - tailLen * sin]
  return (
    <polygon
      points={`${tx+px*tipW},${ty+py*tipW} ${bx+px*baseW},${by+py*baseW} ${bx-px*baseW},${by-py*baseW} ${tx-px*tipW},${ty-py*tipW}`}
      fill={fill}
    />
  )
}

export default function InfographFace({ time, theme, showSeconds }) {
  const h = time.getHours() % 12, m = time.getMinutes(), s = time.getSeconds()
  const hourDeg = h * 30 + m * 0.5
  const minDeg  = m * 6
  const secDeg  = s * 6

  const ticks = useMemo(() => Array.from({ length: 60 }, (_, i) => {
    const isMaj = i % 5 === 0
    const [x1, y1] = polar(i * 6, R)
    const [x2, y2] = polar(i * 6, R - (isMaj ? 7 : 3))
    return { i, isMaj, x1, y1, x2, y2 }
  }), [])

  const [stx, sty] = polar(secDeg, 90)
  const [sbx, sby] = polar(secDeg + 180, 18)

  // Complications at 12, 3, 6, 9 — placed near the edge
  const comps = [
    { cx: CX,   cy: 44,  frac: 0.84, color: theme.accent,          label: 'BATT',  value: '84%' },
    { cx: 236,  cy: CY,  frac: 0.65, color: theme.hand,            label: 'STEPS', value: '8.2k' },
    { cx: CX,   cy: 236, frac: 1,    color: theme.accent,          label: 'DATE',  value: time.getDate().toString() },
    { cx: 44,   cy: CY,  frac: 0.72, color: theme.marker,          label: 'BPM',   value: '72' },
  ]

  return (
    <svg width={S} height={S} style={{ position: 'relative', zIndex: 1 }}>
      {/* Subtle ticks */}
      {ticks.map(({ i, isMaj, x1, y1, x2, y2 }) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={isMaj ? theme.marker + '66' : theme.marker + '28'}
          strokeWidth={isMaj ? 1.5 : 0.8}
          strokeLinecap="round"
        />
      ))}

      {/* Complications */}
      {comps.map((c, i) => <Comp key={i} {...c} />)}

      {/* Central analog hands (shorter, to fit between complications) */}
      <TaperedHand deg={hourDeg} tipLen={50} tailLen={12} baseW={6} tipW={2}   fill={theme.hand} />
      <TaperedHand deg={minDeg}  tipLen={70} tailLen={14} baseW={4} tipW={1.5} fill={theme.hand} />

      {/* Second hand */}
      {showSeconds && (
        <>
          <line x1={sbx} y1={sby} x2={stx} y2={sty}
            stroke={theme.accent} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx={sbx} cy={sby} r="2.5" fill={theme.accent} />
        </>
      )}

      {/* Center cap */}
      <circle cx={CX} cy={CY} r="5.5" fill={theme.hand} />
      <circle cx={CX} cy={CY} r="2.5" fill={theme.screen || '#000'} opacity="0.6" />
    </svg>
  )
}
