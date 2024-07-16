var img = null;
var logo = null;
$(document).ready(function () {
  img = new Image();
  img.src = "img/ship.png";
  logo = new Image();
  logo.src = "img/logo.png";
});

const game = {
  state: "play",
  set: function (new_state) {
    this.state = new_state;
  },
  get: function () {
    return this.state;
  },
};

var StartGame = function (pitch, inputMin, inputMax) {
  switch (game.get("state")) {
    case "menu":
      // createFlame(menuFlame.x, menuFlame.y);
      drawAMenuFrame();
      break;
    case "play":
      // createFlame(shipFlame.x, shipFlame.y);
      drawAGameFrame(pitch, inputMin, inputMax);
      break;
  }
};

// Create the canvas
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var velocityOfShip = 0;
var velocityOfObstackle = +3;
var ship = { x: canvas.width / 2, y: (canvas.height / 4) * 3 };
var shipFlame = { x: ship.x + 28, y: ship.y + 110 };
var score = 0;

var obstackleColor = 180;
var obstackle1 = { x: 0, y: 0, width: canvas.width, height: 50 };
var obstackle2 = { x: 0, y: 0, width: canvas.width, height: 50 };
var backgroundRed = 0;
var backgroundGreen = 0;
var flameParticles = [];
var last_score = 0;
if (canvas.width < 480) {
  context.font = "14px Comic Sans MS";
} else if (canvas.width < 768) {
  context.font = "30px Comic Sans MS";
} else {
  context.font = "80px Comic Sans MS";
}

var initializeGame = function () {
  velocityOfShip = 0;
  velocityOfObstackle = +3;
  ship = { x: canvas.width / 2, y: (canvas.height / 4) * 3 };
  shipFlame = { x: ship.x + 28, y: ship.y + 110 };
  score = 0;
  obstackleColor = 180;
  obstackle1 = { x: 0, y: 0, width: canvas.width, height: 50 };
  obstackle2 = { x: 0, y: 0, width: canvas.width, height: 50 };
  backgroundRed = 0;
  backgroundGreen = 0;
  flameParticles = [];
};

var resetObstackles = function () {
  //1/4 of screen is allowed, and the other 3/4 is obstackle
  var allowedSpaceX = ((canvas.width * 5) / 8) * Math.random();

  obstackle1.width = allowedSpaceX;
  obstackle2.width = canvas.width - canvas.width / 4 - allowedSpaceX;
  obstackle2.x = allowedSpaceX + canvas.width / 4;
  obstackle1.y = 0;
  obstackle2.y = 0;
};

resetObstackles();

var drawAMenuFrame = function () {
  //clear screen
  context.clearRect(0, 0, innerWidth, innerHeight);

  //logo
  context.drawImage(
    logo,
    canvas.width / 2 - canvas.width / 6,
    canvas.height / 10,
    canvas.width / 3,
    canvas.width / 3
  );
  //score
  context.fillText(
    "Last Score: " + last_score,
    canvas.width / 2 - canvas.width / 6 + 100,
    (9 * canvas.height) / 10
  );
};

var drawAGameFrame = function (pitch, inputMin, inputMax) {
  //clear screen
  context.clearRect(0, 0, innerWidth, innerHeight);

  context.globalCompositeOperation = "source-over";

  //crash
  if (
    (ship.x + 30 >= obstackle1.x &&
      ship.x + 30 <= obstackle1.x + obstackle1.width &&
      ship.y + 50 >= obstackle1.y &&
      ship.y + 50 <= obstackle1.y + obstackle1.height) ||
    (ship.x + 30 >= obstackle2.x &&
      ship.x + 30 <= obstackle2.x + obstackle2.width &&
      ship.y + 50 >= obstackle2.y &&
      ship.y + 50 <= obstackle2.y + obstackle2.height)
  ) {
    last_score = score;
    initializeGame();
    game.set({ state: "menu" });
  }

  var inputX = canvas.width / 2;
  //input is scaled for the screen
  if (pitch) {
    inputX = 30 + (canvas.width * (pitch - inputMin)) / (inputMax - inputMin);
  }

  //color alert
  if (inputX <= obstackle1.x + obstackle1.width + 30) {
    backgroundRed = Math.floor(
      (obstackle1.x + obstackle1.width - inputX) * 0.3 + 30
    );
    backgroundGreen = 0;
  } else if (inputX >= obstackle2.x - 90) {
    backgroundRed = Math.floor((inputX - obstackle2.x) * 0.3 + 30);
    backgroundGreen = 0;
  } else {
    backgroundGreen = 110;
    backgroundRed = 0;
  }

  context.fillText("Score: " + score, inputX - 30, canvas.height / 10);
  score += velocityOfObstackle;
  score = Math.round(score);
  velocityOfShip = (inputX - ship.x) / 10;
  velocityOfObstackle += 0.001;

  //input shade
  //draw the alert background
  var last_fill_style = context.fillStyle;
  context.globalAlpha = 0.2;
  var cr = "rgb(" + backgroundRed + "," + backgroundGreen + ",0)";
  context.fillStyle = cr;
  context.fillRect(inputX, 0, 30, canvas.height);
  context.globalAlpha = 1.0;
  context.fillStyle = last_fill_style;

  obstackle1.y += velocityOfObstackle;
  obstackle2.y += velocityOfObstackle;
  if (obstackle1.y > canvas.height + 200) {
    obstackleColor += 30;
    obstackleColor %= 255;
    resetObstackles();
  }
  //obstackles
  last_fill_style = context.fillStyle;
  context.fillStyle =
    "rgb(" + obstackleColor + "," + obstackleColor + "," + "100)";
  context.fillRect(
    obstackle1.x,
    obstackle1.y,
    obstackle1.width,
    obstackle1.height
  );
  context.fillRect(
    obstackle2.x,
    obstackle2.y,
    obstackle2.width,
    obstackle2.height
  );
  context.fillStyle = last_fill_style;

  velocityOfShip = (inputX - ship.x) / 10;
  velocityOfObstackle += 0.001;
  ship.x += velocityOfShip;
  shipFlame.x += velocityOfShip;
  //ship
  // alert(ship.x);
  context.drawImage(img, ship.x, ship.y, 57, 97);
  //flame
  drawTheFlame(context);
};

//FLAME EFFECT STARTS

// //clear array first
// while(flameParticles.length > 0) {
//   flameParticles.pop();
// }
//Lets create some particles now
var particle_count = 50;
for (var i = 0; i < particle_count; i++) {
  flameParticles.push(new particle());
}

function particle() {
  this.speed = { x: -2.5 + Math.random() * 5, y: 15 - Math.random() * 10 };
  this.location = { x: shipFlame.x, y: shipFlame.y };
  this.radius = 10 + Math.random() * 20;
  this.life = 20 + Math.random() * 10;
  this.remaining_life = this.life;
  //colors
  this.r = Math.round(Math.random() * 255);
  this.g = Math.round(Math.random() * 255);
  this.b = Math.round(Math.random() * 255);
}

function drawTheFlame(ctx) {
  ctx.globalCompositeOperation = "lighter";

  for (var i = 0; i < flameParticles.length; i++) {
    var p = flameParticles[i];
    ctx.beginPath();
    //changing opacity according to the life.
    //opacity goes to 0 at the end of life of a particle
    p.opacity = Math.round((p.remaining_life / p.life) * 100) / 100;
    //a gradient instead of white fill
    var last_fill_style = ctx.fillStyle;
    var gradient = ctx.createRadialGradient(
      p.location.x,
      p.location.y,
      0,
      p.location.x,
      p.location.y,
      p.radius
    );
    gradient.addColorStop(
      0,
      "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")"
    );
    gradient.addColorStop(
      0.5,
      "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")"
    );
    gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
    ctx.fillStyle = gradient;
    ctx.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = last_fill_style;

    //lets move the particles
    p.remaining_life--;
    p.radius--;
    p.location.x += p.speed.x;
    p.location.y += p.speed.y;

    //regenerate particles
    if (p.remaining_life < 0 || p.radius < 0) {
      //a brand new particle replacing the dead one
      flameParticles[i] = new particle();
    }
  }
}
