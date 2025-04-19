import { useState } from 'react';
import axios from 'axios';

export default function FundingRiskCalculator() {
  const initialFormData = {
    labels: '',
    funding_total_usd: '',
    milestones: '',
    is_CA: false,
    is_NY: false,
    is_MA: false,
    is_TX: false,
    is_otherstate: false,
    is_software: false,
    is_web: false,
    is_mobile: false,
    is_enterprise: false,
    is_advertising: false,
    is_gamesvideo: false,
    is_ecommerce: false,
    is_biotech: false,
    is_consulting: false,
    is_othercategory: false,
    has_VC: false,
    has_angel: false,
    has_roundA: false,
    has_roundB: false,
    has_roundC: false,
    has_roundD: false,
    avg_participants: '',
    is_top500: false
  };

  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3500/calculate-risk', formData);
      setResult(response.data.riskScore);
    } catch (error) {
      console.error('Error:', error);
      setResult('Error calculating risk');
    }
    setLoading(false);
  };

  // Inline CSS styles
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #43cea2, #185a9d)',
    padding: '20px'
  };

  const cardStyle = {
    background: '#fff',
    borderRadius: '20px',
    padding: '30px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    overflowY: 'auto',
    maxHeight: '90vh'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };

  const checkboxContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '5px 0'
  };

  const checkboxLabelStyle = {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    margin: '4px 0',
    fontSize: '14px'
  };

  const buttonStyle = {
    background: '#43cea2',
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
        <h2 style={{ fontSize: '26px', marginBottom: '20px', color: '#333' }}>
          Startup Funding Risk Calculator
        </h2>

        <label style={labelStyle}>Labels</label>
        <input type="text" name="labels" value={formData.labels} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Funding Total (USD)</label>
        <input type="number" name="funding_total_usd" value={formData.funding_total_usd} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Milestones</label>
        <input type="number" name="milestones" value={formData.milestones} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Average Participants</label>
        <input type="number" name="avg_participants" value={formData.avg_participants} onChange={handleChange} style={inputStyle} />

        <div style={{ marginTop: '20px' }}>
          <h4 style={{ marginBottom: '10px', color: '#555' }}>States</h4>
          <div style={checkboxContainerStyle}>
            {['is_CA', 'is_NY', 'is_MA', 'is_TX', 'is_otherstate'].map(field => (
              <label key={field} style={checkboxLabelStyle}>
                <input type="checkbox" name={field} checked={formData[field]} onChange={handleChange} />
                &nbsp;{field.replace('is_', '').replace(/_/g, ' ')}
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4 style={{ marginBottom: '10px', color: '#555' }}>Categories</h4>
          <div style={checkboxContainerStyle}>
            {['is_software', 'is_web', 'is_mobile', 'is_enterprise', 'is_advertising',
              'is_gamesvideo', 'is_ecommerce', 'is_biotech', 'is_consulting', 'is_othercategory'].map(field => (
                <label key={field} style={checkboxLabelStyle}>
                  <input type="checkbox" name={field} checked={formData[field]} onChange={handleChange} />
                  &nbsp;{field.replace('is_', '').replace(/_/g, ' ')}
                </label>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4 style={{ marginBottom: '10px', color: '#555' }}>Funding Rounds</h4>
          <div style={checkboxContainerStyle}>
            {['has_VC', 'has_angel', 'has_roundA', 'has_roundB', 'has_roundC', 'has_roundD'].map(field => (
              <label key={field} style={checkboxLabelStyle}>
                <input type="checkbox" name={field} checked={formData[field]} onChange={handleChange} />
                &nbsp;{field.replace('has_', '').replace(/_/g, ' ')}
              </label>
            ))}
          </div>
        </div>

        <label style={labelStyle}>Top 500 Company?</label>
        <label style={checkboxLabelStyle}>
          <input type="checkbox" name="is_top500" checked={formData.is_top500} onChange={handleChange} />
          &nbsp;Yes
        </label>

        <button onClick={handleSubmit} disabled={loading} style={buttonStyle}>
          {loading ? 'Calculating...' : 'Calculate Risk'}
        </button>

        {result !== null && (
          <div style={resultStyle}>
            Risk Score: {result}
          </div>
        )}
      </div>
    </div>
  );
}
