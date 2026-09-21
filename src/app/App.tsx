import { useEffect, useRef, useState, type CSSProperties } from 'react'
import './App.css'
import photoOne from '../assets/photos/celia-01.jpeg'
import photoTwo from '../assets/photos/celia-02.jpeg'
import photoThree from '../assets/photos/celia-03.jpeg'
import loveMessage from '../music/audioamor.ogg'
import bgMusic from '../music/audio1.mpeg'

type Flower = {
  x: number
  y: number
  scale: number
  rotate: number
  depth: number
  delay: number
}

const flowers: Flower[] = [
  { x: -142, y: 56, scale: 0.82, rotate: -19, depth: 3, delay: 0.42 },
  { x: -93, y: -48, scale: 0.98, rotate: -11, depth: 4, delay: 0.18 },
  { x: -20, y: 40, scale: 0.91, rotate: -4, depth: 7, delay: 0.55 },
  { x: 0, y: -120, scale: 1.12, rotate: 0, depth: 2, delay: 0 },
  { x: 53, y: 34, scale: 0.93, rotate: 5, depth: 8, delay: 0.47 },
  { x: 104, y: -36, scale: 0.99, rotate: 11, depth: 5, delay: 0.25 },
  { x: 145, y: 62, scale: 0.82, rotate: 18, depth: 3, delay: 0.64 },
]

const photos = [
  { src: photoOne, title: 'Tu sonrisa', note: 'Mi lugar favorito siempre será donde pueda verte sonreír.' },
  { src: photoTwo, title: 'Mi Doctorita', note: 'Tienes la manera más bonita de curarme el alma sin darte cuenta.' },
  { src: photoThree, title: 'Mi luz amarilla', note: 'Entre tantas personas, mi corazón siempre vuelve a encontrarte.' },
]

const bouquetButterflies = [
  { left: '8%', top: '22%', scale: 0.7, duration: 9, delay: -1, drift: 1 },
  { left: '82%', top: '15%', scale: 0.86, duration: 11, delay: -4, drift: -1 },
  { left: '13%', top: '64%', scale: 0.62, duration: 10, delay: -7, drift: 1 },
  { left: '79%', top: '58%', scale: 0.76, duration: 12, delay: -2, drift: -1 },
  { left: '32%', top: '6%', scale: 0.55, duration: 9.5, delay: -5, drift: 1 },
  { left: '64%', top: '76%', scale: 0.65, duration: 10.5, delay: -8, drift: -1 },
]

// Single heart system — used on both welcome and love pages
const hearts = Array.from({ length: 40 }, (_, index) => ({
  left: `${(index * 37 + 5) % 100}%`,
  top: `${(index * 53 + 3) % 100}%`,
  size: 14 + (index % 5) * 6,
  duration: 5 + (index % 6) * 1.2,
  delay: index * -0.55,
}))

function Sunflower({ x, y, scale, rotate, depth, delay }: Flower) {
  const style = {
    '--x': `${x}px`,
    '--y': `${y}px`,
    '--flower-scale': scale,
    '--flower-rotate': `${rotate}deg`,
    '--depth': depth,
    '--z': `${depth * 7}px`,
    '--delay': `${delay}s`,
    '--wind-delay': `${delay * -2.7}s`,
  } as CSSProperties

  return (
    <div className="sunflower" style={style}>
      <div className="stem">
        <span className="stem-highlight" />
        <span className="leaf leaf-left" />
        <span className="leaf leaf-right" />
        <span className="calyx" />
      </div>
      <div className="flower-head">
        <div className="petal-ring petal-ring-back">
          {Array.from({ length: 26 }, (_, petal) => (
            <span key={petal} style={{ '--petal-angle': `${petal * (360 / 26)}deg` } as CSSProperties} />
          ))}
        </div>
        <div className="petal-ring petal-ring-middle">
          {Array.from({ length: 22 }, (_, petal) => (
            <span key={petal} style={{ '--petal-angle': `${petal * (360 / 22)}deg` } as CSSProperties} />
          ))}
        </div>
        <div className="petal-ring petal-ring-front">
          {Array.from({ length: 18 }, (_, petal) => (
            <span key={petal} style={{ '--petal-angle': `${petal * 20}deg` } as CSSProperties} />
          ))}
        </div>
        <div className="flower-disk">
          {Array.from({ length: 56 }, (_, seed) => (
            <i
              key={seed}
              style={{
                left: `${32 + Math.cos(seed * 2.39996) * seed * 0.56}px`,
                top: `${32 + Math.sin(seed * 2.39996) * seed * 0.56}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function HeartField() {
  return (
    <div className="heart-field" aria-hidden="true">
      {hearts.map((heart, index) => (
        <span
          key={index}
          style={{
            left: heart.left,
            top: heart.top,
            fontSize: `${heart.size}px`,
            '--heart-duration': `${heart.duration}s`,
            '--heart-delay': `${heart.delay}s`,
          } as CSSProperties}
        >
          ♥
        </span>
      ))}
    </div>
  )
}

function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [bouquetOpen, setBouquetOpen] = useState(false)
  const [showNoResponse, setShowNoResponse] = useState(false)
  const [voicePlaying, setVoicePlaying] = useState(false)
  const [voiceMessage, setVoiceMessage] = useState('Una nota de voz hecha por mí')
  const voiceRef = useRef<HTMLAudioElement>(null)
  const bgAudioRef = useRef<HTMLAudioElement>(null)

  // Autoplay background music from second 22 when user enters the love page
  useEffect(() => {
    if (!hasEntered) return
    const audio = bgAudioRef.current
    if (!audio) return
    audio.currentTime = 22
    audio.volume = 0.55
    audio.play().catch(() => {
      // Autoplay blocked by browser — silently ignore
    })
  }, [hasEntered])

  const enterPage = () => {
    setHasEntered(true)
    setBouquetOpen(true)
  }

  const toggleVoice = async () => {
    const audio = voiceRef.current
    if (!audio) return

    if (voicePlaying) {
      audio.pause()
      return
    }

    try {
      await audio.play()
      setVoiceMessage('Escuchando mi mensaje para ti')
    } catch {
      setVoiceMessage('No pude reproducir mi nota de voz. Inténtalo otra vez.')
    }
  }

  if (!hasEntered) {
    return (
      <main className="welcome-page">
        <div className="welcome-glow welcome-glow-one" />
        <div className="welcome-glow welcome-glow-two" />
        <HeartField />
        <section className="welcome-card" aria-labelledby="love-question">
          <p>Una pregunta importante</p>
          <span className="welcome-flower" aria-hidden="true">✿</span>
          <h1 id="love-question">¿Me amas?</h1>
          <p className="welcome-note">Prometo que esta página está hecha con todo mi corazón.</p>
          <div className="welcome-actions">
            <button className="yes-button" onClick={enterPage}>Sí, te amo</button>
            <button className="no-button" onClick={() => setShowNoResponse(true)}>No</button>
          </div>
          {showNoResponse && <p className="welcome-response" role="status">Gracias por ser sincera. Siempre respetaré lo que sientes.</p>}
        </section>
      </main>
    )
  }

  return (
    <main className={`love-page ${bouquetOpen ? 'is-open' : ''}`}>
      {/* Background music — autoplays from second 22 */}
      <audio ref={bgAudioRef} src={bgMusic} loop preload="auto" style={{ display: 'none' }} />

      {/* Single clean heart background */}
      <HeartField />

      <section className="hero">
        <div className="hero-copy">
          <h1>Feliz día del amor,<br /><em>mi Doctorita.</em></h1>
          <p className="intro">
            Estas flores amarillas llevan algo que no cabe en un ramo: todo lo que te amo, mi Doctorita.
          </p>
          <div className="actions">
            <button className={`voice-button ${voicePlaying ? 'is-playing' : ''}`} onClick={toggleVoice}>
              <i aria-hidden="true">{voicePlaying ? 'Ⅱ' : '▶'}</i>
              <span><small>Escucha mi voz</small>{voiceMessage}</span>
            </button>
            <audio
              ref={voiceRef}
              src={loveMessage}
              preload="metadata"
              onPlay={() => setVoicePlaying(true)}
              onPause={() => setVoicePlaying(false)}
              onEnded={() => {
                setVoicePlaying(false)
                setVoiceMessage('Una nota de voz hecha por mí')
              }}
            />
          </div>
        </div>

        <div className="bouquet-scene" aria-label="Ramo tridimensional de siete girasoles">
          <div className="halo" />
          <div className="bouquet-butterflies" aria-hidden="true">
            {bouquetButterflies.map((butterfly, index) => (
              <span
                className="butterfly-flight"
                key={index}
                style={{
                  left: butterfly.left,
                  top: butterfly.top,
                  '--butterfly-scale': butterfly.scale,
                  '--flight-duration': `${butterfly.duration}s`,
                  '--flight-delay': `${butterfly.delay}s`,
                  '--flight-one': `${butterfly.drift * 38}px`,
                  '--flight-two': `${butterfly.drift * -24}px`,
                  '--flight-three': `${butterfly.drift * 54}px`,
                  '--flight-four': `${butterfly.drift * 70}px`,
                } as CSSProperties}
              >
                <i className="butterfly"><b /><b /><em /></i>
              </span>
            ))}
          </div>
          <div className="bouquet">
            <div className="wrap-shadow" />
            <div className="wrap-back" />
            {flowers.map((flower) => <Sunflower key={`${flower.x}-${flower.y}`} {...flower} />)}
            <div className="bouquet-foliage" aria-hidden="true">
              {Array.from({ length: 20 }, (_, leaf) => (
                <i
                  key={leaf}
                  style={{
                    left: `${40 + leaf * 11}px`,
                    bottom: `${(leaf % 5) * 9}px`,
                    transform: `rotate(${-76 + leaf * 8}deg)`,
                  }}
                />
              ))}
            </div>
            <div className="wrap-collar" />
            <div className="wrap-side wrap-side-left" />
            <div className="wrap-side wrap-side-right" />
            <div className="wrap-front"><span>Para mi Doctorita</span></div>
            <div className="wrap-band" />
            <div className="bouquet-bow"><i /><i /><b /></div>
          </div>
          <p className="bouquet-caption"><span>07</span> girasoles que nunca dejarán de buscar tu luz</p>
        </div>
      </section>

      <section className="letter" id="carta">
        <div className="letter-number">01</div>
        <div className="letter-heading">
          <p className="kicker">Una carta para Celia Llanqui</p>
          <h2>Mi amor encuentra su hogar en ti.</h2>
        </div>
        <div className="letter-copy">
          <p>Mi Doctorita, llegaste a mi vida y, sin hacer ruido, hiciste que todo tuviera un color más bonito.</p>
          <p>Amo tu sonrisa, tu forma de ser y esa paz que siento cuando estoy contigo. No quiero amarte solo con palabras, sino cuidarte, escucharte y elegirte cada día.</p>
          <strong>Te amo profundamente, Celia.</strong>
        </div>
      </section>

      <section className="memories">
        <header>
          <div>
            <p className="kicker">Nuestro pequeño universo</p>
            <h2>Tres recuerdos.<br />Una sola favorita.</h2>
          </div>
          <p>Cada fotografia guarda un instante; yo quiero guardar una vida completa a tu lado.</p>
        </header>
        <div className="memory-grid">
          {photos.map((photo, index) => (
            <article className="memory" key={photo.src}>
              <div className="memory-image">
                <img src={photo.src} alt={photo.title} loading="lazy" decoding="async" />
                <span>0{index + 1}</span>
              </div>
              <h3>{photo.title}</h3>
              <p>{photo.note}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>Siempre tuyo</p>
        <h2>Para Celia Llanqui,<br /><em>mi Doctorita.</em></h2>
        <span>Con todo mi amor · 2026</span>
      </footer>
    </main>
  )
}

export default App
