var ball, center
var side = Math.min(window.innerWidth, window.innerHeight) * 0.9

function setup() {
    colorMode(HSB)
    
    createCanvas(side, side)
    center = createVector(side * 0.5, side * 0.5)
    
    const r = side * 0.02
    ball = new Ball(createVector(r, r), r)
}

function draw() {
    clear()
    
    ball.update()
    ball.render()
}