import { useRef } from 'react'
import './ControlPanel.css'

const C = 28  // icon center

function FaceIcon({ faceId, theme }) {
  const acc = theme.accent, hnd = theme.hand, mrk = theme.marker

  if (faceId === 'bespoke') return (
    <svg width={56} height={56} viewBox="0 0 56 56">
      <circle cx={C} cy={C} r={23} fill="none" stroke={acc} strokeWidth="1.5" opacity="0.4" />
      {[0,90,180,270].map((d,i) => {
        const r = (d-90)*Math.PI/180
        return <line key={i} x1={C+20*Math.cos(r)} y1={C+20*Math.sin(r)} x2={C+16*Math.cos(r)} y2={C+16*Math.sin(r)} stroke={acc} strokeWidth="2" strokeLinecap="round" />
      })}
      <line x1={C} y1={C} x2={C} y2={C-13} stroke={hnd} strokeWidth="3" strokeLinecap="round" />
      <line x1={C} y1={C} x2={C+11} y2={C-7} stroke={hnd} strokeWidth="2" strokeLinecap="round" />
      <line x1={C} y1={C} x2={C-4} y2={C+12} stroke={acc} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx={C} cy={C} r="2.5" fill={acc} />
    </svg>
  )

  if (faceId === 'digital') return (
    <svg width={56} height={56} viewBox="0 0 56 56">
      <circle cx={C} cy={C} r={23} fill="none" stroke={acc} strokeWidth="1.5" opacity="0.4" />
      <text x={C} y={C-3} textAnchor="middle" dominantBaseline="central" fill={hnd} fontSize="17" fontWeight="200">12</text>
      <text x={C} y={C+9} textAnchor="middle" dominantBaseline="central" fill={acc} fontSize="8" fontWeight="600">:30</text>
    </svg>
  )

  if (faceId === 'minimal') return (
    <svg width={56} height={56} viewBox="0 0 56 56">
      <circle cx={C} cy={C} r={23} fill="none" stroke={acc} strokeWidth="1" opacity="0.3" />
      {[0,90,180,270].map((d,i) => {
        const r = (d-90)*Math.PI/180
        return <circle key={i} cx={C+21*Math.cos(r)} cy={C+21*Math.sin(r)} r="1.8" fill={acc} />
      })}
      <line x1={C} y1={C} x2={C} y2={C-13} stroke={hnd} strokeWidth="2.5" strokeLinecap="round" />
      <line x1={C} y1={C} x2={C+11} y2={C-7} stroke={hnd} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx={C} cy={C} r="2.2" fill={acc} />
    </svg>
  )

  if (faceId === 'orbit') return (
    <svg width={56} height={56} viewBox="0 0 56 56">
      <circle cx={C} cy={C} r={8}  fill="none" stroke={acc + '55'} strokeWidth="2.5" />
      <circle cx={C} cy={C} r={14} fill="none" stroke={hnd + '55'} strokeWidth="2" />
      <circle cx={C} cy={C} r={20} fill="none" stroke={acc + '44'} strokeWidth="1.5" />
      {/* Progress arcs */}
      <path d={`M ${C} ${C-8} A 8 8 0 1 1 ${C+8} ${C}`} fill="none" stroke={acc} strokeWidth="2.5" strokeLinecap="round" />
      <path d={`M ${C} ${C-14} A 14 14 0 0 1 ${C+14} ${C}`} fill="none" stroke={hnd} strokeWidth="2" strokeLinecap="round" />
      <path d={`M ${C} ${C-20} A 20 20 0 0 1 ${C+10} ${C-17}`} fill="none" stroke={acc} strokeWidth="1.5" strokeLinecap="round" />
      <text x={C} y={C} textAnchor="middle" dominantBaseline="central" fill={hnd} fontSize="6" fontWeight="600">H:M</text>
    </svg>
  )

  if (faceId === 'neon') return (
    <svg width={56} height={56} viewBox="0 0 56 56">
      <defs>
        <filter id="cp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <circle cx={C} cy={C} r={22} fill="none" stroke={acc + '55'} strokeWidth="2" filter="url(#cp-glow)" />
      {[0,90,180,270].map((d,i) => {
        const r = (d-90)*Math.PI/180
        return <line key={i} x1={C+20*Math.cos(r)} y1={C+20*Math.sin(r)} x2={C+17*Math.cos(r)} y2={C+17*Math.sin(r)} stroke={acc} strokeWidth="2" strokeLinecap="round" filter="url(#cp-glow)" />
      })}
      <line x1={C} y1={C} x2={C} y2={C-13} stroke={hnd} strokeWidth="3" strokeLinecap="round" filter="url(#cp-glow)" />
      <line x1={C} y1={C} x2={C+11} y2={C-7} stroke={hnd} strokeWidth="2" strokeLinecap="round" filter="url(#cp-glow)" />
      <circle cx={C} cy={C} r="3" fill={acc} filter="url(#cp-glow)" />
    </svg>
  )

  if (faceId === 'retro') return (
    <svg width={56} height={56} viewBox="0 0 56 56">
      <circle cx={C} cy={C} r={23} fill="none" stroke={acc + '40'} strokeWidth="1.5" />
      <circle cx={C} cy={C} r={20} fill="none" stroke={acc + '20'} strokeWidth="0.8" />
      {['XII','III','VI','IX'].map((n, i) => {
        const d = i * 90, r = (d-90)*Math.PI/180
        return <text key={n} x={C+16*Math.cos(r)} y={C+16*Math.sin(r)} textAnchor="middle" dominantBaseline="central" fill={hnd} fontSize="7" fontWeight="700" fontFamily="Georgia, serif">{n}</text>
      })}
      <line x1={C} y1={C} x2={C} y2={C-11} stroke={hnd} strokeWidth="3.5" strokeLinecap="round" />
      <line x1={C} y1={C} x2={C+10} y2={C-6} stroke={hnd} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx={C} cy={C} r="3.5" fill={hnd} />
      <circle cx={C} cy={C} r="1.5" fill={acc} />
    </svg>
  )

  if (faceId === 'infograph') return (
    <svg width={56} height={56} viewBox="0 0 56 56">
      <circle cx={C} cy={C} r={5} fill="none" stroke={acc + '44'} strokeWidth="1.5" />
      <circle cx={C} cy={C} r={10} fill="none" stroke={acc + '25'} strokeWidth="1" />
      {/* 4 complication bubbles */}
      {[{cx:C,cy:7},{cx:49,cy:C},{cx:C,cy:49},{cx:7,cy:C}].map(({cx,cy},i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="6" fill="none" stroke={acc + '55'} strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="1.5" fill={acc} opacity="0.7" />
        </g>
      ))}
      <line x1={C} y1={C} x2={C} y2={C-9} stroke={hnd} strokeWidth="2" strokeLinecap="round" />
      <line x1={C} y1={C} x2={C+8} y2={C-4} stroke={hnd} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={C} cy={C} r="2" fill={acc} />
    </svg>
  )

  if (faceId === 'solar') return (
    <svg width={56} height={56} viewBox="0 0 56 56">
      <circle cx={C} cy={C} r={22} fill="none" stroke={acc} strokeWidth="1" opacity="0.35" />
      {Array.from({ length: 16 }, (_, i) => {
        const isMaj = i % 4 === 0
        const r = (i * 22.5 - 90) * Math.PI / 180
        const r1 = isMaj ? 20 : 21, r2 = isMaj ? 15 : 18
        return <line key={i}
          x1={C + r1 * Math.cos(r)} y1={C + r1 * Math.sin(r)}
          x2={C + r2 * Math.cos(r)} y2={C + r2 * Math.sin(r)}
          stroke={isMaj ? acc : acc + '77'} strokeWidth={isMaj ? 2 : 1} strokeLinecap="round" />
      })}
      <line x1={C} y1={C} x2={C} y2={C - 13} stroke={hnd} strokeWidth="4" strokeLinecap="round" />
      <line x1={C} y1={C} x2={C + 10} y2={C - 6} stroke={hnd} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={C} cy={C} r="4" fill={acc} />
      <circle cx={C} cy={C} r="2" fill="rgba(0,0,0,0.4)" />
    </svg>
  )

  if (faceId === 'typograph') return (
    <svg width={56} height={56} viewBox="0 0 56 56">
      <circle cx={C} cy={C} r={22} fill="none" stroke={acc} strokeWidth="1" opacity="0.25" />
      <line x1={C - 12} y1={C - 16} x2={C + 12} y2={C - 16} stroke={acc} strokeWidth="1" opacity="0.5" />
      <text x={C} y={C - 2} textAnchor="middle" dominantBaseline="central"
        fill={hnd} fontSize="26" fontWeight="700" fontFamily="system-ui" letterSpacing="-1">9</text>
      <text x={C} y={C + 14} textAnchor="middle" dominantBaseline="central"
        fill={acc} fontSize="9" fontWeight="300" letterSpacing="3" fontFamily="system-ui">41</text>
      <line x1={C - 12} y1={C + 19} x2={C + 12} y2={C + 19} stroke={acc} strokeWidth="1" opacity="0.5" />
    </svg>
  )

  if (faceId === 'chrono') return (
    <svg width={56} height={56} viewBox="0 0 56 56">
      <circle cx={C} cy={C} r={22} fill="none" stroke={acc} strokeWidth="1.5" opacity="0.4" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((d, i) => {
        const r = (d - 90) * Math.PI / 180
        return <line key={i}
          x1={C + 22 * Math.cos(r)} y1={C + 22 * Math.sin(r)}
          x2={C + (i % 3 === 0 ? 17 : 19) * Math.cos(r)} y2={C + (i % 3 === 0 ? 17 : 19) * Math.sin(r)}
          stroke={acc} strokeWidth={i % 3 === 0 ? 1.8 : 0.8} strokeLinecap="round" />
      })}
      <line x1={C} y1={C} x2={C} y2={C - 14} stroke={hnd} strokeWidth="3.5" strokeLinecap="round" />
      <line x1={C} y1={C} x2={C + 12} y2={C - 6} stroke={hnd} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx={C} cy={C + 13} r={6} fill="none" stroke={acc} strokeWidth="1.2" opacity="0.65" />
      <line x1={C} y1={C + 13} x2={C} y2={C + 8} stroke={acc} strokeWidth="1" strokeLinecap="round" />
      <circle cx={C} cy={C} r="2.5" fill={acc} />
    </svg>
  )

  return null
}

export default function ControlPanel({
  themes, faces, theme, faceId, photo, showSeconds,
  onTheme, onFace, onPhoto, onClearPhoto, onToggleSeconds, time,
}) {
  const fileRef = useRef()
  const handleFile = (e) => {
    const f = e.target.files[0]; if (!f) return
    const r = new FileReader()
    r.onload = (ev) => onPhoto(ev.target.result)
    r.readAsDataURL(f); e.target.value = ''
  }
  const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <div className="cp" style={{ '--acc': theme.accent }}>
      {/* Header */}
      <div className="cp-header">
        <div className="cp-brand" style={{ color: theme.accent }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke={theme.accent} strokeWidth="2"/>
            <path d="M12 7v5l3.5 2" stroke={theme.accent} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Pixel Watch
        </div>
        <span className="cp-live-time" style={{ color: theme.marker }}>{timeStr}</span>
      </div>

      {/* Watch Face grid */}
      <div className="cp-section">
        <div className="cp-label">Watch Face</div>
        <div className="cp-faces-grid">
          {faces.map(f => (
            <button
              key={f.id}
              className={`cp-face-btn ${faceId === f.id ? 'active' : ''}`}
              style={{
                background:   faceId === f.id ? theme.accent + '14' : theme.screen + '80',
                borderColor:  faceId === f.id ? theme.accent : 'transparent',
              }}
              onClick={() => onFace(f.id)}
            >
              <FaceIcon faceId={f.id} theme={theme} />
              <span style={{
                color:      faceId === f.id ? theme.accent : theme.marker,
                fontSize:   '9px',
                fontWeight: faceId === f.id ? 700 : 500,
              }}>
                {f.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Color themes */}
      <div className="cp-section">
        <div className="cp-label">Color</div>
        <div className="cp-themes">
          {themes.map(t => (
            <div key={t.id} className="cp-theme-col">
              <button
                className={`cp-swatch ${theme.id === t.id ? 'active' : ''}`}
                style={{
                  background:    t.band,
                  outline:       theme.id === t.id ? `3px solid ${t.accent}` : '3px solid transparent',
                  outlineOffset: '2px',
                }}
                onClick={() => onTheme(t)}
                title={t.name}
              >
                <div className="cp-swatch-inner" style={{ background: t.case }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.accent }} />
                </div>
              </button>
              <span style={{ color: theme.id === t.id ? theme.accent : theme.marker + '80', fontSize: '8px', fontWeight: theme.id === t.id ? 700 : 400, textAlign: 'center' }}>
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Photo */}
      <div className="cp-section">
        <div className="cp-label">Dial Photo</div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
        {photo ? (
          <div className="cp-photo-row">
            <img src={photo} className="cp-thumb" alt="dial" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button className="cp-btn" style={{ color: theme.accent, borderColor: theme.accent + '40', background: theme.accent + '12' }} onClick={() => fileRef.current.click()}>Change</button>
              <button className="cp-btn" style={{ color: '#ff7070', borderColor: '#ff707040', background: '#ff707012' }} onClick={onClearPhoto}>Remove</button>
            </div>
          </div>
        ) : (
          <button className="cp-upload" style={{ color: theme.accent, borderColor: theme.accent + '45' }} onClick={() => fileRef.current.click()}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload Photo
          </button>
        )}
      </div>

      {/* Settings */}
      <div className="cp-section">
        <div className="cp-label">Settings</div>
        <div className="cp-row" onClick={onToggleSeconds} style={{ cursor: 'pointer' }}>
          <span style={{ color: theme.text, fontSize: '13px' }}>Second Hand</span>
          <div className={`cp-toggle ${showSeconds ? 'on' : ''}`}>
            <div className="cp-knob" />
          </div>
        </div>
      </div>
    </div>
  )
}
