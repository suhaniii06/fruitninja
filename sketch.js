var sword,swordImage,monster,monsterImage, fruit,fruitImage,fruitGroup,enemyGroup,gameOver,gameOverImage;

var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;


function preload(){
  
  swordImage=loadImage("sword.png");
  monsterImage= loadAnimation("alien1.png", "alien2.png");
  gameOverImage=loadImage("gameover.png");
  fruit1= loadImage("fruit1.png");
  fruit2= loadImage("fruit2.png");
  fruit3= loadImage("fruit3.png");
  fruit4= loadImage("fruit4.png");
  
 
}

function setup() {

 createCanvas(600, 600);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  fruitGroup=createGroup();
  enemyGroup=createGroup();

}


function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
     if(r==1){
       fruit.addImage(fruit1);
     }else if(r==2){
       fruit.addImage(fruit2);
     }else if(r==3){
       fruit.addImage(fruit3);
     }else if(r==4){
       fruit.addImage(fruit4);
     }
       
    fruit.y= Math.round(random(50,340));
    
    fruit.velocityX= -7;
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
     }
  }

function enemy(){
  
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
  
}

function draw(){
  background("blue");

  if (gameState===PLAY){
    sword.x=World.mouseX;
    sword.y=World.mouseY;
    fruits();
    enemy();
  }
  
  if (fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score=score+1;
  }
  
  if (enemyGroup.isTouching(sword)){
    gameState=END;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.velocityX=0;
    enemyGroup.velocityX=0;
    sword.addImage(gameOverImage);
    sword.x=300;
    sword.y=300;
  }
  
  drawSprites();
  textSize(20);
  fill("black");
  text("score:"+ score, 500,50);
}
