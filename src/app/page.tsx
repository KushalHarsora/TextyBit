"use client";

import FlipText from '@/components/magicui/flip-text';
import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const App = () => {

  const router = useRouter();

  return (
    <main className=' h-screen w-screen flex flex-col justify-center items-center z-0 overflow-x-hidden'>
      
      {/* Navbar Laptop */}
      
      <section className=' fixed top-0 left-0 h-[9vh] w-screen flex flex-row justify-center items-center overflow-hidden bg-transparent backdrop-blur-md z-20 border-b-[0.25px] border-gray-100'>
        <div className=' h-fit w-[20vw] overflow-hidden flex justify-center items-center'>
          <Image src={'logo.svg'} alt='logo' width={120} height={120}/>
        </div>
        <div className=' h-full w-[50vw] flex flex-row justify-center items-center'>
          <Button variant={'link'}>Pricing</Button>
          <Button variant={'link'}>Affiliate</Button>
          <Button variant={'link'}>Careers</Button>
        </div>
        <div className=' h-full w-[30vw] flex flex-row justify-center items-center gap-4'>
          <Button variant={'default'} className=' text-sm font-normal rounded-md' onClick={() => router.push('/login')}>Log in</Button>
          <Button variant={'ghost'} className=' text-sm font-normal rounded-md' onClick={() => router.push('/register')}>Sign Up</Button>
        </div>
      </section>

      {/* Navbar Laptop End */}

      {/* Main Section */}

      <section className=' h-fit w-screen relative top-[9vh] left-0 flex flex-col justify-center items-center'>
        <div className=' flex flex-col justify-center items-center gap-8 w-4/5'>
          <button className=' bg-white text-black rounded-md shadow-md p-2 px-3 font-semibold text-sm cursor-default'>TextyBit is now Public</button>
          <div className=' flex flex-col justify-center items-center gap-0'>
          <h1 className=' text-7xl font-semibold'>
            Chat with your
          </h1>
          <h1 className=' text-7xl font-semibold flex flex-row'>
            <FlipText word='Documents' className=' font-bold text-blue-700'></FlipText>
            <span>&nbsp;in seconds.</span>
          </h1>
          </div>
          <Button className=' bg-white text-black rounded-md shadow-md shadow-gray-300 hover:text-white hover:bg-black hover:font-medium max-lg:hover:text-black max-lg:hover:bg-white' onClick={() => router.push("/register")}>
            Getting Started
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </Button>
        </div>
      </section>

      {/* Main Section End */}

      {/* <section className=' h-screen w-screen relative top-[100vh] left-0 px-16'>
        <p className=' font-medium text-wrap'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem laboriosam iste commodi in autem recusandae illo voluptates, suscipit ex ipsa molestias exercitationem consequuntur odio natus nobis praesentium totam maxime amet.</p>
      </section> */}

    </main>
  )
}

export default App