var ball, maze, center, goal, level
var side = Math.min(window.innerWidth, window.innerHeight) * 0.9

function setup() {
    colorMode(HSB)

    createCanvas(side, side)
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

function draw() {
    clear()
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
            }
        }
        ball.update()
    }
    maze.render()
    goal.render()
    ball.render()
}