var targetClickSound = new Howl({
    src: "/sounds/piston-2.mp3",

});

var targetMissSound = new Howl({
    src: "/sounds/flash-2.mp3",
});

var h1 = document.getElementById("stopWatch"),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

// var sound = new Audio("https://www.mboxdrive.com/piston-2.mp3");

var count = 0;
setInterval(function () {
    console.log(count++);
}, 1000);

var targets = [];
var targets2 = [];
var targets3 = [];

var circle;
var circle2;
var circle3;
var points = parseInt(document.getElementById("points").innerText);
var lives = parseInt(document.getElementById("lives").innerText);
var MouseEvent;
var game = setInterval(function () {
    var point = (new Point(view.size.width, view.size.height)) * (Point.random());

    circle = new Shape.Circle(point, 3);
    circle.fillColor = "#0080ff";

    circle2 = new Shape.Circle(point, 2);
    circle2.fillColor = "#0040ff";

    circle3 = new Shape.Circle(point, 1);
    circle3.fillColor = "#0000ff";

    
    targets.push(circle);
    targets2.push(circle2);
    targets3.push(circle3);

    circle.on("click", function (event) {
        console.log("clicked cirlce");
        targetClickSound.play();
        MouseEvent = event;
        points++;
        document.getElementById("points").innerText = points;
        this.remove();
        circle2.remove();
        circle3.remove();
    });

    circle2.on("click", function (event) {
        console.log("clicked cirlce");
        targetClickSound.play();
        MouseEvent = event;
        points++;
        document.getElementById("points").innerText = points;
        this.remove();
        circle.remove();
        circle3.remove();
    });

    circle3.on("click", function (event) {
        console.log("clicked cirlce");
        targetClickSound.play();
        MouseEvent = event;
        points++;
        document.getElementById("points").innerText = points;
        this.remove();
        circle2.remove();
        circle.remove();
    });

}, 1000);



$("#myCanvas").on("click", function (event) {

    if ((MouseEvent.timeStamp != event.timeStamp) && lives != 0) {
        targetMissSound.play();
        removePoint();
    }

});

function onFrame(e) {

    for(var i = 0; i < targets3.length; i++){
        if(targets3[i].radius <= 10){

            targets3[i].radius = targets3[i].radius + 0.5;
            targets2[i].radius = targets2[i].radius + 1;
            targets[i].radius = targets[i].radius + 1.5;

            if(targets3[i].radius == 10){

                targets3[i].tween(
                    { radius: 10 },
                    { radius: 0 },
                    1000);

                targets2[i].tween(
                    { radius: 20 },
                    { radius: 0 },
                    1000);

                targets[i].tween(
                    { radius: 30 },
                    { radius: 0 },
                    1000);

                targets3.splice(i, 1);
                targets2.splice(i, 1);  
                targets.splice(i, 1);

                console.log("removed circle");
                //removePoint();
            }
        }
    }




    if (lives == 0) {
        clearInterval(game);
        clearTimeout(t);
    }

}





function removePoint() {
    lives--;
    document.getElementById("lives").innerText = lives;
}



/////////////////////////////////////////////////////////////////////////




function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}
timer();


/* Start button */
start.onclick = timer;

/* Stop button */

stop.onclick = function () {
    clearTimeout(t);
}

/* Clear button */
clear.onclick = function () {
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}

