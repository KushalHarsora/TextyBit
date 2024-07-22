"use client";

import { Button } from '@/components/ui/button'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from '@tabler/icons-react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Home = ({ params }: { params: { id: string }}) => {

    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);

    const links = [
        {
          label: "Dashboard",
          href: "#",
          icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Profile",
          href: "#",
          icon: (
            <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Settings",
          href: "#",
          icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Logout",
          href: "#",
          icon: (
            <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
      ];

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
    <main className=' h-screen w-screen flex flex-col justify-center items-center gap-12 text-4xl'>
        <section className=' absolute left-0 top-0 h-screen w-fit cursor-pointer'>
        <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className=" justify-between gap-10 bg-transparent backdrop-blur-md border-b-[1px] border-gray-100">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className=' flex flex-col justify-center items-center'>
            {open ? <Image src={'/logo.svg'} alt='logo' width={120} height={100} priority/> : <></>}
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src={"logo.svg"}
                    priority
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      </section>
    </main>
  )
}

export default Home