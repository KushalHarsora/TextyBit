'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Home = () => {

  const router = useRouter();

  const handleToast = () => {
    router.push('/sign-in');
    toast.success("Sonner added", {
      duration: 1200,
    });
  }

  return(
    <React.Fragment>
      <main className=" h-screen w-screen flex justify-center items-center">
        <Button variant={'link'} className=" text-3xl" onClick={handleToast}>
          Texty Bit
        </Button>
      </main>
    </React.Fragment>
  )
}

export default Home;