<script lang="ts">
    import { onMount } from "svelte";
    import { focusId, type Node, type MindmapForceNode } from "./mindmap"

    export let id: number = 0
    export let title: string = ""
    export let description: string = ""
    export let children: Node[] = []

    export let nodes: MindmapForceNode[] = []
    export let parentShowDetail: boolean = false


    $: x = nodes[id]?.x || 0
    $: y = nodes[id]?.y || 0

    const selectNode = () => {
        $focusId = id
    }

    let width = 20;
    let height = 30;

    let showDetail: boolean
    $: {
        showDetail = $focusId == id
    }

    onMount(() => {
        
    })

</script>

<style>
    .topicnode {
        fill: lightpink;
    }

    .topicnode foreignObject {
        font-size: 2px;
    }

    .topicnode h3 {
        font-weight: 500;
        font-style: italic;
    }
</style>

<g class="topic"
    
>
    <g class="topicnode"
    on:click={selectNode}
    >
        <rect
            x={x - width / 2}
            y={y - height / 2}
            width={width}
            height={height}
        />
        <foreignObject
            x={x - width / 2}
            y={y - height / 2}
            width={width}
            height={height}
        >
            <h2>{title}</h2>
            {#if (showDetail)}
                <h3>Selected</h3>
            {/if}
            {#if (parentShowDetail)}
                <h3>Parent Selected</h3>
            {/if}
            <p>
                {description}
            </p>
        
        </foreignObject>
    </g>

    {#each children as topic}
        <!-- recursively define TopicNodes as children -->
        <svelte:self {...topic} {nodes} parentShowDetail={parentShowDetail || showDetail}/>
        <line
            x1={x}
            y1={y}
            x2={nodes[topic.id]?.x}
            y2={nodes[topic.id]?.y}
            stroke="black"
            opacity=0.2
        />
    {/each}
</g>