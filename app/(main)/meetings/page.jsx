import { getUserMeetings } from '@/actions/meetings'
import React, { Suspense } from 'react'
import MeetingList from './_components/meeting-list'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export const metadata = {
    title: 'Your meetings',
    description: 'View and manage your upcoming and past meetings',
}

const MeetingPage = () => {
  return (
    <Tabs defaultValue="upcoming" >
        <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
           <Suspense fallback={<div>Loading Upcoming Meetings... </div>}>
                <UpcomingMeeting/>
           </Suspense>
        </TabsContent>
        <TabsContent value="past">
            <Suspense fallback={<div>Loading Past Meetings... </div>}>
                <PastMeeting/>
            </Suspense>
        </TabsContent>
    </Tabs>

  )
}
async function UpcomingMeeting() {
    const meetings = await getUserMeetings("upcoming");
    return <MeetingList meetings={meetings} type={"upcoming"}/>
}
async function PastMeeting() {
    const meetings = await getUserMeetings("past");
    return <MeetingList meetings={meetings} type="past"/>
}
export default MeetingPage