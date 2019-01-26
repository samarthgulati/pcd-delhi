class Maze {
    constructor(columns, gap) {
        this.columns = columns
        this.gap = gap
        // width * columns + gap * (columns + 2) = side
        // width = (side - gap * (columns + 1)) / columns
        this.r = ((side - gap * (columns + 1)) / columns) * 0.5
        this.update()
    }
    update() {
        this.obstructions = []
        for(var x = 0; x < this.columns; x ++) {
            for(var y = 0; y < this.columns; y ++) {
                if(Math.random() > (10 - level) * 0.1) {
                    // var r = this.r * Math.random() * 1.5
                    this.obstructions.push({
                        pos: createVector(
                            this.gap + this.r + x * (this.r * 2 + this.gap), 
                            this.gap + this.r + y * (this.r * 2 + this.gap)), 
                        r: this.r
                    })
                }
            }
        }
    }
    render() {
        fill(0, 0, 75)
        strokeWeight(2.5)
        stroke(0, 0, 20)
        for(var i = 0; i < this.obstructions.length; i++) {
            var o = this.obstructions[i]
            ellipse(o.pos.x, o.pos.y, o.r * 2)
        }
    }
}