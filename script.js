const container = document.querySelector('.container');
let numberOfSquare = 16; // Default value
const shadeColors = ['#0000001a', '#00000033', '#0000004d',
                     '#00000066', '#00000080', '#00000099',
                      '#000000b3', '#000000cc', '#000000e6',
                       '#000000ff'];

let functionToCall = addBlack;

//prompt user to enter a number of square on reset
const reset = document.querySelector('.reset');

reset.addEventListener('click', () => {
    numberOfSquare = promptForValidInput();

    createGrid(numberOfSquare);


    // Leave a black color on moveover
    addColor();
});


const setProgressiveColor = document.querySelector('.opacity');
setProgressiveColor.addEventListener('click', () => {

     functionToCall = toggleBackgroundColorWithOpacity;

     addColor();
});


// create the grid by default
createGrid(numberOfSquare);

// Leave a black color on moveover
addColor();

// Function to prompt user for a valid input
function promptForValidInput() {
    let userInput;
    
    do {
        userInput = prompt('Enter the number of squares per side (up to 100)');
        // Parse the input and check if it's a valid number
        numberOfSquare = parseInt(userInput, 10);
    } while (isNaN(numberOfSquare) || numberOfSquare <= 0 || numberOfSquare > 100);

    return numberOfSquare;
}

// Function to clear the grid
function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}


// Function to create a n*n grid square
function createGrid(numberOfSquare){
    // Clear existing grid first
    clearGrid();

    let totalNumberOfSquare = numberOfSquare * numberOfSquare + 1;

    // Set the variable for the number of squares
    document.documentElement.style.setProperty('--numberOfSquare', numberOfSquare);


    // Add 16 initial divs
    for (let i = 1; i < totalNumberOfSquare; i++) {
    const div = document.createElement('div');
    div.classList.add('square');
    container.appendChild(div);
    }
}


// Function to add color
function addColor() {
    const divElements = container.querySelectorAll('div.square');
    divElements.forEach( (div) => {
        div.addEventListener('mouseover', functionToCall);
    });
}


// Event functions
function addBlack(e) {
    e.target.style.backgroundColor = '#00000000';
  }


// Function to add 10% black to the background color
// 1. Get the background color of the div
// If the background color is white, set it to black with an initial opacity of 0.1
// else, increment the opacity of the background color(0.1)
function toggleBackgroundColorWithOpacity(e) {
   
    // Get the current background color as an RGB value
    
    const currentColor = window.getComputedStyle(e.target).backgroundColor;
    
    console.log(currentColor);

    // Parse the current RGBA value
    const rgbaValues = currentColor.match(/(\d+(\.\d+)?)/g);
    const r = parseInt(rgbaValues[0]);
    const g = parseInt(rgbaValues[1]);
    const b = parseInt(rgbaValues[2]);
    const a = parseFloat(rgbaValues[3]);

    // Check if alpha is NaN or undefined (indicating an issue with getting RGBA)
    if (isNaN(a) || a === undefined) {
        e.target.style.backgroundColor = `rgba(0, 0, 0)`; // Set a default color
        return;
    }

    // Calculate the next alpha value
    const nextAlpha = (a < 1) ? (a + 0.1) : 1;

    // Set the next RGBA value
    e.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${nextAlpha})`;


    // if (currentColor === '#00000000') {
    //     // If the background color is fully transparent black, set it to the first shade color
    //     e.target.style.backgroundColor = shadeColors[0];
    // } else if (currentColor === '#000000ff') {
    //     // If the background color is fully opaque black, keep it as is
    //     e.target.style.backgroundColor = '#000000ff';
    // } else {
    //     const currentIndex = shadeColors.indexOf(currentColor);
    //     console.log(currentIndex);
    //     if (currentIndex !== -1 && currentIndex < shadeColors.length - 1) {
    //         // If the current color is in the array and not the last one, increment the opacity
    //         e.target.style.backgroundColor = shadeColors[currentIndex + 1];
    //     }

    //     else {
    //         e.target.style.backgroundColor = '#000000ff';
    //     }
    // }
  }



// convert rgba code to hex
function rgbaToHex(rgba) {
    // Extract RGBA components
  const rgbaValues = rgba.match(/(\d+(\.\d+)?)/g);
  const r = parseInt(rgbaValues[0]);
  const g = parseInt(rgbaValues[1]);
  const b = parseInt(rgbaValues[2]);
  const a = Math.round(parseFloat(rgbaValues[3]) * 255);

  // Convert each component to hex and ensure two digits
  const toHex = (component) => {
    const hex = component.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  // Construct the hex color code
  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(a)}`;

  return hexColor;
  }