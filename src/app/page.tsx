"use client";

import Particles from "@/components/magicui/particles";
import TypingAnimation from "@/components/magicui/typing-animation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <main className=" h-full w-screen">

      {/* Navbar Laptop */}

      <section className=" h-[7.5vh] w-screen fixed top-0 left-0 z-20 max-lg:hidden flex flex-row justify-between items-center px-12 overflow-hidden backdrop-blur-md border-b-[0.5px] border-gray-600">
        <Image src={"logo.svg"} alt="logo" priority width={120} height={120} />
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


      {/* Main Section */}

      <section className=" h-[50vh] w-full flex flex-col justify-center items-center gap-4 absolute top-[7.5vh] left-0 z-10 bg-transparent overflow-hidden p-2">
        <TypingAnimation text="TextyBit" duration={150} className=" text-[#E67E22] text-8xl max-lg:text-5xl font-semibold font-sans" />
        <TypingAnimation text="Chat with your documnets in a eligent way with just the power of your fingers" duration={20} className=" text-white text-2xl max-lg:text-xl font-medium" />
      </section>

      <Particles
        className=" bg-black absolute top-0 left-0 z-0 h-[300vh] w-full overflow-hidden"
        quantity={250}
        ease={80}
        color={"#ffffff"}
        refresh
      />
    </main>
  );
}
