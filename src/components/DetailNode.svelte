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
    font-size: 0.5rem;
}
</style>

<div class="detailnode">
    <h2>{title} {showDetail}</h2>
</div>