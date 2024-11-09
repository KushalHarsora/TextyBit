"use client";

import React from 'react'
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
import { BackgroundLines } from '@/components/ui/background-lines';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "short password"
    }).max(100)
})

const Login: React.FC = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        console.log(values)
    }

    return (
        <React.Fragment>
            <BackgroundLines>
                <main className=' h-screen w-screen flex justify-center items-center'>
                    <div className=' w-1/3 h-1/2 flex flex-col justify-center items-center p-16 border border-gray-200 bg-transparent rounded-2xl gap-4 backdrop-blur-sm bg-opacity-10'>
                        <h1 className=' text-4xl font-bold underline decoration-wavy decoration-blue-300'>
                            SIGN IN
                        </h1>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type='email' placeholder="enter your email" {...field} />
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
                                                <Input type='password' placeholder="enter your password" {...field} />
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
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <div className=' flex justify-center items-center gap-4'>
                            <span>
                                Don&apos;t have an account?
                            </span>
                            <span>
                                <Button
                                    variant={'link'}
                                    onClick={() => router.push('/sign-up')}
                                >
                                    Sign-up
                                </Button>
                            </span>
                        </div>
                    </div>
                </main>
            </BackgroundLines>
        </React.Fragment>
    )
}

export default Login;