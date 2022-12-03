function enQueue(item) {
  if (this.back < this.maxSize) {
    this.back++;
    this.storage[this.back] = item;
  }
}

function deQueue() {
  if (this.back !== 0) {
    const keyArr = Object.keys(this.storage);
    this.back--;
    const toBeReturned = this.storage[keyArr[0]];
    delete this.storage[keyArr[0]];
    for (let i = 1; i < keyArr.length; i++) {
      this.storage[keyArr[i - 1]] = this.storage[keyArr[i]];
    }
    delete this.storage[keyArr[keyArr.length - 1]];
    return toBeReturned;
  }
  return undefined;
}
function getQuantity() {
  return this.back;
}
function isEmpty() {
  return this.back === 0;
}
function isFull() {
  return this.back === this.maxSize;
}
function peek() {
  if (this.back !== 0) {
    return this.storage[1];
  }
}
function createQueue(size = 10) {
  // define object
  const obj = {};

  // define properties
  obj.maxSize = size;
  obj.front = 1; // denotes front, key 1.., stay same
  obj.back = 0; // last item, change
  obj.storage = {};

  // define methods
  obj.enQueue = enQueue;
  obj.deQueue = deQueue;
  obj.getQuantity = getQuantity;
  obj.isEmpty = isEmpty;
  obj.isFull = isFull;
  obj.peek = peek;

  // return object
  return obj;
}

module.exports = createQueue;
