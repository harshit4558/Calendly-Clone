"use client"

import { timeSlots } from '@/app/(main)/availability/data'
import { bookingSchema } from '@/app/_lib/validators'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import "react-day-picker/style.css"
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import useFetch from '@/hooks/use-fetch'
import { createBooking } from '@/actions/bookings'
const BookingForm = ({ event,availability }) => {

    const [ selectedDate, setSelectedDate ] = useState(null);
    const [ selectedTime, setSelectedTime ] = useState(null);

    const {register, handleSubmit,formState:{ errors } , setValue} = useForm({
        resolver : zodResolver(bookingSchema)
    })

    const availableDays = availability.map((day) => new Date(day.date));
    const timeSlots = selectedDate ? availability.find((day) => 
        day.date === format(selectedDate , "yyyy-MM-dd")
    )?.slots ||[]
    : [];

    const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

    const onSubmit = async (data) => {
        console.log(data);
        if(!selectedDate || !selectedTime){
            console.error("Date or time is not selected");
        }
        const startTime = new Date(
            `${format(selectedDate, "yyyy-Mm-dd")}T${selectedTime}`
        );
        const endTime = new Date(startTime.getTime() + event.duration * 60000);

        const bookingData = {
            eventId : event.id,
            name : data.name,
            email : data.email,
            startTime : startTime.toISOString(),
            endTime : endTime.toISOString(),
            additionalInfo : data.additionalInfo
        }
        await fnCreateBooking(bookingData);
    }
    if(data){
        return <div className='text-center p-10 border bg-white ' >
            <h2 className='text-2xl font-bold mb-4'>Booking Succesfull</h2>
            {data.meetLink && (
                <p>
                    Join the meeting : {" "}
                    <a
                        href={data.meetLink}
                        target="_blank"
                        rel='noopener noreferrer'
                        className='text-blue-500 hover:underline'
                    >
                        {data.meetLink}
                    </a>
                </p>
            )}
        </div>
    }
    useEffect(()=> {
        if(selectedDate){
            setValue('date', format(selectedDate, "yyyy-MM-dd"))
        }
    },[selectedDate])
    useEffect(()=> {
        if(selectedTime){
            setValue('time', selectedTime)
        }
    },[selectedTime])


    return <div className='flex flex-col gap-8 p-10 border bg-white '>
        <div className='md:h-96 flex flex-col md:flex-row gap-5'>
            <div className='w-full'>
                <DayPicker mode='single' selected={selectedDate}
                    onSelect={(date) =>{ 
                        setSelectedDate(date)
                        setSelectedTime(null)
                        console.log(selectedDate);
                        // console.log(availability);
                        // console.log(timeSlots);
                    }
                    }
                    disabled={[{ before: new Date() }]}
                    modifiers={{
                        available : availableDays
                    }}
                    modifiersStyles={{
                        available:{
                            backgroundColor: 'lightblue',
                            borderRadius : 100
                        }
                    }}
                />
            </div>
            <div className='w-full h-full md:overflow-scroll no-scrollbar'>
                {selectedDate && (
                    <div className='mb-4'>
                        <h3 className='text-lg mb-2 font-semibold'>Available Time Slots</h3>
                        <div className='grid grid-cols-2 lg:grid-cols-3 gap-2'>
                            {timeSlots.map((slot) => (

                                <Button key={slot} onClick={() => setSelectedTime(slot)}
                                variant={selectedTime === slot ? 'default' : 'outline'}
                                >
                                    {slot}
                                </Button>
                                
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
        {selectedTime && (
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
             <div>
                <Input {...register("name")} placeholder="Your Name"/>
                {errors.name && (
                    <p className='text-red-500 text-sm'>{errors.name.message}</p>
                )}
             </div>   
             <div>
                <Input {...register("email")} placeholder="Your Email"/>
                {errors.email && (
                    <p className='text-red-500 text-sm'>{errors.email.message}</p>
                )}
             </div>
             <div>
                <Textarea 
                    {...register("additionalInfo")}
                    placeholder="Additional Information"
                />
             </div>
             <Button type= "submit" disabled={loading} className='w-full'>{loading ? "Scheduling" : "Schedule Event"}</Button>
            </form>)}
    </div>
}

export default BookingForm