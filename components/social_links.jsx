function SocialLinks() {
    return (
        <div className="relative">
            
            <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-8 left-10 text-4xl text-white z-10 transition-all duration-200 hover:text-pink-500 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(225,48,108,0.5)]"
            >
                <i className="fab fa-instagram"></i>
            </a>
            
            
            <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-8 right-10 text-4xl text-white z-10 transition-all duration-200 hover:text-blue-600 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.5)]"
            >
                <i className="fab fa-linkedin"></i>
            </a>
        </div>
    )
}

export default SocialLinks