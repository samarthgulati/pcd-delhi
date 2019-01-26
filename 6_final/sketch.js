var ball, maze, center, goal, level, el, acceleration
// var ACC_FACTOR, ACC_MAX, VEL_MAX
var side = Math.min(window.innerWidth, window.innerHeight) * 0.9

function setup() {
    colorMode(HSB)

    // ACC_FACTOR = 0.0005
    // ACC_MAX = side * 0.5 * accFactor
    // VEL_MAX = 5

    // bounceSound = loadSound('jump.mp3')
    // bounceSound = loadSound('bounce.wav')

    // bounceSound = document.createElement('audio')
    // bounceSound.src = 'bounce.wav'

    el = createCanvas(side, side)
    center = createVector(side * 0.5, side * 0.5)
    level = 1

    var r = side * 0.02
    var columns = 10
    var gap = r * 2 * 1.25
    var offset = r + gap * 0.5
    ball = new Ball(createVector(offset, offset), r)
    maze = new Maze(columns, gap)

    goal = new Goal(
        createVector(
            side - gap * 0.5,
            side - gap * 0.5
        ),
        maze.r
    )
}

function handleOrientationChange(e) {
    acceleration = {
        alpha: e.alpha,
        beta: e.beta,
        gamma: e.gamma
    }
}

function draw() {
    clear()
    window.addEventListener('deviceorientation', handleOrientationChange)
    var goalDist = ball.pos.dist(goal.pos) - (ball.r + goal.r)
    if(goalDist <= 0) {
        ball.reset()
        maze.update()
        goal.update()
        level++
    } else {
        for(var i = 0; i < maze.obstructions.length; i++) {
            var obstruction = maze.obstructions[i]
            var dist = ball.pos.dist(obstruction.pos) - (ball.r + obstruction.r)
            if(dist <= 0) {
                ball.collision(obstruction)
                var normal = p5.Vector.sub(ball.pos, obstruction.pos).normalize()
                ball.removeOverlap(dist, normal)
            }
        }
        ball.update()
    }
    maze.render()
    goal.render()
    ball.render()

    el.canvas.style.background = `radial-gradient(circle at 
        ${map(ball.acc.x, -0.1, 0.1, 0, 100)}% 
        ${map(ball.acc.y, -0.1, 0.1, 0, 100)}%, 
        hsl(50, 25%, 100%), 
        hsl(50, 25%, 75%))`
}
