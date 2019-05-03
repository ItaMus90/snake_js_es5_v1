var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

var primary = "#af1e2d";
var secondary = "#ffce00";
var color_score = "#f3f3f3";

var grid = 32;//size of each cell in the grid
var count = 0; //frame rate of the game
var score = 0;

var snake = {

    x: grid * 5,
    y: grid * 5,

    //velocity (speed)
    vx: grid,
    vy: 0,

    cells: [],

    max_cells: 4

};

var apple = {

    x: grid * 10,
    y: grid * 10

};


function update() {

    requestAnimationFrame(update); 

    //we won't 60 frame pre 1 second this vis very fast
    //60 / 4 = 15 frame pre 1 second
    if(++count < 4){

        return;

    }    

    count = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.vx;
    snake.y += snake.vy;

    if(snake.x < 0){

        snake.x = canvas.width - grid;

    }else if(snake.x >= canvas.width){

        snake.x = 0;

    }


    if(snake.y < 0){

        snake.y = canvas.height - grid;

    }else if(snake.y >= canvas.height){

        snake.y = 0;

    }


    snake.cells.unshift({x: snake.x, y: snake.y});

    if(snake.cells.length > snake.max_cells) {

        snake.cells.pop();

    }

    //Draw apple
    context.fillStyle = secondary;
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);


    //Draw snake
    context.fillStyle = primary;
    
    for (var i = 0; i < snake.cells.length; i++) {

        var x = snake.cells[i].x;
        var y = snake.cells[i].y;

        context.fillRect(x, y, grid - 1, grid -1);

        if(snake.cells[i].x === apple.x && snake.cells[i].y === apple.y) {

            snake.max_cells ++;
            score ++;

            apple.x = getRandomInt(0 , 24) * grid; // the reason the width 768/32
            apple.y = getRandomInt(0 , 14) * grid; // the reason the width 448/32

        }


        for(var j = i + 1; j < snake.cells.length; j++) {

            if(snake.cells[i].x === snake.cells[j].x && snake.cells[i].y === snake.cells[j].y) {

                window.location.reload();

            }

        }

    }


    context.font = "42px Helvetica";
    context.fillStyle = "rgba(255, 255, 255, 0.25)";
    context.textAlign = "center";
    context.fillText(score, canvas.width / 2, canvas.height / 2);

}


function getRandomInt(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}


document.addEventListener("keydown", function(e){

    if(e.which === 37 && snake.vx === 0) {

        snake.vx = -grid;
        snake.vy = 0;

    }else if(e.which === 38 && snake.vy === 0){

        snake.vy = -grid;
        snake.vx = 0;

    }else if(e.which === 39 && snake.vx === 0){

        snake.vx = grid;
        snake.vy = 0;

    }else if(e.which === 40 && snake.vy === 0){

        snake.vy = grid;
        snake.vx = 0;

    }

});

//run 60 frame for 1 second
//Start the game
requestAnimationFrame(update); 
