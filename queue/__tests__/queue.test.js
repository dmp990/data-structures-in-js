const createQueue = require("../queue");

describe("createQueue", () => {
  test("1. Returns an object", () => {
    expect(typeof createQueue(5)).toEqual("object");
  });

  describe("Testing for properties", () => {
    test("2. Returns an object containing 'maxSize' property set equal to argument", () => {
      const output = createQueue(10);
      expect(output.maxSize).toBe(10);
    });

    test("3. Returns an object containing 'front' equal to 1 and 'back' equal to 0, when no other method has been called on queue", () => {
      const output = createQueue(10);
      expect(output.front).toBe(1);
      expect(output.back).toBe(0);
    });

    test("4. Returns an object containing empty 'storage' object", () => {
      const output = createQueue(10);
      expect(output.storage).toEqual({});
    });
  });

  describe("Testing for functions", () => {
    test("5. When called with enQueue function, must add 'item' to the end of queue 'storage' provided that the queue is not already full.", () => {
      const output = createQueue(2);

      output.enQueue("apple");
      expect(output.storage).toEqual({ 1: "apple" });
      output.enQueue("orange");
      expect(output.storage).toEqual({ 1: "apple", 2: "orange" });
      output.enQueue("banana");
      expect(output.storage).not.toEqual({
        1: "apple",
        2: "orange",
        3: "banana",
      });
    });

    test("6. When called with deQueue function, must remove 'item' from the start of queue 'storage' provided that the queue is not already empty. If queue is already empty, return undefined", () => {
      const output = createQueue(2);

      output.enQueue("apple");
      output.enQueue("orange");
      let result = output.deQueue();
      expect(result).toBe("apple");
      expect(output.storage).toEqual({
        1: "orange",
      });

      result = output.deQueue();
      expect(result).toBe("orange");
      expect(output.storage).toEqual({});

      result = output.deQueue();
      expect(result).toBe(undefined);
      expect(output.storage).toEqual({});
    });

    test("7. When called with getQuantity function, return the number of items in the queue", () => {
      const output = createQueue(10);

      output.enQueue("apple");
      output.enQueue("orange");
      expect(output.getQuantity()).toEqual(2);

      output.deQueue();
      expect(output.getQuantity()).toEqual(1);

      output.deQueue();
      output.deQueue();
      expect(output.getQuantity()).toEqual(0);
    });

    test("8. When called with isEmpty function, return true if queue is empty, otherwise return false", () => {
      const output = createQueue(10);
      expect(output.isEmpty()).toEqual(true);

      output.enQueue("apple");
      output.enQueue("orange");
      expect(output.isEmpty()).toEqual(false);

      output.deQueue();
      output.deQueue();
      output.deQueue();
      expect(output.isEmpty()).toEqual(true);
    });

    test("9. When called with isFull function, return true if queue is full, otherwise return false", () => {
      const output = createQueue(10);
      expect(output.isFull()).toEqual(false);

      output.enQueue("apple");
      output.enQueue("orange");
      expect(output.isFull()).toEqual(false);

      output.enQueue("apple");
      output.enQueue("orange");
      output.enQueue("apple");
      output.enQueue("orange");
      output.enQueue("apple");
      output.enQueue("orange");
      output.enQueue("apple");
      output.enQueue("orange");
      expect(output.isFull()).toEqual(true);
      output.deQueue();
      expect(output.isFull()).toEqual(false);
    });

    test("10. When called with peek function, return the value at the front of queue, return undefined when queue is empty", () => {
      const output = createQueue(10);

      output.enQueue("apple");
      output.enQueue("orange");
      expect(output.peek()).toBe("apple");

      output.deQueue();
      output.enQueue("apple");
      output.enQueue("orange");
      expect(output.peek()).toBe("orange");

      output.deQueue();
      output.deQueue();
      output.deQueue();
      expect(output.peek()).toBe(undefined);
    });

    test("11. peek function must not remove the first element in a queue", () => {
      const output = createQueue(10);

      output.enQueue("apple");
      output.enQueue("orange");
      expect(output.peek()).toBe("apple");

      expect(output.storage).toEqual({ 1: "apple", 2: "orange" });
    });
  });
});
