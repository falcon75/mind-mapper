// Module to fetch mindmap data and export it

import type { SimulationNodeDatum, SimulationLinkDatum } from "d3";


export interface Node {
    id: number
    title: string
    description?: string
    children: Node[]
}

export interface MindmapForceNode extends Node, SimulationNodeDatum {}

export interface MindmapForceLink extends SimulationLinkDatum<MindmapForceNode>{   
}

export const mindmapData: Node[] = [
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
                children: [
                    { 
                        id: 5,
                        title: "detail 2a", 
                        children: [] 
                    },
                    { 
                        id: 6,
                        title: "detail 2b", 
                        children: [] 
                    },
                    { 
                        id: 7,
                        title: "detail 2c", 
                        children: [] 
                    },
                ] 
            },
            { 
                id: 4,
                title: "topic3", 
                children: [] 
            }
        ]
    }
]

export const colourScheme = [
    "#D4E4BC",
    "#96ACB7",
    "#36558F",
    "#40376E",
    "#48233C"
]
