<script lang="ts">
    import { onMount } from "svelte";

    import { focusId, view, svgPoint, getViewBox } from "./focus";
    import { colourScheme, type Node } from "./mindmap"

    // export let children: Node[] = []
    export let parentNode: d3.HierarchyPointNode<Node>;

    export let parentShowDetail: boolean = false
    export let depth: number = 0

    export let svg: SVGSVGElement;
    export let containerHeight;
    export let containerWidth;

    const {title, description, id} = parentNode.data

    let x = parentNode.x 
    let y = parentNode.y
    $: {
        x = parentNode.x;
        y = parentNode.y;
    }
    // Focus on current element if selected
    // svgPoint function is required to account for DOM -> SVG coordinates
    let el: SVGElement;

    $: {
        if ($focusId == id) {
            if (svg !== undefined && el !== undefined) {
                const viewbox = getViewBox(svg, el, {x, y}, containerHeight, containerWidth)
                view.set(viewbox)
            }
        }
    }

    const selectNode = () => {
        if ($focusId == id) {
            // When you click on the root node, resize the zoom
            // dodgy workaround to fix following error (TODO, fix):
            //  when the d3 simulation is still running, the bounding box of
            //  the nodes are centred at the middle. Can fix by initialising to
            //  larger values?
            if (id == 0) {
                const viewbox = getViewBox(svg, el, {x, y}, containerHeight, containerWidth)
                view.set(viewbox)
            }
            // (end of workaround)
            $focusId = 0
        } else {
            $focusId = id
        }
    }

    let width = 20;
    let scale = 0.7 ** parentNode.depth;
    let contentHeight: number;

    let showDetail: boolean
    $: {
        showDetail = $focusId == id
    }

    $: styles = `
        --node-colour: ${colourScheme[depth]};
        --font-size: 2px;

        transform-origin: center;
        transform-box: fill-box;
        transform: scale(${scale});
    `
</script>

<style>
    .topicnode {
        fill: var(--node-colour);
    }

    .topicnode foreignObject {
        font-size: var(--font-size);
        background-color: var(--node-colour);
    }

    .topicnode h3 {
        font-weight: 500;
        font-style: italic;
    }

    .topicnode p {
        overflow: hidden;
    }

    .content-container {
        overflow: hidden;
    }
</style>

<g class="topic"
bind:this={el}
>
    <g class="topicnode"
    on:click={selectNode}
    style={styles}
    >
        <rect
            x={x - width / 2}
            y={y - (contentHeight||0) / 2}
            width={width}
            height={(contentHeight||0)}
        />
        <foreignObject
            x={- width / 2}
            y={- (contentHeight||0) / 2}
            width={width}
            height={(contentHeight||0)}
            transform={`translate(${x} ${y})`}
        >
            <div class="content-container"
                bind:clientHeight={contentHeight}
            >
                <h2>{title}</h2>
                {#if (showDetail)}
                    <h3>Selected</h3>
                {/if}
                {#if (parentShowDetail)}
                    <h3>Parent Selected</h3>
                {/if}
                {#if (description)}
                    <p>
                        {description}
                    </p>
                {/if}
            </div>
        
        </foreignObject>
    </g>
    {#if parentNode.height}
    {#each parentNode.children as node}
        <!-- recursively define TopicNodes as children 
        svelte:self refers to current component (i.e. TopicNode)-->
        <svelte:self 
            {svg} {containerHeight} {containerWidth}
            parentShowDetail={parentShowDetail || showDetail}
            parentNode={node}
            depth={depth + 1}
        />
    {/each}
    {/if}
</g>