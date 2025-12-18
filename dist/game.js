import Point from './point.js';
export default class Game {
    canvas;
    context;
    center = new Point(0, 0);
    lastTime = 0;
    scale = 0;
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.attachEventListeners();
        this.resize();
        this.loop(0);
    }
    attachEventListeners() {
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousedown', (event) => this.onMouseDown(event));
        this.canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        this.canvas.addEventListener('mouseup', (event) => this.onMouseUp(event));
        this.canvas.addEventListener('mouseleave', (event) => this.onMouseLeave(event));
    }
    onMouseDown(event) {
        console.log('DOWN');
    }
    onMouseMove(event) {
        const worldPoint = this.screenToWorld(event.clientX, event.clientY);
        const screenPoint = this.worldToScreen(worldPoint.x, worldPoint.y);
        console.log(event.clientX, event.clientY);
        console.log(worldPoint.x, worldPoint.y);
        console.log(screenPoint.x, screenPoint.y);
    }
    onMouseUp(event) {
        console.log('UP');
    }
    onMouseLeave(event) {
        console.log(event);
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.center = new Point(this.canvas.width / 2, this.canvas.height / 2);
        this.scale = Math.min(this.canvas.width, this.canvas.height) / 2;
        console.log(this.scale);
    }
    loop(timestamp) {
        const time = timestamp / 1000;
        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.update();
        this.render();
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }
    update() {
    }
    render() {
    }
    worldToScreen(worldX, worldY) {
        const screenX = this.center.x + worldX * this.scale;
        const screenY = this.center.y + worldY * this.scale;
        return new Point(screenX, screenY);
    }
    screenToWorld(screenX, screenY) {
        const worldX = (screenX - this.center.x) / this.scale;
        const worldY = (screenY - this.center.y) / this.scale;
        return new Point(worldX, worldY);
    }
}
//# sourceMappingURL=game.js.map