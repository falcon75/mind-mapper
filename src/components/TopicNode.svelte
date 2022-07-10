<script lang="ts">
    export let title: string = ""
    export let key: number = 0

    import { focusId } from "./mindmap"


    const selectNode = () => {
        $focusId = key
    }
    let showDetail: boolean
    $: showDetail = $focusId == key
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
        x={25*key}
        y={25*key}
        width={20}
        height={20}
    />

    <foreignObject
        x={25*key}
        y={25*key}
        width={20}
        height={20}
    >
        <h2>{title}</h2>
        {#if (showDetail)}
            <h3>Selected</h3>
        {/if}
    
    </foreignObject>

    <slot {showDetail} />

</g>