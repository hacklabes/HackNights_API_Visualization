/* SOME COLORS FROM FB PALETTE
rgb(59,89,152)
rgb(65,94,155)
rgb(98,122,173)
rgb(109,132,180)
rgb(88,144,255)
rgb(120,170,255)

rgb(78,86,101)
rgb(145,151,163)
rgb(216,222,234)
rgb(233,233,250)
rgb(246,247,248)
*/

// For various colors
var COLOR_BACKGROUND,
    COLOR_CIRCLE;

// For circle properties
var circlePos;
var circleDiameter;

function setup() {
    var myCanvas = createCanvas(max(500,window.innerWidth*0.66), window.innerHeight);
	myCanvas.parent('myCanvas');
	frameRate(24);
    smooth();

    COLOR_BACKGROUND = color(59,89,152);
    COLOR_CIRCLE = color(233,233,250);
    background(COLOR_BACKGROUND);

    circlePos = [];
    circleDiameter = 1;
}

function draw() {
    if (circlePos.x) {
        stroke(0);
        fill(COLOR_CIRCLE);
        ellipse(circlePos.x, circlePos.y, circleDiameter, circleDiameter);
    }
    circleDiameter += 16;
    circleDiameter = min(2*max(width,height), circleDiameter);
}

function mouseReleased() {
    circleDiameter = 1;
    circlePos = {x: mouseX, y: mouseY};
    COLOR_CIRCLE = color(random(60,120), random(90,170), random(150,255));
}

function keyReleased() {
    if (key === ' ') {
        setup();
    }
}

function windowResized() {
    resizeCanvas(max(500,windowWidth*0.66), windowHeight);
}
