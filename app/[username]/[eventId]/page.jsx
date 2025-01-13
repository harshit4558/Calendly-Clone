import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import { getUserByUsername } from '@/actions/users';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import EventCard from '@/components/event-card';
import { getEventDetails } from '@/actions/events';
import { getEventAvailability } from '@/actions/availability';
import EventDetails from './_components/event-details';
import BookingForm from './_components/booking-form';


export async function generateMetadata({params}){
    const { username, eventId } = await params;
    const event = await getEventDetails(username, eventId);
    if(!event){
        return {
            title : "Event Not Found",
        }
    }
    return{
        title : ` Book ${event.title} with ${event.user.name} || Slotify`,
        description :`Schedule a ${event.duration}  minute event with ${event.user.name}`
    }

}

const EventPage = async({ params }) => {

    const { username, eventId } = await params;
    const event = await getEventDetails(username, eventId);
    const availability = await getEventAvailability(eventId);
    // console.log(availability);
    if(!event){
        notFound();
    }
    return (
        <div className='flex flex-col justify-center lg:flex-row px-4 py-8'>
            <EventDetails event={event}/>
            <Suspense fallback={<div>Loading Booking Form...</div>}>
                <BookingForm event={event} availability={availability}/>
            </Suspense>
        </div>
    )
        
}

export default EventPage