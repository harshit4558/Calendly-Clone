import { getUserEvents } from '@/actions/events'
import React, { Suspense } from 'react'
import EventCard from '@/components/event-card'

export default function EventsPage() {
    return (
        <Suspense fallback={<div> Loading Events...</div>}>
            <Events/>
        </Suspense>
    )
}

const Events = async() => {
    const {events, username} = await getUserEvents()
    console.log(events);
    if(events.length ===0 ){
        return <p> You have&apos;t created any events yet</p>
    }

    return <div className='grid gap-4 grid-cols-1 lg:grid-cols-2'>
        {events.map((event) => (
            <EventCard key ={event.id} event={event} username ={username}/>
        ))}

    </div>
}

