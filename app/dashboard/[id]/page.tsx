"use client";

import React from "react";

const Dashboard = ({ params }: { params: { id: string } }) => {
    return (
        <React.Fragment>
            <main className=" h-screen w-screen flex justify-center items-center text-5xl">
                {params.id}
            </main>
        </React.Fragment>
    )
}

export default Dashboard;