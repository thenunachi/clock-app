import BespokeFace    from './BespokeFace'
import DigitalFace    from './DigitalFace'
import MinimalFace    from './MinimalFace'
import OrbitFace      from './OrbitFace'
import NeonFace       from './NeonFace'
import RetroFace      from './RetroFace'
import InfographFace  from './InfographFace'
import SolarFace      from './SolarFace'
import TypographFace  from './TypographFace'
import ChronoFace     from './ChronoFace'
import WeatherFace    from './WeatherFace'
import AstroFace      from './AstroFace'
import './PixelWatch.css'

const FACE_MAP = {
  bespoke:    BespokeFace,
  digital:    DigitalFace,
  minimal:    MinimalFace,
  orbit:      OrbitFace,
  neon:       NeonFace,
  retro:      RetroFace,
  infograph:  InfographFace,
  solar:      SolarFace,
  typograph:  TypographFace,
  chrono:     ChronoFace,
  weather:    WeatherFace,
  astro:      AstroFace,
}

export default function PixelWatch({ time, theme, faceId, photo, showSeconds, caseShape }) {
  const FaceComp  = FACE_MAP[faceId] || BespokeFace
  const isSquare  = caseShape === 'square'
  const caseR     = isSquare ? '22%' : '50%'

  return (
    <div className="pw-wrapper">
      {/* Top strap */}
      <div className="pw-band pw-band-top" style={{ background: theme.band }}>
        <div className="pw-band-sheen" />
        <div className="pw-band-clasp" style={{ borderColor: theme.case + '70' }} />
      </div>

      {/* Watch case */}
      <div
        className="pw-case"
        style={{
          background: theme.screen,
          borderRadius: caseR,
          transition: 'border-radius 0.35s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: `0 0 0 5px ${theme.case}, 0 0 0 6px ${theme.case}60, inset 0 0 40px rgba(0,0,0,0.6), 0 30px 80px rgba(0,0,0,0.85)`,
        }}
      >
        {/* Crown / side button */}
        <div className="pw-crown" style={{ background: `linear-gradient(90deg, ${theme.case}aa, ${theme.case})` }} />

        {/* Screen */}
        <div className="pw-screen" style={{ borderRadius: caseR, transition: 'border-radius 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
          {photo && (
            <div className="pw-photo" style={{ backgroundImage: `url(${photo})` }} />
          )}
          <FaceComp time={time} theme={theme} showSeconds={showSeconds} />
        </div>

        {/* Glass dome highlight */}
        <div className="pw-glass" style={{ borderRadius: caseR, transition: 'border-radius 0.35s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>

      {/* Bottom strap */}
      <div className="pw-band pw-band-bottom" style={{ background: theme.band }}>
        <div className="pw-band-sheen" />
        <div className="pw-band-clasp pw-band-clasp-bottom" style={{ borderColor: theme.case + '70' }} />
      </div>
    </div>
  )
}
