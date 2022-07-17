<script lang="ts">
    import * as d3 from "d3"

    import { focusId, mindmapData, type Node, type ForceNode } from "./mindmap";
    import TopicNode from "./TopicNode.svelte";
    import DetailNode from "./DetailNode.svelte";
    import { onMount } from "svelte";

    let el;
    let renderedNodes = []

    $: {
        // Zoom into relevant section when focusId is changed
        const zoomPosition = focusId
    }

    // Convert to nodes for force simulation

    const flat = (data: Node[], nodes: ForceNode[]) => {
            data.forEach((node) => {
                node.key = nodes.length
                nodes.push({...node})
                if (node.children.length > 0) {
                    // if this node has children, recursively flatten
                    nodes = flat(node.children, nodes)
                }
            })
            return nodes            
        }

    $: nodes = flat(mindmapData, [])

    onMount(() => {
        let simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(-50))
            .force("centre", d3.forceCenter(50, 50))
            .on("tick", () => {
                renderedNodes = [...nodes]
            })
    })

</script>

<style>
    .mindmap {
        background-color: lightgray;
        width: 50vw;
        height: 50vw;
        margin-inline: auto;
    }
</style>

<div class="mindmap">
    <svg
        bind:this={el}
        viewBox="-300 -300 600 600"
    >
        {#each mindmapData as topic}
            <TopicNode {...topic} nodes={renderedNodes}/>
        {/each}
    </svg>
</div>