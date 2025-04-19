import React, { useState, useEffect, useContext } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import swal from 'sweetalert';
import { User } from "../context/User";
import { Navigate, useNavigate } from 'react-router-dom';

const Investor = () => {
  const navigate=useNavigate()
 // const { newUser } = useContext(User);
 const { newUser,setNewUser } = useContext(User);
console.log("hey", newUser );
  
  const [activeTab, setActiveTab] = useState('findStartups');
  const [formData, setFormData] = useState({
    categories: [],
    maxInvestment: '', // Maximum investment limit field
  });
 
  const [startups, setStartups] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const axios = useAxiosPrivate();
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState(''); // New state for bid amount
  const categories = [
    'web', 'health', 'cleantech', 'analytics', 'mobile', 'education', 'medical',
    'games_video', 'enterprise', 'software', 'news', 'ecommerce', 'government',
    'other', 'security', 'biotech', 'network_hosting', 'finance', 'advertising',
    'photo_video', 'travel', 'public_relations', 'social', 'transportation',
    'hospitality', 'manufacturing', 'sports', 'nonprofit', 'search', 'fashion',
    'messaging', 'consulting', 'music', 'hardware', 'legal', 'semiconductor',
    'real_estate', 'automotive', 'nanotech', 'design', 'pets', 'local'
  ];
  
  // Fetch my bids when the tab is selected
  useEffect(() => {
    if (activeTab === 'myBids') {
      fetchMyBids();
    }
  }, [activeTab]);

  const fetchMyBids = async () => {
    setLoading(true);
    setError('');
    try {
        const response = await axios.post('/startup/getbid', { userId: newUser.investorId });
        setMyBids(response.data);
    } catch (err) {
        setError('Failed to fetch your bids. Please try again.');
        console.error(err);
    } finally {
        setLoading(false);
    }
};
  
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
      const response = await axios.post('/startup/filter', formData);
      swal({
        title: "Startups Retrieved",
        icon: "success",
        button: false,
        timer: 3000
      });
      // Update startups state with the array contained in response.data.data
      setStartups(response.data.data);
    } catch (err) {
      setError('Failed to fetch startups. Please try again.');
      console.error(err);
      setStartups([]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
    setBidAmount(''); // reset bid input when opening modal
  };

  const closeModal = () => {
    setSelectedStartup(null);
    setIsModalOpen(false);
  };

  // Function to send a bid request
  const handlePlaceBid = async () => {
    if (!bidAmount || isNaN(bidAmount)) {
      swal("Please enter a valid bid amount.");
      return;
    }
    try {
      console.log("hhhhh",newUser);
  
      // Replace with your actual bid API endpoint
      const payload = {
        userId: newUser.investorId, 
        biddingAmount: Number(bidAmount),
        startupId: selectedStartup._id
      };
      console.log(payload);
      const response = await axios.post('/investor/bid', payload);
      swal({
        title: "Bid Placed",
        text: "Your bid has been submitted successfully!",
        icon: "success",
        button: false,
        timer: 3000
      });
      closeModal();
    } catch (err) {
      console.error(err);
      swal("Failed to place your bid. Please try again.");
    }
  };
  
  // Add a function to handle chatbot initiation
  const startChatbot = (startupId, startupName,pitch) => {
    setNewUser((old)=>{return({
      ...old,
      "doc":pitch
    })})
    navigate('/chat')
    // swal({
    //   title: `Starting chatbot for ${startupName}`,
    //   text: "The chatbot is initializing...",
    //   icon: "info",
    //   button: false,
    //   timer: 2000
    // });
    // Here you would add actual chatbot initialization logic
    console.log(`Starting chatbot for startup: ${startupId}`);
  };
  
  return (
    <div className="investor-dashboard" style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '30px 20px',
      backgroundColor: '#f8faff',
      backgroundImage: 'linear-gradient(135deg, #f8faff 0%, #f1f7fe 100%)',
      minHeight: '100vh',
      color: '#2d3748',
      fontFamily: "'Poppins', 'Segoe UI', Roboto, sans-serif",
      boxShadow: 'inset 0 0 100px rgba(52, 152, 219, 0.05)'
    }}>
      <h1 style={{ 
        color: '#1a365d', 
        marginBottom: '30px',
        fontSize: '2.5rem',
        borderBottom: '3px solid transparent',
        borderImage: 'linear-gradient(to right, #3498db, #6366f1, #a78bfa) 1',
        paddingBottom: '10px',
        fontWeight: '700',
        letterSpacing: '-0.5px',
        textShadow: '0px 2px 3px rgba(0,0,0,0.1)'
      }}>Investor Dashboard</h1>
      
      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        marginBottom: '35px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '10px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.6)'
      }}>
        <button 
          style={{
            padding: '16px 30px',
            background: activeTab === 'findStartups' 
              ? 'linear-gradient(135deg, #4299e1, #667eea, #764ba2)' 
              : 'transparent',
            color: activeTab === 'findStartups' ? 'white' : '#4a5568',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            flex: '1',
            margin: '5px',
            boxShadow: activeTab === 'findStartups' ? '0 10px 15px -3px rgba(102,126,234,0.3)' : 'none'
          }}
          onClick={() => setActiveTab('findStartups')}
        >
          <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" style={{marginRight: '8px'}} fill="none" stroke={activeTab === 'findStartups' ? 'white' : '#4a5568'} strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Find Startups
          </span>
        </button>
        
        <button 
          style={{
            padding: '16px 30px',
            background: activeTab === 'myBids' 
              ? 'linear-gradient(135deg, #4299e1, #667eea, #764ba2)' 
              : 'transparent',
            color: activeTab === 'myBids' ? 'white' : '#4a5568',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            flex: '1',
            margin: '5px',
            boxShadow: activeTab === 'myBids' ? '0 10px 15px -3px rgba(102,126,234,0.3)' : 'none'
          }}
          onClick={() => setActiveTab('myBids')}
        >
          <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" style={{marginRight: '8px'}} fill="none" stroke={activeTab === 'myBids' ? 'white' : '#4a5568'} strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            My Bids
          </span>
        </button>
      </div>
      
      {/* Find Startups Tab */}
      {activeTab === 'findStartups' && (
        <>
          <div className="search-section" style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            padding: '35px', 
            borderRadius: '20px', 
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', 
            marginBottom: '40px',
            border: '1px solid rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)'
          }}>
            <h2 style={{ 
              marginBottom: '25px', 
              color: '#2d3748',
              position: 'relative',
              paddingBottom: '15px',
              fontWeight: '700',
              fontSize: '1.8rem'
            }}>
              Set Your Investment Criteria
              <span style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                height: '4px', 
                width: '80px', 
                background: 'linear-gradient(to right, #4299e1, #667eea, #764ba2)' 
              }}></span>
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  color: '#3d4852',
                  fontSize: '1.3rem',
                  marginBottom: '20px',
                  fontWeight: '600'
                }}>Investment Limit</h3>
                <div style={{ marginBottom: '20px' }}>
                  <div>
                    <label htmlFor="maxInvestment" style={{ 
                      display: 'block', 
                      marginBottom: '10px',
                      color: '#4a5568',
                      fontWeight: '500',
                      fontSize: '1rem'
                    }}>
                      Maximum Investment ($):
                    </label>
                    <div style={{
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#4a5568',
                        fontWeight: '600',
                        fontSize: '1.1rem'
                      }}>$</span>
                      <input
                        type="number"
                        id="maxInvestment"
                        name="maxInvestment"
                        min="0"
                        value={formData.maxInvestment}
                        onChange={handleChange}
                        placeholder="Enter max amount"
                        style={{ 
                          padding: '14px 15px 14px 35px', 
                          borderRadius: '12px', 
                          border: '2px solid #e2e8f0', 
                          width: '100%',
                          maxWidth: '350px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          outline: 'none',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#4299e1';
                          e.target.style.boxShadow = '0 0 0 3px rgba(66, 153, 225, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 style={{ 
                  color: '#3d4852',
                  fontSize: '1.3rem',
                  marginBottom: '20px',
                  fontWeight: '600'
                }}>Select Industry Categories</h3>
                <p style={{ marginBottom: '15px', color: '#718096', fontSize: '15px' }}>
                  Choose one or more categories you're interested in investing:
                </p>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                  gap: '12px', 
                  maxHeight: '300px', 
                  overflowY: 'auto', 
                  padding: '20px 15px', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '16px', 
                  background: '#fcfcfc',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
                }}>
                  {categories.map(category => (
                    <div key={category} style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      transition: 'all 0.25s ease',
                      cursor: 'pointer',
                      backgroundColor: formData.categories.includes(category) ? '#ebf8ff' : 'transparent',
                      border: formData.categories.includes(category) ? '1px solid #bee3f8' : '1px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!formData.categories.includes(category)) {
                        e.currentTarget.style.backgroundColor = '#f7fafc';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!formData.categories.includes(category)) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                    >
                      <input
                        type="checkbox"
                        id={category}
                        name="categories"
                        value={category}
                        checked={formData.categories.includes(category)}
                        onChange={handleCategoryChange}
                        style={{ 
                          marginRight: '12px', 
                          cursor: 'pointer',
                          accentColor: '#4299e1',
                          width: '18px',
                          height: '18px'
                        }}
                      />
                      <label htmlFor={category} style={{ 
                        textTransform: 'capitalize',
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: formData.categories.includes(category) ? '#2b6cb0' : '#4a5568',
                        fontWeight: formData.categories.includes(category) ? '600' : '500'
                      }}>
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
                  margin: '40px auto 5px',
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #48bb78, #38b2ac)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 15px -3px rgba(56, 178, 172, 0.3), 0 4px 6px -2px rgba(56, 178, 172, 0.15)',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(56, 178, 172, 0.3), 0 10px 10px -5px rgba(56, 178, 172, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(56, 178, 172, 0.3), 0 4px 6px -2px rgba(56, 178, 172, 0.15)';
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" style={{marginRight: '8px'}} fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Find Matching Startups
                </div>
              </button>
            </form>
          </div>
          
          {submitted && (
            <div className="results-section" style={{ padding: '10px 0' }}>
              <h2 style={{ 
                color: '#1a3b5d', 
                marginBottom: '25px',
                position: 'relative',
                paddingBottom: '10px',
                fontWeight: '600'
              }}>
                Recommended Startups
                <span style={{ 
                  position: 'absolute', 
                  bottom: 0, 
                  left: 0, 
                  height: '3px', 
                  width: '60px', 
                  background: 'linear-gradient(to right, #3498db, #2980b9)' 
                }}></span>
              </h2>
              
              {loading && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px 0',
                  color: '#7f8c8d',
                  fontSize: '16px'
                }}>
                  <div style={{
                    border: '3px solid #f3f3f3',
                    borderTop: '3px solid #3498db',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 15px'
                  }}></div>
                  Loading recommendations...
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              )}
              
              {error && (
                <div style={{ 
                  color: '#e74c3c', 
                  padding: '15px', 
                  background: '#fdf2f1', 
                  borderRadius: '8px',
                  border: '1px solid #fadbd8',
                  marginBottom: '20px'
                }}>
                  {error}
                </div>
              )}
              
              {!loading && startups.length === 0 && (
                <div style={{ 
                  padding: '40px', 
                  textAlign: 'center', 
                  background: 'white', 
                  borderRadius: '10px',
                  color: '#7f8c8d',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  fontSize: '16px'
                }}>
                  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 15px' }}>
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#95a5a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H16" stroke="#95a5a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>No startups match your criteria.</p>
                  <p style={{ fontSize: '14px', marginTop: '5px' }}>Try adjusting your filters to see more results.</p>
                </div>
              )}
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                gap: '25px' 
              }}>
                {startups.map(startup => (
                  <div 
                    key={startup._id} 
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                      padding: '25px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      border: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                      e.currentTarget.style.borderColor = '#3498db';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                    onClick={() => openModal(startup)}
                  >
                    <h3 style={{ 
                      margin: '0 0 15px', 
                      color: '#1a3b5d',
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      borderBottom: '2px solid #f0f0f0',
                      paddingBottom: '10px'
                    }}>{startup.name}</h3>
                    
                    <div style={{ margin: '15px 0' }}>
                      <span style={{ 
                        background: 'linear-gradient(135deg, #3498db, #2980b9)', 
                        color: 'white', 
                        padding: '6px 14px', 
                        borderRadius: '20px',
                        fontSize: '13px',
                        textTransform: 'capitalize',
                        fontWeight: '500',
                        display: 'inline-block',
                        boxShadow: '0 2px 5px rgba(52,152,219,0.2)'
                      }}>
                        {startup.category.replace('_', ' ')}
                      </span>
                      <span style={{ 
                        marginLeft: '10px',
                        background: '#7f8c8d', 
                        color: 'white', 
                        padding: '6px 14px', 
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: '500',
                        display: 'inline-block'
                      }}>
                        {startup.region}
                      </span>
                    </div>
                    
                    <div style={{ 
                      fontSize: '15px', 
                      color: '#555',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px 15px',
                      margin: '20px 0'
                    }}>
                      <p style={{ margin: '5px 0' }}>
                        <strong style={{ color: '#34495e' }}>Founded:</strong> {startup.foundedYear}
                      </p>
                      <p style={{ margin: '5px 0' }}>
                        <strong style={{ color: '#34495e' }}>Country:</strong> {startup.country}
                      </p>
                      <p style={{ margin: '5px 0' }}>
                        <strong style={{ color: '#34495e' }}>Funding Rounds:</strong> {startup.fundingRounds}
                      </p>
                      <p style={{ margin: '5px 0' }}>
                        <strong style={{ color: '#34495e' }}>Investors:</strong> {startup.investors}
                      </p>
                      <p style={{ margin: '5px 0', gridColumn: '1 / -1' }}>
                        <strong style={{ color: '#34495e' }}>Milestones:</strong> {startup.milestones}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                      <button 
                        style={{
                          background: 'white',
                          border: '2px solid #3498db',
                          color: '#3498db',
                          padding: '12px 0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          flex: '1',
                          fontWeight: '600',
                          fontSize: '15px',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                        onClick={() => openModal(startup)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#3498db';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.boxShadow = '0 4px 8px rgba(52,152,219,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white';
                          e.currentTarget.style.color = '#3498db';
                          e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                        }}
                      >
                        View Details
                      </button>
                      
                      <button 
                        style={{
                          background: 'white',
                          border: '2px solid #27ae60',
                          color: '#27ae60',
                          padding: '12px 0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          flex: '1',
                          fontWeight: '600',
                          fontSize: '15px',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          startChatbot(startup._id, startup.name, startup.pitch);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#27ae60';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.boxShadow = '0 4px 8px rgba(39,174,96,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white';
                          e.currentTarget.style.color = '#27ae60';
                          e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                        }}
                      >
                        Start Chatbot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {/* My Bids Tab */}
      {activeTab === 'myBids' && (
        <div className="my-bids-section">
          <h2 style={{ 
            color: '#1a3b5d', 
            marginBottom: '25px',
            position: 'relative',
            paddingBottom: '10px',
            fontWeight: '600'
          }}>
            My Startup Bids
            <span style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              height: '3px', 
              width: '60px', 
              background: 'linear-gradient(to right, #3498db, #2980b9)' 
            }}></span>
          </h2>
          
          {loading && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 0',
              color: '#7f8c8d',
              fontSize: '16px'
            }}>
              <div style={{
                border: '3px solid #f3f3f3',
                borderTop: '3px solid #3498db',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 15px'
              }}></div>
              Loading your bids...
            </div>
          )}
          
          {error && (
            <div style={{ 
              color: '#e74c3c', 
              padding: '15px', 
              background: '#fdf2f1', 
              borderRadius: '8px',
              border: '1px solid #fadbd8',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}
          
          {!loading && myBids.length === 0 && (
            <div style={{ 
              padding: '40px', 
              textAlign: 'center', 
              background: 'white', 
              borderRadius: '10px',
              color: '#7f8c8d',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              fontSize: '16px'
            }}>
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" style={{ margin: '0 auto 15px' }}>
                <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#95a5a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 7L12 13L21 7" stroke="#95a5a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p>You haven't placed any bids yet.</p>
              <p style={{ fontSize: '14px', marginTop: '5px' }}>Your bid history will appear here.</p>
            </div>
          )}
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
            gap: '25px' 
          }}>
            {myBids.map(startup => {
              // Find the bid object for the current user in the biddedBy array
              const userBid = startup.biddedBy.find(bid => {
                // Compare as strings in case they are ObjectIds
                return bid.userId.toString() === newUser.investorId;
              });
              
              return (
                <div 
                  key={startup._id} 
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                    padding: '25px',
                    position: 'relative',
                    border: '1px solid transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)';
                    e.currentTarget.style.borderColor = '#3498db';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <h3 style={{ 
                    margin: '0 0 15px', 
                    color: '#1a3b5d',
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    borderBottom: '2px solid #f0f0f0',
                    paddingBottom: '10px'
                  }}>{startup.name}</h3>
                  
                  {userBid && (
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'linear-gradient(135deg, #3498db, #2980b9)',
                      color: 'white',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      fontSize: '15px',
                      fontWeight: '600',
                      boxShadow: '0 3px 6px rgba(52,152,219,0.2)'
                    }}>
                      ${userBid.biddingAmount.toLocaleString()}
                    </div>
                  )}
                  
                  <div style={{ margin: '15px 0' }}>
                    <span style={{ 
                      background: 'linear-gradient(135deg, #3498db, #2980b9)', 
                      color: 'white', 
                      padding: '6px 14px', 
                      borderRadius: '20px',
                      fontSize: '13px',
                      textTransform: 'capitalize',
                      fontWeight: '500',
                      display: 'inline-block',
                      boxShadow: '0 2px 5px rgba(52,152,219,0.2)'
                    }}>
                      {startup.category.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div style={{ 
                    fontSize: '15px', 
                    color: '#555',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px 15px',
                    margin: '20px 0'
                  }}>
                    <p style={{ margin: '5px 0' }}>
                      <strong style={{ color: '#34495e' }}>Region:</strong> {startup.region}
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong style={{ color: '#34495e' }}>Country:</strong> {startup.country}
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong style={{ color: '#34495e' }}>Founded:</strong> {startup.foundedYear}
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong style={{ color: '#34495e' }}>Funding Rounds:</strong> {startup.fundingRounds}
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong style={{ color: '#34495e' }}>Investors:</strong> {startup.investors}
                    </p>
                    <p style={{ margin: '5px 0', gridColumn: '1 / -1' }}>
                      <strong style={{ color: '#34495e' }}>Milestones:</strong> {startup.milestones}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                    <button 
                      style={{
                        background: 'white',
                        border: '2px solid #3498db',
                        color: '#3498db',
                        padding: '12px 0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        flex: '1',
                        fontWeight: '600',
                        fontSize: '15px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#3498db';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(52,152,219,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#3498db';
                        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                      }}
                    >
                      View Details
                    </button>
                    
                    <button 
                      style={{
                        background: 'white',
                        border: '2px solid #27ae60',
                        color: '#27ae60',
                        padding: '12px 0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        flex: '1',
                        fontWeight: '600',
                        fontSize: '15px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        startChatbot(startup._id, startup.name, startup.pitch);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#27ae60';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(39,174,96,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#27ae60';
                        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                      }}
                    >
                      Start Chatbot
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Modal for Startup Details */}
      {isModalOpen && selectedStartup && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)',
          animation: 'fadeIn 0.3s ease'
        }}
          onClick={closeModal}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideIn {
              from { transform: translateY(30px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
          
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '30px',
            width: '90%',
            maxWidth: '600px',
            position: 'relative',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            animation: 'slideIn 0.3s ease'
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              style={{
                background: '#f1f2f6',
                border: 'none',
                color: '#7f8c8d',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                position: 'absolute',
                top: '15px',
                right: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
              onClick={closeModal}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e74c3c';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f1f2f6';
                e.currentTarget.style.color = '#7f8c8d';
              }}
            >
              ✕
            </button>
            
            <h2 style={{ 
              marginTop: '0', 
              color: '#1a3b5d',
              fontSize: '1.5rem',
              borderBottom: '2px solid #3498db',
              paddingBottom: '10px',
              fontWeight: '600'
            }}>{selectedStartup.name}</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px 25px',
              margin: '25px 0',
              fontSize: '15px'
            }}>
              <p style={{ margin: '8px 0' }}>
                <strong style={{ color: '#34495e', minWidth: '120px', display: 'inline-block' }}>Category:</strong>
                <span style={{ color: '#555', textTransform: 'capitalize' }}>{selectedStartup.category.replace('_', ' ')}</span>
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong style={{ color: '#34495e', minWidth: '120px', display: 'inline-block' }}>Region:</strong>
                <span style={{ color: '#555' }}>{selectedStartup.region}</span>
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong style={{ color: '#34495e', minWidth: '120px', display: 'inline-block' }}>Country:</strong>
                <span style={{ color: '#555' }}>{selectedStartup.country}</span>
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong style={{ color: '#34495e', minWidth: '120px', display: 'inline-block' }}>Founded:</strong>
                <span style={{ color: '#555' }}>{selectedStartup.foundedYear}</span>
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong style={{ color: '#34495e', minWidth: '120px', display: 'inline-block' }}>Funding Rounds:</strong>
                <span style={{ color: '#555' }}>{selectedStartup.fundingRounds}</span>
              </p>
              <p style={{ margin: '8px 0' }}>
                <strong style={{ color: '#34495e', minWidth: '120px', display: 'inline-block' }}>Investors:</strong>
                <span style={{ color: '#555' }}>{selectedStartup.investors}</span>
              </p>
              <p style={{ margin: '8px 0', gridColumn: '1 / -1' }}>
                <strong style={{ color: '#34495e', minWidth: '120px', display: 'inline-block' }}>Milestones:</strong>
                <span style={{ color: '#555' }}>{selectedStartup.milestones}</span>
              </p>
            </div>
            
            {/* Bid Input Section */}
            <div style={{ 
              marginTop: '30px',
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid #ececec'
            }}>
              <label htmlFor="bidAmount" style={{ 
                display: 'block', 
                marginBottom: '12px',
                color: '#1a3b5d',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                Your Investment Bid Amount ($):
              </label>
              
              <input
                type="number"
                id="bidAmount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                style={{ 
                  padding: '14px',
                  borderRadius: '8px',
                  border: '2px solid #dfe6e9',
                  width: '100%',
                  fontSize: '16px',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                }}
                placeholder="Enter your bid amount"
                onFocus={(e) => {
                  e.target.style.borderColor = '#3498db';
                  e.target.style.boxShadow = '0 0 0 3px rgba(52,152,219,0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#dfe6e9';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)';
                }}
              />
              
              <button 
                style={{
                  marginTop: '15px',
                  padding: '14px 24px',
                  background: 'linear-gradient(135deg, #3498db, #2980b9)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 6px rgba(52,152,219,0.2)'
                }}
                onClick={handlePlaceBid}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 6px 10px rgba(52,152,219,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(52,152,219,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investor;
