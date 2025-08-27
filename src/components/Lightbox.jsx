import { useEffect } from 'react'

function Lightbox({ work, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!work) return null

  return (
    <div 
      className="lightbox-overlay"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      aria-describedby="lightbox-description"
    >
      <div className="lightbox-container">
        <button 
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="lightbox-content">
          <div className="lightbox-image-container">
            <img 
              src={work.image} 
              alt={work.title}
              className="lightbox-image"
            />
          </div>

          <div className="lightbox-info">
            <div className="lightbox-header">
              <span className="lightbox-category">{work.category}</span>
              <h2 id="lightbox-title" className="lightbox-title">{work.title}</h2>
            </div>

            <p id="lightbox-description" className="lightbox-description">
              {work.description}
            </p>

            <div className="lightbox-actions">
              <button className="lightbox-action-btn primary">
                <i className="fas fa-heart"></i>
                Like
              </button>
              <button className="lightbox-action-btn secondary">
                <i className="fas fa-share"></i>
                Share
              </button>
              <button className="lightbox-action-btn secondary">
                <i className="fas fa-download"></i>
                Download
              </button>
            </div>

            {/* EDIT: Add more work details or metadata here */}
            <div className="lightbox-metadata">
              <div className="metadata-item">
                <span className="metadata-label">Created:</span>
                <span className="metadata-value">2024</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Medium:</span>
                <span className="metadata-value">{work.category}</span>
              </div>
              <div className="metadata-item">
                <span className="metadata-label">Status:</span>
                <span className="metadata-value">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lightbox
