<script lang="ts">
    import { focusId } from "./focus";
    import { colourScheme, type Node, type MindmapForceNode } from "./mindmap"

    export let id: number = 0
    export let title: string = ""
    export let description: string = ""
    export let children: Node[] = []

    export let nodes: MindmapForceNode[] = []
    export let parentShowDetail: boolean = false
    export let depth: number = 0


    $: x = nodes[id]?.x || 0
    $: y = nodes[id]?.y || 0

    const selectNode = () => {
        $focusId = id
    }

    let width = 20;
    let contentHeight: number;

    let showDetail: boolean
    $: {
        showDetail = $focusId == id
    }

    $: styles = `
        --node-colour: ${colourScheme[depth]}
    `

</script>

<style>
    .topicnode {
        fill: var(--node-colour);
    }

    .topicnode foreignObject {
        font-size: 2px;
        background-color: var(--node-colour);
    }

    .topicnode h3 {
        font-weight: 500;
        font-style: italic;
    }

    .topicnode p {
        max-height: 10ch;
        overflow-y: auto;
    }

    .content-container {
        overflow: hidden;
    }
</style>

<g class="topic"
    
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
                <p>
                    {description}
                </p>
            </div>
        
        </foreignObject>
    </g>

    {#each children as topic}
        <!-- recursively define TopicNodes as children 
        svelte:self refers to current component (i.e. TopicNode)-->
        <svelte:self 
        {...topic} {nodes} 
        parentShowDetail={parentShowDetail || showDetail}
        depth={depth + 1}
        />
        <line
            x1={x}
            y1={y}
            x2={nodes[topic.id]?.x}
            y2={nodes[topic.id]?.y}
            stroke="black"
            opacity=0.2
            stroke-width=0.2
        />
    {/each}
</g>