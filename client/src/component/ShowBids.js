import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { User } from '../context/User';

const ShowBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8 pt-20">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Bids on My Startups</h1>
        {bids.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-6 text-center text-gray-600">
            No bids received yet
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">Startup Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Investor Name</th>
                  <th className="px-6 py-3 text-left font-semibold">Bid Amount</th>
                  <th className="px-6 py-3 text-left font-semibold">Equity Offered</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((bid, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100 transition duration-200`}
                  >
                    <td className="px-6 py-4 text-gray-800">{bid.startupName}</td>
                    <td className="px-6 py-4 text-gray-800">{bid.investorName}</td>
                    <td className="px-6 py-4 text-gray-800">
                      ${bid.amount ? bid.amount.toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {bid.equity ? `${bid.equity}%` : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
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
  );
};

export default ShowBids;
