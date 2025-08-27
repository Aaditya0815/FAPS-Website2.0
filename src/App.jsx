import { useState, useEffect } from 'react'
import SocietyTitle from '../components/society_name.jsx'
import SocialLinks from '../components/social_links.jsx'
import Loader from './components/Loader.jsx'
import Scroller from './components/Scroller.jsx'
import './App.css'

function App() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Auto-hide loader after animation completes
    const timer = setTimeout(() => {
      setShowLoader(false)
    }, 2000) // 2 seconds for double blink + fade

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* EDIT: Toggle loader for development testing */}
      {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
      
      {/* Fixed Stefan-style Scroller */}
      <Scroller />

      {/* Hero Section - Keep your original layout */}
      <section id="hero">
        <SocialLinks />
        <SocietyTitle />
      </section>

      {/* Additional sections for scroller functionality */}
      
      {/* Featured Works Section */}
      <section id="featured" className="additional-section">
        <div className="section-container">
          <h2 className="section-heading">Featured Works</h2>
          <div className="works-preview">
            <p className="section-description">Our latest photography and art projects</p>
            <div className="works-grid">
              <div className="work-item">
                <h3>Urban Landscapes</h3>
                <p>Exploring the intersection of architecture and human life in modern cityscapes</p>
              </div>
              <div className="work-item">
                <h3>Portrait Series</h3>
                <p>Intimate portraits capturing the essence of contemporary expression</p>
              </div>
              <div className="work-item">
                <h3>Abstract Motion</h3>
                <p>Digital explorations of movement and form in abstract compositions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="additional-section">
        <div className="section-container">
          <h2 className="section-heading">About Us</h2>
          <div className="about-preview">
            <p className="section-description">Learn more about our society and mission</p>
            <div className="about-content">
              <p>The Fine Arts and Photography Society is a vibrant community of creative individuals dedicated to exploring the boundaries of visual expression. We bring together photographers, digital artists, painters, and visual storytellers from diverse backgrounds.</p>
              <p>Our mission is to foster creativity, provide a platform for artistic growth, and create meaningful connections between art and audience.</p>
              <div className="stats">
                <div className="stat">
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Members</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Exhibitions</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Years Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="additional-section">
        <div className="section-container">
          <h2 className="section-heading">Blog</h2>
          <div className="blog-preview">
            <p className="section-description">Latest insights and stories from our community</p>
            <div className="blog-content">
              <article className="blog-post">
                <h3>The Art of Visual Storytelling</h3>
                <p>Explore how contemporary photographers are pushing boundaries and creating compelling narratives through their lens. From street photography to conceptual art, discover the techniques that make visual storytelling so powerful.</p>
                <span className="read-more">Read More →</span>
              </article>
              <article className="blog-post">
                <h3>Digital Art in the Modern Era</h3>
                <p>How digital tools are revolutionizing the way we create and experience art. From AI-assisted creation to virtual galleries, the future of art is here.</p>
                <span className="read-more">Read More →</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="additional-section">
        <div className="section-container">
          <h2 className="section-heading">Contact</h2>
          <div className="contact-preview">
            <p className="section-description">Get in touch with our society</p>
            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <a href="mailto:hello@faps.org" className="contact-value">hello@faps.org</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Phone:</span>
                  <a href="tel:+1234567890" className="contact-value">+1 (234) 567-890</a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Location:</span>
                  <span className="contact-value">Creative Arts District</span>
                </div>
              </div>
              <button className="join-button">Join Our Society</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App