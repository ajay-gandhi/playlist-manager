const Util = require("./util");

const DEFAULTS = {
  items: [],
  default_queue_items: -1,
  max_history: 20,
  shuffle: false,
  repeat: false,
};

function Playlist(opts) {
  const init = opts ? { ...DEFAULTS, ...opts } : DEFAULTS;
  this.items = Util.clone(init.items);

  this.queue = Util.clone(init.items);
  this.default_queue_items = init.default_queue_items;
  this.history = [];
  this.max_history = init.max_history;

  this.shuffle = init.shuffle;
  this.repeat = init.repeat;
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
      if (this.repeat) {
        // Keep appending to queue until we've achieved proper length
        while (this.queue.length < num) {
          this.queue = this.queue.concat(this.genQueue());
        }
        return Util.clone(this.queue, num);
      } else {
        // Repeat is off, so just return queue as it is
        return Util.clone(this.queue);
      }
    } else {
      // Cut queue by requested length
      return Util.clone(this.queue, num);
    }
  }

  // Return entire queue by default
  return Util.clone(this.queue);
}

Playlist.prototype.next = function() {
  if (this.queue.length === 0) {
    if (this.repeat) this.queue = this.genQueue();
    else             return false;
  }
  this.history.unshift(this.queue.shift());
  if (this.history.length > this.max_history) this.history.pop();
  return true;
}

Playlist.prototype.prev = function() {
  if (history.length === 0) return false;
  this.queue.unshift(this.history.shift());
  return true;
}

module.exports = Playlist;
