import Point from './point.js';
export default class Game {
    private canvas;
    private context;
    private center;
    private lastTime;
    private scale;
    constructor(canvas: HTMLCanvasElement);
    attachEventListeners(): void;
    onMouseDown(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    onMouseUp(event: MouseEvent): void;
    onMouseLeave(event: MouseEvent): void;
    resize(): void;
    loop(timestamp: number): void;
    update(): void;
    render(): void;
    worldToScreen(worldX: number, worldY: number): Point;
    screenToWorld(screenX: number, screenY: number): Point;
}
//# sourceMappingURL=game.d.ts.map