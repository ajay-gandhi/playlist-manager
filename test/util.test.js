
const Util = require("../util");

describe("fyShuffle", () => {
  test("shuffles the array", () => {
    const items = (new Array(50)).fill(0).map((x, i) => i);
    expect(Util.fyShuffle(items)).not.toEqual(items);
  });

  test("contains all the original elements", () => {
    const items = (new Array(5)).fill(0).map((x, i) => i);
    const shuffled = Util.fyShuffle(items);
    expect(shuffled.length).toEqual(items.length);
    items.forEach((item) => {
      expect(shuffled).toContain(item);
    });
  });

  test("clones items", () => {
    const items = [{ a: "b", c: "d" }];
    const shuffled = Util.fyShuffle(items);
    items[0].c = "f";
    expect(shuffled).not.toEqual(items);
  });
});

describe("argsToArray", () => {
  test("converts given object to list", () => {
    // Simulate arguments object
    const args = { 0: "foo", 1: "bar", 2: "baz" };
    expect(Util.argsToArray(args)).toEqual(["foo", "bar", "baz"]);
  });
});

describe("clone", () => {
  test("clones an array", () => {
    const input = ["foo", "bar", "baz"];
    const cloned = Util.clone(input);
    expect(cloned).toEqual(input);
    const removed = input.shift();
    expect(cloned).toContain(removed);
  });

  test("deep clones arrays", () => {
    const input = [["foo"], "bar", "baz"];
    const cloned = Util.clone(input);
    expect(cloned).toEqual(input);
    const removed = input[0].shift();
    expect(cloned[0]).toContain(removed);
  });

  test("clones objects", () => {
    const input = { "foo": "bar" };
    const cloned = Util.clone(input);
    expect(cloned).toEqual(input);
    input.foo = "baz";
    expect(cloned.foo).toEqual("bar");
  });

  test("deep clones objects", () => {
    const input = { "foo": { "woah": "bar" } };
    const cloned = Util.clone(input);
    expect(cloned).toEqual(input);
    input.foo.woah = "baz";
    expect(cloned.foo.woah).toEqual("bar");
  });

  test("uses an object's clone method", () => {
    const foo = { "ayy": "lmao" };
    const input = { clone: () => foo };
    expect(Util.clone(input)).toEqual(foo);
  });
});
