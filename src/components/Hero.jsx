import { useEffect, useRef } from 'react'
import './Hero.css'

const RADIUS = 280 // Slightly larger spotlight for a richer reveal effect

export default function Hero() {
  const heroRef = useRef(null)
  const revealRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const reveal = revealRef.current
    if (!hero || !reveal) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduced ? 1 : 0.12 // Smoother interpolation lag

    let tx = 0, ty = 0, cx = 0, cy = 0
    let raf = null
    let active = false

    const paint = () => {
      cx += (tx - cx) * ease
      cy += (ty - cy) * ease
      reveal.style.setProperty('--x', cx + 'px')
      reveal.style.setProperty('--y', cy + 'px')
      const moving = Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1
      raf = active || moving ? requestAnimationFrame(paint) : null
    }
    const start = () => { if (!raf) raf = requestAnimationFrame(paint) }

    const setTarget = (e) => {
      const r = hero.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
    }
    const onEnter = (e) => {
      setTarget(e)
      cx = tx; cy = ty 
      active = true
      reveal.classList.add('is-on')
      start()
    }
    const onMove = (e) => {
      setTarget(e)
      if (!active) { active = true; reveal.classList.add('is-on') }
      start()
    }
    const onLeave = () => {
      active = false
      reveal.classList.remove('is-on')
    }
    const onUp = (e) => { if (e.pointerType === 'touch') onLeave() }

    hero.addEventListener('pointerenter', onEnter)
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerdown', onEnter)
    hero.addEventListener('pointerleave', onLeave)
    hero.addEventListener('pointerup', onUp)
    hero.addEventListener('pointercancel', onLeave)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      hero.removeEventListener('pointerenter', onEnter)
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerdown', onEnter)
      hero.removeEventListener('pointerleave', onLeave)
      hero.removeEventListener('pointerup', onUp)
      hero.removeEventListener('pointercancel', onLeave)
    }
  }, [])

  return (
    <header className="hero" ref={heroRef} id="top">
      {/* Base Image (Dark/Night version) */}
      <img className="hero__img hero__base" src="/images/seen.png" alt="" draggable="false" />

      {/* Spotlight Reveal Image (Morning version) */}
      <img
        ref={revealRef}
        className="hero__img hero__reveal"
        src="/images/seen2.png"
        alt=""
        draggable="false"
        style={{ '--r': RADIUS + 'px' }}
      />

      <div className="hero__content">
        <nav className="hero__nav">
          <a href="#top" className="hero__logo">FLORIA</a>
          <ul className="hero__links">
            <li><a href="#story">Worlds</a></li>
            <li><a href="#discover">Creatures</a></li>
            <li><a href="#discover">Journal</a></li>
            <li><a href="#footer">About</a></li>
          </ul>
          <a href="#story" className="hero__menu">Menu</a>
        </nav>

        <h1 className="hero__title">FLORIA</h1>

        <div className="hero__bottom">
          <div className="hero__copy">
            <p className="hero__eyebrow">Enter a world where creatures come alive</p>
            <p className="hero__desc">
              An immersive world of curious creatures, magical places, and stories waiting to be discovered.
            </p>
          </div>
          <div className="hero__cta">
            <a href="#story" className="btn btn--solid">Explore Floria &rarr;</a>
            <a href="#discover" className="btn">Meet the Creatures &rarr;</a>
          </div>
        </div>
      </div>
    </header>
  )
}