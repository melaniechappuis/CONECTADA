// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let video;
let poseNet;
let pose;

let img1;
let img2;
let img3;
let img4;
let img5;


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

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  //video.size (windowWidth, windowHeight);
  video.size (1450, 900);
  video.hide();
  
  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses)
  
  img1 = loadImage('images/figure1.png');
  img2 = loadImage('images/figure3.png');
  img3 = loadImage('images/figure4.png');
  img4 = loadImage('images/figuree5.png');
  img5 = loadImage('images/figure6.png');
}

function gotPoses(poses) {
  //console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  
 image(video, 0, 0, windowWidth, windowHeight);
  
  
  if (pose) {
    
    
    let eyeR = pose.rightEye;
    let wristR = pose.rightWrist;
    let wristL = pose.leftWrist;
    let shoulderR = pose.rightShoulder;
    let hipR = pose.rightHip;
    
    image(img1,pose.rightEye.x, pose.rightEye.y, 184, 225);
    image(img2,pose.rightWrist.x, pose.rightWrist.y,200,205);
    image(img3,pose.leftWrist.x, pose.leftWrist.y, 260,230);
    image(img4,pose.rightShoulder.x, pose.rightShoulder.y, 260,235);
    image(img5,pose.rightHip.x, pose.rightHip.y, 210,220);
    

//ask for d  
//let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    
      // SKELETON
      //ellipse(pose.leftWrist.x, pose.leftWrist.y, d);
    
      //for (let i = 0; i < pose.keypoints.length; i++) {
      //let x = pose.keypoints[i].position.x;
      //let y = pose.keypoints[i].position.y;
      //fill(0,255,0);
      //ellipse(x,y,16,16);
    //}
    
  }

}