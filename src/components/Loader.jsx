import { useEffect, useState } from 'react'

function Loader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)
  const [animationState, setAnimationState] = useState('initial') // initial -> blink1 -> blink2 -> fadeout

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Skip animation for users who prefer reduced motion
      const quickTimer = setTimeout(() => {
        onComplete?.()
      }, 100)
      return () => clearTimeout(quickTimer)
    }

    // Animation sequence timing
    const timers = [
      // First blink at 400ms
      setTimeout(() => setAnimationState('blink1'), 400),
      
      // Return from first blink at 600ms
      setTimeout(() => setAnimationState('initial'), 600),
      
      // Second blink at 1000ms
      setTimeout(() => setAnimationState('blink2'), 1000),
      
      // Return from second blink at 1200ms
      setTimeout(() => setAnimationState('initial'), 1200),
      
      // Start fade out at 1600ms
      setTimeout(() => setAnimationState('fadeout'), 1600),
      
      // Complete and remove at 2000ms
      setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 2000)
    ]

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className={`loader-overlay ${animationState}`} aria-hidden="true">
      <div className="loader-background"></div>
      
      {/* EDIT: Logo or text can be added here */}
      <div className="loader-content">
        <div className="loader-logo">
          <span className="loader-text">FAPS</span>
        </div>
      </div>
    </div>
  )
}

export default Loader
