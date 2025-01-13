"use client"
import EventForm from './event-form'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"

import {  useRouter, useSearchParams } from 'next/navigation';
  

export default function CreateEventDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const create = searchParams.get("create");
        if(create==='true'){
            setIsOpen(true);
        }
    },[searchParams])

    const handleClose = () => {
        setIsOpen(false);
        if(searchParams.get("create")==='true'){
            router.replace(window?.location.pathname);
        }
    }
  return (
    <Drawer open={isOpen} close={handleClose}>
      <DrawerContent>
        
          <DrawerHeader>
            <DrawerTitle>Create New Event</DrawerTitle>
            
          </DrawerHeader>
          <EventForm onSubmitForm={()=> {
            handleClose();
          }}/>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        
      </DrawerContent>
    </Drawer>

  )
}

