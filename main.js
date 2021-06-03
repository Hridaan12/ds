img = "";
objects = [];
status = "";

function preload() {
    img = loadImage('a..jpg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
   
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!") 
    status = true;
  
}





function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(img, 0, 0, 380, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(img, gotResult);
        
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("Number_Of_Objects").innerHTML = "Number of objects detected are : " + objects.length;
           fill(r, g, b);
           text(objects[i].label, objects[i].x, objects[i].y);
           noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}