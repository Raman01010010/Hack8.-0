import React, { useContext, useEffect } from 'react';
import { User } from '../context/User';

const A1 = () => {
    const { newUser } = useContext(User);

    useEffect(() => {
        // Extract investorId from localStorage and save it to newUser.userid
        const investorId = localStorage.getItem('investorId');
        console.log("Hello ",investorId);

        if (investorId) {
            newUser.userid = investorId;
            newUser.investor =  "true";
        }
        console.log("A1 ",newUser);
    }, [newUser]);

    console.log(newUser);

    return (
        <div>
            
        </div>
    );
};

export default A1;
