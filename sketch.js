const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world,body;

var board,die;
var bluepiece,bluespaces,bluemoved;

function preload(){
board = loadImage("sprites/background.png");
}

function drawdie(x,y,side){
  fill("white");
  strokeWeight(8);
  rectMode(CENTER);
  rect(x,y,100,100,20);

  fill("black");
  strokeWeight(3);
  if(side === 1){
      circle(x,y,20);
    }else if (side === 2){
        circle(x-25,y-25,20);
        circle(x+25,y+25,20);

    }else if (side === 3){
        circle(x-25,y-25,20);
        circle(x,y,20);
        circle(x+25,y+25,20);
    }else if (side === 4){
        circle(x-25,y-25,20);
        circle(x+25,y+25,20);
        circle(x-25,y+25,20);
        circle(x+25,y-25,20);
    }else if (side === 5){
        circle(x-25,y-25,20);
        circle(x+25,y+25,20);
        circle(x,y,20);
        circle(x-25,y+25,20);
        circle(x+25,y-25,20);
    }else if (side === 6){
        circle(x-25,y-25,20);
        circle(x+25,y+25,20);
        circle(x-25,y+25,20);
        circle(x+25,y-25,20);
        circle(x-25,y,20);
        circle(x+25,y,20);
    }

}

function checkForBlueUpsAndDowns(){
    if(bluespaces===2){
        Matter.Body.setVelocity(bluepiece.body,{x:7,y:-13});
        bluespaces=23;
    }

    if(bluespaces===6){
        Matter.Body.setVelocity(bluepiece.body,{x:-6,y:-26});
        bluespaces=45;
    }

    if(bluespaces===20){
        Matter.Body.setVelocity(bluepiece.body,{x:7,y:-26});
        bluespaces=96;
    }

    if(bluespaces===57){
        Matter.Body.setVelocity(bluepiece.body,{x:7,y:-26});
        bluespaces=96;
    }

    if(bluespaces===28){
        Matter.Body.setVelocity(bluepiece.body,{x:7,y:-13});
        bluespaces=49;
    }

    if(bluespaces===52){
        Matter.Body.setVelocity(bluepiece.body,{x:0,y:-13});
        bluespaces=72;
    }

    if(bluespaces===71){
        Matter.Body.setVelocity(bluepiece.body,{x:7,y:20});
        bluespaces=17;
    }

    if(bluespaces===50){
        Matter.Body.setVelocity(bluepiece.body,{x:-32,y:26});
        bluespaces=5;
    }

    if(bluespaces===56){
        Matter.Body.setVelocity(bluepiece.body,{x:20,y:33});
        bluespaces=8;
    }

    if(bluespaces===73){
        Matter.Body.setVelocity(bluepiece.body,{x:-13,y:38});
        bluespaces=15;
    }
    if(bluespaces===87){
        Matter.Body.setVelocity(bluepiece.body,{x:12,y:26});
        bluespaces=49;
    }
    if(bluespaces===84){
        Matter.Body.setVelocity(bluepiece.body,{x:-7,y:13});
        bluespaces=63;
    }

    if(bluespaces===98){
        Matter.Body.setVelocity(bluepiece.body,{x:-14,y:39});
        bluespaces=40;
    }

    if(bluespaces===43){
        Matter.Body.setVelocity(bluepiece.body,{x:7,y:20});
        bluespaces=17;
    }
} 

function setup(){
    createCanvas(600,725);
    engine=Engine.create();
    world=engine.world;
    engine.world.gravity.y=0;

    die=[false,1,0,false,0];

    bluepiece=new BluePiece(20,570,40,40);
    bluespaces=1;
    bluemoved=false;

}

function draw(){
    background(158,113,79);
    Engine.update(engine);
    image(board,0,0,600,600);
    bluepiece.display();

    stroke("black");
    strokeWeight(8);
    line(0,602.5,600,602.5);

    if(die[3]===false){
        drawdie(525,665,die[1]);

    }else{
        if(die[4]%2===0){
            drawdie(525,665,die[1]);

            if(bluemoved===false && bluespaces!==100){
                if(bluespaces%10===0){
                    bluepiece.moveUp();
                }else{
                    var num=Math.floor(bluespaces/10);
                    if(num===0 || num===2 || num===4 || num===6 || num===8){
                        bluepiece.moveRight();

                    }else{
                        bluepiece.moveLeft();
                    }
                }
                bluemoved=true;
                bluespaces++;
            }
        }
        if(frameCount%15===0){
            die[4]--;
            bluemoved=false

            if(die[4]===0){
                die[3]=false;
                die[0]=false;
                checkForBlueUpsAndDowns();
            }
        }
    }
    if(die[0]===true && die[2]>0 && frameCount%5===0){
        die[2]--;
        die[1]++;
        if(die[1]>6){
            die[1]=1;
        }
        if(die[2]===0){
            die[3]=true;
            die[4]=die[1]*2;
            
        }
    }
}

function keyPressed(){
    if (keyCode === 32 && die[0]===false){
        die[0]=true;
        die[2]=round(random(12,18))
    }
}