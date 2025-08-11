interface Shape {
    area: () => number,
    perimeter: () => number,
}

class Rect implements Shape {
    constructor(private width: number, private height: number) { }

    area() {
        return this.width * this.height;
    }

    perimeter() {
        return 2 * (this.width + this.height);
    }

}

function getArea(s: Shape) {
    console.log("Area:", s.area());
}

var r = new Rect(5, 2);

getArea(r);