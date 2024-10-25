"use client"

import React, { useState, useCallback, DragEvent ,useMemo, useEffect} from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  Connection,
  useReactFlow,
  Handle,
  Position,
  useNodeId
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { PlusCircle, Github, Database, Search, Inbox } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import clsx from 'clsx'
import { saveWorkflow } from '@/app/actions/saveWorkflow'

type CustomNodeData = {
  label: string
  type: string
  description: string
  status ?: string
}

function CustomWorkflowNode({ data }: { data: CustomNodeData }) {
  const nodeId = useNodeId()
  const logo = useMemo(() => {
    if (data.label.toLowerCase().includes('googledrive')) return <Database />
    if (data.label.toLowerCase().includes('github')) return <Github />
    if (data.label.toLowerCase().includes('gmail')) return <Inbox />
    return <PlusCircle />
  }, [data.label])

  const statusColor = useMemo(() => {
    const random = Math.random()
    if (random < 0.6) return 'bg-green-500'
    if (random < 0.8) return 'bg-orange-500'
    return 'bg-red-500'
  }, [])

  return (
    <>
      {data.type !== 'Trigger' && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ zIndex: 100 }}
        />
      )}
      <Card className="relative max-w-[400px] dark:border-muted-foreground/70">
        <CardHeader className="flex flex-row items-center gap-4">
          <div>{logo}</div>
          <div>
            <CardTitle className="text-md">{data.label}</CardTitle>
            <CardDescription>
              <p className="text-xs text-muted-foreground/50">
                <b className="text-muted-foreground/80">ID: </b>
                {nodeId}
              </p>
              <p>{data.description}</p>
            </CardDescription>
          </div>
        </CardHeader>
        <Badge
          variant="secondary"
          className="absolute right-2 top-2"
        >
          {data.type}
        </Badge>
        <div
          className={clsx('absolute left-3 top-4 h-2 w-2 rounded-full', statusColor)}
        ></div>
      </Card>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
      />
    </>
  )
}

const TriggerNode = ({ data }: { data: CustomNodeData }) => {
  return (
    <CustomWorkflowNode data={data}/>
  )
}

const ActionNode = ({ data }: { data: CustomNodeData }) => {
  return (
    <CustomWorkflowNode data={data}/>
  )
}

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
}

const Sidebar = ({ handleSave, hasTrigger, searchTerm, setSearchTerm }: { 
  handleSave: () => void, 
  hasTrigger: boolean, 
  searchTerm: string, 
  setSearchTerm: (term: string) => void 
}) => {
  const onDragStart = (event: DragEvent<HTMLButtonElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  const triggerNodes = [
    { type: 'googledrive', label: 'Google Drive Trigger', icon: Database },
    { type: 'github', label: 'GitHub Trigger', icon: Github },
  ]

  const actionNodes = [
    { type: 'googledrive', label: 'Google Drive Action', icon: Database },
    { type: 'github', label: 'GitHub Action', icon: Github },
    { type: 'gmail', label: 'Gmail Action', icon: Inbox },
  ]

  const nodesToShow = hasTrigger ? actionNodes : triggerNodes
  const filteredNodes = nodesToShow.filter(node => 
    node.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="w-64 h-auto border-l">
      <CardHeader>
        <CardTitle>
          <div className="border-t border-b py-4">
            <Button onClick={handleSave}>Save Workflow</Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-250px)]">
          <div className="p-4 space-y-4">
            {filteredNodes.map((node) => (
              <Button
                key={node.type}
                variant="outline"
                className="w-full justify-start"
                onDragStart={(event) => onDragStart(event, node.type)}
                draggable
              >
                <node.icon className="mr-2 h-4 w-4" /> {node.label}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

const EditorContent = () => {
  const {toast} = useToast()
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [searchTerm, setSearchTerm] = useState('')
  const { editorId } = useParams<{editorId : string}>()
  const reactFlowInstance = useReactFlow()


  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')

      if (typeof type === 'undefined' || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - 250,
        y: event.clientY,
      })

      if (nodes.length === 0 && (type !== 'googledrive' && type !== 'github')) {
        toast({
          title: "Error",
          description: "The first node must be a trigger node.",
          variant: "destructive",
        })
        return
      }

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: nodes.length === 0 ? 'trigger' : 'action',
        position,
        data: { 
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodes.length === 0 ? 'Trigger' : 'Action'}`,
          type: nodes.length === 0 ? 'Trigger' : 'Action'
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes, nodes, toast]
  )

  const handleSave = async () => {
    try {
      const response = await saveWorkflow({ workflowId: editorId, nodes, edges })
      if(response === "Workflow saved successfully"){
        toast({
          title: "Success",
          description: "Workflow saved successfully.",
        })
      }else if (response === "Unauthorized"){
        toast({
          title: "Unauthorized",
          description: "Failed to save workflow. Please try again.",
          variant: "destructive",
        })
      }else {
        toast({
          title: "Workflow not found",
          description: "Failed to save workflow. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save workflow. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="h-[calc(100vh-64px)] w-full flex flex-col">
      <div className="flex-grow flex">
        <div className="flex-grow">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls className="top-2 left-2" />
            <MiniMap className="bottom-2 left-2 w-0" pannable zoomable zoomStep={2} />
          </ReactFlow>
        </div>
        <Sidebar 
          handleSave={handleSave} 
          hasTrigger={nodes.some(node => node.type === 'trigger')}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </div>
  )
}

export default function EditorId() {
  return (
    <ReactFlowProvider>
      <EditorContent />
    </ReactFlowProvider>
  )
}