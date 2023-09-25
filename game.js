var array_of_buttons=["green","red","yellow","blue"];
var comp_generated_button=[];
var userClickButton=[];
var level=0;
var prev_level=1;
var game_Started=false;
var index=0;
function nextSequence(){
    //generate a random number
    level++;
    $("h1").text("Level "+level);
    
    
    var randomNumber=Math.round(Math.random()*3);
    //now choose a color depending on this random number as it gives the index
    var currentColor=array_of_buttons[randomNumber];
    comp_generated_button.push(currentColor);
    //whenever button is selected we need to get a sound of that button and also effect
    $("#" + currentColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(currentColor);
    index=0;
}

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickButton.push(userChosenColor);
    playSound(userChosenColor);
    $("#"+userChosenColor).addClass("pressed");
    setTimeout(function () {
        $("#"+userChosenColor).removeClass("pressed");
    }, 100);
    checkUserInputs(userChosenColor);
    if (index === comp_generated_button.length){
        setTimeout(function(){
            userClickButton.length=0;
            nextSequence();
        },1000);
        
    }
    
})
function playSound(sound){
    var audio=new Audio(sound+".mp3");
    audio.play();
}
//keypress detect at the beginning

$(document).keypress(function(ev){
    if (!game_Started){
        nextSequence();
        $("h1").text("Level "+level);
        game_Started=true;
    }
})


function checkUserInputs(userSelect){
    if (index < comp_generated_button.length){
        if (userSelect === comp_generated_button[index])
            index++;
        else{
            prev_level=level;
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("Game Over!Press any key to restart");
            setTimeout(function () {
                startOver();
            }, 100);
            //startOver();
            
        }
    }
}
function startOver(){ 
    comp_generated_button=[];
    level=0;
    game_Started=false;
    prev_level-=1;
    $("h2").text("Previous Best: "+prev_level);
}
//now we should compare input from user

