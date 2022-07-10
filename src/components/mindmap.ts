// Module to fetch mindmap data and export it

import { writable } from "svelte/store"

const focusId = writable(0)

const mindmapData = [
    {
        title: "topic1",
        key: 1,
        children: [{
            title: "detail 1a"
        }]
    },
    { title: "topic2", key: 2, children: [] },
    { title: "topic3", key: 3, children: [] }
]

export { focusId, mindmapData }