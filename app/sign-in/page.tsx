'use client';

import React from "react";
import Particles from '@/app/components/ui/particles';
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation";
import axios, { AxiosResponse } from "axios";

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

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response: AxiosResponse = await axios.post('/auth/sign-in', { values }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;

      if (response.status === 200) {
        toast.success(data.message || "Sign-in successful!", {
          style: {
            "backgroundColor": "#D5F5E3",
            "color": "black",
            "border": "none"
          },
          duration: 1500
        });
        const username = data.name.replace(/\s+/g, '').toLowerCase().trim();
        router.push(`/dashboard/${username}`);
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
          router.push("/sign-up");
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
              onClick={() => { router.push('/sign-up') }}
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