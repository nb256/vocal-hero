var img = null;
$(document).ready(function() {
  img = new Image();
  img.src = 'img/ship.png';
  img2 = new Image();
  img2.src = 'img/brick.png';
  img2.width = 50;
  img2.height = 50;
});

// Create the canvas
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var velocityOfShip = 0;
var velocityOfObstackle = +3;
var ship = {x:canvas.width/2, y:canvas.height /4 * 3};
var flame = {x:ship.x +28, y: ship.y + 110};



var obstackleColor = 180;
var obstackle1 = {x:0, y:0, width:canvas.width, height:50};
var obstackle2 = {x:0, y:0, width:canvas.width, height:50};



var resetObstackles = function(){
  //1/4 of screen is allowed, and the other 3/4 is obstackle
  var allowedSpaceX= (canvas.width*5/8)*Math.random();

  obstackle1.width = allowedSpaceX;
  obstackle2.width = canvas.width - canvas.width/4 - allowedSpaceX;
  obstackle2.x = allowedSpaceX + canvas.width/4;
  obstackle1.y = 0;
  obstackle2.y = 0;
};

resetObstackles();



var drawAFrame = function (pitch,inputMin,inputMax){
  context.clearRect(0, 0, innerWidth, innerHeight);
  // context.globalCompositeOperation = "source-over";


  //crash
  // if(obstackle1.y + 50 == ship.y && shipp)




  var inputX = canvas.width/2;
  //input is scaled for the screen
  if(pitch){
     inputX = canvas.width * (pitch - inputMin) / (inputMax - inputMin);
     }
  velocityOfShip = (inputX-ship.x)/10;
  velocityOfObstackle += 0.001;
  //last input demonstration
  context.globalAlpha = 0.2;
  context.fillRect(inputX,0,30,canvas.height);
  context.globalAlpha = 1.0;

  obstackle1.y += velocityOfObstackle;
  obstackle2.y += velocityOfObstackle;
  if(obstackle1.y > canvas.height+ 200)
  {
    obstackleColor+=30;
    obstackleColor%=255;
    resetObstackles();
  }
  //obstackles
  var last_fill_style = context.fillStyle;


  context.fillStyle = 'rgb(' + obstackleColor + ','+obstackleColor+','+'100)';

  context.fillRect(obstackle1.x,obstackle1.y,obstackle1.width,obstackle1.height);
  context.fillRect(obstackle2.x,obstackle2.y,obstackle2.width,obstackle2.height);
  context.fillStyle = last_fill_style;


  ship.x += velocityOfShip;
  flame.x += velocityOfShip;
  //ship
  context.drawImage(img, ship.x, ship.y,  57, 97);
  //flame
  drawTheFlame(context);

};

//FLAME EFFECT STARTS
var particles = [];

//Lets create some particles now
var particle_count = 100;
for(var i = 0; i < particle_count; i++)
{
	particles.push(new particle());
}

function particle()
{
	this.speed = {x: -2.5+Math.random()*5, y: 15-Math.random()*10};
	this.location = {x: flame.x, y: flame.y};
	this.radius = 10+Math.random()*20;
	this.life = 20+Math.random()*10;
	this.remaining_life = this.life;
	//colors
	this.r = Math.round(Math.random()*255);
	this.g = Math.round(Math.random()*255);
	this.b = Math.round(Math.random()*255);
}

function drawTheFlame(ctx)
	{
		 ctx.globalCompositeOperation = "lighter";

		for(var i = 0; i < particles.length; i++)
		{
			var p = particles[i];
			ctx.beginPath();
			//changing opacity according to the life.
			//opacity goes to 0 at the end of life of a particle
			p.opacity = Math.round(p.remaining_life/p.life*100)/100;
			//a gradient instead of white fill
      var last_fill_style = ctx.fillStyle;
			var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
			gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
			ctx.fillStyle = gradient;
			ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
			ctx.fill();
      ctx.fillStyle = last_fill_style;

			//lets move the particles
			p.remaining_life--;
			p.radius--;
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;

			//regenerate particles
			if(p.remaining_life < 0 || p.radius < 0)
			{
				//a brand new particle replacing the dead one
				particles[i] = new particle();
			}
		}
	}
