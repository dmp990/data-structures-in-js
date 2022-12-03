const createMap = require("../map");

describe("map", () => {
  describe("Testing Properties: ", () => {
    test("1. must return an object containing two nested objects, one for keys and one for values", () => {
      const output = createMap();
      expect(output).toHaveProperty("keys");
      expect(output).toHaveProperty("values");
    });

    test("2. have an object to store keys initialized to {}", () => {
      const output = createMap();
      expect(output).toHaveProperty("keys");
      expect(output).toHaveProperty("values");

      expect(output.keys).toEqual({});
    });
    test("3. have an object to store values initialized to {}", () => {
      const output = createMap();
      expect(output).toHaveProperty("keys");
      expect(output).toHaveProperty("values");

      expect(output.values).toEqual({});
    });
  });

  describe("Testing methods: ", () => {
    describe("getSize() Method:", () => {
      test("getSize() must be a function in the object", () => {
        const output = createMap();
        expect(typeof output.getSize).toBe("function");
      });

      test("must return the size of map object i.e. number of keys stored in it", () => {
        const output = createMap();
        output.keys = { 1: "hello", 2: 45 };
        expect(output.getSize()).toBe(2);
      });
    });
    describe("set() Method:", () => {
      test("set must be a function in the object", () => {
        const output = createMap();
        expect(typeof output.set).toBe("function");
      });

      test("must add key in keysObj and value in valuesObj", () => {
        const output = createMap();
        output.set("5", 3);
        expect(output.keys).toEqual({ 1: "5" });
        expect(output.values).toEqual({ 1: 3 });
      });

      test("must be able to add a function as a key too", () => {
        const output = createMap();
        output.set(() => {}, 3);
        expect(typeof output.keys[1]).toBe("function");
        expect(output.values).toEqual({ 1: 3 });
      });
    });
    describe("get() Method:", () => {
      test("get must be a function in the object", () => {
        const output = createMap();
        expect(typeof output.get).toBe("function");
      });

      test("must return value stored against the key", () => {
        const output = createMap();
        output.set("5", 3);
        output.set("4", 9);

        let retVal = output.get("4");
        expect(retVal).toBe(9);

        retVal = output.get("5");
        expect(retVal).toBe(3);
      });

      test("must not mutate the object", () => {
        const output = createMap();
        output.set("5", 3);
        output.set("4", 9);

        let retVal = output.get("4");
        expect(retVal).toBe(9);
        retVal = output.get("5");
        expect(retVal).toBe(3);

        expect(output.keys).toEqual({ 1: "5", 2: "4" });
        expect(output.values).toEqual({ 1: 3, 2: 9 });
      });

      test("must be able to return a function as value too", () => {
        const output = createMap();
        output.set(3, (a, b) => a + b);
        const func = output.get(3);
        expect(typeof func).toBe("function");
        expect(func(2, 4)).toBe(6);
      });
    });
    describe("deleteItem() Method:", () => {
      test("deleteItem must be a function in the object", () => {
        const output = createMap();
        expect(typeof output.deleteItem).toBe("function");
      });

      test("must delete the value stored against the given key", () => {
        const output = createMap();
        output.set("5", 3);
        output.set("4", 9);

        output.deleteItem("4");
        expect(output.keys).toEqual({ 1: "5" });
        expect(output.values).toEqual({ 1: 3 });
      });
      test("must delete and be able to reorder the keys and values", () => {
        const output = createMap();
        output.set("5", 3);
        output.set("4", 9);
        output.set("blizzard", "floaters");
        output.set("banana", "kiwi");
        output.set(50, "cent");

        expect(output.keys).toEqual({
          1: "5",
          2: "4",
          3: "blizzard",
          4: "banana",
          5: 50,
        });

        expect(output.values).toEqual({
          1: 3,
          2: 9,
          3: "floaters",
          4: "kiwi",
          5: "cent",
        });

        output.deleteItem("blizzard");
        expect(output.keys).toEqual({
          1: "5",
          2: "4",
          3: "banana",
          4: 50,
        });
        expect(output.values).toEqual({
          1: 3,
          2: 9,
          3: "kiwi",
          4: "cent",
        });

        output.deleteItem(50);
        expect(output.keys).toEqual({
          1: "5",
          2: "4",
          3: "banana",
        });
        expect(output.values).toEqual({
          1: 3,
          2: 9,
          3: "kiwi",
        });

        output.deleteItem("5");
        expect(output.keys).toEqual({
          1: "4",
          2: "banana",
        });
        expect(output.values).toEqual({
          1: 9,
          2: "kiwi",
        });
      });
    });
    describe("clear() Method:", () => {
      test("clear must be a function in the object", () => {
        const output = createMap();
        expect(typeof output.clear).toBe("function");
      });

      test("must clear the object i.e. all keys and values to be deleted", () => {
        const output = createMap();
        output.set("5", 3);
        output.set("4", 9);
        output.set("blizzard", "floaters");
        output.set("banana", "kiwi");
        output.set(50, "cent");

        expect(output.getSize()).toBe(5);
        output.clear();
        expect(output.getSize()).toBe(0);
        expect(output.keys).toEqual({});
        expect(output.values).toEqual({});
      });
    });
  });

  describe("Testing iterator methods:", () => {
    describe("entries()", () => {
      test("1. entries() must be a function on the object", () => {
        const output = createMap();
        expect(typeof output.entries).toBe("function");
      });
      test("2. entries() must return an iterator object", () => {
        const output = createMap();
        const iteratorF = output.entries();
        expect(typeof iteratorF).toBe("object");
      });
      test("3. the iterator object must have a next function", () => {
        const output = createMap();
        const iteratorF = output.entries();
        expect(typeof iteratorF.next).toBe("function");
      });
      test("4. next() should return an object", () => {
        const output = createMap();
        const iteratorF = output.entries();
        expect(typeof iteratorF.next()).toEqual("object");
      });
      test("5. the returned object should have 2 keys 'value' and 'done'", () => {
        const output = createMap();
        const iteratorF = output.entries();
        expect(iteratorF.next()).hasOwnProperty("value");
        expect(iteratorF.next()).hasOwnProperty("done");
      });
      test("6. If the object is empty, 'value' should be initialized to undefined and 'done' to true", () => {
        const output = createMap();
        const iteratorF = output.entries();
        expect(iteratorF.next()).hasOwnProperty("value");
        expect(iteratorF.next()).hasOwnProperty("done");
        expect(iteratorF.next().value).toBe(undefined);
        expect(iteratorF.next().done).toBe(true);
      });

      describe("Testing for non empty map", () => {
        test("On first invocation, should return first key value pair, on second invocation return second key value pair and so on", () => {
          const output = createMap();
          output.set("first", "banana");
          output.set("second", "apple");

          const iteratorF = output.entries();
          expect(iteratorF.next().value).toEqual(["first", "banana"]);

          expect(iteratorF.next().value).toEqual(["second", "apple"]);
        });

        test("When there are no more entries left in map, return undefined", () => {
          const output = createMap();
          output.set("first", "banana");
          output.set("second", "apple");

          const iteratorF = output.entries();
          iteratorF.next();
          iteratorF.next();

          expect(iteratorF.next().value).toBe(undefined);
        });
      });
    });
  });
});
