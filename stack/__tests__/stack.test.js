const createStack = require("../stack");

describe("createStack", () => {
  test("1. Returns an object", () => {
    expect(typeof createStack()).toEqual("object");
  });

  describe("Testing for properties", () => {
    test("2. Returns an object containing quantity property initialized to 0", () => {
      const output = createStack();
      expect(output.quantity).toBe(0);
    });

    test("3. Returns an object containing storage property initialized to empty object", () => {
      const output = createStack();
      expect(output.storage).toEqual({});
    });

    test("4. Returns an object containing maxSize property which can be given as an argument. If not given as an argument initialise it to a default value of 10", () => {
      const output = createStack(5);
      expect(output.maxSize).toBe(5);
    });
  });

  describe("Testing for functions", () => {
    test("5. When called with push function, must add 'item' to the end stack 'storage' provided that the stack is not already full.", () => {
      const output = createStack(2);
      output.push("apple");
      expect(output.storage).toEqual({ 1: "apple" });

      output.push("orange");
      expect(output.storage).toEqual({ 1: "apple", 2: "orange" });

      output.push("banana");
      // must not push beyond max size
      expect(output.storage).toEqual({ 1: "apple", 2: "orange" });
    });

    test("6. When called with pop function, must return and remove 'item' at the end of stack 'storage' provided that the stack is not empty. If empty, return undefined", () => {
      const output = createStack(2);
      output.push("apple");
      output.push("orange");

      expect(output.pop()).toBe("orange");
      expect(output.pop()).toBe("apple");
      expect(output.pop()).toBe(undefined);
      // must be empty
      expect(output.storage).toEqual({});
    });

    test("7. When called with isEmpty function, return true if the stack is empty, false otherwise", () => {
      const output = createStack(2);
      expect(output.isEmpty()).toBe(true);

      output.push("apple");
      expect(output.isEmpty()).toBe(false);

      output.pop();
      expect(output.isEmpty()).toBe(true);
    });

    test("8. When called with isFull function, return true if the stack is full, false otherwise", () => {
      const output = createStack(2);

      output.push("apple");
      expect(output.isFull()).toBe(false);

      output.push("orange");
      expect(output.isFull()).toBe(true);
    });

    test("9. When called with peek function, return 'item' at the top of stack 'storage', if stack is empty return undefined", () => {
      const output = createStack(2);

      output.push("apple");
      expect(output.peek()).toBe("apple");

      output.pop();
      expect(output.peek()).toBe(undefined);

      output.push("orange");
      output.push("banana");
      output.push("kiwi");
      expect(output.peek()).toBe("banana");
    });

    test("10. peek function must not remove last item of stack", () => {
      const output = createStack(2);

      output.push("apple");
      output.push("orange");
      expect(output.peek()).toBe("orange");

      expect(output.storage).toEqual({ 1: "apple", 2: "orange" });
    });
  });
});
