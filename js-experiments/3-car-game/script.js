var mainWrapper = document.getElementById("main-wrapper");
mainWrapper.style.position = "relative";
mainWrapper.style.overflow = "hidden";
mainWrapper.style.height = "360px";
mainWrapper.style.width = "600px";

var mainList = document.createElement("ul");
mainList.style.position = "absolute";
mainList.style.listStyle = "none";
mainList.style.left = "0px";
mainList.style.top = "0px";
mainList.style.margin = "0px";
mainList.style.padding = "0px";
mainWrapper.appendChild(mainList);

var images = [
    "images/bg.png",
    "images/bg.png",
]


for (var i = images.length - 1; i >= 0; i--) {
    var listElements = document.createElement("li");
    var imageElement = document.createElement("img");
    imageElement.src = images[i];
    listElements.style.float = "left";
    listElements.style.height = "360px";
    listElements.style.width = "600px";
    listElements.appendChild(imageElement);
    mainList.appendChild(listElements);
    console.log(listElements);
}

setInterval(function() {
    var slider = parseInt(mainList.style.top);
    if (slider == 0)
        slider = -(parseInt(listElements.style.height));
    slider++;
    mainList.style.top = slider + "px";
}, 20);

var shuttle = document.createElement("img");
shuttle.src = "images/shuttle.png";
shuttle.id = "shuttle";
shuttle.style.position = "absolute";
shuttle.style.zIndex = "1";
shuttle.style.left = "275px";
shuttle.style.top = "300px";
mainWrapper.appendChild(shuttle);

var shuttleMove = new Shuttle("shuttle");

document.onkeydown = function(event) {
	if (event.keyCode == 37)
		shuttleMove.left();
	else if (event.keyCode == 39)
		shuttleMove.right();
}

function Shuttle(elementId){
	this.element = document.getElementById(elementId);
	// console.log(1);

	this.move = 200;
	this.x = parseInt(this.element.style.left);

	this.left = function(){
		this.x = this.x - this.move ;

		if (this.x <0)
			alert("Game Over!!");
		this.element.style.left = this.x + "px";
	}

	this.right = function(){
		this.x = this.x + this.move ;

		if (this.x > 600)
			alert("Game Over!!");
		this.element.style.left = this.x + "px";
	}
}
