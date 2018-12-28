export default class MessageBox {
  constructor (capacity) {
    this.messages = []
    this.capacity = capacity
  }
  *[Symbol.iterator] () {
    for (let i = this.messages.length - 1; i >= 0; i--) {
      yield this.messages[i]
    }
  }
  add (message) {
    if (this.messages.length === this.capacity) {
      this.messages.splice(this.capacity - 1, 1)
    }
    this.messages.push(message)
  }
}
