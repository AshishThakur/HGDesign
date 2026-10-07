import { useEffect, useRef } from 'react'
import './ScrollStory.css'


const STORY_IMG = 'https://images.unsplash.com/photo-1790347157081-21475f0d1fa0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8'
const FLOATING_IMG = 'https://plus.unsplash.com/premium_photo-1764431881498-318d04f3d8f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8'

const ITEMS = [
  { text: 'Specimen 001',        cls: 'mono',   t: '12%', l: '7%',  mt: '9%',  ml: '7%',  x: -140, y: -60,  r: -6,  s: .3, par: .06 },
  { text: 'Origin: Unknown',        cls: 'mono',   t: '21%', l: '68%', mt: '22%', ml: '7%',  x: 150,  y: -80,  r: 5,   s: .3, par: .1 },
  { text: 'It watches back',        cls: 'serif',  t: '38%', l: '5%',  mt: '87%', ml: '7%',  x: -220, y: 20,   r: -10, s: .4, par: .14 },
  { text: 'Field note / 07',        cls: 'mono vertical', t: '52%', l: '90%', x: 90, y: 120, r: 8, s: .2, par: .05 },
  { text: 'Where the forest dreams',cls: 'serif sm', t: '72%', l: '8%', x: -160, y: 140, r: 6, s: .3, par: .08 },
  { text: 'Rare. Quiet. Alive.',    cls: 'serif ital', t: '31%', l: '69%', mt: '80%', ml: '7%', x: 200, y: -20, r: -7, s: .4, par: .12 },
  { text: '41.2N / 73.8W',          cls: 'mono dim', t: '89%', l: '44%', mt: '94%', ml: '55%', x: 0, y: 160, r: 0, s: .2, par: .04 },
  { text: 'Do not wake it',         cls: 'mono ember', t: '8%', l: '42%', mt: '16%', ml: '52%', x: 0, y: -140, r: 3, s: .2, par: .07 },
  { text: 'Floria',                 cls: 'serif xl moss', t: '80%', l: '74%', x: 180, y: 120, r: 9, s: .5, par: .1 },
  { text: '+',  cls: 'shape cross',   t: '47%', l: '33%', x: -90, y: -40, r: 90, s: .6, par: .03 },
  { text: '',   cls: 'shape circle', t: '24%', l: '22%', x: -60, y: -100, r: 0, s: .8, par: .06 },
  { text: '',   cls: 'shape line',   t: '58%', l: '72%', x: 140, y: 30, r: -4, s: .5, par: .03 },
]

export default function ScrollStory() {
  const sectionRef = useRef(null)
  const frameRef = useRef(null)
  const imgRef = useRef(null)
  const floatingImgRef = useRef(null)
  const textsRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const frame = frameRef.current
    const img = imgRef.current
    const floatImg = floatingImgRef.current
    if (!section || !frame || !img || !textsRef.current) return

    const nodes = Array.from(textsRef.current.children)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

    let raf = null
    const update = () => {
      raf = null
      const vw = window.innerWidth
      const vh = window.innerHeight
      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - vh
      const p = clamp(-rect.top / total, 0, 1)
      const e = ease(p)

      if (reduced) {
        frame.style.clipPath = 'inset(0px 0px)'
        img.style.transform = 'scale(1)'
        if (floatImg) floatImg.style.transform = 'scale(1)'
      } else {
        const boxH = Math.min(vh * 0.6, vw * 0.52 * (16 / 9))
        const boxW = boxH * (9 / 16)
        const iy = ((vh - boxH) / 2) * (1 - e)
        const ix = ((vw - boxW) / 2) * (1 - e)
        frame.style.clipPath = `inset(${iy}px ${ix}px)`
        img.style.transform = `scale(${1.15 - 0.15 * e})`

        if (floatImg) {
          const floatScale = 0.4 + p * 1.6
          const floatOpacity = clamp(p * 2.2, 0, 1)
          floatImg.style.transform = `translate(-50%, -50%) scale(${floatScale})`
          floatImg.style.opacity = floatOpacity
        }
      }

      const t = clamp(p / 0.55, 0, 1)
      nodes.forEach((el, i) => {
        const it = ITEMS[i]
        const ti = clamp((t - i * 0.035) / 0.45, 0, 1)
        const op = clamp(1 - ti * 1.3, 0, 1)
        const tx = reduced ? 0 : it.x * ti
        const ty = reduced ? 0 : it.y * ti - p * vh * it.par
        const rot = reduced ? 0 : it.r * ti
        const sc = reduced ? 1 : 1 - it.s * ti

        el.style.opacity = op
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(${sc})`
      })
    }

    const request = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [])

  return (
    <section className="story" id="story" ref={sectionRef}>
      <div className="story__sticky">
        <div className="story__frame" ref={frameRef}>
          <img ref={imgRef} className="story__img" src={STORY_IMG} alt="FLORIA creature" draggable="false" />
        </div>

        <div className="story__floating-container">
          <img ref={floatingImgRef} className="story__floating-img" src={FLOATING_IMG} alt="Floating Element" draggable="false" />
        </div>

        <div className="story__texts" ref={textsRef}>
          {ITEMS.map((it, i) => (
            <span
              key={i}
              className={`st ${it.cls} ${it.mt ? '' : 'hide-m'}`}
              style={{ '--t': it.t, '--l': it.l, '--mt': it.mt || it.t, '--ml': it.ml || it.l }}
            >
              {it.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
