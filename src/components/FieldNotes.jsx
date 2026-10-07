import { useState, useEffect, useRef } from 'react'
import './FieldNotes.css'

const NOTES = [
  {
    id: '01',
    title: 'The Canopy Resonance',
    category: 'Audio Log // Sec-4',
    date: 'OCT 12, 2026',
    content: 'At 03:00 hours, the forest frequencies shifted from white noise to a rhythmic pulsing. The local fauna stopped moving entirely. It is as if the entire canopy shares a single nervous system.',
    status: 'Verified',
  },
  {
    id: '02',
    title: 'Sub-Terrain Glow Anomalies',
    category: 'Geological // Class II',
    date: 'NOV 04, 2026',
    content: 'Soil samples taken near the western ridge show high concentrations of luminescent spore-matter. These spores react to human warmth, glowing brighter when approached within 2 meters.',
    status: 'Under Review',
  },
  {
    id: '03',
    title: 'The Fog Line Phenomenon',
    category: 'Atmospheric // Restricted',
    date: 'DEC 19, 2026',
    content: 'The mist does not rise with the sun; instead, it condenses into static geometric shapes along the riverbanks. Compasses fail completely within a 50-meter radius of the fog line.',
    status: 'Classified',
  },
]

export default function FieldNotes() {
  const [activeTab, setActiveTab] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="field-notes" id="story" ref={ref}>
      <div className="field-notes__header" data-rv>
        <span className="field-notes__eyebrow">Expedition Logs</span>
        <h2 className="field-notes__title">
          FIELD <em>NOTES</em> & LOGS
        </h2>
      </div>

      <div className="field-notes__container">
        {/* Navigation Tabs */}
        <div className="field-notes__tabs">
          {NOTES.map((note, idx) => (
            <button
              key={note.id}
              className={`field-notes__tab ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span className="tab-no">{note.id}</span>
              <span className="tab-title">{note.title}</span>
            </button>
          ))}
        </div>

        {/* Active Content Display */}
        <div className="field-notes__content-box">
          <div className="content-meta">
            <span className="meta-cat">{NOTES[activeTab].category}</span>
            <span className="meta-date">{NOTES[activeTab].date}</span>
          </div>
          <h3 className="content-heading">{NOTES[activeTab].title}</h3>
          <p className="content-text">{NOTES[activeTab].content}</p>
          <div className="content-footer">
            <span className="status-label">Status:</span>
            <span className="status-value">{NOTES[activeTab].status}</span>
          </div>
        </div>
      </div>
    </section>
  )
}