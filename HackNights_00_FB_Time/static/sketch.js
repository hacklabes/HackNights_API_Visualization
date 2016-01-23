// This is a 24-element array to keep track of post count per hour
var hourPostCount = [];

// This is a 60-element array to keep track of post count per minute
var minutePostCount = [];

// This is a 60-element array to keep track of post count per second
var secondPostCount = [];

// This is a variable with the total number of posts processed
var totalPostCount = 0;

// This is to keep track of the max number of posts per hour and per minute
var maxPostPerHour = 0;
var maxPostPerMinute = 0;
var maxPostPerSecond = 0;

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
    COLOR_TEXT,
    COLOR_HOURS,
    COLOR_MINUTES,
    COLOR_SECONDS;

function setup() {
    var myCanvas = createCanvas(max(500,window.innerWidth*0.66), window.innerHeight);
	myCanvas.parent('myCanvas');
	frameRate(24);
    smooth();

    textAlign(CENTER,CENTER);
    textSize(64);
    strokeWeight(2);

    COLOR_BACKGROUND = color(59,89,152);
    COLOR_TEXT = color(233,233,250);
    COLOR_HOURS = color(120,170,255);
    COLOR_MINUTES = color(233,233,250);
    COLOR_SECONDS = color(109,132,180);

    // put zeros in post count arrays
    for(var i=0; i<24; i++){
        hourPostCount[i] = 0;
    }
    for(var i=0; i<60; i++){
        minutePostCount[i] = 0;
        secondPostCount[i] = 0;
    }
}

function addPost(postDateString){
    var postDate = new Date(postDateString);
    var postHour = postDate.getHours();
    var postMinute = postDate.getMinutes();
    var postSecond = postDate.getSeconds();

    hourPostCount[postHour] = hourPostCount[postHour] + 1;
    if(hourPostCount[postHour] > maxPostPerHour){
        maxPostPerHour = hourPostCount[postHour];
    }

    minutePostCount[postMinute] = minutePostCount[postHour] + 1;
    if(minutePostCount[postMinute] > maxPostPerMinute){
        maxPostPerMinute = minutePostCount[postMinute];
    }

    secondPostCount[postSecond] = secondPostCount[postSecond] + 1;
    if(secondPostCount[postSecond] > maxPostPerSecond){
        maxPostPerSecond = secondPostCount[postSecond];
    }

    totalPostCount = totalPostCount + 1;
}

function draw() {
    background(COLOR_BACKGROUND);
    if(maxPostPerHour>0){
        drawPosts();
    }
    else{
        fill(COLOR_TEXT);
        text("CLICK TO START", 0,0, width,height);
    }
}

function drawPosts(){
    var secondStep = width/60.0;
    for(var s=0; s<60; s++){
        push();
        stroke(COLOR_SECONDS);
        noFill();
        translate(secondStep*(s+0.5), height/2);
        var dataHeight = (secondPostCount[s]/maxPostPerSecond)*height/2;
        ellipse(0,0, dataHeight,dataHeight);
        pop();
    }

    var minuteStep = width/60.0;
    for(var m=0; m<60; m++){
        push();
        stroke(COLOR_MINUTES);
        noFill();
        translate(minuteStep*(m+0.5), height/2);
        var dataHeight = (minutePostCount[m]/maxPostPerMinute)*height;
        ellipse(0,0, dataHeight,dataHeight);
        pop();
    }

    var hourStep = width/24.0;
    for(var h=0; h<24; h++){
        push();
        stroke(COLOR_HOURS);
        noFill();
        translate(hourStep*(h+0.5), height/2);
        var dataHeight = (hourPostCount[h]/maxPostPerHour)*height;
        ellipse(0,0, dataHeight,dataHeight);
        pop();
    }
}

function windowResized() {
    resizeCanvas(max(500,windowWidth*0.66), windowHeight);
}
