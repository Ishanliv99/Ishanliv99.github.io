let mainWrapper = document.getElementById('main-wrapper');

class GameWorld {
  constructor(elementId) {
    this.element = elementId;
  }

  initializeGame() {
    this.playButton = document.createElement('button');
    this.playButton.style.height = '50px';
    this.playButton.style.width = '80px';
    this.playButton.type = 'button';
    this.playButton.innerHTML = 'PLAY';
    this.element.appendChild(this.playButton);

    this.playButton.onclick = () => {
      this.element.removeChild(this.playButton);
      this.createGameWorld();
    }
  }

  createGameWorld() {
    this.background = new GameBackground(this.element);
    this.background.createBackground();

    this.bird = new Bird(this.element);
    this.bird.createBird();

    this.gameMovement = setInterval(() => {
      this.background.updateBackground();
      this.bird.applyGravity();

      document.onkeydown = (event) => {
        if (event.keyCode == 32) {
          this.bird.updateBird();
        }
      }
    }, 100);
  }


  collision() {
    let birdPosition = parseInt(this.bird.birdImage.style.top);
    if (birdPosition < 0 || birdPosition > 500)
      this.finishGame();
  }

  finishGame() {
    clearInterval(gameMovement);
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
      this.createGameWorld();
    }
  }

  // applyGravity() {
  // this.bird.birdImage.style.top = parseInt(this.bird.birdImage.style.top ) + 5+"px";
  // this.move = 5;
  // this.y = parseInt(this.element.style.top);
  // this.y += this.move;
  // this.element.style.top = this.y + 'px';
  // }


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
    this.imageDiv.style.height = '620px';
    this.imageDiv.style.width = '1202px';
    this.imageDiv.style.backgroundPositionX = '0px';
    this.imageDiv.style.backgroundImage = 'url(../5-flappy-bird/images/flappy-back.png)';
    this.imageDiv.style.backgroundRepeat = 'repeat-x';
    this.element.appendChild(this.imageDiv);
  }

  updateBackground() {
    this.x = parseInt(this.imageDiv.style.backgroundPositionX);
    this.x -= 5;
    this.imageDiv.style.backgroundPositionX = this.x + 'px';
  }
}

class Bird {
  constructor(parent) {
    this.element = parent;
    this.y = 200;
  }

  createBird() {
    this.birdImage = document.createElement('img');
    this.birdImage.src = 'images/flappy-1.gif';
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
  
}

let mainScreen = new GameWorld(mainWrapper);
mainScreen.initializeGame();