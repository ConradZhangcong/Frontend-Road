class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle)
    this.length = length
    this.width = width
  }
}

let obj = new Rectangle(3, 4) // true
