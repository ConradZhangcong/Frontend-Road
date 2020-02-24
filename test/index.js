const Car = {
  name: 'BMW',
  price: 100000,
  set discount (x) {
    this.d = x
  },
  get discount () {
    return this.d
  }
}

console.log(Object.getOwnPropertyDescriptors(Car))
return

console.log(Object.getOwnPropertyDescriptor(Car, 'discount'))

// {
//   get: [Function: get discount],
//   set: [Function: set discount],
//   enumerable: true,
//   configurable: true
// }

const ElectricCar = Object.assign({}, Car)

console.log(Object.getOwnPropertyDescriptor(ElectricCar, 'discount'))

// {
//   value: undefined,
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

const ElectricCar2 = Object.defineProperties({}, Object.getOwnPropertyDescriptors(Car))

console.log(ElectricCar) // { name: 'BMW', price: 100000, discount: undefined }
console.log(ElectricCar2) // { name: 'BMW', price: 100000, discount: undefined }
