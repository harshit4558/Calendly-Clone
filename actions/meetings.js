import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function getUserMeetings(type = "upcoming") {
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

        const now = new Date();
        const meetings = await db.booking.findMany({
            where : {
                userId : user.id,
                startTime : type === "upcoming" ? { gt : now } : { lt : now }
            },
            include : {
                event : {
                    include : {
                        user : {
                            select : {
                                name : true,
                                email : true,
                            }
                        }
                    }
                }
            },
            orderBy : {
                startTime : type === "upcoming" ? "asc" : "desc"
            }
        })

        return meetings;
    
}