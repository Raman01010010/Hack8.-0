import React from 'react'
import { useNavigate } from 'react-router-dom'

const ChooseUser = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Choose an Option</h1>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Register New Startup
          </button>
          <button
            onClick={() => navigate('/my-bids')}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Bids on My Startups
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChooseUser
