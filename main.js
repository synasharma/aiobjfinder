status = "";
object = [];
object_name = "";

function preload() {

}

function setup() {
    canvas = createCanvas(480, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("text_i").value;
}

function modelloaded() {
    console.log("ModelLoaded!");
    status = true;
}

function getresult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        object = result;
    }
}

function draw() {
    image(video, 0, 0, 480, 400);
    if (status != "") {
        objectDetector.detect(video, getresult);
        for (i = 0; i < object.length; i++) {
            percent = floor(object[i].confidence * 100);
            fill("red");
            text(object[i].label + "" + percent + "%" , object[i].x, object[i].y);
            noFill();
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if (object[i].label == object_name) {
                video.stop();
                document.getElementById("obj").innerHTML = object_name + " found";
                var synth = window.speechSynthesis;
                var speak_data1 = object_name + " found";
                var utterance = new SpeechSynthesisUtterance(speak_data1);
                synth.speak(utterance);
                video.play();
            }
            
        }
    }
}