import { useMemo } from 'react'
import './Watch.css'

const SIZE = 300
const CENTER = SIZE / 2
const RADIUS = 120

function polarToXY(angleDeg, r, cx = CENTER, cy = CENTER) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function HandPath({ angleDeg, length, width, color, style = {} }) {
  const tip = polarToXY(angleDeg, length)
  const tail = polarToXY(angleDeg + 180, length * 0.15)
  return (
    <line
      x1={tail.x} y1={tail.y}
      x2={tip.x} y2={tip.y}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      style={style}
    />
  )
}

export default function Watch({ time, dial, uploadedPhoto, showSeconds }) {
  const hours = time.getHours() % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const hourAngle = hours * 30 + minutes * 0.5
  const minuteAngle = minutes * 6
  const secondAngle = seconds * 6

  const tickMarks = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => {
      const isMajor = i % 5 === 0
      const inner = polarToXY(i * 6, isMajor ? RADIUS - 14 : RADIUS - 8)
      const outer = polarToXY(i * 6, RADIUS)
      return { i, isMajor, inner, outer }
    })
  }, [])

  const numberPositions = useMemo(() => {
    return [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => {
      const { x, y } = polarToXY(i * 30, RADIUS - 26)
      return { n, x, y }
    })
  }, [])

  const now = time
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div className="watch-wrapper">
      {/* Watch body */}
      <div className="watch-body" style={{ '--bezel': dial.bezel }}>
        {/* Lugs */}
        <div className="lug lug-tl" style={{ background: dial.bezel }} />
        <div className="lug lug-tr" style={{ background: dial.bezel }} />
        <div className="lug lug-bl" style={{ background: dial.bezel }} />
        <div className="lug lug-br" style={{ background: dial.bezel }} />

        {/* Crown */}
        <div className="crown" style={{ background: dial.bezel }} />

        {/* Watch face */}
        <div className="watch-face" style={{ background: dial.face, boxShadow: `0 0 40px ${dial.accent}33, inset 0 0 20px #00000066` }}>
          {uploadedPhoto && (
            <div
              className="photo-bg"
              style={{ backgroundImage: `url(${uploadedPhoto})` }}
            />
          )}

          <svg width={SIZE} height={SIZE} className="watch-svg">
            {/* Bezel ring */}
            <circle cx={CENTER} cy={CENTER} r={RADIUS + 10} fill="none" stroke={dial.bezel} strokeWidth="8" opacity="0.6" />

            {/* Tick marks */}
            {tickMarks.map(({ i, isMajor, inner, outer }) => (
              <line
                key={i}
                x1={outer.x} y1={outer.y}
                x2={inner.x} y2={inner.y}
                stroke={isMajor ? dial.accent : dial.numbers + '88'}
                strokeWidth={isMajor ? 2.5 : 1}
                strokeLinecap="round"
              />
            ))}

            {/* Hour numbers */}
            {numberPositions.map(({ n, x, y }) => (
              <text
                key={n}
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="13"
                fontWeight="600"
                fontFamily="'Courier New', monospace"
                fill={dial.numbers}
                opacity={uploadedPhoto ? 0.6 : 1}
              >
                {n}
              </text>
            ))}

            {/* Date window */}
            <rect x={CENTER + 32} y={CENTER - 9} width={34} height={18} rx="3"
              fill={dial.bg} stroke={dial.accent} strokeWidth="1" opacity="0.85" />
            <text x={CENTER + 49} y={CENTER}
              textAnchor="middle" dominantBaseline="central"
              fontSize="9" fontWeight="700" fill={dial.accent} fontFamily="monospace">
              {time.getDate()}
            </text>

            {/* Hour hand */}
            <HandPath angleDeg={hourAngle} length={RADIUS * 0.55} width={6} color={dial.numbers} />

            {/* Minute hand */}
            <HandPath angleDeg={minuteAngle} length={RADIUS * 0.78} width={4} color={dial.numbers} />

            {/* Second hand */}
            {showSeconds && (
              <>
                <HandPath angleDeg={secondAngle} length={RADIUS * 0.88} width={1.5} color={dial.accent}
                  style={{ transition: 'none' }} />
                {/* Counterbalance */}
                <circle
                  cx={polarToXY(secondAngle + 180, RADIUS * 0.2).x}
                  cy={polarToXY(secondAngle + 180, RADIUS * 0.2).y}
                  r="4" fill={dial.accent}
                />
              </>
            )}

            {/* Center cap */}
            <circle cx={CENTER} cy={CENTER} r="6" fill={dial.accent} />
            <circle cx={CENTER} cy={CENTER} r="3" fill={dial.face} />
          </svg>
        </div>
      </div>

      {/* Digital readout below watch */}
      <div className="digital-readout" style={{ color: dial.accent, borderColor: dial.accent + '44' }}>
        <div className="digital-time">{timeStr}</div>
        <div className="digital-date" style={{ color: dial.numbers + 'aa' }}>{dateStr}</div>
      </div>
    </div>
  )
}
