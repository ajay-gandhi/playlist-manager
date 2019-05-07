
const Playlist = require("./index");

const Lowkey = new Playlist();
Lowkey.setItems(["hello", "world"]);
Lowkey.addItem("anotha one");
Lowkey.toggleShuffle();
// Lowkey.toggleRepeat(2);
// Lowkey.queue.get(5);
