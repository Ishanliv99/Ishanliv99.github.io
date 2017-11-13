var mainWrapper = document.getElementById("main-wrapper");
mainWrapper.style.background = "red";
mainWrapper.style.height = "600px";
mainWrapper.style.width = "1200px";
mainWrapper.style.position = "relative";

var playButton = document.createElement("button");
playButton.style.height = "50px";
playButton.style.width = "80px";
playButton.type = "button";
playButton.innerHTML = "PLAY";
playButton.style.display = "block";
playButton.style.position = "absolute";
playButton.style.top = "45%";
playButton.style.left = "45%";
mainWrapper.appendChild(playButton);

// var resetButton = document.createElement("button");
// resetButton.style.height = "50px";
// resetButton.style.width = "80px";
// resetButton.type = "button";
// resetButton.innerHTML = "RESET";
// resetButton.style.display = "none";
// resetButton.style.position = "absolute";
// resetButton.style.left = "100%";
// mainWrapper.appendChild(resetButton);

var antArray = [];

playButton.onclick = function() {
    playButton.style.display = "none";
    mainWrapper.style.background = "yellow";
    // resetButton.style.display = "block";

    function Ant(elementId) {
        this.element = document.createElement("div");
        this.element.id = elementId;
        this.element.style.position = "absolute";
        this.element.style.left = (Math.random() * (parseInt(mainWrapper.style.width) - 20)) + "px";
        this.element.style.top = (Math.random() * (parseInt(mainWrapper.style.height) - 20)) + "px";
        this.element.style.height = "25px";
        this.element.style.width = "25px";
        // this.element.style.background = "black";
        this.element.style.backgroundImage = "url(../2-ant-smasher/ant.png)";
        // this.element.style.backgroundSize = "cover";
        this.element.style.backgroundRepeat = "no-repeat";
        mainWrapper.appendChild(this.element);

        var that = this;

        this.x = parseInt(this.element.style.left);
        this.y = parseInt(this.element.style.top);

        this.dx = Math.random() * 5;
        this.dy = Math.random() * 5;

        this.updatePosition = function() {

            if (this.x > (parseInt(mainWrapper.style.width) - parseInt(this.element.style.width)) || this.x < 0)
                this.dx = -(this.dx);

            if (this.y > (parseInt(mainWrapper.style.height) - parseInt(this.element.style.height)) || this.y < 0)
                this.dy = -(this.dy);

            this.x = this.x + this.dx;
            this.y = this.y + this.dy;
            this.element.style.top = this.y + "px";
            this.element.style.left = this.x + "px";

        }

        this.element.onclick = function() {
                antNumber--;
                var left = this.style.left;
                var top = this.style.top;
                mainWrapper.removeChild(this);
                if (antNumber == 0) {
                    mainWrapper.style.background = "black";
                    mainWrapper.style.color = "white";
                    mainWrapper.innerHTML = "GAME OVER!!!!";
                    mainWrapper.style.fontSize = "50px";
                    mainWrapper.style.textAlign = "center";
                }

            }
            // if (this.element == antArray[i]) {
            //     if ((parseInt(this.element.style.top) + parseInt(this.element.style.height) >= parseInt(antArray[i].style.top)) && (parseInt(antArray[i].style.top) + parseInt(antArray[i].style.height)) >= (parseInt(this.element.style.height)) && (parseInt(this.element.style.left) + parseInt(this.element.style.width) >= parseInt(antArray[i].style.width)) && (parseInt(antArray[i].style.left) + parseInt(antArray[i].style.width) >= parseInt(this.element.style.width))) {
            //         this.dx = -(this.dx);
            //         this.dy = -(this.dy);
            //     }
            // }

        this.checkCollision = function(comparision) {
            var x1 = parseInt(this.element.style.left);
            var y1 = parseInt(this.element.style.top);
            var x2 = parseInt(comparision.element.style.left);
            var y2 = parseInt(comparision.element.style.top);

            var wid = parseInt(this.element.style.width);
            var hei = parseInt(this.element.style.height);

            if ((x1 + wid > x2) && (x1 < x2 + wid) && (y1 + hei > y2) && (y1 < y2 + hei)) {
                // this.dx = -this.dx;
                // this.dy = -this.dy;
                // comparision.dx = -comparision.dx;
                // comparision.dy = -comparision.dy;
                if (x1 > x2) {
                    comparision.dx = -(comparision.dx);
                    if (y1 > y2) {
                        comparision.dy = -(comparision.dy);
                    } else {
                        this.dy = -(this.dy);
                    }
                } else {
                    this.dx = -(this.dx);
                    if (y1 > y2) {
                        comparision.dy = -(comparision.dy);
                    } else {
                        this.dy = -(this.dy);
                    }
                }

            }

        }

    }




    var antNumber = Math.round(Math.random() * 20) + 20;
    var antAlive = 0;

    for (var i = 0; i < antNumber; i++) {
        ant = new Ant(i);
        antArray.push(ant);
    }

    setInterval(function() {
        for (var i = 0; i < antArray.length; i++) {
            antArray[i].updatePosition();
            // antArray[i].updatePosition();
            // antArray[i].checkCollision();
            var antA = antArray[i];

            for (var j = 1; j < antArray.length; j++) {
                var antB = antArray[j];
                if (antA == antB) {
                    console.log("itself");
                } else
                    antA.checkCollision(antB);
            }
        }

    }, 20);
}