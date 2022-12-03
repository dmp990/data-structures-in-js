const createSet = require("../set");

describe("set", () => {
  test("1. must return an object", () => {
    const output = createSet(5);
    expect(typeof output).toEqual("object");
  });

  describe("testing properties", () => {
    test("1. The returned object must have maxSize initialized to argument", () => {
      const output = createSet(5);
      expect(output.maxSize).toBe(5);
    });
    test("2. The returned object must have storage initialized to {}", () => {
      const output = createSet(5);
      expect(output.storage).toEqual({});
    });
    test("3. The returned object must have quantity denoting the number of elems, initialized to 0", () => {
      const output = createSet(5);
      expect(output.quantity).toBe(0);
      output.add(4);
      expect(output.quantity).toBe(1);
    });
  });

  describe("testing methods", () => {
    test("1. When called with function has, return true is set has item in it otherwise return false", () => {
      const output = createSet(5);
      output.storage[1] = 3;
      expect(output.has(3)).toEqual(true);
    });
    test("2. When called with function add, add if an element is not already in the set AND number of elements does not exceed maxSize, otherwise don't add", () => {
      const output = createSet(5);
      output.add(3);
      expect(output.storage).toEqual({ 1: 3 });

      output.add(4);
      output.add(5);
      output.add(6);
      output.add(7);
      output.add(8);
      expect(output.storage).toEqual({ 1: 3, 2: 4, 3: 5, 4: 6, 5: 7 });
    });

    test("3. When called with function delete, delete element from set", () => {
      const output = createSet(5);
      output.add(3);
      output.add(4);
      output.add("apple");
      output.add("orange");

      output.deleteItem("apple");
      expect(output.storage).toEqual({ 1: 3, 2: 4, 3: "orange" });

      output.deleteItem(4);
      expect(output.storage).toEqual({ 1: 3, 2: "orange" });

      output.deleteItem(3);
      expect(output.storage).toEqual({ 1: "orange" });

      output.deleteItem(3);
      expect(output.storage).toEqual({ 1: "orange" });
    });
  });

  describe("Testing union", () => {
    test("1. When called with an empty set, do not modify the object", () => {
      const set1 = createSet(3);
      set1.add("kiwi");
      const set2 = createSet(3);

      set1.union(set2);
      expect(set1.storage).toEqual({ 1: "kiwi" });
    });

    test("2. When called with a non-empty set with no values unique from set1, do not modify the object", () => {
      const set1 = createSet(3);
      set1.add("kiwi");
      set1.add("avocado");
      set1.add("banana");
      const set2 = createSet(3);
      set2.add("kiwi");
      set2.add("avocado");

      set1.union(set2);
      expect(set1.storage).toEqual({ 1: "kiwi", 2: "avocado", 3: "banana" });
    });

    test("3. When called with a non-empty set with some values unique from set1, modify the object accordingly", () => {
      const set1 = createSet(8);
      set1.add("kiwi");
      set1.add("avocado");
      set1.add("banana");
      const set2 = createSet(3);
      set2.add("notKiwi");
      set2.add("avocado");
      set2.add("blueberries");

      set1.union(set2);
      expect(set1.storage).toEqual({
        1: "kiwi",
        2: "avocado",
        3: "banana",
        4: "notKiwi",
        5: "blueberries",
      });
    });

    test("4. When called with a non-empty set with all values unique from set1, modify the object accordingly", () => {
      const set1 = createSet(8);
      set1.add("kiwi");
      set1.add("avocado");
      set1.add("banana");
      const set2 = createSet(3);
      set2.add("notKiwi");
      set2.add("strawberries");
      set2.add("blueberries");

      set1.union(set2);
      expect(set1.storage).toEqual({
        1: "kiwi",
        2: "avocado",
        3: "banana",
        4: "notKiwi",
        5: "strawberries",
        6: "blueberries",
      });
    });

    test("5. Must not add elements if number of items exceeds maxSize", () => {
      const set1 = createSet(3);
      set1.add("kiwi");
      set1.add("avocado");
      set1.add("banana");
      const set2 = createSet(3);
      set2.add("notKiwi");
      set2.add("strawberries");
      set2.add("blueberries");

      set1.union(set2);
      expect(set1.storage).toEqual({
        1: "kiwi",
        2: "avocado",
        3: "banana",
      });
    });
  });

  describe("Testing Intersection", () => {
    test("1. When called with empty object, modify the current object", () => {
      const set1 = createSet(5);
      const set2 = createSet(5);

      set1.add(1);
      set1.add(2);

      set1.intersection(set2);
      expect(set1.storage).toEqual({});

      const set3 = createSet(5);
      set2.add(5);
      set3.intersection(set2);
      expect(set3.storage).toEqual({});
    });

    test("2. When called with non-empty object where all items exist in set1, do not modify the current object", () => {
      const set1 = createSet(5);
      const set2 = createSet(5);

      set1.add(1);
      set1.add(2);
      set2.add(1);
      set2.add(2);

      set1.intersection(set2);
      expect(set1.storage).toEqual({ 1: 1, 2: 2 });
    });

    test("3. When called with non-empty object where some items are unique from set1, modify object to store common elements", () => {
      const set1 = createSet(5);
      const set2 = createSet(5);

      set1.add(1);
      set1.add(2);
      set1.add(3);

      set2.add(1);
      set2.add(2);
      set2.add(7);
      set2.add(9);
      set2.add(4);

      set1.intersection(set2);
      expect(set1.storage).toEqual({ 1: 1, 2: 2 });
    });

    test("4. When called with non-empty object where all items are same as set1 (irrespective of order), do not add new element to original object", () => {
      const set1 = createSet(5);
      const set2 = createSet(5);

      set1.add(1);
      set1.add(2);
      set1.add(3);
      set1.add(4);
      set1.add(5);

      set2.add(1);
      set2.add(2);
      set2.add(3);
      set2.add(4);
      set2.add(5);

      set1.intersection(set2);
      expect(set1.storage).toEqual({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });
    });
  });
});
