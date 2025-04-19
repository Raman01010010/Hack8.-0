import { useState } from 'react';
import axios from 'axios';

export default function StartupNetWorthCalculator() {
  const [formData, setFormData] = useState({
    founded_year: '',
    num_funding_rounds: '',
    num_investors: '',
    num_milestones: '',
    num_local_competitors: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3500/calculate-net-worth', formData);
      setResult(response.data.netWorth);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error calculating net worth');
    }
    setLoading(false);
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #4e54c8, #8f94fb)',
    padding: '20px'
  };

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '30px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    textAlign: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };

  const buttonStyle = {
    background: '#4e54c8',
    color: '#fff',
    padding: '14px 20px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%'
  };

  const resultStyle = {
    marginTop: '20px',
    fontSize: '22px',
    color: '#333',
    fontWeight: 'bold'
  };

  const labelStyle = {
    textAlign: 'left',
    display: 'block',
    marginTop: '10px',
    marginBottom: '5px',
    fontWeight: '500',
    color: '#444'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>
          Startup Net Worth Calculator
        </h2>

        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label style={labelStyle}>
              {field.replace(/_/g, ' ')}
            </label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field.replace(/_/g, ' ')}`}
              style={inputStyle}
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? 'Calculating...' : 'Calculate Net Worth'}
        </button>

        {result !== null && (
          <div style={resultStyle}>
            Net Worth: {result}
          </div>
        )}
      </div>
    </div>
  );
}
