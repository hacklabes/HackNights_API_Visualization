var friendPostCount = [];
var friendPicture = [];
var totalPostCount = 0;
var maxPostCount = 0;

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
    COLOR_LINES,
    COLOR_TEXT;

var PICTURE_HEIGHT = 64;

function setup() {
    var myCanvas = createCanvas(max(500,window.innerWidth*0.66), window.innerHeight);
	myCanvas.parent('myCanvas');
	imageMode(CENTER);
	frameRate(24);
    smooth();

    textAlign(CENTER,CENTER);
    textSize(64);

    COLOR_BACKGROUND = color(59,89,152);
    COLOR_LINES = color(120,170,255);
    COLOR_TEXT = color(233,233,250);
}

function addPost(data){
    var name = data.name;
    var pic = data.pic;
    
    // update post count
    if(friendPostCount[name]){
        friendPostCount[name] = friendPostCount[name] + 1;
    }
    // if first time, start counter and add picture
    else{
        friendPostCount[name] = 1;
        friendPicture[name] = loadImage(pic, function(img){
            var newH = min(PICTURE_HEIGHT, img.height);
            img.resize(newH/img.height*img.width,newH);
        });
    }

    // update counters (max and total)
    if(friendPostCount[name] > maxPostCount){
        maxPostCount = friendPostCount[name];
    }
    totalPostCount = totalPostCount + 1;
}

function draw() {
    background(COLOR_BACKGROUND);
    if(totalPostCount>0){
        drawLines();
        drawPictures();
    }
    else{
        fill(COLOR_TEXT);
        text("CLICK TO START", 0,0, width,height);
    }
}

function drawLines(){
    push();
    translate(width/2, height/2);
    // draw lines
    for(name in friendPicture){
        var maxDistance = 0.5*min(width,height);
        var distance = map(friendPostCount[name], 1,maxPostCount, maxDistance-PICTURE_HEIGHT/2,PICTURE_HEIGHT);

        rotate(TWO_PI/Object.keys(friendPicture).length);
        strokeWeight(1);
        noFill();

        // inner mandala
        stroke(COLOR_TEXT);
        arc(0,0, maxDistance/3, -distance, PI,0);

        // outer mandala
        stroke(COLOR_LINES);
        ellipse(0,0, maxDistance, -2*distance);
    }
    pop();
}

function drawPictures(){
    push();
    translate(width/2, height/2);
    // draw lines
    for(name in friendPicture){
        var maxDistance = 0.5*min(width,height);
        var distance = map(friendPostCount[name], 1,maxPostCount, maxDistance-PICTURE_HEIGHT/2,PICTURE_HEIGHT);
        rotate(TWO_PI/Object.keys(friendPicture).length);
        image(friendPicture[name], 0,-distance);
    }
    pop();
}

function windowResized() {
    resizeCanvas(max(500,windowWidth*0.66), windowHeight);
}

function mousePressed(){
    console.log(totalPostCount);
    var sum = 0;
    for(var key in friendPostCount){
        sum += friendPostCount[key];
    }
    console.log("sum: "+sum);
}
