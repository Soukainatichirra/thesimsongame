var colourSequence = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var started = false;
var level = 0;
var userClickedPattern = [];


if (!started) {
  $(document).keypress(function() {
    started = true;
    level++;
    $("#level-title").text("level" + level)
    nextSequence();
  });
}

$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  setTimeout(function() {
      $("#" + userChosenColour).removeClass("pressed");
    }, 100

);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  var randomnumber = Math.floor(Math.random() * 4);
  var randomChosenColour = colourSequence[randomnumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).addClass("pressed");
  playSound(randomChosenColour);
  setTimeout(function() {
      $("#" + randomChosenColour).removeClass("pressed");
    }, 100

);

}

function checkAnswer(currentLevel){
  if( gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
    if(gamePattern.length == userClickedPattern.length){
      level++;
      nextSequence();
    }
    else{
      setTimeout(function(){
        gameOver();
      },100000);
    }

  }

else{
  gameOver();
}
}


function  gameOver(){
  $("#level-title").text("Game Over, press a key to Restart ");
  var gameOverAudio = new Audio("sounds/wrong.mp3");
  gameOverAudio.play();
  started= false;
  gamePattern=[];
  level=0;
}
