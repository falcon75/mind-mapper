<script lang="ts">
    import { afterUpdate } from "svelte";
    import { focusId } from "../mindmap/focus";
    import type {Node} from "../mindmap/mindmap";

    export let nodes: d3.HierarchyPointNode<Node>;
    let focusNode = nodes.find(d => d.data.id == $focusId)
    console.log(focusNode)
    let description = ''
    $focusId=1
    $: {
        focusNode = nodes.find(d => d.data.id == $focusId)
        description = focusNode.data.description
        console.log('here!')
    }

    afterUpdate(() => {

    })
</script>

<style>
    .editor {
        width: 400px;
        height: 600px;
        box-sizing: border-box;
        padding: 1em;
    }

    .editor textarea {
        width: 100%;
        height: 80%;
        resize: none;
    }

</style>

<div class="editor">
    <textarea bind:value={description}/>
</div>