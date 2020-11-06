// Global game variables
let points = 0;
let timer = 60;
let size = 64;

// Countdown
let countdown;

// DOM elements
const kappa = document.querySelector('#object');
const pointsElement = document.querySelector('#points');
const hitsPerSecElement = document.querySelector('#hitsPerSec');
const startButton = document.querySelector('#startButton');
const timerElement = document.querySelector('#timer');
const backgroundColorPicker = document.querySelector('#backgroundColorPicker');
const ingameArea = document.querySelector('#ingame');
const sizePicker = document.querySelector('#sizePicker');
const clickSound = document.querySelector('#clickSound');
const endSound = document.querySelector('#endSound');

function random(max) {
    return Math.floor(Math.random() * (max + 1));
}

function relocateKappa() {
    kappa.style.left = random(770 - size) + 'px';
    kappa.style.top = random(520 - size) + 'px';
}

function getHitsPerSecond() {
    return (points/(60-timer+1)).toFixed(2);
}

function updateKappa() {
    // Increment points
    points++;

    // Update the info fields
    pointsElement.innerHTML = points.toString();
    hitsPerSecElement.innerHTML = getHitsPerSecond().toString();

    // Relocate Kappa to a new position
    relocateKappa();

    // Play the click sound
    clickSound.play();
}

function changeKappaSize(newSize) {
    // Change the global variable
    size = newSize;

    // Change Kappa size
    kappa.style.width = size + 'px';
    kappa.style.height = size + 'px';

    // Relocate Kappa to a new position
    relocateKappa();
}

function changeBackgroundColor(newColor) {
    // Change the ingame area's background color
    ingameArea.style.backgroundColor = newColor;
}

function startGame() {
    // Stop the countdown
    clearInterval(countdown);

    // Reset timer and points
    points = 0;
    timer = 60;

    // Reset info fields
    pointsElement.innerHTML = points.toString();
    timerElement.innerHTML = timer.toString();
    hitsPerSecElement.innerHTML = '0.00';

    // Reset buttons
    startButton.innerHTML = 'Restart';

    // Make Kappa visible
    relocateKappa();
    kappa.style.display = 'initial';

    // Set the countdown
    countdown = setInterval(function() {
        // Decrement the timer
        timer--;

        // Update the info fields
        timerElement.innerHTML = timer.toString();
        hitsPerSecElement.innerHTML = getHitsPerSecond().toString();

        // If timer reached 0
        if (timer === 0) {
            // End the game
            endGame();
        }
    }, 1000);
}

function resetGame() {
    // Stop the countdown
    clearInterval(countdown);

    // Reset variables
    points = 0;
    timer = 60;
    size = 64;

    // Reset info fields
    pointsElement.innerHTML = points.toString();
    timerElement.innerHTML = timer.toString();
    hitsPerSecElement.innerHTML = '0.00';

    // Reset buttons
    startButton.innerHTML = 'Start';

    // Reset Kappa
    kappa.style.display = 'none';
    kappa.style.width = size + 'px';
    kappa.style.height = size + 'px';

    // Reset options
    ingameArea.style.backgroundColor = '#24272d';
    backgroundColorPicker.value = '#24272d';
    sizePicker.value = size;
}

function endGame() {
    // Stop the countdown
    clearInterval(countdown);

    // Reset buttons
    startButton.innerHTML = 'Start';

    // Make Kappa disappear
    kappa.style.display = 'none';

    // Play the ending sound
    endSound.play();
}

// Disable dragging of elements
document.addEventListener('dragstart', function(event) {
    event.preventDefault();
});

// Event if Kappa is clicked
kappa.addEventListener('click', function() {
    updateKappa();
});

// Event if Kappa is dragged
kappa.addEventListener('dragstart', function() {
    updateKappa();
});

// Event if Start button is clicked
startButton.addEventListener('click', function() {
    startGame();
});

// Event if background color picker is changed
backgroundColorPicker.addEventListener('change', function() {
    changeBackgroundColor(backgroundColorPicker.value);
});

// Event if size picker is changed
sizePicker.addEventListener('change', function() {
    changeKappaSize(sizePicker.value)
});

// Event if Reset is clicked
document.querySelector('#resetButton').addEventListener('click', function() {
    resetGame();
});