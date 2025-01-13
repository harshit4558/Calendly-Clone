"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usernameSchema } from '@/app/_lib/validators';
import useFetch from '@/hooks/use-fetch';
import { updateUsername } from '@/actions/users';
import { BarLoader } from 'react-spinners';


const Dashboard = () => {
    const [curUrl, setCurUrl] = useState('');
    useEffect(() => {
        setCurUrl(window.location.origin);
    },[])
    
    const { isLoaded, user } = useUser();
    const { register,handleSubmit,setValue,formState:{errors} } = useForm({
        resolver: zodResolver(usernameSchema)
    });
    
    useEffect(()=> {
        setValue('username',user?.username )
    },[isLoaded]);

    const {loading, error, fn: fnUdateUsername} = useFetch(updateUsername);

    const onSubmit = async (data) => {
        fnUdateUsername(data.username);
    }

    return (
        <div className='space-y-8'>   
            <Card>
                <CardHeader>
                    <CardTitle>
                        Welcome, {user?.firstName}
                    </CardTitle>
                </CardHeader>
                {/* latest Updates */}
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Your unique Link
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' >
                        <div>
                            <div className='flex items-center gap-2'>
                                <span>{curUrl}/</span>
                                <Input {...register("username")} placeholder = "Username" />
                            </div>

                            {errors.username && (
                                <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>
                            )}
                            {error && (
                                <p className='text-red-500 text-sm mt-1'>{error?.message}</p>
                            )}
                        </div>
                        {loading && <BarLoader className='mb-4' width={"100%"} color='#36d7b7'/>}
                        <Button type="submit"> Update username</Button>
                    </form>
                </CardContent>
            </Card>

        </div>  
    )
}

export default Dashboard