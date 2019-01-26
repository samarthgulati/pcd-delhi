class Goal {
    constructor(pos, r) {
        this.pos = pos
        this.r = r
    }
    render() {
        fill(0, 0, 0)
        strokeWeight(2.5)
        stroke(0, 0, 0)
        ellipse(this.pos.x, this.pos.y, this.r * 2)
    }
}