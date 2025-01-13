"use server"
import { eventSchema } from "@/app/_lib/validators";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function createEvent(data) {
    const id = (await auth()).userId;
    if(!id) {
        throw new Error('Unauthorized');
    }

    const validatedData = eventSchema.parse(data);
    const user = await db.user.findUnique({
        where : { clerkUserid : id },
    });

    if(!user) {
        throw new Error("User Not Found");
    }

    const event = await db.event.create({
        data:{
            ...validatedData,
            userId : user.id,
        },
    });

    return event;
}

export async function getUserEvents() {
    const id = (await auth()).userId;
    if(!id) {
        throw new Error('Unauthorized');
    }
    const user = await db.user.findUnique({
        where : { clerkUserid : id },
    });
    if(!user) {
        throw new Error("User Not Found");
    }
    const events = await db.event.findMany({
       where:{
        userId : user.id
       },
       orderBy: {
        createdAt : "desc"
       },
       include: {
            _count : {
                select : {bookings : true}
            }
       }

    });
    return { events, username : user.username };
}    
export async function deleteEvent(eventId) {   
    const id = (await auth()).userId;
    if(!id) {
        throw new Error('Unauthorized');
    }
    const user = await db.user.findUnique({
        where : { clerkUserid : id },
    });
    if(!user) {
        throw new Error("User Not Found");
    }
    const event = await db.event.findUnique({
      where:{
        id : eventId
      }
    });
    if(!event || event.userId !== user.id)  {
        throw new Error("Event Not Found or Unauthorized");
    } ;
    await db.event.delete({
        where: { id : eventId },
    });

    return {success : true};
    }

export async function getEventDetails(username, eventId) {
    const event = await db.event.findFirst({
        where : {
            id : eventId,
            user : {
                username : username
            }
        },
        include : {
            user : {
                select : {
                    username : true,
                    name : true,
                    email : true,
                    imageUrl : true
                }
            }
        }
    })
    return event;
}

