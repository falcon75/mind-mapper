<script lang="ts">
    export let title: string = ""
    export let showDetail: boolean
</script>

<style>
.detailnode {
    position: absolute;
    right: 0;
    bottom: 0;

    background-color: lightcoral;
    font-size: 2px;
}
</style>

<g class="detailnode">
    <foreignObject
        width={20}
        height={20}
    >
        <h2>{title} {showDetail}</h2>
    </foreignObject>
</g>