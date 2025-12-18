import Game from './game.js'

function main() {
    window.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('tangle-canvas') as HTMLCanvasElement
        new Game(canvas)
    })
}

main()