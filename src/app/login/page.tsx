"use client";

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Form Schema
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "password needed"
    })
})

const Login = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof loginSchema>) => {
        try {
            const response: AxiosResponse = await axios.post('/auth/user/login', { values },  {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            
            if (response.status === 200) {
                toast.success(data.message || "Login successful!", {
                    style: {
                        "backgroundColor": "#D5F5E3",
                        "color": "black",
                        "border": "none"
                    },
                    duration: 1500
                });

                const username = data.name.split(" ");
                var name = "";
                
                for(let i = 0; i < username.length; i++) {
                    name += username[i];
                }

                router.push(`/home/${name.toLowerCase()}`);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                console.log(status);
                if (status === 401) {
                    toast.error(data.error || "User does not Exists", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    })
                    router.push("/register");
                } else if (status === 409) {
                    toast.error(data.error || "Invalid Credentials", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    });
                    form.resetField('password');
                } else {
                    toast.error(data.error || "Some Error Occured", {
                        style: {
                            "backgroundColor": "#FADBD8",
                            "color": "black",
                            "border": "none"
                        },
                        duration: 2500
                    });
                    form.reset();
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    invert: false,
                    duration: 2500
                });
            }
        }
    };

    return (
        <main className=' h-screen w-screen flex flex-col justify-center items-center gap-4'>
            <div className=' flex flex-col justify-center items-center gap-2'>
                <h1 className=' text-5xl max-lg:text-3xl font-semibold max-lg:font-bold'>
                    Welcome Back
                </h1>
                <h2 className=' text-sm max-lg:text-xs font-medium'>
                    Log in into your account
                </h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4 w-1/4 max-lg:w-4/5 max-w-[300px]">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder="name@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="enter password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' variant={'default'} className=' w-full h-fit'>
                        Log in
                    </Button>
                </form>
            </Form>
            <div>
                <Button variant={'link'} className=' text-sm' onClick={() => router.push("/register")}>
                    Don&apos;t have an account? <span className=' font-bold px-2'>Sign in</span>
                </Button>
            </div>
        </main>
    )
}

export default Login