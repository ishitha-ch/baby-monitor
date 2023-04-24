img = "";
status = "";
objects = [];

function preload() {
    song=loadSound("alerttone.wav");


}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status - Detecting Objects";
}

function modelLoaded() {
    console.log("model loaded!");
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
    image(video, 0, 0, 380, 380);
    if (status != "") {
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; 1 < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label=="person"){
                document.getElementById("baby_status").innerHTML="Baby Found!";
                song.stop();
            }
            else{
                document.getElementById("baby_status").innerHTML="BABY NOT FOUND!";
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("baby_status").innerHTML="BABY NOT FOUND!";
                song.play();
        }
    }
}

