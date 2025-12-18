import Point from './point.js'

export default class Game {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private center: Point = new Point(0, 0)
    private lastTime: number = 0
    private scale: number = 0

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas

        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D

        this.attachEventListeners()
        this.resize()
        this.loop(0)
    }

    attachEventListeners() {
        window.addEventListener('resize', () => this.resize())
        this.canvas.addEventListener('mousedown', (event) => this.onMouseDown(event))
        this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event))
        this.canvas.addEventListener('mouseup', (event) => this.onMouseUp(event))
        this.canvas.addEventListener('mouseleave', (event) => this.onMouseLeave(event))
    }

    onMouseDown(event: MouseEvent) {
        console.log('DOWN')
    }

    onMouseMove(event: MouseEvent) {
        const worldPoint = this.screenToWorld(event.clientX, event.clientY)
        const screenPoint = this.worldToScreen(worldPoint.x, worldPoint.y)
        console.log(event.clientX, event.clientY)
        console.log(worldPoint.x, worldPoint.y)
        console.log(screenPoint.x, screenPoint.y)
    }

    onMouseUp(event: MouseEvent) {
        console.log('UP')
    }

    onMouseLeave(event: MouseEvent) {
        console.log(event)
    }

    resize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.center = new Point(this.canvas.width / 2, this.canvas.height / 2)
        this.scale = Math.min(this.canvas.width, this.canvas.height) / 2

        console.log(this.scale)
    }

    loop(timestamp: number) {
        const time = timestamp / 1000

        const deltaTime = time - this.lastTime
        this.lastTime = time

        this.update()
        this.render()


        requestAnimationFrame((timestamp) => this.loop(timestamp))
    }

    update() {

    }

    render() {

    }

    worldToScreen(worldX: number, worldY: number) {
        const screenX = this.center.x + worldX * this.scale
        const screenY = this.center.y + worldY * this.scale
        return new Point(screenX, screenY)
    }
    screenToWorld(screenX: number, screenY: number) {
        const worldX = (screenX - this.center.x) / this.scale
        const worldY = (screenY - this.center.y) / this.scale
        return new Point(worldX, worldY)
    }
}