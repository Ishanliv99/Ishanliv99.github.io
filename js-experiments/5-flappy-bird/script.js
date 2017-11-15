let mainWrapper = document.getElementById('main-wrapper');
mainWrapper.style.height = '600px';
mainWrapper.style.position = 'relative';

let getRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class GameWorld {
  constructor(elementId) {
    this.element = elementId;
    this.counter = 0;
  }

  initializeGame() {
    this.playButton = document.createElement('button');
    this.playButton.style.height = '50px';
    this.playButton.style.width = '80px';
    this.playButton.type = 'button';
    this.playButton.innerHTML = 'PLAY';
    this.element.appendChild(this.playButton);

    this.element.style.overflow = 'hidden';

    this.instructions = document.createElement('h1');
    this.instructions.innerHTML = 'Space Bar to control bird';
    this.element.appendChild(this.instructions);

    this.playButton.onclick = () => {
      this.element.removeChild(this.playButton);
      this.element.removeChild(this.instructions);
      this.createGameWorld();
    }
  }

  createGameWorld() {
    this.background = new GameBackground(this.element);
    this.background.createBackground();

    this.bird = new Bird(this.element);
    this.bird.createBird();

    this.obstacles = [];

    //setInterval
    this.gameMovement = setInterval(() => {
      this.background.updateBackground();
      this.bird.applyGravity();
      if (this.bird.y < 0 || this.bird.y > 449) {
        this.finishGame();
      }

      if (mainScreen.background.x % 200 == 0) {
        let obstacle = new Obstacle(this.element);
        this.obstacles.push(obstacle);
        this.element.appendChild(obstacle.element);
      }

      this.obstacles.forEach((obstacle) => {
        obstacle.updateObstacle();
        this.collision(obstacle);
        if (obstacle.x == -79) {
          this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
          this.element.removeChild(obstacle.element);
        }

        if (parseInt(this.bird.birdImage.style.left) + 36 >= this.obstacles[0].x)
          this.counter++;
        console.log(this.counter);
      })

      document.onkeydown = (event) => {
        if (event.keyCode == 32) {
          this.bird.updateBird();
        }
      }
    }, 60);
  }

  collision(obstacle) {
    let birdPositionY = parseInt(this.bird.birdImage.style.top);
    let birdPositionX = parseInt(this.bird.birdImage.style.left);

    if ((birdPositionY < obstacle.y + 353) && (birdPositionX + 36 > obstacle.x) && (birdPositionX < obstacle.x + 79) || (birdPositionY > obstacle.y + 441) && (birdPositionX + 36 > obstacle.x) && (birdPositionX < obstacle.x + 79))
      this.finishGame();
  }

  finishGame() {
    clearInterval(this.gameMovement);
    let resetButton = document.createElement('button');
    resetButton.style.height = '50px';
    resetButton.style.width = '80px';
    resetButton.type = 'button';
    resetButton.innerHTML = 'RESET';
    resetButton.style.position = 'absolute';
    resetButton.style.zIndex = '1';
    this.element.appendChild(resetButton);

    let text = document.createElement('h1');
    text.style.color = '#FFF';
    text.innerHTML = 'GAME OVER!!!!';
    text.style.top = '150px';
    text.style.position = 'absolute';
    text.style.zIndex = '1';
    this.element.appendChild(text);

    resetButton.onclick = () => {
      this.element.removeChild(resetButton);
      this.element.removeChild(text);
      this.counter = 0;
      this.createGameWorld();
    }
  }
}

class GameBackground {
  constructor(parent) {
    this.element = parent;
  }

  createBackground() {
    this.imageDiv = document.createElement('div');
    this.imageDiv.style.position = 'absolute';
    this.imageDiv.style.margin = '0px';
    this.imageDiv.style.padding = '0px';
    this.imageDiv.style.height = '600px';
    this.imageDiv.style.width = '1000px';
    this.imageDiv.style.display = 'block';
    this.imageDiv.style.backgroundPositionX = '0px';
    this.imageDiv.style.backgroundImage = 'url(../5-flappy-bird/images/flappy-back.png)';
    this.imageDiv.style.backgroundRepeat = 'repeat-x';
    this.element.appendChild(this.imageDiv);

    this.scoreDiv = document.createElement('h1');
    this.scoreDiv.id = 'score';
    this.scoreDiv.style.position = 'absolute';
    this.scoreDiv.style.left = '50%';
    this.scoreDiv.style.top = '30px';
    this.scoreDiv.style.zIndex = '1';
    this.scoreDiv.style.color = '#FFF';
    this.imageDiv.appendChild(this.scoreDiv);
  }

  updateBackground() {
    this.x = parseInt(this.imageDiv.style.backgroundPositionX);
    this.x -= 5;
    this.imageDiv.style.backgroundPositionX = this.x + 'px';
    document.getElementById('score').innerText=mainScreen.counter;
  }
}

class Bird {
  constructor(parent) {
    this.element = parent;
    this.y = 200;
  }

  createBird() {
    this.birdImage = document.createElement('img');
    this.birdImage.src = 'images/flappy.gif';
    this.birdImage.style.top = this.y + 'px';
    this.birdImage.style.left = '40px';
    this.birdImage.style.position = 'absolute';
    this.element.appendChild(this.birdImage);
  }

  applyGravity() {
    this.move = 5;
    this.y = parseInt(this.birdImage.style.top);

    if (this.y < 450) {
      this.y += this.move;
      this.birdImage.style.top = this.y + 'px';
    }

  }

  updateBird() {
    this.move = 15;
    this.y = parseInt(this.birdImage.style.top);

    if (this.y > 0) {
      this.y -= this.move;
      this.birdImage.style.top = this.y + 'px';
    }

  }

}

class Obstacle {
  constructor() {
    this.element = document.createElement('img');
    this.element.src = 'images/pipe.png'
    this.element.style.position = 'absolute';
    this.y = getRandom(-170, 0);
    this.element.style.top = this.y + 'px';
    this.element.style.left = '960px';
    this.x = parseInt(this.element.style.left);
  }

  updateObstacle() {
    this.x -= 5;
    this.element.style.left = this.x + 'px';
  }

}

let mainScreen = new GameWorld(mainWrapper);
mainScreen.initializeGame();