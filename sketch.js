  //Global Variables
var backgroundImage, obstacleImage, obstacleGroup, foodGroup, foodImage, groundImage;

var player, player_running;
var backGround, invsibleGround;
var score = 0;


function preload() {
  backgroundImage = loadImage("jungle.jpg");
  foodImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
}


function setup() {
  createCanvas(600, 300);
  backGround = createSprite(300, 30, 10, 10);
  backGround.addImage(backgroundImage);
  backGround.scale = 1.3;
  backGround.x = backGround.width / 2;

  Ground = createSprite(100, 290, 900, 10);
  Ground.shapeColor = color(165, 42, 42);
  Ground.x = Ground.width / 2;
  Ground.visible = false; 

  player = createSprite(100, 280, 20, 50);
  player.addAnimation("monkey", player_running);
  player.scale = 0.1;
  player.setCollider("circle",0,0,335);
  
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background(255);

  player.collide(Ground);
 
  
  if (foodGroup.isTouching(player)){
     foodGroup.destroyEach();
     foodGroup.setVelocityEach(0,0);
     score = score +2;
  }
  if (obstacleGroup.isTouching(player)){
      obstacleGroup.destroyEach();
      score = score -1;
      player.scale=0.08;
  }

  player.velocityY = player.velocityY + 0.8;
  if (keyWentDown ("space") ) {
    player.velocityY = -12 ;
     
  }

  Ground.velocityX = -2;
  if (Ground.x < 0) {
    Ground.x = Ground.width / 2;
  }

  backGround.velocityX = -2;
  if (backGround.x < 0) {
    backGround.x = backGround.width / 2;
  }

  spawnStone();
  spawnFood();
    
  drawSprites();
  fill(255, 255, 255);
  textSize(20);
  text("Score: " + score, 500, 50);
}

function spawnStone() {
  if (frameCount % 300 === 0) {
    var stone = createSprite(150, 200, 10, 10);
    stone.x = random(350, 390);
    stone.y = random(245, 270);
    stone.velocityX = -6;
    switch (score) {
      case 10:
        player.scale = 0.12;
        break;
      case 20:
        player.scale = 0.14;
        break;
      case 30:
        player.scale = 0.16;
        break;
      case 40:
        player.scale = 0.18;
        break;
      default: break;

    }
    stone.lifetime = 300;
    stone.scale = 0.2;
 
    stone.setCollider("circle",0,0,290);
    stone.addImage(obstacleImage);
    obstacleGroup.add(stone);
  }
}

function spawnFood() {
  if (frameCount%80 === 0) {
    var banana = createSprite(400, 200, 10, 10);
    banana.x = random(350, 390);
    banana.y = random(110, 180);
    banana.velocityX = -5;
    banana.lifetime = 300;
    banana.scale = 0.05;
    banana.addImage(foodImage);
    banana.collide(player);
    player.depth = banana.depth +1;

    banana.setCollider("circle",0,20,390);
    foodGroup.add(banana);
  }
}