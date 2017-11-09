var mainWrapper = document.getElementById("main-wrapper");
mainWrapper.style.backgroundImage = "url(../1-image-slider/images/image-back.jpg)";
mainWrapper.style.overflow = "hidden";
mainWrapper.style.height = "500px";
mainWrapper.style.width = "500px";
mainWrapper.style.position = "relative";

var mainList = document.createElement("ul");
mainList.style.position = "absolute";
mainList.style.listStyle = "none";
mainList.style.width = "5000px";
mainList.style.left = "0px";
mainList.style.top = "0px";
mainList.style.margin = "0px";
mainList.style.padding = "0px";
mainWrapper.appendChild(mainList);

var images = [
    "images/image-1.jpg",
    "images/image-2.jpg",
    "images/image-3.jpg",
    "images/image-4.jpg"
]


for (var i = images.length - 1; i >= 0; i--) {
    var listElements = document.createElement("li");
    var imageElement = document.createElement("img");
    imageElement.src = images[i];
    listElements.style.float = "left";
    listElements.style.height = "500px";
    listElements.style.width = "500px";
    listElements.appendChild(imageElement);
    mainList.appendChild(listElements);
    console.log(listElements);
}

var mainBody = document.getElementsByTagName("body")[0];
var imageDiv = document.createElement("div");
mainBody.appendChild(imageDiv);

var nextImage = document.createElement("button");
nextImage.id = "next";
nextImage.type = "button";
nextImage.style.height = "50px";
nextImage.style.width = "80px";
nextImage.innerHTML = "Next";
imageDiv.appendChild(nextImage);

var prevImage = document.createElement("button");
prevImage.id = "prev";
prevImage.type = "button";
prevImage.style.height = "50px";
prevImage.style.width = "80px";
prevImage.innerHTML = "Prev";
imageDiv.appendChild(prevImage);

flag = 1;

nextImage.onclick = function() {
    while (flag == 1) {
        flag = 0;
        var counter = setInterval(function() {
            var switcher = parseInt(mainList.style.left);
            if (switcher == -(parseInt(listElements.style.width) * images.length))
                switcher = parseInt(listElements.style.width);
            switcher--;
            if (switcher % 500 == 0) {
                clearInterval(counter);
                flag = 1;
            }
            mainList.style.left = switcher + "px";
        }, 0.5);
    }

}

prevImage.onclick = function() {
    while (flag == 1) {
        flag = 0;
        var counter = setInterval(function() {
            var switcher = parseInt(mainList.style.left);
            if (switcher == parseInt(listElements.style.width))
                switcher = -(parseInt(listElements.style.width) * images.length);
            switcher++;
            if (switcher % 500 == 0) {
                clearInterval(counter);
                flag = 1;
            }
            // console.log(parseInt(listElements.style.width)*images.length);
            mainList.style.left = switcher + "px";
        }, 0.5);
    }
}