function has(item) {
  const keyArr = Object.keys(this.storage);
  for (let i = 0; i < keyArr.length; i++) {
    if (this.storage[keyArr[i]] === item) {
      return true;
    }
  }
  return false;
}
function add(item) {
  if (!this.has(item) && this.quantity < this.maxSize) {
    this.quantity++;
    this.storage[this.quantity] = item;
  }
}
function deleteItem(item) {
  let keyArr = Object.keys(this.storage);
  if (this.quantity !== 0 && this.has(item)) {
    let index = 0;
    for (let i = 0; i < keyArr.length; i++) {
      if (this.storage[keyArr[i]] === item) {
        index = i + 1;
        break;
      }
    }
    const deleted = this.storage[index];
    delete this.storage[index];
    keyArr = Object.keys(this.storage);
    for (let i = index; i <= keyArr.length; i++) {
      this.storage[i] = this.storage[i + 1];
    }
    delete this.storage[keyArr.length + 1];
    this.quantity--;
    return deleted;
  }
}

function union(set2) {
  const keysArr = Object.keys(set2.storage);
  if (keysArr.length === 0) {
    return 0;
  }
  for (let i = 0; i < keysArr.length; i++) {
    const elem = set2.storage[keysArr[i]];
    if (!this.has(elem)) {
      const elem = set2.storage[keysArr[i]];
      this.add(elem);
    }
  }
}
// member of both a, b

function intersection(set2) {
  const keysArr = Object.keys(set2.storage);
  const thisKeysArr = Object.keys(this.storage);

  /* if (this.quantity === 0) {
    return 0;
  } */
  if (keysArr.length === 0) {
    // if second set is empty
    // delete every item in this object
    for (let i = 0; i < thisKeysArr.length; i++) {
      delete this.storage[thisKeysArr[i]];
      this.quantity--;
    }
  } else {
    // if second set is not empty
    const commonItems = [];
    for (let i = 0; i < thisKeysArr.length; i++) {
      if (set2.has(this.storage[thisKeysArr[i]])) {
        commonItems.push(this.storage[thisKeysArr[i]]);
      }
    }
    // delete every item in this object
    for (let i = 0; i < thisKeysArr.length; i++) {
      delete this.storage[thisKeysArr[i]];
      this.quantity--;
    }
    // add common items to object
    for (let i = 0; i < commonItems.length; i++) {
      this.add(commonItems[i]);
    }
  }
}

function createSet(maxSize) {
  // define object
  const obj = {};

  // define properties
  obj.maxSize = maxSize;
  obj.quantity = 0;
  obj.storage = {};

  // define methods
  obj.has = has;
  obj.add = add;
  obj.deleteItem = deleteItem;
  obj.union = union;
  obj.intersection = intersection;

  // return object
  return obj;
}

module.exports = createSet;
