"use client";

import React, { useState, useEffect } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner'
import axios, { AxiosResponse } from 'axios'
import { CircleArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface inputFormat {
    username: string,
    email: string,
}

const profileSchema = z.object({
    username: z.string().min(2, {
        message: "username is short",
    }).max(100),
    email: z.string().email(),
})

const Profile = () => {

    const router = useRouter();

    const [userDetails, setUserDetails] = useState<inputFormat>({
        username: "",
        email: "",
    });

    useEffect(() => {
        const getUserName = async () => {
            const response = await axios.get('/auth/profile')
            const { username, email } = response.data;
            setUserDetails({
                username: username,
                email: email,
            });
        }

        getUserName();
    }, [])

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        values: {
            username: userDetails.username,
            email: userDetails.email,
        },
    })

    const onSubmit = async (values: z.infer<typeof profileSchema>) => {
        try {
            const response: AxiosResponse = await axios.post("/auth/profile", { values }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;
            if (response.status === 201) {
                toast.success(data.message || "Registration successful!", {
                    duration: 1500
                });
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                console.log(status);
                if (status === 409) {
                    toast.error(data.error || "User Already exists", {
                        duration: 2500
                    })
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    duration: 2500
                });
            }
        }
    };

    return (
        <React.Fragment>
            <main className=' h-screen w-screen flex flex-col justify-center items-center gap-4'>
                {
                    (userDetails.username == "" && userDetails.email == "")
                        ?
                        <div className=' h-screen w-screen'>
                            Loading
                        </div>
                        :
                        <section>
                            <section className=' h-screen w-screen flex flex-col justify-center items-center px-16 gap-12'>
                                <span 
                                    className=' absolute top-[5vh] left-[5vw] h-fit w-fit scale-150 cursor-pointer'
                                    onClick={() => router.push("/dashboard")}
                                >
                                    <CircleArrowLeft />
                                </span>
                                <h1 className=' text-4xl font-medium'>
                                    Welcome <span className=' underline decoration-wavy decoration-slate-400 font-extrabold'>{userDetails.username}</span>
                                </h1>
                                <div className=' w-2/5 h-fit border drop-shadow-lg p-12 rounded-xl'>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                                            <FormField
                                                control={form.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className=' font-semibold'>Username</FormLabel>
                                                        <FormControl>
                                                            <Input type='text' placeholder="enter your name" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className=' font-semibold'>Email</FormLabel>
                                                        <FormControl>
                                                            <Input type='email' placeholder="enter your email" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className=' w-full flex justify-center items-center'>
                                                <Button
                                                    type="submit"
                                                    variant={'default'}
                                                    className=' w-3/5'
                                                >
                                                    Done
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            </section>
                        </section>
                }
            </main>
        </React.Fragment>
    )
}

export default Profile