import { useEffect, useRef } from 'react'
import './Discovery.css'

const CARDS = [
  { cls: 'c1', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop', no: '01', name: 'The Hollow Watcher', cat: 'Creature · Class III', desc: 'It has never been seen blinking. Those who stay still long enough say the forest is watching through it.', coord: '41.2N / 73.8W', rot: -2.5, speed: 0.05 },
  { cls: 'c2', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop', no: '02', name: 'Nightbloom Hollow', cat: 'Place · Uncharted', desc: 'A valley that opens only after dark. The flowers glow here, and no two bloom the same way twice.', coord: '12.9S / 44.1E', rot: 2, speed: -0.06 },
  { cls: 'c3', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop', no: '03', name: 'The Leaf Oracle', cat: 'Creature · Class I', desc: 'Speaks only in rustling. Every translation we tried came back different, and somehow all of them were true.', coord: '08.4N / 19.0W', rot: -3, speed: 0.09 },
  { cls: 'c4', img: 'https://images.unsplash.com/photo-1791095123165-063c7d4c1205?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8', no: '04', name: 'The Pale Sentinel', cat: 'Creature · Class V', desc: 'Stands at the edge of the clearing at dusk. It has never moved toward anyone. It has never moved away.', coord: '33.7N / 05.2E', rot: 2.5, speed: -0.04 },
  { cls: 'c5', img: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1200&auto=format&fit=crop', no: '05', name: 'The Ember Walker', cat: 'Creature · Restricted', desc: 'Leaves warmth where it walks and silence behind it. The journal page for this specimen was torn out.', coord: '??.?N / ??.?W', rot: -2, speed: 0.07 },
]

const FLOATS = [
  { text: 'ARCHIVE', cls: 'ghost', style: { top: '20%', left: '-4%' }, sx: 0.06, sy: 0.12 },
  { text: 'UNMAPPED', cls: 'ghost', style: { top: '52%', right: '-8%' }, sx: -0.07, sy: -0.1 },
  { text: 'FIELD JOURNAL', cls: 'ghost', style: { top: '82%', left: '6%' }, sx: 0.04, sy: 0.08 },
  { text: 'VOL. 01 / SPECIMENS 05', cls: 'tag', style: { top: '14%', right: '6%' }, sx: 0, sy: 0.05 },
  { text: 'CLASSIFIED', cls: 'tag ember', style: { top: '38%', left: '3%' }, sx: 0, sy: -0.07 },
  { text: 'FIG. 3 →', cls: 'tag', style: { top: '47%', left: '46%' }, sx: 0, sy: 0.09 },
  { text: 'DO NOT FEED', cls: 'tag moss', style: { top: '66%', right: '4%' }, sx: 0, sy: -0.05 },
  { text: 'REV. 2026', cls: 'tag', style: { top: '90%', right: '10%' }, sx: 0, sy: 0.06 },
]

export default function Discovery() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealEls = Array.from(root.querySelectorAll('[data-rv]'))
    const parEls = Array.from(root.querySelectorAll('[data-speed]'))

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    revealEls.forEach((el) => io.observe(el))

    let raf = null
    const update = () => {
      raf = null
      if (reduced) return
      const vh = window.innerHeight
      const r = root.getBoundingClientRect()
      const c = r.top + r.height / 2 - vh / 2
      parEls.forEach((el) => {
        const sy = parseFloat(el.dataset.speed || 0)
        const sx = parseFloat(el.dataset.sx || 0)
        el.style.transform = `translate3d(${c * sx}px, ${c * sy}px, 0)`
      })
    }
    const request = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [])

  return (
    <section className="discover" id="discover" ref={rootRef}>
      {FLOATS.map((f, i) => (
        <span
          key={i}
          className={`float ${f.cls}`}
          style={f.style}
          data-speed={f.sy}
          data-sx={f.sx}
          aria-hidden="true"
        >
          {f.text}
        </span>
      ))}

      <div className="discover__head">
        <h2 className="discover__title" data-rv>
          DISCOVER <em>FLORIA</em>
        </h2>
        <div className="discover__intro" data-rv style={{ '--d': '.15s' }}>
          <span className="discover__label">Field Archive / Entry 001</span>
          <p>
            A world only partly mapped. Here are the creatures that let themselves be seen, and the places
            that let themselves be found. The rest are still watching.
          </p>
        </div>
      </div>

      <div className="grid">
        {CARDS.map((c, i) => (
          <article
            key={c.no}
            className={`card ${c.cls}`}
            data-speed={c.speed}
            tabIndex={0}
            style={{ '--rot': c.rot + 'deg', '--d': i * 0.12 + 's' }}
          >
            <div className="card__inner" data-rv>
              <div className="card__media">
                <img src={c.img} alt={c.name} loading="lazy" draggable="false" />
                <span className="card__no">No. {c.no}</span>
              </div>
              <div className="card__meta">
                <span className="card__cat">{c.cat}</span>
                <h3 className="card__name">{c.name}</h3>
                <p className="card__desc">{c.desc}</p>
                <div className="card__extra">
                  <span>{c.coord}</span>
                  <span className="card__arrow">↗</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="cta" data-rv>
        <span className="cta__eyebrow">The archive is open</span>
        <a href="#footer" className="cta__btn">
          ENTER THE WORLD <span>→</span>
        </a>
      </div>
    </section>
  )
}