const S = 280, CX = 140, CY = 140

function arcPath(cx, cy, r, frac) {
  if (frac <= 0) return null
  if (frac >= 0.9999) return 'FULL'
  const s = -Math.PI / 2
  const e = s + frac * 2 * Math.PI
  const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s)
  const x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e)
  return `M ${x1} ${y1} A ${r} ${r} 0 ${frac > 0.5 ? 1 : 0} 1 ${x2} ${y2}`
}

function Ring({ r, w, trackColor, arcColor, frac }) {
  const path = arcPath(CX, CY, r, frac)
  const tipAngle = -Math.PI / 2 + frac * 2 * Math.PI
  const tipX = CX + r * Math.cos(tipAngle), tipY = CY + r * Math.sin(tipAngle)
  return (
    <g>
      <circle cx={CX} cy={CY} r={r} fill="none" stroke={trackColor} strokeWidth={w} />
      {path === 'FULL'
        ? <circle cx={CX} cy={CY} r={r} fill="none" stroke={arcColor} strokeWidth={w} />
        : path && <path d={path} fill="none" stroke={arcColor} strokeWidth={w} strokeLinecap="round" />
      }
      {frac > 0.01 && <circle cx={tipX} cy={tipY} r={w / 2 + 1.5} fill={arcColor} />}
    </g>
  )
}

export default function OrbitFace({ time, theme, showSeconds }) {
  const h = time.getHours() % 12
  const m = time.getMinutes()
  const s = time.getSeconds()
  const hrFrac  = (h + m / 60) / 12
  const minFrac = (m + s / 60) / 60
  const secFrac = s / 60

  const h12  = (h || 12).toString().padStart(2, '0')
  const mStr = m.toString().padStart(2, '0')
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM'
  const date = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <svg width={S} height={S} style={{ position: 'relative', zIndex: 1 }}>
      {/* Hours ring — innermost */}
      <Ring r={72} w={8} trackColor={theme.accent + '18'} arcColor={theme.accent + 'aa'} frac={hrFrac} />
      {/* Minutes ring */}
      <Ring r={94} w={6} trackColor={theme.hand + '18'} arcColor={theme.hand + 'dd'} frac={minFrac} />
      {/* Seconds ring — outermost */}
      {showSeconds && (
        <Ring r={114} w={5} trackColor={theme.accent + '15'} arcColor={theme.accent} frac={secFrac} />
      )}

      {/* Start-of-ring dots at 12 o'clock */}
      <circle cx={CX} cy={CY - 72}  r="4" fill={theme.accent + '33'} />
      <circle cx={CX} cy={CY - 94}  r="3" fill={theme.hand + '33'} />
      {showSeconds && <circle cx={CX} cy={CY - 114} r="2.5" fill={theme.accent + '33'} />}

      {/* Ring labels */}
      <text x={CX + 78} y={CY + 4} fill={theme.accent + '99'} fontSize="8" fontWeight="700" fontFamily="system-ui">H</text>
      <text x={CX + 100} y={CY + 4} fill={theme.hand + '99'} fontSize="8" fontWeight="700" fontFamily="system-ui">M</text>
      {showSeconds && <text x={CX + 120} y={CY + 4} fill={theme.accent + '88'} fontSize="8" fontWeight="700" fontFamily="system-ui">S</text>}

      {/* Center digital time */}
      <text x={CX} y={CY - 10} textAnchor="middle" dominantBaseline="central"
        fill={theme.text} fontSize="34" fontWeight="200" letterSpacing="-1" fontFamily="system-ui, sans-serif">
        {h12}:{mStr}
      </text>
      <text x={CX} y={CY + 14} textAnchor="middle" dominantBaseline="central"
        fill={theme.accent} fontSize="11" fontWeight="700" letterSpacing="2" fontFamily="system-ui">
        {ampm}
      </text>
      <text x={CX} y={CY + 30} textAnchor="middle" dominantBaseline="central"
        fill={theme.marker} fontSize="9" fontFamily="system-ui" letterSpacing="0.5">
        {date}
      </text>
    </svg>
  )
}
