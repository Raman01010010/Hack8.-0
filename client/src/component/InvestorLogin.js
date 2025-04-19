import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from "../context/User";
// Import icons
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus, FaShieldAlt, FaStar, FaChartLine, FaRocket } from 'react-icons/fa';

const InvestorLogin = () => {
  const navigate = useNavigate();
  const { newUser, setNewUser } = useContext(User);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [animatedElements, setAnimatedElements] = useState([]);
  const [activeAnimation, setActiveAnimation] = useState(false);

  // Generate random floating elements for background
  useEffect(() => {
    const elements = [];
    for (let i = 0; i < 12; i++) {
      elements.push({
        id: i,
        size: Math.random() * 20 + 10,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5
      });
    }
    setAnimatedElements(elements);
    
    // Trigger animation after page load
    setTimeout(() => setActiveAnimation(true), 300);
  }, []);

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 60%, #ff6b6b 100%)',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundDecoration: {
      position: 'absolute',
      width: '50vw',
      height: '50vw',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
      top: '-15vw',
      right: '-15vw',
      zIndex: 0,
      animation: 'pulse 8s infinite alternate ease-in-out'
    },
    backgroundDecoration2: {
      position: 'absolute',
      width: '30vw',
      height: '30vw',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
      bottom: '-10vw',
      left: '-10vw',
      zIndex: 0,
      animation: 'pulse 10s infinite alternate-reverse ease-in-out'
    },
    floatingElement: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(1px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
      zIndex: 0,
    },
    container: {
      width: '100%',
      maxWidth: '500px',
      margin: '2rem auto',
      padding: '3rem',
      boxShadow: '0 20px 50px rgba(0,0,0,0.15), 0 0 20px rgba(255,255,255,0.2)',
      borderRadius: '24px',
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(20px)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
      zIndex: 1,
      transform: activeAnimation ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.98)',
      opacity: activeAnimation ? 1 : 0,
    },
    decorationBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '8px',
      background: 'linear-gradient(90deg, #4776E6, #8E54E9, #ff6b6b, #4776E6)',
      backgroundSize: '300% 100%',
      animation: 'gradientAnimation 8s linear infinite'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      background: 'linear-gradient(90deg, #4776E6, #8E54E9, #ff6b6b)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1rem',
      textAlign: 'center',
      textShadow: '0 2px 10px rgba(142, 84, 233, 0.2)'
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#555',
      textAlign: 'center',
      maxWidth: '85%',
      margin: '0 auto 2rem',
      lineHeight: '1.6'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.8rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      position: 'relative'
    },
    label: {
      fontWeight: '600',
      color: '#444',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      marginBottom: '0.3rem'
    },
    activeLabel: {
      color: '#8E54E9',
      transform: 'translateY(-2px)'
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      color: '#8E54E9',
      fontSize: '1rem'
    },
    input: {
      padding: '1.2rem 1rem 1.2rem 3rem',
      borderRadius: '14px',
      border: '2px solid #e0e0e0',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    },
    activeInput: {
      borderColor: '#8E54E9',
      boxShadow: '0 0 0 3px rgba(142, 84, 233, 0.2), 0 2px 10px rgba(0,0,0,0.1)',
      outline: 'none',
      backgroundColor: 'white',
      transform: 'translateY(-2px)'
    },
    inputIcon: {
      position: 'absolute',
      left: '1rem',
      top: '2.7rem',
      color: '#999',
      fontSize: '1.2rem',
      pointerEvents: 'none',
      transition: 'all 0.3s ease'
    },
    activeIcon: {
      color: '#8E54E9'
    },
    button: {
      padding: '1.3rem',
      backgroundImage: 'linear-gradient(to right, #4776E6, #8E54E9, #ff6b6b)',
      backgroundSize: '200% auto',
      color: 'white',
      border: 'none',
      borderRadius: '14px',
      fontSize: '1.2rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.5s ease',
      boxShadow: '0 10px 20px rgba(142, 84, 233, 0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.7rem',
      marginTop: '1rem',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1,
    },
    error: {
      color: '#fff',
      backgroundColor: 'rgba(235, 87, 87, 0.9)',
      padding: '1rem',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      textAlign: 'center',
      fontSize: '0.95rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(235, 87, 87, 0.25)',
    },
    registerLink: {
      textAlign: 'center',
      marginTop: '2.5rem',
      color: '#666',
      fontSize: '1.05rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.8rem',
      padding: '1.5rem 1rem',
      background: 'linear-gradient(135deg, rgba(142, 84, 233, 0.08) 0%, rgba(71, 118, 230, 0.12) 100%)',
      borderRadius: '16px',
      boxShadow: 'inset 0 0 12px rgba(142, 84, 233, 0.15), 0 5px 15px rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.8)',
      position: 'relative',
      overflow: 'hidden',
      transform: 'translateZ(0)',
    },
    linkContainer: {
      marginTop: '0.5rem',
      position: 'relative',
      zIndex: 1,
    },
    link: {
      color: 'white',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.6rem',
      padding: '0.8rem 1.5rem',
      borderRadius: '12px',
      backgroundImage: 'linear-gradient(135deg, #4776E6, #8E54E9)',
      boxShadow: '0 6px 15px rgba(142, 84, 233, 0.25)',
      width: 'auto',
      minWidth: '180px',
      position: 'relative',
      overflow: 'hidden',
    },
    linkContent: {
      position: 'relative',
      zIndex: 2
    },
    linkShine: {
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)',
      transform: 'rotate(-25deg)',
      transition: 'all 0.6s ease',
      opacity: 0,
      zIndex: 1
    },
    linkIcon: {
      fontSize: '1.1rem',
      transition: 'transform 0.3s ease',
    },
    registerDecoration: {
      position: 'absolute',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: 'rgba(142, 84, 233, 0.3)',
      filter: 'blur(4px)',
    },
    statsBanner: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '1.8rem',
      textAlign: 'center',
      marginTop: '2rem',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      backgroundColor: 'rgba(255,255,255,0.7)',
      borderRadius: '16px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
      backdropFilter: 'blur(5px)'
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      transition: 'transform 0.3s ease-in-out',
      borderRadius: '12px',
    },
    statValue: {
      fontSize: '1.8rem',
      fontWeight: '700',
      background: 'linear-gradient(90deg, #4776E6, #8E54E9)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      boxShadow: '0 4px 20px rgba(142, 84, 233, 0.2)',
      background: 'white',
      border: '2px solid rgba(142, 84, 233, 0.1)',
    },
    statLabel: {
      fontSize: '0.9rem',
      color: '#555',
      fontWeight: '600',
      marginTop: '0.5rem',
      letterSpacing: '0.5px'
    },
    securityNote: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      color: '#666',
      fontSize: '0.85rem',
      margin: '1rem 0 0',
      padding: '0.8rem',
      backgroundColor: 'rgba(0,0,0,0.02)',
      borderRadius: '8px'
    },
    iconSpin: {
      animation: 'spin 10s linear infinite'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3500/investor_auth/investor-login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.data.token) {
        // Save token and investor.id to localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('investorId', response.data.data.investor.id);
        navigate('/investor');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField('');
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.backgroundDecoration}></div>
      <div style={styles.backgroundDecoration2}></div>
      
      {/* Animated floating elements */}
      {animatedElements.map(el => (
        <div 
          key={el.id}
          style={{
            ...styles.floatingElement,
            width: `${el.size}px`,
            height: `${el.size}px`,
            left: `${el.x}%`,
            top: `${el.y}%`,
            animation: `float ${el.duration}s infinite ease-in-out ${el.delay}s alternate`
          }}
        />
      ))}
      
      <div style={styles.container}>
        <div style={styles.decorationBar}></div>
        
        <h1 style={styles.title}>Investor Login</h1>
        <p style={styles.subtitle}>Access your investor dashboard to discover and fund promising startups</p>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={activeField === 'email' ? {...styles.label, ...styles.activeLabel} : styles.label}>
              <span style={styles.iconContainer}><FaEnvelope /></span> Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope 
                style={activeField === 'email' ? {...styles.inputIcon, ...styles.activeIcon} : styles.inputIcon} 
              />
              <input
                style={activeField === 'email' ? {...styles.input, ...styles.activeInput} : styles.input}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={handleBlur}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={activeField === 'password' ? {...styles.label, ...styles.activeLabel} : styles.label}>
              <span style={styles.iconContainer}><FaLock /></span> Password
            </label>
            <div style={{ position: 'relative' }}>
              <FaLock 
                style={activeField === 'password' ? {...styles.inputIcon, ...styles.activeIcon} : styles.inputIcon} 
              />
              <input
                style={activeField === 'password' ? {...styles.input, ...styles.activeInput} : styles.input}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={handleBlur}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.button,
              opacity: loading ? 0.8 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            className="hover-effect"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'} 
            {!loading && <FaSignInAlt />}
          </button>
          
          <div style={styles.securityNote}>
            <FaShieldAlt style={{color: '#8E54E9'}} /> Secure, encrypted connection
          </div>
        </form>

        <div style={styles.registerLink} className="register-container">
          {/* Decorative elements */}
          <div className="register-decoration" style={{...styles.registerDecoration, top: '10%', left: '10%'}}></div>
          <div className="register-decoration" style={{...styles.registerDecoration, top: '15%', right: '15%'}}></div>
          <div className="register-decoration" style={{...styles.registerDecoration, bottom: '10%', left: '20%'}}></div>
          <div className="register-decoration" style={{...styles.registerDecoration, bottom: '20%', right: '10%'}}></div>
          
          <span style={{fontWeight: '600', fontSize: '1.15rem', color: '#555'}}>
            Looking to invest in promising startups?
          </span>
          <div style={styles.linkContainer}>
            <div 
              className="register-link hover-effect-button"
              onClick={() => navigate('/investorSignup')}
              style={styles.link}
            >
              <div style={styles.linkShine} className="link-shine"></div>
              <div style={styles.linkContent}>
                Register now <FaUserPlus style={styles.linkIcon} className="link-icon" />
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.statsBanner}>
          <div style={styles.statItem} className="stat-hover-effect">
            <div style={styles.statValue}><FaRocket style={styles.iconSpin} /></div>
            <div style={styles.statLabel}>150+ Startups</div>
          </div>
          <div style={styles.statItem} className="stat-hover-effect">
            <div style={styles.statValue}><FaChartLine style={styles.iconSpin} /></div>
            <div style={styles.statLabel}>320% Avg. ROI</div>
          </div>
          <div style={styles.statItem} className="stat-hover-effect">
            <div style={styles.statValue}><FaStar style={styles.iconSpin} /></div>
            <div style={styles.statLabel}>Elite Network</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add styles for animations
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 0.8; }
    100% { transform: scale(1); opacity: 0.5; }
  }
  
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(-40px) rotate(10deg); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes decorationFloat {
    0% { transform: translateY(0) scale(1); opacity: 0.6; }
    50% { transform: translateY(-10px) scale(1.2); opacity: 0.9; }
    100% { transform: translateY(0) scale(1); opacity: 0.6; }
  }
  
  .register-container:hover .register-decoration {
    animation: decorationFloat 3s infinite ease-in-out;
  }
  
  .register-decoration:nth-child(1) { animation-delay: 0s; }
  .register-decoration:nth-child(2) { animation-delay: 0.5s; }
  .register-decoration:nth-child(3) { animation-delay: 1s; }
  .register-decoration:nth-child(4) { animation-delay: 1.5s; }
  
  .hover-effect:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(142, 84, 233, 0.4);
    background-position: right center;
  }
  
  .hover-effect-button:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 10px 25px rgba(142, 84, 233, 0.4);
  }
  
  .hover-effect-button:hover .link-icon {
    transform: translateX(4px) rotate(15deg);
  }
  
  .hover-effect-button:hover .link-shine {
    opacity: 1;
    left: 100%;
    transition: all 0.6s ease;
  }
  
  .hover-effect-text:hover {
    color: #8E54E9;
    text-shadow: 0 0 10px rgba(142, 84, 233, 0.2);
    letter-spacing: 0.3px;
  }
  
  .stat-hover-effect {
    transition: all 0.3s ease;
  }
  
  .stat-hover-effect:hover {
    transform: translateY(-5px);
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 10px 20px rgba(142, 84, 233, 0.1);
  }
  
  .register-container {
    transition: all 0.4s ease;
  }
  
  .register-container:hover {
    transform: translateY(-5px);
    box-shadow: inset 0 0 20px rgba(142, 84, 233, 0.2), 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;
document.head.appendChild(styleTag);

export default InvestorLogin;