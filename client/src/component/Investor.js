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
  const handlePredictSuccess = async (startup) => {
    const inputData = {
      funding_total_usd: startup.fundingTotalUsd || 28000000,
      milestones: startup.milestones,
      is_CA: 0,
      is_NY: 0,
      is_MA: 0,
      is_TX: 0,
      is_otherstate: 0,
      is_software: 0,
      is_web: 0,
      is_mobile: 0,
      is_enterprise: 0,
      is_advertising: 0,
      is_gamesvideo: 0,
      is_ecommerce: 0,
      is_biotech: 0,
      is_consulting: 0,
      is_othercategory: 0,
      has_VC: 0,
      has_angel: 0,
      has_roundA: 0,
      has_roundB: 0,
      has_roundC: 0,
      has_roundD: 0,
      avg_participants: 0.0,
      is_top500: 0
    }
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData)
      })
      const data = await response.json()
      swal({
        title: "Success Prediction",
        text: `Predicted success for ${startup.name}: ${data.prediction || data.result || JSON.stringify(data)}`,
        icon: "info",
        button: "OK"
      })
    } catch (error) {
      console.error("Error:", error)
      swal("Error occurred while predicting success.")
    }
  }

  const handlePredictFunding = async (startup) => {
    const inputData = {
      founded_year: startup.foundedYear,
      num_funding_rounds: startup.fundingRounds,
      num_investors: startup.investors,
      num_milestones: startup.milestones,
      num_local_competitors: 200
    }
    try {
      const response = await fetch('http://127.0.0.1:8080/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData)
      })
      const data = await response.json()
      swal({
        title: "Funding Prediction",
        text: `Predicted funding for ${startup.name}: ${data.prediction || data.result || JSON.stringify(data)}`,
        icon: "info",
        button: "OK"
      })
    } catch (error) {
      console.error("Error:", error)
      swal("Error occurred while predicting funding.")
    }
  }
  
  return (
    <div className="investor-dashboard" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Investor Dashboard</h1>
      
      {/* Tab Navigation */}
      <div style={{ display: 'flex', marginBottom: '30px', borderBottom: '2px solid #e0e0e0' }}>
        <button 
          style={{
            padding: '12px 24px',
            background: activeTab === 'findStartups' ? '#3498db' : 'transparent',
            color: activeTab === 'findStartups' ? 'white' : '#333',
            border: 'none',
            borderBottom: activeTab === 'findStartups' ? '2px solid #3498db' : 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: activeTab === 'findStartups' ? 'bold' : 'normal'
          }}
          onClick={() => setActiveTab('findStartups')}
        >
          Find Startups
        </button>
        
        <button 
          style={{
            padding: '12px 24px',
            background: activeTab === 'myBids' ? '#3498db' : 'transparent',
            color: activeTab === 'myBids' ? 'white' : '#333',
            border: 'none',
            borderBottom: activeTab === 'myBids' ? '2px solid #3498db' : 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: activeTab === 'myBids' ? 'bold' : 'normal',
            marginLeft: '15px'
          }}
          onClick={() => setActiveTab('myBids')}
        >
          My Bids
        </button>
      </div>
      
      {/* Find Startups Tab */}
      {activeTab === 'findStartups' && (
        <>
          <div className="search-section" style={{ background: '#f8f9fa', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '20px', color: '#3498db' }}>Set Your Investment Criteria</h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <h3>Investment Limit</h3>
                <div style={{ marginBottom: '15px' }}>
                  <div>
                    <label htmlFor="maxInvestment" style={{ display: 'block', marginBottom: '5px' }}>
                      Maximum Investment ($):
                    </label>
                    <input
                      type="number"
                      id="maxInvestment"
                      name="maxInvestment"
                      min="0"
                      value={formData.maxInvestment}
                      onChange={handleChange}
                      placeholder="Enter max amount"
                      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '250px' }}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3>Select Industry Categories</h3>
                <p style={{ marginBottom: '10px' }}>Choose one or more categories you're interested in:</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px', maxHeight: '200px', overflowY: 'auto', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', background: '#fff' }}>
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
              {!loading && startups.length === 0 && <p>No startups match your criteria. Try adjusting your filters.</p>}
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {startups.map(startup => (
                  <div 
                    key={startup._id} 
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
                    
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <button 
                        style={{
                          background: 'transparent',
                          border: '1px solid #3498db',
                          color: '#3498db',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          flex: '1'
                        }}
                        onClick={() => openModal(startup)}
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
                      
                      <button 
                        style={{
                          background: 'transparent',
                          border: '1px solid #27ae60',
                          color: '#27ae60',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          flex: '1'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          startChatbot(startup._id, startup.name,startup.pitch);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#27ae60';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#27ae60';
                        }}
                      >
                        Start Chatbot
                      </button>

                      <button 
                        style={{
                          background: 'transparent',
                          border: '1px solid #f39c12',
                          color: '#f39c12',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          flex: '1'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePredictSuccess(startup);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f39c12';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#f39c12';
                        }}
                      >
                        Predict Success
                      </button>
                      
                      <button 
                        style={{
                          background: 'transparent',
                          border: '1px solid #9b59b6',
                          color: '#9b59b6',
                          padding: '8px 16px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                          flex: '1'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePredictFunding(startup);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#9b59b6';
                          e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#9b59b6';
                        }}
                      >
                        Predict Funding
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
          <h2 style={{ color: '#3498db', marginBottom: '20px' }}>My Startup Bids</h2>
          {loading && <p>Loading your bids...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && myBids.length === 0 && <p>You haven't placed any bids yet.</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
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
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    padding: '20px',
                    position: 'relative'
                  }}
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
                  </div>
                  
                  <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
                    {userBid && (
                      <p><strong>Your Bid Amount:</strong> ${userBid.biddingAmount.toLocaleString()}</p>
                    )}
                    <p><strong>Region:</strong> {startup.region}</p>
                    <p><strong>Country:</strong> {startup.country}</p>
                    <p><strong>Founded:</strong> {startup.foundedYear}</p>
                    <p><strong>Funding Rounds:</strong> {startup.fundingRounds}</p>
                    <p><strong>Investors:</strong> {startup.investors}</p>
                    <p><strong>Milestones:</strong> {startup.milestones}</p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button 
                      style={{
                        background: 'transparent',
                        border: '1px solid #3498db',
                        color: '#3498db',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        flex: '1'
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
                    
                    <button 
                      style={{
                        background: 'transparent',
                        border: '1px solid #27ae60',
                        color: '#27ae60',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        flex: '1'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        startChatbot(startup._id, startup.name);
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#27ae60';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#27ae60';
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
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
          onClick={closeModal}
        >
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            width: '80%',
            maxWidth: '600px',
            position: 'relative'
          }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0 }}>{selectedStartup.name}</h2>
            <p><strong>Category:</strong> {selectedStartup.category}</p>
            <p><strong>Region:</strong> {selectedStartup.region}</p>
            <p><strong>Country:</strong> {selectedStartup.country}</p>
            <p><strong>Founded Year:</strong> {selectedStartup.foundedYear}</p>
            <p><strong>Funding Rounds:</strong> {selectedStartup.fundingRounds}</p>
            <p><strong>Investors:</strong> {selectedStartup.investors}</p>
            <p><strong>Milestones:</strong> {selectedStartup.milestones}</p>
            
            {/* Bid Input Section */}
            <div style={{ marginTop: '20px' }}>
              <label htmlFor="bidAmount" style={{ display: 'block', marginBottom: '5px' }}>
                Your Bid Amount ($):
              </label>
              <input
                type="number"
                id="bidAmount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '100%' }}
                placeholder="Enter bidding amount"
              />
              <button 
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={handlePlaceBid}
              >
                Place Bid
              </button>
            </div>
            
            <button 
              style={{
                background: '#e74c3c',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                position: 'absolute',
                top: '10px',
                right: '10px'
              }}
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Investor;
