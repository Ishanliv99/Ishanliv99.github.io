 // var position = [{
 //     top: 20,
 //     left: 80
 // }, {
 //     top: 70,
 //     left: 100
 // }, {
 //     top: 120,
 //     left: 120
 // }, {
 //     top: 170,
 //     left: 140
 // }, {
 //     top: 220,
 //     left: 160
 // }, {
 //     top: 270,
 //     left: 180
 // }, {
 //     top: 320,
 //     left: 200
 // }, {
 //     top: 370,
 //     left: 220
 // }, {
 //     top: 420,
 //     left: 240
 // }, {
 //     top: 470,
 //     left: 260
 // }, ];

 var mainWrapper = document.getElementById("main-wrapper");
 mainWrapper.style.background = "red";
 mainWrapper.style.height = "500px";
 mainWrapper.style.width = "500px";
 mainWrapper.style.position = "relative";

 var listWrapper = document.getElementsByTagName("body")[0];
 var list = document.createElement("ul");
 listWrapper.appendChild(list);

 for (var i = 0; i < 10; i++) {
     var plotter = document.createElement("div");
     plotter.style.background = "blue";
     plotter.style.height = "10px";
     plotter.style.width = "10px";
     plotter.style.position = "absolute";

     function getRandomArbitrary(a, b) {
         return Math.random() * 500;
     }

     position = {
         top: getRandomArbitrary(0, 500),
         left: getRandomArbitrary(0, 500),
     };

     plotter.style.top = position.top + "px";
     plotter.style.left = position.left + "px";
     mainWrapper.appendChild(plotter);

     plotter.onclick = function() {
         var left = this.style.left;
         var top = this.style.top;
         mainWrapper.removeChild(this);
         var listElements = document.createElement("li");
         list.appendChild(listElements);
         listElements.style.color = "black";
         listElements.innerHTML = top + " " + left;
     }
 }