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
    collision(obstruction) {
        var alongDir = p5.Vector.sub(obstruction.pos, this.pos).normalize()
        var alongMag = p5.Vector.dot(this.vel, alongDir)
        var along = p5.Vector.mult(alongDir, alongMag)
        var perp = p5.Vector.sub(this.vel, along)
        var alongAfter = p5.Vector.mult(along, -1 * this.frictionCoeff)
        this.vel = p5.Vector.add(alongAfter, perp)
    }
    removeOverlap(dist, normal) {
        this.pos.sub(p5.Vector.mult(normal, dist))
    }
    bounce() {
        if(this.pos.x > side - this.r) {
            this.vel.x *= -1 * this.frictionCoeff
            var overlap = (side - this.r) - this.pos.x
            var normal = createVector(-1, 0)
            this.removeOverlap(overlap, normal)
        } else if(this.pos.x < this.r) {
            this.vel.x *= -1 * this.frictionCoeff
            var overlap = this.pos.x - (this.r)
            var normal = createVector(1, 0)
            this.removeOverlap(overlap, normal)
        }
        if(this.pos.y > side - this.r) {
            this.vel.y *= -1 * this.frictionCoeff
            var overlap = (side - this.r) - this.pos.y
            var normal = createVector(0, -1)
            this.removeOverlap(overlap, normal)
        } else if(this.pos.y < this.r) {
            this.vel.y *= -1 * this.frictionCoeff
            var overlap = this.pos.y - (this.r)
            var normal = createVector(0, 1)
            this.removeOverlap(overlap, normal)
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
        if(!acceleration) {
            var mouse = createVector(mouseX, mouseY)
            this.acc = p5.Vector.sub(mouse, center)
            this.acc.mult(0.001)
        } else {
            this.acc = createVector(acceleration.gamma, acceleration.beta)
            this.acc.mult(0.001)
        }
        this.vel = this.vel.add(this.acc)
        this.vel.limit(5)
        this.pos = this.pos.add(this.vel)
        this.bounce()
    }
    render() {
        fill(0, 100, 100)
        strokeWeight(2.5)
        stroke(0, 100, 10)
        ellipse(this.pos.x, this.pos.y, this.r * 2)
    }
}