'use client';

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React from 'react'

const Home = () => {

  const router = useRouter();

  return (
    <React.Fragment>
      <main className=' h-screen w-screen flex justify-center items-center'>
        <Button variant={'link'} className=' text-5xl' onClick={() => router.push("/")}>
          Texty Bit
        </Button>
      </main>
    </React.Fragment>
  )
}

export default Home