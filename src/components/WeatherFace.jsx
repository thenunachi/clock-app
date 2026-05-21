const S = 280, CX = 140, CY = 140

function getWeatherData(time) {
  const month = time.getMonth()
  const hour  = time.getHours()
  const day   = time.getDay()

  const baseF  = 65 + 25 * Math.sin((month - 3) * Math.PI / 6)
  const dayVar = -4 * Math.cos(hour * Math.PI / 12)
  const tempF  = Math.round(baseF + dayVar)
  const tempC  = Math.round((tempF - 32) * 5 / 9)

  const CONDITIONS = [
    { name: 'Sunny',         icon: 'sun',    humid: 35, uv: 9,  wind: 8  },
    { name: 'Partly Cloudy', icon: 'pcloud', humid: 52, uv: 5,  wind: 13 },
    { name: 'Cloudy',        icon: 'cloud',  humid: 68, uv: 2,  wind: 16 },
    { name: 'Rainy',         icon: 'rain',   humid: 88, uv: 1,  wind: 22 },
    { name: 'Thunderstorm',  icon: 'storm',  humid: 94, uv: 0,  wind: 38 },
    { name: 'Windy',         icon: 'wind',   humid: 42, uv: 4,  wind: 44 },
    { name: 'Foggy',         icon: 'fog',    humid: 92, uv: 1,  wind: 6  },
  ]
  const cond = CONDITIONS[(day * 3 + Math.floor(hour / 8)) % 7]
  const feelsLike = Math.round(tempF - (cond.wind > 20 ? (cond.wind - 20) * 0.3 : 0))
  const hi = Math.round(baseF + 6)
  const lo = Math.round(baseF - 8)
  return { tempF, tempC, feelsLike, hi, lo, ...cond }
}

function WeatherIcon({ type, cx, cy, sz, accent, hand }) {
  const h = sz / 2
  switch (type) {
    case 'sun': return (
      <g>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * 45 - 90) * Math.PI / 180
          return <line key={i}
            x1={cx + (h - 5) * Math.cos(a)} y1={cy + (h - 5) * Math.sin(a)}
            x2={cx + (h + 5) * Math.cos(a)} y2={cy + (h + 5) * Math.sin(a)}
            stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
        })}
        <circle cx={cx} cy={cy} r={h - 8} fill={accent} opacity="0.9" />
      </g>
    )
    case 'pcloud': return (
      <g>
        <circle cx={cx + 8} cy={cy - 8} r={h * 0.42} fill={accent} opacity="0.85" />
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i * 36 - 90) * Math.PI / 180
          return <line key={i}
            x1={cx + 8 + (h * 0.38) * Math.cos(a)} y1={cy - 8 + (h * 0.38) * Math.sin(a)}
            x2={cx + 8 + (h * 0.52) * Math.cos(a)} y2={cy - 8 + (h * 0.52) * Math.sin(a)}
            stroke={accent} strokeWidth="2" strokeLinecap="round" />
        })}
        <path d={`M ${cx - h + 4} ${cy + 8} Q ${cx - h} ${cy - 2} ${cx - h + 10} ${cy - 2} Q ${cx - 6} ${cy - 16} ${cx + 8} ${cy - 6} Q ${cx + h} ${cy - 6} ${cx + h} ${cy + 8} Z`}
          fill={hand} opacity="0.85" />
      </g>
    )
    case 'cloud': return (
      <path d={`M ${cx - h + 2} ${cy + 8} Q ${cx - h} ${cy - 4} ${cx - h + 12} ${cy - 4} Q ${cx - 4} ${cy - 20} ${cx + 8} ${cy - 8} Q ${cx + h} ${cy - 8} ${cx + h} ${cy + 8} Z`}
        fill={hand} opacity="0.85" />
    )
    case 'rain': return (
      <g>
        <path d={`M ${cx - h + 2} ${cy} Q ${cx - h} ${cy - 12} ${cx - h + 12} ${cy - 12} Q ${cx - 4} ${cy - 26} ${cx + 8} ${cy - 14} Q ${cx + h} ${cy - 14} ${cx + h} ${cy} Z`}
          fill={hand} opacity="0.75" />
        {[-10, 0, 10].map((dx, i) => (
          <line key={i} x1={cx + dx} y1={cy + 10} x2={cx + dx - 4} y2={cy + 22}
            stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        ))}
      </g>
    )
    case 'storm': return (
      <g>
        <path d={`M ${cx - h + 2} ${cy - 4} Q ${cx - h} ${cy - 16} ${cx - h + 12} ${cy - 16} Q ${cx - 4} ${cy - 30} ${cx + 8} ${cy - 18} Q ${cx + h} ${cy - 18} ${cx + h} ${cy - 4} Z`}
          fill={hand} opacity="0.75" />
        <path d={`M ${cx + 4} ${cy - 2} L ${cx - 6} ${cy + 12} L ${cx + 2} ${cy + 12} L ${cx - 6} ${cy + 26} L ${cx + 10} ${cy + 8} L ${cx + 2} ${cy + 8} Z`}
          fill={accent} opacity="0.95" />
      </g>
    )
    case 'wind': return (
      <g>
        {[0, 10, 20].map((dy, i) => (
          <path key={i}
            d={`M ${cx - h + 2} ${cy - 10 + dy} Q ${cx} ${cy - 18 + dy} ${cx + h - 2} ${cy - 10 + dy}`}
            fill="none" stroke={i === 0 ? accent : hand}
            strokeWidth="2.5" strokeLinecap="round" opacity={i === 0 ? 0.95 : 0.6} />
        ))}
      </g>
    )
    case 'fog': return (
      <g>
        {[0, 9, 18, 27].map((dy, i) => (
          <line key={i}
            x1={cx - h + (i % 2) * 6} y1={cy - 14 + dy}
            x2={cx + h - (i % 2) * 6} y2={cy - 14 + dy}
            stroke={hand} strokeWidth="3" strokeLinecap="round" opacity={0.8 - i * 0.12} />
        ))}
      </g>
    )
    default: return null
  }
}

export default function WeatherFace({ time, theme }) {
  const w = getWeatherData(time)

  return (
    <svg width={S} height={S} style={{ position: 'relative', zIndex: 1 }}>
      {/* Icon */}
      <WeatherIcon type={w.icon} cx={CX} cy={62} sz={52} accent={theme.accent} hand={theme.hand} />

      {/* Temperature */}
      <text x={CX} y={128} textAnchor="middle" dominantBaseline="central"
        fill={theme.text} fontSize="52" fontWeight="200"
        fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-2">
        {w.tempF}
      </text>
      <text x={CX + 44} y={112} textAnchor="start" dominantBaseline="central"
        fill={theme.accent} fontSize="16" fontWeight="600" fontFamily="system-ui">
        °F
      </text>

      {/* Condition */}
      <text x={CX} y={158} textAnchor="middle" dominantBaseline="central"
        fill={theme.marker} fontSize="11" fontWeight="600"
        letterSpacing="1.5" fontFamily="system-ui">
        {w.name.toUpperCase()}
      </text>

      {/* Hi / Lo */}
      <text x={CX} y={178} textAnchor="middle" dominantBaseline="central"
        fill={theme.marker} fontSize="10" fontFamily="system-ui">
        H:{w.hi}° · L:{w.lo}°  · Feels {w.feelsLike}°
      </text>

      {/* Divider */}
      <line x1={CX - 70} y1={194} x2={CX + 70} y2={194}
        stroke={theme.accent} strokeWidth="0.75" opacity="0.25" />

      {/* Stats row */}
      {[
        { label: 'HUMID', val: `${w.humid}%` },
        { label: 'UV',    val: `${w.uv}`     },
        { label: 'WIND',  val: `${w.wind}mph` },
      ].map(({ label, val }, i) => {
        const x = CX - 60 + i * 60
        return (
          <g key={label}>
            <text x={x} y={208} textAnchor="middle" dominantBaseline="central"
              fill={theme.accent} fontSize="8" fontWeight="700"
              letterSpacing="0.8" fontFamily="system-ui" opacity="0.7">
              {label}
            </text>
            <text x={x} y={224} textAnchor="middle" dominantBaseline="central"
              fill={theme.text} fontSize="12" fontWeight="500" fontFamily="system-ui">
              {val}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
