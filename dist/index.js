import Game from './game.js';
function main() {
    window.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('tangle-canvas');
        new Game(canvas);
    });
}
main();
//# sourceMappingURL=index.js.map