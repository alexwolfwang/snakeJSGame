/**
 * Created by Alex.W on 2017/2/16.
 */
var snake = {
    direction: null,
    last: null, // it's the head of snake, but is the last point in this queue
    _queue: null,

    init: function(d, x, y) {
        this.direction = d;
        this._queue = [];
        this.insert(x, y);
    },

    insert: function(x,y) {
        this._queue.unshift({x:x, y:y});
        this.last = this._queue[0];
    },

    remove: function() {
        return this._queue.pop();
    }
};