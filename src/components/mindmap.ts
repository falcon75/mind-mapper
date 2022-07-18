// Module to fetch mindmap data and export it

import type { SimulationNodeDatum, SimulationLinkDatum } from "d3";
import type TopicNodeSvelte from "./TopicNode.svelte";


export interface Node {
    id: number
    title: string
    description?: string
    children: Node[]
    // ref?: TopicNodeSvelte
}

export interface MindmapForceNode extends Node, SimulationNodeDatum {}

export interface MindmapForceLink extends SimulationLinkDatum<MindmapForceNode>{   
    depth: number
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
                    children: [{
                        id: 8,
                        title: "detail 1ai",
                        children: []
                    }]
                }]
            },
            { 
                id: 3,
                title: "topic2", 
                children: [
                    { 
                        id: 5,
                        title: "detail 2a", 
                        description: `Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit. Cras pellentesque sed risus ut cursus. 
                        Curabitur a tempor orci, non fringilla nibh. Nunc facilisis 
                        sem leo, vel sagittis nisi luctus quis. Mauris ornare nisi 
                        non euismod ornare`,
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
                children: [{ 
                    id: 9,
                    title: "detail 3a", 
                    children: [] 
                }] 
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
