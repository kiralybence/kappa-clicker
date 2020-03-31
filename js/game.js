var points = 0;
var timer = 60;
var size = "64";
var countdown;

function random(max) {
	return Math.floor((Math.random() * max) + 1);
}

function pos() {
	$("#object").css("left", random(770-size));
	$("#object").css("top", random(520-size));
}

function hitsPerSecond() {
	return (points/(60-timer)).toFixed(2);
}

$("#object").click(function() {
	$("#points").html(++points);
	$("#hitsPerSec").html(hitsPerSecond());
	pos();

	$("#clickSound")[0].play();
});

$("#startButton").click(function() {
	clearInterval(countdown);
	$("#points").html(points = 0);
	$("#timer").html(timer = 60);
	$("#hitsPerSec").html("0.00");
	$("#startButton").html("Restart");
	$("#object").css("display", "initial");
	pos();

	countdown = setInterval(function(){
		if (timer > 0) {
			$("#timer").html(--timer);
			$("#hitsPerSec").html(hitsPerSecond());
		} else {
			$("#startButton").html("Start");
			$("#object").css("display", "none");
			$("#endSound")[0].play();
			clearInterval(countdown);
		}
	}, 1000);
});

$("#backgroundControl").change(function() {
	$("#ingame").css("background-color", $(this).val());
});

$("#sizeControl").change(function() {
size = $(this).val();
	$("#object").css("width", size);
	$("#object").css("height", size);
	pos();
});

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
	$("#object").css("width", "64");
	$("#object").css("height", "64");
	$("#object").attr("src", "img/kappa.png");

	// Controls
	$("#ingame").css("background-color", "white");
	$("#backgroundControl").val("#FFFFFF");
	$("#sizeControl").val("64");

	// Variables
	size = "64";
});