let poseNet;
let noseX = 0;
let noseY = 0;
let leyeX = 0;
let leyeY = 0;
let noseX2 = 0;
let noseY2 = 0;
let leyeX2 = 0;
let leyeY2 = 0;
let video;


let newD = 0;

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

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', getPoses);
} 

function preload() {
  
  vid8 = createVideo("videos/birds.mp4");
  vid8.loop();
  vid8.hide();

  vid9 = createVideo("videos/rheas.mp4");
  vid9.loop();
  vid9.hide();

  vid10 = createVideo("videos/sloth.mp4");
  vid10.loop();
  vid10.hide();

  vid11 = createVideo("videos/monkey.mp4");
  vid11.loop();
  vid11.hide();

  vid1 = createVideo("videos/deer.mp4");
  vid1.loop(); 
  vid1.hide(); // hides the html video loader 
  
  vid2 = createVideo("videos/frog.mp4");
  vid2.loop();
  vid2.hide();  
 
  vid3 = createVideo("videos/jaguar.mp4");
  vid3.loop();
  vid3.hide(); 

  vid4 = createVideo("videos/lion.mp4");
  vid4.loop();
  vid4.hide(); 
  
  vid5 = createVideo("videos/peccary.mp4");
  vid5.loop();
  vid5.hide(); 
  
  vid6 = createVideo("videos/reptile.mp4");
  vid6.loop();
  vid6.hide(); 
  
  vid7 = createVideo("videos/snake.mp4");
  vid7.loop();
  vid7.hide(); 
  
}

function getPoses(poses){
  console.log(poses);
  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;   
    let leX = poses[0].pose.keypoints[1].position.x;
    let leY = poses[0].pose.keypoints[1].position.y;  
    let wY = poses[0].pose.keypoints[10].position.y; 
    let wlY = poses[0].pose.keypoints[9].position.y; 
    
    noseX = lerp(noseX, nX, 0.4);
    noseY = lerp(noseY, nY, 0.4);
    leyeX = lerp(leyeX, leX, 0.4);
    leyeY = lerp(leyeY, leY, 0.4);   
    
    //console.log(noseX + ", " + noseY);
    image(video, 0, 0, windowWidth, windowHeight);
    
    if (wY < 400 || wlY < 400){
    pic7();
    
    }else{ if (nX <= 320 && nY <= 240){
        pic1();
    
    }else if(nX > 320 && nY > 240){
        pic2();
    
    }else if (nX <= 320 && nY > 240){
        pic3();
   
    }else if(nX > 320 && nY <= 240) {
        pic4();
      
    }else if(nX > 320 && nY <= 240) {
        pic5();
        
    }else if(nX > 320 && nY <= 240) {
        pic6();
    }
   }
  }
}

function pic1(){
    
    let img1 = vid1.get();  
    
    let d = dist(noseX, noseY, leyeX, leyeY);
    newD = lerp(d, newD, 0.5);
    let size = map(newD, 0, 100, 10, 200);
    image(img1,(noseX - size/2), (noseY - size/2) - 40, size*3.2, size*2.5);
}

function pic2(){ 
    
    let img2 = vid2.get();
    
    let d = dist(noseX, noseY, leyeX, leyeY);
    newD = lerp(d, newD, 0.5);
    let size = map(newD, 0, 100, 10, 200);
    image(img2,(noseX - size/2) -15, (noseY - size/2) - 40, size*3.2, size*2.5);
}

function pic3(){
    
    let img3 = vid3.get();
    
    let d = dist(noseX, noseY, leyeX, leyeY);
    newD = lerp(d, newD, 0.5);
    let size = map(newD, 0, 100, 10, 200);
    image(img3,(noseX - size/2) -15, (noseY - size/2) , size*3.2, size*2.5);
}

function pic4(){
      
    let img4 = vid4.get();
    
    let d = dist(noseX, noseY, leyeX, leyeY);
    newD = lerp(d, newD, 0.5);
    let size = map(newD, 0, 100, 10, 200);
    image(img4,(noseX - size/2) - 15, (noseY - size/2) - 30, size*3.2, size*2.5);
}

function pic5(){
    
    let img5 = vid5.get();
    
    let d = dist(noseX, noseY, leyeX, leyeY);
    newD = lerp(d, newD, 0.5);
    let size = map(newD, 0, 100, 10, 200);
    image(img5,(noseX - size/2) - 20, (noseY - size/2) - 45, size*3.2, size*2.5);
}

function pic6(){
    
    let img6 = vid6.get();
    
    let d = dist(noseX, noseY, leyeX, leyeY);
    newD = lerp(d, newD, 0.5);
    let size = map(newD, 0, 100, 10, 200);
    image(img6,(noseX - size/2) - 10, (noseY - size/2), size*3.2, size*2.5);
}

function pic7(){
    
    let img7 = vid7.get();
    
    let d = dist(noseX, noseY, leyeX, leyeY);
    newD = lerp(d, newD, 0.5);
    let size = map(newD, 0, 100, 10, 200);
    image(img7,(noseX - size/2), (noseY - size/2) - 10, size*3.2, size*2.5);
}

function modelReady(){
  console.log('model ready');
}

function draw() {

let img8 = vid8.get();  
let img9 = vid9.get();  
let img10 = vid10.get();  
let img11 = vid11.get();  

image(img8, 100, 100, 320, 180);
image(img9, 1020, 600, 320, 180);
image(img10, 1020, 100, 320, 180);
image(img11, 100, 600, 320, 180);


  noStroke();
}