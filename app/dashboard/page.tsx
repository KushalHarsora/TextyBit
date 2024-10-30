"use client";

import { Button } from "@/components/ui/button";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";


const Dashboard = () => {

    const router = useRouter();

    const [details, setDetails] = useState({
        username: "",
        email: ""
    });

    useEffect(() => {
        const getUserDetails = async () => {
            const response: AxiosResponse = await axios.get('/auth/user-details');
            setDetails({
                username: response.data.username,
                email: response.data.email
            });
            console.log(response.data);
        }

        getUserDetails()
    }, []);


    // Handle Sign-out
    const handlelogout = async () => {
        try {
            await axios.get("/auth/sign-out")
                .then((res) => {
                    toast.success(res.data.message || "Sign out Successful!", {
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
            <main className="h-screen w-screen flex flex-col justify-center items-center gap-2 text-5xl">
                {details?.username}
                <span className=" text-sm">
                    {details?.email}
                </span>

                <Button className=" text-base" variant={'destructive'} onClick={handlelogout}>
                    Sign out
                </Button>
            </main>
        </React.Fragment>
    );
};

export default Dashboard;
