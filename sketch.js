//Create variables here
var dog, happyDog; 
var database; 
var foodS, foodStock;
var milk;
var feedDog, addFoods;
var fedTime,lastFed;
var foodObj;
var changeState, readState;
var bedroom, garden, washroom;


function preload()
{
  //load images here
  loadImage("images/dogImg.png");
  loadImage("images/dogImg1.png");
  loadImage("images/Milk.png");
  loadImage("virtualPetImagesProject36/Bedroom.png");
  loadImage("virtualPetImagesProject36/Garden.png");
  loadImage("virtualPetImagesProject36/Washroom.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,30,30);
  dog.addImage(dogImg.png);
  milk.addImage(Milk.png);
  database = firebase.database;
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);

  readState = database.ref('gameState');
  readState.on("value", function(data)){
    gameState = data.val();
  }
}


function draw() { 
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  } 

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>= 12){
    text("Last Feed:" + lastFed + "AM", 350,30);
  }
  else if(lastFed==0){
    text("Last Feed: 12 AM", 350,30);
  }
  else{
    text("Last Feed:" + lastFed + "AM", 350,30);
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

  currentTime = hour();
        if(currentTime==(lastFed+1)){
            update("Playing");
            foodObj.garden();
        }
        else if(currentTime==(lastFed+2)){
            update("Sleeping");
            foodObj.bedroom();
        }
        else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
            update("Bathing");
            foodObj.washroom();
        }
        else {
            update("Hungry");
            foodObj.display();
        }

  drawSprites();
  //add styles here
  text(Note: Press the ↑ arrow to feed Yeontan milk!);
  textSize(150);
  fill(white);
  stroke(5);

  display.foodObj();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x < 0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  database.ref("/").update({
    Food:x
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(dogImg1.png);
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}



