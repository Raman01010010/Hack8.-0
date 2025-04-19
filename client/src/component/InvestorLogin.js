import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User } from "../context/User";

const InvestorLogin = () => {
  const navigate = useNavigate();
  const { newUser, setNewUser } = useContext(User);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '4rem auto',
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
      gap: '1.5rem'
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
    button: {
      padding: '1rem',
      backgroundColor: '#2196F3',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '1rem'
    },
    registerLink: {
      textAlign: 'center',
      marginTop: '1rem',
      color: '#666'
    },
    link: {
      color: '#2196F3',
      textDecoration: 'none',
      cursor: 'pointer'
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
        // Store token in localStorage
        localStorage.setItem('token', response.data.data.token);
        // Update newUser context with investor token
        setNewUser({ ...newUser, investor: response.data.data.token });
        navigate('/investor');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Investor Login</h1>
      {error && <div style={styles.error}>{error}</div>}
      
      <form style={styles.form} onSubmit={handleSubmit}>
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

        <button 
          type="submit" 
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={styles.registerLink}>
        Don't have an account?{' '}
        <span 
          style={styles.link}
          onClick={() => navigate('/investor-signup')}
        >
          Register here
        </span>
      </div>
    </div>
  );
};

export default InvestorLogin;