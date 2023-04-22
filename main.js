function setup(){
    canvas=createCanvas(600,450);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotresult);
}
function modelloaded(){
    console.log("model is loaded");
}
song="";
rightwristx=0;
rightwristy=0;
leftwristx=0;
leftwristy=0;
scorerightwrist=0;
scoreleftwrist=0;
song1status="";
song2status="";

function preload(){
song1=loadSound("Pasoori.mp3");
song2=loadSound("Pathaan.mp3");
}
function draw(){
    image(video,0,0,600,450);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        song1.stop();
     if(song2status==false){
        song2.play();
        document.getElementById("song").innerHTML="playing : pathaan";
     }
    }
    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);
        song2.stop();
     if(song1status==false){
        song1.play();
        document.getElementById("song").innerHTML="playing : pasoori";
     }
    }
}
function gotresult(results){
    if(results.length>0){
        console.log(results);
        scorerightwrist=results[0].pose.keypoints[10].score;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;

    }
}