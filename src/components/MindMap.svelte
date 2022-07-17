<script lang="ts">
    import * as d3 from "d3"

    import { focusId, mindmapData, type Node, type MindmapForceNode, type MindmapForceLink } from "./mindmap";
    import TopicNode from "./TopicNode.svelte";
    import { onMount } from "svelte";

    let el;
    let renderedNodes = []

    $: {
        // Zoom into relevant section when focusId is changed
        const zoomPosition = focusId
    }

    // Convert to nodes for force simulation

    const flat = (data: Node[], nodes: MindmapForceNode[], links: MindmapForceLink[]) => {
            data.forEach((node) => {
                // node.id = nodes.length
                nodes.push({...node})
                if (node.children.length > 0) {
                    // if this node has children, create force links
                    node.children.forEach((child) => {
                        links.push({source: node.id, target: child.id})
                    });
                    
                    // then recursively flatten
                    ({nodes, links} = flat(node.children, nodes, links))
                }
            })
            nodes[0].fx = 0
            nodes[0].fy = 0

            return {nodes: nodes, links: links}
        }

    $: ({nodes, links} = flat(mindmapData, [], []))

    onMount(() => {
        let simulation = d3.forceSimulation<MindmapForceNode, MindmapForceLink>(nodes)
            .force("centre", d3.forceCenter(0, 0))
            .force("charge", d3.forceManyBody()
                .strength(-50)
            )
            .force("link", d3.forceLink(links)
                .id((d) => (d as MindmapForceNode).id)
                .strength(0.5)
                .distance(40)
            )
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
        viewBox="-100 -100 200 200"
    >
        {#each mindmapData as topic}
            <TopicNode {...topic} nodes={renderedNodes}/>
        {/each}
    </svg>
</div>