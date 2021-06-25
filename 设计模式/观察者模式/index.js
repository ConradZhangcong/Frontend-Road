class Subject {
  constructor() {
    this.Observers = []
  }
  add (observer) {
    this.Observers.push(observer)
  }
  remove (observer) {
    this.Observers.filter(item => item === observer)
  }
  notify () {
    this.Observers.forEach(item => {
      item.update()
    })
  }
}

class Observe {
  constructor(name) {
    this.name = name
  }
  update () {
    console.log(`my name is ${this.name}`)
  }
}

let sub = new Subject()
let obs1 = new Observer('leaf1')
let obs2 = new Observer('leaf2')
sub.add(obs1)
sub.add(obs2)
sub.notify()
