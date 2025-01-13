"use client"

import React from 'react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription,  CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Link, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/use-fetch'
import { deleteEvent } from '@/actions/events'

const EventCard = ({event, username, isPublic=false}) => {
    const [isCopied, setIsCopied] = useState(false);
    const router = useRouter();
    const handleCopy = async ()=> {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`);
            setIsCopied(true);
            setTimeout(()=> setIsCopied(false), 2000)
        } catch (error) {
            console.error('fail to copy', error)
        }
    };
    const handleCardClick = (e)=> {
        if(e.target.tagName !== "BUTTON" && e.target.tagName !== 'svg') {
            window?.open(
                `${window?.location.origin}/${username}/${event.id}`,
                "_blank"
            );
        }
    };

    const { loading, fn: fnDeleteEvent} = useFetch(deleteEvent);

    const handleDelete = async() => {
        if(window?.confirm("Are you sure you want to delete the event")){
            await fnDeleteEvent(event.id);
            router.refresh();
        }
    }

  return (
    <Card className='flex flex-col justify-between cursor-pointer' onClick={handleCardClick} >
        <CardHeader>
            <CardTitle className='test-2xl'>{event.title}</CardTitle>
            <CardDescription className='flex justify-between'>
                <span>
                {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
                </span>
                <span>{event._count.bookings} Bookings</span>
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p>{event.description.substring(0, event.description.indexOf('.'))}</p>
        </CardContent>
       {!isPublic && (
        <CardFooter className='flex gap-2'>
            <Button className='flex items-center' onClick={handleCopy}> <Link className='mr-2 h-4 w-4'/>
                {isCopied ? "Copied" : "Copy Link"}
            </Button>
            <Button variant='destructive' onClick={handleDelete} disabled={loading}>
                {" "} 
                <Trash2 className='mr-2 h-4 w-4'/>
                    {loading ? "Deleting..." :"Delete Event"}
                </Button>
        </CardFooter>
        )}
    </Card>

  )
  
}

export default EventCard