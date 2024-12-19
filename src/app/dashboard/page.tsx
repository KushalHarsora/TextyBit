import React from 'react';
import ChatSection from '@/components/custom/chatSection';
import FileUpload from '@/components/custom/fileUpload';
import Navbar from '@/components/custom/navbar';
import { Separator } from '@/components/ui/separator';

const Dashboard = () => {

  return (
    <React.Fragment>
        <main className=' h-screen w-screen flex flex-col justify-center items-center gap-4'>
            <Navbar />
            <FileUpload />
            <Separator className=' absolute top-[10vh] h-[90vh] bg-blue-200 z-10' orientation='vertical' />
            <ChatSection />
        </main>
    </React.Fragment>
  )
}

export default Dashboard;