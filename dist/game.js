import Point from './point.js';
import Line from './line.js';
import Dot from './dot.js';
const DotRadius = 0.05;
const DotRivetRadius = 0.04;
const DotRadiusSquared = DotRadius * DotRadius;
const LineWidth = 0.01;
const RingRadius = 0.95;
const RingRadiusSquared = RingRadius * RingRadius;
const Tau = 2 * Math.PI;
export default class Game {
    canvas;
    context;
    center = new Point(0, 0);
    lastTime = 0;
    scale = 0;
    lines = [];
    dots = [];
    selectedDotIndex = -1;
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.dots.push(new Dot(0.5, 0.5, true));
        this.dots.push(new Dot(-0.5, 0.5));
        this.dots.push(new Dot(-0.5, -0.5));
        this.dots.push(new Dot(0.5, -0.5, true));
        this.dots.push(new Dot(0.0, 0.35, true));
        this.dots.push(new Dot(0.35, 0.0, true));
        this.dots.push(new Dot(0.0, -0.35, true));
        this.dots.push(new Dot(-0.35, 0.0, true));
        this.dots.push(new Dot(0.0, 0.0));
        this.dots.push(new Dot(0.3, 0.4));
        this.dots.push(new Dot(-0.3, 0.4));
        this.lines.push(new Line(0, 1));
        this.lines.push(new Line(1, 2));
        this.lines.push(new Line(2, 3));
        this.lines.push(new Line(3, 0));
        this.lines.push(new Line(4, 5));
        this.lines.push(new Line(5, 6));
        this.lines.push(new Line(6, 7));
        this.lines.push(new Line(7, 4));
        this.lines.push(new Line(8, 9));
        this.lines.push(new Line(9, 10));
        this.lines.push(new Line(10, 8));
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
        if (event.button !== 0)
            return;
        const worldX = this.screenToWorldX(event.clientX);
        const worldY = this.screenToWorldY(event.clientY);
        this.selectedDotIndex = this.attemptSelectDot(worldX, worldY);
    }
    attemptSelectDot(worldX, worldY) {
        let closestDotIndex = -1;
        let closestDistanceSquared = Infinity;
        for (let i = 0; i < this.dots.length; i++) {
            const dot = this.dots[i];
            if (dot.fixed)
                continue;
            const distanceSquared = this.distanceSquared(worldX, worldY, dot.x, dot.y);
            if (distanceSquared < closestDistanceSquared && distanceSquared < DotRadiusSquared) {
                closestDistanceSquared = distanceSquared;
                closestDotIndex = i;
            }
        }
        return closestDotIndex;
    }
    distanceSquared(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        return dx * dx + dy * dy;
    }
    onMouseMove(event) {
        if (this.selectedDotIndex === -1)
            return;
        let worldX = this.screenToWorldX(event.clientX);
        let worldY = this.screenToWorldY(event.clientY);
        this.attemptMoveDot(worldX, worldY);
    }
    attemptMoveDot(worldX, worldY) {
        let distanceSquared = this.distanceSquared(worldX, worldY, 0, 0);
        if (distanceSquared > RingRadiusSquared) {
            const normalizedScalar = RingRadius / Math.sqrt(distanceSquared);
            worldX *= normalizedScalar;
            worldY *= normalizedScalar;
        }
        const dot = this.dots[this.selectedDotIndex];
        dot.x = worldX;
        dot.y = worldY;
    }
    isOverlap(line1, line2) {
        if (line1.dotIndex1 === line2.dotIndex1)
            return false;
        if (line1.dotIndex1 === line2.dotIndex2)
            return false;
        if (line1.dotIndex2 === line2.dotIndex1)
            return false;
        if (line1.dotIndex2 === line2.dotIndex2)
            return false;
        const a = this.dots[line1.dotIndex1];
        const b = this.dots[line1.dotIndex2];
        const c = this.dots[line2.dotIndex1];
        const d = this.dots[line2.dotIndex2];
        const c1 = this.signedSide(c.x, c.y, a.x, a.y, b.x, b.y);
        const c2 = this.signedSide(d.x, d.y, a.x, a.y, b.x, b.y);
        const c3 = this.signedSide(a.x, a.y, c.x, c.y, d.x, d.y);
        const c4 = this.signedSide(b.x, b.y, c.x, c.y, d.x, d.y);
        return c1 * c2 < 0 && c3 * c4 < 0;
    }
    signedSide(x, y, x1, y1, x2, y2) {
        return (x2 - x1) * (y - y1) - (y2 - y1) * (x - x1);
    }
    onMouseUp(event) {
        if (event.button !== 0)
            return;
        this.selectedDotIndex = -1;
    }
    onMouseLeave(event) {
        this.selectedDotIndex = -1;
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
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.strokeStyle = '#fff2';
        this.renderRing();
        this.renderLines();
        this.renderOverlaps();
        this.renderDots();
    }
    renderRing() {
        const ringRadius = this.scale * RingRadius;
        this.context.strokeStyle = '#fff2';
        this.context.beginPath();
        this.context.arc(this.center.x, this.center.y, ringRadius, 0, 2 * Math.PI);
        this.context.lineWidth = this.scale * LineWidth;
        this.context.stroke();
    }
    renderLines() {
        this.context.lineWidth = this.scale * LineWidth;
        this.context.strokeStyle = 'white';
        this.context.lineCap = 'round';
        this.context.beginPath();
        for (const line of this.lines) {
            const dot1 = this.dots[line.dotIndex1];
            const dot2 = this.dots[line.dotIndex2];
            const screenX1 = this.worldToScreenX(dot1.x);
            const screenY1 = this.worldToScreenY(dot1.y);
            const screenX2 = this.worldToScreenX(dot2.x);
            const screenY2 = this.worldToScreenY(dot2.y);
            this.context.moveTo(screenX1, screenY1);
            this.context.lineTo(screenX2, screenY2);
            this.context.stroke();
        }
    }
    renderOverlaps() {
        const isOverlapping = new Array(this.lines.length).fill(false);
        for (let i = 0; i < this.lines.length - 1; i++) {
            for (let j = i + 1; j < this.lines.length; j++) {
                const line1 = this.lines[i];
                const line2 = this.lines[j];
                if (this.isOverlap(line1, line2)) {
                    isOverlapping[i] = true;
                    isOverlapping[j] = true;
                }
            }
        }
        this.context.strokeStyle = 'red';
        this.context.lineWidth = this.scale * LineWidth;
        this.context.beginPath();
        for (let i = 0; i < this.lines.length; i++) {
            if (!isOverlapping[i])
                continue;
            const line = this.lines[i];
            const dot1 = this.dots[line.dotIndex1];
            const dot2 = this.dots[line.dotIndex2];
            const screenX1 = this.worldToScreenX(dot1.x);
            const screenY1 = this.worldToScreenY(dot1.y);
            const screenX2 = this.worldToScreenX(dot2.x);
            const screenY2 = this.worldToScreenY(dot2.y);
            this.context.moveTo(screenX1, screenY1);
            this.context.lineTo(screenX2, screenY2);
        }
        this.context.stroke();
    }
    renderDots() {
        const dotRadius = this.scale * DotRadius;
        const dotRivetRadius = this.scale * DotRivetRadius;
        this.context.fillStyle = 'white';
        this.context.beginPath();
        for (const dot of this.dots) {
            const screenX = this.worldToScreenX(dot.x);
            const screenY = this.worldToScreenY(dot.y);
            this.context.moveTo(screenX, screenY);
            this.context.arc(screenX, screenY, dotRadius, 0, Tau);
        }
        this.context.fill();
        this.context.fillStyle = 'black';
        this.context.beginPath();
        for (const dot of this.dots) {
            if (!dot.fixed)
                continue;
            const screenX = this.worldToScreenX(dot.x);
            const screenY = this.worldToScreenY(dot.y);
            this.context.moveTo(screenX, screenY);
            this.context.arc(screenX, screenY, dotRivetRadius, 0, Tau);
        }
        this.context.fill();
    }
    worldToScreenX(worldX) {
        return this.center.x + worldX * this.scale;
    }
    worldToScreenY(worldY) {
        return this.center.y + worldY * this.scale;
    }
    screenToWorldX(screenX) {
        return (screenX - this.center.x) / this.scale;
    }
    screenToWorldY(screenY) {
        return (screenY - this.center.y) / this.scale;
    }
}
//# sourceMappingURL=game.js.map