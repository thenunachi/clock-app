import { useMemo } from 'react'

const S = 280, CX = 140, CY = 140, R = 120

function toRad(deg) { return ((deg - 90) * Math.PI) / 180 }
function polar(deg, r) {
  const rad = toRad(deg)
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)]
}

function TaperedHand({ deg, tipLen, tailLen, baseW, tipW = 1, fill }) {
  const rad = toRad(deg)
  const cos = Math.cos(rad), sin = Math.sin(rad)
  const px = -sin, py = cos
  const [tx, ty] = [CX + tipLen * cos, CY + tipLen * sin]
  const [bx, by] = [CX - tailLen * cos, CY - tailLen * sin]
  return (
    <polygon
      points={`${tx + px * tipW},${ty + py * tipW} ${bx + px * baseW},${by + py * baseW} ${bx - px * baseW},${by - py * baseW} ${tx - px * tipW},${ty - py * tipW}`}
      fill={fill}
    />
  )
}

export default function MinimalFace({ time, theme, showSeconds }) {
  const h = time.getHours() % 12, m = time.getMinutes(), s = time.getSeconds()
  const hourDeg = h * 30 + m * 0.5
  const minDeg = m * 6
  const secDeg = s * 6

  const cardinals = useMemo(() => [0, 90, 180, 270].map(d => polar(d, R - 5)), [])
  const [stx, sty] = polar(secDeg, 110)
  const [sbx, sby] = polar(secDeg + 180, 24)

  return (
    <svg width={S} height={S} style={{ position: 'relative', zIndex: 1 }}>
      {/* Outer accent ring */}
      <circle cx={CX} cy={CY} r={R + 2} fill="none" stroke={theme.accent + '15'} strokeWidth="2" />

      {/* 4 cardinal dots */}
      {cardinals.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={theme.accent} opacity="0.8" />
      ))}

      {/* Hour hand */}
      <TaperedHand deg={hourDeg} tipLen={68} tailLen={15} baseW={5} tipW={1.5} fill={theme.hand} />
      {/* Minute hand */}
      <TaperedHand deg={minDeg} tipLen={98} tailLen={17} baseW={3.5} tipW={1} fill={theme.hand} />

      {/* Second hand */}
      {showSeconds && (
        <>
          <line x1={sbx} y1={sby} x2={stx} y2={sty}
            stroke={theme.accent} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx={sbx} cy={sby} r="2.5" fill={theme.accent} />
        </>
      )}

      {/* Center */}
      <circle cx={CX} cy={CY} r="4.5" fill={theme.accent} />
    </svg>
  )
}
