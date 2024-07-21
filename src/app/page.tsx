"use client";

import { Button } from '@/components/ui/button'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const App = () => {

  const router = useRouter();

  return (
    <main className=' h-screen w-screen flex flex-col justify-center items-center z-0 overflow-x-hidden'>
      
      {/* Navbar Laptop */}
      
      <section className=' fixed top-0 left-0 h-[9vh] w-screen flex flex-row justify-center items-center overflow-hidden bg-transparent backdrop-blur-md z-10 border-b-[0.25px] border-gray-100'>
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

      <section className=' h-screen w-screen flex flex-col justify-center items-center'>
        <div className=' w-1/2'>
          <h1 className=' text-7xl font-semibold'>
            Chat with your &nbsp; <span className=' font-bold text-blue-700'>Documents</span> in seconds.
          </h1>
        </div>
      </section>
    </main>
  )
}

export default App