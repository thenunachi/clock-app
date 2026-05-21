import { useState, useEffect } from 'react'
import PixelWatch from './components/PixelWatch'
import ControlPanel from './components/ControlPanel'
import './App.css'

export const THEMES = [
  { id: 'obsidian', name: 'Obsidian', case: '#484848', band: '#1c1c1c', screen: '#030303', accent: '#8ab4f8', hand: '#ffffff', text: '#e8eaed', marker: '#8a9099' },
  { id: 'hazel',    name: 'Hazel',    case: '#a08060', band: '#6b4e2e', screen: '#110900', accent: '#f5c542', hand: '#faf0d8', text: '#faf0d8', marker: '#c8a060' },
  { id: 'porcelain',name: 'Porcelain',case: '#c2bdb8', band: '#d4cfc9', screen: '#1a1a1a', accent: '#e0e0e0', hand: '#ffffff', text: '#e0e0e0', marker: '#909090' },
  { id: 'coral',    name: 'Coral',    case: '#b87060', band: '#8c3820', screen: '#0f0400', accent: '#ffb4a2', hand: '#fff2ee', text: '#ffe0d0', marker: '#e07060' },
  { id: 'bay',      name: 'Bay',      case: '#587898', band: '#2c4060', screen: '#010810', accent: '#90c4f8', hand: '#d0e8ff', text: '#b8d4f0', marker: '#5888b0' },
  { id: 'midnight', name: 'Midnight', case: '#1e2844', band: '#0c1428', screen: '#020510', accent: '#e0eaff', hand: '#ffffff', text: '#c8d8ff', marker: '#5870b0' },
  { id: 'forest',   name: 'Forest',   case: '#2a4228', band: '#162014', screen: '#040a04', accent: '#b8c848', hand: '#e8f0c0', text: '#c8d8a0', marker: '#587848' },
  { id: 'rose',     name: 'Rose',     case: '#c88880', band: '#9c5850', screen: '#0f0604', accent: '#ffb8c8', hand: '#fff0f4', text: '#ffe0e8', marker: '#d08898' },
  { id: 'arctic',   name: 'Arctic',   case: '#b0cce0', band: '#7099b8', screen: '#040810', accent: '#80d8ff', hand: '#d8f4ff', text: '#b0e8ff', marker: '#4888b0' },
]

export const FACES = [
  { id: 'bespoke',    name: 'Bespoke'    },
  { id: 'digital',   name: 'Digital'    },
  { id: 'minimal',   name: 'Minimal'    },
  { id: 'orbit',     name: 'Orbit'      },
  { id: 'neon',      name: 'Neon'       },
  { id: 'retro',     name: 'Retro'      },
  { id: 'infograph', name: 'Infograph'  },
  { id: 'solar',     name: 'Solar'      },
  { id: 'typograph', name: 'Typograph'  },
  { id: 'chrono',    name: 'Chrono'     },
  { id: 'weather',   name: 'Weather'    },
  { id: 'astro',     name: 'Astro'      },
]

export default function App() {
  const [time, setTime] = useState(new Date())
  const [theme, setTheme] = useState(THEMES[0])
  const [faceId, setFaceId] = useState('bespoke')
  const [photo, setPhoto] = useState(null)
  const [showSeconds, setShowSeconds] = useState(true)
  const [watchScale, setWatchScale] = useState(1)
  const [caseShape, setCaseShape] = useState('round')

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="app">
      <div className="app-bg" style={{ background: `radial-gradient(ellipse at 50% 30%, ${theme.band}55 0%, #000 70%)` }} />
      <div className="app-inner">
        <div style={{ transform: `scale(${watchScale})`, transformOrigin: 'center center', transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)' }}>
          <PixelWatch time={time} theme={theme} faceId={faceId} photo={photo} showSeconds={showSeconds} caseShape={caseShape} />
        </div>
        <ControlPanel
          themes={THEMES} faces={FACES} theme={theme} faceId={faceId}
          photo={photo} showSeconds={showSeconds}
          watchScale={watchScale} caseShape={caseShape}
          onTheme={setTheme} onFace={setFaceId}
          onPhoto={setPhoto} onClearPhoto={() => setPhoto(null)}
          onToggleSeconds={() => setShowSeconds(s => !s)}
          onScale={setWatchScale} onCaseShape={setCaseShape}
          time={time}
        />
      </div>
    </div>
  )
}
