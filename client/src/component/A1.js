import React, { useContext, useEffect } from 'react';
import { User } from '../context/User';

const A1 = () => {
    const { newUser,setNewUser} = useContext(User);

    useEffect(() => {
        // Extract investorId from localStorage and save it to newUser.userid
        const investorId = localStorage.getItem('investorId');
        const token = localStorage.getItem('token');
        console.log("Hello ",investorId);

        if (investorId && token) {
            setNewUser((old)=>{
                return({
                    ...old,
                    investorId: investorId,
                    accessToken: token
                })
            })
            newUser.userid = investorId;
            newUser.accessToken = token;
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
