import React from 'react';
import ChatSection from '@/components/custom/chatSection';
import FileUpload from '@/components/custom/fileUpload';
import Navbar from '@/components/custom/navbar';

const Dashboard = () => {

  return (
    <React.Fragment>
        <main className=' h-screen w-screen flex flex-col justify-center items-center gap-4'>
            <Navbar />
            <FileUpload />
            <ChatSection />
        </main>
    </React.Fragment>
  )
}

export default Dashboard;