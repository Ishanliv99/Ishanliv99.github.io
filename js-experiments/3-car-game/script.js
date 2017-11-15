var mainWrapper = document.getElementById('main-wrapper');
var secondWrapper = document.getElementById('second-wrapper');

var arrayPosition = Math.round(Math.random() * 2);
var validPositions = [164, 242, 320];
var PositionX = validPositions[arrayPosition];

function GameWorld(elementId) {
  this.element = elementId;
  var that = this;
  this.init = function() {
    this.background = new GameBackground(elementId);
    this.background.create();

    this.car = new CarElement(elementId);
    this.car.create();
    this.car.position();

    this.obstacles = [];
    this.obstacle = '';
    this.bullets = [];

    this.gameRun = setInterval(function() {
      that.background.update();

      if (mainScreen.background.y % 100 == 0) {
        this.obstacle = new GameObstacles(elementId);
        that.obstacles.push(this.obstacle);
        that.element.appendChild(this.obstacle.element);
      }

      that.obstacles.forEach(function(obstacle) {
        obstacle.update();
        that.carCollision(that.car, obstacle);
        if (obstacle.y == 560) {
          that.element.removeChild(obstacle.element);
          that.obstacles.splice(that.obstacles.indexOf(obstacle), 1);

        }

      })

      document.onkeydown = function(event) {
        if (event.keyCode == 37) {
          that.car.update(37);
        } else if (event.keyCode == 39) {
          that.car.update(39);
        } else if (event.keyCode == 32) {
          var bullet = new Bullet(that.car.x);
          that.bullets.push(bullet);
          that.element.appendChild(bullet.element);
        }

      }

      that.bullets.forEach(function(bullet) {
        bullet.update();
        that.obstacles.forEach(function(obstacle) {

          that.bulletCollision(obstacle, bullet);
        })
      })


    }, 25);
  }

  this.create = function() {
    var playButton = document.createElement('button');
    playButton.style.height = '50px';
    playButton.style.width = '80px';
    playButton.type = 'button';
    playButton.innerHTML = 'PLAY';
    this.element.appendChild(playButton);

    var instructions = document.createElement('h2');
    instructions.innerHTML = 'Movement : Left and Right Arrow Key Shoot : Space Bar';
    this.element.appendChild(instructions);

    playButton.onclick = function() {
      that.element.removeChild(playButton);
      that.element.removeChild(instructions);
      that.init();
    }
  }

  this.carCollision = function(car, obstacle) {
    if ((car.x == obstacle.x + 20) && (obstacle.y >= 480 && obstacle.y <= 540)) {
      that.finish();
    }
  }

  this.bulletCollision = function(obstacle, bullet) {
    // console.log(obstacle);
    if ((obstacle.x == bullet.x - 20) && (obstacle.y > bullet.y)) {
      that.element.removeChild(bullet.element);
      that.bullets.splice(that.bullets.indexOf(bullet), 1);
      that.element.removeChild(obstacle.element);
      that.obstacles.splice(that.obstacles.indexOf(obstacle), 1);
    }
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
    this.carImage.style.left = '164px';
    this.carImage.style.position = 'absolute';
    this.element.appendChild(this.carImage);
    this.x = parseInt(this.carImage.style.left);
    this.y = parseInt(this.carImage.style.top);
  }

  this.position = function() {
    this.x = PositionX;
    this.carImage.style.left = this.x + 'px';
  }

  this.update = function(event) {
    this.move = 78;

    if (event == 37) {
      if (this.x != 164) {
        this.x -= this.move;
        this.carImage.style.left = this.x + 'px';
      }
    } else if (event == 39) {
      if (this.x != 320) {
        this.x += this.move;
        this.carImage.style.left = this.x + 'px';
      }
    }
  }
}

function GameObstacles(parent) {
  this.parentElement = parent;
  this.obstaclePosition = [144, 222, 300];
  var arrayPosition = Math.round(Math.random() * 2);

  this.element = document.createElement('img');
  this.element.src = 'images/rock.png'
  this.element.style.position = 'absolute';
  this.element.style.top = '0px';

  this.x = this.obstaclePosition[arrayPosition];
  this.element.style.left = this.x + 'px';

  this.update = function() {
    this.y = parseInt(this.element.style.top);
    this.y += 5;
    this.element.style.top = this.y + 'px';

  }

}

function Bullet(carX) {
  var that = this;

  this.x = carX;
  this.element = document.createElement('img');
  this.element.src = 'images/bullet.png'
  this.element.style.left = this.x + 'px';
  this.element.style.position = 'absolute';
  this.element.style.top = '504px';

  this.update = function() {
    this.y = parseInt(this.element.style.top);
    this.y -= 15;
    this.element.style.top = this.y + 'px';
  }
}

var mainScreen = new GameWorld(mainWrapper);
mainScreen.create();