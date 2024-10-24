"use server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

// this is not working , we have to use transaction to delete all the related data
export async function deleteWorkflow(id: string) : Promise<string> {
    const session = await getServerSession();

    if(!session || !session.user?.email){
        return  "Session not found"
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if(!user){
        return "User not found"
    }

    const workflow = await prisma.workflow.delete({
        where: {
            id: id
        }
    });

    console.log(workflow);
    return workflow.id;
}