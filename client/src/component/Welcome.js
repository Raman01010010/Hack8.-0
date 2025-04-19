import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Optional: Add particle background effect
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
    script.async = true
    script.onload = () => {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: '#0a58ca' },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: '#0a58ca', opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
        },
        interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'grab' } } }
      });
    }
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const styles = {
    welcomeContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      padding: '2rem',
      fontFamily: '"Poppins", "Segoe UI", Roboto, sans-serif',
      color: '#ffffff',
      position: 'relative',
      overflow: 'hidden'
    },
    particlesContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 2,
      width: '100%',
      maxWidth: '1200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem',
      animation: mounted ? 'fadeInDown 1s ease-out' : 'none',
      opacity: mounted ? 1 : 0,
      transition: 'opacity 1s ease-out'
    },
    logo: {
      fontSize: '2.5rem',
      fontWeight: '800',
      background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1rem',
      letterSpacing: '1px',
      display: 'inline-block'
    },
    heading: {
      fontSize: '3rem',
      color: '#ffffff',
      marginBottom: '1.5rem',
      fontWeight: '700',
      textShadow: '0 2px 10px rgba(0,0,0,0.2)'
    },
    subheading: {
      fontSize: '1.2rem',
      color: 'rgba(255,255,255,0.9)',
      maxWidth: '700px',
      textAlign: 'center',
      lineHeight: '1.8',
      marginBottom: '2rem'
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px'
    },
    cardContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '3rem',
      width: '100%',
      marginBottom: '3rem',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s'
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
      padding: '2.5rem',
      width: '380px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    cardIcon: {
      fontSize: '3rem',
      marginBottom: '1.5rem',
      padding: '1.5rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.5s ease'
    },
    startupIcon: {
      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      color: 'white'
    },
    investorIcon: {
      background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
      color: 'white'
    },
    cardTitle: {
      fontSize: '1.7rem',
      fontWeight: '600',
      marginBottom: '1.5rem',
      color: '#ffffff',
      position: 'relative',
      paddingBottom: '0.7rem'
    },
    cardTitleUnderline: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '50px',
      height: '3px',
      background: 'linear-gradient(to right, transparent, #ffffff, transparent)'
    },
    cardDescription: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: 'rgba(255,255,255,0.85)',
      lineHeight: '1.8',
      fontSize: '1.05rem'
    },
    button: {
      padding: '1rem 1.8rem',
      fontSize: '1rem',
      fontWeight: '600',
      border: 'none',
      borderRadius: '50px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      width: '85%',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
    },
    buttonShine: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.7s ease'
    },
    startupButton: {
      background: 'linear-gradient(to right, #11998e, #38ef7d)',
    },
    investorButton: {
      background: 'linear-gradient(to right, #2193b0, #6dd5ed)',
    },
    footer: {
      marginTop: '4rem',
      color: 'rgba(255,255,255,0.7)',
      fontSize: '1rem',
      textAlign: 'center',
      width: '100%',
      opacity: mounted ? 1 : 0,
      transition: 'opacity 1s ease-out 0.6s'
    },
    highlight: {
      color: '#4fc3f7',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
      textDecoration: 'none'
    },
    socialIcons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
      margin: '1.5rem 0',
      fontSize: '1.5rem'
    },
    socialIcon: {
      color: 'rgba(255,255,255,0.7)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    fadeIn: {
      opacity: mounted ? 1 : 0,
      transition: 'opacity 1s ease-out'
    },
    '@keyframes fadeInDown': {
      from: {
        opacity: 0,
        transform: 'translateY(-20px)'
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)'
      }
    },
    badge: {
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      background: '#ff7043',
      color: 'white',
      borderRadius: '50px',
      padding: '0.4rem 0.8rem',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      boxShadow: '0 5px 15px rgba(255, 112, 67, 0.3)',
      animation: 'pulse 2s infinite'
    },
    '@keyframes pulse': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
      '100%': { transform: 'scale(1)' }
    }
  }

  const handleHover = (e, isHovering) => {
    if (isHovering) {
      e.target.style.transform = 'translateY(-8px) scale(1.03)';
      e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25)';
      
      // Animate the button shine effect
      const shine = e.target.querySelector('.button-shine');
      if (shine) {
        shine.style.left = '100%';
      }
      
      // Rotate the icon slightly
      const icon = e.target.querySelector('.card-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    } else {
      e.target.style.transform = 'translateY(0) scale(1)';
      e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
      
      // Reset icon
      const icon = e.target.querySelector('.card-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0)';
      }
    }
  }

  return (
    <div style={styles.welcomeContainer}>
      <div id="particles-js" style={styles.particlesContainer}></div>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <div style={styles.logo}>VentureMatch</div>
          <h1 style={styles.heading}>Where Visions Meet Investments</h1>
          <p style={styles.subheading}>
            Ignite innovation and drive success in the digital economy. Our premier platform 
            connects visionary startups with strategic investors looking for the next big opportunity.
          </p>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.cardContainer}>
            <div 
              style={styles.card} 
              onMouseOver={(e) => handleHover(e, true)}
              onMouseOut={(e) => handleHover(e, false)}
              onClick={() => navigate('/signup')}
            >
              <div style={{...styles.cardIcon, ...styles.startupIcon}} className="card-icon">🚀</div>
              <h2 style={styles.cardTitle}>
                For Startups
                <span style={styles.cardTitleUnderline}></span>
              </h2>
              <p style={styles.cardDescription}>
                Showcase your innovation to the world. Connect with investors who believe in your vision, 
                secure the funding you need, and get expert guidance to scale your business exponentially.
              </p>
              <button style={{...styles.button, ...styles.startupButton}}>
                <span className="button-shine" style={styles.buttonShine}></span>
                Join as Startup
              </button>
              <div style={styles.badge}>New Features</div>
            </div>

            <div 
              style={styles.card}
              onMouseOver={(e) => handleHover(e, true)}
              onMouseOut={(e) => handleHover(e, false)}
              onClick={() => navigate('/investorSignup')}
            >
              <div style={{...styles.cardIcon, ...styles.investorIcon}} className="card-icon">💼</div>
              <h2 style={styles.cardTitle}>
                For Investors
                <span style={styles.cardTitleUnderline}></span>
              </h2>
              <p style={styles.cardDescription}>
                Discover promising startups with breakthrough potential. Analyze opportunities, 
                build a diverse portfolio, and partner with entrepreneurs who are changing the world.
              </p>
              <button style={{...styles.button, ...styles.investorButton}}>
                <span className="button-shine" style={styles.buttonShine}></span>
                Join as Investor
              </button>
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <div style={styles.socialIcons}>
            <span style={styles.socialIcon}>&#xf39e;</span>
            <span style={styles.socialIcon}>&#xf099;</span>
            <span style={styles.socialIcon}>&#xf0e1;</span>
            <span style={styles.socialIcon}>&#xf16d;</span>
          </div>
          <p>Already have an account? <span 
            style={styles.highlight} 
            onClick={() => navigate('/login')}
            onMouseOver={(e) => e.target.style.color = '#81d4fa'}
            onMouseOut={(e) => e.target.style.color = '#4fc3f7'}
          >Login here</span></p>
          <p>&copy; {new Date().getFullYear()} VentureMatch. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Welcome
