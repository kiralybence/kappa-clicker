var points = 0;
var timer = 60;
var size = 64;
var countdown;
var kappa = document.querySelector("#object");//TODO: refactor the name
var pointsEl = document.querySelector('#points');
var hitsPerSec = document.querySelector("#hitsPerSec");//TODO: refactor the name
var startButton = document.querySelector("#startButton");//TODO: refactor the name
var timerEl = document.querySelector("#timer");//TODO: refactor the name

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
// TODO: updateKappa() function that gets called on "click" and "dragstart" event
kappa.addEventListener("click", function () {
	pointsEl.innerHTML = "" + ++points;
	hitsPerSec.innerHTML = hitsPerSecond();
	pos();
	document.querySelector("#clickSound").play();
});

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
$("#backgroundControl").change(function() {
	$("#ingame").css("background-color", $(this).val());
});

// Event if Size is changed
$("#sizeControl").change(function() {
	size = $(this).val();
	$("#object").css("width", size);
	$("#object").css("height", size);
	pos();
});

// Event if Reset is clicked
$("#resetButton").click(function() {
	clearInterval(countdown);

	// Scores
	$("#points").html(points = 0);
	$("#timer").html(timer = 60);
	$("#hitsPerSec").html("0.00");
	$("#hit").attr("src", "img/kappa.png");

	// Buttons
	$("#startButton").html("Start");
	$("#startButton").css("display", "inline");

	// Object
	$("#object").css("display", "none");
	$("#object").css("width", 64);
	$("#object").css("height", 64);
	$("#object").attr("src", "img/kappa.png");

	// Controls
	$("#ingame").css("background-color", "white");
	$("#backgroundControl").val("#FFFFFF");
	$("#sizeControl").val(64);

	// Variables
	size = 64;
});