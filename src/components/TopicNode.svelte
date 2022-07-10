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
        position: relative;

        background-color: lightpink;
        opacity: 0.8;
        width: 150px;
        height: 150px;
    }

    .topicnode h3 {
        font-size: small;
        font-weight: 500;
        font-style: italic;
    }
</style>

<div class="topicnode"
    on:click={selectNode}
>
    <h2>{title}</h2>
    {#if (showDetail)}
        <h3>Selected</h3>
    {/if}

    <slot {showDetail} />

</div>