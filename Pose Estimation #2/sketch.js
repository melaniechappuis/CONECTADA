// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let video;
let poseNet;
let pose;

let vid;
let vid1;
let vid2;
let vid3;
let vid4;


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
  video.size (1450, 900);
  video.hide();
  
  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses)
  
  vid = createVideo("deer.mp4");
  vid.loop(); 
  vid.hide(); 
  
  vid1 = createVideo("lion.mp4");
  vid1.loop(); 
  vid1.hide();
  
  vid2 = createVideo("rheas.mp4");
  vid2.loop(); 
  vid2.hide();
  
  vid3 = createVideo("jaguar.mp4");
  vid3.loop(); 
  vid3.hide();
  
  vid4 = createVideo("peccary.mp4");
  vid4.loop(); 
  vid4.hide();
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
  
  let img = vid.get();  
  let img1 = vid1.get();
  let img2 = vid2.get();
  let img3 = vid3.get();
  let img4 = vid4.get();
 
  
  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    
    //let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    
    image(img,pose.leftEye.x, pose.leftEye.y,175,100);
    image(img1,pose.rightWrist.x, pose.rightWrist.y,175,100);
    image(img2,pose.leftWrist.x, pose.leftWrist.y, 175,100);
    image(img3,pose.leftHip.x, pose.leftHip.y, 175,100);
    image(img4,pose.leftShoulder.x, pose.leftShoulder.y, 175,100);
    
    
    
    
    //ask for d  
  
    //ellipse(pose.leftWrist.x, pose.leftWrist.y, d);
    
      //for (let i = 0; i < pose.keypoints.length; i++) {
      //let x = pose.keypoints[i].position.x;
      //let y = pose.keypoints[i].position.y;
      //fill(0,255,0);
      //ellipse(x,y,16,16);
    //}
    
  }

}