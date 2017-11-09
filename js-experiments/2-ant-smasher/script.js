var mainWrapper = document.getElementById("main-wrapper");
mainWrapper.style.background = "red";
mainWrapper.style.height = "600px";
mainWrapper.style.width = "1200px";
mainWrapper.style.position = "relative";

function Ant(elementId) {
    this.element = document.createElement("div");
    this.element.id = elementId;
    this.element.style.position = "absolute";
    this.element.style.left = (Math.random() * (parseInt(mainWrapper.style.width) - 20)) + "px";
    this.element.style.top = (Math.random() * (parseInt(mainWrapper.style.height) - 20)) + "px";
    this.element.style.height = "20px";
    this.element.style.width = "20px";
    this.element.style.background = "black";
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
        var left = this.style.left;
        var top = this.style.top;
        mainWrapper.removeChild(this);
    }

    // for (var i = 0; i < Math.round(Math.random() * 25); i++) {
        setInterval(function() {
        that.updatePosition();
        }, 20);
    // }   


}

// console.log(Math.round(Math.random() * 10));

for (var i = 0; i < Math.round(Math.random() * 25)+1; i++) {
    // var ant = [];
    var ant = new Ant(i);
}

// setInterval(function() {
//     ant.updatePosition();
// }, 20);