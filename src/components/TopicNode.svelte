<script lang="ts">
    export let title: string = ""

    let showDetail: boolean = false
    const selectNode = () => {
        showDetail = !showDetail
    }
</script>

<style>
    .topicnode {
        position: relative;

        background-color: lightpink;
        width: 150px;
        height: 150px;
    }

    .topicnode h3 {
        font-size: small;
        font-weight: 500;
        font-style: italic;
    }
</style>

{@debug showDetail}

<div class="topicnode"
    on:click={selectNode}
>
    <h2>{title}</h2>
    {#if showDetail}
        <h3>Selected</h3>
    {/if}

    <slot showDetail={showDetail} />

</div>