const container = document.querySelector('.container');
let numberOfSquare = 16; // Default value



//prompt user to enter a number of square on reset
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
    numberOfSquare = promptForValidInput();

    createGrid(numberOfSquare);

    // hide every 17th div initally
    // hideNthChildElements(container, numberOfSquare);

    // Leave a black color on moveover
    addColor();
});

console.log(numberOfSquare);

// create the grid by default
createGrid(numberOfSquare);


// hide every 17th div initally
//hideNthChildElements(container, numberOfSquare);

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

    let frequency = numberOfSquare + 1;
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

// Function to hide the div with the desired frequency
function hideNthChildElements(container, numberOfSquare) {
    const divElements = container.querySelectorAll('div.square');
    let frequency = numberOfSquare + 1;

    divElements.forEach((div, index) => {
        if ((index + 1) % frequency === 0) {
            div.style.width = '100%';
            div.style.border = '0';
            div.style.height = '0';
        }
    });
}

// Function to add color
function addColor() {
    const divElements = container.querySelectorAll('div.square');
    divElements.forEach( (div) => {
        div.addEventListener('mouseover', addBlack);
    });
}


// Event functions
function addBlack(e) {
    e.target.style.backgroundColor = 'black';
  }
