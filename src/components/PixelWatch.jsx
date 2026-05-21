import BespokeFace    from './BespokeFace'
import DigitalFace    from './DigitalFace'
import MinimalFace    from './MinimalFace'
import OrbitFace      from './OrbitFace'
import NeonFace       from './NeonFace'
import RetroFace      from './RetroFace'
import InfographFace  from './InfographFace'
import './PixelWatch.css'

const FACE_MAP = {
  bespoke:    BespokeFace,
  digital:    DigitalFace,
  minimal:    MinimalFace,
  orbit:      OrbitFace,
  neon:       NeonFace,
  retro:      RetroFace,
  infograph:  InfographFace,
}

export default function PixelWatch({ time, theme, faceId, photo, showSeconds }) {
  const FaceComp = FACE_MAP[faceId] || BespokeFace

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
          boxShadow: `0 0 0 5px ${theme.case}, 0 0 0 6px ${theme.case}60, inset 0 0 40px rgba(0,0,0,0.6), 0 30px 80px rgba(0,0,0,0.85)`,
        }}
      >
        {/* Crown / side button */}
        <div className="pw-crown" style={{ background: `linear-gradient(90deg, ${theme.case}aa, ${theme.case})` }} />

        {/* Screen */}
        <div className="pw-screen">
          {photo && (
            <div className="pw-photo" style={{ backgroundImage: `url(${photo})` }} />
          )}
          <FaceComp time={time} theme={theme} showSeconds={showSeconds} />
        </div>

        {/* Glass dome highlight */}
        <div className="pw-glass" />
      </div>

      {/* Bottom strap */}
      <div className="pw-band pw-band-bottom" style={{ background: theme.band }}>
        <div className="pw-band-sheen" />
        <div className="pw-band-clasp pw-band-clasp-bottom" style={{ borderColor: theme.case + '70' }} />
      </div>
    </div>
  )
}
