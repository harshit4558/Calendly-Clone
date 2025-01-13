import { getUserAvailability } from '@/actions/availability'
import React from 'react'
import AvailabilityForm from './_components/availability-form';
import { defaultAvailability } from './data';

const Availability = async () => {  

    const availability = await getUserAvailability();
    console.log(availability);

    return <AvailabilityForm initialData={availability || defaultAvailability}/>
}

export default Availability