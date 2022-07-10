<script>
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    import { focusId } from "./mindmap";
    import TopicNode from "./TopicNode.svelte";
    import DetailNode from "./DetailNode.svelte";
</script>

<style>
    .mindmap {
        background-color: lightgray;
        width: 50vw;
        margin-inline: auto;
    }
</style>

<div class="mindmap">
    <TopicNode title="topic 1" key={1} let:showDetail>
        <DetailNode title="detail 1a" {showDetail}/>
    </TopicNode>
    <TopicNode title="topic 2" key={2}/>
    <TopicNode title="topic 3" key={3}/>
</div>