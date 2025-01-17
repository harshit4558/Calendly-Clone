import Events from './_components/event-page'
import React, { Suspense } from 'react'


export default function EventsPage() {
    return (
        <Suspense fallback={<div> Loading Events...</div>}>
            <Events/>
        </Suspense>
    )
}


