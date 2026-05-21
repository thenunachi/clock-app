import { useMemo } from 'react'

const S = 280, CX = 140, CY = 140

// Approximate moon phase (0=new, 0.5=full)
function moonPhase(date) {
  const known = new Date(Date.UTC(2000, 0, 6, 18, 14, 0))
  const days  = (date - known) / 86400000
  const cycle = ((days % 29.53059) + 29.53059) % 29.53059
  return cycle / 29.53059
}

function moonPhaseName(p) {
  if (p < 0.0625) return 'New Moon'
  if (p < 0.1875) return 'Waxing Crescent'
  if (p < 0.3125) return 'First Quarter'
  if (p < 0.4375) return 'Waxing Gibbous'
  if (p < 0.5625) return 'Full Moon'
  if (p < 0.6875) return 'Waning Gibbous'
  if (p < 0.8125) return 'Last Quarter'
  if (p < 0.9375) return 'Waning Crescent'
  return 'New Moon'
}

// Approx sunrise/sunset for ~40°N (NYC latitude)
function sunTimes(date) {
  const start = new Date(date.getFullYear(), 0, 0)
  const doy   = Math.floor((date - start) / 86400000)
  const offset = 1.5 * Math.cos(((doy - 172) / 365) * 2 * Math.PI)
  const tzH    = -date.getTimezoneOffset() / 60
  const rise   = 6 - offset + tzH - Math.round(tzH) // crude local adjustment
  const set_   = 18 + offset + tzH - Math.round(tzH)
  const fmt = h => {
    const hh = Math.floor(((h % 24) + 24) % 24)
    const mm = Math.round((h - Math.floor(h)) * 60).toString().padStart(2, '0')
    return `${hh % 12 || 12}:${mm}${hh < 12 ? 'am' : 'pm'}`
  }
  return { rise: fmt(rise), set: fmt(set_) }
}

function litPath(cx, cy, R, phase) {
  if (phase < 0.01 || phase > 0.99) return null
  if (Math.abs(phase - 0.5) < 0.01)
    return `M ${cx - R} ${cy} a ${R} ${R} 0 1 0 ${2 * R} 0 a ${R} ${R} 0 1 0 -${2 * R} 0`

  const top = cy - R, bot = cy + R
  if (phase <= 0.5) {
    const termX  = R * Math.cos(phase * 2 * Math.PI)
    const absT   = Math.abs(termX)
    const sweep  = termX > 0 ? 1 : 0
    return `M ${cx} ${top} A ${R} ${R} 0 0 1 ${cx} ${bot} A ${absT} ${R} 0 0 ${sweep} ${cx} ${top} Z`
  } else {
    const p2    = 1 - phase
    const termX = R * Math.cos(p2 * 2 * Math.PI)
    const absT  = Math.abs(termX)
    const sweep = termX > 0 ? 0 : 1
    return `M ${cx} ${top} A ${R} ${R} 0 0 0 ${cx} ${bot} A ${absT} ${R} 0 0 ${sweep} ${cx} ${top} Z`
  }
}

export default function AstroFace({ time, theme }) {
  const phase = moonPhase(time)
  const name  = moonPhaseName(phase)
  const sun   = sunTimes(time)
  const moonAge = Math.round(phase * 29.53)
  const MR = 58 // moon radius

  const stars = useMemo(() => {
    const rng = (seed) => { let x = Math.sin(seed) * 10000; return x - Math.floor(x) }
    return Array.from({ length: 38 }, (_, i) => ({
      x: rng(i * 3.1)   * 280,
      y: rng(i * 5.7)   * 165,
      r: rng(i * 7.3)   * 1.4 + 0.4,
      o: rng(i * 11.9)  * 0.5 + 0.25,
    }))
  }, [])

  const path = litPath(CX, 86, MR, phase)
  const isNew = phase < 0.01 || phase > 0.99

  return (
    <svg width={S} height={S} style={{ position: 'relative', zIndex: 1 }}>
      <defs>
        <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={theme.accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
        </radialGradient>
        <filter id="star-blur" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      {/* Stars */}
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r}
          fill={theme.hand} opacity={s.o} filter="url(#star-blur)" />
      ))}

      {/* Moon glow */}
      <circle cx={CX} cy={86} r={MR + 20} fill="url(#moon-glow)" />

      {/* Moon dark base */}
      <circle cx={CX} cy={86} r={MR}
        fill={isNew ? theme.screen : theme.screen}
        stroke={theme.accent} strokeWidth="0.5" opacity={isNew ? 0.3 : 1} />

      {/* Moon lit area */}
      {path && <path d={path} fill={theme.hand} opacity="0.92" />}

      {/* Subtle surface texture rings */}
      {!isNew && [0.38, 0.62, 0.82].map((f, i) => (
        <circle key={i} cx={CX} cy={86} r={MR * f}
          fill="none" stroke={theme.hand} strokeWidth="0.5" opacity="0.06" />
      ))}

      {/* Phase name */}
      <text x={CX} y={163} textAnchor="middle" dominantBaseline="central"
        fill={theme.accent} fontSize="11" fontWeight="700"
        letterSpacing="1.5" fontFamily="system-ui">
        {name.toUpperCase()}
      </text>

      {/* Moon age */}
      <text x={CX} y={180} textAnchor="middle" dominantBaseline="central"
        fill={theme.marker} fontSize="9.5" fontFamily="system-ui">
        Day {moonAge} of 29
      </text>

      {/* Divider */}
      <line x1={CX - 70} y1={195} x2={CX + 70} y2={195}
        stroke={theme.accent} strokeWidth="0.75" opacity="0.22" />

      {/* Sunrise / Sunset */}
      <g>
        <text x={CX - 50} y={210} textAnchor="middle" dominantBaseline="central"
          fill={theme.accent} fontSize="8" fontWeight="700"
          letterSpacing="0.8" fontFamily="system-ui" opacity="0.7">
          SUNRISE
        </text>
        <text x={CX - 50} y={226} textAnchor="middle" dominantBaseline="central"
          fill={theme.text} fontSize="12" fontWeight="500" fontFamily="system-ui">
          {sun.rise}
        </text>

        {/* Sun icon center */}
        <circle cx={CX} cy={218} r="5" fill={theme.accent} opacity="0.7" />
        {[0, 60, 120, 180, 240, 300].map((d, i) => {
          const a = d * Math.PI / 180
          return <line key={i}
            x1={CX + 7 * Math.cos(a)} y1={218 + 7 * Math.sin(a)}
            x2={CX + 9 * Math.cos(a)} y2={218 + 9 * Math.sin(a)}
            stroke={theme.accent} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        })}

        <text x={CX + 50} y={210} textAnchor="middle" dominantBaseline="central"
          fill={theme.accent} fontSize="8" fontWeight="700"
          letterSpacing="0.8" fontFamily="system-ui" opacity="0.7">
          SUNSET
        </text>
        <text x={CX + 50} y={226} textAnchor="middle" dominantBaseline="central"
          fill={theme.text} fontSize="12" fontWeight="500" fontFamily="system-ui">
          {sun.set}
        </text>
      </g>
    </svg>
  )
}
