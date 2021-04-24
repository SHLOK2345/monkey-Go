var PLAY=1
var END=0
var gameState=PLAY
var survivalTime
var monkey , monkey_running , monkey_stop
var banana ,bananaImage, obstacle, obstacleImage
var bananasGroup, obstaclesGroup
var ground
var invisibleGround

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600,400)
  //creting monkey
monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1
  
ground=createSprite(400,350,1300,10);
ground.velocityX=-4;
console.log(ground.x);
ground.x = ground.width /2;
 
  bananasGroup=new Group();
  obstaclesGroup=new Group();
  
  invisibleGround=createSprite(400,350,700,10)
  invisibleGround.visible=false
}


function draw() {
background(220)
drawSprites();
 obstacle();
banana();
 if(gameState===PLAY){
  if(keyDown("space") &&  monkey.y >=314){
    monkey.velocityY=-16
  }
      monkey.velocityY = monkey.velocityY + 0.8
  monkey.debug=true
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
  monkey.collide(invisibleGround);

   if(obstaclesGroup.isTouching(monkey)){
     gameState=END;
   }
 }
else if(gameState === END){
  ground.velocityX=0
  monkey.velocityX=0
  monkey.velocityY=0
  //give 0 velocity to each group 
  bananasGroup.setVelocityXEach(0)
  obstaclesGroup.setVelocityXEach(0)
  //set lifetime of the game objects so that they never destroy
  obstaclesGroup.setLifetimeEach(-1);
  bananasGroup.setLifetimeEach(0);
  monkey.collide(invisibleGround)
}
  
  text("survivalTime : "+survivalTime,500,50)
  textSize(20);
  fill("white");
  stroke("white");
  survivalTime=Math.ceil(frameCount/frameRate())
}

function obstacle(){
    if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,315,10,40);
    obstacle.addImage(obstacleImage) 
    obstacle.scale=0.1
    obstacle.velocityX=-4
    obstacle.lifetime=150;
    obstacle.collide(invisibleGround)
    obstaclesGroup.add(obstacle)
    }
}

function banana(){
  if(frameCount % 80 === 0) {
    var banana = createSprite(590,200,10,40)
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.velocityX=-4
    banana.lifetime=150;
    bananasGroup.add(banana)
  }
}




