
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
