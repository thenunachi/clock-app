export default function DigitalFace({ time, theme }) {
  const hh = time.getHours()
  const mm = time.getMinutes().toString().padStart(2, '0')
  const ss = time.getSeconds().toString().padStart(2, '0')
  const ampm = hh >= 12 ? 'PM' : 'AM'
  const h12 = (hh % 12 || 12).toString().padStart(2, '0')
  const day = time.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
  const date = time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', width: '100%', height: '100%',
      position: 'relative', zIndex: 1, fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Day */}
      <div style={{ color: theme.accent, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', marginBottom: '6px', opacity: 0.85 }}>
        {day}
      </div>

      {/* Large time */}
      <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1 }}>
        <span style={{ color: theme.text, fontSize: '68px', fontWeight: 200, letterSpacing: '-3px' }}>
          {h12}
        </span>
        <span style={{ color: theme.accent + 'cc', fontSize: '48px', fontWeight: 200, letterSpacing: '-2px', margin: '0 -2px' }}>
          :
        </span>
        <span style={{ color: theme.text, fontSize: '68px', fontWeight: 200, letterSpacing: '-3px' }}>
          {mm}
        </span>
      </div>

      {/* AM/PM + seconds */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
        <span style={{ color: theme.accent, fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>{ampm}</span>
        <span style={{ color: theme.marker, fontSize: '12px', fontFamily: "'Courier New', monospace" }}>:{ss}</span>
      </div>

      {/* Date */}
      <div style={{ color: theme.marker, fontSize: '11px', fontWeight: 500, letterSpacing: '1.5px', marginTop: '10px', opacity: 0.8 }}>
        {date}
      </div>

      {/* Accent line */}
      <div style={{ width: '40px', height: '2px', borderRadius: '1px', background: theme.accent, marginTop: '12px', opacity: 0.5 }} />
    </div>
  )
}
