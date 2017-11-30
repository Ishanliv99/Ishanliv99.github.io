var items;
var images;
var imageWidth;
var imageNumber;
var effect;

var value = 0;
var counter = 0;
var imageSlideCount = 0;
var flag = 1;

var projectNext = document.getElementById('project-next');
var projectSlider = document.getElementById('project-slide');
var projectPrevious = document.getElementById('project-prev');
var sliderList = document.getElementById('slider-list');
var selection = document.getElementById('selection');
var btnLeft = document.getElementById('btn-left');
var btnRight = document.getElementById('btn-right');
var sliderLeft = document.getElementById('slider-left');
var sliderRight = document.getElementById('slider-right');
var selectionList = selection.getElementsByTagName('li');
var sliderTopContent = document.getElementById('slider-top-content');
var sliderTopContentList = sliderTopContent.getElementsByTagName('li');

var fade = function() {};
var initialPosition = 1;
var projectCanSlide = false;
var transitionTime = 20;
var projectToDisplay = 4;

var imageJson = [{

  url: [
    'images/slider-mount.jpg',
    'images/slider-mount-2.jpg',
    'images/slider-mount-3.jpg',
  ]
}, {
  url: [
    'images/slider-mount-4.jpg',
    'images/slider-mount-5.jpg',
    'images/slider-mount-6.jpg'
  ]
}, {
  url: [
    'images/slider-mount-7.jpg',
    'images/slider-mount-8.jpg',
    'images/slider-mount-9.jpg'
  ]
}];

btnLeft.onclick = function() {

  // counter = 0;

  if (imageSlideCount > 0)
    imageSlideCount--;

  titleChange(imageSlideCount);

  return false;
}

btnRight.onclick = function() {

  // counter = 0;

  if (imageSlideCount < imageJson.length - 1)
    imageSlideCount++;

  titleChange(imageSlideCount);

  return false;
}

sliderLeft.onclick = function() {
  if (counter != 0) {
    while (flag == 1) {
      flag = 0;
      var canSlideLeft = true;

      if (counter >= 0)
        counter--;

      slider(counter, canSlideLeft);
    }
    console.log(flag);
  }
  return false;
  // flag =1;
}

sliderRight.onclick = function() {
  if (counter != imageJson.length - 1) {
    while (flag == 1) {
      flag = 0;
      if (counter < imageJson.length - 1)
        counter++;

      var canSlideLeft = false;

      slider(counter, canSlideLeft);

    }
    console.log(flag);
  }
  return false;
  // flag = 1;
}

function init() {

  items = sliderList.children;
  imageNumber = items.length;
  imageWidth = items[0].children[0].offsetWidth;

  sliderList.style.width = parseInt(imageWidth * imageNumber) + 'px';
}

function slider(counter, canSlideLeft) {

  items = sliderList.children;
  imageNumber = items.length;
  imageWidth = items[0].children[0].offsetWidth;
  if (counter <= items.length - 1) {
    effect = setInterval(function() {

      if ((canSlideLeft && counter) || (counter === 0 && parseInt(sliderList.style.left) < 0)) {
        value -= 10;

      } else if (!canSlideLeft && counter) {
        value += 10;
      }
      sliderList.style.left = -value + 'px';
      // console.log(sliderList.style.left);

      if (value % imageWidth === 0 && !canSlideLeft) {
        clearInterval(effect);
        flag = 1;
        console.log(flag);

      } else if (value % imageWidth === 0 && canSlideLeft) {
        clearInterval(effect);
        flag = 1;
        console.log(flag);

      }
    }, 10);
  }
  for (var i = 0; i < selectionList.length; i++) {

    if (selectionList[i].classList.contains('current'))
      selectionList[i].classList.remove('current');
  }
  // console.log(selectionList)
  selectionList[counter].classList.add('current');
}

function titleChange(imageSlideCount) {

  images = sliderList.getElementsByTagName('img');

  for (var i = 0; i < sliderTopContentList.length; i++) {

    if (sliderTopContentList[i].classList.contains('active'))
      sliderTopContentList[i].classList.remove('active');
  }

  sliderTopContentList[imageSlideCount].classList.add('active');

  var title = document.getElementsByClassName('slider-content');

  for (var i = 0; i < imageJson[imageSlideCount].url.length; i++) {

    images[i].setAttribute('src', imageJson[imageSlideCount].url[i]);
  }
}

init();

fadeEffect(initialPosition);

function fadeEffect(position) {
  for (var i = 0, sliderLength = projectSlider.children.length; i < sliderLength; i += projectToDisplay) {
    var opacity = 0;
    if (position === (i / projectToDisplay + 1)) {
      fade = setInterval(fadeIn(i, opacity), transitionTime);
    } else {
      setTimeout(fadeOut(i), transitionTime);
    }
  }
  setProjectSliderMargin();
}

function fadeIn(i, opacity) {
  return function() {
    if (projectSlider.children.hasOwnProperty(i)) {
      projectSlider.children[i].style.display = 'list-item';
      projectSlider.children[i].style.opacity = opacity;
    }
    if (projectSlider.children.hasOwnProperty(i + 1)) {
      projectSlider.children[i + 1].style.display = 'list-item';
      projectSlider.children[i + 1].style.opacity = opacity;
    }
    if (projectSlider.children.hasOwnProperty(i + 2)) {
      projectSlider.children[i + 2].style.display = 'list-item';
      projectSlider.children[i + 2].style.opacity = opacity;
    }
    if (projectSlider.children.hasOwnProperty(i + 3)) {
      projectSlider.children[i + 3].style.display = 'list-item';
      projectSlider.children[i + 3].style.opacity = opacity;
    }
    opacity += 1 / 20;
    if (Math.floor(opacity) > 1) {
      clearInterval(fade);
      projectCanSlide = true;
    }
  }
}

function fadeOut(i) {
  return function() {
    if (projectSlider.children.hasOwnProperty(i)) {
      projectSlider.children[i].style.opacity = '0';
      projectSlider.children[i].style.display = 'none';
    }
    if (projectSlider.children.hasOwnProperty(i + 1)) {
      projectSlider.children[i + 1].style.opacity = '0';
      projectSlider.children[i + 1].style.display = 'none';
    }
    if (projectSlider.children.hasOwnProperty(i + 2)) {
      projectSlider.children[i + 2].style.opacity = '0';
      projectSlider.children[i + 2].style.display = 'none';
    }
    if (projectSlider.children.hasOwnProperty(i + 3)) {
      projectSlider.children[i + 3].style.opacity = '0';
      projectSlider.children[i + 3].style.display = 'none';
    }
  }
}

function setProjectSliderMargin() {
  projectSlider.children[(initialPosition - 1) * projectToDisplay].style.marginLeft = '0%';
  if (projectSlider.children.hasOwnProperty((initialPosition - 1) * projectToDisplay + 3)) {
    projectSlider.children[(initialPosition - 1) * projectToDisplay + 3].style.marginRight = '0%';
  }
}

projectPrevious.onclick = function() {
  if (projectCanSlide && ((initialPosition - 1) * projectToDisplay > 0)) {
    projectCanSlide = false;
    fadeEffect(--initialPosition);
  }
}

projectNext.onclick = function() {
  if (projectCanSlide && ((initialPosition + 1) <= Math.ceil(projectSlider.children.length / projectToDisplay))) {
    projectCanSlide = false;
    fadeEffect(++initialPosition);
  }
}