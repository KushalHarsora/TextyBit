"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { LayoutDashboard, ReceiptIndianRupee, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import axios from 'axios';
import { toast } from 'sonner';

const Home = ({ params }: { params: { id: string } }) => {

  const router = useRouter();

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
          router.push("/login");
        })
        .catch((error: any) => {
          console.log(error);
        })
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <main className=' h-screen w-screen flex flex-row justify-center items-center text-4xl'>
      <section className=' fixed top-0 left-0 h-[9vh] w-screen flex flex-row justify-center items-center overflow-hidden bg-transparent backdrop-blur-md z-20 border-b-[0.25px] border-gray-100'>
        <div className=' h-fit w-1/2 overflow-hidden flex justify-center items-center'>
          <Image src={"/logo.svg"} alt='logo' width={120} height={120} priority />
        </div>
        <div className=' h-full w-1/2 flex flex-row justify-center items-center gap-4'>
          <Button variant={'link'} className=' max-lg:hidden' onClick={() => router.push(`/dashboard/${params.id}`)}>
            Dashboard
          </Button>
          <span className=' cursor-pointer'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt='user icon' />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=' w-40'>
              <DropdownMenuLabel className=' text-center font-bold'>{params.id != undefined && params.id?.length < 8 ? params.id?.charAt(0).toUpperCase() + params.id?.slice(1).toLowerCase() : "Profile"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className=' cursor-pointer lg:hidden' onClick={() => router.push(`/dashboard/${params.id}`)}>
                  <div className=' flex flex-row justify-between items-center gap-2'>
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/billing/${params.id}`)}>
                  <div className=' flex flex-row justify-between items-center gap-2'>
                    <User />
                    <span>Profile</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className=' cursor-pointer' onClick={() => router.push(`/billing/${params.id}`)}>
                  <div className=' flex flex-row justify-between items-center gap-2'>
                    <ReceiptIndianRupee />
                    <span>Billing</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className=' px-2 py-1 flex items-center justify-center'>
                <Button className=' w-full h-fit' onClick={handlelogout}>Logout</Button>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </span>
        </div>
      </section>
      <section className=' absolute top-[9vh] left-0 h-[91vh] w-screen flex flex-row justify-center items-center'>
        <div className=' w-3/5 h-full bg-slate-100'>

        </div>
        <div className=' w-2/5 h-full bg-slate-300'>

        </div>
      </section>
    </main>
  )
}

export default Home