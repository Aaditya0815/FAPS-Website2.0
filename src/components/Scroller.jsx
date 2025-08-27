import { useState, useEffect, useRef } from 'react'

function Scroller() {
  const [activeSection, setActiveSection] = useState('hero')
  const [hoveredItem, setHoveredItem] = useState(null)
  const [focusedItem, setFocusedItem] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // EDIT: Simplified sections like Stefan's site
  const sections = [
    { id: 'hero', name: 'Intro' },
    { id: 'featured', name: 'Featured Works' },
    { id: 'about', name: 'About' },
    { id: 'blog', name: 'Blog' },
    { id: 'contact', name: 'Contact' }
  ]

  // Track scroll progress for each section
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.pageYOffset / totalHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Enhanced Intersection Observer for smoother tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // More precise triggering
      threshold: [0, 0.25, 0.5, 0.75, 1]
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    sections.forEach(section => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // Smooth navigation like Stefan's
  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Calculate offset for perfect centering
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset
      const offset = window.innerHeight * 0.1 // 10% from top
      
      window.scrollTo({ 
        top: elementTop - offset,
        behavior: 'smooth'
      })
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e, sectionId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigateToSection(sectionId)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const currentIndex = sections.findIndex(s => s.id === sectionId)
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1
      navigateToSection(sections[prevIndex].id)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const currentIndex = sections.findIndex(s => s.id === sectionId)
      const nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0
      navigateToSection(sections[nextIndex].id)
    }
  }

  // Stefan-style tooltip
  const Tooltip = ({ sectionName, isVisible, position }) => {
    if (!isVisible) return null
    
    return (
      <div 
        className={`stefan-tooltip ${position}`}
        role="tooltip"
        aria-live="polite"
      >
        {sectionName}
      </div>
    )
  }

  return (
    <>
      {/* Desktop: Right-side minimal scroller */}
      <nav className="stefan-scroller stefan-desktop" aria-label="Page sections">
        <div className="stefan-progress-track">
          <div 
            className="stefan-progress-fill"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
        
        <div className="stefan-dots">
          {sections.map((section, index) => (
            <div key={section.id} className="stefan-dot-wrapper">
              <button
                className={`stefan-dot ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => navigateToSection(section.id)}
                onMouseEnter={() => setHoveredItem(section.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onFocus={() => setFocusedItem(section.id)}
                onBlur={() => setFocusedItem(null)}
                onKeyDown={(e) => handleKeyDown(e, section.id)}
                aria-label={`Go to ${section.name}`}
                title={section.name}
              >
                <span className="stefan-dot-inner"></span>
              </button>
              
              <Tooltip 
                sectionName={section.name}
                isVisible={hoveredItem === section.id || focusedItem === section.id}
                position="left"
              />
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile: Bottom minimal indicator */}
      <nav className="stefan-scroller stefan-mobile" aria-label="Page sections">
        <div className="stefan-mobile-container">
          <div className="stefan-mobile-progress">
            <div 
              className="stefan-mobile-progress-fill"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          
          <div className="stefan-mobile-dots">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`stefan-mobile-dot ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => navigateToSection(section.id)}
                aria-label={`Go to ${section.name}`}
                title={section.name}
              >
                <span className="stefan-mobile-dot-inner"></span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Scroller
