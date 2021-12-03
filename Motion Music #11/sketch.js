let canvas;
let video;
let poseNet;
let poses = [];

let sucess;
// Declaring variables for different sounds
let sound1, sound2;
let sound3, sound4;
let sound5, sound6;
let sound7, sound8;

let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;
let img10;

//FULL SCREEN MODE
function mousePressed() {
   // Set the value of fullscreen
    // into the variable
    let fs = fullscreen();
      
    // Call to fullscreen function
    fullscreen(!fs); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload(){
//preloading all the sounds needed to to be played once the model is ready

img1 = loadImage("images/figure7.png");
img2 = loadImage("images/figure1.png");
img3 = loadImage("images/figure3.png");
img4 = loadImage("images/figure4.png");
img5 = loadImage("images/figuree5.png");
img6 = loadImage("images/figure6.png");
img7 = loadImage("images/figure8.png");
img8 = loadImage("images/figure9.png");
img9 = loadImage("images/figure10.png");
img10 = loadImage("images/figure11.png");

sound1 = loadSound('sounds/cougar.mp3');
sound2 = loadSound('sounds/dolphins.mp3');
sound3 = loadSound('sounds/eagle.mp3');
sound4 = loadSound('sounds/frog.mp3');
sound5 = loadSound('sounds/goldenliontamarin.mp3');
sound6 = loadSound('sounds/insects.mp3');

// guitarLoopTwo = loadSound('guitarLoopTwo.mp3');
}

function setup() {
//creating and centering the canvas
createCanvas(windowWidth, windowHeight);

// background(240, 200);
// takeOnMe.playMode('restart');

//Capture video from the webcam and hide it to just show the canvas
video = createCapture(VIDEO);
//video.size (windowWidth, windowHeight);
video.size (1450, 900);  

video.hide();

// Create a new poseNet method with a single detection
poseNet = ml5.poseNet(video, modelReady);

// This sets up an event that fills the global variable "poses"
// with an array every time new poses are detected
poseNet.on('pose', function (results) {
  poses = results;
});
}

function modelReady() {
//Callback function when the model is ready
success = createP('Move around to play some music!');
success.class('success');
}

function draw() {

//Push the hidden video onto the canvas
// Flip it using translate and scale to create a mirror
push();

translate(video.width, 0);
scale(-1, 1);
image(video, 0, 0, windowWidth, windowHeight);

pop();

// Function to draw the different body parts and their connections
drawSkeleton()

// Function to draw the nose ellipse and logics for music playing
posePlayer();

}

function drawSkeleton(){
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

    // Seperating out the 17 keypoints posenet returns
    let nose = pose.keypoints[0];
    let leftEye = pose.keypoints[1];
    let rightEye = pose.keypoints[2];
    let leftEar = pose.keypoints[3];
    let rightEar = pose.keypoints[4];
    let leftShoulder = pose.keypoints[5];
    let rightShoulder = pose.keypoints[6];
    let leftElbow = pose.keypoints[7];
    let rightElbow = pose.keypoints[8];
    let leftWrist = pose.keypoints[9];
    let rightWrist = pose.keypoints[10];
    let leftHip = pose.keypoints[11];
    let rightHip = pose.keypoints[12];
    let leftKnee = pose.keypoints[13];
    let rightKnee = pose.keypoints[14];

    if (nose.score > 0.5) {
      strokeWeight(10)
      strokeCap(ROUND);
      stroke(255, 112, 84, 135);
      
      //line joining right shouder and elbow
      line(width - rightShoulder.position.x, rightShoulder.position.y, width - rightElbow.position.x, rightElbow.position.y);
      
      //line joining left shoulder to elbow
      line(width - leftShoulder.position.x, leftShoulder.position.y, width - leftElbow.position.x, leftElbow.position.y);

      // right shoulder socket
      noStroke();
      fill(255, 112, 84, 127);
      ellipse(width - rightShoulder.position.x, rightShoulder.position.y, 30, 30);
      
      //left shoulder socket
      ellipse(width - leftShoulder.position.x, leftShoulder.position.y, 30, 30);

      // Socket to elbow
      stroke(0, 255, 239, 135);
      line(width - rightElbow.position.x, rightElbow.position.y, width - rightWrist.position.x, rightWrist.position.y);
      
      line(width - leftElbow.position.x, leftElbow.position.y, width - leftWrist.position.x, leftWrist.position.y);

      //Elbows
      fill(0, 255, 239, 127);
      noStroke();
      ellipse(width - leftElbow.position.x, leftElbow.position.y, 30, 30);
      ellipse(width - rightElbow.position.x, rightElbow.position.y, 30, 30);

      // Wrists
      fill(88, 147, 212, 127);
      ellipse(width - rightWrist.position.x, rightWrist.position.y, 30, 30);
      ellipse(width - leftWrist.position.x, leftWrist.position.y, 30, 30);

      //torso quardilateral
      stroke(36, 112, 160, 135);
      fill(36, 112, 160, 127);
      quad(width - rightShoulder.position.x, rightShoulder.position.y,width - leftShoulder.position.x,leftShoulder.position.y, width - leftHip.position.x, leftHip.position.y, width - rightHip.position.x, rightHip.position.y);

      stroke(255, 118, 87, 135);
      fill(255, 118, 87, 127);

      let faceRadius = dist(width - nose.position.x, nose.position.y, width - leftEar.position.x, leftEye.position.y);
      ellipse(width - nose.position.x, nose.position.y, faceRadius, faceRadius+ 60);

      // lines from hips to knees
      stroke(167, 209, 41, 127);
      line(width - rightHip.position.x, rightHip.position.y, width - rightKnee.position.x, rightKnee.position.y);
      line(width - leftHip.position.x, leftHip.position.y, width - leftKnee.position.x, leftKnee.position.y);

  //img1 leftEye + rightEye
      image(img1, width - leftEye.position.x, leftEye.position.y, 100, 200);
      image(img1, width - rightEye.position.x, rightEye.position.y, 100, 200);

  //img2, img3, leftHip + rightHip 
      image(img2, width - rightHip.position.x, rightHip.position.y, 165, 220);
      image(img3, width - leftHip.position.x, leftHip.position.y, 172, 177);

    //img4, img5,leftShoulder + rightShoulder
      image(img4, width - rightShoulder.position.x, rightShoulder.position.y, 252, 212);
      image(img5, width - leftShoulder.position.x, leftShoulder.position.y, 250, 224);

    //img6, img7,leftElbow + rightElbow
      image(img6, width - rightElbow.position.x, rightElbow.position.y, 250, 263);
      image(img7, width - leftElbow.position.x, leftElbow.position.y, 150, 234);

    //img8, img9,leftKnee + rightKnee
      image(img8, width - rightKnee.position.x, rightKnee.position.y, 130, 181);
      image(img9, width - leftKnee.position.x, leftKnee.position.y, 205, 180);

    //img10, leftWrist
      image(img10, width - leftWrist.position.x, leftWrist.position.y, 200, 315);
    }
  }
}

function posePlayer()  {

// Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

    // Seperating out the 17 keypoints posenet returns
    let nose = pose.keypoints[0];
    let leftEye = pose.keypoints[1];
    let rightEye = pose.keypoints[2];
    let leftEar = pose.keypoints[3];
    let rightEar = pose.keypoints[4];
    let leftShoulder = pose.keypoints[5];
    let rightShoulder = pose.keypoints[6];
    let leftElbow = pose.keypoints[7];
    let rightElbow = pose.keypoints[8];
    let leftWrist = pose.keypoints[9];
    let rightWrist = pose.keypoints[10];
    let leftHip = pose.keypoints[11];
    let rightHip = pose.keypoints[12];
    let leftKnee = pose.keypoints[13];
    let rightKnee = pose.keypoints[14];

    // From experimentation nose seems to be the best detected body part
    // Hence if there is a nose means there is a human present
    //Also trying to avoid multiple pose detection of people farther off
    if (nose.score > 0.5) {

      //Right wrist playing conditions
      if( width - rightWrist.position.x > width - 200 && rightWrist.position.x > 0  && !sound4.isPlaying()){
        sound4.play();
        rectMode(CENTER);
        noStroke();
        fill(88, 147, 212, 100)
        rect(700, 280, 150, height);
      } else if(width - rightWrist.position.x < width - 200 && rightWrist.position.x < 800 && sound4.isPlaying()){
        sound4.stop();
      }

      //Left wrist playing conditions
      if(width - leftWrist.position.x < width - 600 && leftWrist.position.x < 800 && !sound6.isPlaying()){
        rectMode(CENTER);
        noStroke();
        fill(88, 147, 212, 100)
        rect(100, 280, 150, height);
        sound6.play();
      } else if(width - leftWrist.position.x > width - 600 && leftWrist.position.x > 0 && sound6.isPlaying()){
        sound6.stop();
      }

      // Nose playing condition 1
      if(nose.position.y > 0 && nose.position.y <= height/4 && !sound2.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, height/8, width, height/4);
        sound2.play();
        // drumLoopTwo.loop();
      } else if(nose.position.y > height/4 && nose.position.y < height && sound2.isPlaying()){
        sound2.stop();
      }

      // Nose playing condition 2
      if(nose.position.y > height/4 && nose.position.y <= height/2 && !sound1.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, 3*height/8, width, height/4);
        sound1.play();
        // drumLoopOne.loop();
      } else if(nose.position.y <= height/4 && nose.position.y > height/2 && nose.position.y < height && sound1.isPlaying()){
        sound1.stop();
      }

      // Nose playing condition 3
      if(nose.position.y > height/2 && nose.position.y <= 3*height/4 && !sound5.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, 5*height/8, width, height/4);
        sound5.play();
      } else if(nose.position.y < height/2 && nose.position.y > 3*height/4 && nose.position.y < height && sound5.isPlaying()){
        sound5.stop();
      }

      // Nose playing condition 4
      //
      if(nose.position.y > 3*height/4 && nose.position.y <= height && !sound3.isPlaying()){
        noStroke();
        fill(222,205,195, 100);
        rectMode(CENTER);
        rect(width/2, 7*height/8, width, height/4);
        sound3.play();
      } else if(nose.position.y < 3*height/4 && nose.position.y > 0 && nose.position.y < height && sound3.isPlaying()){
        sound3.stop();
      }

    }
  }


}
