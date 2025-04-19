import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { User } from '../context/User';
import { FaSearch, FaChartLine, FaUserTie, FaMoneyBillWave } from 'react-icons/fa';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-800 to-slate-900 text-white">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-800 to-slate-900 p-8 pt-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-white border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Bids</p>
                <h3 className="text-3xl font-bold">{stats.totalBids}</h3>
              </div>
              <FaChartLine className="text-3xl opacity-70" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-white border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Total Amount</p>
                <h3 className="text-3xl font-bold">${stats.totalAmount.toLocaleString()}</h3>
              </div>
              <FaMoneyBillWave className="text-3xl opacity-70" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 text-white border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">Average Equity</p>
                <h3 className="text-3xl font-bold">{stats.avgEquity.toFixed(1)}%</h3>
              </div>
              <FaUserTie className="text-3xl opacity-70" />
            </div>
          </div>
        </div>

        <div className="bg-white/[0.96] backdrop-blur-lg rounded-xl shadow-xl p-8">
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
                <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
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
        </div>
      </div>
    </div>
  );
};

export default ShowBids;
