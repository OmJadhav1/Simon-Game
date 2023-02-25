const buttonColours = ["green" , "red" , "yellow" , "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    level++;
    userClickedPattern.splice(0,userClickedPattern.length);
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour) ;   

    $("#"+randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);
    
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id")
    
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("." + currentColour)
  .addClass('pressed')
  .delay(100)
  .queue(function(next){
    $(this).removeClass('pressed');
    next();
  })
}

function checkAnswer(){

    if(userClickedPattern.length == gamePattern.length){
        if(JSON.stringify(gamePattern)==JSON.stringify(userClickedPattern)){
            setTimeout(nextSequence, 1000);   
        }else{
            playSound("wrong");
            gameover();
            startOver();
        }      
    }
}

function gameover(){
    $("body")
  .addClass('game-over')
  .delay(200)
  .queue(function(next){
    $(this).removeClass('game-over');
    next();
  })

  $("#level-title").text("Game Over, Press Any Key to Restart");
}

function startOver(){
    level = 0;
    gamePattern.splice(0,gamePattern.length);
    started = false;
}