<script lang="ts">
import { onMount } from "svelte";

    import { focusId, type ForceNode } from "./mindmap"


    export let title: string = ""
    export let key: number = 0
    export let nodes: ForceNode[] = []

    console.log(nodes)
    $: x = nodes[key]?.x
    $: y = nodes[key]?.y

    const selectNode = () => {
        $focusId = key
    }

    let showDetail: boolean
    $: showDetail = $focusId == key

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

<g class="topicnode"
    on:click={selectNode}
>
    <rect
        x={x}
        y={y}
        width={20}
        height={20}
    />

    <foreignObject
        x={x}
        y={y}
        width={20}
        height={20}
    >
        <h2>{title} {key}</h2>
        {#if (showDetail)}
            <h3>Selected</h3>
        {/if}
    
    </foreignObject>

    <slot {showDetail} />

</g>