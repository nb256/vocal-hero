$(document).ready(function() {
  var pitch = 0;
  img2 = new Image();


});
var img2 = null;

// Create the canvas
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var ship = {shipX:canvas.width/2, shipY:"500"};
var speedOfShip = 0;


var drawAFrame = function (pitch,inputMin,inputMax){

  speedOfShip = (pitch-(inputMax-inputMin)/2)/100;
  var inputX = canvas.width * (pitch - inputMin) / (inputMax - inputMin);

  context.clearRect(0, 0, canvas.width, canvas.height);

  //
  context.globalAlpha = 0.2;
  context.fillRect(inputX,0,30,canvas.height);
  context.globalAlpha = 1.0;


    //
    // ship.shipX += speedOfShip;
    // ship.shipX %= canvas.width;
  img2.onload = function() {
    context.drawImage(img2, ship.shipX, ship.shipY, 57, 97);
  };
  img2.src = 'public/img/ship.png';
};
