var rand_color = [];
var level = 0;
var color = ["green", "red", "yellow", "blue"];
var index = -1;
var best = 0;

$(document).keypress(function(){
    if(level === 0){
        $(".box").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
        $("h2").hide();
        addColor();
    }
});

$(document).click(function(){
    if(level === 0){
        $(".box").css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
        $("h2").hide();
        addColor();
    }
});

function addColor(){
    $("h1").fadeOut(300, function() {
        $(this).text("Level " + level).fadeIn(300);
    }).css("font-size", "2em").css("color","white");
    $(".box").fadeIn(300);
    rand_color.push(randomfour());
    level++;
}

function randomfour(){
    var x = Math.random();
    x = Math.ceil(x * 10) % 4;
    
    setTimeout(() => {
        animate(color[x]);
        sound(color[x]);
    },1000);
    return color[x];
    
}

function animate(colorId){
    $("." + colorId).addClass("pressed");
    setTimeout(function () { $("." + colorId).removeClass("pressed"); }, 100);
}

function sound(colorId){
    new Audio('sounds/' + colorId + '.mp3').play();
}

$(".box").click(function(){
    if(level > 0){
        index++;
        
        animate(this.id);
        if(this.id == rand_color[index]){
            sound(this.id);
            if(index == rand_color.length-1)    setTimeout(()=>{nextLevel()},500);
        }
        else{
            sound("wrong");
            GameOver();
        }
    }
});



$(document).keydown(function (e) {
    var arrow = { left: 37, up: 38, right: 39, down: 40 };
  
    switch (e.which) {
      case arrow.left:
        keyboard("green");
        break;
        case arrow.up:
        keyboard("yellow");
        break;
      case arrow.right:
        keyboard("blue");
        break;
      case arrow.down:
        keyboard("red");
        break;
    }
  });


function keyboard(clor){
    if(level > 0){
        index++;
        
        animate(clor);
        if(clor == rand_color[index]){
            sound(clor);
            if(index == rand_color.length-1)    setTimeout(()=>{nextLevel()},500);
        }
        else{
            sound("wrong");
            GameOver();
        }
    }
}



function nextLevel(){
    index = -1;
    addColor();
}

function GameOver(){
    rand_color = [];
    $("h1").fadeOut(300, function() {
        $(this).text("Game Over").fadeIn(300).css("font-size", "3em").css("color","red");
    });
    $(".score").text("You Scored: " + (level-1)).fadeIn(2000);
    $("body").addClass("lost");
    setTimeout(()=>{$("body").removeClass("lost");},200);
    if(best < level-1){
        best = level-1;
    }
    $(".best").text("Current Best: " + best).fadeIn(2000);
    
    if(level > 11)   $(".complement").text("Your Memory is Awesome!").fadeIn(2000);
    else if(level > 6)  $(".complement").text("Well Played!").fadeIn(2000);
    else $(".complement").text("Better Luck Next Time!").fadeIn(2000);

    $(".box").hide();
    setTimeout(() => {
        index = -1;
        level = 0;
    },2000)
}