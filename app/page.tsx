import { Button } from "@/components/ui/button";
import React from "react";
import Particles from '@/components/ui/particles';

const Home = () => {

  const color = "#000000";

  return(
    <React.Fragment>
      <main className=" h-screen w-screen flex justify-center items-center">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
        <Button variant={'link'} className=" text-3xl">
          Texty Bit
        </Button>
      </main>
    </React.Fragment>
  )
}

export default Home;