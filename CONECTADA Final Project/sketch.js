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
let vid5;
let vid6;
let vid7;
let vid8;
let vid9;
let vid10;
let vid11;
let vid12;
let vid13;

let vid30;
let vid31;
let vid32;
let vid33;
let vid34;
let vid35;
let vid36;
let vid37;
let vid38;
let vid39;


let img101;
let img102;
let img103;
let img104;
let img105;
let img106;
let img107;
let img108;
let img109;
let img110;
let img111;

let sound;
let jungle;


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

function preload() {
  //https://p5js.org/reference/#/p5/loadImage
  vid1 = createVideo("videos/froog.mp4"); 
  vid1.loop(); 
  vid1.hide(); // hides the html video loader 
  
  vid2 = createVideo("videos/rheas.mp4");
  vid2.loop(); 
  vid2.hide(); // hides the html video loader 
  
  vid3 = createVideo("videos/centipede.mp4");
  vid3.loop(); 
  vid3.hide(); // hides the html video loader 
  
  vid4 = createVideo("videos/otter.mp4");
  vid4.loop(); 
  vid4.hide(); // hides the html video loader 

  vid5 = createVideo("videos/eagle.mp4");
  vid5.loop(); 
  vid5.hide(); // hides the html video loader 

  vid6 = createVideo("videos/sloth.mp4");
  vid6.loop(); 
  vid6.hide(); // hides the html video loader 

  vid7 = createVideo("videos/macaw.mp4");
  vid7.loop(); 
  vid7.hide(); // hides the html video loader 

  vid8 = createVideo("videos/monkey4.mp4");
  vid8.loop(); 
  vid8.hide(); // hides the html video loader 

  vid9 = createVideo("videos/peccary2.mp4");
  vid9.loop(); 
  vid9.hide(); // hides the html video loader 

  vid10 = createVideo("videos/tapir.mp4");
  vid10.loop(); 
  vid10.hide(); // hides the html video loader 

  vid11 = createVideo("videos/butterfly.mp4");
  vid11.loop(); 
  vid11.hide(); // hides the html video loader 

  vid12 = createVideo("videos/biird.mp4");
  vid12.loop(); 
  vid12.hide(); // hides the html video loader 

  vid13 = createVideo("videos/jaguar6.mp4");
  vid13.loop(); 
  vid13.hide(); // hides the html video loader 
  

  vid30 = createVideo("videos/bird.mp4");
  vid30.loop(); 
  vid30.hide(); // hides the html video loader 

  vid31 = createVideo("videos/monkey.mp4");
  vid31.loop(); 
  vid31.hide(); // hides the html video loader 

  vid32 = createVideo("videos/jaguar.mp4");
  vid32.loop(); 
  vid32.hide(); // hides the html video loader 

  vid33 = createVideo("videos/frog.mp4");
  vid33.loop(); 
  vid33.hide(); // hides the html video loader 

  vid34 = createVideo("videos/deer.mp4");
  vid34.loop(); 
  vid34.hide(); // hides the html video loader 

  vid35 = createVideo("videos/anteater.mp4");
  vid35.loop(); 
  vid35.hide(); // hides the html video loader 

  vid36 = createVideo("videos/lion.mp4");
  vid36.loop(); 
  vid36.hide(); // hides the html video loader 

  vid37 = createVideo("videos/reptile.mp4");
  vid37.loop(); 
  vid37.hide(); // hides the html video loader 

  vid38 = createVideo("videos/peccary.mp4");
  vid38.loop(); 
  vid38.hide(); // hides the html video loader 

  vid39 = createVideo("videos/snake.mp4");
  vid39.loop(); 
  vid39.hide(); // hides the html video loader


  jungle = loadSound ('sounds/jungle.mp3');

  sound = loadSound('sounds/frog.mp3');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(1450, 900);
  video = createCapture(VIDEO);
  
  video.size (1450, 900);
  video.hide();

  jungle.loop();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
  
 img101 = loadImage('images/figure1.png');
 img102 = loadImage('images/figure2.png');
 img103 = loadImage('images/figure3.png');
 img104 = loadImage('images/figure4.png');
 img105 = loadImage('images/figure5.png');
 img106 = loadImage('images/figure6.png');
 img107 = loadImage('images/figure7.png');
 img108 = loadImage('images/figure8.png');
 img109 = loadImage('images/figure9.png');
 img110 = loadImage('images/figure10.png');
 img111 = loadImage('images/figure11.png');

  let options = {
    inputs: 34,
    outputs: 25,
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
  
  //translate(1440, 0, 0);
  translate(1920, 0, 0);
  scale(-1, 1);
  image(video, 0, 0, windowWidth, windowHeight);
  
  sound.setVolume(0.5);
  
  
  let img1 = vid1.get();
  let img2 = vid2.get();
  let img3 = vid3.get();
  let img4 = vid4.get();
  let img5 = vid5.get();
  let img6 = vid6.get();
  let img7 = vid7.get();
  let img8 = vid8.get();
  let img9 = vid9.get();
  let img10 = vid10.get();
  let img11 = vid11.get();
  let img12 = vid12.get();
  let img13 = vid13.get();

let img30 = vid30.get();
let img31 = vid31.get();
let img32 = vid32.get();
let img33 = vid33.get();
let img34 = vid34.get();
let img35 = vid35.get();
let img36 = vid36.get();
let img37 = vid37.get();
let img38 = vid38.get();
let img39 = vid39.get();



//(1920, 900);

image(img30, 100, 200, 172, 100);
image(img31, 600, 400,172, 100);
image(img32, 600, 200, 172, 100);
image(img33, 200, 40, 172, 100);
image(img34, 600, 780,172, 100);
image(img35, 900, 100, 172, 100);
image(img36, 1600, 500, 172, 100);
image(img37, 1700, 370, 172, 100);
image(img38, 200, 400, 172, 100);
image(img39, 1600, 750, 172, 100);


  
  if (pose) {
    
    let eyeR = pose.rightEye;
    let earL = pose.leftEar;

    let shoulderR = pose.rightShoulder;
    let shoulderL = pose.leftShoulder; 

    let elbowR = pose.rightElbow;
    
    let wristR = pose.rightWrist;
    let wristL = pose.leftWrist;    

    let kneeR = pose.rightKnee;
    let kneeL = pose.leftKnee;

    let hipR = pose.rightHip;
    let hipL = pose.leftHip;
    
    image(img101,pose.rightEye.x, pose.rightEye.y, 170, 190);
    image(img102,pose.leftEar.x, pose.leftEar.y, 150, 176);
    
    image(img103,pose.rightShoulder.x, pose.rightShoulder.y, 187, 157);
    image(img104,pose.leftShoulder.x, pose.leftShoulder.y, 198, 176);
    
    image(img105,pose.rightElbow.x, pose.rightElbow.y, 170, 180);
    
    image(img106,pose.rightWrist.x, pose.rightWrist.y, 100, 230);
    image(img107,pose.leftWrist.x, pose.leftWrist.y, 136, 210);
    
    image(img108,pose.rightKnee.x, pose.rightKnee.y, 120, 185);
    image(img109,pose.leftKnee.x, pose.leftKnee.y, 170, 150);
    
    image(img110,pose.rightHip.x, pose.rightHip.y, 120, 190);

    image(img111,pose.leftHip.x, pose.leftHip.y, 150, 170);
    
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
      image(img1, 800, 300, 384, 216);
      break;
   
      case "M":
      //if the poseLabel is Y, display the squirrel image
      image(img2, 300, 800, 384, 216);
      break;
    
      case "W":
      //if the poseLabel is C, display the turrell image
      image(img3, 100, 500, 384, 216);
      break;
      
      case "I":
      //if the poseLabel is C, display the turrell image
      image(img4, 500, 200, 384, 216);
      break;

      case "T":
      //if the poseLabel is C, display the turrell image
      image(img5, 750, 700, 384, 216);
      break;

     case "K":
      //if the poseLabel is C, display the turrell image
      image(img6, 600, 300, 384, 216);
      break;

     case "C":
      //if the poseLabel is C, display the turrell image
      image(img7, 900, 100, 384, 216);
      break;

      case "F":
      //if the poseLabel is C, display the turrell image
      image(img8, 600, 400, 384, 216);
      break;

      case "Z":
      //if the poseLabel is C, display the turrell image
      image(img9, 600, 400, 384, 216);
      break;

      case "U":
      //if the poseLabel is C, display the turrell image
      image(img10, 400, 600, 384, 216);
      break;

      case "D":
      //if the poseLabel is C, display the turrell image
      image(img11, 700, 300, 384, 216);
      break;

      case "X":
      //if the poseLabel is C, display the turrell image
      image(img12, 400, 500, 384, 216);
      break;

      case "0":
      //if the poseLabel is C, display the turrell image
      image(img13, 300, 300, 384, 216);
      sound.play();
      break;

   
    default:
    // do nothing if it isn't one of the above
  }
}

