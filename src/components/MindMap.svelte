<script>
    import * as d3 from "d3"

    import { focusId, mindmapData } from "./mindmap";
    import TopicNode from "./TopicNode.svelte";
    import DetailNode from "./DetailNode.svelte";
    import { onMount } from "svelte";

    let el;

    $: {
        // Zoom into relevant section when focusId is changed
        const zoomPosition = focusId
    }

    onMount(() => {
        const nodes = mindmapData.map((d) => {
            return {
                ...d,
            }
        })

        // TODO: Look into d3 forceSimulation
        
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
        viewBox="0 0 100 100"
    >
        {#each mindmapData as topic}
            <TopicNode title={topic.title} key={topic.key} let:showDetail>
                {#each topic.children as detail}
                    <DetailNode title={detail.title} {showDetail}/>
                {/each}
            </TopicNode>
        {/each}
    </svg>
</div>