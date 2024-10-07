// 3. Liskov’s Substitution Principle

//UseCase:-   If a function expects a Shape object to calculate its area, any valid subtype like Circle or Square should seamlessly replace it, maintaining the expected behavior.

// Before (LSP Violates):

interface Shape {
  calculateArea()
}

class Rectangle implements Shape {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  calculateArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
  setWidth(width) {
    this.width = width;
    this.height = width;
  }
  setHeight(height) {
    this.width = height; 
    this.height = height;
  }
}

function drawShape(shape) {
  const area = shape.calculateArea();
}


const mySquare = new Square(5);
mySquare.setWidth(4); 
drawShape(mySquare); 

// (LSP Applied):
  
interface Shape {
  calculateArea();
}
class Rectangle implements Shape
{
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  calculateArea() {
    return this.width * this.height;
  }
}

function drawShape(shape) {
  const area = shape.calculateArea();
}
drawShape(new Rectangle(5, 4)); 










