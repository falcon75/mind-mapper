<script>
    import { bolt } from "./paths"
    import { draw, fade } from "svelte/transition"
</script>

<style>
    circle.outer {
        fill: none;
        stroke: black;
        stroke-width: 10;
    }

    path {
        stroke: black;
        fill: none;
        stroke-width: 20;
        stroke-linejoin: round;
        opacity: 0.2;
    }
</style>

<svg viewBox="0 0 720 720" width={360} height={360} >
    <g out:fade="{{duration: 200}}" >
        <circle
            cx={720/2}
            cy={720/2}
            r={240}
            class="outer"
            in:draw="{{delay: 500, duration: 1000}}"
        />
        <path
            d={bolt}
            in:draw="{{delay: 500+1000, duration: 500}}"
        />
    </g>
</svg>