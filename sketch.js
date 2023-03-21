let paintColor;
let pBox;
let bStroke = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(11, 0, 96);
  paintColor = color(11, 0, 96);
  pBox = 20; //box size
  button = createButton('Clear canvas');
  button.position(0, 280);
  button.mousePressed(clearBG);
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
      else if(mouseY <= (240) && mouseY>= 225) {
        bStroke += 0.5;
        //console.log(bStroke);
      }
      else if(mouseY <= 275 && mouseY >= 260) {
        bStroke -= 0.5;
        //console.log(bStroke);
      }
    }
    stroke(paintColor);
    strokeWeight(bStroke);
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

  
  fill('black');
  noStroke();
  text('Bigger brush', 25, 235)
  circle(10, 260, 10);
  text('Smaller brush', 20, 265)
  circle(12, 230, 20);

  
}

function clearBG() {
  clear();
  background(11, 0, 96);
  bStroke = 5;

}
