// ml5.js: Pose Classification
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.2-pose-classification.html
// https://youtu.be/FYgYyq-xqAw

// All code: https://editor.p5js.org/codingtrain/sketches/JoZl-QRPK

// Separated into three sketches
// 1: Data Collection: https://editor.p5js.org/codingtrain/sketches/kTM0Gm-1q
// 2: Model Training: https://editor.p5js.org/codingtrain/sketches/-Ywq20rM9
// 3: Model Deployment: https://editor.p5js.org/codingtrain/sketches/c5sDNr8eM

let video;
let poseNet;
let pose;
let skeleton;

let brain;
let poseLabel = "Y";

let img1;
let img2;
let img3;
let img4;

//FULL SCREEN MODE
//function mousePressed() {
   // Set the value of fullscreen
    // into the variable
   // let fs = fullscreen();
      
    // Call to fullscreen function
  //  fullscreen(!fs); 
//}

//function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
//}

function preload() {
  //https://p5js.org/reference/#/p5/loadImage
  img1 = loadImage("images/figure1.png");
  img2 = loadImage("images/figure3.png");
  img3 = loadImage("images/figure4.png");
  img4 = loadImage("images/figuree5.png");
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);

  let options = {
    inputs: 34,
    outputs: 4,
    task: "classification",
    debug: true,
  };
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  console.log("pose classification ready!");
  classifyPose();
}

function classifyPose() {
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  if (results[0].confidence > 0.75) {
    poseLabel = results[0].label.toUpperCase();
    console.log(poseLabel);
  }
  //console.log(results[0].confidence);
  classifyPose();
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("poseNet ready");
}

function draw() {
  
  translate(video.width, 0);
  scale(-1, 1); //mirror effect
  image(video, 0, 0, video.width, video.height);

  if (pose) {
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
    }
    
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y
    }
  }
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
  switch (poseLabel) {
    case "Y":
      //if the poseLabel is Y, display the jaguar image
      image(img1, 0, 0, width, height);
      break;
    case "M":
      //if the poseLabel is Y, display the squirrel image
      image(img2, 0, 0, width, height);
      break;
    case "C":
      //if the poseLabel is C, display the turrell image
      image(img3, 0, 0, width, height);
      break;
      
     case "A":
      //if the poseLabel is C, display the turrell image
      image(img4, 0, 0, width, height);
      break;
    default:
    // do nothing if it isn't one of the above
  }
}
    