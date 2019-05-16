
const Playlist = require("../index");

const args = [
  { id: 1, value: "hi" },
  { id: 2, value: "hola" },
  { id: 3, value: "sup" },
  { id: 4, value: "hey" },
  { id: 5, value: "hello" },
  { id: 6, value: "world" },
];

describe("setItems", () => {
  test("sets items to given list", () => {
    const playlist = new Playlist();
    playlist.setItems([args[0], args[1]]);
    expect(playlist.items).toEqual([args[0], args[1]]);
  });

  test("overwrites previous items", () => {
    const playlist = new Playlist();
    playlist.setItems([args[0], args[1]]);
    playlist.setItems([args[2], args[3]]);
    expect(playlist.items).toEqual([args[2], args[3]]);
  });

  test("sets items to given args", () => {
    const playlist = new Playlist();
    playlist.setItems(args[4], args[5]);
    expect(playlist.items).toEqual([args[4], args[5]]);
  });

  test("clones items", () => {
    const playlist = new Playlist();
    const item = { ...args[0] };
    playlist.setItems(item);
    item.value = "changed";
    expect(playlist.items[0]).not.toEqual(item);
  });
});

describe("addItems", () => {
  test("adds one item", () => {
    const playlist = new Playlist();
    playlist.addItems(args[0]);
    expect(playlist.items).toEqual([args[0]]);
  });

  test("adds to the end of the list", () => {
    const playlist = new Playlist();
    playlist.addItems(args[0]);
    playlist.addItems(args[1]);
    expect(playlist.items).toEqual([args[0], args[1]]);
  });

  test("adds given list", () => {
    const playlist = new Playlist();
    playlist.addItems([args[2], args[3]]);
    expect(playlist.items).toEqual([args[2], args[3]]);
  });

  test("adds given args", () => {
    const playlist = new Playlist();
    playlist.addItems(args[4], args[5]);
    expect(playlist.items).toEqual([args[4], args[5]]);
  });

  test("clones items", () => {
    const playlist = new Playlist();
    const item = { ...args[0] };
    playlist.addItems(item);
    item.value = "changed";
    expect(playlist.items[0]).not.toEqual(item);
  });
});
