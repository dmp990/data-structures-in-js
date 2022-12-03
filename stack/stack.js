function push(item) {
  if (this.quantity < this.maxSize) {
    this.quantity++;
    this.storage[this.quantity] = item;
  }
}
function pop() {
  if (this.quantity !== 0) {
    this.quantity--;
    const keyArr = Object.keys(this.storage);
    const toBeReturned = this.storage[keyArr[keyArr.length - 1]];
    delete this.storage[keyArr[keyArr.length - 1]];
    return toBeReturned;
  }
  return undefined;
}
function isEmpty() {
  return this.quantity === 0 && Object.keys(this.storage).length === 0;
}
function isFull() {
  return this.quantity === this.maxSize;
}
function peek() {
  const keyArr = Object.keys(this.storage);
  return this.storage[keyArr[keyArr.length - 1]];
}

function createStack(size = 10) {
  // definition of object
  const obj = {};

  // decoration of object
  obj.quantity = 0;
  obj.storage = {};
  obj.maxSize = size;

  // definition of methods on object
  obj.push = push;
  obj.pop = pop;
  obj.isEmpty = isEmpty;
  obj.isFull = isFull;
  obj.peek = peek;

  // returning the object
  return obj;
}

module.exports = createStack;
