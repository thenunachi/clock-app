const S = 280, CX = 140, CY = 140

function secArc(s) {
  if (s <= 0) return ''
  const frac = s / 60
  const r = 130
  const start = -Math.PI / 2
  const end   = start + frac * 2 * Math.PI
  const x1 = CX + r * Math.cos(start), y1 = CY + r * Math.sin(start)
  const x2 = CX + r * Math.cos(end),   y2 = CY + r * Math.sin(end)
  if (frac >= 0.9999) return `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x1 - 0.001} ${y1}`
  return `M ${x1} ${y1} A ${r} ${r} 0 ${frac > 0.5 ? 1 : 0} 1 ${x2} ${y2}`
}

export default function TypographFace({ time, theme, showSeconds }) {
  const h    = time.getHours() % 12 || 12
  const m    = time.getMinutes()
  const s    = time.getSeconds()
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM'
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const mStr = m.toString().padStart(2, '0')

  return (
    <svg width={S} height={S} style={{ position: 'relative', zIndex: 1 }}>
      {/* Seconds progress arc */}
      {showSeconds && (
        <>
          <circle cx={CX} cy={CY} r="130" fill="none"
            stroke={theme.accent} strokeWidth="2" opacity="0.1" />
          <path d={secArc(s)} fill="none"
            stroke={theme.accent} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        </>
      )}

      {/* Top accent line */}
      <line x1={CX - 48} y1={52} x2={CX + 48} y2={52}
        stroke={theme.accent} strokeWidth="1.5" opacity="0.45" />

      {/* Hour — large bold */}
      <text
        x={CX} y={118}
        textAnchor="middle" dominantBaseline="central"
        fill={theme.text}
        fontSize="78" fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="-4"
      >
        {h}
      </text>

      {/* Thin divider */}
      <line x1={CX - 28} y1={157} x2={CX + 28} y2={157}
        stroke={theme.accent} strokeWidth="1" opacity="0.3" />

      {/* Minutes */}
      <text
        x={CX} y={179}
        textAnchor="middle" dominantBaseline="central"
        fill={theme.accent}
        fontSize="28" fontWeight="200"
        fontFamily="system-ui, sans-serif"
        letterSpacing="6"
      >
        {mStr}
      </text>

      {/* AM/PM · date */}
      <text
        x={CX} y={207}
        textAnchor="middle" dominantBaseline="central"
        fill={theme.marker}
        fontSize="9" fontWeight="600"
        letterSpacing="2" fontFamily="system-ui">
        {ampm} · {dateStr}
      </text>

      {/* Bottom accent line */}
      <line x1={CX - 48} y1={226} x2={CX + 48} y2={226}
        stroke={theme.accent} strokeWidth="1.5" opacity="0.45" />
    </svg>
  )
}
