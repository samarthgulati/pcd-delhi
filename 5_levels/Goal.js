class Goal {
    constructor(pos, r) {
        this.pos = pos
        this.r = r
    }
    update() {
        this.pos = createVector(
            maze.gap * 0.5 + (maze.gap + maze.r * 2) * floor(maze.columns * random(0.5, 1)),
            maze.gap * 0.5 + (maze.gap + maze.r * 2) * floor(maze.columns * random(0.5, 1))
        )
    }
    render() {
        fill(0, 0, 0)
        strokeWeight(2.5)
        stroke(0, 0, 0)
        ellipse(this.pos.x, this.pos.y, this.r * 2)
    }
}