var grid = {
    width: null,
    height: null,
    _grid: null,

    init: function (d, c, r) {
        this.width = c;
        this.height = r;
        this._grid = [];
        for (var i = 0; i < c; i++) { // create the c number of cols and r number of rows grids, the side of grid is d
            this._grid.push([]);
            for (var j = 0; j < r; j++) {
                this._grid[i].push(d);
            }
        }
    },

    setGrid: function (val, x, y) {
        this._grid[x][y] = val; //set the value in position of x,y
    },

    getGrid: function (x, y) {
        return this._grid[x][y]
    }

}