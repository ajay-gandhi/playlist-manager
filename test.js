
const Playlist = require("./index");

const Lowkey = new Playlist();
Lowkey.setItems(["hello", "world"]);
Lowkey.addItem("anotha one");
console.log(Lowkey);
Lowkey.next();
console.log(Lowkey);
Lowkey.next();
console.log(Lowkey);
Lowkey.prev();
console.log(Lowkey);
// Lowkey.toggleShuffle();
// Lowkey.toggleRepeat(2);
// Lowkey.queue.get(5);
