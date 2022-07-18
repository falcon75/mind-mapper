<script lang="ts">
    import { mindmapData, type Node, type MindmapForceNode, type MindmapForceLink } from "./mindmap";
    import { focusId, view, viewValues, getViewBox } from "./focus";
    import TopicNode from "./TopicNode.svelte";
    import { onMount } from "svelte";

    import * as d3 from "d3";

    let renderedNodes = [];
    let updateZoom;
    let svg: SVGSVGElement;

    let containerHeight: number;
    let containerWidth: number;

    // Convert to nodes for force simulation

    const flat = (data: Node[], nodes: MindmapForceNode[], links: MindmapForceLink[], depth: number = 0) => {
            data.forEach((node) => {
                // node.id = nodes.length
                nodes.push({...node})
                if (node.children.length > 0) {
                    // if this node has children, create force links
                    node.children.forEach((child) => {
                        links.push({source: node.id, target: child.id, depth})
                    });
                    
                    // then recursively flatten
                    ({nodes, links} = flat(node.children, nodes, links, depth+1))
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
                .id(d => (d as MindmapForceNode).id)
                .strength(1)
                .distance(20)
            )
            .on("tick", () => {
                renderedNodes = [...nodes]
                updateZoom = !updateZoom
            })
            .on("end", () => {

            })

        // simulation.restart()

        // only set focus once all elements have been rendered
        // assume id 0 is reserved for root element
        $focusId = 0
        console.log('set focusId')
    })

</script>

<style>
    .mindmap {
        background-color: lightgray;
        width: 50vw;
        height: 50vw;
        margin-inline: auto;
        overflow: hidden;
    }

    .mindmap svg {
        width: 100%;
        height: 100%;
    }
</style>

<div class="mindmap"
    bind:clientHeight={containerHeight}
    bind:clientWidth={containerWidth}
>
    <svg
        id="mindmap-svg"
        viewBox={$view.join(" ")}
        bind:this={svg}
    >
        {#each mindmapData as topic}
            <TopicNode {...topic} nodes={renderedNodes} {updateZoom}
            {svg} {containerHeight} {containerWidth}
            />
        {/each}
    </svg>
</div>