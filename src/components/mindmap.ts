// Module to fetch mindmap data and export it

import { writable } from "svelte/store"
import type { SimulationNodeDatum } from "d3";


interface Node {
    title: string
    key?: number
    children: Node[]
}

interface ForceNode extends Node, SimulationNodeDatum {}


const focusId = writable(0)

const mindmapData: Node[] = [
    {
        title: "topic1",
        children: [{
            title: "detail 1a",
            children: []
        }]
    },
    { title: "topic2", children: [] },
    { title: "topic3", children: [] }
]

export { focusId, mindmapData, type Node, type ForceNode }