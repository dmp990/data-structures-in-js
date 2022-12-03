/* lets do 2 separate objects one for keys and one for values
Stipulations: both keys and values will be stored with same numeric key in their respective objects
After deleting, bring the order back into the objects within object
 */
function getSize() {
  return (length = Object.keys(this.keys).length);
}
function set(key, value) {
  const indexToAddAt = this.getSize() + 1;
  this.keys[indexToAddAt] = key;
  this.values[indexToAddAt] = value;
}
function get(key) {
  const keysArr = Object.keys(this.keys);
  for (let i = 0; i < keysArr.length; i++) {
    if (this.keys[keysArr[i]] === key) {
      return this.values[keysArr[i]];
    }
  }
}
function deleteItem(key) {
  const keysArr = Object.keys(this.keys);

  let index = 0;
  for (let i = 0; i < keysArr.length; i++) {
    if (this.keys[keysArr[i]] === key) {
      index = i + 1;
      break;
    }
  }
  deleteAndRestoreOrder(this.keys, index);
  deleteAndRestoreOrder(this.values, index);
}
function clear() {
  const keysArr = Object.keys(this.keys);
  for (let i = 0; i < keysArr.length; i++) {
    delete this.keys[keysArr[i]];
    delete this.values[keysArr[i]];
  }
}
// iterator functions
/*
const map1 = new Map();
map1.set('0', 'foo');
map1.set(1, 'bar');
const iterator1 = map1.entries();
console.log(iterator1.next().value);
// expected output: ["0", "foo"]
console.log(iterator1.next().value);
// expected output: [1, "bar"]

*/
function entries() {
  let index = 1;
  const theObj = this;
  return {
    next: function () {
      if (theObj.getSize() === 0) {
        return { value: undefined, done: true };
      }
      if (theObj.keys[index] === undefined) {
        return { value: undefined, done: true };
      }
      const obj = {
        value: [theObj.keys[index], theObj.values[index++]],
        done: false,
      };
      return obj;
    },
  };
}

function createMap() {
  // define obj
  const objToReturn = { 1: {}, 2: {} };

  // decorate
  const keysObj = {};
  const valuesObj = {};
  objToReturn["keys"] = keysObj;
  objToReturn["values"] = valuesObj;

  // define methods
  objToReturn.getSize = getSize;
  objToReturn.set = set;
  objToReturn.get = get;
  objToReturn.deleteItem = deleteItem;
  objToReturn.clear = clear;
  // iterator methods
  objToReturn.entries = entries;

  // return obj
  return objToReturn;
}

// not part of the map data structure, just a helper
function deleteAndRestoreOrder(obj, key) {
  // object passed will always have numeric keys starting from 1
  const keyArr = Object.keys(obj);
  delete obj[key];
  const index = key; // 2
  for (let i = index; i < keyArr.length; i++) {
    obj[i] = obj[i + 1];
  }
  delete obj[keyArr.length];
}

module.exports = createMap;
