const Util = require("./util");

function Playlist(initItems, initShuffle, initRepeat) {
  this.items = initItems ? Util.clone(initItems) : [];
  this.queue = initItems ? Util.clone(initItems) : [];
  this.history = [];
  this.shuffle = initShuffle || false;
  // this.repeat = initRepeat || 0;

  // this.REPEAT_OFF = 0;
  // this.REPEAT_ALL = 1;
  // this.REPEAT_ONE = 2;

  this.default_queue_items = -1;
}

Playlist.prototype.setItems = function(items) {
  this.items = items;
  this.queue = this.shuffle ? Util.fyShuffle(items) : Util.clone(items);
}

Playlist.prototype.addItem = function(item) {
  this.items.push(item);
  this.queue.push(Util.clone(item));
}

Playlist.prototype.removeItem = function(id) {
  this.items = this.items.filter(i => i.id !== id);
  this.queue = this.queue.filter(i => i.id !== id);
}

Playlist.prototype.toggleShuffle = function(val) {
  this.shuffle = val === undefined ? !this.shuffle : val;
  if (this.shuffle) this.queue = Util.fyShuffle(this.queue);
}

// Playlist.prototype.toggleRepeat = function(val) {
  // this.repeat = val === undefined ? (this.repeat + 1) % 3 : val;
// }

Playlist.prototype.getQueue = function(num) {
  const num = num || (this.default_queue_items > 0 ? this.default_queue_items : false);
  return num ? Util.clone(this.queue, num) : Util.clone(this.queue);
}

Playlist.prototype.next = function() {
  this.history.unshift(this.queue.shift());
}

Playlist.prototype.prev = function() {
  this.queue.unshift(this.history.shift());
}

module.exports = Playlist;
