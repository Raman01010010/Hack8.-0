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
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">My Startups</h2>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : startups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {startups.map(startup => (

                        <div key={startup._id} 
                             className="startup-card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
                             onClick={() => navigate(`/img1/${startup._id}`)}>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{startup.name}</h3>
                                <div className="space-y-2 text-gray-600">
                                    <p className="flex items-center">
                                        <span className="font-medium mr-2">Category:</span> 
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{startup.category}</span>
                                    </p>
                                    <p><span className="font-medium">Region:</span> {startup.region}</p>
                                    <p><span className="font-medium">Founded:</span> {startup.foundedYear}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
                    <p className="text-gray-600 text-lg">No startups found</p>
                    <p className="mt-2 text-blue-500">Create your first startup to see it here</p>
                </div>
            )}
        </div>
    )
}

export default My
