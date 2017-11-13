var mainWrapper = document.getElementById('main-wrapper');
var secondWrapper = document.getElementById('second-wrapper');

var mainScreen = new GameWorld(mainWrapper);
mainScreen.create();

// var secondScreen = new GameWorld(secondWrapper);
// secondScreen.create();

function GameWorld(elementId) {
    this.element = elementId;
    var that = this;
    this.init = function() {
        this.background = new GameBackground(elementId);
        this.background.create();

        this.car = new CarElement(elementId);
        this.car.create();
        this.car.position();

        // gameRun();
        this.obstacles = new GameObstacles(elementId);

        this.gameRun = setInterval(function() {
            that.background.update();
            // secondScreen.background.update();

            if (mainScreen.background.y % 1000 == 0) {
                that.obstacles.create();
                // secondScreen.obstacles.create();

                that.obstacles.position();
                // secondScreen.obstacles.position();
            }


            that.obstacles.update();
            // secondScreen.obstacles.update();

            that.collision(that.car, that.obstacles);
            // collision(secondScreen.car, secondScreen.obstacles);

        }, 25);
    }

    this.create = function() {
        var playButton = document.createElement('button');
        playButton.style.height = '50px';
        playButton.style.width = '80px';
        playButton.type = 'button';
        playButton.innerHTML = 'PLAY';
        this.element.appendChild(playButton);

        playButton.onclick = function() {
            that.element.removeChild(playButton);
            that.init();
        }
    }

    this.collision = function(car, obstacle) {
        if ((car.x == obstacle.x) && (obstacle.y >= 480 && obstacle.y <= 540)) {
            // clearInterval(gameRun);
            // var answer = confirm("Play Again?")
            // if (answer==true){
            //   location.reload();
            // }
            // else{
            //    document.write("Game Over!!!");
            //  }
            that.finish();
            // secondScreen.finish();
        }

        this.finish = function() {
            clearInterval(that.gameRun);
            var resetButton = document.createElement('button');
            resetButton.style.height = '50px';
            resetButton.style.width = '80px';
            resetButton.type = 'button';
            resetButton.innerHTML = 'RESET';
            resetButton.style.position = 'absolute';
            resetButton.style.zIndex = '1';
            this.element.appendChild(resetButton);

            var text = document.createElement('h1');
            text.style.color = 'red';
            text.innerHTML = 'GAME OVER!!!!';
            text.style.top = '150px';
            text.style.position = 'absolute';
            text.style.zIndex = '1';
            this.element.appendChild(text);

            resetButton.onclick = function() {
                that.element.removeChild(resetButton);
                that.element.removeChild(text);
                that.init();
            }

        }
    }

}


function GameBackground(parent) {
    this.element = parent;

    this.create = function() {
        this.imageDiv = document.createElement('div');
        this.imageDiv.style.position = 'absolute';
        this.imageDiv.style.margin = '0px';
        this.imageDiv.style.padding = '0px';
        this.imageDiv.style.height = '620px';
        this.imageDiv.style.width = '620px';
        this.imageDiv.style.backgroundPositionY = '0px';
        this.imageDiv.style.backgroundImage = 'url(../3-car-game/images/road.png)';
        this.imageDiv.style.backgroundRepeat = 'repeat-y';
        this.element.appendChild(this.imageDiv);
    }

    this.update = function() {
        this.y = parseInt(this.imageDiv.style.backgroundPositionY);
        this.y += 15;
        this.imageDiv.style.backgroundPositionY = this.y + 'px';
    }
}

function CarElement(parent) {
    this.element = parent;

    this.create = function() {
        this.carImage = document.createElement('img');
        this.carImage.src = 'images/car.png';
        this.carImage.style.top = '524px';
        this.carImage.style.left = '144px';
        this.carImage.style.position = 'absolute';
        this.element.appendChild(this.carImage);
        this.x = parseInt(this.carImage.style.left);
        this.y = parseInt(this.carImage.style.top);
    }

    this.position = function() {
        this.carPosition = [144, 222, 300];
        var arrayPosition = Math.round(Math.random() * 2);
        this.x = this.carPosition[arrayPosition];
        this.carImage.style.left = this.x + 'px';
    }

    this.update = function(event) {
        this.move = 78;

        if (event == 37) {
            if (this.x != 144) {
                this.x -= this.move;
                this.carImage.style.left = this.x + 'px';
            }
        } else if (event == 39) {
            if (this.x != 300) {
                this.x += this.move;
                this.carImage.style.left = this.x + 'px';
            }
        }
    }
}

function GameObstacles(parent) {
    this.element = parent;
    this.obstaclePosition = [144, 222, 300];

    this.create = function() {
        this.obstacleImage = document.createElement('img');
        this.obstacleImage.src = 'images/rock.png'
        this.obstacleImage.style.position = 'absolute';
        this.obstacleImage.style.top = '0px';
        this.element.appendChild(this.obstacleImage);
    }

    this.position = function() {
        var arrayPosition = Math.round(Math.random() * 2);
        this.x = this.obstaclePosition[arrayPosition];
        this.obstacleImage.style.left = this.x + 'px';
    }

    this.update = function() {
        // console.log(this);
        this.y = parseInt(this.obstacleImage.style.top);
        this.y += 5;
        this.obstacleImage.style.top = this.y + 'px';
        if (this.y == 560) {
            this.element.removeChild(this.obstacleImage);
        }
    }

}



document.onkeydown = function(event) {
    if (event.keyCode == 37) {
        mainScreen.car.update(37);
        // secondScreen.car.update(37);
        // secondScreen.car.update(39);
    } else if (event.keyCode == 39) {
        mainScreen.car.update(39);
        // secondScreen.car.update(39);
        // secondScreen.car.update(37);
    }
}