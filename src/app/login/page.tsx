"use client";

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
        message: "enter password"
    })
});

const Login = () => {

    const router = useRouter();

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
            {/* Navbar Laptop */}

            <section className=" h-[7.5vh] w-screen fixed top-0 left-0 z-20 max-lg:hidden flex flex-row justify-between items-center px-12 overflow-hidden backdrop-blur-md border-b-[0.5px] border-gray-600">
                <Image src={"logo.svg"} alt="logo" priority width={120} height={120} className=' cursor-pointer' onClick={() => router.push("/")} />
                <div className=" w-[15vw] h-full flex flex-row justify-around items-center">
                    <Button
                        variant={'default'}
                        className=" bg-transparent text-white text-sm hover:bg-transparent"
                        onClick={() => router.push("/login")}
                    >
                        Log in
                    </Button>
                    <Button
                        variant={"default"}
                        className=" text-white text-sm"
                        onClick={() => router.push("/register")}
                    >
                        Sign up
                    </Button>
                </div>
            </section>

            {/* Navbar Laptop End */}
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
            <div>
                <Link href={'/register'}>
                    <Button variant={'link'} className=' text-white text-sm'>Don&apos;t have an account? Sign Up</Button>
                </Link>
            </div>
        </main>
    )
}

export default Login