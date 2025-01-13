"use server"

import { clerkClient } from "@clerk/nextjs/server";
import { add } from "date-fns";
import {google} from "googleapis";
import { db } from "@/lib/prisma";

export async function createBooking(bookingData){
    try {
        const event = await db.event.findUnique({
            where :{ id : bookingData.eventId },
            include : { user : true }
        })

        if(!event){
            throw new Error("Event Not Found");
        }
        // use google api to add meet link
        const {data} = await clerkClient.users.getUserOauthAccessToken(
            event.user.clerkId,
            "oauth_google"
        );

        const token = data[0]?.token;

        if(!token){
            throw new Error("Event Creator has not connected Google Calendar");
        }
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({ access_token : token });

        const calendar = google.calendar({ version : "v3", auth : oauth2Client });
        const meetResponse = await calendar.events.insert({
            calendarId : "primary",
            conferenceDataVersion : 1,
            requestBody : {
                summary : `${bookingData.name} - ${event.title}`,
                description : `${bookingData.additionalInfo}`,
                start : { dateTime : bookingData.startTime },
                end : { dateTime : bookingData.endTime },
                attendees :[{ email : bookingData.email }, { email : event.user.email }],
                conferenceData : {
                    createRequest: { requestId: `${event.is} - ${Date.now()}` }
                }
            }
        });

        const meetLink = meetResponse.data.hangoutLink;
        const googleEventId = meetResponse.data.id;

        const booking = await db.booking.create({
            data : {
                eventId : event.id,
                userId : event.user.id,
                name : bookingData.name,
                email : bookingData.email,
                startTime : bookingData.startTime,
                endTime : bookingData.endTime,
                additionalInfo : bookingData.additionalInfo,
                meetLink,
                googleEventId
            }
        })

        return { success : true , booking , meetLink}
    } catch (error) {
        console.error("Error creating booking", error);
        return { success : false, error : error.message }
    }
}