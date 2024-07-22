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
const registerSchema = z.object({
    username: z.string().min(2, {
        message: "username needed"
    }),
    email: z.string().email(),
    password: z.string().min(8, {
        message: "password needed"
    })
})

const Register = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        try {
            const response: AxiosResponse = await axios.post("/auth/user/register", { values }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;
            if (response.status === 201) {
                toast.success(data.message || "Registration successful!", {
                    duration: 1500
                });
                router.push("/login");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                console.log(status);
                if (status === 409) {
                    toast.error(data.error || "User Already exists", {
                        duration: 2500
                    })
                    router.push("/login");
                }
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    duration: 2500
                });
            }
        }
    };

    return (
        <main className=' h-screen w-screen flex flex-col justify-center items-center gap-4'>
            <div className=' flex flex-col justify-center items-center gap-2 max-lg:gap-1'>
                <h1 className=' text-5xl max-lg:text-3xl font-semibold max-lg:font-bold'>
                    Welcome to TextyBit
                </h1>
                <h2 className=' text-sm max-lg:text-xs font-medium'>
                    Sign up for an account
                </h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2 w-1/4 max-lg:w-4/5 max-w-[300px]">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type='text' placeholder="John Doe" {...field} />
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
                        Sign up
                    </Button>
                </form>
            </Form>
            <div>
                <Button variant={'link'} className=' text-sm' onClick={() => router.push("/login")}>
                    Already have an account? <span className=' font-bold px-2'>Log in</span>
                </Button>
            </div>
        </main>
    )
}

export default Register