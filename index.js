
function Playlist(initItems, initShuffle, initRepeat) {
  this.items = initItems || [];
  this.queue = initItems ? initItems.slice() : [];
  this.history = [];
  // this.shuffle = initShuffle || false;
  // this.repeat = initRepeat || 0;

  // this.REPEAT_OFF = 0;
  // this.REPEAT_ALL = 1;
  // this.REPEAT_ONE = 2;
}

Playlist.prototype.setItems = function(items) {
  this.items = items;
  this.queue = items.slice();
}

Playlist.prototype.addItem = function(item) {
  this.items.push(item);
  this.queue.push(item);
}

// Playlist.prototype.toggleShuffle = function(val) {
  // this.shuffle = val === undefined ? !this.shuffle : val;
// }

// Playlist.prototype.toggleRepeat = function(val) {
  // this.repeat = val === undefined ? (this.repeat + 1) % 3 : val;
// }

Playlist.prototype.getQueue = function(numItems) {
  return numItems ? this.queue.slice(numItems) : this.queue.slice();
}

Playlist.prototype.next = function() {
  this.history.unshift(this.queue.shift());
}

Playlist.prototype.prev = function() {
  this.queue.unshift(this.history.shift());
}

module.exports = Playlist;
