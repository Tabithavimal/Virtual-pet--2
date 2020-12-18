//Create variables here
var dog,happyDog
var database
var foodS,foodStock;
var dogImg,dogImg1;
var fedTime,lastFed;
var foodObj;
var feedDog;
var addFoodS;
var milkImg

function preload()
{
dogImg=loadImage("images/dogImg.png")
milkImg=loadImage("images/Milk.png")
dogImg1=loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(500, 500);
  foodObj=new Food()

  database=firebase.database();
dog=createSprite(400,300,20,40)
dog.addImage(dogImg)
dog.scale=0.2

foodStock=database.ref('Food')
foodStock.on("value",readStock)

feed=createButton("Feed the Dog")
feed.position(700,95)
feed.mousePressed(feedDog)


addFood=createButton("Add Food")
addFood.position(800,95)
addFood.mousePressed(addFoodS)


}

function draw() {  
background("green")
foodObj.display();
fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
lastFed=data.val();

})
fill(255,255,254)
textSize(15)
if(lastFed>=12){
text("Last Feed: "+lastFed%12+"PM",350,30)
}
else if(lastFed==0){

  text("Last Feed : 12 AM",350,30)
}
else{

text("Last Feed :"+ lastFed +"AM",350,30)

}

  drawSprites();
 

}

function readStock(data)
{
foodS=data.val();
foodObj.updateFoodStock(foodS)
}

function feedDog(){

dog.addImage(dogImg1)
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
Food:foodObj.getFoodStock(),
feedTime:hour()


})

}

function addFoodS(){

foodS=foodS+1
database.ref('/').update({

Food:foodS

})



}
