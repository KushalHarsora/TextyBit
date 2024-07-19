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
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "enter password"
    })
});

const Login = () => {

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        console.log(values)
    }


    return (
        <main className=' h-screen w-screen bg-black text-white flex flex-col justify-center items-center gap-6'>
            <div className=' flex flex-col justify-center items-center gap-1'>
                <h1 className=' text-3xl max-lg:text-2xl font-semibold'>
                    Welcome Back
                </h1>
                <h2 className=' text-sm max-lg:text-xs font-medium text-gray-400'>
                    Login into your account
                </h2>
            </div>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-4 max-lg:space-y-6 w-[25vw] max-w-[30vw] max-lg:max-w-[300px] max-lg:w-3/5 max-lg:min-w-[250px]"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='email' className=' w-full h-full px-3 py-2 border-[0.125px] border-gray-400' placeholder="name@example.com" {...field} />
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
                                <FormControl>
                                    <Input type='password' className=' w-full h-full px-3 py-2 border-[0.125px] border-gray-400' placeholder="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className=' w-full bg-white text-black text-sm hover:bg-slate-200' type='submit'>
                        Login
                    </Button>

                </form>
            </Form>
        </main>
    )
}

export default Login