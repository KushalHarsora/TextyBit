"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import { ReceiptIndianRupee, User } from 'lucide-react';

const Navbar = () => {

  const router = useRouter();

  const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const getUserName = async () => {
            const response = await axios.get('/auth/dashboard')
            const { username } = response.data;
            setUsername(username);
        }

        getUserName();
    }, [])

  // logout
  const handlelogout = async () => {
    try {
      await axios.get("/auth/logout")
        .then((res) => {
          toast.success(res.data.message || "Logout Successful!", {
            style: {
              "backgroundColor": "#D5F5E3",
              "color": "black",
              "border": "none"
            },
            duration: 1500
          });
          router.push("/sign-in");
        })
        .catch((error: unknown) => {
          console.log(error);
        })
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <section className=' fixed top-0 left-0 h-[10vh] w-full flex justify-center items-center'>
        <div className=' h-[8vh] w-1/2 rounded-xl flex justify-around items-center border drop-shadow-xl z-10'>
          <span>
            <h1 className=' underline decoration-wavy decoration-orange-600 text-lg font-semibold'>
              Texty Bit
            </h1>
          </span>
          <span>
            <Button variant={'link'}>
              Home
            </Button>
            <Button variant={'link'}>
              About
            </Button>
            <Button variant={'link'}>
              Contact
            </Button>
          </span>
          <span className=' cursor-pointer'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt='user icon' />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=' w-40'>
                <DropdownMenuLabel>{username != undefined && username?.length < 8 ? username?.toLowerCase() : "Profile"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/profile`)}>
                    <div className=' flex flex-row justify-between items-center gap-2'>
                      <User />
                      <span>Profile</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/billing`)}>
                    <div className=' flex flex-row justify-between items-center gap-2'>
                      <ReceiptIndianRupee />
                      <span>Billing</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className=' px-2 py-1 flex items-center justify-center'>
                  <Button 
                    variant={'destructive'}
                    className=' w-full h-fit' 
                    onClick={handlelogout}
                  >
                    Logout
                  </Button>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Navbar