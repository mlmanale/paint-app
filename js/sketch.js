let port;
let writer;
let reader;
let paintColor;
let pBox;
let bStroke = 5;
let pshift = 1;
const decoder = new TextDecoder();
const encoder = new TextEncoder();
const sounds = new Tone.Players({
  "splat": "sounds/paintsplat.mp3",
  "erase": "sounds/crumple.mp3",
  "small": "sounds/smaller.mp3",
  "big": "sounds/bigger.mp3"
}).toDestination();


effect1 = new Tone.PitchShift(-10).toDestination();
player1 = new Tone.Player("sounds/paintsplat.mp3").connect(effect1);
effect2 = new Tone.PitchShift(-8).toDestination();
player2 = new Tone.Player("sounds/paintsplat.mp3").connect(effect2);
effect3 = new Tone.PitchShift(-6).toDestination();
player3 = new Tone.Player("sounds/paintsplat.mp3").connect(effect3);
effect4 = new Tone.PitchShift(-4).toDestination();
player4 = new Tone.Player("sounds/paintsplat.mp3").connect(effect4);
effect5 = new Tone.PitchShift(-2).toDestination();
player5 = new Tone.Player("sounds/paintsplat.mp3").connect(effect5);
effect6 = new Tone.PitchShift(2).toDestination();
player6 = new Tone.Player("sounds/paintsplat.mp3").connect(effect6);
effect7 = new Tone.PitchShift(4).toDestination();
player7 = new Tone.Player("sounds/paintsplat.mp3").connect(effect7);
effect8 = new Tone.PitchShift(6).toDestination();
player8 = new Tone.Player("sounds/paintsplat.mp3").connect(effect8);
effect9 = new Tone.PitchShift(8).toDestination();
player9 = new Tone.Player("sounds/paintsplat.mp3").connect(effect9);

class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.chunks = "";
  }

  transform(chunk, controller) {
    // Append new chunks to existing chunks.
    this.chunks += chunk;
    // For each line breaks in chunks, send the parsed lines out.
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    // When the stream is closed, flush any remaining chunks out.
    controller.enqueue(this.chunks);
  }
}

class Cursor {
  constructor () {
    this.x = 200;
    this.y = 200;
  }

  draw() {
    push();
      noFill();
      stroke("black");
      strokeWeight(2);
      circle(this.x, this.y, bStroke);
      //console.log("hi");
    pop();
  }

  render() {
    
  }
}

const cursor = new Cursor();

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(11, 0, 96);
  paintColor = color(11, 0, 96);
  pBox = 20; //box size
  // slider = createSlider(0.1, 1.0, 0.1);
  // slider.position(5, 275);
  // slider.style('width', '80px');
  button = createButton('Clear canvas');
  button.position(0, 350);
  button.mousePressed(clearBG);
}

function draw() {
  
  //mouse clicks for palette
  if (mouseIsPressed) {
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

  cursor.draw();
  
  if (reader) {
    serialRead();
  }
}

function clearBG() {
  clear();
  background(11, 0, 96);
  bStroke = 5;
  sounds.player("erase").start();
}

function mousePressed() {
  let pOpaque = 1;
  pOpaque = 1;
  if(mouseX <= pBox){
    if(mouseY <= pBox) {
      paintColor = color(0,100,100, pOpaque); //red
      player1.start();
    }
    else if(mouseY <= (2*pBox)){
      paintColor = color(30,100,100, pOpaque); //orange
      player2.start();
    }
    else if(mouseY <= (3*pBox)){
      paintColor = color(60,100,100, pOpaque); //yellow
      player3.start();
    }
    else if(mouseY <= (4*pBox)){
      paintColor = color(120,100,100, pOpaque); //green
      player4.start();
    }
    else if(mouseY <= (5*pBox)){
      paintColor = color(180,100,100, pOpaque); //cyan
      player5.start();
    }
    else if(mouseY <= (6*pBox)){
      sounds.player("splat").start();
      paintColor = color(240,100,100, pOpaque); //blue
    }
    else if(mouseY <= (7*pBox)){
      player6.start();
      paintColor = color(300,100,100, pOpaque); //violet
    }
    else if(mouseY <= (8*pBox)){
      player7.start();
      paintColor = color(30, 100, 50, pOpaque); //brown
    }
    else if(mouseY <= (9*pBox)){
      player8.start();
      paintColor = color(0,0,100, pOpaque); //white
    }
    else if(mouseY <= (10*pBox)){
      player9.start();
      paintColor = color(0,0,0, pOpaque); //black
    }
    else if(mouseY <= (240) && mouseY>= 225) {
      bStroke += 2.5;
      sounds.player("big").start();
    }
    else if(mouseY <= 275 && mouseY >= 260) {
      bStroke -= 2.5;
      sounds.player("small").start();
    }
  }
}

async function serialRead() {
  while(true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    console.log(value);

    if(value.includes("green")) {
      color = "green";
    }
    else if(value.includes("red")) {
      color = "red";
    }
  }
}
async function connect() {
  port = await navigator.serial.requestPort();
  await port.open({baudRate: 9600});
  writer = port.writable.getWriter();
  reader = port.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TransformStream(new LineBreakTransformer()))
  .getReader();

}

