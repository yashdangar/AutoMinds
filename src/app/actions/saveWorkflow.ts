"use server"
import prisma from "@/lib/db";
import { Node, NodeType, WorkerType } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function saveWorkflow(data: { workflowId: string, nodes: any, edges: any }) {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        return "Unauthorized";
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email }
    });

    if (!user) return "Unauthorized";

    const workflow = await prisma.workflow.findUnique({
        where: { id: data.workflowId },
        include: { nodes: true, edges: true }
    });

    if (!workflow) return "Workflow not found";

    for (const dataNode of data.nodes) {
        await prisma.node.upsert({
            where: { id: dataNode.id.split("-")[1] },
            create: {
                id: dataNode.id.split("-")[1],
                name: "",
                description: "",
                type: dataNode.id.includes("drive") || dataNode.id.includes("gmail") ? NodeType.Google : NodeType.Github,
                workflowId: data.workflowId,
                positionX: dataNode.position.x,
                positionY: dataNode.position.y,
                workerType: dataNode.type === "trigger" ? WorkerType.Trigger : WorkerType.Action
            },
            update: {
                positionX: dataNode.position.x,
                positionY: dataNode.position.y,
            }
        });
    }

    for (const dataEdge of data.edges) {
        await prisma.edge.upsert({
            where: { id: dataEdge.id },
            create: {
                id: dataEdge.id,
                sourceId: dataEdge.source.split("-")[1],
                targetId: dataEdge.target.split("-")[1],
                workflowId: data.workflowId,
            },
            update: {
                sourceId: dataEdge.source.split("-")[1],
                targetId: dataEdge.target.split("-")[1],
            }
        });
    }

    return "Workflow saved successfully";
}
