"use client"

import React from 'react'
import { Carousel,CarouselContent,CarouselItem } from './ui/carousel';
import { Card, CardContent } from './ui/card';
import Autoplay from 'embla-carousel-autoplay';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content:
        "Schedulrr has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "David Lee",
      role: "Freelance Designer",
      content:
        "As a freelancer, Schedulrr helps me stay organized and professional. My clients love how easy it is to book time with me.",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Emily Chen",
      role: "Startup Founder",
      content:
        "Schedulrr streamlined our hiring process. Setting up interviews has never been easier!",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Michael Brown",
      role: "Sales Executive",
      content:
        "I've seen a 30% increase in my meeting bookings since using Schedulrr. It's a game-changer for sales professionals.",
      image: "https://i.pravatar.cc/150?img=4",
    },
  ];

const Testimonial = () => {
  return(
  <Carousel plugins={[
    Autoplay({
      delay: 2000,
    })
  ]} className="w-full max-auto">
  <CarouselContent>
    {testimonials.map((test,index) => (
      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
        
          <Card className="h-full">
            <CardContent className="flex flex-col h-full justify-between p-6">
                <p className='tex-gray-600 mb-4'>
                    &quot;{test.content}&quot;
                </p>
                <div className='flex items-cnter mt-4'>
                    <Avatar>
                        <AvatarImage src={test.image}
                        alt={test.name}
                        ></AvatarImage>
                        <AvatarFallback>{test.name.split(" ").map((n) =>n[0]).join("") }</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='font-semibold'>{test.name}</p>
                        <p className='text-sm text-gray-500'>{test.role}</p>
                    </div>
                </div>
            </CardContent>
          </Card>
       
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
  )
}


export default Testimonial