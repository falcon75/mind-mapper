<script lang="ts">
    import { mindmapData, type Node } from "./mindmap";
    import { focusId, view, viewValues, getViewBox } from "./focus";
    import TopicNode from "./TopicNode.svelte";
    import { onMount } from "svelte";

    import * as d3 from "d3";

    let svg: SVGSVGElement;

    let containerHeight: number;
    let containerWidth: number;

    // Convert to nodes for force simulation
    let root = d3.hierarchy<Node>(mindmapData) as d3.HierarchyPointNode<Node>

    let simulation = d3.forceSimulation(root.descendants())
        .force("centre", d3.forceCenter(0, 0))
        .force("charge", d3.forceManyBody()
            .strength(-50)
        )
        .force("link", d3.forceLink(root.links())
            .strength(1)
            .distance(20)
        ).tick(5) // initial ticks before rendering, set bounds

    let renderedNodes = simulation.nodes()[0]
    console.log(root)
    onMount(() => {
        const linkLines = d3.select("svg")
        .append("g")
        .attr("stroke", "#000")
        .attr("stroke-width", "1")
        .attr("opacity", "0.5")
        .selectAll("line")
        .data(root.links())
        .join("line")

        simulation
            // TODO: add collision force
            .on("tick", () => {
                renderedNodes = simulation.nodes()[0]
                linkLines
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);
            })
            .on("end", () => {

            })

        // simulation.restart()

        // only set focus once all elements have been rendered
        // assume id 0 is reserved for root element
        $focusId = 0
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
        <TopicNode 
            parentNode={renderedNodes}
            {svg} {containerHeight} {containerWidth}
        />
    </svg>
</div>