var points = 0;
var timer = 60;
var size = 64;
var countdown;
var kappa = document.querySelector("#object");//TODO: refactor the name
var pointsEl = document.querySelector('#points');
var hitsPerSec = document.querySelector("#hitsPerSec");//TODO: refactor the name
var startButton = document.querySelector("#startButton");//TODO: refactor the name
var timerEl = document.querySelector("#timer");//TODO: refactor the name
var backgroundControl = document.querySelector("#backgroundControl");//TODO: refactor the name
var ingame = document.querySelector("#ingame");//TODO: refactor the name
var sizeControl = document.querySelector("#sizeControl");//TODO: refactor the name

// Generate a random integer
function random(max) {
	return Math.floor((Math.random() * max) + 1);
}

// Puts Kappa into random position
function pos() {
	kappa.style.left = random(770-size)+"px";
	kappa.style.top = random(520-size)+"px";
}

// Get hits/second
function hitsPerSecond() {
	return (points/(60-timer)).toFixed(2);
}

// Event if Kappa is clicked
kappa.addEventListener("click", function () {
	updateKappa();
});

// Event if Kappa is dragged
kappa.addEventListener("dragstart", function() {
	updateKappa();
});

// Disable dragging of elements
document.addEventListener("dragstart", function(event) {
	event.preventDefault();
});

// Update Kappa's position
function updateKappa() {
	pointsEl.innerHTML = "" + ++points;
	hitsPerSec.innerHTML = hitsPerSecond();
	pos();
	document.querySelector("#clickSound").play();
}

// Event if Start is clicked
startButton.addEventListener("click", function () {
	clearInterval(countdown);
	pointsEl.innerHTML = "" + (points = 0);
	timerEl.innerHTML = "" + (timer = 60);
	hitsPerSec.innerHTML = "0.00";
	startButton.innerHTML = "Restart";
	kappa.style.display = "initial";
	pos();

	countdown = setInterval(function () {
		if(timer > 0){
			timerEl.innerHTML = "" + --timer
			hitsPerSec.innerHTML = hitsPerSecond();
		}else{
			startButton.innerHTML = "Start";
			kappa.style.display = "none";
			document.querySelector("#endSound").play();
			clearInterval(countdown);
		}
	},1000);
});

// Event if Background is changed
backgroundControl.addEventListener("change", function () {
	ingame.style.backgroundColor = backgroundControl.value;
});

// Event if Size is changed
sizeControl.addEventListener("change", function () {
	size = sizeControl.value;
	kappa.style.width = size + "px";
	kappa.style.height = size + "px";
	pos();
});

// Event if Reset is clicked
document.querySelector("#resetButton").addEventListener("click",function(){
	clearInterval(countdown);

	// Scores
	pointsEl.innerHTML = "" + (points = 0);
	timerEl.innerHTML = "" + (timer = 60);
	hitsPerSec.innerHTML = "0.00";
	document.querySelector("#hit").setAttribute("src", "img/kappa.png");

	// Buttons
	startButton.innerHTML = "Start";
	startButton.style.display = "inline";

	// Object
	kappa.style.display = "none";
	kappa.style.width = "64px";
	kappa.style.height = "64px";
	kappa.setAttribute("src", "img/kappa.png");

	// Controls
	ingame.style.backgroundColor = "white";
	backgroundControl.value = "#FFFFFF";
	sizeControl.value = 64;

	// Variables
	size = 64;
});

