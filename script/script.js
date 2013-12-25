var stage, holder;
var KEYCODE_UP = 38;                //usefull keycode
var KEYCODE_LEFT = 37;                //usefull keycode
var KEYCODE_RIGHT = 39;                //usefull keycode
var KEYCODE_DOWN = 40;                //usefull keycode
//kierunki
var right = false;
var up = false;
var left = false;
var down = false;
//czy idziemy - zmienna zeby ruch sie odtwarzal tylko 1 raz
var active = true;
//listenery do ruszania straszlkami
document.onkeydown = keyPress;
document.onkeyup = keyRelease;
//glowna funkcja rozruchowa
var bkg = new createjs.Bitmap("gfx/mapa2.png");
function init() {
    stage = new createjs.Stage("canvas");            
    background = stage.addChild(new createjs.Container());
    background.x = 0;
    background.y = 0;
    holder = stage.addChild(new createjs.Container());

    holder.x = (canvas.width/2)-20;
    holder.y = (canvas.height/2)-13;

    background.addChild(bkg);


    createjs.Ticker.on("tick", tick);
    createjs.Ticker.setFPS(30);
    var ss = new createjs.SpriteSheet({
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

    ss.getAnimation("up").speed = 0.5;
    ss.getAnimation("right").speed = 0.5;
    ss.getAnimation("down").speed = 0.5;
    ss.getAnimation("left").speed = 0.5;

    sprite = new createjs.Sprite(ss);
    sprite.scaleY = sprite.scaleX = 1;
    sprite.gotoAndStop(7);
    holder.addChild(sprite);
}
//ENTERFRAME odwzorowanie tylko ze w JS
function tick(event) {
    if(up){
        if(background.y<0 && holder.y < (canvas.height/2)-13){
            background.y+=3;
        }else{
            if(holder.y>0)
                holder.y-=3;
        }        
    }else if(right){
        if(background.x > canvas.width-bkg.image.width && holder.x > (canvas.width/2)-10 ){
            background.x-=3;
        }else{
            if(holder.x<canvas.width - 20)
                holder.x+=3;
        }
    }else if(left){
        if(background.x<0 && holder.x < (canvas.width/2)-10){
            background.x+=3;
        }else{
            if(holder.x>0)
                holder.x-=3;
        }
    }else if(down){
        if(background.y>canvas.height - bkg.image.height && holder.y > (canvas.height/2)-13){
            background.y-=3;
        }else{
            if(holder.y<canvas.height - 26)
                holder.y+=3;
        }
    }
    console.log("x " + background.x + ", y " + background.y + " hX: " + holder.x + " hY " + holder.y);
    stage.update(event);
}
//nacisniety
function keyPress(e){
    if(!e)
        var e = window.event; 
    switch(e.keyCode) {
        case KEYCODE_RIGHT:      
            right = true; 
            if(active)
                sprite.gotoAndPlay("right");
            active = false;
            break;
        case KEYCODE_UP:
            up = true;
            if(active)
                sprite.gotoAndPlay("up");
            active = false;
            break;
        case KEYCODE_LEFT:
            left = true;
            if(active)
                sprite.gotoAndPlay("left");
            active = false;
            break;
        case KEYCODE_DOWN:
            down = true;
            if(active)
                sprite.gotoAndPlay("down");
            active = false;
            break;
    }
}
//spuszczony klawisz
function keyRelease(e){
    if(!e){ var e = window.event; }
    switch(e.keyCode) {
        case KEYCODE_RIGHT:      
            right = false;
            active = true;
            sprite.gotoAndStop(4);
            break;
        case KEYCODE_UP:        
            up = false;
            active = true;
            sprite.gotoAndStop(1);
            break;
        case KEYCODE_LEFT:       
            left = false;
            active = true;
            sprite.gotoAndStop(10);
            break;
        case KEYCODE_DOWN:       
            down = false;
            active = true;
            sprite.gotoAndStop(7);
            break;
    }
}