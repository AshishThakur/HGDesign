import { useEffect, useRef } from 'react'
import './Footer.css'

const NAV = [
  { label: 'Worlds', href: '#story' },
  { label: 'Creatures', href: '#discover' },
  { label: 'Journal', href: '#discover' },
  { label: 'About', href: '#footer' },
]

const SOCIAL = [
  { label: 'Instagram', href: '#' },
  { label: 'X / Twitter', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Discord', href: '#' },
]

export default function Footer() {
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
    <footer className="footer" id="footer" ref={ref}>
      <div className="footer__top">
        <div className="footer__statement">
          <span className="footer__label">Colophon</span>
          <p>
            Floria is a quiet world of curious creatures and half-remembered places. It was never meant to be
            fully explained, only wandered through slowly, with the lights low.
          </p>
        </div>

        <nav className="footer__col" aria-label="Footer Navigation">
          <span className="footer__label">Explore</span>
          <ul>
            {NAV.map((n) => (
              <li key={n.label}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <span className="footer__label">Follow</span>
          <ul>
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label} <span className="arrow">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__word" role="img" aria-label="FLORIA">
        {'FLORIA'.split('').map((ch, i) => (
          <span key={i} style={{ '--i': i }} aria-hidden="true">
            {ch}
          </span>
        ))}
      </div>

      <div className="footer__bottom">
        <span>© 2026 Ashish. All rights reserved.</span>
        <span className="footer__fin">— Fin —</span>
        <a href="#top" className="back-top">
          Back to the beginning <span className="arrow-up">↑</span>
        </a>
      </div>
    </footer>
  )
}