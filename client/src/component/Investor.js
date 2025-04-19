import React, { useState ,useContext} from 'react';
import axios from 'axios';
import { User } from '../context/User';

const Investor = () => {
  const { newUser } = useContext(User);
  
console.log("hey", newUser );

  const [formData, setFormData] = useState({
    minFundingRounds: 0,
    maxFundingRounds: 10,
    categories: [],
    region: '',
    country: '',
    foundedYearMin: 1900,
    foundedYearMax: new Date().getFullYear(),
    minInvestors: 0,
    maxMilestones: 100
  });
  
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
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
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      categories: checked
        ? [...prevState.categories, value]
        : prevState.categories.filter(cat => cat !== value)
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSubmitted(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/startups/search', formData);
      setStartups(response.data);
    } catch (err) {
      setError('Failed to fetch startups. Please try again.');
      console.error(err);
      
      // Mock data for demonstration purposes (remove in production)
      setStartups([
        {
          id: '1',
          name: 'TechInnovate',
          category: 'software',
          region: 'North America',
          country: 'USA',
          foundedYear: 2019,
          fundingRounds: 2,
          investors: 5,
          milestones: 7
        },
        {
          id: '2',
          name: 'HealthCare AI',
          category: 'health',
          region: 'Europe',
          country: 'Germany',
          foundedYear: 2020,
          fundingRounds: 1,
          investors: 3,
          milestones: 4
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="investor-dashboard" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>Startup Investment Finder</h1>
      
      <div className="search-section" style={{ 
        background: '#f8f9fa', 
        padding: '25px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#3498db' }}>Set Your Investment Criteria</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <h3>Funding Requirements</h3>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
              <div>
                <label htmlFor="minFundingRounds" style={{ display: 'block', marginBottom: '5px' }}>
                  Min Funding Rounds:
                </label>
                <input
                  type="number"
                  id="minFundingRounds"
                  name="minFundingRounds"
                  min="0"
                  value={formData.minFundingRounds}
                  onChange={handleChange}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              
              <div>
                <label htmlFor="maxFundingRounds" style={{ display: 'block', marginBottom: '5px' }}>
                  Max Funding Rounds:
                </label>
                <input
                  type="number"
                  id="maxFundingRounds"
                  name="maxFundingRounds"
                  min="0"
                  value={formData.maxFundingRounds}
                  onChange={handleChange}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              
              <div>
                <label htmlFor="minInvestors" style={{ display: 'block', marginBottom: '5px' }}>
                  Min Number of Investors:
                </label>
                <input
                  type="number"
                  id="minInvestors"
                  name="minInvestors"
                  min="0"
                  value={formData.minInvestors}
                  onChange={handleChange}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <div>
                <label htmlFor="foundedYearMin" style={{ display: 'block', marginBottom: '5px' }}>
                  Founded After Year:
                </label>
                <input
                  type="number"
                  id="foundedYearMin"
                  name="foundedYearMin"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.foundedYearMin}
                  onChange={handleChange}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              
              <div>
                <label htmlFor="foundedYearMax" style={{ display: 'block', marginBottom: '5px' }}>
                  Founded Before Year:
                </label>
                <input
                  type="number"
                  id="foundedYearMax"
                  name="foundedYearMax"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.foundedYearMax}
                  onChange={handleChange}
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              
              <div>
                <label htmlFor="region" style={{ display: 'block', marginBottom: '5px' }}>
                  Region:
                </label>
                <input
                  type="text"
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  placeholder="e.g., North America, Europe"
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
              
              <div>
                <label htmlFor="country" style={{ display: 'block', marginBottom: '5px' }}>
                  Country:
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g., USA, India"
                  style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3>Select Industry Categories</h3>
            <p style={{ marginBottom: '10px' }}>Choose one or more categories you're interested in:</p>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
              gap: '10px', 
              maxHeight: '200px', 
              overflowY: 'auto',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: '#fff'
            }}>
              {categories.map(category => (
                <div key={category} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id={category}
                    name="categories"
                    value={category}
                    checked={formData.categories.includes(category)}
                    onChange={handleCategoryChange}
                    style={{ marginRight: '8px' }}
                  />
                  <label htmlFor={category} style={{ textTransform: 'capitalize' }}>
                    {category.replace('_', ' ')}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            type="submit" 
            style={{
              display: 'block',
              margin: '30px auto 0',
              padding: '12px 24px',
              background: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background 0.3s'
            }}
          >
            Find Matching Startups
          </button>
        </form>
      </div>
      
      {submitted && (
        <div className="results-section" style={{ padding: '10px' }}>
          <h2 style={{ color: '#3498db', marginBottom: '20px' }}>Recommended Startups</h2>
          
          {loading && <p>Loading recommendations...</p>}
          
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          {!loading && startups.length === 0 && (
            <p>No startups match your criteria. Try adjusting your filters.</p>
          )}
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '20px' 
          }}>
            {startups.map(startup => (
              <div 
                key={startup.id} 
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  padding: '20px',
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <h3 style={{ marginTop: 0, color: '#2c3e50' }}>{startup.name}</h3>
                <div style={{ margin: '15px 0' }}>
                  <span style={{ 
                    background: '#3498db', 
                    color: 'white', 
                    padding: '3px 8px', 
                    borderRadius: '12px',
                    fontSize: '12px',
                    textTransform: 'capitalize'
                  }}>
                    {startup.category.replace('_', ' ')}
                  </span>
                  <span style={{ 
                    marginLeft: '8px',
                    background: '#95a5a6', 
                    color: 'white', 
                    padding: '3px 8px', 
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {startup.region}
                  </span>
                </div>
                
                <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
                  <p><strong>Founded:</strong> {startup.foundedYear}</p>
                  <p><strong>Country:</strong> {startup.country}</p>
                  <p><strong>Funding Rounds:</strong> {startup.fundingRounds}</p>
                  <p><strong>Investors:</strong> {startup.investors}</p>
                  <p><strong>Milestones:</strong> {startup.milestones}</p>
                </div>
                
                <button 
                  style={{
                    background: 'transparent',
                    border: '1px solid #3498db',
                    color: '#3498db',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    marginTop: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3498db';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#3498db';
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Investor;
