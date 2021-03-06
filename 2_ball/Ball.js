class Ball {
    reset() {
        this.pos = this.initPos.copy()
        this.vel = createVector(0, 0)
        this.acc = createVector(0, 0)
    }
    constructor(pos = createVector(0, 0), r = 10) {
        this.initPos = pos.copy()
        this.r = r
        this.frictionCoeff = 0.5
        this.reset()
    }
    bounce() {
        if(this.pos.x > side - this.r) {
            this.vel.x *= -1 * this.frictionCoeff
            this.pos.x = side - this.r
        } else if(this.pos.x < this.r) {
            this.vel.x *= -1 * this.frictionCoeff
            this.pos.x = this.r
        }
        if(this.pos.y > side - this.r) {
            this.vel.y *= -1 * this.frictionCoeff
            this.pos.y = side - this.r
        } else if(this.pos.y < this.r) {
            this.vel.y *= -1 * this.frictionCoeff
            this.pos.y = this.r
        }
    }
    wrap() {
        if(this.pos.x > side - this.r) {
            this.pos.x = this.r
        } else if(this.pos.x < this.r) {
            this.pos.x = side - this.r
        }
        if(this.pos.y > side - this.r) {
            this.pos.y = this.r
        } else if(this.pos.y < this.r) {
            this.pos.y = side - this.r
        }
    }
    update() {
        var mouse = createVector(mouseX, mouseY)
        this.acc = p5.Vector.sub(mouse, center)
        this.acc.mult(0.001)
        this.vel = this.vel.add(this.acc)
        this.vel.limit(10)
        this.pos = this.pos.add(this.vel)
        this.bounce()
        // this.wrap()
    }
    render() {
        fill(0, 100, 100)
        strokeWeight(2.5)
        stroke(0, 100, 10)
        ellipse(this.pos.x, this.pos.y, this.r * 2)
    }
}