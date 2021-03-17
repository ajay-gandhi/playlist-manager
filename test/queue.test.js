
const Playlist = require("../index");

const genArr = n => (new Array(n)).fill(0).map((x, i) => i);

describe("getQueue", () => {
  test("returns requested number of items", () => {
    const playlist = new Playlist({ items: genArr(10) });
    expect(playlist.getQueue(5)).toEqual(genArr(5));
  });

  test("returns the default number of items", () => {
    const playlist = new Playlist({ items: genArr(10), default_queue_items: 8 });
    expect(playlist.getQueue()).toEqual(genArr(8));
  });

  test("returns the entire queue without a default", () => {
    const playlist = new Playlist({ items: genArr(10) });
    expect(playlist.getQueue()).toEqual(genArr(10));
  });
});

describe("constructor", () => {
  test("updates the queue", () => {
    const playlist = new Playlist({ items: genArr(5) });
    expect(playlist.getQueue()).toEqual(genArr(5));
  });

  test("clones items for the queue", () => {
    const arg = { foo: "bar" };
    const playlist = new Playlist({ items: [arg] });
    arg.foo = "baz";
    expect(playlist.getQueue()).toEqual([{ foo: "bar" }]);
  });
});

describe("setItems", () => {
  test("updates the queue", () => {
    const playlist = new Playlist();
    playlist.setItems(genArr(5));
    expect(playlist.getQueue()).toEqual(genArr(5));
  });

  test("clones items for the queue", () => {
    const arg = { foo: "bar" };
    const playlist = new Playlist();
    playlist.setItems(arg);
    arg.foo = "baz";
    expect(playlist.getQueue()).toEqual([{ foo: "bar" }]);
  });
});

describe("addItems", () => {
  test("updates the queue", () => {
    const playlist = new Playlist();
    playlist.addItems(genArr(5));
    expect(playlist.getQueue()).toEqual(genArr(5));
  });

  test("clones items for the queue", () => {
    const arg = { foo: "bar" };
    const playlist = new Playlist();
    playlist.addItems(arg);
    arg.foo = "baz";
    expect(playlist.getQueue()).toEqual([{ foo: "bar" }]);
  });
});

describe("removeItems", () => {
  test("updates the queue", () => {
    const playlist = new Playlist({ items: [{ id: 1, value: "a"}, { id: 2, value: "b" }] });
    playlist.removeItems(1);
    expect(playlist.getQueue()).toEqual([{ id: 2, value: "b" }]);
  });
});

describe("toggleShuffle", () => {
  test("shuffles the queue", () => {
    const playlist = new Playlist({ items: genArr(10) });
    playlist.toggleShuffle();
    expect(playlist.getQueue()).not.toEqual(genArr(10));
  });

  test("unshuffles the queue", () => {
    const playlist = new Playlist({ items: genArr(10) });
    playlist.toggleShuffle();
    playlist.toggleShuffle();
    expect(playlist.getQueue()).toEqual(genArr(10));
  });
});
