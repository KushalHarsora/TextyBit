"use client";

import Navbar from '@/components/custom/navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Dashboard = () => {

    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const getUserName = async () => {
            const response = await axios.get('/auth/dashboard')
            const { username } = response.data;
            setUsername(username);
        }

        getUserName();
    }, [])

  return (
    <React.Fragment>
        <main className=' h-screen w-screen flex flex-col justify-center items-center gap-4'>
            <Navbar />
            {
                (username == "")
                ?
                <span>
                    Loading
                </span>
                :
                <div className=' text-2xl'>
                    Hello, <span className=' font-bold underline decoration-wavy decoration-gray-400'>{username}</span>!
                </div>
            }
        </main>
    </React.Fragment>
  )
}

export default Dashboard;