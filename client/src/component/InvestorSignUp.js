import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      backgroundColor: 'white'
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '2rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      fontWeight: 'bold',
      color: '#555'
    },
    input: {
      padding: '0.8rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem'
    },
    select: {
      padding: '0.8rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem'
    },
    button: {
      padding: '1rem',
      backgroundColor: '#2196F3',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '1rem'
    }
  }

  const errorStyle = {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center'
  }

  const buttonStyle = {
    ...styles.button,
    opacity: loading ? 0.7 : 1,
    cursor: loading ? 'not-allowed' : 'pointer'
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

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Investor Registration</h1>
      {error && <div style={errorStyle}>{error}</div>}
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input
            style={styles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input
            style={styles.input}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Investment Range</label>
          <select
            style={styles.select}
            name="investmentRange"
            value={formData.investmentRange}
            onChange={handleChange}
            required
          >
            <option value="">Select Investment Range</option>
            <option value="0-50k">$0 - $50,000</option>
            <option value="50k-200k">$50,000 - $200,000</option>
            <option value="200k-1m">$200,000 - $1,000,000</option>
            <option value="1m+">$1,000,000+</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Investment Experience (Years)</label>
          <input
            style={styles.input}
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          style={buttonStyle}
          disabled={loading}
          onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1976D2')}
          onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#2196F3')}
        >
          {loading ? 'Registering...' : 'Register as Investor'}
        </button>

        <button 
          type="button"
          style={{
            ...styles.button,
            backgroundColor: '#4CAF50',
            marginTop: '0.5rem'
          }}
          onClick={() => navigate('/investor-login')}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#388E3C')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
        >
          Sign in as Investor
        </button>
      </form>
    </div>
  )
}

export default InvestorSignUp
