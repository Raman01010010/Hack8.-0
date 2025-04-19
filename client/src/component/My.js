import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { User } from '../context/User'
import { Navigate, useNavigate } from 'react-router-dom'

const My = () => {
    const {newUser} = React.useContext(User)
    const userid= newUser.userid
    const axios=useAxiosPrivate()
    const [startups, setStartups] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchStartups = async () => {
            try {
                const response = await axios.post('/startups/getStartupsByUser', { userid });
                setStartups(response.data.data);
            } catch (error) {
                console.error('Error fetching startups:', error);
            } finally {
                setLoading(false);
            }
        };
        
        if (userid) {
            fetchStartups();
        }
    }, [axios, userid]);
   
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-800">My Startups</h2>
                <button 
                    onClick={() => navigate('/my-bids')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                    <span>View My Bids</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : startups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {startups.map(startup => (
                        <div key={startup._id} 
                             className="startup-card bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
                             onClick={() => navigate(`/img1/${startup._id}`)}>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{startup.name}</h3>
                                <div className="space-y-3 text-gray-600">
                                    <p className="flex items-center">
                                        <span className="font-medium mr-2">Category:</span> 
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">{startup.category}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <span className="font-medium mr-2">Region:</span> 
                                        <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">{startup.region}</span>
                                    </p>
                                    <p className="flex items-center">
                                        <span className="font-medium mr-2">Founded:</span> 
                                        <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">{startup.foundedYear}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                                <span className="text-blue-600 font-medium">View Details →</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <div className="mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <p className="text-gray-600 text-lg font-medium">No startups found</p>
                    <p className="mt-2 text-gray-500">Create your first startup to see it here</p>
                    <button 
                        onClick={() => navigate('/create-startup')} 
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Create a Startup
                    </button>
                </div>
            )}
        </div>
    )
}

export default My
