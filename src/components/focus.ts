import { writable } from "svelte/store"
import { tweened } from "svelte/motion";
import { cubicInOut } from "svelte/easing";


export const focusId = writable(-1)

const initialView = [-100, -100, 200, 200]
export const viewValues = writable(initialView)
export const view = tweened(initialView, {
    easing: cubicInOut, duration: 1000
})

export const svgPoint = (svg: SVGSVGElement, x: number, y: number) => {
    // Convert DOM coordinates to SVG coordinates
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;

    return pt.matrixTransform( svg.getScreenCTM().inverse() )
}

export const getViewBox = (
    svg: SVGSVGElement,
    el: SVGElement,
    centre: {x: number, y: number}, 
    containerheight: number,
    containerwidth: number
    ) => {
    // Set viewbox from bounding box values
    // Ensure viewbox is centred, and contained within the container
    console.log('getting viewbox')
    const rect = el?.getBoundingClientRect()

    const topleft = svgPoint(svg, rect.left, rect.top)
    const botright = svgPoint(svg, rect.right, rect.bottom)

    let width = Math.max(botright.x - centre.x, centre.x - topleft.x) * 2
    let height = Math.max(botright.y - centre.y, centre.y - topleft.y) * 2

    const aspectRatio = containerheight / containerwidth

    width = Math.max(width, height / aspectRatio)
    height = Math.max(height, width * aspectRatio)

    return [
        centre.x - width / 2,
        centre.y - height / 2,
        width,
        height
    ]
}