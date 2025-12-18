import Line from './line.js';
export default class Game {
    private canvas;
    private context;
    private center;
    private lastTime;
    private scale;
    private lines;
    private dots;
    private selectedDotIndex;
    constructor(canvas: HTMLCanvasElement);
    attachEventListeners(): void;
    onMouseDown(event: MouseEvent): void;
    attemptSelectDot(worldX: number, worldY: number): number;
    distanceSquared(x1: number, y1: number, x2: number, y2: number): number;
    onMouseMove(event: MouseEvent): void;
    attemptMoveDot(worldX: number, worldY: number): void;
    isOverlap(line1: Line, line2: Line): boolean;
    signedSide(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number;
    onMouseUp(event: MouseEvent): void;
    onMouseLeave(event: MouseEvent): void;
    resize(): void;
    loop(timestamp: number): void;
    update(): void;
    render(): void;
    renderRing(): void;
    renderLines(): void;
    renderOverlaps(): void;
    renderDots(): void;
    worldToScreenX(worldX: number): number;
    worldToScreenY(worldY: number): number;
    screenToWorldX(screenX: number): number;
    screenToWorldY(screenY: number): number;
}
//# sourceMappingURL=game.d.ts.map