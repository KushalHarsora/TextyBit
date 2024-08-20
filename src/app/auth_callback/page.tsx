"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { useEffect } from "react";

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const origin = searchParams.get('origin');

    const { data, isLoading } = trpc.authCallback.useQuery();

    useEffect(() => {
        if (data?.success) {
            // user is synced to db
            router.push(origin ? `/${origin}` : '/dashboard');
        }
    }, [data, origin, router]);

    return (
        <div>
            {isLoading ? <p>Loading...</p> : <p>Redirecting...</p>}
        </div>
    );
};

export default Page;