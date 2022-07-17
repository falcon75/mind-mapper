// Module to fetch mindmap data and export it

import { writable } from "svelte/store"
import type { SimulationNodeDatum, SimulationLinkDatum } from "d3";


interface Node {
    id: number
    title: string
    description?: string
    children: Node[]
}

interface MindmapForceNode extends Node, SimulationNodeDatum {}

interface MindmapForceLink extends SimulationLinkDatum<MindmapForceNode>{   
}


const focusId = writable(0)

const mindmapData: Node[] = [
    {
        id: 0,
        title: "subject",
        description: "This is the main subject",
        children: [
            {
                id: 1,
                title: "topic1",
                children: [{
                    id: 2,
                    title: "detail 1a",
                    children: []
                }]
            },
            { 
                id: 3,
                title: "topic2", 
                children: [] 
            },
            { 
                id: 4,
                title: "topic3", 
                children: [] 
            }
        ]
    }


    
]

export { focusId, mindmapData, 
    type Node, type MindmapForceNode, type MindmapForceLink }