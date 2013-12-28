var stage, character, imgData;
var pix = [];
var KEYCODE_UP = 38;                
var KEYCODE_LEFT = 37;                
var KEYCODE_RIGHT = 39;                
var KEYCODE_DOWN = 40;                
//gracze
var player, player2;
//kierunki
var right = false;
var up = false;
var left = false;
var down = false;
//czy idziemy - zmienna zeby ruch sie odtwarzal tylko 1 raz
var active = true;
//ruch oponenta
var opponentMove = "";
//listenery do ruszania straszlkami
document.onkeydown = keyPress;
document.onkeyup = keyRelease;
//tlo
var bkg = new createjs.Bitmap("gfx/mapa.png");
//maska do "latarki"
var map = new createjs.Shape();
//sprite
var peopleSprite = new createjs.SpriteSheet({
    "frames": {
        "width": 20,
        "numFrames": 9,
        "regX": 0,
        "regY": 0,
        "height": 26
    },
    "animations": {"up": [0, 2], "right":[3, 5], "down":[6, 8], "left":[9, 11]},
    "images": ["gfx/sprite2.png"]
});
var alienSprite = new createjs.SpriteSheet({
    "frames": {
        "width": 20,
        "numFrames": 9,
        "regX": 0,
        "regY": 0,
        "height": 26
    },
    "animations": {"down": [0, 2], "left":[3, 5], "right":[6, 8], "up":[9, 11]},
    "images": ["gfx/sprite2.png"]
});
//wylaczenie scrolowania strzalkami
var arrow_keys_handler = function(e) {
    switch(e.keyCode){
case 37: case 39: case 38:  case 40: // Arrow keys
case 32: e.preventDefault(); break; // Space
default: break; // do not block other keys
}
};
window.addEventListener("keydown", arrow_keys_handler, false);
//wlaczenie scrolowania
//window.removeEventListener("keydown", arrow_keys_handler, false);
//glowna funkcja rozruchowa----------------------------------////////////////////////////////////--------------INIT()---------------!!!!!!!!!!!!!!!!!!!!
function init() {
        stage = new createjs.Stage("canvas");  
        selectPlayer();          
        background = stage.addChild(new createjs.Container());
        character = stage.addChild(new createjs.Container());
        background.addChild(bkg);
            //narysowana maska
        map.graphics.drawRect(0, 0, 100, 100);
        //background.mask = map;                            //////maska!!!
        stage.addChild(map);
            //sprite czlowieka
        peopleSprite.getAnimation("up").speed = 0.5;
        peopleSprite.getAnimation("right").speed = 0.5;
        peopleSprite.getAnimation("down").speed = 0.5;
        peopleSprite.getAnimation("left").speed = 0.5;
        pSprite = new createjs.Sprite(peopleSprite);
        pSprite.scaleY = pSprite.scaleX = 1;
        pSprite.gotoAndStop(7);
          //sprite aliena
        alienSprite.getAnimation("up").speed = 0.5;
        alienSprite.getAnimation("right").speed = 0.5;
        alienSprite.getAnimation("down").speed = 0.5;
        alienSprite.getAnimation("left").speed = 0.5;
        aSprite = new createjs.Sprite(alienSprite);
        aSprite.scaleY = aSprite.scaleX = 1;
        aSprite.gotoAndStop(7);
}
//ENTERFRAME odwzorowanie tylko ze w JS
function tick(event) {

    if(opponentMove == "right")
        aSprite.x+=3;
    else if(opponentMove == "left")
        aSprite.x-=3;
    else if(opponentMove == "up")
        aSprite.y-=3;
    else if(opponentMove == "down")
        aSprite.y+=3;

    if(up){
        if(canGoUp()){   
            if(background.y<0 && character.y < (canvas.height/2)-13){
                background.y+=3;
            }else{
                if(character.y>0)
                    character.y-=3;
            }        
        }
    }else if(right){
        if(canGoRight()){
            if(background.x > canvas.width-bkg.image.width && character.x > (canvas.width/2)-10){
                background.x-=3;
            }else{
                if(character.x<canvas.width - 20)
                    character.x+=3;
            }
        }
    }else if(left){
        if(canGoLeft()){
            if(background.x<0 && character.x < (canvas.width/2)-10){
                background.x+=3;
            }else{
                if(character.x>0)
                    character.x-=3;
            }
        }
    }else if(down){
        if(canGoDown()){
            if(background.y>canvas.height - bkg.image.height && character.y > (canvas.height/2)-13){
                background.y-=3;
            }else{
                if(character.y<canvas.height - 26)
                    character.y+=3;
            }
        }
    }
//maska
map.x = character.x-50;
map.y = character.y-25;
//console.log("x " + background.x + ", y " + background.y + " hX: " + character.x + " hY " + character.y);
stage.update(event);
}
//nacisniety
function keyPress(e){
    if(!e)
        var e = window.event;     
    switch(e.keyCode) {
        case KEYCODE_RIGHT:      
        right = true; 
        if(active){
            sendMove("right");
            if(player == "people")
                pSprite.gotoAndPlay("right");
            else
                aSprite.gotoAndPlay("right");
            $("#info").append(e.keyCode + ", next: ");
        }
        active = false;
        break;
        case KEYCODE_UP:
        up = true;
        if(active){
        sendMove("up");
            if(player == "people")
                pSprite.gotoAndPlay("up");
            else
                aSprite.gotoAndPlay("up");
            $("#info").append(e.keyCode + ", next: ");
        }
        active = false;
        break;
        case KEYCODE_LEFT:
        left = true;
        if(active){
        sendMove("left");
            if(player == "people")
                pSprite.gotoAndPlay("left");
            else
                aSprite.gotoAndPlay("left");
            $("#info").append(e.keyCode + ", next: ");
        }
        active = false;
        break;
        case KEYCODE_DOWN:
        down = true;
        if(active){
        sendMove("down");
            if(player == "people")
                pSprite.gotoAndPlay("down");
            else
                aSprite.gotoAndPlay("down");
            $("#info").append(e.keyCode + ", next: ");
        }
        active = false;
        break;
    }
}
//spuszczony klawisz
function keyRelease(e){
    cancelMove();
    if(!e){ var e = window.event; }
    switch(e.keyCode) {
        case KEYCODE_RIGHT:      
        right = false;
        active = true;
        if(player == "people")
            pSprite.gotoAndStop(4);
        else
            aSprite.gotoAndStop(4);
        break;
        case KEYCODE_UP:        
        up = false;
        active = true;
        if(player == "people")
            pSprite.gotoAndStop(1);
        else
            aSprite.gotoAndStop(1);
        break;
        case KEYCODE_LEFT:       
        left = false;
        active = true;
        if(player == "people")
            pSprite.gotoAndStop(10);
        else
            aSprite.gotoAndStop(10);
        break;
        case KEYCODE_DOWN:       
        down = false;
        active = true;
        if(player == "people")
            pSprite.gotoAndStop(7);
        else
            aSprite.gotoAndStop(7);
        break;
    }
}
//zmiena koloru z RGB na HEXADEXYMALA
function rgbToHex(red, green, blue)
{
    var decColor = red + 256 * green + 65536 * blue;
    var result = decColor.toString(16);
    return "#"+result;
}
//funkcja zwracajaca kolorek
function getPixelColor(){
    return rgbToHex(pix[0],pix[1],pix[2])
}
///////////////////////////////////sprawdzanie czy mozemy sie przemieszczac w danych kierunkach
function canGoUp(){
    imgData = canvas.getContext("2d").getImageData(character.x+2, character.y, 1, 1);
    pix = imgData.data;
    if(getPixelColor() == "#ffffff")
        return true;
    else
        return false;

}
function canGoDown(){
    imgData = canvas.getContext("2d").getImageData(character.x+16, character.y+22, 1, 1);
    pix = imgData.data;
    if(getPixelColor() == "#ffffff")
        return true;
    else
        return false;

}
function canGoLeft(){
    imgData = canvas.getContext("2d").getImageData(character.x, character.y+18, 1, 1);
    pix = imgData.data;
    if(getPixelColor() == "#ffffff")
        return true;
    else
        return false;

}
function canGoRight(){
    imgData = canvas.getContext("2d").getImageData(character.x+20, character.y+18, 1, 1);
    pix = imgData.data;
    if(getPixelColor() == "#ffffff")
        return true;
    else
        return false;

}

//
//wybor gracza, ustawieni zmienncyh
function selectPlayer(){
        $.ajax({
        url: 'ajax/checkStart.php',
        type: 'POST',
        })
        .done(function(message) {
            if(message == "alien"){
                player = "people";
                player2 = "alien";
                gameBegin();
            }else if(message == "people"){
                player = "alien";
                player2 = "people";
                gameBegin();
            }else{
                $("#people").click(function(event) {
                     player = "people";
                     player2 = "alien";
                      $(this).parent().empty();
                      gameBegin();
                      $.ajax({
                url: 'ajax/startGame.php',
                type: 'POST',
                dataType: 'json',
                data: {player: player},
            });  
                 });
                $("#alien").click(function(event) {
                    player2 = "people";
                    player = "alien";
                    $(this).parent().empty();
                    gameBegin();
                    $.ajax({
                url: 'ajax/startGame.php',
                type: 'POST',
                dataType: 'json',
                data: {player: player},
            });  
                });
            }
        });
}
///
function gameBegin(){
    createjs.Ticker.on("tick", tick);
        createjs.Ticker.setFPS(30);
        if(player == "people"){
            character.addChild(pSprite);
            background.x = -501;
            background.y = 0;
            character.x = 600;
            character.y = 60;
            aSprite.x = 545;
            aSprite.y = (canvas.height/2)-25;
            background.addChild(aSprite);   
        }else{
            character.addChild(aSprite);
            background.x = -60;
            background.y = 0;
            character.x = (canvas.width/2)-20; //480
            character.y = (canvas.height/2)-25;
            pSprite.x = 1100;
            pSprite.y = 60;
            background.addChild(pSprite);
        }            
            poll();
}
function sendMove(direction){
    $.ajax({
        url: 'ajax/startMove.php',
        type: 'POST',
        dataType: 'json',
        data: {dir: direction},
    });
}
function cancelMove(){
    $.ajax({
        url: 'ajax/endMove.php',
        type: 'POST',
    });
}
//POOLING DO RUSZANIA KURWA
function poll(){
               /* $.ajax({
                    type: "POST",
                    url: "ajax/poll.php",
                    dataType: 'json',
                    data: {move: opponentMove},
                    success: function(data){                    
                        console.log(data);
                        opponentMove = data;
                    },
                    complete: poll
                });*/
                $.ajax({
                    url: 'ajax/poll.php',
                    type: 'POST',
                    data: {move: opponentMove},
                    complete: poll,
                })
                .done(function(data) {
                    console.log("zmienilo sie " + data);
                    opponentMove = data;
                });
                
}