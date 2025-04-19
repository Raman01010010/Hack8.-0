import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { User } from '../context/User';
import { FaSearch, FaChartLine, FaUserTie, FaMoneyBillWave } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-blue-100/30"
        style={{
          width: Math.random() * 100 + 50,
          height: Math.random() * 100 + 50,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, Math.random() * 100 - 50, 0],
          y: [0, Math.random() * 100 - 50, 0],
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

const ShowBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { newUser } = useContext(User);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.post('http://localhost:3500/fetch/bidsOnMe', {
          userId: newUser.userid,
        });
        setBids(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bids');
        setLoading(false);
      }
    };

    fetchBids();
  }, [newUser.userId]);

  const filteredBids = bids.filter(bid => 
    bid.startupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bid.investorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalBids: bids.length,
    totalAmount: bids.reduce((sum, bid) => sum + (bid.amount || 0), 0),
    avgEquity: bids.reduce((sum, bid) => sum + (bid.equity || 0), 0) / bids.length || 0
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <AnimatedBackground />
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 text-red-500">
      <AnimatedBackground />
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 pt-20 relative overflow-hidden">
      <AnimatedBackground />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto space-y-8 relative z-10"
      >
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl p-6 text-gray-800 border border-blue-100 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Bids</p>
                <h3 className="text-3xl font-bold">{stats.totalBids}</h3>
              </div>
              <FaChartLine className="text-3xl opacity-70" />
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl p-6 text-gray-800 border border-blue-100 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Amount</p>
                <h3 className="text-3xl font-bold">${stats.totalAmount.toLocaleString()}</h3>
              </div>
              <FaMoneyBillWave className="text-3xl opacity-70" />
            </div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-lg rounded-xl p-6 text-gray-800 border border-blue-100 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Average Equity</p>
                <h3 className="text-3xl font-bold">{stats.avgEquity.toFixed(1)}%</h3>
              </div>
              <FaUserTie className="text-3xl opacity-70" />
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Bids on My Startups</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search startups or investors..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {filteredBids.length === 0 ? (
            <div className="text-center py-12">
              <img 
                src="https://illustrations.popsy.co/gray/rocket.svg" 
                alt="No bids" 
                className="w-48 h-48 mx-auto mb-4"
              />
              <p className="text-xl text-gray-600">No bids found</p>
              <p className="text-gray-400">Try adjusting your search or wait for new bids</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gradient-to-r from-blue-100 to-indigo-100 text-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-lg">Startup Name</th>
                    <th className="px-6 py-4 text-left font-semibold text-lg">Investor Name</th>
                    <th className="px-6 py-4 text-left font-semibold text-lg">Bid Amount</th>
                    <th className="px-6 py-4 text-left font-semibold text-lg">Equity Offered</th>
                    <th className="px-6 py-4 text-left font-semibold text-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBids.map((bid, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      } hover:bg-gray-100 transition duration-200`}
                    >
                      <td className="px-6 py-4 text-gray-800 text-lg">{bid.startupName}</td>
                      <td className="px-6 py-4 text-gray-800 text-lg">{bid.investorName}</td>
                      <td className="px-6 py-4 text-gray-800 text-lg">
                        ${bid.amount ? bid.amount.toLocaleString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-800 text-lg">
                        {bid.equity ? `${bid.equity}%` : 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            bid.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : bid.status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {bid.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShowBids;
