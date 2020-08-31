//Create variables here
var dog,happyDog,foodS,foodStock,database,dogImg,happyDogImg;
var timer = 100;

function preload()
{
happyDogImg = loadImage("images/happydog.png");
dogImg = loadImage("images/Dog.png");
}

function setup() {
	createCanvas(800, 700);
  dog = createSprite(400,350,1,1);
  dog.addImage(dogImg);

  database = firebase.database();
  console.log(database);

  var foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(46,139,87);
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  if (keyWentUp(UP_ARROW)) {
    dog.addImage(dogImg);
  }
  dog.scale = 0.3;
  drawSprites();
  
  fill(0,0,0);

  textSize(20);
  text("foodStock " + foodS,350,230);

  text(mouseX + " " + mouseY,700,50);


}
function readStock(data) {
  foodS = data.val();
  console.log(foodS);
}
function writeStock(x) {
  if (x<=0) {
    x=0;
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}



