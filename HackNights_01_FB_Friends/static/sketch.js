var friendPostCount = [];
var friendPicture = [];
var totalPostCount = 0;

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
    COLOR_TEXT;

function setup() {
    var myCanvas = createCanvas(max(500,window.innerWidth*0.66), window.innerHeight);
	myCanvas.parent('myCanvas');
	frameRate(24);
    smooth();

    textAlign(CENTER,CENTER);
    textSize(64);

    COLOR_BACKGROUND = color(59,89,152);
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
        friendPicture[name] = pic;
    }

    totalPostCount = totalPostCount + 1;
}

function draw() {
    background(COLOR_BACKGROUND);
    if(totalPostCount>0){
        fill(COLOR_TEXT);
        text("THANK YOU", 0,0, width,height);
    }
    else{
        fill(COLOR_TEXT);
        text("CLICK TO START", 0,0, width,height);
    }
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
