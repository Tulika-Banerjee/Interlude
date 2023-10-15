/*
 * @name Kaleidoscope
 * @arialabel User draws thick black lines on the grey background and it is mirrored 5 times in a circle like a kaleidoscope
 * @description A kaleidoscope is an optical instrument with two or more reflecting surfaces tilted to each other in an angle. This example tries to replicate the behavior of a kaleidoscope. Set the number of reflections at the symmetry variable and start drawing on the screen. Adjust the brush size with the help of the slider. The clear screen as it says clears the screen. The save button will download a .jpg file of the art that you have created.
 */
// Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
let symmetry = 5;  

let angle = 360 / symmetry;
let saveButton, clearButton, mouseButton, keyboardButton;
let slider;

// Get the canvas and its context
const canvas = document.getElementById('combinedCanvas');
const ctx = canvas.getContext('2d');
canvas.style.display="none";

const image2 = new Image();
image2.src = 'posttcard.png';

// Load the two images
//const image1 = new Image();
/*const image1 = new Image();
image1.src = 'designexample.jpg';

const image2 = new Image();
//image2 = new Image();
image2.src = 'posttcard.png';

 // Wait for the image to load
 image1.onload = function() {
   // Draw the image on the canvas
   ctx.drawImage(image1, 50, 50, canvas.width/2-50, 400);
 };*/

 image2.onload = function() {
  // Draw the image on the canvas
  ctx.drawImage(image2, canvas.width/2+50, 50, canvas.width/2-50, 400);
};

/* Wait for both images to load
Promise.all([loadImage(image1), loadImage(image2)])
.then(images => {
 // Draw the first image
 ctx.drawImage(images[0], 0, 0, canvas.width / 2, canvas.height);

 // Draw the second image next to the first one
 ctx.drawImage(images[1], canvas.width / 2, 0, canvas.width / 2, canvas.height);
})
.catch(error => {
 console.error('Error loading images:', error);
});*/

// Function to load an image and return a promise
/*function loadImage(image) {
  return new Promise((resolve, reject) => {
    image.onload = function(){ctx.drawImage(image,0,0);};
    image.onerror = (error) => reject(error);
    console.log("Image loaded");
  });
}*/

function setup() { 
  createCanvas(1010, 710);
  angleMode(DEGREES);
  //bg = loadImage('backgroundsky.jpeg');
  background(0);

  // Creating the save button for the file
  saveButton = createButton('save');
  saveButton.mousePressed(saveFile);

  // Creating the clear screen button
  clearButton = createButton('clear');
  clearButton.mousePressed(clearScreen);

  // Creating the button for Full Screen
  fullscreenButton = createButton('Full Screen');
  fullscreenButton.mousePressed(screenFull);

  // Setting up the slider for the thickness of the brush
  brushSizeSlider = createButton('Brush Size Slider');
  sizeSlider = createSlider(1, 100, 4, 0.1);
    
  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

// Save File Function
/*function saveFile() {
  save('design.jpg');
}*/

/* Save File Function
function saveFile() {
  //file_name = "postcard" + int(random(10000)) + ".jpg";
  save('design.jpg');
}*/

function saveFile() {
  // Convert canvas data to a Blob
  const canvasmain = document.getElementById('defaultCanvas0');
  canvasmain.toBlob(function(blob) {
    // Create a Blob URL
    const blobUrl = URL.createObjectURL(blob);

     // Create a new Image element
     const img = new Image();

     // Set the source of the Image to the Blob URL
     img.src = blobUrl;
 
     // Wait for the image to load
     img.onload = function() {
       // Draw the image on the canvas
       //const ctx = canvasmain.getContext('2d');
       canvasmain.style.display = "none";
       ctx.drawImage(img, 50, 50, canvas.width/2-50, 400);
       canvas.style.display="block";
     }

     

    /*Create a temporary link element
    const link = document.createElement('a');

    // Set the href attribute to the Blob URL
    link.href = blobUrl;

    // Set the download attribute with the desired file name
    link.download = 'design.jpg';

    // Programmatically trigger a click event on the link
    link.click();*/

    /* Remove the link and revoke the Blob URL to free up resources
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);*/
  }, 'image/jpeg'); // Specify the image format if needed (e.g., 'image/png')
}

// Clear Screen function
function clearScreen() {
  background(0);
}

// Full Screen Function
function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}
offset = 0;
var rx = 525 + offset;
var ry= 355 + offset;
var  prx = rx;
var  pry = ry;
var t = 0;

function draw() {

  if (frameCount == 60*30) {
    noLoop();
    saveFile();
    
  }
  
  let vol = mic.getLevel();
  let freq = getFrequency(vol);

  //ctx.drawImage(image1, 0, 0, canvas.width / 2, canvas.height);
  //ctx.drawImage(image2, canvas.width / 2, 0, canvas.width / 2, canvas.height);
  
  
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height)   {
    
    let mx =  rx - width / 2;
    let my =  ry - height / 2;
    let pmx =  prx - width / 2;
    let pmy = pry - height / 2;
    prx = rx;
    pry = ry;
  
    if(mx > 300)
      {
          symmetry = random(4,12);
          angle = 360 / symmetry;
          // offset = offset - 5;
          // if(offset<-300)
          // {
          //     offset = 0;
          // }
          rx = 505;
          ry= 355;
          prx = rx;
          pry = ry;
      }
    if(int(t)%200==0)
      {
        
        rx = prx+random(0,1);
        ry= pry+random(0,1);
        // console.log(t);
      }
    else{
      rx = prx+random(-6,7);
      ry= pry+random(-6,7);
    }

    // console.log(t);
    
    
    
    if (1) {
      
      
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        // let sw = sizeSlider.value();
        mystroke = vol*55
        // mystroke = 4;
        if(mystroke>4)
          {
            mystroke = 4;
          }
        strokeWeight(mystroke);
        
      
        var sad = [10,80,80,120,160,190]
        var angry = [180,255,20,150,10,90]
        var pride = [40,255,100,200,100,255]
        var happy = [80,255,0,100,50,200]
        var envy = [80,100,180,255,120,200]
        var alpha = 255
        //freq= freq-50;
        if (freq<50){
          color = sad
          alpha = 200
        }
        else if (freq<100)
          {
            color = sad
            alpha = 255
          }
        else if (freq<200)
          {
            color = happy
            alpha = 255
          }
        else
          {
            color = pride
            alpha = 255
          }
        
        
        stroke(random(color[0],color[1]),random(color[2],color[3]),random(color[4],color[5]),alpha)
        
        line(mx, my, pmx, pmy);
        // line(x,y,px,py);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        // line(x,y,px,py);
        pop();
        t+=0.1;
      }
    }
  }
}
function getFrequency(volume) {
  // You may need to adjust the mapping based on your use case
  let minFreq = 20; // Minimum frequency
  let maxFreq = 20000; // Maximum frequency
  
  // Map the volume to a frequency range
  let freq = map(volume, 0, 1, minFreq, maxFreq);
  return freq;
}