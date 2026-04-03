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
    <div className="max-w-2xl mx-auto my-8 p-8 shadow-lg rounded-lg bg-white">
      <h1 className="text-center text-3xl font-semibold mb-8 text-gray-800">Startup Dashboard</h1>

      {error && <div className="text-red-600 mb-4 text-center p-3 bg-red-50 rounded">{error}</div>}
      {success && <div className="text-green-600 mb-4 text-center p-3 bg-green-50 rounded">{success}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="font-semibold block mb-2 text-gray-700">Startup Name</label>
          <input
            type="text"
            name="name"
            value={startupDetails.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2 text-gray-700">Category</label>
          <select
            name="category"
            value={startupDetails.category}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
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
          <label className="font-semibold block mb-2 text-gray-700">Region</label>
          <input
            type="text"
            name="region"
            value={startupDetails.region}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2 text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={startupDetails.country}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2 text-gray-700">Founded Year</label>
          <input
            type="number"
            name="foundedYear"
            value={startupDetails.foundedYear}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2 text-gray-700">Number of Funding Rounds</label>
          <input
            type="number"
            name="fundingRounds"
            value={startupDetails.fundingRounds}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2 text-gray-700">Number of Investors</label>
          <input
            type="number"
            name="investors"
            value={startupDetails.investors}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        <div>
          <label className="font-semibold block mb-2 text-gray-700">Number of Milestones</label>
          <input
            type="number"
            name="milestones"
            value={startupDetails.milestones}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          className="p-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition-colors duration-200 mt-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Upload Startup Details
        </button>
      </form>
    </div>
  );
};

export default Dashboard;