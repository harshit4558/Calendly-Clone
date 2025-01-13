"use server"

import { auth, clerkClient, getAuth } from "@clerk/nextjs/server"
import { db } from "@/lib/prisma";


export async function updateUsername(username) {
    const id = (await auth()).userId;
    console.log(id);
    if(!id){
        throw new Error("Unauhorized");
    }
    const existingUsername = await db.user.findUnique({
        where:{ username },
    });

    if(existingUsername && existingUsername.id !== id){
        throw new Error("Username is already taken");
    }
    await db.user.update({
        where: { clerkUserid: id },
        data: { username },
      });

    const client = await clerkClient();
    await client.users.updateUser(id, {
        username,
    })

    return { success : true }


}
export async function getUserByUsername(username){
    const user = await db.user.findUnique({
        where : { username },
        select : {
            id : true,
            name : true,
            email : true,
            imageUrl : true,
            events : {
                where : {
                    isPrivate : false
                },
                orderBy : {
                    createdAt : 'desc'
                },
                select : {
                    id : true,
                    title : true,
                    description : true,
                    duration : true,
                    isPrivate : true,
                    _count : {
                        select : { bookings : true }
                    }
                }
            }
        }
    })
    return user;
}