"use client";

import { Button } from "@/components/ui/button"
import Globe from "@/components/ui/globe";
import HyperText from "@/components/ui/hyper-text";
import { ArrowBigRightDashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"

const Home: React.FC = () => {

  const router = useRouter();

  return (
    <React.Fragment>
      <main className=" h-screen w-screen flex flex-row justify-center items-center">
        <section className=" absolute top-0 left-0 h-[8vh] w-full border-b border-gray-200 flex flex-row justify-between items-center px-6 z-10">
          <span className=" backdrop-blur-lg">
            <Button
              className=" underline decoration-wavy decoration-orange-600 text-xl font-semibold"
              variant={'link'}
              onClick={() => router.push("/")}
            >
              TextyBit
            </Button>
          </span>
          <span className=" flex gap-6 items-center">
            <span>
              <Button
                className=" text-base"
                variant={'link'}
                onClick={() => router.push('/sign-in')}
              >
                Sign in
              </Button>
            </span>
            <span>
              <Button
                className=" rounded-lg"
                variant={'default'}
                onClick={() => router.push('/sign-up')}
              >
                Getting Started
                <ArrowBigRightDashIcon />
              </Button>
            </span>
          </span>
        </section>
        <section className=" absolute top-[8vh] left-0 h-[92vh] w-full flex justify-center items-center">
          <section className=" absolute left-0 h-full w-1/2 flex flex-col justify-center items-center gap-1 p-6">
            <h1 className=" text-5xl underline decoration-slate-300 decoration-dashed">
              <HyperText text="TextyBit" />
            </h1>
            <p className=" w-full text-wrap text-xl text-center">
              Unlock the Power of PDFs - Chat, Search, and Explore with Ease!
            </p>
            <Button
              className=" rounded-lg mt-6"
              variant={'default'}
              onClick={() => router.push('/sign-up')}
            >
              Getting Started
              <ArrowBigRightDashIcon />
            </Button>
          </section>
          <section className=" absolute top-0 left-[50vw] h-full w-1/2 overflow-hidden">
            <Globe />
          </section>
        </section>
      </main>
    </React.Fragment>
  )
}

export default Home;