"use server"
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function getWorkflows(){
    const session = await getServerSession();
    if(!session || !session.user?.email){
        return null;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if(!user){
        return null;
    }

    const workflows = await prisma.workflow.findMany({
        where : {
            userId : user.id
        }
    })
    console.log(workflows);
    return workflows;
}
