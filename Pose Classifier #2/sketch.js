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

let vid1;
let vid2;
let vid3;
let vid4;

function preload() {
  //https://p5js.org/reference/#/p5/loadImage
  vid1 = createVideo("videos/frog.mp4");
  vid1.loop(); 
  vid1.hide(); // hides the html video loader 
  
  vid2 = createVideo("videos/monkey.mp4");
  vid2.loop(); 
  vid2.hide(); // hides the html video loader 
  
  vid3 = createVideo("videos/sloth.mp4");
  vid3.loop(); 
  vid3.hide(); // hides the html video loader 
  
  vid4 = createVideo("videos/snake.mp4");
  vid4.loop(); 
  vid4.hide(); // hides the html video loader 

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
  
  let img1 = vid1.get();
  let img2 = vid2.get();
  let img3 = vid3.get();
  let img4 = vid4.get();

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
      image(img1, 200, 200, 384, 216);
      break;
   
      case "M":
      //if the poseLabel is Y, display the squirrel image
      image(img2, 30, 100, 384, 216);
      break;
    
      case "C":
      //if the poseLabel is C, display the turrell image
      image(img3, 50, 300, 384, 216);
      break;
      
      case "A":
      //if the poseLabel is C, display the turrell image
      image(img4, 350, 20, 384, 216);
      break;
    default:
    // do nothing if it isn't one of the above
  }
}
    