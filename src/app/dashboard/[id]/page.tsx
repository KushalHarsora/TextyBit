"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Cloud, LayoutDashboard, ReceiptIndianRupee, User } from 'lucide-react';
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
import Dropzone from "react-dropzone";
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const Dashboard = ({ params }: { params: { id: string } }) => {

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

    const UploadDropZone = () => {
        return(
            <Dropzone multiple={false} onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps, acceptedFiles}) => (
                    <div
                        {...getRootProps()}
                        className=' border-[2px] h-48 p-1 border-dotted border-gray-300 rounded-lg'
                    >
                        <div className=' h-full w-full flex justify-center items-center'>
                            <label
                                htmlFor='dropzone-file'
                                className=' h-full w-full flex flex-col justify-center items-center rounded-xl bg-gray-100 cursor-pointer'    
                            >
                                <div className=' flex flex-col justify-center items-center pt-5 pb-6'>
                                    <Cloud className=' h-6 w-6 text-zinc-500 mb-2' />
                                    <p className=' mb-1 text-sm text-zinc-700'>
                                        <span className=' font-semibold'>Click to Upload</span>
                                        {' '}
                                        or drag and drop
                                    </p>
                                    <p className=' text-xs text-zinc-500'>PDF (upto <span className=' font-semibold'>4MB</span>)</p>
                                </div>
                            </label>
                        </div>
                    </div>
                )}
            </Dropzone>
        )
    }

    return (
        <main className=' h-screen w-screen'>
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
            <section className=' h-[91vh] w-screen absolute top-[9vh] left-0 flex flex-col justify-evenly items-center'>
                <div className=' h-[15vh] w-screen flex flex-row justify-around items-center'>
                    <p className=' text-5xl max-lg:text-2xl font-bold'>My Files</p>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'default'} className=' font-medium'>Upload</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Upload File</DialogTitle>
                                <DialogDescription>drag and drop your pdf files here.</DialogDescription>
                            </DialogHeader>
                            <div className=' h-48 w-full'>
                                <UploadDropZone />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <Separator orientation={'horizontal'} className=' h-[1px] w-screen' />
                <div className=' h-[76vh] w-screen bg-green-100'>

                </div>
            </section>
        </main>
    )
}

export default Dashboard