// Module to fetch mindmap data and export it

import { writable } from "svelte/store"

const focusId = writable(0)

export { focusId }