const Util = require("./util");

function Playlist(initItems, initShuffle, initRepeat) {
  this.items = initItems ? Util.clone(initItems) : [];
  this.queue = initItems ? Util.clone(initItems) : [];
  this.history = [];
  this.shuffle = initShuffle || false;
  this.repeat = initRepeat || false;

  // this.REPEAT_OFF = 0;
  // this.REPEAT_ALL = 1;
  // this.REPEAT_ONE = 2;

  this.default_queue_items = -1;
}

// HIDE THIS
Playlist.prototype.genQueue = function() {
  return this.shuffle ? Util.fyShuffle(this.items) : Util.clone(this.items);
}

Playlist.prototype.setItems = function(items) {
  if (!(items instanceof Array)) {
    this.setItems(Util.argsToArray(arguments));
  } else {
    this.items = items;
    this.queue = this.genQueue();
  }
}

Playlist.prototype.addItems = function(items) {
  if (!(items instanceof Array)) {
    this.addItems(Util.argsToArray(arguments));
  } else {
    this.items = this.items.concat(Util.clone(items));
    this.queue = this.queue.concat(Util.clone(items));
  }
}

Playlist.prototype.removeItems = function(ids) {
  if (!(ids instanceof Array)) {
    return this.removeItems(Util.argsToArray(arguments));
  } else {
    const result = this.items.filter(i => ids.includes(i.id));
    this.items = this.items.filter(i => !ids.includes(i.id));
    this.queue = this.queue.filter(i => !ids.includes(i.id));
    return result;
  }
}

Playlist.prototype.toggleShuffle = function(val) {
  this.shuffle = val === undefined ? !this.shuffle : val;
  if (this.shuffle) this.queue = this.genQueue();
}

Playlist.prototype.toggleRepeat = function(val) {
  this.repeat = val === undefined ? !this.repeat : val;
}

Playlist.prototype.getQueue = function(num) {
  const num = num || (this.default_queue_items > 0 ? this.default_queue_items : false);
  if (num) {
    if (num > this.queue.length) {
      // Requested length exceeds length of queue
      // Keep appending to queue until we've achieved proper length
      while (this.queue.length < num) {
        this.queue = this.queue.concat(this.genQueue());
      }
      return Util.clone(this.queue, num);
    } else {
      // Cut queue by requested length
      return Util.clone(this.queue, num);
    }
  }

  // Return entire queue by default
  return Util.clone(this.queue);
}

Playlist.prototype.next = function() {
  if (this.queue.length === 0) this.queue = this.genQueue();
  this.history.unshift(this.queue.shift());
}

Playlist.prototype.prev = function() {
  this.queue.unshift(this.history.shift());
}

module.exports = Playlist;
