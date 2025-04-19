import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate()

  const styles = {
    welcomeContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5'
    },
    heading: {
      marginBottom: '2rem',
      color: '#333',
      textAlign: 'center'
    },
    buttonContainer: {
      display: 'flex',
      gap: '2rem'
    },
    buttonBase: {
      padding: '1rem 2rem',
      fontSize: '1.1rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)'
      }
    },
    startupButton: {
      backgroundColor: '#4CAF50',
      color: 'white'
    },
    investorButton: {
      backgroundColor: '#2196F3',
      color: 'white'
    }
  }

  return (
    <div style={styles.welcomeContainer}>
      <h1 style={styles.heading}>Welcome to Investment Platform</h1>
      <div style={styles.buttonContainer}>
        <button 
          style={{...styles.buttonBase, ...styles.startupButton}}
          onClick={() => navigate('/signup')}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Join as Startup
        </button>
        <button 
          style={{...styles.buttonBase, ...styles.investorButton}}
          onClick={() => navigate('/investor-signup')}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Join as an Investor
        </button>
      </div>
    </div>
  )
}

export default Welcome
