// ----------- 3 --------------- 

// --------- Raw code ----------
class Shape {
    area() {
        throw new Error("Method 'area()' must be implemented.");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }
}

// Usage
function printArea(shape) {
    console.log(`Area: ${shape.area()}`);
}

const shape = new Square(5);
printArea(shape);


// The above code violates liskov substitution principle as an object of square cannot be used in place of object of rectangle
// It can be implemented using 


// -------- Refactored code -----------
class Shape {
    area() {
        throw new Error("Method 'area()' must be implemented.");
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class Square extends Shape {
    
    constructor(side) {
        super(side, side);
    }

    area() {
        return this.width * this.height;
    }

}

// Usage
function printArea(shape) {
    console.log(`Area: ${shape.area()}`);
}

const shape = new Square(5);
printArea(shape);


