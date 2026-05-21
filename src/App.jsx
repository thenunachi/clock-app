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
]

export const FACES = [
  { id: 'bespoke',    name: 'Bespoke'    },
  { id: 'digital',   name: 'Digital'    },
  { id: 'minimal',   name: 'Minimal'    },
  { id: 'orbit',     name: 'Orbit'      },
  { id: 'neon',      name: 'Neon'       },
  { id: 'retro',     name: 'Retro'      },
  { id: 'infograph', name: 'Infograph'  },
]

export default function App() {
  const [time, setTime] = useState(new Date())
  const [theme, setTheme] = useState(THEMES[0])
  const [faceId, setFaceId] = useState('bespoke')
  const [photo, setPhoto] = useState(null)
  const [showSeconds, setShowSeconds] = useState(true)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="app">
      <div className="app-bg" style={{ background: `radial-gradient(ellipse at 50% 30%, ${theme.band}55 0%, #000 70%)` }} />
      <div className="app-inner">
        <PixelWatch time={time} theme={theme} faceId={faceId} photo={photo} showSeconds={showSeconds} />
        <ControlPanel
          themes={THEMES} faces={FACES} theme={theme} faceId={faceId}
          photo={photo} showSeconds={showSeconds}
          onTheme={setTheme} onFace={setFaceId}
          onPhoto={setPhoto} onClearPhoto={() => setPhoto(null)}
          onToggleSeconds={() => setShowSeconds(s => !s)}
          time={time}
        />
      </div>
    </div>
  )
}
