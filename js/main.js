/**
 * Created by Alex.W on 2017/2/15.
 */

//game box
var cols = 26, rows = 26;

//different object
var Empty = 0, Snake = 1, Fruit = 2;

//keys
var Up = 0, Left = 1, Right = 2, Down = 3;

var keyLeft = 37, keyUp = 38, keyRight = 39, keyDown = 40, addSpeed = 107;

//variables
var canvas, platform, keyState, score, frames, speed, info;


function setFruit() {
    var empty = [];

    for(var i = 0; i < grid.width -1; i ++) {
        for(var j = 0; j < grid.height-1; j ++) {
            if(grid.getGrid(i,j) == Empty) {
                empty.push({x: i, y: j});
            }
        }
    }

    var randomPosition = empty[Math.floor(Math.random() * (empty.length - 1))];
    grid.setGrid(Fruit, randomPosition.x, randomPosition.y);

}

function main() {
    canvas = document.createElement('canvas');
    canvas.width = cols * 20;
    canvas.height = rows * 20;
    platform = canvas.getContext('2d');
    document.body.appendChild(canvas);
    info = document.createElement('h2');
    info.innerText = 'Up: up, Left: left, Right: right, Down: down, Accelerate: +';
    canvas.after(info);
    platform.font = '20px Arial';

    frames = 0;
    keyState = {};

    document.addEventListener('keydown', function(e) {
        keyState[e.keyCode] = true;
    });

    document.addEventListener('keyup', function(e) {
        delete keyState[e.keyCode];
    });

    init();
    loop();
}

function init() {
    score = 0;
    speed = 1;
    grid.init(Empty, cols, rows);
    snake.init(Right, 0, 0);
    grid.setGrid(Snake, 0, 0);

    setFruit();
}

function loop() {
    update();
    draw();

    window.requestAnimationFrame(loop,canvas)
}

function update() {
    frames ++;

    if(keyState[keyLeft] && snake.direction !== Right) {
        snake.direction = Left;
    }

    if(keyState[keyRight] && snake.direction !== Left) {
        snake.direction = Right;
    }

    if(keyState[keyDown] && snake.direction !== Up) {
        snake.direction = Down;
    }

    if(keyState[keyUp] && snake.direction !== Down) {
        snake.direction = Up;
    }

    function snakeState() {
        var nx = snake.last.x; // the head of snake
        var ny = snake.last.y;

        switch (snake.direction) {
            case Up:
                ny--;
                break;
            case Down:
                ny++;
                break;
            case Left:
                nx--;
                break;
            case Right:
                nx++;
                break;
        }

        if(0 > nx || nx > grid.width || 0 > ny || ny> grid.height
            || grid.getGrid(nx, ny) == Snake) {
            alert('Game Over, you score is ' + score);
            return init();
        }

        if(grid.getGrid(nx,ny) == Fruit) {
            score ++;
            setFruit();
        } else {
            var tail = snake.remove();
            grid.setGrid(Empty, tail.x, tail.y);
        }

        grid.setGrid(Snake, nx, ny);
        snake.insert(nx, ny);
    }
    if(score < 15) {
        if(frames % 17 == 0) {
            snakeState()
        }
        if(keyState[addSpeed]) {
            if(frames % 14 == 0) {
                snakeState()
            }
        }
    } else if(score>=15 && score < 32) {
        speed = 2;
        if(frames % 11 == 0) {
            snakeState()
        }
        if(keyState[addSpeed]) {
            if(frames % 8 == 0) {
                snakeState()
            }
        }
    } else if(score>=32 && score < 50) {
        speed = 3;

        if(frames % 5 == 0) {
            snakeState()
        }
        if(keyState[addSpeed]) {
            if(frames % 3 == 0) {
                snakeState()
            }
        }
    } else if(score>=50 && score < 70) {
        speed = 'max';

        if(frames % 3 == 0) {
            snakeState()
        }
        if(frames % 1 == 0) {
            snakeState()
        }
    }

}

function draw() {
    var tw = canvas.width/grid.width;
    var th = canvas.height/grid.height;

    for(var i = 0; i < grid.width; i ++) {
        for(var j = 0; j < grid.height; j ++) {
            switch (grid.getGrid(i,j)) {
                case Empty:
                    platform.fillStyle = 'black';
                    break;
                case Snake:
                    platform.fillStyle = 'green';
                    break;
                case Fruit:
                    platform.fillStyle = 'white';
                    break;
            }
            platform.fillRect(i*tw,j*th,tw,th)
        }
    }

    platform.fillStyle = 'red';
    platform.fillText('Score: ' + score + ', speed: ' + speed, 10 , canvas.height-10)
}

main();