let paintColor;
let pBox;

function setup() {
  createCanvas(windowHeight, windowWidth);
  colorMode(HSB);
  background(11, 0, 96);
  paintColor = color(50);
  pBox = 20; //box size
}

function draw() {
  
  //mouse clicks for palette
  if (mouseIsPressed) {
    if(mouseX <= pBox){
      if(mouseY <= pBox) {
        paintColor = color(0,100,100); //red
      }
      else if(mouseY <= (2*pBox)){
        paintColor = color(30,100,100); //orange
      }
      else if(mouseY <= (3*pBox)){
        paintColor = color(60,100,100); //yellow
      }
      else if(mouseY <= (4*pBox)){
        paintColor = color(120,100,100); //green
      }
      else if(mouseY <= (5*pBox)){
        paintColor = color(180,100,100); //cyan
      }
      else if(mouseY <= (6*pBox)){
        paintColor = color(240,100,100); //blue
      }
      else if(mouseY <= (7*pBox)){
        paintColor = color(300,100,100); //violet
      }
      else if(mouseY <= (8*pBox)){
        paintColor = color(30, 100, 50); //brown
      }
      else if(mouseY <= (9*pBox)){
        paintColor = color(0,0,100); //white
      }
      else if(mouseY <= (10*pBox)){
        paintColor = color(0,0,0); //black
      }
    }
    stroke(paintColor);
    strokeWeight(5);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  
  
  //colorsquares
  stroke(11, 0, 96);
  strokeWeight(1.5);
  fill(0,100,100); //red
  rect(0,0, pBox);
  fill(30,100,100); //orange
  rect(0,pBox,pBox);
  fill(60,100,100); //yellow
  rect(0,2*pBox,pBox);
  fill(120,100,100); //green
  rect(0,3*pBox,pBox);
  fill(180,100,100); //cyan
  rect(0,4*pBox,pBox);
  fill(240,100,100); //blue
  rect(0,5*pBox,pBox);
  fill(300,100,100); //violet
  rect(0,6*pBox,pBox);
  fill(30, 100, 50); //brown
  rect(0,7*pBox,pBox);
  fill(0,0,100); //white
  rect(0,8*pBox,pBox);
  fill(0,0,0); //black
  rect(0,9*pBox,pBox);
}

