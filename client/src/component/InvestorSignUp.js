import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// Import icons from a popular icon library (you'll need to install this package)
// npm install react-icons
import { FaUser, FaEnvelope, FaLock, FaMoneyBillWave, FaChartLine, FaArrowRight, FaSignInAlt, FaQuoteLeft, FaShieldAlt, FaRocket, FaStar } from 'react-icons/fa'

const InvestorSignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    investmentRange: '',
    preferredSectors: [],
    experience: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeField, setActiveField] = useState('')
  const [animatedElements, setAnimatedElements] = useState([])
  const [activeAnimation, setActiveAnimation] = useState(false)

  // Generate random floating elements for background
  useEffect(() => {
    const elements = [];
    for (let i = 0; i < 15; i++) {
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
      background: 'linear-gradient(135deg, #4776E6 0%, #8E54E9 60%, #ff6b6b 100%)', // Enhanced vibrant gradient
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
      maxWidth: '900px', // Slightly wider container
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
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.3), 0 0 30px rgba(255,255,255,0.3)'
      }
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
    header: {
      position: 'relative',
      marginBottom: '3rem',
      padding: '0 0 1.5rem 0',
      borderBottom: '1px solid rgba(0,0,0,0.08)'
    },
    title: {
      fontSize: '2.75rem',
      fontWeight: '800',
      background: 'linear-gradient(90deg, #4776E6, #8E54E9, #ff6b6b)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.8rem',
      textAlign: 'center',
      textShadow: '0 2px 10px rgba(142, 84, 233, 0.2)'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#555',
      textAlign: 'center',
      maxWidth: '85%',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2rem',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      }
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
    select: {
      padding: '1.2rem 1rem 1.2rem 3rem',
      borderRadius: '14px',
      border: '2px solid #e0e0e0',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      backgroundColor: '#ffffff',
      appearance: 'none',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%238E54E9%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 1rem top 50%',
      backgroundSize: '0.75rem auto',
    },
    activeSelect: {
      borderColor: '#8E54E9',
      boxShadow: '0 0 0 3px rgba(142, 84, 233, 0.2), 0 2px 10px rgba(0,0,0,0.1)',
      outline: 'none',
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
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem',
      marginTop: '2rem'
    },
    primaryButton: {
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
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
      '&:hover': {
        backgroundPosition: 'right center',
        transform: 'translateY(-3px)',
        boxShadow: '0 15px 30px rgba(142, 84, 233, 0.4)'
      }
    },
    secondaryButton: {
      padding: '1.2rem',
      backgroundColor: 'transparent',
      color: '#4776E6',
      border: '2px solid #4776E6',
      borderRadius: '14px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.7rem',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        backgroundColor: 'rgba(71, 118, 230, 0.1)',
        borderColor: '#8E54E9',
        color: '#8E54E9',
        transform: 'translateY(-2px)'
      }
    },
    testimonialSection: {
      marginTop: '3rem',
      padding: '1.5rem 0 0',
      borderTop: '1px solid rgba(0,0,0,0.08)',
    },
    testimonialTitle: {
      fontSize: '1.3rem',
      textAlign: 'center',
      color: '#444',
      marginBottom: '1.5rem',
      fontWeight: '600'
    },
    testimonialGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1.5rem',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      }
    },
    testimonialCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(0,0,0,0.03)',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }
    },
    testimonialQuote: {
      color: '#666',
      fontSize: '0.95rem',
      lineHeight: '1.6',
      fontStyle: 'italic'
    },
    testimonialAuthor: {
      fontWeight: '600',
      color: '#333',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem'
    },
    statsBanner: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '1.5rem 0',
      textAlign: 'center',
      marginTop: '1rem',
      borderRadius: '12px',
      backgroundImage: 'linear-gradient(to right, rgba(71, 118, 230, 0.1), rgba(142, 84, 233, 0.1))',
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    statValue: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: '#8E54E9',
      marginBottom: '0.2rem'
    },
    statLabel: {
      fontSize: '0.85rem',
      color: '#666'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.7rem',
      marginBottom: '0.7rem'
    },
    featureIcon: {
      color: '#8E54E9',
      fontSize: '1rem'
    },
    featureText: {
      fontSize: '0.9rem',
      color: '#555'
    }
  }

  const errorStyle = {
    color: '#fff',
    backgroundColor: 'rgba(235, 87, 87, 0.9)',
    padding: '1rem',
    borderRadius: '12px',
    marginBottom: '2rem',
    textAlign: 'center',
    fontSize: '0.95rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(235, 87, 87, 0.25)',
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return;

    try {
      setLoading(true)
      const response = await axios.post('http://localhost:3500/investor_auth/investor-signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        investmentRange: formData.investmentRange,
        experience: formData.experience
      })

      navigate('/investor-login');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  }

  const handleBlur = () => {
    setActiveField('');
  }

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
        
        <div style={styles.header}>
          <h1 style={styles.title}>Become an Investor</h1>
          <p style={styles.subtitle}>Join our exclusive network and discover groundbreaking startups with high growth potential</p>
          
          {/* Stats banner to attract investors */}
          <div style={styles.statsBanner}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>150+</div>
              <div style={styles.statLabel}>Startups Funded</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>320%</div>
              <div style={styles.statLabel}>Avg. ROI</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>$42M+</div>
              <div style={styles.statLabel}>Total Investments</div>
            </div>
          </div>
          
          <div style={{marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center'}}>
            <div style={styles.featureItem}>
              <FaShieldAlt style={styles.featureIcon} />
              <span style={styles.featureText}>Vetted Opportunities</span>
            </div>
            <div style={styles.featureItem}>
              <FaRocket style={styles.featureIcon} />
              <span style={styles.featureText}>Early Access to Startups</span>
            </div>
            <div style={styles.featureItem}>
              <FaStar style={styles.featureIcon} />
              <span style={styles.featureText}>Premium Support</span>
            </div>
          </div>
        </div>
        
        {error && <div style={errorStyle}>{error}</div>}
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formRow}>
            <div style={styles.inputGroup}>
              <label style={activeField === 'name' ? {...styles.label, ...styles.activeLabel} : styles.label}>
                <span style={styles.iconContainer}><FaUser /></span> Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <FaUser style={activeField === 'name' ? {...styles.inputIcon, ...styles.activeIcon} : styles.inputIcon} />
                <input
                  style={activeField === 'name' ? {...styles.input, ...styles.activeInput} : styles.input}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  required
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={activeField === 'email' ? {...styles.label, ...styles.activeLabel} : styles.label}>
                <span style={styles.iconContainer}><FaEnvelope /></span> Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope style={activeField === 'email' ? {...styles.inputIcon, ...styles.activeIcon} : styles.inputIcon} />
                <input
                  style={activeField === 'email' ? {...styles.input, ...styles.activeInput} : styles.input}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  required
                  placeholder="Enter your email address"
                />
              </div>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.inputGroup}>
              <label style={activeField === 'password' ? {...styles.label, ...styles.activeLabel} : styles.label}>
                <span style={styles.iconContainer}><FaLock /></span> Password
              </label>
              <div style={{ position: 'relative' }}>
                <FaLock style={activeField === 'password' ? {...styles.inputIcon, ...styles.activeIcon} : styles.inputIcon} />
                <input
                  style={activeField === 'password' ? {...styles.input, ...styles.activeInput} : styles.input}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={handleBlur}
                  required
                  placeholder="Create a secure password"
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={activeField === 'confirmPassword' ? {...styles.label, ...styles.activeLabel} : styles.label}>
                <span style={styles.iconContainer}><FaLock /></span> Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <FaLock style={activeField === 'confirmPassword' ? {...styles.inputIcon, ...styles.activeIcon} : styles.inputIcon} />
                <input
                  style={activeField === 'confirmPassword' ? {...styles.input, ...styles.activeInput} : styles.input}
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={handleBlur}
                  required
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>

          <div style={styles.formRow}>
            <div style={styles.inputGroup}>
              <label style={activeField === 'investmentRange' ? {...styles.label, ...styles.activeLabel} : styles.label}>
                <span style={styles.iconContainer}><FaMoneyBillWave /></span> Investment Capacity
              </label>
              <div style={{ position: 'relative' }}>
                <FaMoneyBillWave style={activeField === 'investmentRange' ? {...styles.inputIcon, ...styles.activeIcon} : styles.inputIcon} />
                <select
                  style={activeField === 'investmentRange' ? {...styles.select, ...styles.activeSelect} : styles.select}
                  name="investmentRange"
                  value={formData.investmentRange}
                  onChange={handleChange}
                  onFocus={() => handleFocus('investmentRange')}
                  onBlur={handleBlur}
                  required
                >
                  <option value="">Select your investment range</option>
                  <option value="0-50k">$0 - $50,000</option>
                  <option value="50k-200k">$50,000 - $200,000</option>
                  <option value="200k-1m">$200,000 - $1,000,000</option>
                  <option value="1m+">$1,000,000+</option>
                </select>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={activeField === 'experience' ? {...styles.label, ...styles.activeLabel} : styles.label}>
                <span style={styles.iconContainer}><FaChartLine /></span> Investment Experience
              </label>
              <div style={{ position: 'relative' }}>
                <FaChartLine style={activeField === 'experience' ? {...styles.inputIcon, ...styles.activeIcon} : styles.inputIcon} />
                <input
                  style={activeField === 'experience' ? {...styles.input, ...styles.activeInput} : styles.input}
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  onFocus={() => handleFocus('experience')}
                  onBlur={handleBlur}
                  required
                  placeholder="Years of investment experience"
                  min="0"
                  max="70"
                />
              </div>
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button 
              type="submit" 
              style={{
                ...styles.primaryButton,
                opacity: loading ? 0.8 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              disabled={loading}
              className="hover-effect"
            >
              {loading ? 'Creating Your Account...' : 'Create Investor Account'} 
              {!loading && <FaArrowRight />}
            </button>

            <button 
              type="button"
              style={styles.secondaryButton}
              onClick={() => navigate('/investor-login')}
              className="hover-effect"
            >
              Already an investor? Sign In <FaSignInAlt />
            </button>
          </div>
        </form>
        
        {/* Testimonial section */}
        <div style={styles.testimonialSection}>
          <h3 style={styles.testimonialTitle}>What Our Investors Say</h3>
          <div style={styles.testimonialGrid}>
            <div style={styles.testimonialCard}>
              <FaQuoteLeft style={{color: '#8E54E9', opacity: 0.4, fontSize: '1.5rem'}} />
              <p style={styles.testimonialQuote}>
                "I've been able to diversify my portfolio with innovative startups that I wouldn't have discovered elsewhere."
              </p>
              <div style={styles.testimonialAuthor}>
                <FaStar style={{color: '#FFD700'}} /> Michael R., Angel Investor
              </div>
            </div>
            
            <div style={styles.testimonialCard}>
              <FaQuoteLeft style={{color: '#8E54E9', opacity: 0.4, fontSize: '1.5rem'}} />
              <p style={styles.testimonialQuote}>
                "The vetting process here is impressive. Every startup I've invested in through the platform has shown promising growth."
              </p>
              <div style={styles.testimonialAuthor}>
                <FaStar style={{color: '#FFD700'}} /> Sarah T., VC Partner
              </div>
            </div>
            
            <div style={styles.testimonialCard}>
              <FaQuoteLeft style={{color: '#8E54E9', opacity: 0.4, fontSize: '1.5rem'}} />
              <p style={styles.testimonialQuote}>
                "As a first-time investor, the support and guidance provided made the entire process seamless and rewarding."
              </p>
              <div style={styles.testimonialAuthor}>
                <FaStar style={{color: '#FFD700'}} /> James L., Tech Entrepreneur
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Add styles for the gradient animation and floating elements
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
  
  .hover-effect:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(142, 84, 233, 0.4);
  }
`;
document.head.appendChild(styleTag);

export default InvestorSignUp
