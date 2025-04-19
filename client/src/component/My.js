import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { User } from '../context/User'

const My = () => {
    const {newUser} = React.useContext(User)
    const userid= newUser.userid
    const axios=useAxiosPrivate()
    const [startups, setStartups] = useState([])
    const [loading, setLoading] = useState(true)
    
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
        <div>
            <h2>My Startups</h2>
            {loading ? (
                <p>Loading startups...</p>
            ) : startups.length > 0 ? (
                <div>
                    {startups.map(startup => (
                        <div key={startup._id} className="startup-card">
                            <h3>{startup.name}</h3>
                            <p>Category: {startup.category}</p>
                            <p>Region: {startup.region}</p>
                            <p>Founded: {startup.foundedYear}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No startups found</p>
            )}
        </div>
    )
}

export default My
