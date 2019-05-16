
const Playlist = require("../index");

const INITIAL_STATE = {
  items: [],
  queue: [],
  default_queue_items: -1,
  history: [],
  max_history: 20,
  shuffle: false,
  repeat: false
};

test("has empty initial state", () => {
  const playlist = new Playlist();
  Object.keys(playlist).forEach((key) => {
    expect(playlist[key]).toEqual(INITIAL_STATE[key]);
  });
});

describe("constructor", () => {
  test("takes in args", () => {
    const playlist = new Playlist({
      default_queue_items: 15,
      shuffle: true,
    });
    Object.keys(playlist).forEach((key) => {
      if (key === "default_queue_items") expect(playlist[key]).toEqual(15);
      else if (key === "shuffle")        expect(playlist[key]).toEqual(true);
      else                               expect(playlist[key]).toEqual(INITIAL_STATE[key]);
    });
  });

  test("clones items", () => {
    const items = [{ "foo": "bar" }];
    const playlist = new Playlist({ items });
    items[0].foo = "baz";
    expect(playlist.items[0].foo).toEqual("bar");
  });
});
