const container = document.querySelector('.container');
let numberOfSquare = 16; // Default value

let functionToCall = addBlack;

//prompt user to enter a number of square on reset
const reset = document.querySelector('.reset');

reset.addEventListener('click', () => {
    numberOfSquare = promptForValidInput();

    createGrid(numberOfSquare);

    // Leave a black color on moveover
    addBackgroundColor();
});


const setProgressiveColor = document.querySelector('.opacity');
setProgressiveColor.addEventListener('click', () => {
     functionToCall = toggleBackgroundColorWithOpacity;
     addBackgroundColor();
});

const setRandomColorButton = document.querySelector('.random-color');
setRandomColorButton.addEventListener('click', () => {
    functionToCall = toggleBackgroundColorWithRGBRandomColors;
    addBackgroundColor();
});


// create the grid by default
createGrid(numberOfSquare);

// Leave a black color on moveover
addBackgroundColor();

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
function addBackgroundColor() {
    const divElements = container.querySelectorAll('div.square');
    divElements.forEach( (div) => {
        div.addEventListener('mouseover', functionToCall);
    });
}


// Event functions
function addBlack(e) {
    e.target.style.backgroundColor = 'black';
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
}


// This Function will toggle background colors with random rgb colors
function toggleBackgroundColorWithRGBRandomColors(e){
    const currentDiv = e.target;
    const randomColor = randomRGB();
    
    // Change div color
    currentDiv.style.backgroundColor = randomColor;
}

function randomRGB() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}