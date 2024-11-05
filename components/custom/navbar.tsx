'use client';

import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <React.Fragment>
      <section className=' fixed top-0 left-0 h-[10vh] w-screen flex justify-center items-center bg-transparent z-10'>
        <nav className=' h-[7vh] w-3/5 bg-white rounded-lg drop-shadow-xl border border-slate-200 backdrop-blur'>
          <div className=' w-full h-full flex flex-row justify-between items-center'>
            <ul className=' flex flex-row justify-evenly items-center w-[90vw] h-full'>
              <li>
                <Button 
                  variant={'link'}
                  className=' text-base'
                >
                  Home
                </Button>
              </li>
              <li>
                <Button 
                  variant={'link'}
                  className=' text-base'
                >
                  About
                </Button>
              </li>
              <li>
                <Button 
                  variant={'link'}
                  className=' text-base'
                >
                  Contact
                </Button>
              </li>
            </ul>
            <span className=' h-full w-[10vw] flex justify-center items-center'>
              <Avatar className=' cursor-pointer'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
            </span>
          </div>
        </nav>
      </section>
    </React.Fragment>
  )
}

export default Navbar;