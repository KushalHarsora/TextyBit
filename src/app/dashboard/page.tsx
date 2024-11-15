"use client";

import FileUpload from '@/components/custom/fileUpload';
import Navbar from '@/components/custom/navbar';
import React from 'react';


const Dashboard = () => {

  return (
    <React.Fragment>
        <main className=' h-screen w-screen flex flex-col justify-center items-center gap-4'>
            <Navbar />
            <FileUpload />
        </main>
    </React.Fragment>
  )
}

export default Dashboard;