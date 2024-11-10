"use client";

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';


const Dashboard = () => {

    const router = useRouter();

    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const getUserName = async () => {
            const response = await axios.get('/auth/dashboard')
            const { username } = response.data;
            setUsername(username);
        }

        getUserName();
    }, [])

    // logout
    const handlelogout = async () => {
        try {
            await axios.get("/auth/logout")
                .then((res) => {
                    toast.success(res.data.message || "Logout Successful!", {
                        style: {
                            "backgroundColor": "#D5F5E3",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 1500
                    });
                    router.push("/sign-in");
                })
                .catch((error: unknown) => {
                    console.log(error);
                })
        } catch (error: unknown) {
            console.log(error);
        }
    };

  return (
    <React.Fragment>
        <main className=' h-screen w-screen flex flex-col justify-center items-center gap-4'>
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

            <Button variant={'destructive'} onClick={handlelogout}>
                Logout
            </Button>
        </main>
    </React.Fragment>
  )
}

export default Dashboard;