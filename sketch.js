//Crea las variables
var ocean, oceanImg
var axolotl, axolotl_hurt, axolotlAnim
var snake, snakeAnim;
var shark, sharkAnim;
var border1;
var border2;
var score = 0;
var gameState = "play";

function preload(){
    //Carga las animaciones
oceanImg = loadImage("oceano.png");    
axolotlAnim = loadAnimation("axolotl_swim1.png", "axolotl_swim2.png");
axolotl_hurt = loadImage("axolotl_hurt.png");
sharkAnim = loadAnimation("shark1.png","shark2.png");
}

function setup() {
 createCanvas(windowWidth, windowHeight);

 ocean = createSprite(width-650,height-315,1375,800);
 ocean.addImage(oceanImg);
 //ocean.x = ocean.width /2;

 //Crea el ajolote
 axolotl = createSprite(width-1200,height-150,50,50);
 axolotl.addAnimation("swimming", axolotlAnim);
 axolotl.addAnimation("dead", axolotl_hurt);
 axolotl.scale = 0.3;
 axolotl.setCollider("rectangle",40,10,450,250);
 axolotl.debug = false;

 //Crea los límites del jugador
 border1 = createSprite(width-1150,height,width/2,20);
 border1.visible = false;
 border2 = createSprite(width-1150,height-570,width/2,20);
 border2.visible = false;

 sharksGroup = new Group()


}


function draw() {  
 background(0);
 text("Puntuación: "+score,width-50,height-50);
 
 //Regenera el fondo infinitamente
if(ocean.x < 600){
  ocean.x = ocean.width /2;
}

//Establece las condiciones del estado de juego de "play"
if(gameState === "play"){
    score = score + Math.round(frameCount/500);
    if(keyDown("up_arrow")){
        axolotl.y = axolotl.y-7.5;
    }

    if(keyDown("down_arrow")){
        axolotl.y = axolotl.y+7.5;
    }
   
    if(sharksGroup.isTouching(axolotl)){
       gameState = "end"
       
    }
    ocean.velocityX = -3;

    //Llama a la función de crear tiburones
    createSharks();
}

//Establece las condiciones del estado de juego de "end"
else if(gameState === "end"){
    axolotl.changeAnimation("dead",axolotl_hurt);
    ocean.velocityX = 0;
    axolotl.velocityY = 0;
    

    sharksGroup.setVelocityXEach(0);
    sharksGroup.setLifetimeEach(-1);
}
 
//Establece las colisiones del ajolote
 
 axolotl.collide(border1);
 axolotl.collide(border2);



 drawSprites();
}

//Define la función para crear tiburones
function createSharks(){
if(frameCount % 150 === 0){
    var shark = createSprite(width,20,50,50);
    shark.addAnimation("shark",sharkAnim); 
    shark.scale = 0.35;
    shark.y = Math.round(random(50,550));
    shark.velocityX = -(3 + 0.25*score/100);
    shark.lifetime = 500;
    shark.setCollider("rectangle",-50,50,400,200);
    shark.debug = false;
    

    shark.depth = axolotl.depth;
    axolotl.depth = axolotl.depth+1;

    sharksGroup.add(shark)
}
  
}