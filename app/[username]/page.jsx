import { notFound } from 'next/navigation';
import React from 'react'
import { getUserByUsername } from '@/actions/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EventCard from '@/components/event-card';


export async function generateMetadata({params}){
   const { username } = await params;
   const user = await getUserByUsername(username);
    if(!user){
        return {
            title : "User Not Found",
        }
    }
    return{
        title : `${user.name}'s Profile || Slotify`,
        description : `Book an event with ${user.name}. View public events and schedules`
    }

}

const UserPage = async({ params }) => {
    const { username } = await params;
    const user = await getUserByUsername(username);
    console.log(username)
    if(!user){
        notFound();
    }
    return <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col items-center mb-8'>
            <Avatar className='w-24 h-24 mb-4'>
                <AvatarImage src={user.imageUrl} alt={user.name}/>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className='text-3xl font-bold mb-2'>{user.name}</h1>
            <p className='text-gray-500 text-center'>
                Welcome to my scheduling page, please select an event below to book a time with me.
            </p>
        </div>
        {user.events.length === 0 ? (
            <p className='text-center text-gray-600'> No public events available</p>
        ) : (
            <div className='grid gap-5 md: grid-cols-2 lg:grid-cols-3'>
                {user.events.map((event)=>{
                    return <EventCard
                    key={event}
                    event={event}
                    username = {username}
                    isPublic
                    />
                })}
            </div>
        ) }
    </div>
}

export default UserPage