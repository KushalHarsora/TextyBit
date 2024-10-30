'use client';

import React from "react";
import Particles from '@/components/ui/particles';
import { toast } from "sonner";
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password Required",
  })
})

const Home = () => {

  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
    toast.success("Login Success", {
      duration: 1500,
    });
  }

  return (
    <React.Fragment>
      <main className=" h-screen w-screen flex justify-center items-center">
        <Particles
          className="absolute inset-0 z-0"
          quantity={800}
          ease={100}
          color={"#000"}
          refresh
        />
        <section className=" h-fit w-1/3 flex flex-col justify-normal items-center z-10 gap-8 bg-transparent border backdrop-blur-[6px] rounded-xl p-12">
          <h1 className=" font-bold text-5xl underline decoration-wavy decoration-red-500">
            SIGN-IN
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className=" py-5" type="email" placeholder="email" {...field} />
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
                      <Input className=" py-5" type="password" placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex justify-center items-center">
                <Button className=" w-2/4 font-bold text-base rounded-lg py-5" variant={'default'} type="submit">Submit</Button>
              </div>
            </form>
          </Form>
          <div className=" w-full flex justify-center items-center gap-4 text-lg">
            Don&apos;t have an account? 
            <Button 
              className=" text-lg underline decoration-wavy decoration-slate-500" 
              variant={'ghost'}
              onClick={() => {router.push('/sign-up')}} 
            >
              sign-up
            </Button>
          </div>
        </section>
      </main>
    </React.Fragment>
  )
}

export default Home;