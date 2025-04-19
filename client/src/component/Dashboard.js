import React, { useContext, useState } from 'react';
import { User } from '../context/User';
import { useNavigate } from 'react-router-dom';
 

const Dashboard = () => {
  const { newUser } = useContext(User);
  const userid = newUser.userid;
  console.log("abcd", userid);
  
  const navigate = useNavigate();

  const [startupDetails, setStartupDetails] = useState({
    name: '',
    category: '',
    region: '',
    country: '',
    foundedYear: '',
    fundingRounds: '',
    investors: '',
    milestones: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    'web', 'health', 'cleantech', 'analytics', 'mobile', 'education', 'medical',
    'games_video', 'enterprise', 'software', 'news', 'ecommerce', 'government',
    'other', 'security', 'biotech', 'network_hosting', 'finance', 'advertising',
    'photo_video', 'travel', 'public_relations', 'social', 'transportation',
    'hospitality', 'manufacturing', 'sports', 'nonprofit', 'search', 'fashion',
    'messaging', 'consulting', 'music', 'hardware', 'legal', 'semiconductor',
    'real_estate', 'automotive', 'nanotech', 'design', 'pets', 'local'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStartupDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Include the userid in the startupDetails object
      const payload = {
        ...startupDetails,
        userid // Add userid to the payload
      };
console.log("ffffff",userid);
      const response = await fetch('http://localhost:3500/startups/uploadDetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(payload)
      });

      if (response.ok) {
        navigate('/upload_documents')
        setSuccess('Startup details uploaded successfully!');
        setStartupDetails({
          name: '',
          category: '',
          region: '',
          country: '',
          foundedYear: '',
          fundingRounds: '',
          investors: '',
          milestones: ''
        });
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to upload startup details.');
      }
    } catch (err) {
      setError('An error occurred while uploading startup details.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Startup Dashboard</h1>

      {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>{success}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Startup Name</label>
          <input
            type="text"
            name="name"
            value={startupDetails.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Category</label>
          <select
            name="category"
            value={startupDetails.category}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Region</label>
          <input
            type="text"
            name="region"
            value={startupDetails.region}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Country</label>
          <input
            type="text"
            name="country"
            value={startupDetails.country}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Founded Year</label>
          <input
            type="number"
            name="foundedYear"
            value={startupDetails.foundedYear}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Number of Funding Rounds</label>
          <input
            type="number"
            name="fundingRounds"
            value={startupDetails.fundingRounds}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Number of Investors</label>
          <input
            type="number"
            name="investors"
            value={startupDetails.investors}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Number of Milestones</label>
          <input
            type="number"
            name="milestones"
            value={startupDetails.milestones}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Upload Startup Details
        </button>
      </form>
    </div>
  );
};

export default Dashboard;