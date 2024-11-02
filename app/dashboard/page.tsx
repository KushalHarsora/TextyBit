"use client";

import Navbar from "@/components/custom/navbar";
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

    const [file, setFile] = useState();

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
            <main className=" h-screen w-screen flex flex-col justify-center items-center overflow-y-scroll z-0">
                <Navbar />
                <div className=" top-[7vh] left-0 absolute h-[93vh] w-screen flex flex-row justify-center items-center">
                    <section className=" h-[93vh] w-3/5 bg-white flex justify-center items-center overflow-hidden">
                        {
                            (!file)
                                ?
                                <span>
                                    Upload File
                                </span>
                                :
                                <div className=" h-full w-full flex flex-col justify-center items-center">
                                    File is {file}
                                </div>
                        }
                    </section>
                    <section className=" h-[93vh] w-2/5 bg-slate-100">
                        {
                            (details.username == "" && details.email == "")
                                ?
                                <span className=" h-full w-full flex flex-col justify-center items-center">
                                    Loading
                                </span>
                                :
                                <div className=" h-full w-full flex flex-col justify-center items-center gap-2">
                                    <h1 className=" text-5xl font-bold">
                                        {details.username}
                                    </h1>
                                    <p>
                                        {details.email}
                                    </p>
                                </div>

                        }
                    </section>
                </div>
            </main>
        </React.Fragment>
    );
};

export default Dashboard;