"use client";

import React, { use } from 'react'
import {toast} from 'sonner'
import { useRouter } from 'next/navigation'
import {useState} from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react';
import { logOutAction } from '@/actions/users';

const LogOutButton = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        const {errorMessage} =await logOutAction();
        if(!errorMessage) {
            // Simulate an API call to logout
            toast.success('Logged out successfully!');
            router.push('/'); // Redirect to login page after logout
        } else{
            toast.error(`Error logging out: ${errorMessage}`);
        }
        setLoading(false);
    };
    
  return (
    <Button
    variant="outline"
    onClick={handleLogout}
    disabled={loading}
    className ="w-24">
    {loading ? <Loader2 className='animate-spin'/> : 'Logout'}
    </Button>
  )
}

export default LogOutButton